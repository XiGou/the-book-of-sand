import type { Lang } from '../lib/book'
import './Variations.css'

const LABELS = {
  cn: { title: '不仅如此' },
  en: { title: 'More Than That' },
  es: { title: 'Más que eso' },
  ja: { title: 'それだけではない' },
  pt: { title: 'Mais que isso' },
  fr: { title: 'Plus que ça' },
  de: { title: 'Mehr als das' },
  hi: { title: 'इससे अधिक' },
  la: { title: 'Plus quam id' },
  el: { title: 'Περισσότερα από αυτό' },
} as const

export const VARIATIONS = [
  { 
    id: 'dazibao', 
    name: { 
      cn: '大字报', 
      en: 'Big Character Posters',
      es: 'Carteles de Caracteres Grandes',
      ja: '大字報',
      pt: 'Cartazes de Caracteres Grandes',
      fr: 'Affiches à Grands Caractères',
      de: 'Großbuchstaben-Plakate',
      hi: 'बड़े अक्षरों के पोस्टर',
      la: 'Tabulae Magnarum Litterarum',
      el: 'Αφίσες Μεγάλων Χαρακτήρων',
    } 
  },
  { 
    id: 'television', 
    name: { 
      cn: '电视时代', 
      en: 'Television Era',
      es: 'Era de la Televisión',
      ja: 'テレビ時代',
      pt: 'Era da Televisão',
      fr: 'Ère de la Télévision',
      de: 'Fernsehzeitalter',
      hi: 'टेलीविज़न युग',
      la: 'Aetas Televisifica',
      el: 'Εποχή της Τηλεόρασης',
    } 
  },
  { 
    id: 'xiaohongshu', 
    name: { 
      cn: '小红书', 
      en: 'Xiaohongshu',
      es: 'Xiaohongshu',
      ja: '小紅書',
      pt: 'Xiaohongshu',
      fr: 'Xiaohongshu',
      de: 'Xiaohongshu',
      hi: 'Xiaohongshu',
      la: 'Xiaohongshu',
      el: 'Xiaohongshu',
    } 
  },
  { 
    id: 'douyin', 
    name: { 
      cn: '抖音', 
      en: 'Douyin',
      es: 'Douyin',
      ja: '抖音',
      pt: 'Douyin',
      fr: 'Douyin',
      de: 'Douyin',
      hi: 'Douyin',
      la: 'Douyin',
      el: 'Douyin',
    } 
  },
  { 
    id: 'consumerism', 
    name: { 
      cn: '消费主义', 
      en: 'Consumerism',
      es: 'Consumismo',
      ja: '消費主義',
      pt: 'Consumismo',
      fr: 'Consumérisme',
      de: 'Konsumismus',
      hi: 'उपभोक्तावाद',
      la: 'Consumismus',
      el: 'Καταναλωτισμός',
    } 
  },
  { 
    id: 'ismism', 
    name: { 
      cn: '主义主义', 
      en: 'Ismism',
      es: 'Ismismo',
      ja: '主義主義',
      pt: 'Ismismo',
      fr: 'Ismisme',
      de: 'Ismismus',
      hi: 'वादवाद',
      la: 'Ismismus',
      el: 'Ισμισμός',
    } 
  },
  { 
    id: 'llm', 
    name: { 
      cn: '大语言模型', 
      en: 'Large Language Model',
      es: 'Modelo de Lenguaje Grande',
      ja: '大規模言語モデル',
      pt: 'Modelo de Linguagem Grande',
      fr: 'Grand Modèle de Langage',
      de: 'Großes Sprachmodell',
      hi: 'बड़ा भाषा मॉडल',
      la: 'Magnum Exemplar Linguae',
      el: 'Μεγάλο Γλωσσικό Μοντέλο',
    } 
  },
] as const

export type VariationId = typeof VARIATIONS[number]['id']

interface VariationSelectorProps {
  lang: Lang
  onSelect: (id: VariationId) => void
}

export function VariationSelector({ lang, onSelect }: VariationSelectorProps) {
  const t = LABELS[lang] || LABELS.en

  return (
    <div className="variations-selector">
      <h3 className="variations-title">{t.title}</h3>
      <select
        className="variations-dropdown"
        onChange={(e) => {
          const value = e.target.value
          if (value) {
            onSelect(value as VariationId)
          }
        }}
        defaultValue=""
      >
        <option value="" disabled>
          {lang === 'cn' ? '选择主题...' : 
           lang === 'en' ? 'Select a theme...' :
           lang === 'es' ? 'Selecciona un tema...' :
           lang === 'ja' ? 'テーマを選択...' :
           lang === 'pt' ? 'Selecione um tema...' :
           lang === 'fr' ? 'Sélectionnez un thème...' :
           lang === 'de' ? 'Thema auswählen...' :
           lang === 'hi' ? 'एक विषय चुनें...' :
           lang === 'la' ? 'Elige thema...' :
           lang === 'el' ? 'Επιλέξτε θέμα...' :
           'Select a theme...'}
        </option>
        {VARIATIONS.map((v) => (
          <option key={v.id} value={v.id}>
            {v.name[lang] || v.name.en}
          </option>
        ))}
      </select>
    </div>
  )
}
