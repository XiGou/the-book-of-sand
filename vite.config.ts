import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/the-book-of-sand/',
  server: {
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // 代码分割配置
    rollupOptions: {
      output: {
        manualChunks: {
          // React 核心库单独打包
          'react-vendor': ['react', 'react-dom'],
          // 数据文件按模块分割
          'data-dazibao': ['./src/data/dazibao'],
          'data-douyin': ['./src/data/douyin'],
          'data-television': ['./src/data/television'],
          'data-consumerism': ['./src/data/resources'],
          'data-isms': ['./src/data/isms'],
          'data-crazyJourney': ['./src/data/crazyJourney'],
          'data-llm': ['./src/data/llm'],
          // 工具库单独打包
          'lib-utils': ['./src/lib/contentGenerator', './src/lib/book', './src/lib/gameOfLife'],
        },
        // 优化 chunk 文件名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]'
          }
          if (assetInfo.name?.match(/\.(woff2?|eot|ttf|otf)$/)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
    // 压缩配置
    minify: 'esbuild',
    // 提高 chunk 大小警告阈值（因为数据文件较大）
    chunkSizeWarningLimit: 1000,
  },
})
