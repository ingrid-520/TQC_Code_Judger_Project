import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Question, Category } from "@/types/question";
import PracticeClient from "@/components/PracticeClient";

interface PracticePageProps {
  params: Promise<{ questionId: string }>;
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "public", "data", "tqc_questions.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const questions: Question[] = JSON.parse(raw);

  return questions.map((q) => ({
    questionId: q.id,
  }));
}

export default async function PracticePage({ params }: PracticePageProps) {
  const { questionId } = await params;

  // 讀取 JSON 資料
  const filePath = path.join(process.cwd(), "public", "data", "tqc_questions.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const questions: Question[] = JSON.parse(raw);

  // Group by category_id 以供 Sidebar 使用
  const map = new Map<string, Category>();
  for (const q of questions) {
    if (!map.has(q.category_id)) {
      map.set(q.category_id, {
        id: q.category_id,
        name: q.category_name,
        questions: [],
      });
    }
    map.get(q.category_id)!.questions.push(q);
  }
  const categories = Array.from(map.values()).sort(
    (a, b) => parseInt(a.id) - parseInt(b.id)
  );

  // 尋找對應題目
  const question = questions.find((q) => q.id === questionId);

  if (!question) {
    notFound();
  }

  return <PracticeClient question={question} categories={categories} />;
}
