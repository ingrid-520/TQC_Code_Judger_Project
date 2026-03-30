"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle } from "lucide-react";

export interface TestCaseResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  isMatch: boolean;
}

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: TestCaseResult[];
}

export default function ResultModal({
  isOpen,
  onClose,
  results,
}: ResultModalProps) {
  const allCorrect = results.every((r) => r.isMatch);

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle
            className={`flex items-center gap-2 text-2xl ${
              allCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {allCorrect ? (
              <>
                <CheckCircle2 size={28} />
                <span>All Correct!</span>
              </>
            ) : (
              <>
                <XCircle size={28} />
                <span>Incorrect</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {!allCorrect && (
            <p className="text-sm text-foreground/80 font-medium">
              部分或全部測資輸出不匹配，請比對下方結果：
            </p>
          )}

          <div className="space-y-6">
            {results.map((res, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50"
              >
                {/* 結果標題行：只這行有顏色 */}
                <div className="flex items-center gap-2 mb-3">
                  {res.isMatch ? (
                    <>
                      <CheckCircle2 size={16} className="text-green-600" />
                      <span className="text-sm font-bold text-green-700">
                        Test Case {idx + 1} — PASS
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-red-600" />
                      <span className="text-sm font-bold text-red-700">
                        Test Case {idx + 1} — FAIL
                      </span>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  {res.input && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 mb-1">
                        INPUT:
                      </h4>
                      <pre className="p-2 bg-white border border-slate-200 rounded text-xs font-mono text-slate-700 whitespace-pre-wrap">
                        {res.input}
                      </pre>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-semibold text-slate-500">
                        你的輸出 (Actual)
                      </h4>
                      <pre className="p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono overflow-auto whitespace-pre text-slate-800 min-h-[60px]">
                        {res.actualOutput || "(無輸出)"}
                      </pre>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-semibold text-slate-500">
                        預期輸出 (Expected)
                      </h4>
                      <pre className="p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono overflow-auto whitespace-pre text-slate-800 min-h-[60px]">
                        {res.expectedOutput}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {allCorrect && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm font-medium">
              太棒了！你的程式碼順利通過所有 Test Case 的比對。
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
