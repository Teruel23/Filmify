/* ============================================================
   FILMIFY · catálogo de muestra
   ------------------------------------------------------------
   DATOS DE DEMOSTRACIÓN. Ni los equipos, ni las personas, ni los
   precios son reales: están para que el prototipo se pueda recorrer
   entero. Al conectar el backend, esto se sustituye por la API.
   ============================================================ */

window.FILMIFY = (function () {

  const CATS = [
    { key: 'camaras',   name: 'Cámaras',   sub: 'Cuerpos y kits',     bg: '#00A6A0', bg2: '#00504E', fg: '#FFFFFF', ic: '#8CD9D6' },
    { key: 'objetivos', name: 'Objetivos', sub: 'Fijas y zooms',      bg: '#332C27', bg2: '#0E0D0C', fg: '#FFFFFF', ic: '#6E635A' },
    { key: 'luces',     name: 'Luces',     sub: 'LED y HMI',          bg: '#E85122', bg2: '#7E2408', fg: '#FFFFFF', ic: '#F9AF92' },
    { key: 'audio',     name: 'Audio',     sub: 'Micros y grabadores',bg: '#00706C', bg2: '#012F2E', fg: '#FFFFFF', ic: '#4FA8A4' },
    { key: 'drones',    name: 'Drones',    sub: 'Aéreo y baterías',   bg: '#FFA673', bg2: '#F0793C', fg: '#14110F', ic: '#FFE0CB' },
    { key: 'gimbals',   name: 'Gimbals',   sub: 'Estabilización',     bg: '#FFE3BB', bg2: '#E2B77E', fg: '#14110F', ic: '#FFF8EE' },
    { key: 'tripodes',  name: 'Trípodes',  sub: 'Soportes y cabezas', bg: '#00706C', bg2: '#001F1E', fg: '#FFFFFF', ic: '#3E9995' },
    { key: 'arte',      name: 'Arte',      sub: 'Grip y tramoya',     bg: '#C93C0F', bg2: '#6E200A', fg: '#FFFFFF', ic: '#ED9270' },
    { key: 'otros',     name: 'Otros',     sub: 'Monitores y varios', bg: '#EBDCC6', bg2: '#C9AE85', fg: '#14110F', ic: '#FDF7EC' }
  ];

  const CIUDADES = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Zaragoza', 'Málaga', 'Murcia'];

  // Propietarios. `nivel`: verificado | pro
  const DUENOS = {
    marta:  { nombre: 'Marta Requena',   ini: 'MR', nivel: 'pro',        nota: 4.9, resenas: 63, desde: 2024, responde: 2,  av: '#00706C' },
    ivan:   { nombre: 'Iván Lastra',     ini: 'IL', nivel: 'pro',        nota: 5.0, resenas: 41, desde: 2024, responde: 1,  av: '#C93C0F' },
    nerea:  { nombre: 'Nerea Casal',     ini: 'NC', nivel: 'verificado', nota: 4.8, resenas: 28, desde: 2025, responde: 4,  av: '#14110F' },
    diego:  { nombre: 'Diego Mansilla',  ini: 'DM', nivel: 'verificado', nota: 4.9, resenas: 35, desde: 2025, responde: 3,  av: '#004E4B' },
    aitor:  { nombre: 'Aitor Goikoetxea',ini: 'AG', nivel: 'pro',        nota: 5.0, resenas: 52, desde: 2024, responde: 2,  av: '#7E2408' },
    lucia:  { nombre: 'Lucía Peñalver',  ini: 'LP', nivel: 'verificado', nota: 4.7, resenas: 19, desde: 2025, responde: 6,  av: '#00706C' },
    carla:  { nombre: 'Carla Vergés',    ini: 'CV', nivel: 'verificado', nota: 4.9, resenas: 24, desde: 2025, responde: 3,  av: '#C93C0F' },
    pablo:  { nombre: 'Pablo Serna',     ini: 'PS', nivel: 'verificado', nota: 4.8, resenas: 31, desde: 2024, responde: 5,  av: '#14110F' },
    ruben:  { nombre: 'Rubén Ostáriz',   ini: 'RO', nivel: 'pro',        nota: 4.9, resenas: 47, desde: 2024, responde: 2,  av: '#004E4B' },
    ainhoa: { nombre: 'Ainhoa Beltrán',  ini: 'AB', nivel: 'verificado', nota: 4.8, resenas: 22, desde: 2025, responde: 4,  av: '#7E2408' }
  };

  /* Cada equipo: precio/día, precio de venta si está a la venta,
     inventario incluido, modos de entrega y días bloqueados. */
  const EQUIPOS = [
    {
      id: 'fx3-smallrig', cat: 'camaras', titulo: 'Sony FX3 + jaula SmallRig',
      ciudad: 'Madrid', barrio: 'Malasaña', km: 1.2, dueno: 'marta',
      dia: 55, venta: 3190, valor: 4200, nota: 4.9, resenas: 18,
      entrega: ['mano', 'express', 'punto'], politica: 'moderada', coberturaMin: 'plus',
      badges: ['Verificado', 'Entrega en mano'], grad: 'teal',
      resumen: 'Cuerpo full-frame de 12 MP pensado para vídeo. Lo uso en documental y publicidad; sale de casa revisado y con las baterías cargadas.',
      incluye: ['Cuerpo Sony FX3', 'Jaula SmallRig', '3 baterías NP-FZ100', 'Cargador doble', '2 tarjetas CFexpress 160 GB', 'Empuñadura XLR', 'Maleta rígida'],
      noIncluye: ['Óptica', 'Tarjetas adicionales'],
      bloqueados: ['2026-09-04', '2026-09-05', '2026-09-06', '2026-09-18', '2026-09-19']
    },
    {
      id: 'cne-24', cat: 'objetivos', titulo: 'Canon CN-E 24 mm T1.5',
      ciudad: 'Barcelona', barrio: 'Gràcia', km: 3.4, dueno: 'ivan',
      dia: 40, venta: 4450, valor: 5100, nota: 5.0, resenas: 12,
      entrega: ['mano', 'express'], politica: 'estricta', coberturaMin: 'plus',
      badges: ['Pro'], grad: 'orange',
      resumen: 'Óptica de cine con montura EF. Engranaje de foco estándar y respiración muy contenida. Va siempre en su maleta con gel de sílice.',
      incluye: ['Objetivo CN-E 24 mm T1.5', 'Parasol', 'Tapas delantera y trasera', 'Maleta Pelican 1510'],
      noIncluye: ['Adaptador de montura', 'Filtros'],
      bloqueados: ['2026-09-08', '2026-09-09', '2026-09-10', '2026-09-11']
    },
    {
      id: 'aputure-600d', cat: 'luces', titulo: 'Aputure 600D Pro + Light Dome',
      ciudad: 'Valencia', barrio: 'Ruzafa', km: 2.1, dueno: 'nerea',
      dia: 45, venta: 1890, valor: 2600, nota: 4.8, resenas: 9,
      entrega: ['mano', 'punto'], politica: 'moderada', coberturaMin: 'basico',
      badges: ['Verificado'], grad: 'deep',
      resumen: 'Foco de 600 W daylight con caja de luz. Da para iluminar un interior entero rebotando en techo. Lleva su carro de transporte.',
      incluye: ['Aputure 600D Pro', 'Light Dome II', 'Reflector estándar', 'Cable de 7,5 m', 'Carro de transporte', 'Funda'],
      noIncluye: ['Trípode de suelo', 'Generador'],
      bloqueados: ['2026-09-15', '2026-09-16']
    },
    {
      id: 'mavic3-cine', cat: 'drones', titulo: 'DJI Mavic 3 Cine + 3 baterías',
      ciudad: 'Sevilla', barrio: 'Triana', km: 4.8, dueno: 'diego',
      dia: 70, venta: 2750, valor: 3400, nota: 4.9, resenas: 15,
      entrega: ['mano', 'express'], politica: 'estricta', coberturaMin: 'total',
      badges: ['Envío 24 h'], grad: 'ink',
      resumen: 'Graba ProRes en el almacenamiento interno. Voy con licencia A2, así que puedo asesorar sobre dónde se puede volar y dónde no.',
      incluye: ['DJI Mavic 3 Cine', '3 baterías', 'Cargador múltiple', 'Mando RC Pro', 'Filtros ND 4/8/16/32', 'Mochila'],
      noIncluye: ['Seguro de responsabilidad civil aérea', 'Permisos de vuelo'],
      bloqueados: ['2026-09-01', '2026-09-02', '2026-09-22', '2026-09-23', '2026-09-24']
    },
    {
      id: 'rs4-pro', cat: 'gimbals', titulo: 'DJI RS 4 Pro Combo',
      ciudad: 'Bilbao', barrio: 'Indautxu', km: 1.9, dueno: 'aitor',
      dia: 25, venta: 780, valor: 1100, nota: 5.0, resenas: 21,
      entrega: ['mano', 'express', 'punto'], politica: 'flexible', coberturaMin: 'basico',
      badges: ['Verificado'], grad: 'sun',
      resumen: 'Estabilizador para cargas de hasta 4,5 kg. Va equilibrado y con el motor de foco montado; se coge y se rueda.',
      incluye: ['DJI RS 4 Pro', 'Motor de foco', 'Empuñadura trasera', '2 baterías', 'Placas de cambio rápido', 'Maleta'],
      noIncluye: ['Cámara', 'Óptica'],
      bloqueados: []
    },
    {
      id: 'zoom-f6', cat: 'audio', titulo: 'Zoom F6 + Røde NTG5 y pértiga',
      ciudad: 'Madrid', barrio: 'Lavapiés', km: 0.8, dueno: 'lucia',
      dia: 22, venta: 990, valor: 1500, nota: 4.7, resenas: 11,
      entrega: ['mano', 'express'], politica: 'flexible', coberturaMin: 'basico',
      badges: ['Kit completo'], grad: 'teal',
      resumen: 'Kit de sonido directo para entrevistas y documental. Grabador de 6 pistas con doble conversión, así que perdona bastante los picos.',
      incluye: ['Zoom F6', 'Røde NTG5', 'Pértiga de 3 m', 'Zeppelin y peluche', 'Cable XLR 5 m', 'Auriculares', '2 tarjetas SD'],
      noIncluye: ['Micrófonos de corbata', 'Emisoras inalámbricas'],
      bloqueados: ['2026-09-12', '2026-09-13']
    },
    {
      id: 'sachtler-75', cat: 'tripodes', titulo: 'Sachtler Flowtech 75 + cabeza',
      ciudad: 'Zaragoza', barrio: 'Centro', km: 2.6, dueno: 'carla',
      dia: 18, venta: 1150, valor: 1600, nota: 4.9, resenas: 8,
      entrega: ['mano', 'punto'], politica: 'moderada', coberturaMin: 'basico',
      badges: ['Verificado'], grad: 'deep',
      resumen: 'Trípode de carbono que se despliega de una vez desde arriba. Cabeza fluida con contrabalance de siete posiciones.',
      incluye: ['Patas Flowtech 75', 'Cabeza fluida FSB 8', 'Extensión de nivel', 'Bolsa de transporte'],
      noIncluye: ['Araña de suelo'],
      bloqueados: ['2026-09-25', '2026-09-26']
    },
    {
      id: 'grip-arte', cat: 'arte', titulo: 'Banderas, difusión y tramoya',
      ciudad: 'Málaga', barrio: 'Soho', km: 3.1, dueno: 'pablo',
      dia: 30, venta: 640, valor: 1200, nota: 4.8, resenas: 7,
      entrega: ['mano'], politica: 'flexible', coberturaMin: 'basico',
      badges: ['Kit completo'], grad: 'orange',
      resumen: 'Todo lo que hace falta para modelar la luz de un interior: banderas, sedas, polys y los soportes para colgarlo.',
      incluye: ['Juego de 4 banderas', 'Seda 4x4', 'Difusión 216 y 250', '2 jirafas', '4 palos', 'Pinzas y mordazas', 'Sacos de arena'],
      noIncluye: ['Focos', 'Generador'],
      bloqueados: []
    },
    {
      id: 'komodo-6k', cat: 'camaras', titulo: 'RED Komodo 6K + monitor',
      ciudad: 'Madrid', barrio: 'Chamberí', km: 2.4, dueno: 'ruben',
      dia: 95, venta: 0, valor: 8900, nota: 4.9, resenas: 26,
      entrega: ['mano', 'express'], politica: 'estricta', coberturaMin: 'total',
      badges: ['Pro', 'Envío 24 h'], grad: 'ink',
      resumen: 'Obturador global y R3D. La saco para publicidad y videoclip. Solo la alquilo a gente con historial: es mi herramienta de trabajo.',
      incluye: ['RED Komodo 6K', 'Monitor SmallHD 5"', '4 baterías V-Lock', 'Cargador', '2 tarjetas CFast 512 GB', 'Jaula y asa', 'Maleta rígida'],
      noIncluye: ['Óptica', 'Seguimiento de foco'],
      bloqueados: ['2026-09-03', '2026-09-04', '2026-09-05', '2026-09-17', '2026-09-18', '2026-09-19', '2026-09-20']
    },
    {
      id: 'sigma-art-set', cat: 'objetivos', titulo: 'Sigma Art trío 24/35/50 mm',
      ciudad: 'Madrid', barrio: 'Tetuán', km: 5.2, dueno: 'marta',
      dia: 48, venta: 2100, valor: 2900, nota: 4.8, resenas: 14,
      entrega: ['mano', 'express', 'punto'], politica: 'moderada', coberturaMin: 'plus',
      badges: ['Kit completo', 'Verificado'], grad: 'deep',
      resumen: 'Las tres focales que resuelven el 90 % de un rodaje de ficción pequeño. Montura E, todas a T1.5 aparente.',
      incluye: ['Sigma Art 24 mm', 'Sigma Art 35 mm', 'Sigma Art 50 mm', 'Parasoles', 'Filtros UV', 'Maleta con espuma'],
      noIncluye: ['Anillos de foco', 'Adaptadores'],
      bloqueados: ['2026-09-04', '2026-09-05', '2026-09-06']
    },
    {
      id: 'nanlite-forza', cat: 'luces', titulo: 'Nanlite Forza 500 II + softbox',
      ciudad: 'Barcelona', barrio: 'Poblenou', km: 4.1, dueno: 'ainhoa',
      dia: 38, venta: 1450, valor: 2000, nota: 4.8, resenas: 10,
      entrega: ['mano', 'express'], politica: 'moderada', coberturaMin: 'basico',
      badges: ['Verificado'], grad: 'orange',
      resumen: 'Alternativa silenciosa al 600D: el ventilador casi no se oye, así que sirve para entrevistas con sonido directo.',
      incluye: ['Nanlite Forza 500 II', 'Softbox parabólico 90 cm', 'Reflector', 'Balastro y cables', 'Funda de transporte'],
      noIncluye: ['Trípode', 'Batería V-Lock'],
      bloqueados: ['2026-09-14', '2026-09-15']
    },
    {
      id: 'wireless-go', cat: 'audio', titulo: 'Røde Wireless PRO doble',
      ciudad: 'Valencia', barrio: 'El Carmen', km: 1.6, dueno: 'nerea',
      dia: 15, venta: 320, valor: 480, nota: 4.7, resenas: 16,
      entrega: ['mano', 'express', 'punto'], politica: 'flexible', coberturaMin: 'basico',
      badges: ['Envío 24 h'], grad: 'teal',
      resumen: 'Dos emisoras con grabación interna de respaldo, que salva la entrevista cuando el enlace falla. Con sus peluches y pinzas.',
      incluye: ['2 emisoras', 'Receptor', '2 lavaliers', 'Peluches', 'Estuche de carga', 'Cables TRS y USB-C'],
      noIncluye: [],
      bloqueados: []
    },
    {
      id: 'atomos-ninja', cat: 'otros', titulo: 'Atomos Ninja V + SSD 1 TB',
      ciudad: 'Bilbao', barrio: 'Deusto', km: 3.3, dueno: 'aitor',
      dia: 20, venta: 590, valor: 850, nota: 5.0, resenas: 13,
      entrega: ['mano', 'express'], politica: 'flexible', coberturaMin: 'basico',
      badges: ['Verificado'], grad: 'sun',
      resumen: 'Monitor grabador de 5" con 1000 nits: se ve a pleno sol. Graba ProRes RAW de las cámaras que lo permiten.',
      incluye: ['Atomos Ninja V', 'SSD 1 TB', '2 baterías NP-F', 'Cargador', 'Cable HDMI', 'Parasol', 'Maletín'],
      noIncluye: ['Cable SDI'],
      bloqueados: ['2026-09-21']
    },
    {
      id: 'ronin-4d', cat: 'gimbals', titulo: 'DJI Ronin 4D-6K',
      ciudad: 'Madrid', barrio: 'Arganzuela', km: 3.8, dueno: 'ruben',
      dia: 120, venta: 0, valor: 9500, nota: 4.9, resenas: 19,
      entrega: ['mano'], politica: 'estricta', coberturaMin: 'total',
      badges: ['Pro'], grad: 'ink',
      resumen: 'Cámara y estabilizador en un solo cuerpo, con seguimiento de foco LiDAR. Solo entrega en mano y con una explicación de media hora.',
      incluye: ['Ronin 4D-6K', 'Óptica DL 24 mm', 'LiDAR', '2 baterías TB50', 'Monitor de mano', 'Maleta rígida'],
      noIncluye: ['Ópticas adicionales', 'Transmisión de vídeo'],
      bloqueados: ['2026-09-08', '2026-09-09', '2026-09-10', '2026-09-11', '2026-09-12']
    },
    {
      id: 'manfrotto-kit', cat: 'tripodes', titulo: 'Manfrotto 546B + 504X',
      ciudad: 'Sevilla', barrio: 'Nervión', km: 2.9, dueno: 'diego',
      dia: 14, venta: 720, valor: 1050, nota: 4.8, resenas: 6,
      entrega: ['mano', 'punto'], politica: 'flexible', coberturaMin: 'basico',
      badges: ['Verificado'], grad: 'deep',
      resumen: 'El trípode de aluminio de toda la vida: pesa, pero aguanta viento y no falla. Para exteriores largos es el que me llevo.',
      incluye: ['Patas 546B', 'Cabeza fluida 504X', 'Araña', 'Bolsa'],
      noIncluye: [],
      bloqueados: []
    },
    {
      id: 'inspire3', cat: 'drones', titulo: 'DJI Inspire 3 + Zenmuse X9',
      ciudad: 'Barcelona', barrio: 'Sant Martí', km: 5.7, dueno: 'ivan',
      dia: 240, venta: 0, valor: 18500, nota: 5.0, resenas: 9,
      entrega: ['mano'], politica: 'estricta', coberturaMin: 'total',
      badges: ['Pro'], grad: 'ink',
      resumen: 'Full-frame 8K en el aire. Va con operador incluido en el precio: por valor y por normativa no lo suelto sin piloto.',
      incluye: ['DJI Inspire 3', 'Zenmuse X9-8K Air', '6 baterías TB51', 'Estación de carga', 'Mando RC Plus', 'Óptica DL 35 mm', '2 maletas'],
      noIncluye: ['Permisos de vuelo específicos'],
      bloqueados: ['2026-09-01', '2026-09-02', '2026-09-03', '2026-09-15', '2026-09-16', '2026-09-17']
    },
    {
      id: 'polys-arte', cat: 'arte', titulo: 'Carro de eléctrico y tramoya',
      ciudad: 'Madrid', barrio: 'Villaverde', km: 8.4, dueno: 'pablo',
      dia: 42, venta: 0, valor: 2200, nota: 4.7, resenas: 5,
      entrega: ['mano'], politica: 'moderada', coberturaMin: 'basico',
      badges: [], grad: 'orange',
      resumen: 'El carro que soluciona la parte aburrida: alargadores, regletas, cinta, cuerda, sacos y todo lo que siempre falta.',
      incluye: ['6 alargadores de 25 m', '4 regletas', 'Cinta americana y de papel', 'Cuerda', '8 sacos de arena', 'Herramienta básica', 'Carro'],
      noIncluye: ['Generador'],
      bloqueados: []
    },
    {
      id: 'lumix-s5', cat: 'camaras', titulo: 'Panasonic Lumix S5 II + 20-60',
      ciudad: 'Murcia', barrio: 'Centro', km: 1.4, dueno: 'ainhoa',
      dia: 32, venta: 1490, valor: 2100, nota: 4.8, resenas: 12,
      entrega: ['mano', 'express', 'punto'], politica: 'flexible', coberturaMin: 'basico',
      badges: ['Verificado', 'Envío 24 h'], grad: 'teal',
      resumen: 'Cuerpo muy solvente para empezar: enfoque por detección de fase, 6K abierto y sin límite de grabación. Con la óptica de kit incluida.',
      incluye: ['Lumix S5 II', 'Objetivo 20-60 mm', '3 baterías', 'Cargador', '2 tarjetas SD V90', 'Correa', 'Bolsa acolchada'],
      noIncluye: ['Ópticas adicionales'],
      bloqueados: ['2026-09-07']
    },
    {
      id: 'monitor-eizo', cat: 'otros', titulo: 'Monitor de campo Eizo 17"',
      ciudad: 'Madrid', barrio: 'Salamanca', km: 4.6, dueno: 'carla',
      dia: 35, venta: 0, valor: 3200, nota: 4.9, resenas: 4,
      entrega: ['mano', 'express'], politica: 'moderada', coberturaMin: 'plus',
      badges: ['Verificado'], grad: 'sun',
      resumen: 'Para el puesto de dirección: calibrado, con parasol y patas. Cuando hay cliente en el set, se nota la diferencia.',
      incluye: ['Monitor Eizo 17"', 'Parasol', 'Soporte de suelo', 'Cables SDI y HDMI', 'Fuente de alimentación', 'Flight case'],
      noIncluye: ['Transmisor inalámbrico'],
      bloqueados: ['2026-09-18', '2026-09-19']
    },
    {
      id: 'ursa-12k', cat: 'camaras', titulo: 'Blackmagic URSA Cine 12K',
      ciudad: 'Barcelona', barrio: 'Sants', km: 6.3, dueno: 'ivan',
      dia: 150, venta: 0, valor: 14200, nota: 5.0, resenas: 7,
      entrega: ['mano'], politica: 'estricta', coberturaMin: 'total',
      badges: ['Pro'], grad: 'deep',
      resumen: 'Sensor de 12K y montura PL. Para largo o publicidad grande. Se entrega configurada según la LUT que necesites.',
      incluye: ['URSA Cine 12K', 'Media Module 8 TB', '4 baterías B-Mount', 'Cargador', 'Visor EVF', 'Montura PL y EF', '2 maletas'],
      noIncluye: ['Ópticas', 'Seguimiento de foco'],
      bloqueados: ['2026-09-22', '2026-09-23', '2026-09-24', '2026-09-25']
    }
  ];

  /* Reservas de muestra, para las pantallas de «Mis reservas». */
  const RESERVAS = [
    { id: 'RS-4821', equipo: 'fx3-smallrig',  rol: 'alquilo', estado: 'en_curso',  desde: '2026-08-24', hasta: '2026-08-27', entrega: 'mano',    total: 217.10 },
    { id: 'RS-4790', equipo: 'zoom-f6',       rol: 'alquilo', estado: 'confirmada',desde: '2026-09-02', hasta: '2026-09-04', entrega: 'express', total: 121.40 },
    { id: 'RS-4755', equipo: 'aputure-600d',  rol: 'presto',  estado: 'pendiente', desde: '2026-09-06', hasta: '2026-09-08', entrega: 'punto',   total: 148.00 },
    { id: 'RS-4702', equipo: 'rs4-pro',       rol: 'alquilo', estado: 'cerrada',   desde: '2026-08-11', hasta: '2026-08-13', entrega: 'mano',    total: 79.50 },
    { id: 'RS-4688', equipo: 'sigma-art-set', rol: 'presto',  estado: 'incidencia',desde: '2026-08-05', hasta: '2026-08-09', entrega: 'express', total: 262.30 }
  ];

  const ESTADOS = {
    pendiente:  { texto: 'Pendiente de aceptar', color: '#5A5048' },
    confirmada: { texto: 'Confirmada',           color: '#00706C' },
    en_curso:   { texto: 'En curso',             color: '#00706C' },
    cerrada:    { texto: 'Cerrada',              color: '#8B8078' },
    incidencia: { texto: 'En incidencia',        color: '#A32718' }
  };

  const COBERTURAS = {
    basico: { nombre: 'Básico',  pct: 0,    cubre: 1500,  franquicia: 150, incluido: true,
              detalle: 'Daño accidental y robo con violencia. No cubre pérdida.' },
    plus:   { nombre: 'Plus',    pct: 0.08, cubre: 8000,  franquicia: 300, incluido: false,
              detalle: 'Añade pérdida, daño por agua y arena, y daños en tránsito.' },
    total:  { nombre: 'Total',   pct: 0.12, cubre: 25000, franquicia: 500, incluido: false,
              detalle: 'Añade lucro cesante del propietario mientras se repara.' }
  };

  const ENVIOS = {
    mano:    { nombre: 'Entrega en mano', precio: 0,  plazo: 'Acordáis punto y hora en el chat' },
    punto:   { nombre: 'Punto Filmify',   precio: 8,  plazo: 'Recogida en horario de tienda' },
    express: { nombre: 'Filmify Express', precio: 29, plazo: 'Entrega en 24 h laborables' }
  };

  const POLITICAS = {
    flexible: { nombre: 'Flexible', texto: 'Devolución del 100 % hasta 24 h antes del inicio.' },
    moderada: { nombre: 'Moderada', texto: 'Devolución del 100 % hasta 5 días antes; 50 % después.' },
    estricta: { nombre: 'Estricta', texto: 'Devolución del 50 % hasta 7 días antes; sin devolución después.' }
  };

  // Comisión del inquilino sobre el importe del alquiler
  const COMISION_INQUILINO = 0.06;

  const GRAD = {
    teal:   ['#00A6A0', '#00504E'],
    orange: ['#E85122', '#7E2408'],
    deep:   ['#00706C', '#012F2E'],
    ink:    ['#332C27', '#0E0D0C'],
    sun:    ['#FFA673', '#C93C0F']
  };

  /* ---------------------------------------------------------- utilidades */

  const cat = k => CATS.find(c => c.key === k);
  const dueno = k => DUENOS[k];
  const equipo = id => EQUIPOS.find(e => e.id === id);

  const eur = n => (Math.round(n * 100) / 100)
    .toLocaleString('es-ES', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' €';

  const num = n => n.toLocaleString('es-ES');

  const dias = (desde, hasta) => {
    const a = new Date(desde), b = new Date(hasta);
    return Math.max(1, Math.round((b - a) / 86400000));
  };

  const fechaCorta = iso => {
    const d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).replace('.', '');
  };

  /* Descuentos por duración: una semana y un mes salen mejor de precio. */
  const precioAlquiler = (eq, nDias) => {
    let pct = 0;
    if (nDias >= 28) pct = 0.35;
    else if (nDias >= 7) pct = 0.20;
    else if (nDias >= 4) pct = 0.10;
    return { bruto: eq.dia * nDias, descuento: eq.dia * nDias * pct, pct };
  };

  /* El depósito se preautoriza, no se cobra: 20 % del valor de reposición
     con cobertura básica, menos cuanto mayor sea la cobertura contratada. */
  const deposito = (eq, cobertura) => {
    const factor = { basico: 0.20, plus: 0.15, total: 0.10 }[cobertura] || 0.20;
    return Math.round(eq.valor * factor / 10) * 10;
  };

  const desglose = (eq, nDias, entrega, cobertura) => {
    const p = precioAlquiler(eq, nDias);
    const alquiler = p.bruto - p.descuento;
    const cov = COBERTURAS[cobertura];
    const seguro = alquiler * cov.pct;
    const envio = ENVIOS[entrega].precio * (entrega === 'mano' ? 0 : 1);
    const comision = alquiler * COMISION_INQUILINO;
    return {
      dias: nDias, bruto: p.bruto, descuento: p.descuento, pctDescuento: p.pct,
      alquiler, seguro, envio, comision,
      total: alquiler + seguro + envio + comision,
      deposito: deposito(eq, cobertura)
    };
  };

  return {
    CATS, CIUDADES, DUENOS, EQUIPOS, RESERVAS, ESTADOS,
    COBERTURAS, ENVIOS, POLITICAS, GRAD, COMISION_INQUILINO,
    cat, dueno, equipo, eur, num, dias, fechaCorta,
    precioAlquiler, deposito, desglose
  };
})();
