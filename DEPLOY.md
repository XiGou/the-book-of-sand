# 部署说明

本项目配置为自动部署到 GitHub Pages。

## 自动部署

项目已配置 GitHub Actions workflow，当代码推送到 `master` 分支时会自动构建并部署到 GitHub Pages。

### 部署流程

1. 推送代码到 `master` 分支
2. GitHub Actions 自动触发构建
3. 构建完成后自动部署到 GitHub Pages
4. 访问地址：`https://xigou.github.io/the-book-of-sand/`

## 本地构建测试

在推送到 GitHub 之前，可以在本地测试构建：

```bash
# 安装依赖
npm install

# 下载字体（如果需要）
bash download-fonts.sh

# 构建
npm run build

# 预览构建结果
npm run preview
```

构建产物在 `dist/` 目录中。

## 性能优化

项目已配置以下优化：

1. **代码分割**：按模块分割代码，减少初始加载大小
2. **懒加载**：变体页面组件按需加载
3. **资源优化**：CSS、字体等资源单独打包
4. **压缩优化**：使用 esbuild 进行代码压缩

### Chunk 策略

- `react-vendor`: React 核心库
- `data-*`: 各模块数据文件
- `lib-utils`: 工具库

## GitHub Pages 配置

### GitHub Pages 的两种模式

GitHub Pages 有两种部署模式：

1. **用户/组织 Pages** (`username.github.io`)
   - 仓库名必须是 `username.github.io`
   - 访问地址：`https://username.github.io/`（根路径）
   - 只能有一个这样的仓库

2. **项目 Pages**（当前模式）
   - 仓库名可以是任何名称（如 `the-book-of-sand`）
   - 访问地址：`https://username.github.io/repository-name/`（带仓库名路径）
   - 可以有多个项目 Pages

### 当前项目配置

- 仓库名：`the-book-of-sand`
- 用户名：`XiGou`
- **访问地址**：`https://xigou.github.io/the-book-of-sand/`

这是 GitHub Pages 的标准行为，不是配置错误。`/the-book-of-sand/` 是必需的路径。

### 配置步骤

1. 进入仓库 Settings > Pages
2. 确保 Source 设置为 "GitHub Actions"
3. 确保 base path 为 `/the-book-of-sand/`（已在 `vite.config.ts` 中配置）

### 如果想使用根路径访问

如果希望访问地址是 `https://xigou.github.io/`（不带仓库名），需要：

1. 创建一个新仓库，名称为 `XiGou.github.io`
2. 将代码推送到该仓库
3. 修改 `vite.config.ts` 中的 `base` 为 `/`
4. 重新部署

但这样会占用用户 Pages 的唯一位置，通常不推荐。

## 故障排查

### 构建失败

- 检查 Node.js 版本（需要 20+）
- 检查 `download-fonts.sh` 是否可执行
- 查看 GitHub Actions 日志

### 页面 404

- 确认 `vite.config.ts` 中的 `base` 配置正确
- 确认 GitHub Pages 设置正确

### 资源加载失败

- 检查构建产物中的资源路径
- 确认 base path 配置正确
