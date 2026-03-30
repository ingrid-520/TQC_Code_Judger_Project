import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TQC Python 練習系統",
  description:
    "TQC Python 證照考試練習平台，支援自動化 Test Case 比對，模擬真實考試環境。",
  keywords: ["TQC", "Python", "練習", "刷題", "證照"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      // 強制 Light Mode，不繼承系統 dark mode
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var _orig;
                Object.defineProperty(window, 'define', {
                  configurable: true,
                  get: function() { return _orig; },
                  set: function(val) {
                    if (val && val.amd && !val.__tqcPatched) {
                      // Monaco AMD define 安裝時，先把問題模組 stub 進去
                      try { val('stackframe', [], function() { return function() {}; }); } catch(e) {}
                      try {
                        val('error-stack-parser', ['stackframe'], function() {
                          return { parse: function() { return []; } };
                        });
                      } catch(e) {}
                      val.__tqcPatched = true;
                    }
                    _orig = val;
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background">{children}</body>
    </html>
  );
}
