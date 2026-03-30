# TQC Python 練習系統

> 一個在瀏覽器端執行 Python 的 TQC+ 程式語言 Python 練習平台，無需安裝任何環境，開箱即用。

👉 **[Live Demo 免費體驗連結](https://ingrid-520.github.io/TQC_Code_Judger_Project/)**

---

## 功能特色

| 功能 | 說明 |
|------|------|
| 🗂️ 九大類題目 | 涵蓋 TQC+ Python 全部 90 道認證練習題 |
| ▶️ 瀏覽器執行 Python | 使用 [Pyodide](https://pyodide.org) 在前端直接執行 Python，無需後端 |
| ✅ 自動批改 | Submit 後與標準答案自動比對，逐一測資呈現 PASS / FAIL |
| 📄 附帶檔案預覽 | 第九類「檔案與例外處理」題目提供一鍵預覽題目所需的虛擬檔案內容 |
| 💡 解答對照 | 一鍵切換「我的程式碼」與「參考解答」 |
| 📋 題目側邊欄 | 可滑出題目列表，快速跳題 |
| ☀️ 淺色介面 | 全站 Light Mode，Monaco Editor 一致主題 |

---

## 使用者操作說明

### 首頁

1. **選擇題目類別**：點擊任意資料夾圖示（類別 1～9）展開題目列表
2. **選題**：點擊列表中的題號按鈕（如 `1-1`）進入練習頁
3. **操作說明**：點擊最右側灰色資料夾「Instruction」查看系統使用說明

---

### 練習頁

練習頁採用**左右分割**佈局：

- **左側**：題目說明（Description）＋測試案例（Test Cases）
- **右側**：Monaco 程式碼編輯器

#### 頂部工具列

| 元素 | 功能 |
|------|------|
| 🏠 Logo | 返回首頁 |
| ☰ QUESTION LIST | 展開側邊欄，快速切換任意題目 |
| ▶ SUBMIT | 執行程式並與所有測試案例比對 |
| SOLUTION | 切換至參考解答檢視（只讀模式） |
| BACK TO MY CODE | 切回你的程式碼 |

#### 撰寫與提交流程

```
1. 閱讀左側題目說明
2. 在右側編輯器撰寫 Python 程式碼
3. 等待右上角「初始化 Python 環境中…」提示消失（首次需 5–15 秒）
4. 點擊 SUBMIT
5. 結果視窗逐題顯示 PASS / FAIL 及輸出比對
```

> ⚠️ **首次使用**：進入練習頁時，系統會從網路下載約 10MB 的 Pyodide WebAssembly 環境，請耐心等待 SUBMIT 按鈕變為可用狀態後再提交。

#### 第九類題目（檔案與例外處理）

部分題目需要讀取檔案（如 `read.txt`、`data.txt`）。這些檔案已預先內建於題目資料中，執行時會自動寫入 Python 的虛擬檔案系統。

- 點擊題目說明右上角的 **「📄 預覽檔案」** 按鈕可查看檔案內容
- 撰寫程式碼時直接用 `open("filename", "r")` 即可，路徑與真實檔案相同

#### 結果視窗說明

點擊 SUBMIT 後彈出結果視窗：

- **✅ All Correct!**：所有測試案例全部通過
- **❌ Incorrect**：部分或全部未通過
- 每個 Test Case 會顯示：輸入（INPUT）、你的輸出（Actual）、預期輸出（Expected）

---

## 九大題目類別

| 類別 | 名稱 | 題數 |
|------|------|------|
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

## 快速開始（開發者）

### 環境需求

- Node.js ≥ 18
- npm ≥ 9
- 網路連線（首次載入 Pyodide CDN）

### 安裝與啟動

```bash
cd tqc-platform
npm install
npm run dev
```

開啟瀏覽器前往 [http://localhost:3000](http://localhost:3000)

### 建置正式版 (Local)

```bash
npm run build
npm run start
```

### GitHub Pages 自動部署

本專案已設定好 GitHub Actions (`.github/workflows/nextjs.yml`)，並且於 `next.config.ts` 開啟 `output: "export"` 及 `basePath` 設定。

只要將程式碼推送到 `main` 分支，GitHub 就會自動執行建置並發布到 GitHub Pages。
**請務必確認** 該專案在 GitHub 的 **Settings > Pages > Build and deployment** 中，Source 設定為 **"GitHub Actions"**。

---

## 技術架構

```
Next.js 16 (App Router)
├── React 19
├── TypeScript
├── Tailwind CSS v4
├── Monaco Editor (@monaco-editor/react)  ← 程式碼編輯器
├── Pyodide v0.25.0 (CDN)                ← 瀏覽器端 Python 執行環境
├── Base UI / shadcn 相容元件
└── Lucide React (圖示)
```

### 專案目錄結構

```
tqc-platform/
├── public/
│   ├── data/
│   │   └── tqc_questions.json   ← 所有題目資料
│   └── logo.png
└── src/
    ├── app/
    │   ├── layout.tsx           ← 全站 Layout（含 AMD 修補腳本）
    │   ├── page.tsx             ← 首頁
    │   └── practice/[questionId]/page.tsx
    ├── components/
    │   ├── CategoryGrid.tsx     ← 首頁資料夾型類別選單
    │   ├── PracticeClient.tsx   ← 核心練習頁（編輯器 + Pyodide 執行）
    │   ├── ResultModal.tsx      ← 測資結果彈出視窗
    │   ├── InstructionModal.tsx ← 使用說明 Modal
    │   ├── Header.tsx
    │   └── WelcomeBanner.tsx
    └── types/
        └── question.ts
```

---

## 題目資料格式

所有題目存放於 `public/data/tqc_questions.json`：

```jsonc
{
  "id": "901",
  "category_id": "9",
  "category_name": "檔案與例外處理",
  "description": "題目說明...",
  "test_cases": [
    { "input": "...", "expected_output": "..." }
  ],
  "template_code": "# TODO",
  "solution_code": "...",
  "files": [                    // 選填，第九類使用
    { "filename": "data.txt", "content": "..." }
  ]
}
```

直接編輯 JSON 後重新整理瀏覽器即可生效。

---

## 已知限制

- 首次進入練習頁需等待 Pyodide 下載（約 10MB）
- 不支援多執行緒或 `time.sleep` 等阻塞操作
- 僅支援 Pyodide 已內建的第三方套件

---

## License

本專案僅供學習與練習使用，題目內容版權歸屬 TQC+ / 財團法人技術士技能檢定中心。
