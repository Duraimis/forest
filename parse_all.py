import fitz, json, glob, re, os

all_data = []

pdfs = sorted(glob.glob("FM*.pdf"), key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else 0)

for pdf in pdfs:
    week_match = re.search(r'\d+', pdf)
    if not week_match:
        continue
    week = int(week_match.group())
    
    doc = fitz.open(pdf)
    blocks = []
    for page in doc:
        page_dict = page.get_text("dict")
        for block in page_dict.get("blocks", []):
            if "lines" not in block:
                continue
            for line in block["lines"]:
                for span in line["spans"]:
                    text = span["text"].strip()
                    if text:
                        blocks.append({
                            "text": text,
                            "bold": "Bold" in span["font"] or "Black" in span["font"] or (span["flags"] & 16 != 0)
                        })

    questions = []
    current_q = ""
    current_opts = []
    current_opt_text = ""
    is_answer = False
    correct_answer = ""
    
    ignore_texts = ["The correct answer is in", "bold", ".", "Assignment", "number", "Question", "Forests and their management"]
    clean_blocks = []
    for b in blocks:
        if b["text"] in ignore_texts or "Week" in b["text"]:
            continue
        clean_blocks.append(b)

    state = "QUESTION"
    
    for b in clean_blocks:
        t = b["text"]
        
        if re.match(r'^[a-e]\.$', t.lower()) or re.match(r'^[a-e]\)', t.lower()):
            if state == "QUESTION":
                state = "OPTIONS"
            else:
                if current_opt_text:
                    opt = current_opt_text.strip()
                    current_opts.append(opt)
                    if is_answer:
                        correct_answer = opt
            current_opt_text = t + " "
            is_answer = False
        else:
            if state == "QUESTION":
                if re.match(r'^\d+$', t):
                    continue
                current_q += t + " "
            elif state == "OPTIONS":
                if re.match(r'^\d+$', t) and len(current_opts) >= 3:
                    if current_opt_text:
                        opt = current_opt_text.strip()
                        current_opts.append(opt)
                        if is_answer:
                            correct_answer = opt
                    
                    if current_q:
                        questions.append({
                            "question": current_q.strip(),
                            "options": current_opts,
                            "answer": correct_answer
                        })
                    
                    current_q = ""
                    current_opts = []
                    current_opt_text = ""
                    correct_answer = ""
                    state = "QUESTION"
                else:
                    current_opt_text += t + " "
                    if b["bold"] and not re.match(r'^[a-e]\.$', t.lower()):
                        is_answer = True
                        
    if current_opt_text:
        opt = current_opt_text.strip()
        current_opts.append(opt)
        if is_answer:
            correct_answer = opt
    if current_q:
        questions.append({
            "question": current_q.strip(),
            "options": current_opts,
            "answer": correct_answer
        })
        
    all_data.append({
        "week": week,
        "questions": questions
    })

with open("quiz_data.json", "w", encoding="utf-8") as f:
    json.dump(all_data, f, indent=2)

print(f"Parsed {len(all_data)} weeks. Total questions: {sum(len(w['questions']) for w in all_data)}")
