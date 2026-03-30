"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/types/question";
import { BookOpen, HelpCircle } from "lucide-react";
import InstructionModal from "./InstructionModal";

interface CategoryGridProps {
  categories: Category[];
}

// 每個資料夾的顏色（tab + body 配色）
const FOLDER_COLORS = [
  { tab: "#3b82f6", body: "#dbeafe", text: "#1d4ed8", btn: "#2563eb" },   // blue
  { tab: "#6366f1", body: "#e0e7ff", text: "#4338ca", btn: "#4f46e5" },   // indigo
  { tab: "#8b5cf6", body: "#ede9fe", text: "#6d28d9", btn: "#7c3aed" },   // violet
  { tab: "#a855f7", body: "#f3e8ff", text: "#7e22ce", btn: "#9333ea" },   // purple
  { tab: "#0ea5e9", body: "#e0f2fe", text: "#0369a1", btn: "#0284c7" },   // sky
  { tab: "#06b6d4", body: "#cffafe", text: "#0e7490", btn: "#0891b2" },   // cyan
  { tab: "#14b8a6", body: "#ccfbf1", text: "#0f766e", btn: "#0d9488" },   // teal
  { tab: "#10b981", body: "#d1fae5", text: "#065f46", btn: "#059669" },   // emerald
  { tab: "#3b82f6", body: "#dbeafe", text: "#1e40af", btn: "#1d4ed8" },   // blue-dark
];

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const router = useRouter();
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [showInstruction, setShowInstruction] = useState(false);

  const toggleCategory = (id: string) => {
    setOpenCategoryId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* 10-column row: 9 folders + 1 instruction */}
      <div className="grid grid-cols-10 gap-3">
        {categories.map((category, index) => {
          const isOpen = openCategoryId === category.id;
          const color = FOLDER_COLORS[index % FOLDER_COLORS.length];

          return (
            <div key={category.id} className="col-span-1 flex flex-col">
              {/* Folder shape button */}
              <button
                onClick={() => toggleCategory(category.id)}
                id={`category-btn-${category.id}`}
                className="group w-full focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ "--ring-color": color.tab } as React.CSSProperties}
              >
                {/* Folder tab */}
                <div
                  className="h-3 w-2/5 rounded-t-md ml-2"
                  style={{ backgroundColor: color.tab }}
                />
                {/* Folder body */}
                <div
                  className={`
                    w-full h-24 rounded-b-xl rounded-tr-xl px-3
                    flex flex-col items-center justify-center gap-1.5
                    border-2 transition-all duration-200
                    group-hover:brightness-95 group-hover:-translate-y-0.5 group-hover:shadow-lg
                    ${isOpen ? "shadow-lg -translate-y-0.5 brightness-95" : "shadow-sm"}
                  `}
                  style={{
                    backgroundColor: color.body,
                    borderColor: color.tab,
                  }}
                >
                  {/* Number */}
                  <span
                    className="text-2xl font-black leading-none"
                    style={{ color: color.text }}
                  >
                    {category.id}
                  </span>
                  {/* Category name */}
                  <span
                    className="text-[10px] font-semibold text-center leading-tight line-clamp-2"
                    style={{ color: color.text }}
                  >
                    {category.name}
                  </span>
                </div>
              </button>

              {/* Folder Layer - Question list (slides down below the folder) */}
              {isOpen && (
                <div className="mt-2 animate-slide-down">
                  <div
                    className="p-2.5 rounded-xl border shadow-md"
                    style={{
                      backgroundColor: color.body,
                      borderColor: color.tab + "60",
                    }}
                  >
                    <p
                      className="text-[9px] font-bold mb-2 flex items-center gap-1 uppercase tracking-wide"
                      style={{ color: color.text }}
                    >
                      <BookOpen size={9} />
                      {category.name}
                    </p>
                    <div className="flex flex-col gap-1">
                      {category.questions.map((q) => {
                        const subNum = parseInt(q.id.slice(1), 10);
                        const label = `${category.id}-${subNum}`;
                        return (
                          <button
                            key={q.id}
                            id={`question-btn-${q.id}`}
                            onClick={() => router.push(`/practice/${q.id}`)}
                            className="
                              w-full px-2 py-1.5 rounded-lg text-[11px] font-semibold
                              text-white text-left
                              hover:opacity-90 hover:shadow-sm
                              transition-all duration-150
                              focus:outline-none
                            "
                            style={{ backgroundColor: color.btn }}
                            title={q.description.split("\n")[0]}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Instruction folder */}
        <div className="col-span-1 flex flex-col">
          <button
            onClick={() => setShowInstruction(true)}
            id="instruction-btn"
            className="group w-full focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            {/* Folder tab */}
            <div className="h-3 w-2/5 rounded-t-md ml-2 bg-slate-400" />
            {/* Folder body */}
            <div
              className="
                w-full h-24 rounded-b-xl rounded-tr-xl px-3
                flex flex-col items-center justify-center gap-1.5
                bg-slate-100 border-2 border-slate-400
                shadow-sm transition-all duration-200
                group-hover:brightness-95 group-hover:-translate-y-0.5 group-hover:shadow-lg
              "
            >
              <HelpCircle size={22} className="text-slate-500" />
              <span className="text-[10px] font-bold text-slate-600 text-center tracking-wide uppercase">
                Instruction
              </span>
            </div>
          </button>
        </div>
      </div>

      <InstructionModal
        open={showInstruction}
        onClose={() => setShowInstruction(false)}
      />
    </>
  );
}
