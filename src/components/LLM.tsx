import { useState, useCallback, useEffect } from 'react'
import { prompts, models, textResults, imageResults, videoResults, codeResults, type Model } from '../data/llm'
import './LLM.css'

export function LLM() {
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0])
  const [currentModel, setCurrentModel] = useState<Model | null>(null)
  const [currentResult, setCurrentResult] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)

  const generate = useCallback(() => {
    // 步骤1: 随机选择Prompt
    const randomPromptIndex = Math.floor(Math.random() * prompts.length)
    setCurrentPrompt(prompts[randomPromptIndex])
    
    // 步骤2: 随机选择Model
    const randomModelIndex = Math.floor(Math.random() * models.length)
    const model = models[randomModelIndex]
    setCurrentModel(model)
    
    // 步骤3: 根据模型类型生成对应的结果
    setIsGenerating(true)
    setTimeout(() => {
      let result = ''
      switch (model.type) {
        case '文生文':
          const textIndex = Math.floor(Math.random() * textResults.length)
          result = textResults[textIndex].content
          break
        case '文生图':
          const imageIndex = Math.floor(Math.random() * imageResults.length)
          result = imageResults[imageIndex].emoji
          break
        case '文生视频':
          const videoIndex = Math.floor(Math.random() * videoResults.length)
          result = videoResults[videoIndex].emoji
          break
        case '文生代码':
          const codeIndex = Math.floor(Math.random() * codeResults.length)
          result = codeResults[codeIndex].structure
          break
      }
      setCurrentResult(result)
      setIsGenerating(false)
    }, 500)
  }, [])

  // 键盘事件监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        generate()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [generate])

  const getResultType = () => {
    if (!currentModel) return null
    return currentModel.type
  }

  const resultType = getResultType()

  return (
    <div className="llm-container">
      {/* 控制按钮 */}
      <div className="llm-controls">
        <button className="llm-generate-button" onClick={generate}>
          生成
        </button>
        <div className="llm-controls-hint">点击按钮或按 ← → 方向键生成</div>
      </div>

      <div className="llm-content">
        {/* 上方：Prompt */}
        <div className="llm-section llm-prompt-section">
          <div className="llm-section-label">Prompt</div>
          <div className="llm-prompt-box">
            <div className="llm-prompt-text">{currentPrompt.text}</div>
            <button className="llm-send-button" onClick={() => {}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

        {/* 连接线1：Prompt到Model */}
        <div className="llm-wire llm-wire-1">
          <div className="llm-wire-base"></div>
          <div className="llm-wire-pulse"></div>
        </div>

        {/* 中间：Model */}
        <div className="llm-section llm-model-section">
          <div className="llm-section-label">Model</div>
          <div className="llm-model-box">
            <div className="llm-gpu">
              <div className="llm-gpu-body">
                {currentModel ? (
                  <>
                    <div className="llm-model-name">{currentModel.name}</div>
                    <div className="llm-model-type">{currentModel.type}</div>
                    {currentModel.description && (
                      <div className="llm-model-description">{currentModel.description}</div>
                    )}
                  </>
                ) : (
                  <div className="llm-model-placeholder">等待生成</div>
                )}
              </div>
              {/* GPU引脚装饰 */}
              <div className="llm-gpu-pins">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="llm-gpu-pin"></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 连接线2：Model到Result */}
        <div className="llm-wire llm-wire-2">
          <div className="llm-wire-base"></div>
          <div className="llm-wire-pulse"></div>
        </div>

        {/* 下方：Result */}
        <div className="llm-section llm-result-section">
          <div className="llm-section-label">Result</div>
          <div className={`llm-result-box ${resultType ? `llm-result-${resultType === '文生文' ? 'text' : resultType === '文生图' ? 'image' : resultType === '文生视频' ? 'video' : resultType === '文生代码' ? 'code' : ''}` : ''}`}>
            {isGenerating ? (
              <div className="llm-result-generating">
                <div className="llm-loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div>生成中...</div>
              </div>
            ) : currentResult ? (
              <>
                {resultType === '文生图' && (
                  <div className="llm-result-image">{currentResult}</div>
                )}
                {resultType === '文生视频' && (
                  <div className="llm-result-video">{currentResult}</div>
                )}
                {resultType === '文生代码' && (
                  <pre className="llm-result-code">{currentResult}</pre>
                )}
                {resultType === '文生文' && (
                  <div className="llm-result-text">{currentResult}</div>
                )}
              </>
            ) : (
              <div className="llm-result-placeholder">点击生成按钮开始</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
