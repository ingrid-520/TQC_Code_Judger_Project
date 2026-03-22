import json
import io
import sys
import traceback

def fix_all():
    file_path = 'tqc_questions_fixed.json'
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for q in data:
        qid = q.get('id')
        solution = q.get('solution_code', '')
        cases = q.get('test_cases', [])
        
        # Specific fix for 901 because the web platform only checks stdout
        if qid == '901':
            if 'print' not in solution and 'f.write' in solution:
                solution += "\n\nwith open('write.txt', 'r', encoding='utf-8') as f:\n    print(f.read(), end='')"
                q['solution_code'] = solution
                
        if not cases:
            continue
            
        for idx, tc in enumerate(cases):
            input_data = tc.get('input', '')
            
            stdout_obj = io.StringIO()
            stdin_obj = io.StringIO(input_data)
            
            # Setup files
            files = q.get('files', [])
            for file in files:
                with open(file['filename'], 'w', encoding='utf-8') as file_obj:
                    # In js we do utf8
                    file_obj.write(file['content'])
            
            try:
                sys.stdout = stdout_obj
                sys.stdin = stdin_obj
                
                exec_globals = {}
                exec(solution, exec_globals)
                
            except Exception as e:
                actual_output = stdout_obj.getvalue() + traceback.format_exc()
                print(f"[{qid}] ERRORED! Please manually verify.")
            else:
                actual_output = stdout_obj.getvalue()
            finally:
                sys.stdout = sys.__stdout__
                sys.stdin = sys.__stdin__
                
            if isinstance(actual_output, str):
                # We need to make sure expected_output exactly matches the solution code's stdout
                q['test_cases'][idx]['expected_output'] = actual_output

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("ALL FIXES APPLIED SUCCESSFULLY!")

if __name__ == '__main__':
    fix_all()
