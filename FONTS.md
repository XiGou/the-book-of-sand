# 字体文件说明

本项目使用本地字体文件替代 Google Fonts，以提升加载速度。字体文件会自动包含在构建输出中。

## 自动下载

字体文件会在构建时自动下载。运行 `npm run build` 时，`prebuild` 脚本会自动执行，下载所需的字体文件到 `public/fonts/` 目录。

Vite 会自动将 `public/fonts/` 目录下的文件复制到构建输出的 `dist/fonts/` 目录，因此构建后的页面会包含所有字体文件，无需从外部加载。

## 字体文件

以下字体文件会被自动下载到 `public/fonts/` 目录：

### Cormorant Garamond
- `cormorant-garamond-400.woff2` - Regular (400)
- `cormorant-garamond-400-italic.woff2` - Italic (400)
- `cormorant-garamond-600.woff2` - SemiBold (600)

### Noto Serif SC
- `noto-serif-sc-400.woff2` - Regular (400)
- `noto-serif-sc-600.woff2` - SemiBold (600)

## 手动下载（可选）

如果需要手动下载字体文件，可以运行：

```bash
./download-fonts.sh
```

### 方法 2: 手动下载

访问以下 URL 下载字体文件：

**Cormorant Garamond:**
- Regular: https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtKky2F7g.woff2
- Italic: https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jD-iNM8A_6pUKz9.woff2
- SemiBold: https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtKky2F7g.woff2

**Noto Serif SC:**
- Regular: https://fonts.gstatic.com/s/notoserifsc/v35/H4chBXePl9DZ0Xe7gG9cyOj7oqOcaThrVMcaeccjhXXDsOyAEEmuIi6j7j64sLjgBtMI1z49XW4.woff2
- SemiBold: 请访问 https://fonts.google.com/specimen/Noto+Serif+SC 下载

### 方法 3: 使用 Google Fonts Helper

访问 https://google-webfonts-helper.herokuapp.com/ 并搜索字体名称，然后下载所需的字体文件。

## 注意事项

- 字体文件应放在 `public/fonts/` 目录下
- 确保文件名与 `src/fonts.css` 中的路径匹配
- 如果字体文件不存在，浏览器会回退到系统字体（Georgia 和 Songti SC）
