# TQC Python 練習系統

> 一個在瀏覽器端執行 Python 的 TQC+ 程式語言Python 練習平台，無需安裝任何環境，開箱即用。

---

## 功能特色

| 功能 | 說明 |
|------|------|
| 🗂️ 九大類題目 | 涵蓋 TQC+ Python 全部 90 道認證練習題 |
| ▶️ 瀏覽器執行 Python | 使用 [Pyodide](https://pyodide.org) 在前端直接執行 Python，無需後端 |
| ✅ 自動批改 | Submit 後與標準答案自動比對，逐一測資呈現 PASS / FAIL |
| 📄 附帶檔案預覽 | 第九類「檔案與例外處理」題目提供一鍵預覽題目附帶的虛擬檔案內容 |
| 💡 解答對照 | 一鍵切換「我的程式碼」與「參考解答」，並排檢視 |
| 📋 題目側邊欄 | 可滑出題目列表，快速跳題 |
| 🌙 深色主題 | 全站淺色介面，Monaco Editor 一致主題 |

---

## 技術架構

```
Next.js 16 (App Router)
├── React 19
├── TypeScript
├── Tailwind CSS v4
├── Monaco Editor (@monaco-editor/react)  ← 程式碼編輯器
├── Pyodide v0.25.0 (CDN)                ← 瀏覽器端 Python 執行環境
├── Base UI (shadcn/ui 相容元件)
└── Lucide React (圖示)
```

### 專案目錄結構

```
tqc-platform/
├── public/
│   ├── data/
│   │   └── tqc_questions.json   ← 所有題目資料
│   └── logo.png
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← 全站 Layout
│   │   ├── page.tsx             ← 首頁（類別格線）
│   │   └── practice/[questionId]/
│   │       └── page.tsx         ← 練習頁 SSR 路由
│   ├── components/
│   │   ├── CategoryGrid.tsx     ← 首頁資料夾型類別選單
│   │   ├── Header.tsx           ← 頂部導覽列
│   │   ├── InstructionModal.tsx ← 使用說明 Modal
│   │   ├── PracticeClient.tsx   ← 核心練習頁（編輯器 + 執行）
│   │   ├── ResultModal.tsx      ← 測資結果彈出視窗
│   │   └── WelcomeBanner.tsx    ← 首頁橫幅
│   └── types/
│       └── question.ts          ← TypeScript 型別定義
└── python_temp/                 ← 題目資料前處理腳本（非網站程式碼）
    ├── build_json.py            ← 從原始題目建立 JSON
    ├── patch_9.py               ← 補充第九類檔案內容
    └── test_all.py              ← 本地驗證所有解答正確性
```

---

## 快速開始

### 環境需求

- Node.js ≥ 18
- npm ≥ 9

### 安裝與啟動

```bash
# 1. 進入專案目錄
cd tqc-platform

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev
```

開啟瀏覽器前往 [http://localhost:3000](http://localhost:3000)

### 建置正式版

```bash
npm run build
npm run start
```

---

## 題目資料格式

所有題目存放於 `public/data/tqc_questions.json`，格式如下：

```jsonc
[
  {
    "id": "901",                   // 題目編號（類別ID + 序號）
    "category_id": "9",           // 類別 ID
    "category_name": "檔案與例外處理",
    "description": "題目說明...",  // 完整題目描述
    "test_cases": [
      {
        "input": "...",            // 標準輸入（可為空字串）
        "expected_output": "..."   // 標準輸出
      }
    ],
    "template_code": "# TODO",    // 學生起始程式碼
    "solution_code": "...",        // 參考解答
    "files": [                     // 選填：題目附帶的虛擬檔案（第九類使用）
      {
        "filename": "data.txt",
        "content": "..."
      }
    ]
  }
]
```

### 新增或修改題目

直接編輯 `public/data/tqc_questions.json`，重新整理瀏覽器即可生效（無需重啟伺服器）。

---

## 九大題目類別

| 類別 ID | 名稱 | 題數 |
|---------|------|------|
| 1 | 基本程式設計 | 10 |
| 2 | 選擇敘述 | 10 |
| 3 | 迴圈敘述 | 10 |
| 4 | 進階控制流程 | 10 |
| 5 | 函式 | 10 |
| 6 | 串列與元組 | 10 |
| 7 | 字典與集合 | 10 |
| 8 | 字串處理 | 10 |
| 9 | 檔案與例外處理 | 10 |

---

## Pyodide 執行機制

本平台使用 [Pyodide v0.25.0](https://cdn.jsdelivr.net/pyodide/v0.25.0/full/) 從 CDN 載入 WebAssembly Python 環境：

1. **進入練習頁後**，背景自動非同步載入 Pyodide（約 5–10 秒）
2. **載入完成前**，編輯器頂部顯示「初始化 Python 環境中…」提示，Submit 按鈕不可用
3. **執行時**，透過 Python 的 `sys.stdin` / `sys.stdout` 進行 I/O 模擬
4. **第九類題目**的附帶檔案會在執行前寫入 Pyodide 的虛擬檔案系統（`pyodide.FS`）

> **注意**：Monaco Editor 的 AMD 模組載入器與 Pyodide 存在衝突，已在 `next.config.ts` 的 webpack 設定中透過 `parser: { amd: false }` 解決。

---

## 已知限制

- 第一次進入練習頁需等待 Pyodide 下載（約 10MB），網速慢時會較久
- 部分需要 `import` 第三方套件的題目，須使用 Pyodide 已預裝的套件（如 numpy、pandas）
- 不支援多執行緒或 `time.sleep` 等阻塞操作

---

## License

本專案僅供學習與練習使用，題目內容版權歸屬 TQC+ / 財團法人技術士技能檢定中心。
