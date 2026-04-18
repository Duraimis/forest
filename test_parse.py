import fitz
doc = fitz.open('FM_Week 1.pdf')
text = ""
for page in doc:
    text += page.get_text()
with open('FM_Week_1_parsed.txt', 'w', encoding='utf-8') as f:
    f.write(text)
print("Done")
