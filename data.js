const LOCATIONS = [
  {
    id: 0,
    name: "Banheiro Público",
    locationRowCol: { row: 1, col: 2 },
    eventRowCol: { row: 1, col: 3 },
  },
  {
    id: 1,
    name: "Bar",
    locationRowCol: { row: 5, col: 2 },
    eventRowCol: { row: 5, col: 3 },
  },
  // {
  //   id: 2,
  //   name: "Bueiro",
  // },
  // {
  //   id: 3,
  //   name: "Casa",
  // },
  // {
  //   id: 4,
  //   name: "Carrinho de lanche",
  // },
  // {
  //   id: 5,
  //   name: "Chafariz",
  // },
  // {
  //   id: 6,
  //   name: "Container de Lixo",
  // },
  // {
  //   id: 7,
  //   name: "Escola",
  // },
  // {
  //   id: 8,
  //   name: "Lagoa",
  // },
  // {
  //   id: 9,
  //   name: "Loja",
  // },
  // {
  //   id: 10,
  //   name: "Mata Pequena",
  // },
  // {
  //   id: 11,
  //   name: "Padaria",
  // },
  // {
  //   id: 12,
  //   name: "Parquinho Infantil",
  // },
  // {
  //   id: 13,
  //   name: "Poça de água",
  // },
  // {
  //   id: 14,
  //   name: "Restaurante",
  // },
  // {
  //   id: 15,
  //   name: "Rio / Esgoto",
  // },
  // {
  //   id: 16,
  //   name: "Rua",
  // },
  // {
  //   id: 17,
  //   name: "Sítio peri-urbano",
  // },
  // {
  //   id: 18,
  //   name: "Zoologico",
  // },
  // {
  //   id: 19,
  //   name: "Salão de Beleza",
  // },
  // {
  //   id: 20,
  //   name: "Motel",
  // },
];

const DISEASES = [
  {
    id: 0,
    name: "Chikungunya",
    locationsIds: [0,1],
    primarySymptons: [
      "Artralgia intensa e debilitante",
      "Edema articular (inchaço nas articulações)",
    ],
    secundarySymptons: [""],
  },
  //   {
  //   id: 0,
  //   name: "Chikungunya",
  //   locationsIds: [5, 8, 16],
  //   primarySymptons: [
  //     "Artralgia intensa e debilitante",
  //     "Edema articular (inchaço nas articulações)",
  //   ],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 1,
  //   name: "Cólera",
  //   locationsIds: [1, 4, 5, 14, 15],
  //   primarySymptons: ['Diarreia aquosa profusa (semelhante a "água de arroz")'],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 2,
  //   name: "Dengue",
  //   locationsIds: [2, 5, 6, 8, 12, 13, 16, 18],
  //   primarySymptons: [
  //     "Artralgia (dor articular)",
  //     "Dor retro-orbitária (dor atrás dos olhos)",
  //     "Exantema (erupção cutânea)",
  //     "Mialgia (dor muscular)",
  //   ],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 3,
  //   name: "Esporotricose",
  //   locationsIds: [2, 3, 16, 17],
  //   primarySymptons: [
  //     "Lesão cutânea nodular",
  //     'Linfangite ascendente ("corda" sob a pele)',
  //     "Úlcera",
  //   ],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 4,
  //   name: "Esquistossomose",
  //   locationsIds: [8, 10, 13, 15],
  //   primarySymptons: [
  //     "Ascite (barriga d'água)",
  //     "Dermatite Cercariana (coceira e erupção no local da infecção)",
  //     "Fibrose hepática",
  //     "Hemorragias / Sangramentos",
  //     "Hipertensão portal",
  //   ],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 5,
  //   name: "Febre Amarela",
  //   locationsIds: [8, 10, 17],
  //   primarySymptons: [
  //     "Hemorragias / Sangramentos",
  //     "Icterícia (coloração amarela da pele e olhos)",
  //     "Insuficiência hepática",
  //     "Insuficiência renal aguda",
  //     'Vômito negro ("café moído")',
  //   ],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 6,
  //   name: "Febre Maculosa",
  //   locationsIds: [10, 17, 18],
  //   primarySymptons: [""],
  //   secundarySymptons: ["Exantema maculopapular", "Picada de carrapato"],
  // },
  // {
  //   id: 7,
  //   name: "Febre Tifóide",
  //   locationsIds: [1, 4, 7, 14],
  //   primarySymptons: [
  //     "Bradicardia relativa (frequência cardíaca baixa com febre alta)",
  //     "Confusão mental / 'Stupor'",
  //     "Manchas rosadas no tronco (roseolas tíficas)",
  //   ],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 8,
  //   name: "Hantavirose",
  //   locationsIds: [2, 6, 11],
  //   primarySymptons: [
  //     "Dispinéia",
  //     "Edema pulmonar não cardiogênico",
  //     "Tosse seca",
  //   ],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 9,
  //   name: "Hepatite A",
  //   locationsIds: [3, 4, 7, 11, 12, 14],
  //   primarySymptons: [
  //     "Acolia fecal (fezes claras)",
  //     "Colúria (urina escura)",
  //     "Icterícia (coloração amarela da pele e olhos)",
  //   ],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 10,
  //   name: "Hepatite C",
  //   locationsIds: [0, 3, 19, 20],
  //   primarySymptons: [],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 11,
  //   name: "Meningite",
  //   locationsIds: [7, 9, 19],
  //   primarySymptons: [
  //     "Cefaleia intensa",
  //     "Fotofobia",
  //     "Petéquias (manchas hemorrágicas ou púrpura)",
  //     "Rigidez na Nuca",
  //   ],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 12,
  //   name: "Leishmaniose",
  //   locationsIds: [10, 17, 18],
  //   primarySymptons: ["Lesão ulcerada (ferida) que não cicatriza", "Úlcera"],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 13,
  //   name: "Leptospirose",
  //   locationsIds: [2, 6, 8, 13, 15],
  //   primarySymptons: [
  //     "Dor na panturrilha",
  //     "Hemorragia Pulmonar",
  //     "Hepatite",
  //     "Icterícia (coloração amarela da pele e olhos)",
  //     "Insuficiência renal aguda",
  //     "Náuseas",
  //   ],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 14,
  //   name: "Sarampo",
  //   locationsIds: [0, 1, 3, 7, 9, 11, 14, 19],
  //   primarySymptons: [
  //     "Exantema maculopapular",
  //     "Manchas de Koplik (pequenas manchas brancas na mucosa oral)",
  //   ],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 15,
  //   name: "Sífilis",
  //   locationsIds: [0, 3, 20],
  //   primarySymptons: [
  //     "Exantema (erupção cutânea)",
  //     "Goma sifilítico (lesão destrutiva)",
  //     "Linfadenopatia (ínguas)",
  //     "Úlcera única, indolor (Cancro duro)",
  //   ],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 16,
  //   name: "Toxoplasmose",
  //   locationsIds: [10, 12, 17, 18],
  //   primarySymptons: [
  //     "Linfadenopatia (ínguas) cervical ou occipital acentuada",
  //   ],
  //   secundarySymptons: [""],
  // },
  // {
  //   id: 17,
  //   name: "Tuberculose",
  //   locationsIds: [3, 7, 9, 20],
  //   primarySymptons: [
  //     "Febre vespertina",
  //     "Hemoptise (tosse com sangue)",
  //     "Sudorese noturna",
  //     "Tosse produtiva",
  //   ],
  //   secundarySymptons: [""],
  // },
];
