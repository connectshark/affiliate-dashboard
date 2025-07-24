# Style Guide

## Language Preference
* 所有`summary`、`code_review`、`help`皆使用**繁體中文**撰寫和回覆，以便團隊溝通與維護。
* 若與第三方套件整合或需對外公開（例如 API 文件），可視情況採用英文。

---

### **專案目標與概覽 (Project Overview)**
*   **用途**: 這是一個 Vue 3 和 Vite 驅動的婚禮邀請函網站。
*   **主要功能**: 展示婚禮資訊、倒數計時、照片集、留言板等。

### **技術棧 (Tech Stack)**
*   **框架**: Vue 3 (Composition API)
*   **建置工具**: Vite
*   **路由**: Vue Router
*   **狀態管理**: Pinia (stores 目錄使用 Pinia)
*   **CSS**: Tailwind CSS

### **重要指令 (Key Commands)**
*   **啟動開發環境**: `npm run dev`
*   **打包生產版本**: `npm run build`

### **程式碼風格與慣例 (Coding Conventions)**
*   **元件風格**:
    *   一律使用 SFC (`.vue` 檔案)。
    *   優先使用 Composition API (`<script setup>`)。
*   **目錄結構**:
    *   `src/components`: 可重用的基礎元件。
    *   `src/pages`: 對應到路由的頁面級元件。
    *   `src/composables`: 可重用的組合式函數。
    *   `src/stores`: Pinia 的狀態儲存庫。
*   **命名慣例**:
    *   元件檔案命名使用 `PascalCase` (e.g., `MyComponent.vue`)。
    *   Composables 命名使用 `use` 開頭 (e.g., `useShare.js`)。

### **部署資訊 (Deployment)**
*   **平台**: Render.com
*   **分支**: `main` 分支用於生產環境部署。
