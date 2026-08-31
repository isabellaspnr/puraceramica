function buildRecurringSessions({
  startDate,
  endDate,
  schedule,
  instructor,
  language,
  exclude = [],
  overrides = {}
}) {
  const sessions = [];
  const excludedDates = new Set(exclude);

  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);

  for (
    let current = new Date(start);
    current <= end;
    current.setUTCDate(current.getUTCDate() + 1)
  ) {
    const weekday = current.getUTCDay();
    const date = current.toISOString().slice(0, 10);

    if (excludedDates.has(date)) continue;

    schedule
      .filter(slot => slot.weekday === weekday)
      .forEach(slot => {
      const overrideKey = `${date}|${slot.start}`;
const override = overrides[overrideKey] || {};

sessions.push({
  date,
  start: slot.start,
  end: slot.end,
  instructor:
    override.instructor ||
    slot.instructor ||
    instructor,
  language:
    override.language ||
    slot.language ||
    language
});
      });
  }

  return sessions.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);

    if (dateCompare !== 0) return dateCompare;

    return a.start.localeCompare(b.start);
  });
}
module.exports = {
  handbuilding: {
    id: "handbuilding",

      calendarCategory: "handbuilding",

    // Grundtyp
    medium: "clay",
    type: "workshop",
    format: "single-session",
    level: "beginner-intermediate",

    // Gemeinsame Angaben
    durationMinutes: 150,
    price: 40,
    priceCurrency: "EUR",
    priceStatus: "tentative",

    ageMinimum: 14,
    capacity: 10,

    image: "/assets/img/courses/handbuilding.jpg",

enImageAlt: "Handbuilding pottery workshop at PURACERÂMICA Lisbon",
ptImageAlt: "Workshop de modelagem manual na PURACERÂMICA em Lisboa",

booking: {
  url: "https://puraceramicalisboa.simplybook.it/v2/#book/category/2/service/26/count/1/provider/9/",
  category: "2",
  service: "26",
  provider: "9"
},

    // Sprachabhängige Inhalte
 en: {
  title: "Handbuilding Pottery Class",
  shortTitle: "Handbuilding",
  seo: {
  title: "Handbuilding Pottery Class in Lisbon | PURACERÂMICA",

  description:
    "Join a 2.5-hour handbuilding pottery class in Lisbon. Create your own ceramic piece with instructor guidance. Beginner-friendly and no experience required."
},
  pageTag: "Pottery Workshops · Single Session",

  schedule: "Saturdays & selected Sundays · 15:00–17:30",
  levelLabel: "Beginner and intermediate friendly",
  languageLabel: "English",

  intro:
    "Discover the joy of handbuilding ceramics. Learn fundamental techniques and create your own piece with guidance from your instructor. No experience needed.",

  languageNote: "This workshop is taught in English.",

  about: [
    "Handbuilding gives you the freedom to create with clay without using a pottery wheel. In this workshop, you'll work at your own pace and create a ceramic piece of your choice with guidance from your instructor.",

    "You'll be introduced to fundamental handbuilding techniques and learn which approach works best for your idea. Whether you'd like to make a cup, bowl, small vase, candle holder or something completely different, your instructor will support you throughout the process.",

    "No previous pottery experience is required. Returning makers are equally welcome to use the session to develop their own projects."
  ],

whatYouCanMake: {
  intro:
    "Create something that feels like your own. You can come with an idea or decide together with your instructor once you arrive.",

  note:
    "Projects should be achievable within a single 2.5-hour session. Very large or technically complex pieces may require additional time.",

  examples: [
    {
      title: "Cup or Mug",
      text: "Create a functional cup, mug or handle-less vessel in your own shape and style."
    },
    {
      title: "Bowl",
      text: "Build a small serving bowl, breakfast bowl or an organic sculptural form."
    },
    {
      title: "Small Vase",
      text: "Explore height, shape and texture while creating a small vase or vessel."
    },
    {
      title: "Candle Holder",
      text: "Design a decorative object such as a candle holder, incense holder or similar piece."
    }
  ]
},

techniques: {
  intro:
    "Your instructor will help you choose the technique that best suits the piece you want to create. You don't need to use every technique in one session.",

  items: [
    {
      title: "Pinching",
      text: "Shape clay directly with your hands to create cups, bowls and organic forms.",
      image: "/assets/img/courses/pinch.jpg",
      imageAlt: "Pinching technique used in handbuilding pottery"
    },
    {
      title: "Coiling",
      text: "Build forms gradually by stacking and joining coils of clay. A versatile technique for both functional and sculptural pieces.",
      image: "/assets/img/courses/coil.jpg",
      imageAlt: "Coiling technique used in handbuilding pottery"
    },
    {
      title: "Slab building",
      text: "Work with rolled sheets of clay that can be cut, folded and joined to create structured forms.",
      image: "/assets/img/courses/slab.jpg",
      imageAlt: "Slab building technique used in handbuilding pottery"
    },
    {
      title: "Surface decoration",
      text: "Add texture, patterns and painted details to give your piece its own character.",
      image: "/assets/img/courses/pottery_painted_clay.jpg",
      imageAlt: "Decorating a handmade ceramic piece"
    }
  ]
},

included: {
  intro:
    "Everything you need to create your piece is provided in the studio.",

  items: [
    {
      title: "Clay & materials",
      text: "All clay and basic materials needed during the session."
    },
    {
      title: "Studio tools",
      text: "Full use of our handbuilding tools and equipment during the workshop."
    },
    {
      title: "Instructor guidance",
      text: "Individual support with your idea, technique and construction throughout the session."
    },
    {
      title: "Glazing & firing",
      text: "Finishing and firing of your ceramic piece after the workshop."
    }
  ]
},

beforeYouCome: {
  intro:
    "A few practical things to know before your workshop.",

  items: [
    {
      title: "What to wear",
      text: "Clay can get messy, so we recommend comfortable clothes that you don't mind getting a little dirty."
    },
    {
      title: "What to bring",
      text: "You don't need to bring any materials or tools. If you already have an idea for your piece, you're welcome to bring reference images."
    },
    {
      title: "Finished pieces",
      text: "Your piece will stay with us after the workshop for drying, glazing and firing. It will usually be ready for collection within 3–4 weeks."
    },
    {
      title: "Age",
      text: "This workshop is suitable for participants aged 14 and over."
    }
  ]
},

  url: "/en/handbuilding-workshop.html"


},


   pt: {
  title: "Workshop de Modelagem Manual",
  shortTitle: "Modelagem Manual",
  pageTag: "Workshops de Cerâmica · Sessão Única",

  seo: {
    title: "Workshop de Modelagem Manual em Lisboa | PURACERÂMICA",
    description:
      "Participe num workshop de modelagem manual de 2h30 em Lisboa. Crie a sua própria peça de cerâmica com acompanhamento do instrutor. Adequado para principiantes e sem necessidade de experiência prévia."
  },

  schedule:
    "Sábados e domingos selecionados · 15:00–17:30",

  levelLabel:
    "Adequado para principiantes e nível intermédio",

  languageLabel: "Inglês",

  intro:
    "Descubra o prazer de trabalhar o barro à mão. Aprenda técnicas fundamentais de modelagem manual e crie a sua própria peça com o acompanhamento do instrutor. Não é necessária experiência prévia.",

  languageNote:
    "Este workshop é lecionado em inglês.",

  about: [
    "A modelagem manual permite criar livremente com barro sem utilizar a roda de oleiro. Neste workshop, poderá trabalhar ao seu ritmo e criar uma peça de cerâmica à sua escolha com o acompanhamento do instrutor.",

    "Será apresentado às principais técnicas de modelagem manual e aprenderá qual delas se adapta melhor à sua ideia. Pode criar uma chávena, uma taça, um pequeno vaso, um castiçal ou explorar outro projeto possível de realizar durante a sessão.",

    "Não é necessária experiência prévia em cerâmica. Quem já tiver alguma experiência também pode utilizar a sessão para desenvolver os seus próprios projetos."
  ],

  whatYouCanMake: {
    intro:
      "Crie uma peça que seja verdadeiramente sua. Pode trazer uma ideia ou decidir o projeto juntamente com o instrutor quando chegar ao estúdio.",

    note:
      "Os projetos devem ser possíveis de realizar numa única sessão de 2h30. Peças muito grandes ou tecnicamente complexas poderão necessitar de mais tempo.",

    examples: [
      {
        title: "Chávena ou caneca",
        text:
          "Crie uma chávena, uma caneca ou outro pequeno recipiente funcional com a forma e o estilo que preferir."
      },
      {
        title: "Taça",
        text:
          "Construa uma pequena taça de servir, uma taça de pequeno-almoço ou uma forma orgânica e escultórica."
      },
      {
        title: "Pequeno vaso",
        text:
          "Explore altura, forma e textura enquanto cria um pequeno vaso ou recipiente."
      },
      {
        title: "Castiçal",
        text:
          "Crie um objeto decorativo, como um castiçal, um suporte para incenso ou outra peça semelhante."
      }
    ]
  },

  techniques: {
    intro:
      "O instrutor irá ajudá-lo a escolher a técnica mais adequada à peça que pretende criar. Não é necessário utilizar todas as técnicas numa única sessão.",

    items: [
      {
        title: "Beliscado",
        text:
          "Modele o barro diretamente com as mãos para criar chávenas, taças e formas orgânicas.",
        image: "/assets/img/courses/pinch.jpg",
        imageAlt:
          "Técnica de beliscado utilizada na modelagem manual de cerâmica"
      },
      {
        title: "Rolinhos",
        text:
          "Construa formas gradualmente através da sobreposição e união de rolos de barro. É uma técnica versátil para peças funcionais e escultóricas.",
        image: "/assets/img/courses/coil.jpg",
        imageAlt:
          "Técnica de rolinhos utilizada na modelagem manual de cerâmica"
      },
      {
        title: "Placas",
        text:
          "Trabalhe com placas de barro que podem ser cortadas, dobradas e unidas para criar formas mais estruturadas.",
        image: "/assets/img/courses/slab.jpg",
        imageAlt:
          "Técnica de placas utilizada na modelagem manual de cerâmica"
      },
      {
        title: "Decoração de superfície",
        text:
          "Acrescente texturas, padrões e detalhes pintados para dar à sua peça um caráter único.",
        image: "/assets/img/courses/pottery_painted_clay.jpg",
        imageAlt:
          "Decoração de uma peça de cerâmica feita à mão"
      }
    ]
  },

  included: {
    intro:
      "Tudo o que necessita para criar a sua peça está disponível no estúdio.",

    items: [
      {
        title: "Barro e materiais",
        text:
          "Todo o barro e os materiais básicos necessários durante a sessão."
      },
      {
        title: "Ferramentas do estúdio",
        text:
          "Utilização das nossas ferramentas e equipamento de modelagem manual durante o workshop."
      },
      {
        title: "Acompanhamento do instrutor",
        text:
          "Apoio individual com a sua ideia, técnica e construção da peça ao longo da sessão."
      },
      {
        title: "Esmaltagem e cozedura",
        text:
          "Acabamento e cozedura da sua peça de cerâmica após o workshop."
      }
    ]
  },

  beforeYouCome: {
    intro:
      "Algumas informações práticas antes do workshop.",

    items: [
      {
        title: "O que vestir",
        text:
          "Trabalhar com barro pode sujar, por isso recomendamos roupa confortável que não se importe de sujar um pouco."
      },
      {
        title: "O que trazer",
        text:
          "Não precisa de trazer materiais nem ferramentas. Se já tiver uma ideia para a sua peça, pode trazer imagens de referência."
      },
      {
        title: "Peças terminadas",
        text:
          "A sua peça ficará connosco depois do workshop para secagem, esmaltagem e cozedura. Normalmente estará pronta para levantamento dentro de 3 a 4 semanas."
      },
      {
        title: "Idade",
        text:
          "Este workshop é indicado para participantes a partir dos 14 anos."
      }
    ]
  },

  url: "/pt/workshop-modelagem-manual.html"
},

    // Alle aktuell geplanten Termine
    dates: [
      // Saturdays · Ebrahim Elmoly
      {
        date: "2026-09-05",
        start: "15:00",
        end: "17:30",
instructor: "ebrahimElmoly"      },
      {
        date: "2026-09-12",
        start: "15:00",
        end: "17:30",
instructor: "ebrahimElmoly"      },
      {
        date: "2026-09-19",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-09-26",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },

      // Sundays · Maasa Kakurai
      {
        date: "2026-09-06",
        start: "15:00",
        end: "17:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-09-27",
        start: "15:00",
        end: "17:30",
        instructor: "maasaKakurai",
        internalNote: "May later become a Nerikomi workshop"
      },

      // October
      {
        date: "2026-10-03",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-10-04",
        start: "15:00",
        end: "17:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-10-10",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-10-17",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-10-24",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-10-31",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },

      // November
      {
        date: "2026-11-07",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-11-08",
        start: "15:00",
        end: "17:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-11-14",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-11-21",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-11-28",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },

      // December
      {
        date: "2026-12-05",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-12-06",
        start: "15:00",
        end: "17:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-12-12",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-12-19",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      }
    ]
  }, 

  kintsugi: {
    id: "kintsugi",

    calendarCategory: "special",

    medium: "ceramic-repair",
    type: "special",
    format: "single-session",

    durationMinutes: 150,

    price: 65,
    priceCurrency: "EUR",
    priceStatus: "confirmed",

    image: "/assets/img/courses/kintsugi/Kintsugi_Workshop.jpg",
enImageAlt: "Modern Kintsugi workshop at PURACERÂMICA in Lisbon",

booking: {
  url: "https://puraceramicalisboa.simplybook.it/v2/#book/category/2/service/38/count/1/",
  category: "2",
  service: "38"
},

    en: {
      title: "Modern Kintsugi Workshop",
      shortTitle: "Modern Kintsugi",
      pageTag: "Special Workshops · Single Session",

      seo: {
        title: "Modern Kintsugi Workshop in Lisbon | PURACERÂMICA",

        description:
          "Discover modern Kintsugi in a 2.5-hour workshop in Lisbon. Learn how to repair broken ceramics while highlighting their history and imperfections."
      },

      schedule: "Selected dates · 16:00–18:30",
      levelLabel: "Introduction",
      languageLabel: "English",

      intro:
        "Discover the art of Kintsugi through an accessible modern approach. Learn how broken ceramics can be repaired while celebrating their cracks and history.",

      languageNote:
        "This workshop is taught in English.",

about: [
  "Kintsugi is the Japanese art of repairing broken ceramics while making the traces of repair visible rather than hiding them.",

  "In this workshop, you'll explore an accessible modern approach to Kintsugi and learn the basic steps involved in reconnecting broken ceramic pieces and highlighting their cracks.",

  "The session is designed as an introduction and does not require any previous experience."
],

beforeYouCome: {
  intro:
    "Please prepare your ceramic piece before coming to the workshop.",

  items: [
    {
      title: "Bring your own piece",
      text: "Please bring one or two broken ceramic pieces that you would like to work on."
    },
    {
      title: "Keep it manageable",
      text: "Pieces should be approximately hand-sized and ideally broken into two or three shards."
    },
    {
      title: "Choose a simple form",
      text: "Open or shallow ceramic forms with relatively smooth surfaces are generally easiest to work with."
    },
    {
      title: "Practice piece",
      text: "If needed, a practice ceramic piece can be provided in the studio."
    }
  ]
},

included: {
  intro:
    "The materials and tools required for the modern Kintsugi process are provided during the workshop.",

  items: [
    {
      title: "Kintsugi materials",
      text: "Materials required for the repair and finishing process."
    },
    {
      title: "Studio tools",
      text: "Use of the tools and equipment needed during the workshop."
    },
    {
      title: "Instructor guidance",
      text: "Step-by-step guidance throughout the repair process."
    },
    {
      title: "Practice piece",
      text: "A ceramic practice piece can be provided if required."
    }
  ]
},

notice: {
  title: "Important to know",
  text:
    "This workshop uses a modern Kintsugi method and an alternative gold-coloured powder rather than the full traditional urushi process. Finished repairs are not guaranteed to be food-safe, so repaired pieces are recommended for decorative use."
},

url: "/en/kintsugi-workshop.html"
},

pt: {
  title: "Workshop de Kintsugi Moderno",
  shortTitle: "Kintsugi Moderno",
  pageTag: "Workshops Especiais · Sessão Única",

  seo: {
    title: "Workshop de Kintsugi Moderno em Lisboa | PURACERÂMICA",
    description:
      "Descubra o Kintsugi moderno num workshop de 2h30 em Lisboa. Aprenda a reparar cerâmica partida, valorizando as fissuras, a história e as imperfeições de cada peça."
  },

  schedule: "Datas selecionadas · 16:00–18:30",

  levelLabel: "Introdução",
  languageLabel: "Inglês",

  intro:
    "Descubra a arte do Kintsugi através de uma abordagem moderna e acessível. Aprenda como a cerâmica partida pode ser reparada, valorizando as fissuras e a história de cada peça.",

  languageNote:
    "Este workshop é lecionado em inglês.",

  about: [
    "O Kintsugi é a arte japonesa de reparar cerâmica partida, tornando os vestígios da reparação visíveis em vez de os esconder.",

    "Neste workshop, irá explorar uma abordagem moderna e acessível ao Kintsugi e aprender os passos básicos para voltar a unir fragmentos de cerâmica e realçar as fissuras da peça.",

    "A sessão foi concebida como uma introdução e não requer qualquer experiência prévia."
  ],

  beforeYouCome: {
    intro:
      "Prepare a sua peça de cerâmica antes de vir ao workshop.",

    items: [
      {
        title: "Traga a sua própria peça",
        text:
          "Traga uma ou duas peças de cerâmica partidas nas quais gostaria de trabalhar."
      },
      {
        title: "Escolha um tamanho adequado",
        text:
          "As peças devem ter aproximadamente o tamanho de uma mão e, idealmente, estar partidas em dois ou três fragmentos."
      },
      {
        title: "Prefira uma forma simples",
        text:
          "Peças de cerâmica abertas ou pouco profundas e com superfícies relativamente lisas são, geralmente, mais fáceis de trabalhar."
      },
      {
        title: "Peça para praticar",
        text:
          "Se necessário, poderá ser disponibilizada no estúdio uma peça de cerâmica para praticar."
      }
    ]
  },

  included: {
    intro:
      "Os materiais e as ferramentas necessários para o processo de Kintsugi moderno são disponibilizados durante o workshop.",

    items: [
      {
        title: "Materiais de Kintsugi",
        text:
          "Materiais necessários para o processo de reparação e acabamento."
      },
      {
        title: "Ferramentas do estúdio",
        text:
          "Utilização das ferramentas e do equipamento necessários durante o workshop."
      },
      {
        title: "Acompanhamento do instrutor",
        text:
          "Orientação passo a passo ao longo de todo o processo de reparação."
      },
      {
        title: "Peça para praticar",
        text:
          "Se necessário, poderá ser disponibilizada uma peça de cerâmica para praticar."
      }
    ]
  },

  notice: {
    title: "Informação importante",
    text:
      "Este workshop utiliza um método de Kintsugi moderno e um pó alternativo de cor dourada, em vez do processo tradicional completo com urushi. Não é possível garantir que as reparações finais sejam próprias para contacto com alimentos, pelo que recomendamos a utilização das peças reparadas apenas para fins decorativos."
  },

  url: "/pt/workshop-kintsugi.html"
},

    dates: [
      {
        date: "2026-09-13",
        start: "16:00",
        end: "18:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-10-10",
        start: "16:00",
        end: "18:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-11-07",
        start: "16:00",
        end: "18:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-12-13",
        start: "16:00",
        end: "18:30",
        instructor: "maasaKakurai"
      }
    ]
  },

wheelForTwo: {
  id: "wheelForTwo",

  calendarCategory: "wheel",

  medium: "clay",
  type: "workshop",
  format: "single-session",
  level: "beginner",

  durationMinutes: 120,

  price: 120,
  priceCurrency: "EUR",
  priceStatus: "confirmed",
  priceUnit: "for-two",

  participants: {
  min: 2,
  max: 2,
  fixed: true
},

  image: "/assets/img/courses/couple_wheel.jpg",
enImageAlt: "Pottery wheel workshop for two at PURACERÂMICA in Lisbon",

booking: {
  url: "https://puraceramicalisboa.simplybook.it/v2/#book/service/7",
  category: "2",
  service: "7"
},

  en: {
    title: "Wheel for Two",
    shortTitle: "Wheel for Two",
    pageTag: "Pottery Wheel · Private Session",

    seo: {
      title: "Pottery Wheel for Two in Lisbon | PURACERÂMICA",
      description:
        "Try the pottery wheel together in a private 2-hour session for two people in Lisbon. Beginner-friendly with individual instructor guidance."
    },

    schedule:
      "Thursdays 17:30–19:30 · Saturdays 11:00–13:00 & 18:00–20:00",

    levelLabel: "Beginner friendly",
languageLabel: "English or Portuguese",
    intro:
      "Discover the pottery wheel together in a private session for two. Learn the basics of throwing clay and create your first pieces with individual guidance from your instructor.",

    languageNote:
  "The workshop language depends on the selected date. Please check the instructor and language shown for each session.",

    about: [
      "Wheel for Two is a private pottery experience designed for two people who want to discover the pottery wheel together.",

      "Your instructor will guide you through the essential steps of wheel throwing, from preparing and centering the clay to shaping your first forms.",

      "No previous pottery experience is required. The small private format gives you plenty of individual support throughout the session."
    ], 

techniques: {
  intro:
    "Your instructor will guide you through the essential steps of wheel throwing. You'll each work at your own wheel and learn the process together.",

  items: [
    {
      title: "Centering",
      text: "Learn how to center a lump of clay on the spinning wheel — the foundation of successful wheel throwing.",
      image: "/assets/img/courses/center.jpg",
      imageAlt: "Centering clay on the pottery wheel"
    },
    {
      title: "Opening & pulling",
      text: "Once the clay is centered, you'll open it and pull up the walls to create the basic cylinder used for many wheel-thrown forms.",
      image: "/assets/img/courses/pull.jpg",
      imageAlt: "Opening and pulling clay walls on the pottery wheel"
    },
    {
      title: "Shaping",
      text: "Guide and shape the walls of the clay to create a bowl, cup, small vase or another simple form.",
      image: "/assets/img/courses/shape.jpg",
      imageAlt: "Shaping a ceramic vessel on the pottery wheel"
    }
  ]
},

included: {
  intro:
    "Everything you need for the two-person wheel session is provided in the studio.",

  items: [
    {
      title: "Two pottery wheels",
      text: "You'll each have your own pottery wheel throughout the session."
    },
    {
      title: "Clay & materials",
      text: "All clay and basic materials required for both participants."
    },
    {
      title: "Instructor guidance",
      text: "Individual guidance for both of you throughout the two-hour session."
    },
    {
      title: "Glazing & firing",
      text: "Glazing and firing of two of your finished pieces is included."
    }
  ]
},

beforeYouCome: {
  intro:
    "A few practical things to know before your session.",

  items: [
    {
      title: "No experience needed",
      text: "This session is designed for beginners, so you don't need any previous pottery experience."
    },
    {
      title: "Come as a pair",
      text: "This workshop is designed for exactly two participants and the €120 price covers both people."
    },
    {
      title: "What to wear",
      text: "Wheel throwing can get messy, so we recommend comfortable clothes that you don't mind getting a little dirty."
    },
    {
      title: "Finished pieces",
      text: "Your selected pieces will stay with us for glazing and firing and are usually ready for collection within 3–4 weeks."
    }
  ]
},

  url: "/en/pottery-wheel-for-two.html"
},

pt: {
  title: "Torno de Oleiro para Dois",
  shortTitle: "Torno para Dois",
  pageTag: "Roda de Oleiro · Sessão Privada",

  seo: {
    title: "Torno de Oleiro para Dois em Lisboa | PURACERÂMICA",
    description:
      "Experimente a roda de oleiro numa sessão privada de 2 horas para duas pessoas em Lisboa. Adequado para principiantes, com acompanhamento individual do instrutor."
  },

  schedule:
    "Quintas-feiras 17:30–19:30 · Sábados 11:00–13:00 e 18:00–20:00",

  levelLabel: "Adequado para principiantes",
  languageLabel: "Inglês ou Português",

  intro:
    "Descubram juntos a roda de oleiro numa sessão privada para duas pessoas. Aprendam os princípios básicos do trabalho à roda e criem as vossas primeiras peças com acompanhamento individual do instrutor.",

  languageNote:
    "O idioma do workshop depende da data selecionada. Consulte o instrutor e o idioma indicados em cada sessão.",

  about: [
    "Torno de Oleiro para Dois é uma experiência privada de cerâmica criada para duas pessoas que querem descobrir juntas o trabalho na roda de oleiro.",

    "O instrutor irá acompanhar-vos nas etapas essenciais, desde a preparação e centragem do barro até à criação das primeiras formas.",

    "Não é necessária experiência prévia em cerâmica. O formato privado e reduzido permite bastante acompanhamento individual durante toda a sessão."
  ],

  techniques: {
    intro:
      "O instrutor irá acompanhar-vos nas etapas fundamentais do trabalho à roda. Cada participante terá a sua própria roda de oleiro e aprenderão o processo em conjunto.",

    items: [
      {
        title: "Centragem",
        text:
          "Aprenda a centrar o barro na roda em movimento, a base fundamental para trabalhar corretamente na roda de oleiro.",
        image: "/assets/img/courses/center.jpg",
        imageAlt:
          "Centragem do barro numa roda de oleiro"
      },
      {
        title: "Abertura e levantamento",
        text:
          "Depois de centrar o barro, aprenderá a abrir a peça e a levantar as paredes para criar o cilindro básico utilizado em muitas formas feitas à roda.",
        image: "/assets/img/courses/pull.jpg",
        imageAlt:
          "Abertura e levantamento das paredes de barro na roda de oleiro"
      },
      {
        title: "Modelação da forma",
        text:
          "Controle e modele as paredes do barro para criar uma taça, chávena, pequeno vaso ou outra forma simples.",
        image: "/assets/img/courses/shape.jpg",
        imageAlt:
          "Modelação de uma peça de cerâmica na roda de oleiro"
      }
    ]
  },

  included: {
    intro:
      "Tudo o que necessitam para a sessão de roda para duas pessoas está incluído no estúdio.",

    items: [
      {
        title: "Duas rodas de oleiro",
        text:
          "Cada participante terá a sua própria roda de oleiro durante toda a sessão."
      },
      {
        title: "Barro e materiais",
        text:
          "Todo o barro e os materiais básicos necessários para os dois participantes."
      },
      {
        title: "Acompanhamento do instrutor",
        text:
          "Acompanhamento individual para ambos os participantes durante as duas horas."
      },
      {
        title: "Esmaltagem e cozedura",
        text:
          "A esmaltagem e cozedura de duas das peças terminadas estão incluídas."
      }
    ]
  },

  beforeYouCome: {
    intro:
      "Algumas informações práticas antes da sessão.",

    items: [
      {
        title: "Não é necessária experiência",
        text:
          "Esta sessão foi criada para principiantes, por isso não necessita de experiência prévia em cerâmica."
      },
      {
        title: "Venham em dupla",
        text:
          "Este workshop foi criado para exatamente dois participantes e o preço de €120 inclui ambas as pessoas."
      },
      {
        title: "O que vestir",
        text:
          "Trabalhar na roda pode sujar bastante, por isso recomendamos roupa confortável que não se importe de sujar."
      },
      {
        title: "Peças terminadas",
        text:
          "As peças selecionadas ficarão connosco para esmaltagem e cozedura e estarão normalmente prontas para levantamento dentro de 3 a 4 semanas."
      }
    ]
  },

  url: "/pt/roda-oleiro-para-dois.html"
},

  dates: buildRecurringSessions({
    startDate: "2026-09-01",
    endDate: "2026-12-31",

    instructor: "ebrahimElmoly",
    language: "English",

    schedule: [
      {
        weekday: 4,
        start: "17:30",
        end: "19:30"
      },
      {
        weekday: 6,
        start: "11:00",
        end: "13:00"
      },
      {
        weekday: 6,
        start: "18:00",
        end: "20:00"
      }
    ],

    exclude: [], 

    overrides: {
  "2026-09-03|17:30": {
    instructor: "pauloRosica",
    language: "Portuguese"
  },

  "2026-09-05|11:00": {
    instructor: "pauloRosica",
    language: "Portuguese"
  },

  "2026-09-05|18:00": {
    instructor: "pauloRosica",
    language: "Portuguese"
  },

  "2026-09-10|17:30": {
    instructor: "pauloRosica",
    language: "Portuguese"
  },

  "2026-09-12|11:00": {
    instructor: "pauloRosica",
    language: "Portuguese"
  },

  "2026-09-12|18:00": {
    instructor: "pauloRosica",
    language: "Portuguese"
  },

  "2026-09-17|17:30": {
    instructor: "pauloRosica",
    language: "Portuguese"
  }
}
  })
},

intermediateWheel: {
  id: "intermediateWheel",

  calendarCategory: "wheel",

  medium: "clay",
  type: "workshop",
  format: "single-session",
  level: "intermediate",

  durationMinutes: 120,

  price: 65,
  priceCurrency: "EUR",
  priceStatus: "confirmed",

participants: {
  min: 1,
  max: 2,
  fixed: false
},

  booking: {
    url: "https://puraceramicalisboa.simplybook.it/v2/#book/service/42",
    service: "42"
  },

  en: {
    title: "Intermediate Wheel",
    shortTitle: "Intermediate Wheel",
    pageTag: "Pottery Wheel · Intermediate",

    seo: {
      title: "Intermediate Pottery Wheel Workshop Lisbon | PURACERÂMICA",
      description:
        "Develop your wheel-throwing skills in a small intermediate pottery workshop in Lisbon. Maximum two participants with individual guidance."
    },

    schedule: "Selected Wednesdays · 18:00–20:00",

    levelLabel: "Intermediate",
    languageLabel: "Portuguese",

    intro:
      "Develop your wheel-throwing skills in a focused intermediate session with a maximum of two participants.",

    about: [
      "This workshop is designed for people who already have basic experience on the pottery wheel and want to improve their technique, gain more control and work more independently.",

      "With only two pottery wheels and a maximum of two participants, Paulo can provide individual guidance throughout the session.",

      "Previous wheel-throwing experience is required."
    ],

    beforeYouCome: {
      intro:
        "Intermediate Wheel is intended for participants who are already familiar with the basic steps of wheel throwing.",

      items: [
        {
          title: "Previous experience required",
          text: "You should already have basic experience with centering, opening and pulling clay on the pottery wheel."
        },
        {
          title: "Maximum two participants",
          text: "The session is limited to two participants so that each person has their own pottery wheel."
        },
        {
          title: "What to wear",
          text: "Wear comfortable clothes that you don't mind getting clay on. Short nails are recommended for wheel throwing."
        }
      ]
    },

    url: "/en/intermediate-wheel.html"
  },

  pt: {
  title: "Roda de Oleiro Intermédia",
  shortTitle: "Roda Intermédia",
  pageTag: "Roda de Oleiro · Nível Intermédio",

  seo: {
    title: "Workshop Intermédio de Roda de Oleiro em Lisboa | PURACERÂMICA",
    description:
      "Desenvolva as suas competências na roda de oleiro num workshop intermédio em Lisboa. Máximo de dois participantes, com acompanhamento individual."
  },

  schedule:
    "Quartas-feiras selecionadas · 18:00–20:00",

  levelLabel: "Intermédio",
  languageLabel: "Português",

  intro:
    "Desenvolva as suas competências na roda de oleiro numa sessão intermédia focada, com um máximo de dois participantes.",

  languageNote:
    "Este workshop é lecionado em português.",

  about: [
    "Este workshop destina-se a participantes que já tenham experiência básica na roda de oleiro e que pretendam aperfeiçoar a técnica, ganhar maior controlo e trabalhar com mais autonomia.",

    "Com apenas duas rodas de oleiro e um máximo de dois participantes, Paulo poderá oferecer acompanhamento individual ao longo de toda a sessão.",

    "É necessária experiência prévia na roda de oleiro."
  ],

  beforeYouCome: {
    intro:
      "A Roda de Oleiro Intermédia destina-se a participantes que já estejam familiarizados com os passos básicos do trabalho à roda.",

    items: [
      {
        title: "Experiência prévia necessária",
        text:
          "Deverá já ter alguma experiência com centragem, abertura e levantamento do barro na roda de oleiro."
      },
      {
        title: "Máximo de dois participantes",
        text:
          "A sessão está limitada a dois participantes para que cada pessoa tenha a sua própria roda de oleiro."
      },
      {
        title: "O que vestir",
        text:
          "Use roupa confortável que não se importe de sujar com barro. Unhas curtas são recomendadas para trabalhar na roda."
      }
    ]
  },

  url: "/pt/roda-oleiro-intermedia.html"
},

  dates: [
    {
      date: "2026-09-23",
      start: "18:00",
      end: "20:00",
      instructor: "pauloRosica",
      language: "Portuguese"
    },
    {
      date: "2026-10-07",
      start: "18:00",
      end: "20:00",
      instructor: "pauloRosica",
      language: "Portuguese"
    },
    {
      date: "2026-10-21",
      start: "18:00",
      end: "20:00",
      instructor: "pauloRosica",
      language: "Portuguese"
    },
    {
      date: "2026-11-04",
      start: "18:00",
      end: "20:00",
      instructor: "pauloRosica",
      language: "Portuguese"
    },
    {
      date: "2026-11-18",
      start: "18:00",
      end: "20:00",
      instructor: "pauloRosica",
      language: "Portuguese"
    },
    {
      date: "2026-12-02",
      start: "18:00",
      end: "20:00",
      instructor: "pauloRosica",
      language: "Portuguese"
    },
    {
      date: "2026-12-16",
      start: "18:00",
      end: "20:00",
      instructor: "pauloRosica",
      language: "Portuguese"
    }
  ]
},

fourWeekWheelCourse: {
  id: "fourWeekWheelCourse",

  calendarCategory: "wheel",

  medium: "clay",
  type: "course",
  format: "multi-session",
  level: "beginner",

  sessionCount: 4,
  durationMinutes: 120,
  totalDurationMinutes: 480,

  price: 190,
  pricePerSession: 47.5,
  priceCurrency: "EUR",
  priceStatus: "confirmed",

  participants: {
    min: 1,
    max: 2,
    fixed: false
  },

  image: "/assets/img/courses/couple_wheel.jpg",
enImageAlt: "Pottery wheel course at PURACERÂMICA in Lisbon",

  en: {
    title: "4-Week Pottery Wheel Course",
    shortTitle: "4-Week Wheel Course",
    pageTag: "Pottery Wheel · 4-Week Course",

    seo: {
      title: "4-Week Pottery Wheel Course Lisbon | PURACERÂMICA",
      description:
        "Learn pottery wheel techniques in Lisbon in a four-week course with a maximum of two participants. Four 2-hour sessions with individual guidance."
    },

    schedule:
      "Wednesdays · 11:00–13:00 · 4 consecutive weeks",

    levelLabel: "Beginner",
    languageLabel: "Portuguese",

    intro:
      "Build a solid foundation on the pottery wheel across four consecutive weeks in a small course with a maximum of two participants.",

    about: [
      "Across four 2-hour sessions, you will learn and practise the essential steps of wheel throwing, including centering, opening, pulling and shaping clay.",

      "With only two pottery wheels and a maximum of two participants, each person works on their own wheel and receives close individual guidance throughout the course.",

      "The course is designed for beginners who want more time to practise and develop their skills than a single introductory workshop can offer."
    ],

    beforeYouCome: {
      intro:
        "This is a four-week course and your booking includes all four consecutive sessions.",

      items: [
        {
          title: "Start with the first session",
          text: "Participation from the first session of your selected course is required."
        },
        {
          title: "Four consecutive weeks",
          text: "Your booking includes four 2-hour sessions on consecutive Wednesdays."
        },
        {
          title: "Maximum two participants",
          text: "The course is limited to two participants so that each person has their own pottery wheel."
        },
        {
          title: "What to wear",
          text: "Wear comfortable clothes that you don't mind getting clay on. Short nails are recommended for wheel throwing."
        }
      ]
    },

    

    url: "/en/4-week-pottery-wheel-course.html"
  },

  pt: {
  title: "Curso de Roda de Oleiro de 4 Semanas",
  shortTitle: "Curso de Roda · 4 Semanas",
  pageTag: "Roda de Oleiro · Curso de 4 Semanas",

  seo: {
    title: "Curso de Roda de Oleiro de 4 Semanas em Lisboa | PURACERÂMICA",
    description:
      "Aprenda as bases da roda de oleiro num curso de quatro semanas em Lisboa, com um máximo de dois participantes. Quatro sessões de 2 horas com acompanhamento individual."
  },

  schedule:
    "Quartas-feiras · 11:00–13:00 · 4 semanas consecutivas",

  levelLabel: "Principiante",
  languageLabel: "Português",

  intro:
    "Construa uma base sólida na roda de oleiro ao longo de quatro semanas consecutivas, num curso reduzido com um máximo de dois participantes.",

  languageNote:
    "Este curso é lecionado em português.",

  about: [
    "Ao longo de quatro sessões de 2 horas, irá aprender e praticar as etapas essenciais do trabalho na roda de oleiro, incluindo centragem, abertura, levantamento e modelação do barro.",

    "Com apenas duas rodas de oleiro e um máximo de dois participantes, cada pessoa trabalha na sua própria roda e recebe acompanhamento próximo ao longo de todo o curso.",

    "O curso foi concebido para principiantes que pretendem ter mais tempo para praticar e desenvolver as suas competências do que numa única sessão introdutória."
  ],

  beforeYouCome: {
    intro:
      "Este é um curso de quatro semanas e a sua reserva inclui as quatro sessões consecutivas.",

    items: [
      {
        title: "Comece na primeira sessão",
        text:
          "É necessário participar desde a primeira sessão da turma escolhida."
      },
      {
        title: "Quatro semanas consecutivas",
        text:
          "A sua reserva inclui quatro sessões de 2 horas em quartas-feiras consecutivas."
      },
      {
        title: "Máximo de dois participantes",
        text:
          "O curso está limitado a dois participantes para que cada pessoa tenha a sua própria roda de oleiro."
      },
      {
        title: "O que vestir",
        text:
          "Use roupa confortável que não se importe de sujar com barro. Unhas curtas são recomendadas para trabalhar na roda."
      }
    ]
  },

  url: "/pt/curso-roda-oleiro-4-semanas.html"
},

  cohorts: [
    {
      id: "october-2026",
      label: "October",
      startDate: "2026-10-07",
      instructor: "pauloRosica",
      language: "Portuguese",

      booking: {
        url:
          "https://puraceramicalisboa.simplybook.it/v2/#book-class/service/43/date/2026-10-07/time/11:00/",
        service: "43"
      },

      sessions: [
        {
          date: "2026-10-07",
          start: "11:00",
          end: "13:00"
        },
        {
          date: "2026-10-14",
          start: "11:00",
          end: "13:00"
        },
        {
          date: "2026-10-21",
          start: "11:00",
          end: "13:00"
        },
        {
          date: "2026-10-28",
          start: "11:00",
          end: "13:00"
        }
      ]
    },

    {
      id: "november-2026",
      label: "November",
      startDate: "2026-11-04",
      instructor: "pauloRosica",
      language: "Portuguese",

      booking: {
        url:
          "https://puraceramicalisboa.simplybook.it/v2/#book-class/service/44/date/2026-11-04/time/11:00/",
        service: "44"
      },

      sessions: [
        {
          date: "2026-11-04",
          start: "11:00",
          end: "13:00"
        },
        {
          date: "2026-11-11",
          start: "11:00",
          end: "13:00"
        },
        {
          date: "2026-11-18",
          start: "11:00",
          end: "13:00"
        },
        {
          date: "2026-11-25",
          start: "11:00",
          end: "13:00"
        }
      ]
    }
  ]
},

wineAndClay: {
  id: "wineAndClay",

  calendarCategory: "social",

  medium: "clay",
  type: "social",
  format: "single-session",
  level: "beginner",

  durationMinutes: 120,

  price: 50,
  priceCurrency: "EUR",
  priceStatus: "confirmed",

  ageMinimum: 18,

  image: "/assets/img/courses/wine-clay.jpg",
enImageAlt: "Wine and Clay handbuilding evening at PURACERÂMICA in Lisbon",

  booking: {
    url: "https://puraceramicalisboa.simplybook.it/v2/#book/service/39",
    service: "39"
  },

  en: {
    title: "Wine & Clay",
    shortTitle: "Wine & Clay",
    pageTag: "Pottery Social · Handbuilding",

    seo: {
      title: "Wine & Clay in Lisbon | PURACERÂMICA",
      description:
        "Spend a creative Friday evening handbuilding with clay in Lisbon. A relaxed two-hour pottery social with instructor guidance, wine and good company."
    },

    schedule: "Fridays · 19:00–21:00",

    levelLabel: "Beginner friendly",
languageLabel: "Portuguese & English",

    intro:
      "Slow down, get your hands in clay and enjoy a relaxed Friday evening in the studio. Wine & Clay combines free handbuilding, instructor support and a social atmosphere.",

   languageNote:
  "This event is hosted in Portuguese and English.",

    about: [
      "Wine & Clay is a relaxed social pottery session rather than a structured pottery class. You'll have time to explore handbuilding freely, work on your own idea and enjoy the evening with other makers.",

      "Your instructor is there to help with techniques, construction and creative ideas whenever you need support.",

      "No previous pottery experience is required. Come on your own, with a friend or as a small group."
    ],

    included: {
  intro:
    "Everything you need for a relaxed creative evening is provided in the studio.",

  items: [
    {
      title: "Clay & materials",
      text: "Clay and the basic materials needed for your handbuilding project."
    },
    {
      title: "Studio tools",
      text: "Use of our handbuilding tools and equipment throughout the session."
    },
    {
      title: "Instructor guidance",
      text: "Amanda will be available throughout the evening to help with techniques, construction and creative ideas."
    },
    {
      title: "Wine",
      text: "Wine is included as part of the evening. A non-alcoholic option is also available."
    }
  ]
},

beforeYouCome: {
  intro:
    "A few practical things to know before joining Wine & Clay.",

  items: [
    {
      title: "18+ only",
      text: "Wine & Clay is an adults-only event for participants aged 18 and over."
    },
    {
      title: "No experience needed",
      text: "You don't need any previous pottery experience. The session is beginner friendly."
    },
    {
      title: "What to wear",
      text: "Clay can get messy, so we recommend comfortable clothes that you don't mind getting a little dirty."
    },
    {
      title: "Come your way",
      text: "You're welcome to come on your own, with a friend or as a small group."
    }
  ]
},

    url: "/en/wine-and-clay.html"
  },

  pt: {
  title: "Wine & Clay",
  shortTitle: "Wine & Clay",
  pageTag: "Encontro de Cerâmica · Modelagem Manual",

  seo: {
    title: "Wine & Clay em Lisboa | PURACERÂMICA",
    description:
      "Passe uma sexta-feira criativa em Lisboa a trabalhar com barro, num ambiente descontraído, com vinho e acompanhamento do instrutor. Sessão de 2 horas, adequada para principiantes."
  },

  schedule: "Sextas-feiras · 19:00–21:00",

  levelLabel: "Adequado para principiantes",
  languageLabel: "Português e Inglês",

  intro:
    "Desacelere, ponha as mãos no barro e desfrute de uma sexta-feira descontraída no estúdio. Wine & Clay combina modelagem manual livre, acompanhamento do instrutor e um ambiente social.",

  languageNote:
    "Esta sessão é realizada em português e inglês.",

  about: [
    "Wine & Clay é uma sessão de cerâmica descontraída e social, em vez de uma aula de cerâmica estruturada. Terá tempo para explorar livremente a modelagem manual, desenvolver a sua própria ideia e desfrutar da noite com outros participantes.",

    "O instrutor estará disponível ao longo da sessão para ajudar com técnicas, construção das peças e ideias criativas sempre que necessário.",

    "Não é necessária experiência prévia em cerâmica. Pode vir sozinho, com um amigo ou em pequeno grupo."
  ],

  included: {
    intro:
      "Tudo o que necessita para uma noite criativa e descontraída está disponível no estúdio.",

    items: [
      {
        title: "Barro e materiais",
        text:
          "Barro e os materiais básicos necessários para o seu projeto de modelagem manual."
      },
      {
        title: "Ferramentas do estúdio",
        text:
          "Utilização das nossas ferramentas e equipamento de modelagem manual durante toda a sessão."
      },
      {
        title: "Acompanhamento do instrutor",
        text:
          "Amanda estará disponível durante toda a sessão para ajudar com técnicas, construção e ideias criativas."
      },
      {
        title: "Vinho",
        text:
          "O vinho está incluído na experiência. Está também disponível uma opção sem álcool."
      }
    ]
  },

  beforeYouCome: {
    intro:
      "Algumas informações práticas antes de participar no Wine & Clay.",

    items: [
      {
        title: "Apenas para maiores de 18 anos",
        text:
          "Wine & Clay é um evento destinado exclusivamente a participantes com 18 anos ou mais."
      },
      {
        title: "Não é necessária experiência",
        text:
          "Não precisa de ter experiência prévia em cerâmica. A sessão é adequada para principiantes."
      },
      {
        title: "O que vestir",
        text:
          "Trabalhar com barro pode sujar, por isso recomendamos roupa confortável que não se importe de sujar um pouco."
      },
      {
        title: "Venha como preferir",
        text:
          "Pode participar sozinho, com um amigo ou em pequeno grupo."
      }
    ]
  },

  url: "/pt/wine-and-clay.html"
},

 dates: buildRecurringSessions({
  startDate: "2026-09-04",
  endDate: "2026-12-18",

  instructor: "amanda",
  language: "Portuguese & English",

  schedule: [
    {
      weekday: 5,
      start: "19:00",
      end: "21:00"
    }
  ],

  exclude: []
})
},
continuousHandbuilding: {
  id: "continuousHandbuilding",

  medium: "clay",
  type: "course",
  format: "ongoing",
  level: "all-levels",
  calendarCategory: "handbuilding",

  durationMinutes: 120,

  price: 45,
  priceCurrency: "EUR",
  priceStatus: "tentative",

  booking: {
  url: "https://puraceramicalisboa.simplybook.it/v2/#book/service/40",
  service: "40"
},

  en: {
    title: "Continuous Handbuilding Classes",
    shortTitle: "Continuous Handbuilding",
    pageTag: "Pottery Classes · Ongoing",

    seo: {
      title: "Continuous Handbuilding Classes in Lisbon | PURACERÂMICA",
      description:
        "Develop your handbuilding skills in ongoing ceramic classes in Lisbon. Explore construction techniques, personal projects, engobes, textures and surface decoration."
    },

    schedule: "Wednesdays · 18:00–20:00",

    levelLabel: "All levels",
    languageLabel: "Portuguese & English",

    intro:
      "Develop your ceramic practice through ongoing handbuilding classes focused on technique, experimentation and personal projects.",

    languageNote:
      "Classes are taught in Portuguese and English.",

    about: [
      "In these ongoing ceramic classes, participants explore clay through a range of handbuilding techniques, from developing an artistic idea and planning a project to creating the finished piece.",

      "Throughout the sessions, you'll also have the opportunity to prepare and apply engobes, experimenting with different colours, textures and surfaces.",

      "The continuous format gives you space to develop creativity, artistic expression and technical skills through experimentation, ongoing learning and exchange with others."
    ],

    url: "/en/continuous-handbuilding.html"
  },

  pt: {
  title: "Aulas Contínuas de Modelagem Manual",
  shortTitle: "Modelagem Manual Contínua",
  pageTag: "Aulas de Cerâmica · Formato Contínuo",

  seo: {
    title: "Aulas Contínuas de Modelagem Manual em Lisboa | PURACERÂMICA",
    description:
      "Desenvolva a sua prática de cerâmica em aulas contínuas de modelagem manual em Lisboa. Explore técnicas de construção, projetos pessoais, engobes, cores e texturas."
  },

  schedule: "Quartas-feiras · 18:00–20:00",

  levelLabel: "Todos os níveis",
  languageLabel: "Português e Inglês",

  intro:
    "Desenvolva a sua prática de cerâmica através de aulas contínuas de modelagem manual, com foco em técnica, experimentação e projetos pessoais.",

  languageNote:
    "As aulas são realizadas em português e inglês.",

  about: [
    "Ao longo das aulas, irá explorar diferentes técnicas de construção, desde a conceção da ideia e o planeamento do projeto até à execução da peça.",

    "Terá também a oportunidade de preparar e aplicar engobes, experimentando diferentes cores, texturas e superfícies.",

    "As aulas contínuas promovem o desenvolvimento da criatividade, da expressão artística e das competências técnicas num ambiente de experimentação, aprendizagem contínua e partilha."
  ],

  url: "/pt/aulas-continuas-modelagem-manual.html"
},

  

  dates: buildRecurringSessions({
    startDate: "2026-10-07",
    endDate: "2026-12-16",

    instructor: "amanda",
    language: "Portuguese & English",

    schedule: [
      {
        weekday: 3,
        start: "18:00",
        end: "20:00"
      }
    ],

    exclude: []
  })
},

intermediateHandbuilding: {
  id: "intermediateHandbuilding",

  calendarCategory: "handbuilding",

  medium: "clay",
  type: "workshop",
  format: "single-session",
  level: "intermediate",

  durationMinutes: 120,

  price: 45,
  priceCurrency: "EUR",
  priceStatus: "confirmed",

  booking: {
    url: "https://puraceramicalisboa.simplybook.it/v2/#book/service/41",
    service: "41"
  },

  en: {
    title: "Intermediate Handbuilding",
    shortTitle: "Intermediate Handbuilding",
    pageTag: "Pottery Workshop · Handbuilding",

    seo: {
      title: "Intermediate Handbuilding Workshop Lisbon | PURACERÂMICA",
      description:
        "Develop your handbuilding skills in an intermediate pottery workshop in Lisbon. Refine your technique, explore more complex forms and work on your own ceramic projects."
    },

    schedule: "Selected Thursdays · 11:00–13:00",

    levelLabel: "Intermediate",
    languageLabel: "English",

    intro:
      "Take your handbuilding skills further in a focused intermediate pottery session with Maasa.",

    about: [
      "This workshop is designed for participants who already have some basic experience with clay and want to develop their technique, work more independently and explore more complex forms and construction methods.",

      "With guidance from Maasa, you can refine your ideas, improve your building techniques and develop your own ceramic project in a small and supportive studio setting.",

      "Previous handbuilding experience is recommended."
    ],

    beforeYouCome: {
      intro:
        "This workshop is intended for participants who already have some experience working with clay.",

      items: [
        {
          title: "Previous experience",
          text: "Basic handbuilding experience is recommended so you can work more independently during the session."
        },
        {
          title: "Bring your ideas",
          text: "You're welcome to come with a project or form you would like to explore."
        },
        {
          title: "What to wear",
          text: "Wear comfortable clothes that you don't mind getting a little clay on."
        }
      ]
    },

    url: "/en/intermediate-handbuilding.html"
  },

 pt: {
  title: "Modelagem Manual Intermédia",
  shortTitle: "Modelagem Intermédia",
  pageTag: "Workshop de Cerâmica · Modelagem Manual",

  seo: {
    title: "Workshop de Modelagem Manual Intermédia em Lisboa | PURACERÂMICA",
    description:
      "Desenvolva as suas competências de modelagem manual num workshop intermédio de cerâmica em Lisboa. Aperfeiçoe a técnica, explore formas mais complexas e desenvolva os seus próprios projetos."
  },

  schedule:
    "Quintas-feiras selecionadas · 11:00–13:00",

  levelLabel: "Intermédio",
  languageLabel: "Inglês",

  intro:
    "Aprofunde as suas competências de modelagem manual numa sessão intermédia orientada por Maasa.",

  languageNote:
    "Este workshop é lecionado em inglês.",

  about: [
    "Este workshop destina-se a participantes que já tenham alguma experiência básica com barro e que pretendam desenvolver a técnica, trabalhar com maior autonomia e explorar formas e métodos de construção mais complexos.",

    "Com o acompanhamento de Maasa, poderá aperfeiçoar as suas ideias, melhorar as técnicas de construção e desenvolver o seu próprio projeto de cerâmica num ambiente de estúdio pequeno e acolhedor.",

    "É recomendada experiência prévia em modelagem manual."
  ],

  beforeYouCome: {
    intro:
      "Este workshop destina-se a participantes que já tenham alguma experiência a trabalhar com barro.",

    items: [
      {
        title: "Experiência prévia",
        text:
          "É recomendada experiência básica em modelagem manual para que possa trabalhar com maior autonomia durante a sessão."
      },
      {
        title: "Traga as suas ideias",
        text:
          "Pode trazer consigo uma ideia de projeto ou uma forma que gostaria de explorar."
      },
      {
        title: "O que vestir",
        text:
          "Use roupa confortável que não se importe de sujar um pouco com barro."
      }
    ]
  },

  url: "/pt/modelagem-manual-intermedia.html"
}, 

  dates: [
    {
      date: "2026-09-24",
      start: "11:00",
      end: "13:00",
      instructor: "maasaKakurai",
      language: "English"
    },
    {
      date: "2026-10-08",
      start: "11:00",
      end: "13:00",
      instructor: "maasaKakurai",
      language: "English"
    },
    {
      date: "2026-10-22",
      start: "11:00",
      end: "13:00",
      instructor: "maasaKakurai",
      language: "English"
    },
    {
      date: "2026-11-05",
      start: "11:00",
      end: "13:00",
      instructor: "maasaKakurai",
      language: "English"
    },
    {
      date: "2026-11-19",
      start: "11:00",
      end: "13:00",
      instructor: "maasaKakurai",
      language: "English"
    }
  ]
},

shukiSakeWare: {
  id: "shukiSakeWare",

    calendarCategory: "special",

  medium: "clay",
  type: "special",
  format: "multi-session",
  level: "beginner",

  sessionCount: 3,
  totalDurationMinutes: 360,

  price: 140,
  priceCurrency: "EUR",
  priceStatus: "confirmed",

  minimumToRun: 5,

  participants: {
    min: 1,
    max: 8,
    fixed: false
  },
  image: "/assets/img/courses/sake/Sake_Set.JPG",
enImageAlt: "Handmade Japanese sake ware set for the Shuki workshop at PURACERÂMICA",

  en: {
    title: "Create Your Own Shuki",
    shortTitle: "Shuki Sake Ware Workshop",
    pageTag: "Japanese Sake Ware · 3-Part Workshop",

    seo: {
      title: "Japanese Sake Ware Workshop Lisbon | PURACERÂMICA",
      description:
        "Create your own Japanese sake ware in Lisbon across three ceramic sessions. Make, glaze and enjoy your finished pieces with a sake tasting."
    },

    schedule:
      "3 sessions · 1, 22 & 29 November",

    levelLabel: "Beginner friendly",
    languageLabel: "English",

    intro:
      "Create your own Japanese sake ware across three sessions combining ceramics, traditional forms and a final sake tasting.",

    about: [
      "Across the workshop you will create two Guinomi sake cups and one Katakuchi pouring vessel.",

      "You will explore Japanese handbuilding and surface techniques including Kurinuki, Tamazukuri, Mentori and Shinogi.",

      "After making and glazing your pieces, the final session brings the group together for collection of the finished ceramics and a sake tasting."
    ],

    included: {
      intro:
        "The workshop includes the materials and finishing needed to complete your sake ware set.",

      items: [
        {
          title: "Ceramic materials",
          text: "Clay and materials used throughout the making and glazing sessions."
        },
        {
          title: "Firing",
          text: "Firing of the ceramic pieces created during the workshop."
        },
        {
          title: "Three-piece sake ware set",
          text: "Create two Guinomi cups and one Katakuchi pouring vessel."
        },
        {
          title: "Sake tasting",
          text: "A sake tasting is included in the final session."
        }
      ]
    },

    beforeYouCome: {
      intro:
        "This workshop takes place across three connected sessions.",

      items: [
        {
          title: "All three sessions",
          text: "Your booking includes all three dates and attendance at every session is required."
        },
        {
          title: "Beginner friendly",
          text: "No previous pottery experience is required."
        },
        {
          title: "Minimum group size",
          text: "The workshop runs with a minimum of 5 participants."
        }
      ]
    },

    url: "/en/shuki-sake-ware-workshop.html"
  },

  pt: {
  title: "Crie o Seu Próprio Shuki",
  shortTitle: "Workshop de Shuki",
  pageTag: "Cerâmica Japonesa para Sake · Workshop em 3 Sessões",

  seo: {
    title: "Workshop de Cerâmica Japonesa para Sake em Lisboa | PURACERÂMICA",
    description:
      "Crie o seu próprio conjunto de cerâmica japonesa para sake em Lisboa ao longo de três sessões. Modele, esmalte e termine a experiência com uma prova de sake."
  },

  schedule:
    "3 sessões · 1, 22 e 29 de novembro",

  levelLabel: "Adequado para principiantes",
  languageLabel: "Inglês",

  intro:
    "Crie o seu próprio conjunto de cerâmica japonesa para sake ao longo de três sessões que combinam cerâmica, formas tradicionais e uma prova de sake no encontro final.",

  languageNote:
    "Este workshop é lecionado em inglês.",

  about: [
    "Ao longo do workshop, irá criar duas chávenas Guinomi e um recipiente Katakuchi para servir sake.",

    "Irá explorar técnicas japonesas de modelagem manual e decoração de superfície, incluindo Kurinuki, Tamazukuri, Mentori e Shinogi.",

    "Depois da criação e esmaltagem das peças, a última sessão reúne o grupo para o levantamento das cerâmicas terminadas e uma prova de sake."
  ],

  included: {
    intro:
      "O workshop inclui os materiais e acabamentos necessários para completar o seu conjunto de cerâmica para sake.",

    items: [
      {
        title: "Materiais de cerâmica",
        text:
          "Barro e materiais utilizados durante as sessões de modelagem e esmaltagem."
      },
      {
        title: "Cozedura",
        text:
          "Cozedura das peças de cerâmica criadas durante o workshop."
      },
      {
        title: "Conjunto de três peças",
        text:
          "Crie duas chávenas Guinomi e um recipiente Katakuchi para servir sake."
      },
      {
        title: "Prova de sake",
        text:
          "A sessão final inclui uma prova de sake."
      }
    ]
  },

  beforeYouCome: {
    intro:
      "Este workshop decorre ao longo de três sessões ligadas entre si.",

    items: [
      {
        title: "As três sessões",
        text:
          "A sua reserva inclui as três datas e é necessária a participação em todas as sessões."
      },
      {
        title: "Adequado para principiantes",
        text:
          "Não é necessária experiência prévia em cerâmica."
      },
      {
        title: "Número mínimo de participantes",
        text:
          "O workshop realiza-se com um mínimo de 5 participantes."
      }
    ]
  },

  url: "/pt/workshop-shuki-ceramica-sake.html"
},

  cohorts: [
    {
      id: "november-2026",
      label: "November",
      startDate: "2026-11-01",

      instructor: "maasaKakurai",
      language: "English",

      booking: {
        url:
          "https://puraceramicalisboa.simplybook.it/v2/#book/service/46/date/2026-11-01/time/15:00/",
        service: "46"
      },

      sessions: [
        {
          label: "Making",
          date: "2026-11-01",
          start: "15:00",
          end: "17:30"
        },
        {
          label: "Glazing",
          date: "2026-11-22",
          start: "15:00",
          end: "17:30"
        },
        {
          label: "Sake Tasting & Collection",
          date: "2026-11-29",
          start: "15:00",
          end: "16:00"
        }
      ]
    }
  ]
},

};