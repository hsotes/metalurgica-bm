/**
 * CONFIGURACIÓN CENTRALIZADA DEL SITIO
 * =====================================
 * Todos los datos del branding, contacto y configuración
 * se centralizan aquí para facilitar cambios globales.
 *
 * Para cambiar colores por temporada o campañas,
 * solo modificar este archivo.
 */

export const siteConfig = {
  // Información de la empresa
  company: {
    name: 'Metalurgica Boto Mariani SRL',
    shortName: 'MBM',
    slogan: 'Estructura y Arquitectura Metálica',
    description: 'Más de 30 años fabricando soluciones en metal para la industria argentina.',
    foundedYear: 1994,
    experience: '+30 años',
  },

  // Contacto
  contact: {
    phone: '+54 9 11 4089-6202',
    phoneDisplay: '(011) 4089-6202',
    phoneWhatsApp: '5491140896202',
    email: 'info@bmmetalurgica.com.ar',
    address: {
      street: 'Yatay 44',
      locality: 'Malvinas Argentinas',
      postalCode: '1851',
      province: 'Buenos Aires',
      country: 'Argentina',
      full: 'Yatay 44, Malvinas Argentinas, CP 1851, Buenos Aires, Argentina',
    },
    // Coordenadas reales de Malvinas Argentinas
    coordinates: {
      lat: -34.4989,
      lng: -58.6972,
    },
    hours: {
      weekdays: '8:00 - 17:00',
      saturday: '8:00 - 12:00',
      sunday: 'Cerrado',
    },
  },

  // URLs
  urls: {
    site: 'https://bmmetalurgica.com.ar',
    whatsapp: 'https://wa.me/5491140896202',
    linkedin: '#', // TODO: Agregar cuando esté disponible
    instagram: 'https://www.instagram.com/mbm_metalurgica/', // Instagram oficial
  },

  // SEO
  seo: {
    defaultTitle: 'Metalurgica Boto Mariani | Estructura y Arquitectura Metálica',
    titleTemplate: '%s | Metalurgica Boto Mariani',
    defaultDescription: 'Fabricación de estructuras metálicas, gabinetes eléctricos certificados INTI, construcción modular y arquitectura metálica. +30 años de experiencia en Buenos Aires, Argentina.',
  },

  // Clientes destacados
  clients: [
    { name: 'YPF', logo: '/images/clients/ypf.png', featured: true },
    { name: 'Pan American Energy', logo: '/images/clients/pae.png', featured: true },
    { name: 'Prema Cia del Sur', logo: null, featured: false },
    { name: 'Lito Gonella S.A.', logo: null, featured: false },
    { name: 'Industrias F. Secco', logo: null, featured: false },
  ],

  // Certificaciones
  certifications: [
    {
      name: 'INTI',
      description: 'Certificación IP66 - Máxima protección contra polvo y agua',
      badge: 'INTI',
    },
    {
      name: 'ISO 9001',
      description: 'En proceso de certificación con TÜV Rheinland',
      badge: 'ISO',
    },
  ],

  // Capacidades técnicas
  capabilities: [
    'Corte Láser',
    'Corte Plasma',
    'Corte Oxicorte',
    'Plegado CNC',
    'Punzonado CNC',
    'Soldadura TIG/MIG',
    'Impresión 3D',
    'Routeado CNC',
    'Mecanizado CNC',
    'Torno CNC',
  ],

  // Software de diseño
  designSoftware: [
    'AutoCAD',
    'SolidWorks',
    'Inventor',
    'Prostructures',
    'Ram Elements',
  ],
};

/**
 * TEMA DE COLORES
 * ================
 * Colores corporativos extraídos del logo.
 * Para cambiar el tema, modificar estos valores.
 */
export const theme = {
  colors: {
    // Colores principales
    primary: {
      DEFAULT: '#1a4d6d',
      dark: '#0f3347',
      light: '#2a6d8d',
    },
    secondary: {
      DEFAULT: '#5a5a5a',
      dark: '#3a3a3a',
      light: '#7a7a7a',
    },
    accent: {
      DEFAULT: '#9acd32',
      dark: '#7aa828',
      light: '#b8e04a',
    },
  },

  // Fuentes
  fonts: {
    heading: 'Montserrat, system-ui, sans-serif',
    body: 'Montserrat, system-ui, sans-serif',
  },
};

/**
 * UNIDADES DE NEGOCIO
 * ====================
 */
export const businessUnits = [
  {
    id: 'tbox',
    name: 'Linea TBex',
    shortName: 'TBex',
    slug: '/tbex/',
    description: 'Gabinetes eléctricos y shelters certificados INTI para industria petrolera, eléctrica, telecomunicaciones y minería.',
    target: 'B2B',
    industries: ['Petrolera', 'Eléctrica', 'Telecomunicaciones', 'Minería', 'Data Centers'],
    badge: 'INTI',
    priority: 1,
  },
  {
    id: 'modular',
    name: 'Construcción Modular',
    shortName: 'Modular',
    slug: '/modular/',
    description: 'Oficinas y viviendas modulares. Soluciones rápidas y eficientes para empresas y particulares.',
    target: 'B2B/B2C',
    priority: 2,
  },
  {
    id: 'estructuras',
    name: 'Estructuras Industriales',
    shortName: 'Estructuras',
    slug: '/estructuras/',
    description: 'Galpones, naves industriales y estructuras metálicas especiales.',
    target: 'B2B',
    priority: 3,
  },
  {
    id: 'arquitectura',
    name: 'Arquitectura Metálica',
    shortName: 'Arquitectura',
    slug: '/arquitectura-metalica/',
    description: 'Escaleras, barandas, fachadas y trabajos en acero inoxidable.',
    target: 'B2B/B2C',
    priority: 4,
  },
  {
    id: 'griglia',
    name: 'Linea Griglia',
    shortName: 'Griglia',
    slug: '/griglia/',
    description: 'Parrillas a medida, puertas guillotina y cierres de parrilla.',
    target: 'B2C',
    priority: 5,
  },
];

/**
 * LÍNEA TBEX - Productos
 */
export const tbexProducts = {
  lines: [
    {
      name: 'TexPetrol',
      description: 'Tableros para bombeo mecánico en pozos petroleros',
      norm: 'IRAM-IEC 60079',
    },
    {
      name: 'Línea TEX',
      description: 'Gabinetes de seguridad aumentada para atmósferas explosivas',
      norm: 'IRAM-IEC 79-7',
    },
    {
      name: 'Línea APE',
      description: 'Accesorios para instalaciones en zonas Ex',
      norm: 'IRAM-IEC 79-1',
    },
    {
      name: 'Línea Estanco',
      description: 'Gabinetes con protección IP65/IP66',
      norm: 'IRAM-IEC 60670',
    },
  ],
  certifications: {
    inti: {
      name: 'Certificación INTI',
      rating: 'IP 66',
      description: 'Máxima protección contra polvo y agua verificada por ensayos independientes',
      tests: [
        'Ensayo hidráulico: 1kg/cm² de presión a 180°',
        'Cámara de saturación de polvo (4 horas)',
        'Prueba de ingreso de agua',
      ],
    },
  },
  caseStudies: [
    {
      client: 'Pan American Energy',
      project: 'Proveedor desde 2010 - Shelters y Gabinetes',
      description: 'Más de 15 años como proveedor certificado de shelters y gabinetes eléctricos para operaciones de campo y bases petroleras.',
      image: '/images/tbox/shelter-01.jpg',
    },
    {
      client: 'YPF',
      project: 'Contrato Marco - Satélites de Inyección',
      description: 'Desarrollo y fabricación de satélites de inyección para operaciones de campo.',
      image: '/images/tbox/gabinete-01.jpg',
    },
    {
      client: 'Movistar / Motorola',
      project: 'Shelters para Telecomunicaciones',
      description: 'Shelters para protección de equipos de comunicación en sitios remotos.',
      image: '/images/tbox/shelter-02.jpg',
    },
  ],
  // Clientes de la línea TBex
  clients: [
    { name: 'Pan American Energy', since: 2010, primary: true },
    { name: 'YPF', since: null, primary: false },
    { name: 'Policía de la Provincia', since: null, primary: false },
    { name: 'Corredores Viales', since: null, primary: false },
    { name: 'Movistar', since: null, primary: false },
    { name: 'Motorola', since: null, primary: false },
  ],
};

/**
 * LÍNEA GRIGLIA - Productos
 * Datos extraídos del catálogo MAGMA-KIT_OBRA-FT.pdf
 */
export const grigliaProducts = {
  models: [
    {
      size: 800,
      description: 'Ideal para balcones',
      parrilla: {
        frente: 800,
        profundidad: 600,
        altoTotal: 1120,
        altoParrilla: 820,
        altoFrontal: 845,
        chimenea: 260,
        anchoTotal: 900,
        profTotal: 663,
        campana: 400,
        solapa: 50,
      },
      guillotina: {
        anchoMarco: 980,
        altoTotal: 2430,
        anchoVidrio: 800,
        altoVidrioSup: 760,
        altoVidrioInf: 760,
        anchoInterno: 830,
        tirador: 300,
      },
      kitObra: {
        A: 990,
        B: 2450,
        C: 760,
        D: 850,
        E: 280,
      },
    },
    {
      size: 1000,
      description: 'Espacios reducidos',
      parrilla: {
        frente: 1000,
        profundidad: 600,
        altoTotal: 1220,
        altoParrilla: 850,
        altoFrontal: 875,
        chimenea: 260,
        anchoTotal: 1100,
        profTotal: 663,
        campana: 450,
        solapa: 50,
      },
      guillotina: {
        anchoMarco: 1180,
        altoTotal: 2430,
        anchoVidrio: 1000,
        altoVidrioSup: 760,
        altoVidrioInf: 760,
        anchoInterno: 1030,
        tirador: 500,
      },
      kitObra: {
        A: 1190,
        B: 2450,
        C: 760,
        D: 850,
        E: 280,
      },
    },
    {
      size: 1200,
      description: 'Uso familiar',
      popular: true,
      parrilla: {
        frente: 1200,
        profundidad: 600,
        altoTotal: 1220,
        altoParrilla: 850,
        altoFrontal: 875,
        chimenea: 330,
        anchoTotal: 1300,
        profTotal: 669,
        campana: 500,
        solapa: 50,
      },
      guillotina: {
        anchoMarco: 1380,
        altoTotal: 2430,
        anchoVidrio: 1200,
        altoVidrioSup: 760,
        altoVidrioInf: 760,
        anchoInterno: 1230,
        tirador: 500,
      },
      kitObra: {
        A: 1390,
        B: 2450,
        C: 760,
        D: 850,
        E: 350,
      },
    },
    {
      size: 1400,
      description: 'Reuniones grandes',
      parrilla: {
        frente: 1400,
        profundidad: 600,
        altoTotal: 1220,
        altoParrilla: 850,
        altoFrontal: 875,
        chimenea: 360,
        anchoTotal: 1500,
        profTotal: 669,
        campana: 600,
        solapa: 50,
      },
      guillotina: {
        anchoMarco: 1580,
        altoTotal: 2430,
        anchoVidrio: 1400,
        altoVidrioSup: 760,
        altoVidrioInf: 760,
        anchoInterno: 1430,
        tirador: 500,
      },
      kitObra: {
        A: 1590,
        B: 2450,
        C: 760,
        D: 850,
        E: 380,
      },
    },
    {
      size: 1600,
      description: 'Quincho completo',
      parrilla: {
        frente: 1600,
        profundidad: 600,
        altoTotal: 1320,
        altoParrilla: 850,
        altoFrontal: 875,
        chimenea: 360,
        anchoTotal: 1700,
        profTotal: 669,
        campana: 600,
        solapa: 50,
      },
      guillotina: {
        anchoMarco: 1780,
        altoTotal: 2430,
        anchoVidrio: 1600,
        altoVidrioSup: 760,
        altoVidrioInf: 760,
        anchoInterno: 1630,
        tirador: 500,
      },
      kitObra: {
        A: 1790,
        B: 2450,
        C: 760,
        D: 850,
        E: 380,
      },
    },
  ],
  accessories: [
    'Puerta guillotina con contrapeso',
    'Cajonería de acero',
    'Chimenea con sombrerete',
    'Frentes en chapa plegada',
    'Mesada lateral',
  ],
};
