import { useState, Suspense, lazy } from 'react'
import { About } from './components/About'
import { BookCover } from './components/BookCover'
import { BookReader } from './components/BookReader'
import { Nav, type View } from './components/Nav'
import type { Lang } from './lib/book'

// 懒加载变体页面组件（按需加载，减少首屏包大小）
const Dazibao = lazy(() => import('./components/Dazibao').then(m => ({ default: m.Dazibao })))
const Television = lazy(() => import('./components/Television').then(m => ({ default: m.Television })))
const Xiaohongshu = lazy(() => import('./components/Xiaohongshu').then(m => ({ default: m.Xiaohongshu })))
const Douyin = lazy(() => import('./components/Douyin').then(m => ({ default: m.Douyin })))
const Consumerism = lazy(() => import('./components/Consumerism').then(m => ({ default: m.Consumerism })))
const Ismism = lazy(() => import('./components/Ismism').then(m => ({ default: m.Ismism })))
const CrazyJourney = lazy(() => import('./components/CrazyJourney').then(m => ({ default: m.CrazyJourney })))
const LLM = lazy(() => import('./components/LLM').then(m => ({ default: m.LLM })))

// 加载占位组件
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '1.2rem',
    color: 'var(--text-color, #333)'
  }}>
    加载中...
  </div>
)

function App() {
  const [view, setView] = useState<View>('cover')
  const [lang, setLang] = useState<Lang>('cn')

  const openBook = () => setView('reader')
  const goToCover = () => setView('cover')

  const isVariationPage = ['dazibao', 'television', 'xiaohongshu', 'douyin', 'consumerism', 'ismism', 'crazyJourney', 'llm'].includes(view)

  return (
    <div className="app-layout">
      <Nav currentView={view} onNavigate={setView} lang={lang} />
      <main className={`app-main ${view !== 'about' && !isVariationPage ? 'app-main-no-scroll' : ''}`}>
        {view === 'cover' && <BookCover onOpen={openBook} lang={lang} />}
        {view === 'about' && <About lang={lang} />}
        {view === 'reader' && (
          <BookReader
            initialPageIndex={0}
            lang={lang}
            onLangChange={setLang}
            onClose={goToCover}
          />
        )}
        {view === 'dazibao' && (
          <Suspense fallback={<LoadingFallback />}>
            <Dazibao />
          </Suspense>
        )}
        {view === 'television' && (
          <Suspense fallback={<LoadingFallback />}>
            <Television />
          </Suspense>
        )}
        {view === 'xiaohongshu' && (
          <Suspense fallback={<LoadingFallback />}>
            <Xiaohongshu />
          </Suspense>
        )}
        {view === 'douyin' && (
          <Suspense fallback={<LoadingFallback />}>
            <Douyin />
          </Suspense>
        )}
        {view === 'consumerism' && (
          <Suspense fallback={<LoadingFallback />}>
            <Consumerism />
          </Suspense>
        )}
        {view === 'ismism' && (
          <Suspense fallback={<LoadingFallback />}>
            <Ismism />
          </Suspense>
        )}
        {view === 'crazyJourney' && (
          <Suspense fallback={<LoadingFallback />}>
            <CrazyJourney />
          </Suspense>
        )}
        {view === 'llm' && (
          <Suspense fallback={<LoadingFallback />}>
            <LLM />
          </Suspense>
        )}
      </main>
    </div>
  )
}

export default App;
