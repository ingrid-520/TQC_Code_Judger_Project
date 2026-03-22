import os
import json
import re

# ==========================================
# 設定區
# ==========================================
TQC_ROOT_PATH = "./TQC_python"  # 確保與資料夾名稱大小寫一致
OUTPUT_JSON_NAME = "tqc_questions.json"

CATEGORY_NAMES = {
    "1": "基本程式設計", "2": "選擇敘述", "3": "迴圈敘述", "4": "進階控制流程", "5": "函式",
    "6": "串列(List)", "7": "數組(Tuple)、集合(Set)與字典(Dictionary)", "8": "字串(String)程式設計", "9": "檔案與例外處理"
}

# ==========================================
# 核心邏輯區
# ==========================================

def parse_tqc_content(content):
    """
    解析含有三引號註解與程式碼的檔案
    """
    # 1. 拆分註解區與程式碼區
    doc_match = re.search(r"'''(.*?)'''", content, re.DOTALL)
    if not doc_match:
        return content.strip(), [], content.strip()
    
    raw_doc = doc_match.group(1).strip()
    # 註解之外的部分就是答案
    solution_code = content.replace(doc_match.group(0), "").strip()

    # 2. 提取題目說明 (範例輸入之前的所有文字)
    desc_parts = re.split(r"範例輸入", raw_doc)
    description = desc_parts[0].strip()

    # 3. 提取測資 (範例輸入與範例輸出之間的內容)
    test_cases = []
    io_match = re.search(r"範例輸入\s*(.*?)\s*範例輸出\s*(.*)", raw_doc, re.DOTALL)
    
    if io_match:
        input_str = io_match.group(1).strip()
        output_str = io_match.group(2).strip()
        
        # 確保輸出的結尾有換行符號（TQC 格式檢查常用）
        if not output_str.endswith("\n"):
            output_str += "\n"
            
        test_cases.append({
            "input": input_str,
            "expected_output": output_str
        })

    return description, test_cases, solution_code

def main():
    all_questions = []
    
    if not os.path.exists(TQC_ROOT_PATH):
        print(f"錯誤：找不到目錄 '{TQC_ROOT_PATH}'")
        return

    # 遍歷 1~9 資料夾
    for cat_num in range(1, 10):
        folder_path = os.path.join(TQC_ROOT_PATH, str(cat_num))
        if not os.path.isdir(folder_path):
            continue
            
        print(f"--> 正在處理類別 {cat_num}...")
        
        # 匹配 101, 101.py, 102... 等格式
        file_pattern = re.compile(rf"^{cat_num}\d{{2}}(\.py)?$")
        
        for file_name in os.listdir(folder_path):
            # 排除 PYD, PYA 開頭的檔案
            if file_name.startswith(('PYD', 'PYA')):
                continue
                
            if file_pattern.match(file_name):
                qid = re.sub(r'\.py$', '', file_name)
                file_path = os.path.join(folder_path, file_name)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    desc, tcs, sol = parse_tqc_content(content)
                    
                    # 讀取對應的 PYD 模板
                    template_code = ""
                    pyd_path = os.path.join(folder_path, f"PYD{qid}.py")
                    if os.path.exists(pyd_path):
                        with open(pyd_path, 'r', encoding='utf-8') as pf:
                            template_code = pf.read().strip()
                    
                    all_questions.append({
                        "id": qid,
                        "category_id": str(cat_num),
                        "category_name": CATEGORY_NAMES.get(str(cat_num), ""),
                        "description": desc,
                        "test_cases": tcs,
                        "template_code": template_code,
                        "solution_code": sol
                    })
                except Exception as e:
                    print(f"！！！ 處理 {file_name} 時發生錯誤: {e}")

    if all_questions:
        with open(OUTPUT_JSON_NAME, 'w', encoding='utf-8') as f:
            json.dump(all_questions, f, ensure_ascii=False, indent=2)
        print(f"\n成功！已產出 {len(all_questions)} 題 JSON 素材。")
    else:
        print("\n掃描失敗：請確認檔案命名是否為 '101' 或 '101.py'，且放在對應的資料夾中。")

if __name__ == '__main__':
    main()