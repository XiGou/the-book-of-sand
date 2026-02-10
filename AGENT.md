# 沙之书 · The Book of Sand

基于博尔赫斯短篇《沙之书》的**无限之书阅读器**交互前端。灵感来自歌剧 [The Book of Sand](https://thebookofsand.net/)。

- **original_text/**：博尔赫斯《沙之书》中英文原文（cn.md / en.md），作为阅读器内容来源。
- **目标**：实现「无始无终」的翻书体验——无首页/末页、荒诞页码、偶现且不重复的插画、中英切换。

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 构建 | **Vite 5** |
| 框架 | **React 18** |
| 语言 | **TypeScript 5** |
| 样式 | 原生 **CSS**（无 UI 框架），CSS 变量 + 排版字体 |
| 字体 | 英文 Cormorant Garamond / 中文 Noto Serif SC（Google Fonts，见 index.html） |

- 无状态管理库（仅 React `useState`）
- 无路由（单页：封面 ↔ 阅读器 / 关于）

---

## 项目结构（便于 LLM 定位）

```
books-of-sand/
├── AGENT.md              # 本文件：项目说明与约定
├── original_text/        # 原始文本，仅作内容来源，不参与构建
│   ├── cn.md
│   └── en.md
├── index.html
├── package.json / vite.config.ts / tsconfig*.json
└── src/
    ├── main.tsx          # 入口，挂载 App
    ├── App.tsx            # 根组件：封面 ↔ 阅读器 / 关于 视图切换、语言状态
    ├── index.css          # 全局变量与根样式
    ├── vite-env.d.ts
    ├── data/
    │   └── chunks.ts      # 按段落切分的中/英文本数组，供「页」内容循环使用
    ├── lib/
    │   └── book.ts        # 核心逻辑：页码生成、取页内容、是否带插画（无始无终语义）
    └── components/
        ├── About.tsx      # 关于页：沙之书介绍，引述原文讲特点、隐喻、启示
        ├── About.css
        ├── BookCover.tsx  # 封面（圣书 / 孟买），点击进入阅读器；底部「关于」进入 About
        ├── BookCover.css
        ├── BookReader.tsx # 阅读器：双栏页、页码、上一页/下一页、「找第一页/最后一页」
        ├── BookReader.css
        └── Illustrations.tsx # 每 2000 页一张的小插画（锚、面具、书等），SVG，按 index 唯一
```

---

## 核心概念（给 LLM 的约定）

1. **页索引 `pageIndex`**  
   整数，可正可负；无「第 0 页即首页」的语义，仅用于确定性生成页码与内容。用户「上一页/下一页」即 `index ± 1`。

2. **页码展示**  
   由 `lib/book.ts` 的 `getPageNumbers(index)` 确定性生成：`index === 0` 时左 40514、右 999（与原文一致），其余为八位数；偶现「n^9」九次幂形式。对应文中「无穷级数允许任意数项」。

3. **页内容**  
   `getPageContent(index, lang)`：从 `data/chunks.ts` 按 `index` 取模循环取段落；正文区为双栏排版（`columns: 2`），小屏单栏。

4. **插画「以后再也看不到了」**  
   `getIllustration(index)`：仅当 `index % 2000 === 0` 时该页有插画。阅读器用 `seenIllustrationIds` 记录本会话已展示过的插画 id；同一 id 只展示一次，再次翻回该页时显示「［以后再也看不到了。］」。

5. **「找第一页 / 找最后一页」**  
   两按钮触发连续向前/向后翻页（约 8 步），期间先显示「封面和手指之间总有好几页……」的 slip 提示，结束时显示「没有第一页」或「没有最后一页」。

6. **语言**  
   `Lang = 'cn' | 'en'`，由 App 状态保存，阅读器内切换；同一 `pageIndex` 对应同一逻辑「页」，仅展示语言不同。

---

## 开发与构建

- 安装依赖：`npm install`
- 开发：`npm run dev`
- 构建：`npm run build`（输出到 `dist/`）
- 预览构建结果：`npm run preview`

---

## 修改与扩展时注意

- 增删「页」内容：改 `src/data/chunks.ts`，保持中英数组段落顺序对应。
- 改页码规则或插画间隔：改 `src/lib/book.ts`。
- 新增插画种类：在 `src/components/Illustrations.tsx` 的 `illustrations` 中增加，并在 `book.ts` 的 `getIllustration` 中调整取模上限（当前为 8）。
