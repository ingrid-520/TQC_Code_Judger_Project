import json
import re

# 1. 讀取你剛才的 tqc_questions.json
with open('tqc_questions.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for q in data:
    if not q.get('test_cases'):
        continue
        
    raw_input = q['test_cases'][0].get('input', '')
    raw_output = q['test_cases'][0].get('expected_output', '')
    
    # 將被錯誤切割的字串重新黏合
    chunk = f"範例輸入{raw_input}範例輸出{raw_output}"
    
    # 利用正則表達式，完美切開多組測資，並自動過濾掉 "1", "2" 這種題號
    parts = re.split(r'範例輸入\s*\d*\s*', chunk)
    
    new_test_cases = []
    for part in parts:
        if not part.strip():
            continue
        
        # 切開 Input 與 Output
        sub_parts = re.split(r'範例輸出\s*\d*\s*', part)
        if len(sub_parts) >= 2:
            inp = sub_parts[0].strip()
            out = sub_parts[1].strip()
            
            # 處理第9類檔案題「無」輸入的狀況
            if inp == '無': inp = ''
                
            new_test_cases.append({
                "input": inp,
                # TQC 嚴格要求結尾要有換行符號
                "expected_output": out + "\n"
            })
            
    q['test_cases'] = new_test_cases

# 2. 輸出成乾淨的 JSON
with open('tqc_questions_fixed.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("✅ JSON 淨化完成！請改用 tqc_questions_fixed.json")