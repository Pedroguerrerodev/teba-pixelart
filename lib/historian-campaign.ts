import { RpgProgress } from './types';

export interface HistorianArchiveEntry {
  id: string;
  title: string;
  category: 'Lugar' | 'Pieza' | 'Concepto' | 'Personaje' | 'Epoca';
  summary: string;
}

export interface HistorianStage {
  id: string;
  title: string;
  period: string;
  mapX: number;
  mapY: number;
  summary: string;
  whyItMatters: string;
  places: string[];
  missionTitle: string;
  missionDescription: string;
  archiveEntryIds: string[];
  xp: number;
}

function unique(values: string[], next: string): string[] {
  return values.includes(next) ? values : [...values, next];
}

function uniqueMany(values: string[], nextValues: string[]): string[] {
  return nextValues.reduce((current, next) => unique(current, next), values);
}

export const historianArchiveEntries: HistorianArchiveEntry[] = [
  {
    id: 'cueva-palomas',
    title: 'Cueva de las Palomas',
    category: 'Lugar',
    summary: 'Yacimiento con pinturas esquematicas y evidencias de ocupacion prehistorica.',
  },
  {
    id: 'sima-silex',
    title: 'Sima del Silex',
    category: 'Lugar',
    summary: 'Lugar con restos de talla laminar que prueban presencia humana en el Paleolitico Superior.',
  },
  {
    id: 'llano-espa',
    title: 'Llano Espa',
    category: 'Lugar',
    summary: 'Zona asociada a comunidades neoliticas con agricultura y pastoreo incipientes.',
  },
  {
    id: 'lentejuela',
    title: 'La Lentejuela',
    category: 'Lugar',
    summary: 'Necropolis megalitica con manifestaciones singulares dentro de Andalucia.',
  },
  {
    id: 'cerro-horca',
    title: 'Cerro de la Horca',
    category: 'Lugar',
    summary: 'Asentamiento elevado de la Edad del Bronce vinculado al control visual del territorio.',
  },
  {
    id: 'castillejos',
    title: 'Los Castillejos',
    category: 'Lugar',
    summary: 'Asentamiento clave para entender la protohistoria y el mundo ibero en Teba.',
  },
  {
    id: 'carnero-castillejos',
    title: 'Carnero de Los Castillejos',
    category: 'Pieza',
    summary: 'Escultura en arenisca conservada en el Museo Historico Municipal de Teba.',
  },
  {
    id: 'cortijo-tajo',
    title: 'Cortijo del Tajo',
    category: 'Lugar',
    summary: 'Principal referencia de la ciudad romana del territorio tebeno.',
  },
  {
    id: 'tiberio-joven',
    title: 'Cabeza de Tiberio Joven',
    category: 'Pieza',
    summary: 'Pieza romana destacada procedente del entorno del Cortijo del Tajo.',
  },
  {
    id: 'itaba',
    title: 'Itaba',
    category: 'Concepto',
    summary: 'Nombre de Teba durante la etapa islamica.',
  },
  {
    id: 'takurunna',
    title: 'Cora de Takurunna',
    category: 'Concepto',
    summary: 'Demarcacion andalusi a la que pertenecieron los territorios tebenos.',
  },
  {
    id: 'castillo-estrella',
    title: 'Castillo de la Estrella',
    category: 'Lugar',
    summary: 'Hisn Atiba, fortaleza esencial en la frontera entre Castilla y Granada.',
  },
  {
    id: 'sir-james-douglas',
    title: 'Sir James Douglas',
    category: 'Personaje',
    summary: 'Noble escoces muerto en la batalla de Teba de 1330.',
  },
  {
    id: 'robert-bruce',
    title: 'Corazon de Robert the Bruce',
    category: 'Concepto',
    summary: 'Leyenda que une Teba con Escocia, Melrose y la memoria de Douglas.',
  },
  {
    id: 'condado-teba',
    title: 'Condado de Teba',
    category: 'Epoca',
    summary: 'Senorio creado oficialmente en 1522 durante el reinado de Carlos I.',
  },
  {
    id: 'santa-cruz-real',
    title: 'Santa Cruz Real',
    category: 'Lugar',
    summary: 'Iglesia parroquial construida entre 1699 y 1715, monumento clave de Teba.',
  },
  {
    id: 'octubre-1934',
    title: 'Octubre de 1934',
    category: 'Epoca',
    summary: 'Episodio singular del movimiento obrero tebeno durante la Segunda Republica.',
  },
];

export const historianStages: HistorianStage[] = [
  {
    id: 'prehistoria',
    title: 'Prehistoria',
    period: 'Paleolitico y Neolitico',
    mapX: 20,
    mapY: 66,
    summary:
      'Bandas de cazadores-recolectores y primeras comunidades agricolas dejaron huellas en cuevas, sierras y valles del Guadalteba.',
    whyItMatters:
      'Teba no empieza con el castillo: su territorio conserva una memoria humana mucho mas antigua.',
    places: ['Cueva de las Palomas', 'Sima del Silex', 'Llano Espa'],
    missionTitle: 'Rastrear los primeros pasos',
    missionDescription: 'Registra las tres pistas que explican la presencia humana mas antigua.',
    archiveEntryIds: ['cueva-palomas', 'sima-silex', 'llano-espa'],
    xp: 20,
  },
  {
    id: 'metales',
    title: 'Edad de los Metales',
    period: 'III-II milenio a. C.',
    mapX: 32,
    mapY: 52,
    summary:
      'La metalurgia, el megalitismo y los asentamientos elevados muestran una sociedad mas compleja y territorial.',
    whyItMatters:
      'El control visual del paisaje empieza a importar: los cerros se convierten en defensa, simbolo y estrategia.',
    places: ['La Lentejuela', 'Cerro de la Horca', 'La Cuevecilla'],
    missionTitle: 'Leer las alturas',
    missionDescription: 'Conecta megalitos, bronce y control del territorio.',
    archiveEntryIds: ['lentejuela', 'cerro-horca'],
    xp: 20,
  },
  {
    id: 'protohistoria',
    title: 'Los Castillejos',
    period: 'Fenicios e iberos',
    mapX: 42,
    mapY: 38,
    summary:
      'El contacto fenicio transformo la cultura material, el hierro, el comercio y la organizacion social.',
    whyItMatters:
      'Los Castillejos ayuda a entender como nacen las elites ibericas y el control politico del territorio.',
    places: ['Los Castillejos', 'Huertas de Penarrubia', 'Cerro del Almendro'],
    missionTitle: 'Encontrar el carnero',
    missionDescription: 'Desbloquea la pieza que resume la importancia arqueologica ibera.',
    archiveEntryIds: ['castillejos', 'carnero-castillejos'],
    xp: 25,
  },
  {
    id: 'roma',
    title: 'Roma',
    period: 'Siglos I-V',
    mapX: 60,
    mapY: 64,
    summary:
      'La ciudad del Cortijo del Tajo y sus villae muestran una explotacion agricola intensa del valle.',
    whyItMatters:
      'La Teba romana obliga a distinguir historia real de errores heredados, como la falsa identificacion con Ategua.',
    places: ['Cortijo del Tajo', 'Casilla Vallejo', 'Tesorillo'],
    missionTitle: 'Separar mito y evidencia',
    missionDescription: 'Identifica la Teba romana sin confundirla con la Ategua cordobesa.',
    archiveEntryIds: ['cortijo-tajo', 'tiberio-joven'],
    xp: 25,
  },
  {
    id: 'itaba-islamica',
    title: 'Itaba islamica',
    period: 'Al-Andalus',
    mapX: 56,
    mapY: 28,
    summary:
      'Itaba formo parte de la cora de Takurunna y gano importancia defensiva con el Hisn Atiba.',
    whyItMatters:
      'La etapa islamica explica el valor fronterizo del Castillo de la Estrella antes de la conquista castellana.',
    places: ['Nina Alta', 'Castillo de la Estrella', 'La Torrecilla'],
    missionTitle: 'Nombrar Itaba',
    missionDescription: 'Reconstruye el mapa andalusi de Teba y sus defensas.',
    archiveEntryIds: ['itaba', 'takurunna', 'castillo-estrella'],
    xp: 30,
  },
  {
    id: 'douglas-conquista',
    title: 'Douglas y la conquista',
    period: '1330',
    mapX: 71,
    mapY: 34,
    summary:
      'La batalla de Teba une la toma castellana del castillo con la muerte del escoces Sir James Douglas.',
    whyItMatters:
      'Este episodio convierte a Teba en un puente historico entre Andalucia y Escocia.',
    places: ['Castillo de la Estrella', 'Plaza de Espana', 'Melrose'],
    missionTitle: 'Seguir el corazon',
    missionDescription: 'Descubre por que Douglas llego a Teba con el corazon de Robert the Bruce.',
    archiveEntryIds: ['sir-james-douglas', 'robert-bruce'],
    xp: 30,
  },
  {
    id: 'edad-moderna',
    title: 'Edad Moderna',
    period: 'Siglos XVI-XVIII',
    mapX: 48,
    mapY: 48,
    summary:
      'El Condado de Teba, la iglesia de Santa Cruz Real y el archivo municipal ordenan una etapa muy documentada.',
    whyItMatters:
      'La Teba moderna explica la forma del pueblo, sus instituciones y buena parte de su patrimonio urbano.',
    places: ['Santa Cruz Real', 'Convento de San Francisco', 'Archivo Municipal'],
    missionTitle: 'Abrir el archivo',
    missionDescription: 'Relaciona condado, iglesia y vida agricola de la Edad Moderna.',
    archiveEntryIds: ['condado-teba', 'santa-cruz-real'],
    xp: 20,
  },
  {
    id: 'contemporanea',
    title: 'Edad Contemporanea',
    period: 'Siglos XIX-XX',
    mapX: 66,
    mapY: 76,
    summary:
      'Movimiento obrero, Octubre de 1934, Guerra Civil, posguerra, emigracion y democracia marcan la Teba reciente.',
    whyItMatters:
      'La historia contemporanea conecta patrimonio con memoria social y vida cotidiana.',
    places: ['Casco urbano', 'Cuartel de la Guardia Civil', 'Archivo Municipal'],
    missionTitle: 'Escuchar la memoria reciente',
    missionDescription: 'Completa la ultima etapa historica y abre el archivo contemporaneo.',
    archiveEntryIds: ['octubre-1934'],
    xp: 25,
  },
  {
    id: 'archivo-vivo',
    title: 'Archivo vivo',
    period: 'Enciclopedia de Teba',
    mapX: 50,
    mapY: 88,
    summary:
      'La ruta termina convirtiendo lo aprendido en una enciclopedia consultable para visitantes y vecinos.',
    whyItMatters:
      'La app funciona como guia turistica, modo historia y archivo cultural en un mismo lugar.',
    places: ['Diario', 'Misiones', 'Mapa turistico'],
    missionTitle: 'Convertir viaje en archivo',
    missionDescription: 'Revisa tus entradas desbloqueadas y deja lista la guia historica.',
    archiveEntryIds: [],
    xp: 15,
  },
];

export function getHistorianStage(stageId: string): HistorianStage | undefined {
  return historianStages.find((stage) => stage.id === stageId);
}

export function visitHistorianStage(progress: RpgProgress, stageId: string): RpgProgress {
  return {
    ...progress,
    historianCampaign: {
      ...progress.historianCampaign,
      visitedStageIds: unique(progress.historianCampaign.visitedStageIds, stageId),
    },
    updatedAt: Date.now(),
  };
}

export function completeHistorianStage(progress: RpgProgress, stageId: string): RpgProgress {
  const stage = getHistorianStage(stageId);
  const visitedProgress = visitHistorianStage(progress, stageId);

  return {
    ...visitedProgress,
    historianCampaign: {
      ...visitedProgress.historianCampaign,
      completedStageIds: unique(visitedProgress.historianCampaign.completedStageIds, stageId),
      archiveEntryIds: stage
        ? uniqueMany(visitedProgress.historianCampaign.archiveEntryIds, stage.archiveEntryIds)
        : visitedProgress.historianCampaign.archiveEntryIds,
    },
    updatedAt: Date.now(),
  };
}

export function getHistorianCampaignPercent(progress: RpgProgress): number {
  return Math.round(
    (progress.historianCampaign.completedStageIds.length / historianStages.length) * 100
  );
}
