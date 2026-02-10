import React from 'react'
import type { Lang } from '../lib/book'

import './About.css'

interface AboutProps {
  lang: Lang
  onBack: () => void
}

const content = {
  cn: {
    title: '关于沙之书',
    intro: '《沙之书》是博尔赫斯短篇小说，叙述者从一名《圣经》推销员手中得到一本「无始无终」的圣书，随后被其无穷与不可把握所困扰，最终将它藏入国家图书馆地下室。',
    back: '返回',
    section1Title: '沙之书的特点',
    section1Lead: '书中人这样解释书名与结构：',
    quote1: '「他那本书叫\'沙之书\'，因为那本书像沙一样，无始无终。」',
    quote2: '「这本书的页码是无穷尽的。没有首页，也没有末页。我不明白为什么要用这种荒诞的编码办法。也许是想说明一个无穷大的系列允许任何数项的出现。」',
    quote3: '「仔细瞧瞧。以后再也看不到了。」',
    section2Title: '隐喻',
    section2Lead: '博尔赫斯借乔治·赫伯特与书中人的话点出隐喻：',
    epigraph: '「你的沙制的绳索……」 —— 乔治·赫伯特',
    quote4: '「如果空间是无限的，我们就处在空间的任何一点。如果时间是无限的，我们就处在时间的任何一点。」',
    quote5: '「我觉得它是一切烦恼的根源，是一件诋毁和败坏现实的下流东西。」',
    quote6: '「隐藏一片树叶的最好的地点是树林。」',
    section3Title: '启示',
    section3Lead: '叙述者的处境与选择揭示：',
    revelation1: '无限之物不可被占有或穷尽——一旦试图拥有，人反而成为「那本书的俘虏」；插画「以后再也看不到了」，暗示每一次阅读都是唯一，无法复现。',
    revelation2: '在无穷级数中，任意数项都可能出现：人所在的时间与空间只是无限中的一点，既无特权也无终点。',
    revelation3: '面对不可理解、不可销毁的无限，叙述者只能将它「藏」回知识的森林——图书馆——从而从个人生活中抹去，却无法从世界上抹去。',
  },
  en: {
    title: 'About The Book of Sand',
    intro: '"The Book of Sand" is a short story by Borges. The narrator acquires from a Bible salesman a holy book that has neither beginning nor end; he is gradually troubled by its infinity and ungraspability, and finally hides it in the basement of the National Library.',
    back: 'Back',
    section1Title: 'What the Book Is',
    section1Lead: 'The stranger explains the book\'s name and structure:',
    quote1: '"His book was called the Book of Sand, because neither the book nor the sand has any beginning or end."',
    quote2: '"The number of pages in this book is no more or less than infinite. None is the first page, none the last. I don\'t know why they\'re numbered in this arbitrary way. Perhaps to suggest that the terms of an infinite series admit any number."',
    quote3: '"Look at the illustration closely. You\'ll never see it again."',
    section2Title: 'Metaphors',
    section2Lead: 'Borges points to metaphor through George Herbert and the stranger:',
    epigraph: '"Thy rope of sands . . ." — George Herbert',
    quote4: '"If space is infinite, we may be at any point in space. If time is infinite, we may be at any point in time."',
    quote5: '"I felt that the book was a nightmarish object, an obscene thing that affronted and tainted reality itself."',
    quote6: '"The best place to hide a leaf is in a forest."',
    section3Title: 'Revelations',
    section3Lead: 'The narrator\'s situation and choice reveal:',
    revelation1: 'The infinite cannot be owned or exhausted—in trying to possess it, one becomes "a prisoner of the book"; "you\'ll never see it again" suggests each reading is singular and unrepeatable.',
    revelation2: 'In an infinite series, any term may appear: one\'s place in time and space is merely a point within infinity, with no privilege and no end.',
    revelation3: 'Faced with an incomprehensible, indestructible infinity, the narrator can only hide it back in the forest of knowledge—the library—erasing it from his life but not from the world.',
  },
} as const

export function About({ lang, onBack }: AboutProps) {
  const t = content[lang]

  return (
    <div className="about">
      <header className="about-header">
        <h1 className="about-title">{t.title}</h1>
        <p className="about-intro">{t.intro}</p>
        <button type="button" className="about-back" onClick={onBack} aria-label={t.back}>
          {t.back}
        </button>
      </header>

      <main className="about-main">
        <section className="about-section">
          <h2>{t.section1Title}</h2>
          <p className="about-lead">{t.section1Lead}</p>
          <blockquote className="about-quote">{t.quote1}</blockquote>
          <blockquote className="about-quote">{t.quote2}</blockquote>
          <blockquote className="about-quote">{t.quote3}</blockquote>
        </section>

        <section className="about-section">
          <h2>{t.section2Title}</h2>
          <p className="about-lead">{t.section2Lead}</p>
          <p className="about-epigraph">{t.epigraph}</p>
          <blockquote className="about-quote">{t.quote4}</blockquote>
          <blockquote className="about-quote">{t.quote5}</blockquote>
          <blockquote className="about-quote">{t.quote6}</blockquote>
        </section>

        <section className="about-section">
          <h2>{t.section3Title}</h2>
          <p className="about-lead">{t.section3Lead}</p>
          <p className="about-revelation">{t.revelation1}</p>
          <p className="about-revelation">{t.revelation2}</p>
          <p className="about-revelation">{t.revelation3}</p>
        </section>
      </main>
    </div>
  )
}
