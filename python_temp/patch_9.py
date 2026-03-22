import json
import re
import os

with open('c:\\Workspace\\Vibe Coding\\tqc_questions_fixed.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    if item['category_id'] == '9':
        q_id = item['id']
        py_file = f'c:\\Workspace\\Vibe Coding\\TQC_python\\9\\{q_id}.py'
        if os.path.exists(py_file):
            with open(py_file, 'r', encoding='utf-8') as f_py:
                content = f_py.read()
            doc_match = re.search(r"'''(.*?)'''", content, re.DOTALL)
            if doc_match:
                raw_doc = doc_match.group(1).strip()
                desc_parts = re.split(r"範例輸入", raw_doc)
                item['description'] = desc_parts[0].strip()

with open('c:\\Workspace\\Vibe Coding\\tqc_questions_fixed.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open('c:\\Workspace\\Vibe Coding\\tqc-platform\\public\\data\\tqc_questions.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
