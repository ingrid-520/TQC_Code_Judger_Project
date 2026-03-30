import { promises as fs } from "fs";
import path from "path";
import { Question, Category } from "@/types/question";
import Header from "@/components/Header";
import WelcomeBanner from "@/components/WelcomeBanner";
import CategoryGrid from "@/components/CategoryGrid";

async function getCategories(): Promise<Category[]> {
  const filePath = path.join(process.cwd(), "public", "data", "tqc_questions.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const questions: Question[] = JSON.parse(raw);

  // Group by category_id
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

  // Sort by category_id, questions already in order
  return Array.from(map.values()).sort(
    (a, b) => parseInt(a.id) - parseInt(b.id)
  );
}

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        {/* Welcome Banner */}
        <WelcomeBanner />

        {/* Section title */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold text-foreground">題目分類</h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                點擊類別方塊展開題目列表，選擇題目開始練習
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground">
                共 {categories.length} 類·{" "}
                {categories.reduce((acc, c) => acc + c.questions.length, 0)} 題
              </p>
            </div>
          </div>

          {/* Category Grid */}
          <CategoryGrid categories={categories} />
        </div>
      </main>

      <footer className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        <p>TQC Python 練習系統 · 基於 Pyodide 在瀏覽器端執行 Python</p>
      </footer>
    </div>
  );
}
