# 114-2 企業創新管理 期末成果

**課程**：114-2 企業創新管理 · NTUE（通識課）

## 快速導覽

- 線上展示：https://111319022.github.io/BIMCourse-report/
- 本專案為純靜態網站，直接以瀏覽器開啟或使用簡易 HTTP 伺服器檢視。

如何在本機檢視：

```bash
# 建議（任一）
open index.html            # macOS：以預設瀏覽器開啟
python3 -m http.server 8000  # 在本目錄啟動簡易伺服器，然後瀏覽 http://localhost:8000
```

## 專案結構（重點檔案）

- [index.html](index.html) — 首頁（Hero 統計與導覽）
- [ranking.html](ranking.html) — 最終 NPV 排名與比較
- [journey.html](journey.html) — 10 期損益、營收與市占走勢圖
- [strategy.html](strategy.html) — 決策紀錄、定價與區域分析
- [analysis.html](analysis.html) — 勝出歸因與改進建議
- [conclusion.html](conclusion.html) — 管理洞察與學習心得
- [data.js](data.js) — 所有競賽數據來源，供圖表與頁面使用
- [script.js](script.js)、[style.css](style.css) — 全站 JS 與樣式

資料夾：

- I_notes/、II_flex_HFM/、IV_project_research/（課程與參考文件，已改為 ASCII-safe 名稱）

## 技術與第三方資源

- 圖表：Chart.js (v4)
- 圖示：Phosphor Icons
- 字體：Google Fonts（DotGothic16、Noto Serif TC、Noto Sans TC）
- 架構：純 HTML / CSS / JavaScript（無建置工具）

## 注意事項與已知問題

- 內容與資料由 [data.js](data.js) 中管理，若要更新圖表資料請在該檔案編輯。
- 專案為靜態頁面，**不需要編譯或 build 步驟**；若使用伺服器部署（GitHub Pages 等），直接將檔案發佈即可。
