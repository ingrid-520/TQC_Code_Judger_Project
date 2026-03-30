export interface TestCase {
  input: string;
  expected_output: string;
}

export interface Question {
  id: string;
  category_id: string;
  category_name: string;
  description: string;
  test_cases: TestCase[];
  template_code: string;
  solution_code: string;
  files?: { filename: string; content: string }[];
}

export interface Category {
  id: string;
  name: string;
  questions: Question[];
}
