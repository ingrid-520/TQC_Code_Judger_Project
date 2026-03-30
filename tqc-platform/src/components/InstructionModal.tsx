"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";

interface InstructionModalProps {
  open: boolean;
  onClose: () => void;
}

const rules = [
  {
    icon: Clock,
    title: "考試時間",
    content: "正式考試每大題限時 90 分鐘，共 10 小題。",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: FileText,
    title: "答題方式",
    content:
      "開啟對應的 PYD*.py 檔案，依題意作答後另存新檔為 PYA*.py 進行評分。",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: CheckCircle2,
    title: "輸出比對規則",
    content:
      "系統使用 .strip() 去除首尾空白後進行逐行比對。空格數量與換行符號都必須完全正確。",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: AlertTriangle,
    title: "注意事項",
    content:
      "TQC 考試對空格非常敏感！請確保輸出格式與題目要求完全一致，包含欄寬與對齊方式。",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Info,
    title: "評分標準",
    content:
      "每大題（10 小題）需通過所有 Test Case 方可得分。部分通過不計分。",
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
];

export default function InstructionModal({
  open,
  onClose,
}: InstructionModalProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span>📋</span>
            <span>考試說明</span>
            <Badge variant="secondary" className="ml-auto text-xs">
              TQC+ Python
            </Badge>
          </DialogTitle>
          <DialogDescription>
            請在開始練習前詳閱以下考試規則與注意事項。
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {rules.map((rule, index) => {
            const Icon = rule.icon;
            return (
              <div
                key={index}
                className={`flex gap-3 p-3.5 rounded-xl ${rule.bg} border border-border/30`}
              >
                <div
                  className={`flex-shrink-0 mt-0.5 ${rule.color}`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${rule.color} mb-1`}>
                    {rule.title}
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {rule.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            此平台的 Test Case 比對功能採用 Pyodide 在瀏覽器端執行 Python，
            <br />
            無需安裝任何環境，直接開始練習！
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
