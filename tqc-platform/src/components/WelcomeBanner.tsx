import { Zap, Trophy, Target } from "lucide-react";

export default function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 shadow-xl shadow-blue-200/60">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 rounded-full bg-blue-400/10 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative px-8 py-6 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white/90 text-[10px] font-semibold tracking-wider uppercase mb-3 border border-white/20">
          <Zap size={10} className="fill-current" />
          <span>TQC+ Python</span>
        </div>

        {/* Main title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight tracking-tight">
          Python 刷題練習系統
        </h1>
        <p className="text-blue-100 text-sm max-w-lg leading-relaxed mb-4">
          模擬 LeetCode 環境，自動化 Test Case 比對
          <br />
          <span className="text-white font-semibold">9 大題型 · 90 道題目</span>
        </p>

        {/* Stats row - more compact */}
        <div className="flex items-center gap-4">
          {[
            { icon: Target, label: "題目", value: "90" },
            { icon: Trophy, label: "大題", value: "9" },
            { icon: Zap, label: "核心", value: "Pyodide" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm"
            >
              <Icon size={12} className="text-blue-200" />
              <div className="flex flex-col items-start">
                <span className="text-white font-bold text-sm leading-none">
                  {value}
                </span>
                <span className="text-blue-200/80 text-[9px]">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
