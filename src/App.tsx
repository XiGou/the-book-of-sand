import { useState } from 'react'
import { About } from './components/About'
import { BookCover } from './components/BookCover'
import { BookReader } from './components/BookReader'
import { Nav, type View } from './components/Nav'
import { Dazibao } from './components/Dazibao'
import { Television } from './components/Television'
import { Xiaohongshu } from './components/Xiaohongshu'
import { Douyin } from './components/Douyin'
import { Consumerism } from './components/Consumerism'
import type { Lang } from './lib/book'

function App() {
  const [view, setView] = useState<View>('cover')
  const [lang, setLang] = useState<Lang>('cn')

  const openBook = () => setView('reader')
  const goToCover = () => setView('cover')

  const isVariationPage = ['dazibao', 'television', 'xiaohongshu', 'douyin', 'consumerism'].includes(view)

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
        {view === 'dazibao' && <Dazibao />}
        {view === 'television' && <Television />}
        {view === 'xiaohongshu' && <Xiaohongshu />}
        {view === 'douyin' && <Douyin />}
        {view === 'consumerism' && <Consumerism />}
      </main>
    </div>
  )
}

export default App;
