"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import Editor from "@monaco-editor/react";
import { Question, Category } from "@/types/question";
import { Play, FileCode2, Loader2, List, FileText, X } from "lucide-react";
import ResultModal from "./ResultModal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// 宣告 window 上的 loadPyodide
declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<any>;
  }
}

interface PracticeClientProps {
  question: Question;
  categories: Category[];
}

export default function PracticeClient({ question, categories }: PracticeClientProps) {
  const router = useRouter();

  const [code, setCode] = useState(question.template_code || "");
  const [showSolution, setShowSolution] = useState(false);
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [pyodideInstance, setPyodideInstance] = useState<any>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [testResults, setTestResults] = useState<{
    input: string;
    expectedOutput: string;
    actualOutput: string;
    isMatch: boolean;
  }[]>([]);
  const [filePreviewOpen, setFilePreviewOpen] = useState(false);

  // 初始化 Pyodide 環境的 Effect
  useEffect(() => {
    let isMounted = true;

    const initPyodide = async () => {
      // 1. 如果尚未載入 Pyodide，手動載入並避開 Monaco AMD 的干擾
      if (!window.loadPyodide) {
        try {
          // 暫時隱藏 AMD define
          const defineRef = (window as any).define;
          (window as any).define = undefined;

          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });

          // 恢復 AMD define
          if (defineRef !== undefined) {
            (window as any).define = defineRef;
          }
        } catch (err) {
          console.error("Failed to inject Pyodide script", err);
          return;
        }
      }

      // 2. 初始化環境
      if (window.loadPyodide && !isPyodideReady && !pyodideInstance && isMounted) {
        try {
          const p = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
          });
          if (isMounted) {
            setPyodideInstance(p);
            setIsPyodideReady(true);
          }
        } catch (err) {
          console.error("Failed to load Pyodide:", err);
        }
      }
    };

    if (!isPyodideReady && !pyodideInstance) {
      initPyodide();
    }

    return () => { isMounted = false; };
  }, [isPyodideReady, pyodideInstance]);

  const handleExecution = async () => {
    if (!pyodideInstance) return;

    setIsExecuting(true);
    setModalOpen(false);

    const results = [];

    try {
      // 載入虛擬檔案（針對第九類檔案題）
      if (question.files && pyodideInstance.FS) {
        question.files.forEach((file) => {
          try {
            pyodideInstance.FS.writeFile(file.filename, file.content, { encoding: "utf8" });
          } catch (e) {
            console.error(`Failed to write file \${file.filename}:`, e);
          }
        });
      }

      for (let i = 0; i < (question.test_cases?.length || 1); i++) {
        const testCase = question.test_cases?.[i] || { input: "", expected_output: "" };
        let actualOutput = "";

        // 2. 劫持標準輸出入 (stdin, stdout) 使用純 Python 層級，保證字元 100% 對齊
        await pyodideInstance.runPythonAsync(`
import sys
from io import StringIO
sys.stdin = StringIO("""${testCase.input.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}""")
sys.stdout = StringIO()
        `);

        // 3. 執行程式碼
        const codeToRun = showSolution ? question.solution_code : code;

        try {
          await pyodideInstance.runPythonAsync(codeToRun);
          actualOutput = await pyodideInstance.runPythonAsync("sys.stdout.getvalue()");
        } catch (err: any) {
          try {
             actualOutput = await pyodideInstance.runPythonAsync("sys.stdout.getvalue()");
          } catch(e) {}
          actualOutput += err.toString() + "\n";
        }

        const expected = testCase.expected_output || "";
        const isMatch = actualOutput.trimEnd() === expected.trimEnd();

        results.push({
          input: testCase.input,
          expectedOutput: expected,
          actualOutput,
          isMatch,
        });
        
        // 如果遇到一個測資失敗，可以提早中斷，或是選擇全部跑完。這裡選擇全部跑完以便檢查。
      }

      setTestResults(results);
      setModalOpen(true);

    } catch (err) {
      console.error(err);
      alert("Execution error! Check console.");
    } finally {
      setIsExecuting(false);
      try {
         await pyodideInstance?.runPythonAsync("sys.stdout = sys.__stdout__; sys.stdin = sys.__stdin__");
      } catch(e) {}
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden relative">
      {/* Top Toolbar */}
      <header className="h-14 grid grid-cols-[1fr_auto_1fr] items-center px-4 border-b border-border bg-white shrink-0">
        {/* 左欄：Logo + Question List */}
        <div className="flex items-center gap-1">
          <Link href="/" title="回到首頁" className="flex items-center justify-center w-8 h-8 hover:bg-slate-100 rounded-md transition-colors mr-1">
            <Image src={logo} alt="Logo" width={20} height={20} unoptimized className="w-5 h-5 object-contain" />
          </Link>

          <div className="w-px h-5 bg-slate-300 mx-1"></div>

          {/* Question List Sidebar Trigger */}
          <Sheet>
            <SheetTrigger
              render={
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-slate-100 text-sm font-semibold text-slate-700 transition-colors" />
              }
            >
              <List size={16} />
              QUESTION LIST
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto p-0">
              <SheetHeader className="p-4 border-b sticky top-0 bg-white z-10">
                <SheetTitle className="text-left text-blue-900 font-bold">題目列表</SheetTitle>
              </SheetHeader>
              <div className="p-4 flex flex-col gap-5">
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <h4 className="font-bold text-[13px] text-slate-800 mb-2 border-l-2 border-blue-500 pl-2">
                      {cat.id} {cat.name}
                    </h4>
                    <div className="grid grid-cols-5 gap-2">
                      {cat.questions.map((q) => {
                        const subNum = parseInt(q.id.slice(1), 10);
                        const label = `${cat.id}-${subNum}`;
                        const isCurrent = q.id === question.id;
                        return (
                          <button
                            key={q.id}
                            onClick={() => router.push(`/practice/${q.id}`)}
                            className={`py-1.5 rounded text-[11px] font-semibold transition-colors border ${isCurrent
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:border-blue-200'
                              }`}
                            title={q.description.split('\\n')[0]}
                          >
                            {label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* 中欄：SUBMIT（永遠置中） */}
        <button
          onClick={handleExecution}
          disabled={!isPyodideReady || isExecuting}
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold tracking-wide shadow-md transition-all active:scale-95"
          title={!isPyodideReady ? "Python 環境初始化中..." : "執行測試"}
        >
          {isExecuting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Play size={16} className="fill-current" />
          )}
          SUBMIT
        </button>

        {/* 右欄：Solution 按鈕靠右 */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-colors border ${showSolution
                ? "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
          >
            <FileCode2 size={16} />
            {showSolution ? "BACK TO MY CODE" : "SOLUTION"}
          </button>
        </div>
      </header>

      {/* Split View */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel: Description & Test Case */}
        <div className="w-1/2 flex flex-col border-r border-border bg-slate-50/50">
          {/* Description Section */}
          <div className="flex-1 flex flex-col min-h-0 border-b border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
                Description
              </h3>
              {question.files && question.files.length > 0 && (
                <button
                  onClick={() => setFilePreviewOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  <FileText size={13} />
                  預覽檔案
                </button>
              )}
            </div>
            <div className="flex-1 overflow-auto bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <h1 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">
                {question.id} {question.category_name}
              </h1>
              <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed max-w-full">
                {question.description}
              </pre>
            </div>
          </div>

          {/* Test Case Section */}
          <div className="h-[30%] flex flex-col min-h-0 p-5 bg-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-3 tracking-wide uppercase flex items-center justify-between">
              <span>Test Cases ({question.test_cases?.length || 0})</span>
            </h3>
            <div className="flex-1 overflow-auto flex flex-col gap-4">
              {question.test_cases?.map((tc, idx) => (
                <div key={idx} className="bg-white border border-slate-300 shadow-sm rounded-xl p-4 font-mono text-sm flex gap-4 shrink-0">
                  <div className="flex-1">
                    <span className="font-bold text-slate-500 text-xs">Test {idx + 1} - INPUT:</span>
                    <div className="mt-1 p-2 bg-slate-50 rounded whitespace-pre-wrap text-slate-800 border border-slate-100 min-h-[40px] text-xs">
                      {tc.input || "(無輸入)"}
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-slate-500 text-xs">
                      EXPECTED OUTPUT:
                    </span>
                    <div className="mt-1 p-2 bg-slate-50 rounded whitespace-pre-wrap text-slate-800 border border-slate-100 min-h-[40px] text-xs">
                      {tc.expected_output}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Editor */}
        <div className="w-1/2 flex flex-col bg-white">
          <div className="h-12 border-b border-border flex items-center px-4 bg-slate-50 shrink-0">
            <h3
              className={`text-sm font-bold tracking-wide uppercase ${showSolution ? "text-amber-600" : "text-blue-600"
                }`}
            >
              {showSolution ? "Example Answer" : "Code"}
            </h3>
            {!isPyodideReady && (
              <span className="ml-auto text-xs text-amber-600 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded">
                <Loader2 size={12} className="animate-spin" />
                初始化 Python 環境中...
              </span>
            )}
          </div>
          <div className="flex-1 relative w-full pt-2">
            {/* 使用兩個完全獨立的 Editor 實例來區隔使用者的程式碼與解答，解決取代與變更干擾的問題 */}
            <div className={`absolute inset-0 ${showSolution ? 'hidden' : 'block'}`}>
              <Editor
                height="100%"
                defaultLanguage="python"
                theme="light"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineHeight: 24,
                  fontFamily: "JetBrains Mono, Consolas, monospace",
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
            <div className={`absolute inset-0 ${!showSolution ? 'hidden' : 'block'}`}>
              <Editor
                height="100%"
                defaultLanguage="python"
                theme="light"
                value={question.solution_code}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineHeight: 24,
                  fontFamily: "JetBrains Mono, Consolas, monospace",
                  scrollBeyondLastLine: false,
                  readOnly: true,
                }}
              />
            </div>
          </div>
        </div>
      </main>

      <ResultModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        results={testResults}
      />

      {/* 檔案預覽 Overlay */}
      {filePreviewOpen && question.files && question.files.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setFilePreviewOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-[760px] max-h-[75vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-600" />
                <span className="font-bold text-slate-800 text-sm">題目附帶檔案</span>
              </div>
              <button
                onClick={() => setFilePreviewOpen(false)}
                className="p-1 rounded hover:bg-slate-200 transition-colors"
              >
                <X size={16} className="text-slate-500" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-5 space-y-6">
              {question.files.map((file, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-mono">
                      {file.filename}
                    </span>
                  </div>
                  <pre className="bg-slate-800 text-slate-100 rounded-xl p-4 text-xs font-mono whitespace-pre overflow-auto leading-relaxed">
                    {file.content}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
