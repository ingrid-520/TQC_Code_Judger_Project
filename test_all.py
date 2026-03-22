import json
import io
import sys
import traceback
import contextlib

def run_tests():
    with open('tqc_questions_fixed.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    failed = []
    
    for q in data:
        qid = q.get('id')
        solution = q.get('solution_code', '')
        cases = q.get('test_cases', [])
        
        if not cases:
            continue
            
        for idx, tc in enumerate(cases):
            input_data = tc.get('input', '')
            expected = tc.get('expected_output', '')
            
            # Prepare execution
            stdout_obj = io.StringIO()
            stdin_obj = io.StringIO(input_data)
            
            # Some questions require specific files
            files = q.get('files', [])
            for file in files:
                with open(file['filename'], 'w', encoding='utf-8') as file_obj:
                    # Nextjs pyodide runs with utf-8
                    file_obj.write(file['content'])
            
            try:
                # Redirect stdio
                sys.stdout = stdout_obj
                sys.stdin = stdin_obj
                
                # Create isolated dictionary for exec
                exec_globals = {}
                exec(solution, exec_globals)
                
            except Exception as e:
                actual_output = stdout_obj.getvalue() + traceback.format_exc()
            else:
                actual_output = stdout_obj.getvalue()
            finally:
                sys.stdout = sys.__stdout__
                sys.stdin = sys.__stdin__
                
            expected_clean = expected.rstrip()
            actual_clean = actual_output.rstrip()
            
            if expected_clean != actual_clean:
                failed.append({
                    'id': qid,
                    'case_idx': idx,
                    'input': input_data,
                    'expected': expected_clean,
                    'actual': actual_clean,
                    'solution': solution
                })
                print(f"FAILED Question {qid} Case {idx}")
                print(f"EXPECTED: {repr(expected_clean)}")
                print(f"ACTUAL:   {repr(actual_clean)}")
                print(f"CODE:")
                print(solution)
                print("-" * 50)
                break # Only record one error per question to start with
                
    if not failed:
        print("ALL TESTS PASSED!")
    else:
        print(f"Total failed questions: {len(failed)}")

if __name__ == '__main__':
    run_tests()
