import { CollectionItem, RpgCharacter, RpgZone } from './types';

export const characters: RpgCharacter[] = [
  {
    id: 'arqueologo',
    name: 'El Arqueologo',
    title: 'Guardian de las capas antiguas',
    portrait: '/images/personaje-arqueologo.png',
    sprite: '/images/sprite-arqueologo.png',
    focus: 'Yacimientos, castillo, memoria antigua y frontera medieval.',
    quote: 'Cada piedra de Teba guarda una fecha que quiere volver a hablar.',
    accent: '#d6a15f',
  },
  {
    id: 'senderista',
    name: 'La Senderista',
    title: 'Viajera del Guadalteba',
    portrait: '/images/personaje-senderista.png',
    sprite: '/images/sprite-senderista.png',
    focus: 'Sierras, miradores, rio, embalse, cereal y olivar.',
    quote: 'El mapa se entiende mejor cuando se escucha el viento.',
    accent: '#78a05a',
  },
  {
    id: 'quesero',
    name: 'El Maestro Quesero',
    title: 'Sabio de los sabores locales',
    portrait: '/images/personaje-quesero.png',
    sprite: '/images/sprite-quesero.png',
    focus: 'Queso artesano, aceite, recetas, fiestas y vida del pueblo.',
    quote: 'Un pueblo tambien se cuenta por lo que pone en la mesa.',
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
    sceneImage: '/images/castillo-estrella.png',
    fallbackImage: '/images/iglesia.png',
    nodeIcon: 'Castle',
    accent: '#d6a15f',
    summary: 'Una fortaleza almohade clave en la frontera con Granada y simbolo de Teba.',
    guide:
      'El Castillo de la Estrella domina el paisaje y resume buena parte de la identidad local: frontera, conquista, leyenda y memoria compartida con Escocia.',
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
  },
  {
    id: 'historia',
    slug: 'historia-antigua',
    title: 'Historia Antigua',
    subtitle: 'De la Prehistoria a Al-Andalus',
    category: 'heritage',
    mapX: 29,
    mapY: 33,
    sceneImage: '/images/museo-patrimonio.png',
    fallbackImage: '/images/ayuntamiento.png',
    nodeIcon: 'ScrollText',
    accent: '#b77946',
    summary: 'Cuevas, yacimientos y culturas que ocuparon el termino de Teba durante milenios.',
    guide:
      'Teba no empieza en la Edad Media. Su territorio conserva huellas paleoliticas, neoliticas, iberas, romanas y andalusies.',
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
    sceneImage: '/images/pueblo-blanco.png',
    fallbackImage: '/images/ayuntamiento.png',
    nodeIcon: 'Home',
    accent: '#f5f0da',
    summary: 'El nucleo urbano conserva la imagen andaluza de casas blancas y vida de plaza.',
    guide:
      'El casco urbano de Teba combina casas blancas, palacetes, plazas, la Iglesia de la Santa Cruz Real y vistas del castillo.',
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
    sceneImage: '/images/naturaleza-guadalteba.png',
    fallbackImage: '/images/tajodetorrox.png',
    nodeIcon: 'Trees',
    accent: '#78a05a',
    summary: 'Paisajes de cereal, olivar, sierras, rios y el embalse del Guadalteba.',
    guide:
      'El paisaje de Teba es una mezcla de campos abiertos, olivares, agua y sierra. Es una parte esencial de su atractivo turistico.',
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
    sceneImage: '/images/gastronomia-teba.png',
    fallbackImage: '/images/feriadelqueso.png',
    nodeIcon: 'Utensils',
    accent: '#f0b85a',
    summary: 'Quesos, embutidos, aceite de oliva, leche de cabra y platos tradicionales.',
    guide:
      'La cocina local habla de campo, ganaderia y celebraciones: porra, lavapuertas, ajoblanco, pan de higo, membrillo y queso artesano.',
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
    sceneImage: '/images/douglas-days.png',
    fallbackImage: '/images/douglasday.png',
    nodeIcon: 'Flag',
    accent: '#7aa6d9',
    summary: 'Recreaciones medievales, musica, mercado y la memoria de Sir James Douglas.',
    guide:
      'Douglas Days convierte una historia medieval en un puente cultural actual entre Teba y Escocia.',
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
    sceneImage: '/images/museo-patrimonio.png',
    fallbackImage: '/images/iglesia.png',
    nodeIcon: 'Landmark',
    accent: '#b8a07a',
    summary: 'Museo Historico Municipal, Museo Parroquial y otros espacios de memoria.',
    guide:
      'Los museos y edificios patrimoniales ordenan la memoria local y ayudan a entender el territorio antes y despues de visitarlo.',
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

export const collectionItems: CollectionItem[] = zones.map((zone) => ({
  id: zone.mission.rewardItemId,
  title: zone.mission.rewardItemId
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' '),
  description: `Recuerdo desbloqueado al completar "${zone.mission.title}".`,
  icon: zone.nodeIcon,
  zoneId: zone.id,
}));

export const totalXp = zones.reduce((sum, zone) => sum + zone.mission.xp, 0);
