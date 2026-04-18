import fitz
import json
import glob
import re

def parse_pdf(filepath):
    doc = fitz.open(filepath)
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
                            "bold": "Bold" in span["font"] or "Black" in span["font"] or span["flags"] & 16 != 0
                        })
    return blocks

print(json.dumps(parse_pdf('FM_Week 1.pdf')[:50], indent=2))
