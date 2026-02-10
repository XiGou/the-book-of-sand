import { useState } from 'react'
import { About } from './components/About'
import { BookCover } from './components/BookCover'
import { BookReader } from './components/BookReader'
import type { Lang } from './lib/book'

type View = 'cover' | 'reader' | 'about'

function App() {
  const [view, setView] = useState<View>('cover')
  const [lang, setLang] = useState<Lang>('cn')

  const openBook = () => setView('reader')
  const openAbout = () => setView('about')
  const backToCover = () => setView('cover')

  if (view === 'cover') {
    return (
      <div className="app-fullscreen">
        <BookCover onOpen={openBook} onAbout={openAbout} lang={lang} />
      </div>
    )
  }

  if (view === 'about') {
    return (
      <div className="app-fullscreen">
        <About lang={lang} onBack={backToCover} />
      </div>
    )
  }

  return (
    <BookReader
      initialPageIndex={0}
      lang={lang}
      onLangChange={setLang}
      onClose={backToCover}
    />
  );
}

export default App;
