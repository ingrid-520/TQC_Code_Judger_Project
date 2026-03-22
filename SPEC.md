# TQC Python 刷題平台：Vibe Coding 開發規格書 (PRD)

## 1. 專案概述 (Project Overview)

- **目標**：建立一個輕量化、純前端為主的 Python 練習平台，模擬 LeetCode 環境，專供 TQC Python 證照考試練習。
- **核心價值**：自動化 Test Case 比對，解決手動測試耗時的問題。
- **視覺風格**：**全站強制 Dark Mode**。介面簡潔、專業，採用左右分割佈局。

## 2. 技術棧建議 (Tech Stack)

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + Shadcn UI (組件庫)
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Execution Engine**: **Pyodide** (在瀏覽器執行 Python，無需後端伺服器)
- **Icons**: Lucide React

---

## 3. 資料結構設計 (Data Schema)

為了讓 AI 好辦事，我們將 90 題 TQC 題目定義為標準 JSON：

JSON

`{
  "id": "101",
  "category": "1",
  "title": "整數格式化輸出",
  "description": "寫一個程式，輸入四個整數...",
  "template_code": "# 在此輸入你的程式碼\n",
  "test_cases": [
    { "input": "5\n10\n15\n20", "expected_output": "5 10 15 20\n" }
  ],
  "solution": "a = int(input())\n..."
}`

---

## 4. 頁面詳細規格 (Page Specifications)

### 📂 首頁 (Home Page)

- **Welcome Banner**: 滿版寬度，漸層背景（淺藍/白），顯示「TQC Python 練習系統」。
- **Folder Grid**:
    - 5x2 網格顯示 9 個大類別。
    - **Folder Layer 邏輯**：點擊大類別後，下方平滑展開（Accordion）或切換顯示 1-1 到 1-10 的題目按鈕。
    - **Instruction 按鈕**：右下角獨立按鈕，點擊跳出 Modal 說明考試規則。

### 💻 練習頁 (Practice Page)

- **Sidebar (Navigation)**：
    - 預設隱藏，點擊左上角 `Menu` 圖示從左側滑出。
    - 樹狀結構：顯示 1~9 類，展開後可切換題目。
- **Split View (50:50)**：
    - **左側 (Description Panel)**：
        - 上：題目文字（支援 Markdown）。
        - 下：Test Case 區塊（顯示 Input 與 Expected Output）。
    - **右側 (Editor Panel)**：
        - 頂部工具列：包含「Question List (回首頁)」、「Submit」、「Solution」按鈕。
        - 中間：Monaco Editor (Python 語法高亮)。
        - **快捷鍵**：支援 `Ctrl + Enter` 直接執行（Run）並在下方輸出結果。

### 彈窗與回饋 (Result & Answer)

- **Result Modal**：
    - **Correct**: 綠色標題，大勾勾。
    - **Incorrect**: 紅色標題，顯示「輸出不匹配」，並列出「你的輸出」vs「預期輸出」的 Diff。
- **Solution Page**：
    - 點擊 Solution 按鈕，編輯器內容切換為唯讀的「標準答案」，或以右側側邊欄形式彈出。

---

## 5. 核心邏輯指令 (Core Logic for AI)

### ⚙️ 判題機制 (Judging Logic)

1. **環境**：使用 Pyodide 載入 Python 環境。
2. **輸入模擬**：將 Test Case 的 `input` 字串注入 Pyodide 的 `stdin`。
3. **輸出比對**：
    - 獲取 Pyodide 的 `stdout` 內容。
    - **重要規則**：使用 `.strip()` 去除首尾空白，逐行比對或完全匹配比對（TQC 考試對空格非常敏感）。