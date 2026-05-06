import { CollectionItem, RpgCharacter, RpgZone } from './types';

export const characters: RpgCharacter[] = [
  {
    id: 'arqueologo',
    name: 'El Historiador',
    title: 'Historia y arqueologia',
    portrait: '/images/El%20Historiador.png',
    sprite: '/images/El%20Historiador.png',
    focus: 'Yacimientos, castillo, memoria antigua y frontera medieval.',
    quote: 'Cada piedra de Teba guarda una fecha que quiere volver a hablar.',
    accent: '#d6a15f',
  },
  {
    id: 'senderista',
    name: 'La Senderista',
    title: 'Rutas y miradores',
    portrait: '/images/la%20Senderista.png',
    sprite: '/images/la%20Senderista.png',
    focus: 'Sierras, miradores, rio, embalse, cereal y olivar.',
    quote: 'El mapa se entiende mejor cuando se escucha el viento.',
    accent: '#78a05a',
  },
  {
    id: 'quesero',
    name: 'El Anfitrion',
    title: 'Bares, fiestas y ocio',
    portrait: '/images/El%20Anfitri%C3%B3n.png',
    sprite: '/images/El%20Anfitri%C3%B3n.png',
    focus: 'Tapas, feria, bares, musica, celebraciones y vida del pueblo.',
    quote: 'Un pueblo tambien se cuenta por como celebra y por donde se queda la gente.',
    accent: '#f0b85a',
  },
];

export const zones: RpgZone[] = [
  {
    id: 'castillo',
    slug: 'castillo-de-la-estrella',
    title: 'Castillo de la Estrella',
    subtitle: 'La fortaleza mayor de Malaga',
    category: 'heritage',
    mapX: 51,
    mapY: 21,
    sceneImage: '/images/castillo-dia.png',
    fallbackImage: '/images/iglesia.png',
    nodeIcon: 'Castle',
    accent: '#d6a15f',
    summary: 'Una fortaleza almohade clave en la frontera con Granada y simbolo de Teba.',
    narrative:
      'Cuando cae la luz, las torres parecen encender una constelacion de piedra. Aqui empieza la ruta del corazon: frontera, memoria y una promesa que viajo desde Escocia.',
    guide:
      'El Castillo de la Estrella domina el paisaje y resume buena parte de la identidad local: frontera, conquista, leyenda y memoria compartida con Escocia.',
    visitInfo: {
      whatToSee: ['Torre del Homenaje', 'Aljibes y murallas', 'Centro de interpretacion'],
      localTip: 'Sube con tiempo para mirar el valle: la escala del castillo se entiende desde arriba.',
      visitorUse: 'Ideal como primera parada para situar la historia de Teba antes de bajar al casco urbano.',
    },
    hotspots: [
      {
        id: 'castillo-recintos',
        x: 30,
        y: 42,
        label: 'Recintos amurallados',
        content:
          'El castillo conserva dos recintos, torres, aljibes y restos defensivos. Su escala explica por que fue una pieza fronteriza tan importante.',
        icon: 'Shield',
      },
      {
        id: 'castillo-douglas',
        x: 62,
        y: 55,
        label: 'Douglas y Escocia',
        content:
          'En 1330 murio aqui Sir James Douglas, vinculado al corazon de Robert the Bruce. Esta historia une Teba con Melrose y Escocia.',
        icon: 'Heart',
      },
    ],
    mission: {
      id: 'mision-castillo',
      title: 'Leer la frontera',
      description: 'Descubre los dos puntos clave del castillo y guarda su sello en tu diario.',
      rewardItemId: 'sello-castillo',
      xp: 20,
    },
    puzzle: {
      id: 'puzzle-corazon',
      title: 'El sello del corazon',
      prompt:
        'Ordena los simbolos de la leyenda: primero la fortaleza, despues el corazon, por ultimo la estrella que guia el regreso.',
      clue: 'Castillo, corazon, estrella.',
      runes: ['Castle', 'Heart', 'Sparkles'],
      answer: ['Castle', 'Heart', 'Sparkles'],
      rewardItemId: 'fragmento-corazon',
      xp: 30,
      solvedText:
        'El mapa vibra suavemente. Has unido la frontera de Teba con la memoria de Douglas y Robert the Bruce.',
    },
  },
  {
    id: 'historia',
    slug: 'historia-antigua',
    title: 'Historia Antigua',
    subtitle: 'De la Prehistoria a Al-Andalus',
    category: 'heritage',
    mapX: 29,
    mapY: 33,
    sceneImage: '/images/ayuntamiento.png',
    fallbackImage: '/images/ayuntamiento.png',
    nodeIcon: 'ScrollText',
    accent: '#b77946',
    summary: 'Cuevas, yacimientos y culturas que ocuparon el termino de Teba durante milenios.',
    narrative:
      'Bajo cada sendero hay otra Teba. La del silex, la arcilla, las villas, los nombres perdidos y las torres que vinieron despues.',
    guide:
      'Teba no empieza en la Edad Media. Su territorio conserva huellas paleoliticas, neoliticas, iberas, romanas y andalusies.',
    visitInfo: {
      whatToSee: ['Cueva de las Palomas', 'Los Castillejos', 'Museo Historico Municipal'],
      localTip: 'Lee la historia por capas: primero territorio, despues frontera, luego pueblo actual.',
      visitorUse: 'Perfecta para quien quiere entender por que Teba no es solo una postal del castillo.',
    },
    hotspots: [
      {
        id: 'historia-palomas',
        x: 36,
        y: 46,
        label: 'Cueva de las Palomas',
        content:
          'Uno de los lugares que recuerdan la presencia humana antigua en el entorno de Teba.',
        icon: 'Landmark',
      },
      {
        id: 'historia-takurunna',
        x: 68,
        y: 42,
        label: 'Itaba o Atiba',
        content:
          'Durante epoca islamica, Teba estuvo vinculada a la cora de Takurunna y a la frontera del valle del Guadalteba.',
        icon: 'Moon',
      },
    ],
    mission: {
      id: 'mision-historia',
      title: 'Rastrear los origenes',
      description: 'Encuentra dos capas de historia anterior al castillo.',
      rewardItemId: 'pergamino-itaba',
      xp: 15,
    },
  },
  {
    id: 'pueblo',
    slug: 'pueblo-blanco',
    title: 'Pueblo Blanco',
    subtitle: 'Calles, plazas e iglesia',
    category: 'village',
    mapX: 50,
    mapY: 45,
    sceneImage: '/images/ayuntamiento.png',
    fallbackImage: '/images/ayuntamiento.png',
    nodeIcon: 'Home',
    accent: '#f5f0da',
    summary: 'El nucleo urbano conserva la imagen andaluza de casas blancas y vida de plaza.',
    narrative:
      'El mapa deja de ser pergamino y se convierte en calle. La cal, las campanas y las conversaciones hacen de brujula.',
    guide:
      'El casco urbano de Teba combina casas blancas, palacetes, plazas, la Iglesia de la Santa Cruz Real y vistas del castillo.',
    visitInfo: {
      whatToSee: ['Iglesia de la Santa Cruz Real', 'Plazas y calles blancas', 'Vistas hacia el castillo'],
      localTip: 'La mejor ruta urbana es lenta: mira portadas, balcones y cambios de pendiente.',
      visitorUse: 'Sirve para pasear sin prisa y conectar monumentos con vida diaria.',
    },
    hotspots: [
      {
        id: 'pueblo-iglesia',
        x: 44,
        y: 35,
        label: 'Santa Cruz Real',
        content:
          'La iglesia es una de las referencias patrimoniales del nucleo urbano y parte esencial del perfil de Teba.',
        icon: 'Church',
      },
      {
        id: 'pueblo-plaza',
        x: 58,
        y: 61,
        label: 'Vida de plaza',
        content:
          'La plaza y las calles cercanas son el punto de encuentro entre vecinos, visitantes, comercios y celebraciones.',
        icon: 'MapPin',
      },
    ],
    mission: {
      id: 'mision-pueblo',
      title: 'Escuchar el pueblo',
      description: 'Reconoce los dos lugares que dan vida al casco urbano.',
      rewardItemId: 'sello-pueblo',
      xp: 15,
    },
  },
  {
    id: 'naturaleza',
    slug: 'naturaleza-guadalteba',
    title: 'Naturaleza y Guadalteba',
    subtitle: 'Sierras, rio, embalse y olivar',
    category: 'nature',
    mapX: 25,
    mapY: 66,
    sceneImage: '/images/tajodetorrox.png',
    fallbackImage: '/images/tajodetorrox.png',
    nodeIcon: 'Trees',
    accent: '#78a05a',
    summary: 'Paisajes de cereal, olivar, sierras, rios y el embalse del Guadalteba.',
    narrative:
      'Fuera de las murallas, el territorio respira. El agua, el cereal y el olivo dibujan otra aventura: menos espada, mas horizonte.',
    guide:
      'El paisaje de Teba es una mezcla de campos abiertos, olivares, agua y sierra. Es una parte esencial de su atractivo turistico.',
    visitInfo: {
      whatToSee: ['Embalse del Guadalteba', 'Campos de cereal y olivar', 'Sierras y miradores'],
      localTip: 'Busca horas de luz suave: amanecer y atardecer hacen que el paisaje parezca pintado.',
      visitorUse: 'Ideal para planear una visita tranquila, fotografica o de naturaleza.',
    },
    hotspots: [
      {
        id: 'naturaleza-embalse',
        x: 62,
        y: 54,
        label: 'Embalse del Guadalteba',
        content:
          'El agua transforma el paisaje y abre posibilidades de rutas, miradores y descanso cerca del municipio.',
        icon: 'Waves',
      },
      {
        id: 'naturaleza-olivar',
        x: 32,
        y: 46,
        label: 'Olivar y cereal',
        content:
          'El trigo y el olivo forman parte de la economia tradicional y de la imagen visual de Teba.',
        icon: 'Wheat',
      },
    ],
    mission: {
      id: 'mision-naturaleza',
      title: 'Seguir el agua y el olivo',
      description: 'Descubre como el paisaje sostiene la identidad de Teba.',
      rewardItemId: 'hoja-guadalteba',
      xp: 15,
    },
  },
  {
    id: 'gastronomia',
    slug: 'gastronomia-local',
    title: 'Gastronomia',
    subtitle: 'Queso, aceite y cocina local',
    category: 'food',
    mapX: 66,
    mapY: 68,
    sceneImage: '/images/feriadelqueso.png',
    fallbackImage: '/images/feriadelqueso.png',
    nodeIcon: 'Utensils',
    accent: '#f0b85a',
    summary: 'Quesos, embutidos, aceite de oliva, leche de cabra y platos tradicionales.',
    narrative:
      'No todo tesoro brilla. Algunos se cortan en tabla, se riegan con aceite o se guardan en recetas que pasan de cocina en cocina.',
    guide:
      'La cocina local habla de campo, ganaderia y celebraciones: porra, lavapuertas, ajoblanco, pan de higo, membrillo y queso artesano.',
    visitInfo: {
      whatToSee: ['Feria del Queso Artesano', 'Productos de cabra', 'Aceite, embutidos y recetas locales'],
      localTip: 'Pregunta por productos de temporada: el sabor cambia con el calendario del pueblo.',
      visitorUse: 'Convierte la visita en una ruta de compras, degustacion y memoria familiar.',
    },
    hotspots: [
      {
        id: 'gastronomia-queso',
        x: 46,
        y: 45,
        label: 'Queso artesano',
        content:
          'La Feria del Queso Artesano es uno de los escaparates mas reconocibles de Teba.',
        icon: 'CircleDot',
      },
      {
        id: 'gastronomia-recetas',
        x: 62,
        y: 63,
        label: 'Recetas de pueblo',
        content:
          'Platos como la porra, el ajoblanco o el pan de higo conectan mesa, memoria y temporada.',
        icon: 'BookOpen',
      },
    ],
    mission: {
      id: 'mision-gastronomia',
      title: 'Probar la memoria',
      description: 'Guarda dos sabores que expliquen Teba sin decir una fecha.',
      rewardItemId: 'tabla-queso',
      xp: 15,
    },
  },
  {
    id: 'douglas',
    slug: 'douglas-days',
    title: 'Fiestas y Douglas Days',
    subtitle: 'Teba, Melrose y Escocia',
    category: 'festival',
    mapX: 73,
    mapY: 36,
    sceneImage: '/images/douglasday.png',
    fallbackImage: '/images/douglasday.png',
    nodeIcon: 'Flag',
    accent: '#7aa6d9',
    summary: 'Recreaciones medievales, musica, mercado y la memoria de Sir James Douglas.',
    narrative:
      'El eco de las gaitas cruza el Guadalteba. En esta zona el mapa se abre hacia Escocia y la historia se vuelve rito compartido.',
    guide:
      'Douglas Days convierte una historia medieval en un puente cultural actual entre Teba y Escocia.',
    visitInfo: {
      whatToSee: ['Recreaciones medievales', 'Mercado y pasacalles', 'Hermanamiento con Melrose'],
      localTip: 'Douglas Days se disfruta mejor entendiendo antes la batalla de 1330.',
      visitorUse: 'Perfecto para explicar por que Teba tiene una conexion internacional tan singular.',
    },
    hotspots: [
      {
        id: 'douglas-melrose',
        x: 36,
        y: 42,
        label: 'Melrose',
        content:
          'El hermanamiento con Melrose recuerda la conexion entre Teba, Sir James Douglas y Robert the Bruce.',
        icon: 'Handshake',
      },
      {
        id: 'douglas-recreacion',
        x: 66,
        y: 58,
        label: 'Recreacion',
        content:
          'Pasacalles, musica, mercado y recreaciones medievales activan el patrimonio en las calles del pueblo.',
        icon: 'Sparkles',
      },
    ],
    mission: {
      id: 'mision-douglas',
      title: 'Cruzar la frontera escocesa',
      description: 'Descubre por que una villa malaguena mira tambien hacia Escocia.',
      rewardItemId: 'corazon-bruce',
      xp: 20,
    },
  },
  {
    id: 'museos',
    slug: 'museos-patrimonio',
    title: 'Museos y Patrimonio',
    subtitle: 'Piezas, memoria y visita cultural',
    category: 'heritage',
    mapX: 44,
    mapY: 78,
    sceneImage: '/images/iglesia.png',
    fallbackImage: '/images/iglesia.png',
    nodeIcon: 'Landmark',
    accent: '#b8a07a',
    summary: 'Museo Historico Municipal, Museo Parroquial y otros espacios de memoria.',
    narrative:
      'Cuando el mapa necesita silencio, abre sus vitrinas. Cada pieza es una llave pequena para una puerta grande.',
    guide:
      'Los museos y edificios patrimoniales ordenan la memoria local y ayudan a entender el territorio antes y despues de visitarlo.',
    visitInfo: {
      whatToSee: ['Museo Historico Municipal', 'Museo Parroquial', 'Patrimonio religioso y arqueologico'],
      localTip: 'Visita los museos antes de explorar: luego reconoceras detalles que antes pasarian de largo.',
      visitorUse: 'Una parada util para contextualizar la visita y dar profundidad al recorrido.',
    },
    hotspots: [
      {
        id: 'museos-historico',
        x: 42,
        y: 45,
        label: 'Museo Historico',
        content:
          'Un punto clave para entender la amplitud historica del municipio y sus yacimientos.',
        icon: 'Archive',
      },
      {
        id: 'museos-parroquial',
        x: 65,
        y: 52,
        label: 'Museo Parroquial',
        content:
          'El patrimonio religioso completa la lectura historica y artistica de Teba.',
        icon: 'Church',
      },
    ],
    mission: {
      id: 'mision-museos',
      title: 'Abrir el archivo',
      description: 'Encuentra dos espacios donde la memoria de Teba se conserva.',
      rewardItemId: 'llave-archivo',
      xp: 15,
    },
  },
];

const zoneSealItems: CollectionItem[] = zones.map((zone) => ({
  id: zone.mission.rewardItemId,
  title: zone.mission.rewardItemId
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' '),
  description: `Recuerdo desbloqueado al completar "${zone.mission.title}".`,
  icon: zone.nodeIcon,
  zoneId: zone.id,
  kind: 'seal' as const,
}));

const puzzleRelicItems: CollectionItem[] = zones
  .filter((zone) => zone.puzzle)
  .map((zone) => ({
    id: zone.puzzle!.rewardItemId,
    title: 'Fragmento Del Corazon',
    description: zone.puzzle!.solvedText,
    icon: 'Heart',
    zoneId: zone.id,
    kind: 'relic' as const,
  }));

export const collectionItems: CollectionItem[] = [...zoneSealItems, ...puzzleRelicItems];

export const totalXp = zones.reduce((sum, zone) => sum + zone.mission.xp, 0);
