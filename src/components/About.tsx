import type { Lang } from '../lib/book'

import './About.css'

interface AboutProps {
  lang: Lang
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
  es: {
    title: 'Acerca de El libro de arena',
    intro: '"El libro de arena" es un cuento de Borges. El narrador adquiere de un vendedor de biblias un libro sagrado que no tiene principio ni fin; gradualmente se ve perturbado por su infinitud e inasibilidad, y finalmente lo oculta en el sótano de la Biblioteca Nacional.',
    back: 'Volver',
    section1Title: 'Qué es el libro',
    section1Lead: 'El desconocido explica el nombre y la estructura del libro:',
    quote1: '"Su libro se llamaba el Libro de Arena, porque ni el libro ni la arena tienen principio ni fin."',
    quote2: '"El número de páginas de este libro es exactamente infinito. Ninguna es la primera; ninguna, la última. No sé por qué están numeradas de ese modo arbitrario. Acaso para dar a entender que los términos de una serie infinita aceptan cualquier número."',
    quote3: '"Mírela bien. Ya no la verá nunca más."',
    section2Title: 'Metáforas',
    section2Lead: 'Borges señala la metáfora a través de George Herbert y el desconocido:',
    epigraph: '"Tu cuerda de arenas..." — George Herbert',
    quote4: '"Si el espacio es infinito estamos en cualquier punto del espacio. Si el tiempo es infinito estamos en cualquier punto del tiempo."',
    quote5: '"Sentí que era un objeto de pesadilla, una cosa obscena que infamaba y corrompía la realidad."',
    quote6: '"El mejor lugar para ocultar una hoja es un bosque."',
    section3Title: 'Revelaciones',
    section3Lead: 'La situación y la elección del narrador revelan:',
    revelation1: 'Lo infinito no puede ser poseído o agotado—al intentar poseerlo, uno se convierte en "prisionero del Libro"; "ya no la verá nunca más" sugiere que cada lectura es singular e irrepetible.',
    revelation2: 'En una serie infinita, cualquier término puede aparecer: el lugar de uno en el tiempo y el espacio es meramente un punto dentro del infinito, sin privilegio ni fin.',
    revelation3: 'Ante un infinito incomprensible e indestructible, el narrador solo puede ocultarlo de vuelta en el bosque del conocimiento—la biblioteca—borrándolo de su vida pero no del mundo.',
  },
  ja: {
    title: '砂の本について',
    intro: '「砂の本」はボルヘスの短編小説である。語り手は聖書の行商人から始まりも終わりもない聖なる書物を手に入れる。その無限性と把握不可能さに次第に悩まされ、最終的に国立図書館の地下室に隠す。',
    back: '戻る',
    section1Title: '本の特徴',
    section1Lead: '見知らぬ男は本の名前と構造をこう説明する：',
    quote1: '「その本は『砂の本』と呼ばれていると言っていました。砂のように始まりも終わりもないからだと」',
    quote2: '「この本の頁数は無限です。最初の頁も最後の頁もありません。なぜこんな荒唐な番号の付け方をするのかわかりません。無限級数にはどんな項も現れ得るということを示すためかもしれません」',
    quote3: '「よくごらんなさい。二度と見られませんから」',
    section2Title: '比喩',
    section2Lead: 'ボルヘスはジョージ・ハーバートと見知らぬ男の言葉を通じて比喩を示す：',
    epigraph: '「お前の砂の縄……」 — ジョージ・ハーバート',
    quote4: '「空間が無限なら、私たちは空間のどの点にもいる。時間が無限なら、私たちは時間のどの点にもいる」',
    quote5: '「あらゆる煩いの源であり、現実を汚し損なう下劣なものだと感じた」',
    quote6: '「葉っぱを隠すのに一番いいのは森だ」',
    section3Title: '啓示',
    section3Lead: '語り手の状況と選択が明らかにする：',
    revelation1: '無限のものは所有も消耗もできない—所有しようとすると、人は「本の虜」になる。「二度と見られませんから」は、それぞれの読書が唯一で再現不可能であることを示唆する。',
    revelation2: '無限級数では、どんな項も現れ得る：人の時間と空間における位置は、無限の中の単なる一点であり、特権も終点もない。',
    revelation3: '理解も破壊もできない無限に直面して、語り手はそれを知識の森—図書館—に隠すことしかできない。個人の生活からは消し去るが、世界からは消し去れない。',
  },
  pt: {
    title: 'Sobre O Livro de Areia',
    intro: '"O Livro de Areia" é um conto de Borges. O narrador adquire de um vendedor de bíblias um livro sagrado que não tem princípio nem fim; gradualmente se perturba com sua infinidade e inapreensibilidade, e finalmente o esconde no porão da Biblioteca Nacional.',
    back: 'Voltar',
    section1Title: 'O que é o livro',
    section1Lead: 'O desconhecido explica o nome e a estrutura do livro:',
    quote1: '"Disse-me que o seu livro se chamava o Livro de Areia, porque nem o livro nem a areia têm princípio nem fim."',
    quote2: '"O número de páginas deste livro é exactamente infinito. Nenhuma é a primeira; nenhuma, a última. Não sei por que estão numeradas desse modo arbitrário. Talvez para dar a entender que os termos de uma série infinita aceitam qualquer número."',
    quote3: '"Olhe-a bem. Nunca mais a verá."',
    section2Title: 'Metáforas',
    section2Lead: 'Borges aponta a metáfora através de George Herbert e o desconhecido:',
    epigraph: '"Tua corda de areias..." — George Herbert',
    quote4: '"Se o espaço é infinito estamos em qualquer ponto do espaço. Se o tempo é infinito estamos em qualquer ponto do tempo."',
    quote5: '"Sentí que era um objecto de pesadelo, uma coisa obscena que infamava e corrompia a realidade."',
    quote6: '"O melhor lugar para ocultar uma folha é uma floresta."',
    section3Title: 'Revelações',
    section3Lead: 'A situação e a escolha do narrador revelam:',
    revelation1: 'O infinito não pode ser possuído ou esgotado—ao tentar possuí-lo, torna-se "prisioneiro do Livro"; "nunca mais a verá" sugere que cada leitura é singular e irrepetível.',
    revelation2: 'Numa série infinita, qualquer termo pode aparecer: o lugar de um no tempo e no espaço é meramente um ponto dentro do infinito, sem privilégio nem fim.',
    revelation3: 'Perante um infinito incompreensível e indestrutível, o narrador só pode escondê-lo de volta na floresta do conhecimento—a biblioteca—apagando-o da sua vida mas não do mundo.',
  },
  fr: {
    title: 'À propos de Le Livre de sable',
    intro: '"Le Livre de sable" est une nouvelle de Borges. Le narrateur acquiert d\'un vendeur de bibles un livre sacré qui n\'a ni commencement ni fin; il est progressivement troublé par son infinité et son insaisissabilité, et finit par le cacher dans le sous-sol de la Bibliothèque nationale.',
    back: 'Retour',
    section1Title: 'Ce qu\'est le livre',
    section1Lead: 'L\'inconnu explique le nom et la structure du livre:',
    quote1: '"Il me dit que son livre s\'appelait le Livre de sable, parce que ni le livre ni le sable n\'ont ni commencement ni fin."',
    quote2: '"Le nombre de pages de ce livre est exactement infini. Aucune n\'est la première; aucune, la dernière. Je ne sais pourquoi elles sont numérotées de cette façon arbitraire. Peut-être pour donner à entendre que les termes d\'une série infinie acceptent n\'importe quel nombre."',
    quote3: '"Regardez-la bien. Vous ne la reverrez jamais plus."',
    section2Title: 'Métaphores',
    section2Lead: 'Borges pointe la métaphore à travers George Herbert et l\'inconnu:',
    epigraph: '"Ta corde de sables..." — George Herbert',
    quote4: '"Si l\'espace est infini nous sommes en n\'importe quel point de l\'espace. Si le temps est infini nous sommes en n\'importe quel point du temps."',
    quote5: '"Je sentis que c\'était un objet de cauchemar, une chose obscène qui infamait et corrompait la réalité."',
    quote6: '"Le meilleur endroit pour cacher une feuille est une forêt."',
    section3Title: 'Révélations',
    section3Lead: 'La situation et le choix du narrateur révèlent:',
    revelation1: 'L\'infini ne peut être possédé ou épuisé—en essayant de le posséder, on devient "prisonnier du Livre"; "vous ne la reverrez jamais plus" suggère que chaque lecture est singulière et irrépétible.',
    revelation2: 'Dans une série infinie, n\'importe quel terme peut apparaître: la place de l\'un dans le temps et l\'espace n\'est qu\'un point dans l\'infini, sans privilège ni fin.',
    revelation3: 'Face à un infini incompréhensible et indestructible, le narrateur ne peut que le cacher à nouveau dans la forêt du savoir—la bibliothèque—l\'effaçant de sa vie mais pas du monde.',
  },
  de: {
    title: 'Über Das Buch vom Sand',
    intro: '"Das Buch vom Sand" ist eine Kurzgeschichte von Borges. Der Erzähler erwirbt von einem Bibelverkäufer ein heiliges Buch, das weder Anfang noch Ende hat; er wird allmählich von seiner Unendlichkeit und Unfassbarkeit beunruhigt und versteckt es schließlich im Keller der Nationalbibliothek.',
    back: 'Zurück',
    section1Title: 'Was das Buch ist',
    section1Lead: 'Der Unbekannte erklärt den Namen und die Struktur des Buches:',
    quote1: '"Er sagte mir, sein Buch heiße das Buch vom Sand, weil weder das Buch noch der Sand Anfang noch Ende haben."',
    quote2: '"Die Zahl der Seiten dieses Buches ist genau unendlich. Keine ist die erste; keine die letzte. Ich weiß nicht, warum sie so willkürlich nummeriert sind. Vielleicht um zu verstehen zu geben, dass die Glieder einer unendlichen Reihe jede Zahl zulassen."',
    quote3: '"Sehen Sie ihn sich gut an. Sie werden ihn nie wieder sehen."',
    section2Title: 'Metaphern',
    section2Lead: 'Borges weist auf die Metapher durch George Herbert und den Unbekannten hin:',
    epigraph: '"Dein Seil aus Sand..." — George Herbert',
    quote4: '"Wenn der Raum unendlich ist, sind wir an irgendeinem Punkt des Raums. Wenn die Zeit unendlich ist, sind wir an irgendeinem Punkt der Zeit."',
    quote5: '"Ich fühlte, dass es ein Albtraumgegenstand war, eine obszöne Sache, die die Wirklichkeit schändete und verdarb."',
    quote6: '"Der beste Ort, ein Blatt zu verbergen, ist ein Wald."',
    section3Title: 'Offenbarungen',
    section3Lead: 'Die Situation und die Wahl des Erzählers offenbaren:',
    revelation1: 'Das Unendliche kann nicht besessen oder erschöpft werden—beim Versuch, es zu besitzen, wird man "Gefangener des Buches"; "Sie werden ihn nie wieder sehen" deutet darauf hin, dass jede Lektüre singulär und nicht wiederholbar ist.',
    revelation2: 'In einer unendlichen Reihe kann jedes Glied erscheinen: Der Platz eines Menschen in Zeit und Raum ist nur ein Punkt innerhalb der Unendlichkeit, ohne Privileg und ohne Ende.',
    revelation3: 'Angesichts eines unverständlichen, unzerstörbaren Unendlichen kann der Erzähler es nur wieder im Wald des Wissens—der Bibliothek—verstecken und es aus seinem Leben löschen, aber nicht aus der Welt.',
  },
  hi: {
    title: 'रेत की किताब के बारे में',
    intro: '"रेत की किताब" बोर्हेस की एक लघुकथा है। वर्णनकर्ता एक बाइबिल विक्रेता से एक पवित्र पुस्तक प्राप्त करता है जिसका न आदि है न अंत; वह धीरे-धीरे उसकी अनंतता और अग्राह्यता से परेशान हो जाता है, और अंततः उसे राष्ट्रीय पुस्तकालय के तहखाने में छुपा देता है।',
    back: 'वापस',
    section1Title: 'किताब क्या है',
    section1Lead: 'अजनबी किताब के नाम और संरचना की व्याख्या करता है:',
    quote1: '"उसने बताया कि उसकी किताब का नाम \'रेत की किताब\' है, क्योंकि न किताब का कोई आदि-अंत है न रेत का।"',
    quote2: '"इस किताब के पन्नों की संख्या अनंत है। न पहला पन्ना है न आख़िरी। मुझे नहीं पता इस बेतरतीब अंकन का मतलब क्या। शायद यह बताने के लिए कि अनंत श्रेणी में कोई भी पद आ सकता है।"',
    quote3: '"इसे ध्यान से देखिए। फिर कभी नहीं देख पाएँगे।"',
    section2Title: 'रूपक',
    section2Lead: 'बोर्हेस जॉर्ज हर्बर्ट और अजनबी के माध्यम से रूपक की ओर इशारा करता है:',
    epigraph: '"तेरी रेत की रस्सी……" — जॉर्ज हर्बर्ट',
    quote4: '"अगर अंतरिक्ष अनंत है तो हम अंतरिक्ष के किसी भी बिंदु पर हैं। अगर समय अनंत है तो हम समय के किसी भी बिंदु पर हैं।"',
    quote5: '"लगा वह सारी पीड़ा की जड़ है, हकीकत को गिराने और बिगाड़ने वाली नीच चीज़।"',
    quote6: '"पत्ता छिपाने की सबसे अच्छी जगह जंगल है।"',
    section3Title: 'प्रकाशन',
    section3Lead: 'वर्णनकर्ता की स्थिति और चुनाव प्रकट करते हैं:',
    revelation1: 'अनंत को स्वामित्व में नहीं लिया जा सकता और न ही समाप्त किया जा सकता—इसे प्राप्त करने की कोशिश में, व्यक्ति "किताब का कैदी" बन जाता है; "फिर कभी नहीं देख पाएँगे" यह सुझाव देता है कि हर पढ़ाई अद्वितीय और अदोहराने योग्य है।',
    revelation2: 'अनंत श्रेणी में, कोई भी पद प्रकट हो सकता है: समय और अंतरिक्ष में व्यक्ति का स्थान अनंत के भीतर केवल एक बिंदु है, बिना विशेषाधिकार और बिना अंत के।',
    revelation3: 'एक अबोध्य, अविनाशी अनंत के सामने, वर्णनकर्ता इसे ज्ञान के जंगल—पुस्तकालय—में वापस छुपा सकता है, अपने जीवन से मिटा सकता है लेकिन दुनिया से नहीं।',
  },
  la: {
    title: 'De Libero arenæ',
    intro: '"Liber arenæ" est fabula brevis Borges. Narrator a venditore bibliorum librum sacrum acquirit qui principium aut finem non habet; paulatim infinitate et incomprehensibilitate eius turbatur, et tandem eum in cella Bibliothecae Nationalis abscondit.',
    back: 'Redire',
    section1Title: 'Quid sit liber',
    section1Lead: 'Ignotus nomen et structuram libri explicat:',
    quote1: '"Dixit mihi librum suum Librum Arenae vocari, quia nec liber nec arena principium aut finem habent."',
    quote2: '"Numerus paginarum huius libri infinite exacte est. Nulla prima est; nulla ultima. Nescio cur tam arbitrarie numerentur. Fortasse ut series infinita quemlibet numerum admittat."',
    quote3: '"Eam bene aspice. Numquam eam iterum videbis."',
    section2Title: 'Metaphorae',
    section2Lead: 'Borges metaphoram per Georgium Herbertum et ignotum indicat:',
    epigraph: '"Funis tuus arenaceus..." — Georgius Herbertus',
    quote4: '"Si spatium infinitum est, in quolibet puncto spatii sumus. Si tempus infinitum est, in quolibet puncto temporis sumus."',
    quote5: '"Sensí eum esse rem incubi, rem obscenam quae realitatem infamaret et corrumperet."',
    quote6: '"Optimum locum folium celandi silvam esse."',
    section3Title: 'Revelationes',
    section3Lead: 'Situatio et electio narratoris revelant:',
    revelation1: 'Infinitum possideri aut exhauriri non potest—conando possidere, fit "captivus Libri"; "numquam eam iterum videbis" suggerit singularem et irrepetibilem esse quamlibet lectionem.',
    revelation2: 'In serie infinita, quilibet terminus apparere potest: locus unius in tempore et spatio tantum punctum intra infinitum est, sine privilegio et sine fine.',
    revelation3: 'Infinito incomprehensibili et indestructibili obiecto, narrator eum tantum in silva scientiae—bibliotheca—abscondere potest, e vita sua delens sed non ex mundo.',
  },
  el: {
    title: 'Σχετικά με το Βιβλίο της Άμμου',
    intro: 'Το "Βιβλίο της Άμμου" είναι μια νουβέλα του Μπόρχες. Ο αφηγητής αποκτά από έναν πωλητή Βίβλων ένα ιερό βιβλίο που δεν έχει αρχή ούτε τέλος· σταδιακά ταλαιπωρείται από την απειρία και την ακατανόητη φύση του, και τελικά το κρύβει στο υπόγειο της Εθνικής Βιβλιοθήκης.',
    back: 'Επιστροφή',
    section1Title: 'Τι είναι το βιβλίο',
    section1Lead: 'Ο άγνωστος εξηγεί το όνομα και τη δομή του βιβλίου:',
    quote1: '"Μου είπε ότι το βιβλίο του λεγόταν Βιβλίο της Άμμου, γιατί ούτε το βιβλίο ούτε η άμμος έχουν αρχή ή τέλος."',
    quote2: '"Ο αριθμός των σελίδων αυτού του βιβλίου είναι ακριβώς άπειρος. Κανείς δεν είναι η πρώτη· κανείς η τελευταία. Δεν ξέρω γιατί αριθμούνται με αυτόν τον αυθαίρετο τρόπο. Ίσως για να δώσουν να καταλάβουν ότι οι όροι μιας άπειρης σειράς δέχονται οποιονδήποτε αριθμό."',
    quote3: '"Δείτε την καλά. Δεν θα την ξαναδείτε ποτέ."',
    section2Title: 'Μεταφορές',
    section2Lead: 'Ο Μπόρχες δείχνει τη μεταφορά μέσω του Τζορτζ Χέρμπερτ και του αγνώστου:',
    epigraph: '"Το σχοινί σου από άμμο……" — Τζορτζ Χέρμπερτ',
    quote4: '"Αν ο χώρος είναι άπειρος είμαστε σε οποιοδήποτε σημείο του χώρου. Αν ο χρόνος είναι άπειρος είμαστε σε οποιοδήποτε σημείο του χρόνου."',
    quote5: '"Ένιωσα ότι ήταν αντικείμενο εφιάλτη, μια άσεμνη ύπαρξη που ατίμαζε και διέφθειρε την πραγματικότητα."',
    quote6: '"Το καλύτερο μέρος για να κρύψεις ένα φύλλο είναι ένα δάσος."',
    section3Title: 'Αποκαλύψεις',
    section3Lead: 'Η κατάσταση και η επιλογή του αφηγητή αποκαλύπτουν:',
    revelation1: 'Το άπειρο δεν μπορεί να κατέχεται ούτε να εξαντλείται—προσπαθώντας να το κατέχει, κάποιος γίνεται "αιχμάλωτος του Βιβλίου"· "δεν θα την ξαναδείτε ποτέ" υποδηλώνει ότι κάθε ανάγνωση είναι μοναδική και μη επαναλήψιμη.',
    revelation2: 'Σε μια άπειρη σειρά, οποιοσδήποτε όρος μπορεί να εμφανιστεί: η θέση κάποιου στον χρόνο και τον χώρο είναι απλώς ένα σημείο μέσα στο άπειρο, χωρίς προνόμιο και χωρίς τέλος.',
    revelation3: 'Αντιμετωπίζοντας ένα ακατανόητο, άφθαρτο άπειρο, ο αφηγητής μπορεί μόνο να το κρύψει πίσω στο δάσος της γνώσης—τη βιβλιοθήκη—διαγράφοντάς το από τη ζωή του αλλά όχι από τον κόσμο.',
  },
} as const

export function About({ lang }: AboutProps) {
  const t = content[lang] || content.en
  const useCJKFont = lang === 'cn' || lang === 'ja' || lang === 'hi'

  return (
    <div 
      className="about" 
      style={{
        fontFamily: useCJKFont ? 'var(--font-serif-cn)' : undefined,
      }}
    >
      <header className="about-header">
        <h1 className="about-title">{t.title}</h1>
        <p className="about-intro">{t.intro}</p>
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
