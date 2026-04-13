import {
  AboutDictionary,
  ContactDictionary,
  HomeDictionary,
  ProcessDictionary,
  ServicesDictionary,
} from './types';

export const ES_HOME: HomeDictionary = {
  metaTitle: 'Mirabolante | Trading & Global Food Sourcing',
  hero: {
    headingBig: 'Trading',
    headingSideLines: ['& Supply', 'Solutions'],
    cta: {
      text: 'Hablemos',
    },
  },
  solutions: {
    label: 'Servicios',
    heading: 'Red internacional con eficiencia y transparencia en cada operación.',
    description:
      'Gestionamos todo el proceso: desde la búsqueda del producto hasta la entrega en el puerto de su conveniencia.',
    cta: {
      text: 'Nuestro proceso',
    },
    items: [
      {
        title: 'Sourcing Global',
        description:
          'Acceso a proveedores en Brasil, Uruguay, Paraguay, Colombia y Argentina.',
        alt: 'Sourcing Global',
      },
      {
        title: 'Gestión Logística',
        description:
          'Coordinamos transporte, documentación y tiempos de tránsito reales.',
        alt: 'Gestión Logística',
      },
      {
        title: 'Flexibilidad Comercial',
        description: 'Estructuras de negociación adaptadas a su operación.',
        alt: 'Flexibilidad Comercial',
      },
      {
        title: 'Trazabilidad Completa',
        description: 'Seguimiento en tiempo real desde origen hasta destino.',
        alt: 'Trazabilidad Completa',
      },
    ],
  },
  highlight: {
    stat: '100%',
    cardTitle: 'Adaptado a la medida de su negocio',
    cardText:
      'Cada operación tiene necesidades distintas. No ofrecemos soluciones genéricas: analizamos su requerimiento y buscamos la opción que mejor se adapte a su negocio.',
    heading: 'Abastecimiento estratégico para la industria alimentaria.',
    cta: {
      text: 'Productos',
    },
    marqueeAlts: ['Arroz', 'Frijoles', 'Maíz', 'Azúcar', 'Harina de trigo', 'Especias', 'Sal'],
  },
  about: {
    label: 'Sobre Nosotros',
    heading: 'El socio que su cadena de suministro necesita.',
    text:
      'Somos una trading house internacional con base en Panamá y operación en Costa Rica. Conectamos a su empresa con proveedores de primer nivel en Sudamérica, gestionamos toda la logística y le entregamos el producto en el puerto que usted elija. Sin intermediarios innecesarios, sin sorpresas en el camino.',
    cta: {
      text: 'Conózcanos',
    },
    imageAlt: 'Mirabolante Trading operaciones',
  },
  cards: {
    items: [
      {
        label: 'Sourcing',
        heading: 'Acceso a proveedores de primer nivel',
        text:
          'Trabajamos con productores y exportadores en Brasil, Uruguay, Paraguay, Colombia y Argentina. Muchos de ellos no venden a clientes individuales. A través de Mirabolante, su empresa accede a esa red sin tener que construirla desde cero.',
        imageAlt: 'Sourcing global',
      },
      {
        label: 'Logística',
        heading: 'Del origen a su puerto elegido',
        text:
          'Nos encargamos de todo el proceso: compra, documentación, transporte marítimo y coordinación hasta el puerto que usted elija. Usted recibe el producto listo para nacionalizar, sin gestionar intermediarios.',
        imageAlt: 'Logística internacional',
      },
      {
        label: 'Transparencia',
        heading: 'Tiempos y especificaciones reales',
        text:
          'Le damos información clara desde el inicio. Tiempos de tránsito reales, fichas técnicas verificadas y seguimiento de su carga en tiempo real. Sin promesas infladas, sin sorpresas.',
        imageAlt: 'Transparencia operativa',
      },
      {
        label: 'Flexibilidad',
        heading: 'Estructuras que se adaptan a su operación',
        text:
          'No trabajamos con condiciones rígidas. Analizamos su caso, abrimos nuestra estructura de costos y buscamos un punto donde ambos salgamos beneficiados. El objetivo es una relación comercial de largo plazo, no una venta única.',
        imageAlt: 'Flexibilidad comercial',
      },
    ],
  },
  faq: {
    title: 'Preguntas Frecuentes',
    cta: {
      text: 'Contáctenos',
    },
    items: [
      {
        question: '¿Cuál es el volumen mínimo de compra?',
        answer:
          'El volumen mínimo de operación es de un contenedor completo, lo que representa entre 20 y 28 toneladas dependiendo del producto. Este modelo de trabajo está diseñado para atender a empresas con requerimientos de abastecimiento industrial continuo: procesadores de alimentos, distribuidores mayoristas e industrias del sector alimentario.',
      },
      {
        question: '¿Cómo funciona el proceso de compra?',
        answer:
          'El proceso inicia con el análisis del requerimiento del cliente, que incluye especificaciones técnicas, volúmenes estimados y condiciones de entrega. Con base en esa información, Mirabolante identifica las opciones más adecuadas dentro de su red de proveedores en Sudamérica y presenta una cotización con precio CIF en el puerto designado por el cliente. Antes del embarque, se envían fichas técnicas y muestras físicas para aprobación. Una vez confirmada la orden, Mirabolante gestiona la compra, el transporte marítimo y la documentación correspondiente. El cliente recibe el producto en puerto, listo para el proceso de nacionalización.',
      },
      {
        question: '¿Cuánto tiempo tarda en llegar un pedido?',
        answer:
          'Los tiempos de entrega dependen del origen del producto y de las condiciones logísticas vigentes. Una vez aprobada la cotización y la muestra, el proceso de preparación en origen toma entre una y dos semanas. El tránsito marítimo desde Sudamérica hacia Centroamérica oscila entre 25 y 60 días según la ruta. Mirabolante proporciona estimaciones de tiempo basadas en condiciones reales de operación, considerando escalas portuarias y disponibilidad de navieras.',
      },
      {
        question:
          '¿Qué garantía tengo de que el producto cumple con las especificaciones?',
        answer:
          'Todo embarque está respaldado por fichas técnicas verificadas y muestras físicas aprobadas por el cliente antes de la compra. Los proveedores con los que trabaja Mirabolante operan con sistemas de trazabilidad que permiten identificar el origen, la cosecha y el lote de cada producto. Esta documentación queda disponible para el cliente como parte del proceso de compra y sirve como respaldo ante cualquier reclamo de calidad.',
      },
      {
        question: '¿Mirabolante cuenta con certificaciones?',
        answer:
          'Mirabolante opera como comercializadora internacional, por lo que las certificaciones de calidad, inocuidad y buenas prácticas corresponden a las plantas de producción de cada proveedor. La empresa trabaja exclusivamente con proveedores que cuentan con las certificaciones requeridas por la industria alimentaria. Cuando un cliente requiere certificaciones específicas, Mirabolante selecciona proveedores que cumplan con esos requisitos.',
      },
      {
        question: '¿Qué sucede si no tengo experiencia en comercio internacional?',
        answer:
          'Mirabolante ofrece acompañamiento a clientes que inician operaciones de importación. Esto incluye orientación sobre el proceso de compra internacional, la documentación que recibirán en cada etapa y los pasos necesarios para la nacionalización del producto en su país. En caso de requerirlo, Mirabolante puede facilitar el contacto con agencias aduanales de confianza en el país de destino.',
      },
    ],
  },
};

export const EN_HOME: HomeDictionary = {
  metaTitle: 'Mirabolante | Trading & Global Food Sourcing',
  hero: {
    headingBig: 'Trading',
    headingSideLines: ['& Supply', 'Solutions'],
    cta: {
      text: "Let's talk",
    },
  },
  solutions: {
    label: 'Services',
    heading: 'An international network with efficiency and transparency in every operation.',
    description:
      'We manage the full process: from product sourcing to delivery at the port that best fits your operation.',
    cta: {
      text: 'Our process',
    },
    items: [
      {
        title: 'Global Sourcing',
        description:
          'Access to suppliers in Brazil, Uruguay, Paraguay, Colombia, and Argentina.',
        alt: 'Global Sourcing',
      },
      {
        title: 'Logistics Management',
        description:
          'We coordinate transport, documentation, and real transit times.',
        alt: 'Logistics Management',
      },
      {
        title: 'Commercial Flexibility',
        description: 'Negotiation structures tailored to your operation.',
        alt: 'Commercial Flexibility',
      },
      {
        title: 'Full Traceability',
        description: 'Real-time visibility from origin to destination.',
        alt: 'Full Traceability',
      },
    ],
  },
  highlight: {
    stat: '100%',
    cardTitle: 'Tailored to your business',
    cardText:
      'Every operation has different requirements. We do not offer generic solutions: we analyze your needs and find the option that best fits your business.',
    heading: 'Strategic sourcing for the food industry.',
    cta: {
      text: 'Products',
    },
    marqueeAlts: ['Rice', 'Beans', 'Corn', 'Sugar', 'Wheat flour', 'Spices', 'Salt'],
  },
  about: {
    label: 'About Us',
    heading: 'The partner your supply chain needs.',
    text:
      'We are an international trading house based in Panama with operations in Costa Rica. We connect your company with top-tier suppliers across South America, manage the full logistics chain, and deliver the product to the port you choose. No unnecessary intermediaries, no surprises along the way.',
    cta: {
      text: 'Meet us',
    },
    imageAlt: 'Mirabolante Trading operations',
  },
  cards: {
    items: [
      {
        label: 'Sourcing',
        heading: 'Access to top-tier suppliers',
        text:
          'We work with producers and exporters in Brazil, Uruguay, Paraguay, Colombia, and Argentina. Many of them do not sell to individual buyers. Through Mirabolante, your company gains access to that network without having to build it from scratch.',
        imageAlt: 'Global sourcing',
      },
      {
        label: 'Logistics',
        heading: 'From origin to your chosen port',
        text:
          'We handle the full process: purchasing, documentation, ocean freight, and coordination all the way to the port you choose. You receive the product ready for customs clearance, without managing intermediaries.',
        imageAlt: 'International logistics',
      },
      {
        label: 'Transparency',
        heading: 'Real timelines and specifications',
        text:
          'We provide clear information from the start. Real transit times, verified technical sheets, and real-time cargo visibility. No inflated promises, no surprises.',
        imageAlt: 'Operational transparency',
      },
      {
        label: 'Flexibility',
        heading: 'Structures that adapt to your operation',
        text:
          'We do not work with rigid conditions. We review your case, open our cost structure, and find a point where both sides benefit. The goal is a long-term commercial relationship, not a one-off sale.',
        imageAlt: 'Commercial flexibility',
      },
    ],
  },
  faq: {
    title: 'Frequently Asked Questions',
    cta: {
      text: 'Contact us',
    },
    items: [
      {
        question: 'What is the minimum order volume?',
        answer:
          'The minimum operating volume is one full container, which typically represents between 20 and 28 tons depending on the product. This working model is designed for companies with ongoing industrial sourcing needs: food processors, wholesale distributors, and businesses in the food sector.',
      },
      {
        question: 'How does the purchasing process work?',
        answer:
          'The process starts with an analysis of the client requirement, including technical specifications, estimated volumes, and delivery conditions. Based on that information, Mirabolante identifies the most suitable options within its supplier network in South America and provides a CIF quotation for the client’s designated port. Before shipment, technical sheets and physical samples are submitted for approval. Once the order is confirmed, Mirabolante manages the purchase, ocean transport, and the required documentation. The client receives the product at port, ready for customs clearance.',
      },
      {
        question: 'How long does an order take to arrive?',
        answer:
          'Delivery times depend on product origin and prevailing logistics conditions. Once the quotation and sample are approved, origin preparation typically takes between one and two weeks. Ocean transit from South America to Central America ranges from 25 to 60 days depending on the route. Mirabolante provides delivery estimates based on real operating conditions, including port calls and carrier availability.',
      },
      {
        question: 'How do I know the product meets the required specifications?',
        answer:
          'Every shipment is backed by verified technical sheets and physical samples approved by the client before purchase. The suppliers Mirabolante works with operate traceability systems that identify each product’s origin, harvest, and lot. This documentation is made available to the client as part of the purchasing process and serves as support in the event of any quality claim.',
      },
      {
        question: 'Does Mirabolante hold certifications?',
        answer:
          'Mirabolante operates as an international trading company, so quality, food safety, and good practice certifications belong to each supplier’s production facilities. The company works only with suppliers that hold the certifications required by the food industry. When a client needs specific certifications, Mirabolante selects suppliers that meet those requirements.',
      },
      {
        question: 'What if I do not have experience in international trade?',
        answer:
          'Mirabolante supports clients that are starting import operations. This includes guidance on the international purchasing process, the documentation they will receive at each stage, and the steps required to clear the product in their country. When needed, Mirabolante can also connect clients with trusted customs agencies at destination.',
      },
    ],
  },
};

export const ES_SERVICES: ServicesDictionary = {
  metaTitle: 'Servicios | Mirabolante',
  hero: {
    text:
      'Mirabolante conecta su operación con proveedores de materias primas a nivel global, gestiona la logística y entrega el producto en el puerto que usted elija.',
    badges: [
      'Precio CIF',
      'Trazabilidad completa',
      'Muestras antes de embarque',
      'Seguimiento en tiempo real',
    ],
    isoAlt: 'Mirabolante',
  },
  overview: {
    label: 'Servicios',
    heading: 'Mirabolante gestiona el abastecimiento de su operación de principio a fin.',
    bigtext:
      'Desde la búsqueda del proveedor hasta la entrega en puerto, nos encargamos de cada etapa del proceso: cotización, negociación, documentación, transporte y seguimiento.',
    cta: {
      text: 'Contáctenos',
    },
    cards: [
      {
        number: '1',
        title: 'Originación',
        description:
          'Identificamos proveedores que cumplan con sus especificaciones, cotizamos y coordinamos el envío de muestras para su aprobación.',
      },
      {
        number: '2',
        title: 'Logística internacional',
        description:
          'Compramos el producto, gestionamos documentación y transporte marítimo, y entregamos en el puerto que usted designe.',
      },
      {
        number: '3',
        title: 'Seguimiento continuo',
        description:
          'Monitoreamos su carga en tiempo real y le informamos sobre condiciones de mercado para futuras operaciones.',
      },
    ],
  },
  coverage: {
    label: 'Cobertura',
    heading: 'Conectamos proveedores de Sudamérica con operaciones en toda Latinoamérica.',
    text:
      'Nuestra red de proveedores está concentrada en las principales regiones productoras del continente. Desde ahí, gestionamos embarques hacia los puertos que nuestros clientes designen.',
    items: [
      {
        title: 'Origen',
        description: 'Brasil, Uruguay, Paraguay, Colombia y Argentina.',
        alt: 'Origen',
      },
      {
        title: 'Destino',
        description: 'Centroamérica, México, El Caribe y Sudamérica.',
        alt: 'Destino',
      },
    ],
    card: {
      number: '5',
      title: 'Países de origen activos',
      description:
        'Proveedores establecidos con los que mantenemos relaciones comerciales de largo plazo y condiciones preferenciales de compra.',
    },
  },
  products: {
    label: 'Productos',
    heading: 'Estas son las líneas de producto que manejamos de forma recurrente.',
    subtext:
      'Si su operación requiere un insumo diferente, lo buscamos dentro de nuestra red de proveedores.',
    lines: [
      {
        stickyLabel: 'Línea de productos',
        title: 'Consumo humano',
        text: 'Materias primas e ingredientes para la industria alimentaria.',
        cards: [
          {
            number: '1',
            title: 'Arroz',
            description:
              'Grano pulido y paddy en distintas variedades según especificación del cliente. Orígenes principales: Uruguay, Paraguay y Brasil.',
            imageAlt: 'Arroz',
          },
          {
            number: '2',
            title: 'Frijoles',
            description:
              'Frijol negro, rojo y otros granos secos para procesadores industriales y distribuidores mayoristas.',
            imageAlt: 'Frijoles',
          },
          {
            number: '3',
            title: 'Maíz',
            description:
              'Maíz en grano y productos derivados para la industria alimentaria y de consumo masivo.',
            imageAlt: 'Maíz',
          },
          {
            number: '4',
            title: 'Azúcar',
            description:
              'Azúcar cruda y refinada en distintos grados de polarización (Icumsa). Origen principal: Brasil y Colombia.',
            imageAlt: 'Azúcar',
          },
          {
            number: '5',
            title: 'Sal',
            description:
              'Sal industrial y de mesa para procesadores de alimentos y distribuidores.',
            imageAlt: 'Sal',
          },
          {
            number: '6',
            title: 'Especias',
            description:
              'Especias a granel para la industria alimentaria según ficha técnica del cliente.',
            imageAlt: 'Especias',
          },
          {
            number: '7',
            title: 'Harina de trigo',
            description:
              'Harina para panificación y uso industrial en distintas especificaciones de fuerza y granulometría.',
            imageAlt: 'Harina de trigo',
          },
        ],
      },
      {
        stickyLabel: 'Línea de productos',
        title: 'Consumo animal',
        text: 'Materias primas para formulación de alimentos balanceados y nutrición pecuaria.',
        cards: [
          {
            number: '8',
            title: 'Salvado de trigo',
            description:
              'Subproducto de molienda para formulación de alimentos balanceados.',
          },
          {
            number: '9',
            title: 'Torta de soja',
            description:
              'Subproducto de extracción de aceite, alto contenido proteico para nutrición animal.',
          },
          {
            number: '10',
            title: 'Harina de soya',
            description:
              'Harina de soya para formulación de alimentos balanceados y uso industrial.',
          },
          {
            number: '11',
            title: 'Sales y minerales',
            description:
              'Premezclas minerales y sales para suplementación de ganado y producción pecuaria.',
          },
        ],
      },
    ],
  },
  cta: {
    imageAlt: 'Contacto Mirabolante',
    title: '¿Listo para optimizar su cadena de abastecimiento?',
    text:
      'Contáctenos para discutir su próxima operación. Nuestro equipo está disponible para analizar sus requerimientos.',
    emailLabel: 'Email',
    phoneLabel: 'Teléfono',
    officeLabel: 'Oficina',
    cta: {
      text: 'Contáctenos',
    },
  },
};

export const EN_SERVICES: ServicesDictionary = {
  metaTitle: 'Services | Mirabolante',
  hero: {
    text:
      'Mirabolante connects your operation with raw material suppliers worldwide, manages logistics, and delivers the product to the port you choose.',
    badges: [
      'CIF pricing',
      'Full traceability',
      'Pre-shipment samples',
      'Real-time tracking',
    ],
    isoAlt: 'Mirabolante',
  },
  overview: {
    label: 'Services',
    heading: 'Mirabolante manages your sourcing operation from start to finish.',
    bigtext:
      'From supplier sourcing to delivery at port, we manage every stage of the operation: quotation, negotiation, documentation, transport, and follow-up.',
    cta: {
      text: 'Contact us',
    },
    cards: [
      {
        number: '1',
        title: 'Origination',
        description:
          'We identify suppliers that match your specifications, prepare quotations, and coordinate sample shipments for approval.',
      },
      {
        number: '2',
        title: 'International logistics',
        description:
          'We purchase the product, manage documentation and ocean freight, and deliver to the port you designate.',
      },
      {
        number: '3',
        title: 'Continuous follow-up',
        description:
          'We track your cargo in real time and keep you informed about market conditions for future operations.',
      },
    ],
  },
  coverage: {
    label: 'Coverage',
    heading: 'We connect suppliers across South America with operations throughout Latin America.',
    text:
      'Our supplier network is concentrated in the continent’s main producing regions. From there, we coordinate shipments to the ports our clients designate.',
    items: [
      {
        title: 'Origin',
        description: 'Brazil, Uruguay, Paraguay, Colombia, and Argentina.',
        alt: 'Origin',
      },
      {
        title: 'Destination',
        description: 'Central America, Mexico, the Caribbean, and South America.',
        alt: 'Destination',
      },
    ],
    card: {
      number: '5',
      title: 'Active origin countries',
      description:
        'Established suppliers with whom we maintain long-term commercial relationships and preferred purchasing terms.',
    },
  },
  products: {
    label: 'Products',
    heading: 'These are the product lines we handle on a recurring basis.',
    subtext:
      'If your operation requires a different input, we source it through our supplier network.',
    lines: [
      {
        stickyLabel: 'Product line',
        title: 'Human consumption',
        text: 'Raw materials and ingredients for the food industry.',
        cards: [
          {
            number: '1',
            title: 'Rice',
            description:
              'Milled rice and paddy in different varieties according to client specifications. Main origins: Uruguay, Paraguay, and Brazil.',
            imageAlt: 'Rice',
          },
          {
            number: '2',
            title: 'Beans',
            description:
              'Black beans, red beans, and other dry legumes for industrial processors and wholesale distributors.',
            imageAlt: 'Beans',
          },
          {
            number: '3',
            title: 'Corn',
            description:
              'Corn grain and derived products for the food industry and mass consumption.',
            imageAlt: 'Corn',
          },
          {
            number: '4',
            title: 'Sugar',
            description:
              'Raw and refined sugar in different polarization grades (Icumsa). Main origins: Brazil and Colombia.',
            imageAlt: 'Sugar',
          },
          {
            number: '5',
            title: 'Salt',
            description:
              'Industrial and table salt for food processors and distributors.',
            imageAlt: 'Salt',
          },
          {
            number: '6',
            title: 'Spices',
            description:
              'Bulk spices for the food industry according to the client’s technical specifications.',
            imageAlt: 'Spices',
          },
          {
            number: '7',
            title: 'Wheat flour',
            description:
              'Flour for baking and industrial use in different strength and granulometry specifications.',
            imageAlt: 'Wheat flour',
          },
        ],
      },
      {
        stickyLabel: 'Product line',
        title: 'Animal nutrition',
        text: 'Raw materials for feed formulation and livestock nutrition.',
        cards: [
          {
            number: '8',
            title: 'Wheat bran',
            description: 'Milling by-product used in feed formulation.',
          },
          {
            number: '9',
            title: 'Soybean meal',
            description:
              'Oil extraction by-product with high protein content for animal nutrition.',
          },
          {
            number: '10',
            title: 'Soy flour',
            description:
              'Soy flour for feed formulation and industrial use.',
          },
          {
            number: '11',
            title: 'Salts and minerals',
            description:
              'Mineral premixes and salts for livestock supplementation and animal production.',
          },
        ],
      },
    ],
  },
  cta: {
    imageAlt: 'Contact Mirabolante',
    title: 'Ready to optimize your supply chain?',
    text:
      'Contact us to discuss your next operation. Our team is available to review your requirements.',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    officeLabel: 'Office',
    cta: {
      text: 'Contact us',
    },
  },
};

export const ES_PROCESS: ProcessDictionary = {
  metaTitle: 'Proceso | Mirabolante',
  hero: {
    label: 'Proceso',
    title: 'Cómo trabajamos con su operación.',
    text:
      'Cada requerimiento pasa por un proceso estructurado que asegura trazabilidad, tiempos reales y aprobación antes de cualquier embarque.',
    imageAlt: 'Operación industrial y logística vista desde arriba',
    steps: [
      {
        number: '1',
        title: 'Entendemos su necesidad',
        description:
          'Analizamos qué producto requiere, por qué lo necesita y bajo qué condiciones.',
      },
      {
        number: '2',
        title: 'Buscamos la mejor opción',
        description:
          'Evaluamos proveedores, precios, tiempos de tránsito y calidad según su caso.',
      },
      {
        number: '3',
        title: 'Gestionamos compra y logística',
        description:
          'Coordinamos la compra, documentación y transporte hasta su puerto.',
      },
      {
        number: '4',
        title: 'Seguimiento continuo',
        description:
          'Monitoreamos mercados y le avisamos sobre oportunidades o cambios.',
      },
    ],
    card: {
      number: '4',
      title: 'Etapas por operación',
      description:
        'Un proceso claro desde el primer contacto hasta la entrega en puerto y el seguimiento posterior.',
    },
  },
  sourcing: {
    title: 'Sourcing Global',
    text:
      'Mirabolante trabaja con productores y exportadores en Brasil, Uruguay, Paraguay, Colombia y Argentina. Varios de estos proveedores operan con volúmenes mínimos de compra que superan la capacidad de muchas empresas. A través de Mirabolante, su operación accede a esa red sin necesidad de negociar directo ni desplazar equipos a cada país de origen.',
    iconAlt: 'Sourcing Global',
    imageAlt: 'Mirabolante Trading operaciones',
  },
  logistics: {
    title: 'Gestión Logística',
    text:
      'El precio que cotizamos es CIF: incluye producto, transporte marítimo y documentación. Usted recibe la carga en su puerto, lista para nacionalizar.',
    iconAlt: 'Gestión Logística',
    cards: [
      {
        number: '1',
        title: 'Documentación',
        description:
          'Gestionamos todos los documentos de exportación requeridos para el embarque.',
      },
      {
        number: '2',
        title: 'Transporte marítimo',
        description:
          'Contratamos navieras y coordinamos rutas con tiempos de tránsito reales.',
      },
      {
        number: '3',
        title: 'Entrega en puerto',
        description:
          'El producto llega al puerto que usted designe, listo para el proceso de nacionalización.',
      },
    ],
  },
  flexibility: {
    title: 'Flexibilidad Comercial',
    text:
      'No trabajamos con estructuras rígidas. Si las condiciones estándar no funcionan para su operación, abrimos nuestra estructura de costos y buscamos un punto donde ambas partes salgan beneficiadas. El objetivo no es cerrar una venta única, sino construir una relación comercial que se sostenga en el tiempo.',
    iconAlt: 'Flexibilidad Comercial',
    imageAlt: 'Mirabolante Trading flexibilidad comercial',
  },
  traceability: {
    title: 'Trazabilidad Completa',
    text:
      'Cada embarque está respaldado por documentación verificada. Una vez en tránsito, usted sabe exactamente dónde está su carga y cuándo llega.',
    iconAlt: 'Trazabilidad Completa',
    cards: [
      {
        number: '1',
        title: 'Fichas técnicas',
        description:
          'Documentación verificada con especificaciones de lote, origen y cosecha.',
      },
      {
        number: '2',
        title: 'Muestras aprobadas',
        description:
          'Usted aprueba contra muestra física antes de cualquier embarque.',
      },
      {
        number: '3',
        title: 'Seguimiento en tiempo real',
        description:
          'Sabe en qué barco viene su carga, por dónde está y cuándo llega a puerto.',
      },
    ],
  },
  markets: {
    label: 'Mercados',
    title: 'Presencia activa en Latinoamérica con capacidad de expansión.',
    text:
      'Actualmente operamos con proveedores en Brasil, Uruguay, Paraguay, Colombia y Argentina, y entregamos a clientes en Centroamérica y Sudamérica. Si su operación está en un mercado fuera de esta cobertura, podemos evaluar la viabilidad de atenderlo.',
    imageAlt: 'Mapa de cobertura comercial en Latinoamérica',
    metrics: [
      {
        value: '5',
        labelLines: ['Países de', 'origen'],
      },
      {
        value: '3+',
        labelLines: ['Destinos', 'activos'],
      },
      {
        value: 'CIF',
        labelLines: ['Entrega en', 'su puerto'],
      },
    ],
    cta: {
      text: 'Contáctenos',
    },
  },
};

export const EN_PROCESS: ProcessDictionary = {
  metaTitle: 'Process | Mirabolante',
  hero: {
    label: 'Process',
    title: 'How we work with your operation.',
    text:
      'Every requirement goes through a structured process that ensures traceability, realistic timelines, and approval before any shipment.',
    imageAlt: 'Industrial and logistics operation seen from above',
    steps: [
      {
        number: '1',
        title: 'We understand your need',
        description:
          'We analyze which product you need, why you need it, and under what conditions.',
      },
      {
        number: '2',
        title: 'We find the best option',
        description:
          'We assess suppliers, pricing, transit times, and quality based on your case.',
      },
      {
        number: '3',
        title: 'We manage purchasing and logistics',
        description:
          'We coordinate the purchase, documentation, and transport to your port.',
      },
      {
        number: '4',
        title: 'Continuous follow-up',
        description:
          'We monitor markets and alert you to opportunities or changes.',
      },
    ],
    card: {
      number: '4',
      title: 'Stages per operation',
      description:
        'A clear process from first contact to port delivery and subsequent follow-up.',
    },
  },
  sourcing: {
    title: 'Global Sourcing',
    text:
      'Mirabolante works with producers and exporters in Brazil, Uruguay, Paraguay, Colombia, and Argentina. Several of these suppliers operate with minimum purchase volumes that exceed the capacity of many companies. Through Mirabolante, your operation gains access to that network without having to negotiate directly or deploy teams in each country of origin.',
    iconAlt: 'Global Sourcing',
    imageAlt: 'Mirabolante Trading operations',
  },
  logistics: {
    title: 'Logistics Management',
    text:
      'The price we quote is CIF: it includes product, ocean freight, and documentation. You receive the cargo at your port, ready for customs clearance.',
    iconAlt: 'Logistics Management',
    cards: [
      {
        number: '1',
        title: 'Documentation',
        description:
          'We manage all export documents required for shipment.',
      },
      {
        number: '2',
        title: 'Ocean freight',
        description:
          'We contract shipping lines and coordinate routes with realistic transit times.',
      },
      {
        number: '3',
        title: 'Port delivery',
        description:
          'The product arrives at the port you designate, ready for the customs clearance process.',
      },
    ],
  },
  flexibility: {
    title: 'Commercial Flexibility',
    text:
      'We do not work with rigid structures. If standard conditions do not work for your operation, we open our cost structure and look for a point where both sides benefit. The goal is not to close a one-time sale, but to build a commercial relationship that lasts over time.',
    iconAlt: 'Commercial Flexibility',
    imageAlt: 'Mirabolante Trading commercial flexibility',
  },
  traceability: {
    title: 'Full Traceability',
    text:
      'Every shipment is backed by verified documentation. Once in transit, you know exactly where your cargo is and when it will arrive.',
    iconAlt: 'Full Traceability',
    cards: [
      {
        number: '1',
        title: 'Technical sheets',
        description:
          'Verified documentation with lot, origin, and harvest specifications.',
      },
      {
        number: '2',
        title: 'Approved samples',
        description:
          'You approve against a physical sample before any shipment.',
      },
      {
        number: '3',
        title: 'Real-time tracking',
        description:
          'You know which vessel carries your cargo, where it is, and when it arrives at port.',
      },
    ],
  },
  markets: {
    label: 'Markets',
    title: 'Active presence across Latin America with room to expand.',
    text:
      'We currently operate with suppliers in Brazil, Uruguay, Paraguay, Colombia, and Argentina, and deliver to clients across Central and South America. If your operation is in a market outside this coverage, we can assess the feasibility of serving it.',
    imageAlt: 'Map of commercial coverage across Latin America',
    metrics: [
      {
        value: '5',
        labelLines: ['Origin', 'countries'],
      },
      {
        value: '3+',
        labelLines: ['Active', 'destinations'],
      },
      {
        value: 'CIF',
        labelLines: ['Delivery at', 'your port'],
      },
    ],
    cta: {
      text: 'Contact us',
    },
  },
};

export const ES_ABOUT: AboutDictionary = {
  metaTitle: 'Nosotros | Mirabolante',
  hero: {
    label: 'Sobre Mirabolante',
    title: 'Una trading house construida sobre relaciones comerciales de largo plazo.',
    imageAlt: 'Buque portacontenedores en operación marítima',
    card: {
      number: '100%',
      title: 'Operación propia',
      text:
        'Sin intermediarios adicionales. Mirabolante gestiona directamente la relación con proveedores, la negociación y la logística de cada embarque.',
    },
  },
  intro: {
    label: 'Diferenciales',
    title: 'Cada operación combina acceso, validación y gestión integral.',
    features: [
      {
        title: 'Monitoreo de mercados',
        text:
          'Le avisamos cuando hay buenos precios o cuando conviene esperar.',
        alt: 'Monitoreo de mercados',
      },
      {
        title: 'Muestras antes de embarque',
        text:
          'Aprobación contra ficha técnica y muestra física antes de cualquier compra.',
        alt: 'Muestras antes de embarque',
      },
      {
        title: 'Gestión integral',
        text:
          'Desde la cotización hasta la entrega en puerto, todo en una sola operación.',
        alt: 'Gestión integral',
      },
    ],
  },
  story: {
    label: 'Quiénes somos',
    title: 'Conectamos su operación con los proveedores que necesita.',
    text:
      'Mirabolante es una trading house internacional con base en Panamá y equipo operativo en Costa Rica. Compramos materias primas e ingredientes alimentarios en Sudamérica y los entregamos a clientes industriales en toda Latinoamérica. Gestionamos todo el proceso: cotización, negociación, logística y documentación.',
    metrics: [
      {
        value: '50k',
        labelLines: ['Toneladas', 'anuales'],
      },
      {
        value: '5',
        labelLines: ['Países de', 'origen'],
      },
      {
        value: '20+',
        labelLines: ['Proveedores', 'activos'],
      },
    ],
    cta: {
      text: 'Conozca nuestros servicios',
    },
  },
  team: {
    label: 'Nuestro equipo',
    title: 'El equipo detrás de Mirabolante',
    members: [
      {
        name: 'Valeria Gómez',
        role: 'Directora Comercial',
        quote:
          '“Una buena operación no empieza en el precio final, sino en saber cuándo comprar y con quién hacerlo.”',
        image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
        alt: 'Retrato mock de Valeria Gómez',
      },
      {
        name: 'Andrés Rojas',
        role: 'Líder de Abastecimiento',
        quote:
          '“Validamos cada origen, cada muestra y cada condición antes de comprometer una compra.”',
        image:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
        alt: 'Retrato mock de Andrés Rojas',
      },
      {
        name: 'Sofía Méndez',
        role: 'Coordinadora de Logística',
        quote:
          '“Nuestro trabajo es que cada embarque llegue con visibilidad, documentación clara y ejecución ordenada.”',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80',
        alt: 'Retrato mock de Sofía Méndez',
      },
    ],
  },
  cta: {
    title:
      'Si su operación necesita un proveedor de materias primas con acceso internacional, gestión logística completa y transparencia en cada etapa del proceso, hablemos.',
    imageAlt: 'Vista aérea de operación industrial',
    cta: {
      text: 'Contáctenos',
    },
  },
};

export const EN_ABOUT: AboutDictionary = {
  metaTitle: 'About | Mirabolante',
  hero: {
    label: 'About Mirabolante',
    title: 'A trading house built on long-term commercial relationships.',
    imageAlt: 'Container vessel in maritime operation',
    card: {
      number: '100%',
      title: 'Direct operation',
      text:
        'No additional intermediaries. Mirabolante manages the supplier relationship, negotiation, and logistics of each shipment directly.',
    },
  },
  intro: {
    label: 'Differentiators',
    title: 'Every operation combines access, validation, and end-to-end management.',
    features: [
      {
        title: 'Market monitoring',
        text:
          'We let you know when prices are favorable or when it makes sense to wait.',
        alt: 'Market monitoring',
      },
      {
        title: 'Pre-shipment samples',
        text:
          'Approval against technical sheet and physical sample before any purchase.',
        alt: 'Pre-shipment samples',
      },
      {
        title: 'End-to-end management',
        text:
          'From quotation to port delivery, everything is handled in a single operation.',
        alt: 'End-to-end management',
      },
    ],
  },
  story: {
    label: 'Who we are',
    title: 'We connect your operation with the suppliers it needs.',
    text:
      'Mirabolante is an international trading house based in Panama with an operating team in Costa Rica. We purchase raw materials and food ingredients across South America and deliver them to industrial clients throughout Latin America. We manage the full process: quotation, negotiation, logistics, and documentation.',
    metrics: [
      {
        value: '50k',
        labelLines: ['Annual', 'tons'],
      },
      {
        value: '5',
        labelLines: ['Origin', 'countries'],
      },
      {
        value: '20+',
        labelLines: ['Active', 'suppliers'],
      },
    ],
    cta: {
      text: 'Explore our services',
    },
  },
  team: {
    label: 'Our team',
    title: 'The team behind Mirabolante',
    members: [
      {
        name: 'Valeria Gómez',
        role: 'Commercial Director',
        quote:
          '“A good operation does not start with the final price, but with knowing when to buy and who to buy from.”',
        image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
        alt: 'Mock portrait of Valeria Gómez',
      },
      {
        name: 'Andrés Rojas',
        role: 'Sourcing Lead',
        quote:
          '“We validate every origin, every sample, and every condition before committing to a purchase.”',
        image:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
        alt: 'Mock portrait of Andrés Rojas',
      },
      {
        name: 'Sofía Méndez',
        role: 'Logistics Coordinator',
        quote:
          '“Our job is to make sure every shipment arrives with visibility, clear documentation, and orderly execution.”',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80',
        alt: 'Mock portrait of Sofía Méndez',
      },
    ],
  },
  cta: {
    title:
      'If your operation needs a raw material supplier with international access, full logistics management, and transparency at every stage of the process, let’s talk.',
    imageAlt: 'Aerial view of industrial operation',
    cta: {
      text: 'Contact us',
    },
  },
};

export const ES_CONTACT: ContactDictionary = {
  metaTitle: 'Contacto | Mirabolante',
  label: 'Contacto',
  title: 'Hablemos sobre su próxima operación.',
  text:
    'Cuéntenos qué producto necesita, en qué volumen y hacia dónde. Nuestro equipo le responderá con una cotización y los tiempos estimados.',
  details: {
    phoneLabel: 'Teléfono',
    phoneValue: '+507 0000-0000',
    emailLabel: 'Email',
    emailValue: 'info@mirabolante.com',
    addressLabel: 'Dirección',
    addressValue: 'Ciudad de Panamá, Panamá',
  },
  form: {
    fullName: {
      label: 'Nombre completo',
      placeholder: 'Su nombre',
    },
    company: {
      label: 'Empresa',
      placeholder: 'Su empresa',
    },
    phone: {
      label: 'Teléfono',
      placeholder: '+507 0000-0000',
    },
    email: {
      label: 'Correo electrónico',
      placeholder: 'correo@empresa.com',
    },
    message: {
      label: 'Mensaje',
      placeholder: 'Cuéntenos sobre su requerimiento',
    },
    submitIdle: 'Enviar',
    submitBusy: 'Enviando...',
    successTitle: 'Mensaje enviado correctamente',
    successText:
      'Gracias por escribirnos. Nuestro equipo revisará su solicitud y le responderá con una cotización y tiempos estimados.',
    errorText: 'Error al enviar. Intente de nuevo.',
    subject: 'Nuevo mensaje desde el sitio web de Mirabolante',
  },
};

export const EN_CONTACT: ContactDictionary = {
  metaTitle: 'Contact | Mirabolante',
  label: 'Contact',
  title: 'Let’s talk about your next operation.',
  text:
    'Tell us what product you need, in what volume, and where it needs to go. Our team will reply with a quotation and estimated timelines.',
  details: {
    phoneLabel: 'Phone',
    phoneValue: '+507 0000-0000',
    emailLabel: 'Email',
    emailValue: 'info@mirabolante.com',
    addressLabel: 'Address',
    addressValue: 'Panama City, Panama',
  },
  form: {
    fullName: {
      label: 'Full name',
      placeholder: 'Your name',
    },
    company: {
      label: 'Company',
      placeholder: 'Your company',
    },
    phone: {
      label: 'Phone',
      placeholder: '+507 0000-0000',
    },
    email: {
      label: 'Email',
      placeholder: 'email@company.com',
    },
    message: {
      label: 'Message',
      placeholder: 'Tell us about your requirement',
    },
    submitIdle: 'Send',
    submitBusy: 'Sending...',
    successTitle: 'Message sent successfully',
    successText:
      'Thank you for contacting us. Our team will review your request and reply with a quotation and estimated timelines.',
    errorText: 'There was an error sending your message. Please try again.',
    subject: 'New message from the Mirabolante website',
  },
};
