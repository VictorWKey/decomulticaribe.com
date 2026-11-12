export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export const brand = {
  name: "Decoración y Multiservicios del Caribe",
  shortName: "Decomulticaribe",
  domain: "decomulticaribe.com",
  logoHorizontal: "/assets/logos/logo-completo-texto-derecha.png",
  logoStacked: "/assets/logos/logo-completo-texto-abajo.png",
  logoMark: "/assets/logos/logo-sin-texto.png",
  emailAdmin: "romedecomc@yahoo.com",
  emailGeneral: "victor_romero_gte@hotmail.com",
  phoneAdmin: "+52 462 653 7417",
  phoneGeneral: "+52 998 105 1884",
  phoneOffice: "+52 998 124 9319",
  phoneOfficeAdditional: "+52 998 121 7861",
  whatsappAdmin: "524626537417",
  whatsappGeneral: "529981051884",
  address: "Calle 24 Poniente, Manzana 66, Lote 12, No. 1077, Región 94, Cancún, Quintana Roo, C.P. 77517",
};

export function whatsappUrl(locale: Locale, contact: "admin" | "general" = "general") {
  const phone = {
    admin: brand.whatsappAdmin,
    general: brand.whatsappGeneral,
  }[contact];
  const message =
    locale === "es"
      ? "Hola, me gustaría cotizar un proyecto con Decoración y Multiservicios del Caribe. Tipo de espacio: hotel/residencial/comercio. Servicio requerido:"
      : "Hello, I would like to request a quote from Decoración y Multiservicios del Caribe. Property type: hotel/residential/commercial. Service needed:";

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(locale: Locale, email: string = brand.emailGeneral) {
  const subject = locale === "es" ? "Solicitud de cotización" : "Quote request";
  const body =
    locale === "es"
      ? "Hola, me gustaría recibir una cotización.\n\nTipo de espacio:\nServicio requerido:\nUbicación:\nMedidas o cantidad aproximada:\nFecha ideal de visita o entrega:"
      : "Hello, I would like to request a quote.\n\nProperty type:\nService needed:\nLocation:\nApproximate measurements or quantity:\nIdeal visit or delivery date:";

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const content = {
  es: {
    metadata: {
      title: "Decoración y Multiservicios del Caribe | Servicios para hoteles en Cancún",
      description:
        "Confección, reparación, instalación y mantenimiento para hoteles, residenciales y comercios: cortinas, camastros, sillas de alberca, cojines, tapicería, toldos, persianas y acabados.",
    },
    nav: [
      { href: "#servicios", label: "Servicios" },
      { href: "#trabajos", label: "Trabajos" },
      { href: "#proceso", label: "Proceso" },
      { href: "#contacto", label: "Contacto" },
    ],
    languageLabel: "English",
    hero: {
      eyebrow: "Cancún, Cozumel e Isla Mujeres",
      title: "Confección, reparación e instalación para hoteles y residencias del Caribe Mexicano",
      body:
        "Soluciones de confección, reparación, instalación y mantenimiento para hoteles, residenciales exclusivos, restaurantes, oficinas y espacios comerciales del Caribe Mexicano.",
      primary: "Cotizar por WhatsApp",
      secondary: "Ver servicios",
      note: "Atendemos proyectos por partida, remodelaciones programadas y urgencias operativas.",
      stats: [
        { value: "Hotel", label: "habitaciones, lobby y áreas públicas" },
        { value: "Exterior", label: "alberca, playa, terraza y jardín" },
        { value: "A medida", label: "fabricación, suministro e instalación" },
      ],
    },
    intro: {
      eyebrow: "Especialistas en operación hotelera",
      title: "Diseño funcional, materiales resistentes y respuesta clara para equipos de compras, ama de llaves y administración.",
      body:
        "Tomamos medidas, proponemos materiales adecuados para sol y humedad, actualizamos cotizaciones cuando el proyecto avanza por etapas y fabricamos piezas a la medida para mantener cada espacio presentable y listo para recibir huéspedes.",
      bullets: [
        "Materiales marinos y telas de exterior como Sunbrella para clima de playa.",
        "Reparación integral: tapicería, pintura, tornillería, soldadura y ajustes de estructura.",
        "Confección a medida: camas balinesas, cortinas, cojines, fundas, persianas y muebles de madera cuando el proyecto lo requiere. También realizamos pulido de mármol, muros y pisos vinílicos.",
      ],
    },
    servicesEyebrow: "Qué resolvemos",
    servicesTitle: "Servicios pensados para espacios de alto uso",
    services: [
      {
        icon: "Blinds",
        title: "Cortinas, persianas y alfombras",
        description:
          "Diseño, suministro e instalación de cortinas para habitaciones, salones, restaurantes y áreas públicas; persianas enrollables, verticales, sheers y de bamboo.",
        image: "/assets/images/cortinas-mamparas-alfombras.png",
      },
      {
        icon: "Armchair",
        title: "Camastros y sillas de alberca",
        description:
          "Retapizado, cambio de telas, retoque de pintura, tornillería nueva y reparación de aluminio para mobiliario de alberca, playa, terraza y jardín.",
        image: "/assets/images/camastro.jpg",
      },
      {
        icon: "BedDouble",
        title: "Camas balinesas y áreas de playa",
        description:
          "Colchones, fundas deslizantes, toldos, cortinas, cojines trapezoides y textiles resistentes al exterior fabricados a la medida de cada estructura.",
        image: "/assets/images/camas-colchones-cojines-cortinas.jpg",
      },
      {
        icon: "Sofa",
        title: "Tapicería, cojines y ratán",
        description:
          "Renovación de salas de lobby, sillones, sofás, muebles de ratán sintético o madera, cojines lavables y cojines decorativos para habitaciones.",
        image: "/assets/images/imagen-sala-de-sillones-hotel.jpg",
      },
      {
        icon: "Lamp",
        title: "Pantallas, detalles y decoración",
        description:
          "Pantallas para lámparas, ganchos de acero inoxidable para cortina, fundas especiales, mantelería, limpiones de cocina y piezas decorativas por pedido.",
        image: "/assets/images/pantallas-para-lamparas1.png",
      },
      {
        icon: "Wrench",
        title: "Acabados y mantenimiento general",
        description:
          "Zoclos y pisos vinílicos, alfombras, térmicos para ventanas, pulido de muros y mármol, lonas para alberca y apoyos de multiservicio.",
        image: "/assets/images/termicos-ventanas-pisos-muros.png",
      },
    ],
    proof: {
      eyebrow: "Por qué funciona",
      title: "Un solo proveedor para resolver varias necesidades del inmueble",
      items: [
        { title: "Medidas precisas", body: "Visitamos el sitio, levantamos medidas y dejamos listas las bases para futuras partidas del proyecto." },
        { title: "Material correcto", body: "Recomendamos telas, espumas, herrajes y acabados según exposición al sol, humedad y tráfico." },
        { title: "Cotización ordenada", body: "Preparamos propuestas por cantidades, prioridades y etapas para compras o administración." },
        { title: "Entrega instalada", body: "Fabricamos, suministramos, reparamos e instalamos para cerrar el servicio sin dejar cabos sueltos." },
      ],
    },
    galleryEyebrow: "Fotos del cliente",
    galleryTitle: "Trabajos realizados en hoteles y espacios de alto uso",
    galleryIntro:
      "Fotografías reales de trabajos realizados: mobiliario de lobby y exterior, camastros, sillas, tapicería, cojines, habitaciones, cortinas, ratán reparado, ganchos y materiales de calidad marina.",
    gallery: [
      // Tapicería lobby — 2×2 destacado
      { title: "Lobby y salas de hotel", category: "Tapicería", image: "/assets/images/imagen-sala-de-sillones-hotel.jpg", colSpan: 2, rowSpan: 2 },
      // Exterior (columna derecha junto al destacado)
      { title: "Camastros de playa y alberca", category: "Exterior", image: "/assets/images/camastro.jpg" },
      { title: "Sillas de alberca y jardín", category: "Exterior", image: "/assets/images/sillas-de-alberca.jpg" },
      // Tapicería y cojines
      { title: "Sofá de mimbre con cojines", category: "Tapicería", image: "/assets/images/mueblescojines1.jpg" },
      { title: "Sillas y lounge de hotel", category: "Tapicería", image: "/assets/images/mueblescojines2.jpg" },
      { title: "Sillones de lobby", category: "Tapicería", image: "/assets/images/mueblescojines3.jpg" },
      { title: "Sillones de mimbre tapizados", category: "Tapicería", image: "/assets/images/mueblescojines4.jpg" },
      { title: "Sillón de mimbre con cojines", category: "Tapicería", image: "/assets/images/mueblescojines5.jpg" },
      { title: "Sala con sofá decorativo", category: "Tapicería", image: "/assets/images/mueblescojines6.jpg" },
      // Cortinas y habitaciones
      { title: "Cortinas y mamparas en pasillo", category: "Interior", image: "/assets/images/cortinas-mamparas-alfombras.png" },
      { title: "Cama tipo daybed con cortinas", category: "Camas balinesas", image: "/assets/images/camas-colchones-cojines-cortinas.jpg" },
      { title: "Habitación de hotel", category: "Habitaciones", image: "/assets/images/habitaciones-areas-publicas1.jpg" },
      { title: "Habitación con cama y cojines", category: "Habitaciones", image: "/assets/images/habitaciones-areas-publicas2.jpg" },
      { title: "Área pública con sofá", category: "Habitaciones", image: "/assets/images/habitaciones-areas-publicas3.jpg" },
      { title: "Silla decorativa ornamental", category: "Decoración", image: "/assets/images/habitaciones-areas-publicas4.jpg" },
      // Reparación y fabricación de ratán y muebles
      { title: "Silla de ratán reparada", category: "Reparación", image: "/assets/images/reparacion-ratan-muebles1.jpg" },
      { title: "Sillas de ratán para exterior", category: "Reparación", image: "/assets/images/reparacion-ratan-muebles2.jpg" },
      // Decoración y herrajes
      { title: "Lámpara decorativa", category: "Decoración", image: "/assets/images/pantallas-para-lamparas1.png" },
      { title: "Armazón de pantalla para lámpara", category: "Decoración", image: "/assets/images/pantallas-para-lamparas2.jpg" },
      { title: "Ganchos de acero inoxidable", category: "Herrajes", image: "/assets/images/ganchos1.jpg" },
      { title: "Toldos y fundas para exterior", category: "Toldos", image: "/assets/images/funda-carrito-hot-dog.jpg" },
      // Nuevas fotos reales del cliente
      { title: "Cama balinesa en terraza de hotel", category: "Camas balinesas", image: "/assets/images/cama-balinesa-terraza-hotel.jpg" },
      { title: "Cama balinesa en playa", category: "Camas balinesas", image: "/assets/images/cama-balinesa-playa.jpg" },
      { title: "Cama balinesa con dosel para exterior", category: "Camas balinesas", image: "/assets/images/cama-balinesa-dosel-exterior.jpg" },
      { title: "Camastros en instalación exterior", category: "Exterior", image: "/assets/images/camastros-instalacion-exterior.jpg" },
      { title: "Sillón de lobby en área de recepción", category: "Tapicería", image: "/assets/images/sillon-lobby-recepcion.jpg" },
      // Material marino — contain para mostrar la caja Sunbrella completa
      { title: "Materiales Sunbrella", category: "Material marino", image: "/assets/images/materiales-marinos-calidad.png", contain: true },
    ],
    processEyebrow: "Cómo trabajamos",
    processTitle: "Un proceso estructurado para cualquier escala de proyecto",
    process: [
      { title: "Diagnóstico", body: "Recibimos fotos, ubicación y necesidad. Si aplica, agendamos visita para revisar daños, cantidades y prioridades." },
      { title: "Medición y materiales", body: "Tomamos medidas y definimos telas, espumas, herrajes, colores, acabados y nivel de resistencia requerido." },
      { title: "Cotización", body: "Enviamos propuesta por correo o WhatsApp. También actualizamos cotizaciones cuando el hotel libera partidas por etapa." },
      { title: "Fabricación e instalación", body: "Fabricamos, reparamos, suministramos e instalamos. Dejamos piezas listas para uso operativo y mantenimiento." },
    ],
    audiences: {
      title: "Hecho para quienes mantienen impecable un inmueble",
      items: ["Hoteles y resorts", "Residenciales privados", "Restaurantes y bares", "Oficinas y comercios", "Casas con alberca", "Eventos y áreas comunes"],
    },
    contact: {
      eyebrow: "Solicita tu cotización",
      title: "Manda fotos, medidas aproximadas o agenda una visita",
      body:
        "Para responder mejor, incluye ubicación, tipo de espacio, servicio que necesitas, cantidad de piezas, medidas aproximadas y si buscas reparación, fabricación nueva o instalación.",
      whatsapp: "WhatsApp",
      email: "Enviar correo",
      call: "Llamar",
      checklistTitle: "Datos útiles para cotizar",
      checklist: ["Ubicación del inmueble", "Fotos del área o pieza", "Medidas o cantidad", "Material o color deseado", "Fecha ideal de entrega"],
      cards: [
        { name: "Lic. Víctor Romero", role: "Gerente general", phone: brand.phoneGeneral, email: brand.emailGeneral, contact: "general" },
        { name: "Esperanza Romero", role: "Gerente administrativa", phone: brand.phoneAdmin, email: brand.emailAdmin, contact: "admin" },
      ],
    },
    footer: {
      coverage: "Servicio en Cancún, Cozumel e Isla Mujeres.",
      office: "Oficina",
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    metadata: {
      title: "Decoración y Multiservicios del Caribe | Hotel services in Cancun",
      description:
        "Custom fabrication, repair, installation and maintenance for hotels, residential properties and commercial spaces: curtains, loungers, pool chairs, cushions, upholstery, awnings, blinds and finishes.",
    },
    nav: [
      { href: "#services", label: "Services" },
      { href: "#work", label: "Work" },
      { href: "#process", label: "Process" },
      { href: "#contact", label: "Contact" },
    ],
    languageLabel: "Español",
    hero: {
      eyebrow: "Cancun, Cozumel and Isla Mujeres",
      title: "Soft furnishing, repairs & installation for Caribbean hotels and residences",
      body:
        "Fabrication, repair, installation and maintenance solutions for hotels, exclusive residences, restaurants, offices and commercial spaces in the Mexican Caribbean.",
      primary: "Quote on WhatsApp",
      secondary: "View services",
      note: "We support phased budgets, scheduled renovations and operational maintenance needs.",
      stats: [
        { value: "Hotel", label: "rooms, lobby and public areas" },
        { value: "Outdoor", label: "pool, beach, terrace and garden" },
        { value: "Custom", label: "fabrication, supply and installation" },
      ],
    },
    intro: {
      eyebrow: "Built for hotel operations",
      title: "Functional design, resistant materials and clear response for purchasing, housekeeping and property administration teams.",
      body:
        "We take measurements, recommend materials suitable for sun and humidity, update quotes as projects move in phases and fabricate custom pieces to keep every space presentable and guest-ready.",
      bullets: [
        "Marine-grade materials and outdoor fabrics such as Sunbrella for coastal weather.",
        "Full repair scope: upholstery, paint touch-ups, screws, welding and structural adjustments.",
        "Custom fabrication: Balinese beds, curtains, cushions, covers, blinds and wood furniture when the project requires it. We also handle marble, wall and vinyl floor polishing.",
      ],
    },
    servicesEyebrow: "What we solve",
    servicesTitle: "Services designed for high-use spaces",
    services: [
      {
        icon: "Blinds",
        title: "Curtains, blinds and carpets",
        description:
          "Design, supply and installation of curtains for rooms, halls, restaurants and public areas; roller blinds, vertical blinds, sheers and bamboo blinds.",
        image: "/assets/images/cortinas-mamparas-alfombras.png",
      },
      {
        icon: "Armchair",
        title: "Loungers and pool chairs",
        description:
          "Reupholstery, fabric replacement, paint touch-ups, new screws and aluminum repair for pool, beach, terrace and garden furniture.",
        image: "/assets/images/camastro.jpg",
      },
      {
        icon: "BedDouble",
        title: "Balinese beds and beach areas",
        description:
          "Mattresses, fitted covers, awnings, curtains, trapezoid cushions and outdoor textiles made to fit each structure.",
        image: "/assets/images/camas-colchones-cojines-cortinas.jpg",
      },
      {
        icon: "Sofa",
        title: "Upholstery, cushions and rattan",
        description:
          "Renovation of lobby seating, sofas, synthetic rattan or wood furniture, washable covers and decorative cushions for rooms.",
        image: "/assets/images/imagen-sala-de-sillones-hotel.jpg",
      },
      {
        icon: "Lamp",
        title: "Lamp shades, details and decor",
        description:
          "Lamp shades, stainless-steel curtain hooks, custom covers, table linens, kitchen towels and decorative pieces on request.",
        image: "/assets/images/pantallas-para-lamparas1.png",
      },
      {
        icon: "Wrench",
        title: "Finishes and general maintenance",
        description:
          "Vinyl baseboards and flooring, carpets, thermal window solutions, wall and marble polishing, pool covers and multiservice support.",
        image: "/assets/images/termicos-ventanas-pisos-muros.png",
      },
    ],
    proof: {
      eyebrow: "Why it works",
      title: "One provider to solve multiple property needs",
      items: [
        { title: "Accurate measurements", body: "We visit the site, take measurements and prepare useful references for future project phases." },
        { title: "The right material", body: "We recommend fabrics, foams, hardware and finishes based on sun exposure, humidity and traffic." },
        { title: "Organized quotes", body: "We prepare proposals by quantities, priorities and phases for purchasing or administration teams." },
        { title: "Installed delivery", body: "We fabricate, supply, repair and install so the service is closed without loose ends." },
      ],
    },
    galleryEyebrow: "Client photos",
    galleryTitle: "Work completed in hotels and high-demand spaces",
    galleryIntro:
      "Real photos of completed work: lobby and outdoor furniture, loungers, chairs, upholstery, cushions, rooms, curtains, repaired rattan, hooks and marine-grade materials.",
    gallery: [
      // Upholstery lobby — 2×2 featured
      { title: "Hotel lobby seating", category: "Upholstery", image: "/assets/images/imagen-sala-de-sillones-hotel.jpg", colSpan: 2, rowSpan: 2 },
      // Outdoor (right column beside featured)
      { title: "Beach and pool loungers", category: "Outdoor", image: "/assets/images/camastro.jpg" },
      { title: "Pool and garden chairs", category: "Outdoor", image: "/assets/images/sillas-de-alberca.jpg" },
      // Upholstery and cushions
      { title: "Wicker sofa with cushions", category: "Upholstery", image: "/assets/images/mueblescojines1.jpg" },
      { title: "Hotel lounge seating", category: "Upholstery", image: "/assets/images/mueblescojines2.jpg" },
      { title: "Lobby armchairs", category: "Upholstery", image: "/assets/images/mueblescojines3.jpg" },
      { title: "Upholstered wicker armchairs", category: "Upholstery", image: "/assets/images/mueblescojines4.jpg" },
      { title: "Wicker armchair with cushions", category: "Upholstery", image: "/assets/images/mueblescojines5.jpg" },
      { title: "Living room with decorative sofa", category: "Upholstery", image: "/assets/images/mueblescojines6.jpg" },
      // Curtains and rooms
      { title: "Curtains and partitions in corridor", category: "Interior", image: "/assets/images/cortinas-mamparas-alfombras.png" },
      { title: "Daybed with curtains", category: "Balinese beds", image: "/assets/images/camas-colchones-cojines-cortinas.jpg" },
      { title: "Hotel room", category: "Rooms", image: "/assets/images/habitaciones-areas-publicas1.jpg" },
      { title: "Room with bed and cushions", category: "Rooms", image: "/assets/images/habitaciones-areas-publicas2.jpg" },
      { title: "Public area with sofa", category: "Rooms", image: "/assets/images/habitaciones-areas-publicas3.jpg" },
      { title: "Ornamental decorative chair", category: "Decor", image: "/assets/images/habitaciones-areas-publicas4.jpg" },
      // Rattan repair and furniture fabrication
      { title: "Repaired outdoor rattan chair", category: "Repair", image: "/assets/images/reparacion-ratan-muebles1.jpg" },
      { title: "Outdoor rattan chairs", category: "Repair", image: "/assets/images/reparacion-ratan-muebles2.jpg" },
      // Decor and hardware
      { title: "Decorative lamp", category: "Decor", image: "/assets/images/pantallas-para-lamparas1.png" },
      { title: "Lamp shade frame detail", category: "Decor", image: "/assets/images/pantallas-para-lamparas2.jpg" },
      { title: "Stainless steel curtain hooks", category: "Hardware", image: "/assets/images/ganchos1.jpg" },
      { title: "Awnings and outdoor covers", category: "Awnings", image: "/assets/images/funda-carrito-hot-dog.jpg" },
      // New real client photos
      { title: "Balinese bed on hotel terrace", category: "Balinese beds", image: "/assets/images/cama-balinesa-terraza-hotel.jpg" },
      { title: "Balinese beach bed setup", category: "Balinese beds", image: "/assets/images/cama-balinesa-playa.jpg" },
      { title: "Balinese canopy bed for outdoor", category: "Balinese beds", image: "/assets/images/cama-balinesa-dosel-exterior.jpg" },
      { title: "Outdoor loungers installation", category: "Outdoor", image: "/assets/images/camastros-instalacion-exterior.jpg" },
      { title: "Lobby lounge seating in reception area", category: "Upholstery", image: "/assets/images/sillon-lobby-recepcion.jpg" },
      // Marine material — contain to show full Sunbrella box
      { title: "Sunbrella marine fabric", category: "Marine material", image: "/assets/images/materiales-marinos-calidad.png", contain: true },
    ],
    processEyebrow: "How we work",
    processTitle: "A structured process for any scale of project",
    process: [
      { title: "Diagnosis", body: "We receive photos, location and requirements. When needed, we schedule a visit to inspect damage, quantities and priorities." },
      { title: "Measurements and materials", body: "We take measurements and define fabrics, foams, hardware, colors, finishes and resistance level." },
      { title: "Quote", body: "We send the proposal by email or WhatsApp. We can also update quotes when a hotel releases budget by phases." },
      { title: "Fabrication and installation", body: "We fabricate, repair, supply and install. Pieces are delivered ready for operations and maintenance." },
    ],
    audiences: {
      title: "Made for teams that keep properties looking sharp",
      items: ["Hotels and resorts", "Private residences", "Restaurants and bars", "Offices and retail", "Homes with pools", "Events and common areas"],
    },
    contact: {
      eyebrow: "Request a quote",
      title: "Send photos, approximate measurements or schedule a site visit",
      body:
        "For a faster response, include location, property type, service needed, number of pieces, approximate measurements and whether you need repair, new fabrication or installation.",
      whatsapp: "WhatsApp",
      email: "Send email",
      call: "Call",
      checklistTitle: "Helpful quote details",
      checklist: ["Property location", "Photos of the area or piece", "Measurements or quantity", "Preferred material or color", "Ideal delivery date"],
      cards: [
        { name: "Lic. Víctor Romero", role: "General manager", phone: brand.phoneGeneral, email: brand.emailGeneral, contact: "general" },
        { name: "Esperanza Romero", role: "Administrative manager", phone: brand.phoneAdmin, email: brand.emailAdmin, contact: "admin" },
      ],
    },
    footer: {
      coverage: "Service in Cancun, Cozumel and Isla Mujeres.",
      office: "Office",
      rights: "All rights reserved.",
    },
  },
} as const;
