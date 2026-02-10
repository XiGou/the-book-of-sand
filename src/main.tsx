import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 移除首屏加载占位符
const rootElement = document.getElementById('root')
if (rootElement) {
  // 移除加载占位符
  const placeholder = rootElement.querySelector('.loading-placeholder')
  if (placeholder) {
    placeholder.remove()
  }
  
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
