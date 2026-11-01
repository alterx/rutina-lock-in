'use strict';

/* ---------- Rutina (del PDF "Guía y plantilla: The Great Lock In") ---------- */

const BANDS = ['Extra ligera', 'Ligera', 'Media', 'Fuerte', 'Extra fuerte'];

// kind: w = mancuernas (lb), b = banda, wb = peso + banda, bw = peso corporal (lb opcional), t = tiempo (s)
const SESSIONS = {
  1: { name: 'Full Body A', day: 'Lunes', ex: [
    { id: 'goblet', pat: 'Squat', name: 'Goblet Squat', tech: 'Mancuerna vertical al pecho. Codos entre rodillas. Profundidad controlada.', sets: 3, reps: [10, 12], kind: 'w',
      band: 'Párate sobre la liga con los pies al ancho de hombros. Sostén los extremos frente a los hombros, codos al frente, y baja controlada.',
      both: 'Mancuerna al pecho y una liga ligera arriba de las rodillas. Empuja las rodillas hacia afuera al bajar.' },
    { id: 'rdl', pat: 'Hinge', name: 'Peso Muerto Rumano (RDL)', tech: '2 mancuernas. Empuja la cadera hacia atrás. Espalda neutra.', sets: 3, reps: [10, 12], kind: 'w',
      band: 'Pisa la liga con ambos pies y sostén los extremos con los brazos estirados. Empuja la cadera hacia atrás y aprieta glúteos al subir.',
      both: 'Pisa la liga y sostén los extremos junto con las mancuernas. La liga añade tensión arriba: aprieta glúteos al final.' },
    { id: 'floorpress', pat: 'Push', name: 'Floor Press con mancuernas', tech: 'Acostada en mat. Codos a 45° del torso. Empuja recto al techo.', sets: 3, reps: [10, 12], kind: 'w',
      band: 'Pasa la liga por debajo de la espalda, a la altura de las axilas, y sostén un extremo en cada mano. Empuja recto al techo.',
      both: 'Liga por debajo de la espalda y sus extremos enrollados en las manos junto con las mancuernas.' },
    { id: 'remo45', pat: 'Pull', name: 'Remo inclinado con mancuernas', tech: 'Torso a 45°. Tira con los codos hacia la cadera apretando dorsales.', sets: 3, reps: [12, 12], kind: 'w',
      band: 'Pisa la liga con ambos pies, torso a 45°, y jala los extremos con los codos hacia la cadera.',
      both: 'Pisa la liga y sostén los extremos junto con las mancuernas. Jala con los codos hacia la cadera.' },
    { id: 'hipthrust', pat: 'Thrust', name: 'Glute Bridge / Hip Thrust en mat', tech: 'Banda arriba de rodillas + mancuerna pesada en pelvis. Pausa 2 s arriba.', sets: 4, optional: 1, reps: [12, 15], kind: 'wb' },
    { id: 'abdsentada', pat: 'Abduction', name: 'Abducciones sentada con banda', tech: '15 reps inclinada hacia adelante + 15 reps con torso erguido, continuo.', sets: 3, reps: [30, 30], kind: 'b' },
    { id: 'plancha', pat: 'Core', name: 'Plancha frontal', tech: 'Glúteos y abdomen apretados, sin colapsar la zona lumbar.', sets: 3, reps: [45, 45], kind: 't' },
  ] },
  2: { name: 'Full Body B', day: 'Miércoles', ex: [
    { id: 'bulgara', pat: 'Squat', name: 'Sentadilla Búlgara / Split Squat', tech: 'Torso inclinado 15° adelante para cargar el glúteo delantero.', sets: 3, reps: [8, 10], per: 'pierna', kind: 'w',
      band: 'Pisa la liga con el pie de adelante y sostén los extremos a los lados de la cadera.',
      both: 'Pisa la liga con el pie de adelante y sostén los extremos junto con las mancuernas.' },
    { id: 'bstance', pat: 'Hinge', name: 'B-Stance RDL (unilateral)', tech: '90% del peso en la pierna delantera, pie trasero en punta como apoyo.', sets: 3, reps: [10, 10], per: 'pierna', kind: 'w',
      band: 'Pisa la liga con el pie de adelante y sostén los extremos con los brazos estirados. Cadera hacia atrás, espalda neutra.',
      both: 'Pisa la liga con el pie de adelante y sostén los extremos junto con las mancuernas.' },
    { id: 'pressmilitar', pat: 'Push', name: 'Press militar arrodillada', tech: 'De rodillas en el mat para aislar deltoides y activar core y glúteo.', sets: 3, reps: [10, 12], kind: 'w',
      band: 'Arrodillada, pasa la liga por debajo de las rodillas y empuja los extremos hacia arriba desde los hombros.',
      both: 'Liga por debajo de las rodillas y sus extremos sostenidos junto con las mancuernas.' },
    { id: 'remouni', pat: 'Pull', name: 'Remo unilateral apoyada + curl de bíceps', tech: 'Remo pesado apoyando la rodilla en el mat, seguido de curl de pie.', sets: 3, reps: [10, 12], per: 'brazo', kind: 'w',
      band: 'Remo: pisa la liga con el pie del lado contrario y jala con el codo hacia la cadera. Curl: pisa la liga con ambos pies y sube con las palmas al frente.',
      both: 'Pisa la liga y sostén el extremo junto con la mancuerna, tanto en el remo como en el curl.' },
    { id: 'frogpumps', pat: 'Thrust', name: 'Frog Pumps con banda y mancuerna', tech: 'Plantas de los pies juntas en el mat, rodillas abiertas hacia los lados.', sets: 3, reps: [15, 20], kind: 'wb' },
    { id: 'clamshells', pat: 'Abduction', name: 'Clamshells (almejas) con banda', tech: 'Acostada de lado en el mat. Abre la rodilla de arriba sin rotar la pelvis.', sets: 3, reps: [15, 20], per: 'pierna', kind: 'b' },
    { id: 'deadbugs', pat: 'Core', name: 'Deadbugs (bicho muerto)', tech: 'Espalda baja pegada al suelo. Movimiento cruzado lento.', sets: 3, reps: [12, 12], per: 'lado', kind: 'bw' },
  ] },
  3: { name: 'Full Body C', day: 'Viernes', ex: [
    { id: 'sumo', pat: 'Squat', name: 'Sentadilla Sumo con mancuerna', tech: 'Pies más abiertos que el ancho de hombros, puntas a 45°.', sets: 3, reps: [12, 15], kind: 'w',
      band: 'Pisa la liga con los pies abiertos, puntas a 45°, y sostén los extremos frente al pecho.',
      both: 'Mancuerna colgando entre las piernas y una liga ligera arriba de las rodillas. Empuja las rodillas hacia afuera.' },
    { id: 'goodmorning', pat: 'Hinge', name: 'Good Mornings con banda pisada', tech: 'Pisa la banda con los pies y pásala tras el cuello. Bisagra de cadera.', sets: 3, reps: [12, 15], kind: 'b' },
    { id: 'pushupext', pat: 'Push', name: 'Push-ups + extensión copa de tríceps', tech: 'Flexiones en rodillas + extensión tras la nuca con mancuerna a 2 manos.', sets: 3, reps: [10, 12], kind: 'w',
      band: 'Flexiones: pasa la liga por la espalda y sujeta un extremo bajo cada mano. Extensión: pisa la liga detrás de ti y extiende los brazos sobre la cabeza.',
      both: 'Flexiones con la liga por la espalda; la extensión de tríceps con la mancuerna como siempre.' },
    { id: 'pullaparts', pat: 'Pull', name: 'Band Pull-Aparts / remo al pecho', tech: 'Separa la banda tensa llevando las manos hacia afuera al nivel del pecho.', sets: 3, reps: [15, 15], kind: 'b' },
    { id: 'slbridge', pat: 'Thrust', name: 'Single-Leg Glute Bridge', tech: 'Un pie firme en el suelo, empuja con el talón. La otra pierna a 90°.', sets: 3, reps: [10, 12], per: 'pierna', kind: 'bw' },
    { id: 'legraise', pat: 'Abduction', name: 'Side-Lying Leg Raise con banda', tech: 'De lado en el mat, pierna completamente estirada subiendo hacia el techo.', sets: 3, reps: [15, 15], per: 'pierna', kind: 'b' },
    { id: 'planchalat', pat: 'Core', name: 'Plancha lateral', tech: 'Cuerpo en línea recta. Mantén activos el glúteo medio y los oblicuos.', sets: 3, reps: [30, 30], per: 'lado', kind: 't' },
  ] },
};
// Búsquedas de YouTube para ver la técnica (una búsqueda no se rompe si un video desaparece).
// [etiqueta, búsqueda]; `band` es la búsqueda para hacerlo con liga.
const VIDEOS = {
  goblet: { main: [['Ver video', 'goblet squat técnica']], band: 'sentadilla con banda elástica técnica' },
  rdl: { main: [['Ver video', 'peso muerto rumano con mancuernas técnica']], band: 'peso muerto rumano con banda elástica' },
  floorpress: { main: [['Ver video', 'floor press con mancuernas técnica']], band: 'press de pecho en el suelo con banda elástica' },
  remo45: { main: [['Ver video', 'remo inclinado con mancuernas técnica']], band: 'remo inclinado con banda elástica' },
  hipthrust: { main: [['Ver video', 'hip thrust en el suelo con mancuerna y banda']] },
  abdsentada: { main: [['Ver video', 'abducción de cadera sentada con banda']] },
  plancha: { main: [['Ver video', 'plancha frontal técnica correcta']] },
  bulgara: { main: [['Ver video', 'sentadilla búlgara con mancuernas técnica glúteo']], band: 'sentadilla búlgara con banda elástica' },
  bstance: { main: [['Ver video', 'b stance rdl con mancuernas técnica']], band: 'b stance rdl con banda elástica' },
  pressmilitar: { main: [['Ver video', 'press militar arrodillado con mancuernas']], band: 'press de hombro arrodillado con banda elástica' },
  remouni: { main: [['Remo', 'remo unilateral con mancuerna apoyado técnica'], ['Curl', 'curl de bíceps con mancuernas técnica']], band: 'remo unilateral y curl con banda elástica' },
  frogpumps: { main: [['Ver video', 'frog pumps glúteo con banda']] },
  clamshells: { main: [['Ver video', 'clamshell con banda técnica']] },
  deadbugs: { main: [['Ver video', 'dead bug ejercicio técnica']] },
  sumo: { main: [['Ver video', 'sentadilla sumo con mancuerna técnica']], band: 'sentadilla sumo con banda elástica' },
  goodmorning: { main: [['Ver video', 'good morning con banda elástica técnica']] },
  pushupext: { main: [['Flexiones', 'flexiones de rodillas técnica'], ['Extensión', 'extensión de tríceps tras nuca con mancuerna']], band: 'flexiones con banda y extensión de tríceps con banda elástica' },
  pullaparts: { main: [['Ver video', 'band pull apart técnica']] },
  slbridge: { main: [['Ver video', 'puente de glúteo a una pierna técnica']] },
  legraise: { main: [['Ver video', 'elevación lateral de pierna acostada con banda']] },
  planchalat: { main: [['Ver video', 'plancha lateral técnica']] },
};
const ytSearch = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);

const ALL_EX = Object.entries(SESSIONS).flatMap(([s, ses]) => ses.ex.map(e => ({ ...e, s: +s })));
const EX_BY_ID = Object.fromEntries(ALL_EX.map(e => [e.id, e]));

// getDay(): 0 = domingo
const WEEK = [
  { type: 'rest', title: 'Descanso total', text: 'Descanso del sistema nervioso. Hoy toca tu check-in semanal (5 minutos).' },
  { type: 'lift', s: 1 },
  { type: 'ruck', title: 'Rucking', text: '5 km / 60 min con la mochila de 12 lb.', km: 5, min: 60, lb: 12 },
  { type: 'lift', s: 2 },
  { type: 'ruck', title: 'Rucking', text: '5 km / 60 min con la mochila de 12 lb.', km: 5, min: 60, lb: 12 },
  { type: 'lift', s: 3 },
  { type: 'ruck', title: 'Recuperación activa', text: 'Rucking suave o caminata ligera sin peso.', km: 3, min: 40, lb: 0 },
];
const DAY_SHORT = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

const PROGRESSION = [
  { t: 'Calibración y técnica', d: 'Encuentra el peso donde las últimas 2 repeticiones de cada serie cuesten trabajo pero sin perder la forma.' },
  { t: 'Aumento de repeticiones', d: 'Con el mismo peso, llega al tope del rango (si hiciste 10, busca 12) antes de subir.' },
  { t: 'Tiempo bajo tensión', d: 'Añade 1 segundo extra de pausa arriba en todos los ejercicios de Thrust y Abduction.' },
  { t: 'Incremento de carga', d: 'Arma las mancuernas con un disco adicional de 3 lb o pasa a la siguiente banda.' },
];

const PROTEIN = [
  '25 g+ de proteína en el desayuno, antes de las 10 am.',
  'Suma una comida con la proteína primero: desayuno y comida.',
  'Proteína primero en todas las comidas.',
  'Semana de Thanksgiving: la mitad del primer plato, pavo y verduras. Luego disfruta.',
];

/* ---------- Fechas ---------- */

const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return iso(d); };
const todayISO = () => iso(new Date());
const mondayOf = s => { const d = parse(s); return addDays(s, -((d.getDay() + 6) % 7)); };
const daysBetween = (a, b) => Math.round((parse(b) - parse(a)) / 864e5);
const fmtShort = s => parse(s).toLocaleDateString('es', { day: 'numeric', month: 'short' }).replace('.', '');
const fmtLong = s => parse(s).toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' });

function defaultStart() {
  const t = todayISO();
  return parse(t).getDay() === 0 ? addDays(t, 1) : mondayOf(t);
}
function blockWeek(date) {
  return Math.floor(daysBetween(S.start, date) / 7) + 1;
}

/* ---------- Estado (solo en este dispositivo) ---------- */

const KEY = 'lockin-rutina-v1';
const defaultState = () => ({ v: 1, start: defaultStart(), workouts: [], rucks: [], checkins: {} });
let S = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) { /* almacenamiento bloqueado o dañado */ }
  return defaultState();
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch (e) { toast('No se pudo guardar en este dispositivo. Exporta un respaldo.'); }
}
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = v => { const n = parseFloat(String(v).replace(',', '.')); return Number.isFinite(n) ? n : null; };

const sortedWorkouts = () => [...S.workouts].sort((a, b) => a.date.localeCompare(b.date) || a.created - b.created);
const findWorkout = id => S.workouts.find(w => w.id === id);

function blankLog(ex) {
  return { load: '', band: '', sets: Array.from({ length: ex.sets }, () => ({ v: '', ok: false })) };
}
function newWorkout(s, date) {
  const w = { id: uid(), s, date, created: Date.now(), done: false, note: '', log: {} };
  for (const ex of SESSIONS[s].ex) w.log[ex.id] = blankLog(ex);
  S.workouts.push(w);
  save();
  return w;
}
function nextInOrder() {
  const done = sortedWorkouts().filter(w => w.done);
  return done.length ? (done[done.length - 1].s % 3) + 1 : 1;
}
function lastLog(exId, w) {
  const list = sortedWorkouts().filter(x => x.id !== w.id && x.log[exId] && x.date <= w.date && hasData(x.log[exId]));
  const prev = list[list.length - 1];
  return prev ? { date: prev.date, ...prev.log[exId] } : null;
}
const hasData = l => l && (l.load !== '' || l.band || l.sets.some(s => s.ok || s.v !== ''));

// Ejercicios de mancuerna que también se pueden hacer con liga o con ambas.
const MODES = [['w', 'Mancuerna'], ['b', 'Liga'], ['wb', 'Ambas']];
const canSwap = ex => ex.kind === 'w';
const modeOf = (ex, l) => (canSwap(ex) && l && l.mode) || ex.kind;

function setsText(ex, l) {
  return l.sets.filter(s => s.ok || s.v !== '').map(s => s.v === '' ? '✓' : s.v).join(' · ') || '—';
}
function loadText(ex, l) {
  const parts = [];
  const m = modeOf(ex, l);
  if (num(l.load) !== null && m !== 'b' && m !== 't') parts.push(`${num(l.load)} lb`);
  if (l.band && (m === 'b' || m === 'wb')) parts.push(`liga ${l.band.toLowerCase()}`);
  if (!parts.length && m === 'bw') parts.push('peso corporal');
  return parts.join(' + ');
}
function targetText(ex) {
  const [lo, hi] = ex.reps;
  const sets = ex.optional ? `${ex.sets - ex.optional}–${ex.sets}` : ex.sets;
  const r = lo === hi ? lo : `${lo}–${hi}`;
  return `${sets} × ${r}${ex.kind === 't' ? ' s' : ''}${ex.per ? ' / ' + ex.per : ''}`;
}

function suggestion(ex, last, week) {
  const tempo = week === 3 && (ex.pat === 'Thrust' || ex.pat === 'Abduction') ? ' Esta semana: +1 s de pausa arriba.' : '';
  if (!last) return 'Primera vez: busca un peso o liga donde las últimas 2 reps cuesten trabajo.' + tempo;
  const m = modeOf(ex, last);
  const req = last.sets.slice(0, ex.sets - (ex.optional || 0));
  const allDone = req.every(s => s.ok);
  const top = allDone && req.every(s => (num(s.v) ?? 0) >= ex.reps[1]);
  if (m === 't') return (top ? 'Llegaste al tiempo completo: prueba +5–10 s.' : 'Mismo tiempo, cuida la forma.') + tempo;
  if (!top) return (week === 4 && allDone ? 'Semana de carga: si la forma está bien, sube un poco.' : 'Mismo peso, busca +1–2 reps.') + tempo;
  if (m === 'b') {
    const i = BANDS.indexOf(last.band);
    return (i >= 0 && i < BANDS.length - 1 ? `Completaste el rango: prueba la liga ${BANDS[i + 1].toLowerCase()}.` : 'Completaste el rango: añade 1 s de pausa.') + tempo;
  }
  const l = num(last.load);
  if (l !== null && l > 0) return `Completaste el rango: sube a ${l + 3} lb (+1 disco).` + tempo;
  return 'Completaste el rango: añade peso o pausa más larga.' + tempo;
}

/* ---------- UI comunes ---------- */

const view = document.getElementById('view');
const ICON_CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

let toastT;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 2600);
}

function weekchip() {
  const wk = blockWeek(todayISO());
  const el = document.getElementById('weekchip');
  if (wk < 1) el.innerHTML = `Empieza el <b>${fmtShort(S.start)}</b>`;
  else if (wk > 4) el.innerHTML = `Bloque terminado · semana <b>${wk}</b>`;
  else el.innerHTML = `Semana <b>${wk}</b> de 4`;
}

function chart(pts, { fmt = v => v } = {}) {
  if (pts.length < 2) return '<p class="empty">La gráfica aparece cuando haya al menos dos registros.</p>';
  const w = 340, h = 150, pr = 14, pt = 16, pb = 24;
  const ys = pts.map(p => p.y);
  const dmin = Math.min(...ys), dmax = Math.max(...ys);
  let lo = dmin, hi = dmax;
  if (lo === hi) { lo -= 1; hi += 1; }
  const pad = (hi - lo) * 0.15; lo -= pad; hi += pad;
  const ticks = [...new Set([dmin, dmax, ...(dmax - dmin > 2 ? [Math.round((dmin + dmax) / 2)] : [])])];
  const pl = Math.max(28, Math.max(...ticks.map(t => String(fmt(t)).length)) * 6.2 + 10);
  const X = i => pl + (w - pl - pr) * (i / (pts.length - 1));
  const Y = v => pt + (h - pt - pb) * (1 - (v - lo) / (hi - lo));
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(p.y).toFixed(1)}`).join('');
  const area = `${line}L${X(pts.length - 1).toFixed(1)},${h - pb}L${X(0).toFixed(1)},${h - pb}Z`;
  const last = pts[pts.length - 1];
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Progreso">
    ${ticks.map(t => `<line class="grid" x1="${pl}" x2="${w - pr}" y1="${Y(t)}" y2="${Y(t)}"/><text x="${pl - 6}" y="${Y(t) + 3.5}" text-anchor="end">${esc(fmt(t))}</text>`).join('')}
    <path class="ar" d="${area}"/><path class="ln" d="${line}"/>
    ${pts.map((p, i) => `<circle class="pt${i === pts.length - 1 ? ' end' : ''}" cx="${X(i)}" cy="${Y(p.y)}" r="${i === pts.length - 1 ? 4.5 : 3}"/>`).join('')}
    <text x="${pl}" y="${h - 6}">${esc(fmtShort(pts[0].x))}</text>
    <text x="${w - pr}" y="${h - 6}" text-anchor="end">${esc(fmtShort(last.x))}</text>
  </svg>`;
}

/* ---------- Hoy ---------- */

function renderHoy() {
  const t = todayISO();
  const dow = parse(t).getDay();
  const plan = WEEK[dow];
  const wk = Math.min(Math.max(blockWeek(t), 1), 4);
  const mon = mondayOf(t);

  const strip = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(mon, i);
    const p = WEEK[parse(d).getDay()];
    let cls = p.type === 'lift' ? 's' + p.s : p.type, done = false;
    if (p.type === 'lift') done = S.workouts.some(w => w.date === d && w.done);
    if (p.type === 'ruck') done = S.rucks.some(r => r.date === d);
    if (p.type === 'rest') done = !!S.checkins[mon] && d === addDays(mon, 6) && checkinFilled(S.checkins[mon]);
    return `<div class="day${d === t ? ' is-today' : ''}"><span>${DAY_SHORT[parse(d).getDay()]}</span><span class="dot ${cls}${done ? ' done' : ''}">${done ? ICON_CHECK : ''}</span></div>`;
  }).join('');

  let main = '';
  if (plan.type === 'lift') {
    const ses = SESSIONS[plan.s];
    const existing = S.workouts.find(w => w.date === t && w.s === plan.s);
    const label = existing ? (existing.done ? 'Ver sesión' : 'Continuar sesión') : `Empezar Sesión ${plan.s}`;
    main = `<section class="card s${plan.s}">
      <div class="spread"><span class="pill">Sesión ${plan.s} · ${ses.name}</span>${existing && existing.done ? '<span class="pill ok">Hecha</span>' : ''}</div>
      <ul class="exlist">${ses.ex.map(e => `<li><span class="pat">${e.pat}</span><span>${esc(e.name)}</span><span class="tgt">${targetText(e)}</span></li>`).join('')}</ul>
      <button class="btn block" data-act="start" data-s="${plan.s}">${label}</button>
    </section>`;
  } else if (plan.type === 'ruck') {
    main = ruckCard(t, plan);
  } else {
    const ci = S.checkins[mon];
    main = `<section class="card rest">
      <span class="pill">Descanso</span>
      <p>Tómate el día. Antes de dormir, llena tu check-in: qué salió bien, qué estorbó y tu único enfoque para la semana.</p>
      <a class="btn block" href="#checkin">${ci && checkinFilled(ci) ? 'Ver check-in' : 'Hacer check-in'}</a>
    </section>`;
  }

  const nxt = nextInOrder();
  const others = `<section class="stack">
    <div class="section-head"><h2>¿Otra sesión?</h2><span class="small muted">Siguiente en orden: <b>Sesión ${nxt}</b></span></div>
    <p class="small muted">Si te saltaste un día, haz la siguiente sesión en orden. No dobles sesiones el mismo día.</p>
    <div class="otherses">${[1, 2, 3].map(s => `<button class="btn s${s}${s === nxt ? ' next' : ''}" data-act="start" data-s="${s}">Sesión ${s}<small>${SESSIONS[s].day}</small></button>`).join('')}</div>
  </section>`;

  view.innerHTML = `
    <section class="today stack">
      <p class="eyebrow">${esc(fmtLong(t))}</p>
      <h1>${plan.type === 'lift' ? `Sesión ${plan.s}: ${SESSIONS[plan.s].name}` : esc(plan.title)}</h1>
      <p class="plan">${plan.type === 'lift' ? 'Fuerza y enfoque en glúteo. Completa todas las series de un ejercicio antes de pasar al siguiente.' : esc(plan.text)}</p>
    </section>
    <div class="weekstrip" aria-label="Esta semana">${strip}</div>
    ${main}
    <section class="notes">
      <div class="note s2"><p class="eyebrow">Semana ${wk} · ${PROGRESSION[wk - 1].t}</p><p class="small">${PROGRESSION[wk - 1].d}</p></div>
      <div class="note s3"><p class="eyebrow">Proteína esta semana</p><p class="small">${PROTEIN[wk - 1]}</p></div>
    </section>
    ${plan.type === 'lift' ? '' : others}
    ${plan.type === 'ruck' ? '' : `<details class="card ruck"><summary><b>Registrar rucking o caminata</b></summary>${ruckForm(t, WEEK[2])}</details>`}
  `;
  if (plan.type === 'lift') view.insertAdjacentHTML('beforeend', others);
}

function ruckForm(date, plan) {
  return `<form class="ruckform" data-form="ruck">
    <label class="field wide">Fecha<input type="date" name="date" value="${date}" required></label>
    <label class="field">Km<input name="km" inputmode="decimal" value="${plan.km ?? 5}"></label>
    <label class="field">Minutos<input name="min" inputmode="numeric" value="${plan.min ?? 60}"></label>
    <label class="field">Peso (lb)<input name="lb" inputmode="decimal" value="${plan.lb ?? 12}"></label>
    <button class="btn wide" type="submit">Guardar</button>
  </form>`;
}
function ruckCard(t, plan) {
  const today = S.rucks.filter(r => r.date === t);
  return `<section class="card ruck">
    <div class="spread"><span class="pill">${esc(plan.title)}</span>${today.length ? '<span class="pill ok">Registrado</span>' : ''}</div>
    ${today.length ? `<ul class="loglist">${today.map(ruckItem).join('')}</ul>` : ''}
    ${ruckForm(t, plan)}
  </section>`;
}
const ruckItem = r => `<li><span><b>${num(r.km) ?? '—'} km</b> · ${num(r.min) ?? '—'} min · ${num(r.lb) ? num(r.lb) + ' lb' : 'sin peso'} <span class="muted small">· ${fmtShort(r.date)}</span></span><button class="linkbtn small" data-act="del-ruck" data-id="${r.id}">Borrar</button></li>`;

/* ---------- Sesión ---------- */

function renderSesion(id) {
  const w = findWorkout(id);
  if (!w) { location.hash = '#hoy'; return; }
  const ses = SESSIONS[w.s];
  const wk = Math.min(Math.max(blockWeek(w.date), 1), 4);
  view.innerHTML = `
    <section class="sess-head s${w.s}">
      <p class="eyebrow">Sesión ${w.s} · ${ses.name} · Semana ${wk}</p>
      <h1>${w.done ? 'Sesión completada' : 'A entrenar'}</h1>
      <label class="field">Fecha<input type="date" data-f="date" value="${w.date}"></label>
      <div class="tempo"><span>3 s bajando</span><span>1–2 s pausa</span><span>Subida potente</span><span>Descanso 60–90 s</span></div>
    </section>
    ${ses.ex.map(ex => exCard(w, ex, wk)).join('')}
    <section class="stack s${w.s}">
      <label class="field">Notas de la sesión<textarea data-f="note" rows="3" placeholder="Cómo te sentiste, molestias, cambios…">${esc(w.note)}</textarea></label>
      <button class="btn block" data-act="finish">${w.done ? 'Guardar cambios' : 'Terminar sesión'}</button>
      <div class="confirm-row" id="del-zone"><button class="btn danger sm" data-act="del-workout">Borrar esta sesión</button></div>
    </section>`;
}

const ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7.5v9l7.5-4.5z"/></svg>';
function videoLinks(ex, m) {
  const v = VIDEOS[ex.id];
  if (!v) return '';
  const links = m === 'b' ? [] : [...v.main];
  if ((m === 'b' || m === 'wb') && v.band) links.push([m === 'b' ? 'Video con liga' : 'Con liga', v.band]);
  return `<div class="vids">${links.map(([t, q]) => `<a class="vid" href="${ytSearch(q)}" target="_blank" rel="noopener">${ICON_PLAY}${esc(t)}</a>`).join('')}</div>`;
}

function exCard(w, ex, wk) {
  const l = w.log[ex.id] || (w.log[ex.id] = blankLog(ex));
  const last = lastLog(ex.id, w);
  if (canSwap(ex) && !l.mode) l.mode = (last && last.mode) || 'w';
  const m = modeOf(ex, l);
  const usesLoad = m === 'w' || m === 'wb' || m === 'bw';
  const usesBand = m === 'b' || m === 'wb';
  const unit = ex.kind === 't' ? 'seg' : 'reps';
  const complete = l.sets.slice(0, ex.sets - (ex.optional || 0)).every(s => s.ok);
  return `<section class="ex s${w.s}${complete ? ' complete' : ''}" data-ex="${ex.id}">
    <div class="ex-top"><span class="pat">${ex.pat}</span><span class="tgt">${targetText(ex)}</span></div>
    <h3>${esc(ex.name)}</h3>
    <details><summary>Técnica</summary><p>${esc(ex.tech)}</p></details>
    ${videoLinks(ex, m)}
    <div class="lastbox">
      ${last ? `<span class="muted">Última vez (${fmtShort(last.date)}): <b>${esc(loadText(ex, last) || '—')}</b> · ${esc(setsText(ex, last))}</span>` : ''}
      <span class="hint">${esc(suggestion(ex, last, wk))}</span>
    </div>
    ${canSwap(ex) ? `<div class="modes" role="group" aria-label="Con qué lo haces">${MODES.map(([k, t]) => `<button class="mode" data-act="mode" data-mode="${k}" aria-pressed="${m === k}">${t}</button>`).join('')}</div>` : ''}
    ${m === 'b' && ex.band ? `<p class="howto"><b>Con liga:</b> ${esc(ex.band)}</p>` : ''}
    ${m === 'wb' && ex.both ? `<p class="howto"><b>Mancuerna + liga:</b> ${esc(ex.both)}</p>` : ''}
    ${usesLoad ? `<div class="load">
      <button class="btn soft step" data-act="step" data-d="-3" aria-label="Quitar 3 lb">−3</button>
      <div class="val"><input data-f="load" inputmode="decimal" placeholder="${ex.kind === 'bw' ? '0' : (last && num(last.load) !== null ? num(last.load) : '—')}" value="${esc(l.load)}" aria-label="Peso en libras"><span class="unit">lb</span></div>
      <button class="btn soft step" data-act="step" data-d="3" aria-label="Añadir 3 lb">+3</button>
    </div>
    <p class="plates">${m === 'bw' ? 'Opcional: deja vacío si es solo peso corporal.' : 'Peso por mancuerna. Cada disco = 3 lb.'}</p>` : ''}
    ${usesBand ? `<div class="chips" role="group" aria-label="Liga">${BANDS.map(b => `<button class="chip" data-act="band" data-band="${b}" aria-pressed="${l.band === b}">${b}</button>`).join('')}</div>` : ''}
    <ol class="sets">${l.sets.map((s, i) => {
      const ph = last && last.sets[i] && last.sets[i].v !== '' ? last.sets[i].v : ex.reps[0];
      const opt = ex.optional && i >= ex.sets - ex.optional;
      return `<li class="set"><span class="lbl">S${i + 1}${opt ? '<small>opcional</small>' : ''}</span>
        <input data-f="set" data-i="${i}" inputmode="numeric" placeholder="${esc(ph)} ${unit}" value="${esc(s.v)}" aria-label="Serie ${i + 1} ${unit}">
        <button class="check" data-act="set" data-i="${i}" aria-pressed="${s.ok}" aria-label="Serie ${i + 1} hecha">${ICON_CHECK}</button></li>`;
    }).join('')}</ol>
  </section>`;
}

/* ---------- Temporizador de descanso ---------- */

let timerEnd = 0, timerInt = null;
const timerEl = document.getElementById('timer');
function startTimer(sec) {
  timerEnd = Date.now() + sec * 1000;
  timerEl.hidden = false; timerEl.classList.remove('done');
  clearInterval(timerInt);
  tickTimer(); timerInt = setInterval(tickTimer, 250);
}
function tickTimer() {
  const left = Math.max(0, Math.round((timerEnd - Date.now()) / 1000));
  document.getElementById('timer-time').textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
  if (left === 0) {
    clearInterval(timerInt);
    timerEl.classList.add('done');
    document.querySelector('.timer-label').textContent = '¡Siguiente serie!';
    try { navigator.vibrate && navigator.vibrate([200, 100, 200]); } catch (e) {}
    beep();
    setTimeout(() => { if (timerEl.classList.contains('done')) stopTimer(); }, 4000);
  } else {
    document.querySelector('.timer-label').textContent = 'Descanso';
  }
}
function stopTimer() { clearInterval(timerInt); timerEl.hidden = true; }
let audioCtx;
function beep() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.frequency.value = 880; g.gain.value = 0.15;
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + 0.35);
  } catch (e) {}
}
document.getElementById('timer-skip').addEventListener('click', stopTimer);
document.getElementById('timer-plus').addEventListener('click', () => { timerEnd = Math.max(timerEnd, Date.now()) + 15000; timerEl.classList.remove('done'); clearInterval(timerInt); timerInt = setInterval(tickTimer, 250); tickTimer(); });

/* ---------- Progreso ---------- */

let progEx = 'goblet';
function metricFor(ex, l) {
  if (ex.kind === 'b') { const i = BANDS.indexOf(l.band); return i >= 0 ? i : null; }
  if (ex.kind === 't') { const v = l.sets.map(s => num(s.v)).filter(v => v !== null); return v.length ? Math.max(...v) : null; }
  const ld = num(l.load);
  if (ld !== null && ld > 0 && modeOf(ex, l) !== 'b') return ld;
  if (ex.kind === 'bw') { const v = l.sets.map(s => num(s.v)).filter(v => v !== null); return v.length ? Math.max(...v) : null; }
  return null;
}

function renderProgreso() {
  const ws = sortedWorkouts();
  const doneCount = ws.filter(w => w.done).length;
  const km = S.rucks.reduce((a, r) => a + (num(r.km) || 0), 0);
  const ex = EX_BY_ID[progEx];
  const rows = ws.filter(w => w.log[ex.id] && hasData(w.log[ex.id])).map(w => ({ date: w.date, l: w.log[ex.id] }));
  const pts = rows.map(r => ({ x: r.date, y: metricFor(ex, r.l) })).filter(p => p.y !== null);
  const usesLb = ex.kind === 'w' || ex.kind === 'wb' || (ex.kind === 'bw' && rows.some(r => num(r.l.load) > 0));
  const fmt = ex.kind === 'b' ? (v => BANDS[v] || '') : ex.kind === 't' ? (v => `${v} s`) : usesLb ? (v => `${v} lb`) : (v => `${v}`);
  const metricName = ex.kind === 'b' ? 'Liga usada' : ex.kind === 't' ? 'Mejor tiempo por sesión' : usesLb ? 'Peso por mancuerna' : 'Mejores reps por sesión';
  const ckeys = Object.keys(S.checkins).sort();
  const energy = ckeys.map(k => ({ x: k, y: num(S.checkins[k].energy) })).filter(p => p.y !== null);
  const sleep = ckeys.map(k => ({ x: k, y: num(S.checkins[k].sleep) })).filter(p => p.y !== null);
  const rucks = [...S.rucks].sort((a, b) => b.date.localeCompare(a.date));

  view.innerHTML = `
    <section class="stack"><p class="eyebrow">Tu bloque desde el ${fmtShort(S.start)}</p><h1>Progreso</h1></section>
    <div class="tiles">
      <div class="tile s1"><b>${doneCount}</b><span>sesiones hechas</span></div>
      <div class="tile ruck"><b>${Math.round(km * 10) / 10}</b><span>km de rucking</span></div>
      <div class="tile s2"><b>${ckeys.filter(k => checkinFilled(S.checkins[k])).length}</b><span>check-ins</span></div>
    </div>
    <section class="card s${ex.s}">
      <label class="field">Ejercicio
        <select id="prog-ex">${[1, 2, 3].map(s => `<optgroup label="Sesión ${s} · ${SESSIONS[s].name}">${SESSIONS[s].ex.map(e => `<option value="${e.id}"${e.id === progEx ? ' selected' : ''}>${esc(e.name)}</option>`).join('')}</optgroup>`).join('')}</select>
      </label>
      <p class="eyebrow">${metricName}</p>
      ${chart(pts, { fmt })}
      ${rows.length ? `<div class="tbl-wrap"><table><thead><tr><th>Fecha</th><th>Carga</th><th>Series</th></tr></thead><tbody>
        ${[...rows].reverse().map(r => `<tr><td>${fmtShort(r.date)}</td><td>${esc(loadText(ex, r.l) || '—')}</td><td>${esc(setsText(ex, r.l))}</td></tr>`).join('')}
      </tbody></table></div>` : '<p class="empty">Aún no hay registros de este ejercicio.</p>'}
    </section>
    <section class="card ruck">
      <h2>Rucking</h2>
      ${chart([...S.rucks].sort((a, b) => a.date.localeCompare(b.date)).map(r => ({ x: r.date, y: num(r.km) })).filter(p => p.y !== null), { fmt: v => `${v} km` })}
      ${rucks.length ? `<ul class="loglist">${rucks.slice(0, 12).map(ruckItem).join('')}</ul>` : '<p class="empty">Registra tus salidas desde la pestaña Hoy.</p>'}
    </section>
    <section class="card">
      <h2>Energía y sueño</h2>
      <div class="stack s2"><p class="eyebrow">Energía (1–10)</p>${chart(energy)}</div>
      <div class="stack rest"><p class="eyebrow">Sueño (horas promedio)</p>${chart(sleep, { fmt: v => `${v} h` })}</div>
    </section>`;
}

/* ---------- Check-in semanal ---------- */

const CI_TEXT = ['well', 'way', 'fix', 'focus', 'how', 'sleepTip'];
function checkinFilled(c) { return !!c && (CI_TEXT.some(k => (c[k] || '').trim()) || num(c.energy) !== null); }
function weekStats(mon) {
  const end = addDays(mon, 6);
  const inWeek = d => d >= mon && d <= end;
  return {
    lifts: S.workouts.filter(w => w.done && inWeek(w.date)).length,
    moves: new Set(S.rucks.filter(r => inWeek(r.date)).map(r => r.date)).size,
  };
}

let ciWeek = null;
function renderCheckin() {
  const mon = ciWeek || mondayOf(todayISO());
  const c = S.checkins[mon] || {};
  const st = weekStats(mon);
  const lifts = c.lifts ?? st.lifts, moves = c.moves ?? st.moves;
  const boxes = (field, n, val) => `<div class="boxes">${Array.from({ length: n }, (_, i) => `<button class="box" data-act="box" data-f="${field}" data-i="${i}" aria-pressed="${i < val}" aria-label="${i + 1}">${ICON_CHECK}</button>`).join('')}</div>`;
  const ta = (k, ph) => `<textarea data-ci="${k}" rows="2" placeholder="${ph}">${esc(c[k])}</textarea>`;
  const isCurrent = mon === mondayOf(todayISO());

  view.innerHTML = `
    <section class="stack">
      <p class="eyebrow">Cada domingo · 5 minutos</p>
      <h1>Check-in semanal</h1>
    </section>
    <div class="ci-nav">
      <button class="btn soft" data-act="ci-prev" aria-label="Semana anterior">‹</button>
      <div><p class="small muted">Semana del</p><p><b>${fmtShort(mon)} – ${fmtShort(addDays(mon, 6))}</b></p></div>
      <button class="btn soft" data-act="ci-next" aria-label="Semana siguiente"${isCurrent ? ' disabled style="opacity:.35"' : ''}>›</button>
    </div>

    <section class="ci-block s1">
      <h2>Mi semana</h2>
      <div class="ci-row"><span>Entrenos hechos</span>${boxes('lifts', 3, lifts)}</div>
      <div class="ci-row"><span>Días de movimiento</span>${boxes('moves', 3, moves)}</div>
      <p class="small muted">Registrado en la app: ${st.lifts} ${st.lifts === 1 ? 'sesión' : 'sesiones'} y ${st.moves} ${st.moves === 1 ? 'día' : 'días'} de rucking/caminata.</p>
      <div class="stack"><span><b>Energía</b> <span class="muted small">(1–10)</span></span>
        <div class="energy" role="group" aria-label="Energía">${Array.from({ length: 10 }, (_, i) => `<button class="chip" data-act="energy" data-v="${i + 1}" aria-pressed="${num(c.energy) === i + 1}">${i + 1}</button>`).join('')}</div>
      </div>
      <div class="ci-row"><span>Sueño <span class="muted small">(horas promedio)</span></span><input class="sleep-in" data-ci="sleep" inputmode="decimal" placeholder="7.5" value="${esc(c.sleep)}"></div>
    </section>

    <section class="ci-block ruck">
      <h2>Qué salió bien</h2>
      <label class="field">Una cosa que hice bien esta semana${ta('well', 'Ej. No me salté ninguna sesión')}</label>
    </section>

    <section class="ci-block s3">
      <h2>Qué puede mejorar</h2>
      <label class="field">Una cosa que se interpuso${ta('way', 'Ej. Llegué tarde del trabajo el miércoles')}</label>
      <label class="field">Mi solución para eso${ta('fix', 'Ej. Entrenar en la mañana los miércoles')}</label>
    </section>

    <section class="ci-block s2">
      <h2>Próxima semana</h2>
      <label class="field">Mi ÚNICO enfoque para la próxima semana${ta('focus', 'Ej. Subir de banda en abducciones')}</label>
      <label class="field">Cómo y cuándo lo haré${ta('how', 'Ej. Lunes, miércoles y viernes a las 7 am')}</label>
      <label class="field">Una forma de mejorar sueño o energía${ta('sleepTip', 'Ej. Pantallas fuera a las 10 pm')}</label>
      <label class="tick"><input type="checkbox" data-ci="scheduled"${c.scheduled ? ' checked' : ''}><span>Agendé mis entrenos de la próxima semana como citas.</span></label>
    </section>
    <p class="small muted">Se guarda solo mientras escribes.</p>`;
}

function ciSet(k, v) {
  const mon = ciWeek || mondayOf(todayISO());
  const c = S.checkins[mon] || (S.checkins[mon] = {});
  c[k] = v; c.updated = Date.now();
  save();
}

/* ---------- Guía y ajustes ---------- */

function renderGuia() {
  const wk = blockWeek(todayISO());
  view.innerHTML = `
    <section class="stack"><p class="eyebrow">3 días Full Body + Rucking</p><h1>Guía</h1>
      <p class="muted small">Objetivo: hipertrofia de glúteo, recomposición corporal, tonificar tren superior y fortalecer core. Equipo: mancuernas ajustables (discos de 3 lb), bandas, mat y mochila de 12 lb.</p></section>

    <section class="card guide"><h2>Semana tipo</h2>
      <ul class="sched">
        ${[1, 2, 3, 4, 5, 6, 0].map(d => { const p = WEEK[d]; const name = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][d];
          return `<li class="${p.type === 'lift' ? 's' + p.s : p.type}"><b>${name}</b><span>${p.type === 'lift' ? `Sesión ${p.s} · ${SESSIONS[p.s].name}` : `${esc(p.title)}: ${esc(p.text)}`}</span></li>`; }).join('')}
      </ul>
    </section>

    <section class="card guide"><h2>Reglas de ejecución</h2>
      <ol>
        <li>Un día, una sesión. Nunca juntes dos sesiones el mismo día.</li>
        <li>Completa todas las series de un ejercicio antes de pasar al siguiente. Descansa 60–90 s entre series y 90 s antes del siguiente ejercicio.</li>
        <li>Tempo: 3 s de bajada controlada, 1–2 s de pausa en máxima contracción (arriba en Hip Thrust, abajo en sentadilla) y subida potente.</li>
        <li>Las últimas 2 reps deben costar. Si podrías hacer 5 más fácilmente, el peso es muy ligero.</li>
        <li>Anota el peso por mancuerna (ej. 2 discos de 3 lb = 6 lb por lado) y el color/nivel de la banda.</li>
      </ol>
    </section>

    <section class="card guide"><h2>Progresión mensual</h2>
      <div class="prog">${PROGRESSION.map((p, i) => `<div class="${wk === i + 1 ? 'cur' : ''}"><span class="wk">${i + 1}</span><div><b>${p.t}</b><p class="small muted">${p.d}</p></div></div>`).join('')}</div>
    </section>

    <section class="card guide"><h2>Si pasa esto, haz esto</h2>
      <dl class="ifthen">
        <dt>Me salté un entreno</dt><dd>Haz el siguiente en orden. No dobles.</dd>
        <dt>Me salté una semana completa</dt><dd>Repite esa semana y sigue.</dd>
        <dt>Estoy agotada</dt><dd>Mismos pesos de la semana pasada, 2 series en vez de 3. Termina sintiéndote mejor.</dd>
        <dt>Solo tengo 30 minutos</dt><dd>Haz los primeros 3 ejercicios: hacen la mayor parte del trabajo.</dd>
        <dt>La báscula no se mueve</dt><dd>Revisa cómo te queda la ropa y si tus pesos suben. Dale el mes completo.</dd>
      </dl>
    </section>

    <section class="card guide"><h2>Ajustes y respaldo</h2>
      <label class="field">Inicio del bloque (lunes de la semana 1)<input type="date" id="set-start" value="${S.start}"></label>
      <p class="small muted">Tus datos viven solo en este teléfono. Exporta un respaldo de vez en cuando o antes de cambiar de teléfono.</p>
      <div class="row">
        <button class="btn soft" data-act="export">Exportar respaldo</button>
        <label class="btn soft" for="import-file">Importar respaldo</label>
        <input type="file" id="import-file" accept="application/json,.json" hidden>
      </div>
      <div class="confirm-row" id="reset-zone"><button class="btn danger sm" data-act="reset">Borrar todos los datos</button></div>
    </section>
    <p class="small muted">Basado en la metodología The Great Lock In de Coach William Holman.</p>`;
}

/* ---------- Router ---------- */

function route() {
  const h = location.hash.slice(1) || 'hoy';
  const [name, arg] = h.split('/');
  const tab = name === 'sesion' ? 'hoy' : name;
  document.querySelectorAll('.tabs a').forEach(a => {
    if (a.dataset.tab === tab) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  weekchip();
  if (name === 'sesion') renderSesion(arg);
  else if (name === 'progreso') renderProgreso();
  else if (name === 'checkin') { if (arg) ciWeek = arg; renderCheckin(); }
  else if (name === 'guia') renderGuia();
  else renderHoy();
  if (name !== 'sesion') stopTimer();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

/* ---------- Eventos ---------- */

function curWorkout() {
  const [name, id] = location.hash.slice(1).split('/');
  return name === 'sesion' ? findWorkout(id) : null;
}

view.addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (!b) return;
  const act = b.dataset.act;
  const w = curWorkout();
  const exEl = b.closest('[data-ex]');
  const ex = exEl && EX_BY_ID[exEl.dataset.ex];

  if (act === 'start') {
    const s = +b.dataset.s, t = todayISO();
    const existing = S.workouts.find(x => x.date === t && x.s === s);
    location.hash = `#sesion/${(existing || newWorkout(s, t)).id}`;
  } else if (act === 'step' && w && ex) {
    const l = w.log[ex.id];
    const input = exEl.querySelector('[data-f="load"]');
    const base = num(l.load) ?? num(input.placeholder) ?? 0;
    l.load = String(Math.max(0, base + Number(b.dataset.d)));
    input.value = l.load; save();
  } else if (act === 'mode' && w && ex) {
    w.log[ex.id].mode = b.dataset.mode; save();
    exEl.outerHTML = exCard(w, ex, Math.min(Math.max(blockWeek(w.date), 1), 4));
  } else if (act === 'band' && w && ex) {
    const l = w.log[ex.id];
    l.band = l.band === b.dataset.band ? '' : b.dataset.band;
    exEl.querySelectorAll('[data-act="band"]').forEach(c => c.setAttribute('aria-pressed', c.dataset.band === l.band));
    save();
  } else if (act === 'set' && w && ex) {
    const i = +b.dataset.i, l = w.log[ex.id], s = l.sets[i];
    s.ok = !s.ok;
    const input = exEl.querySelector(`[data-f="set"][data-i="${i}"]`);
    if (s.ok && s.v === '') { s.v = String(parseFloat(input.placeholder)); input.value = s.v; }
    b.setAttribute('aria-pressed', s.ok);
    const req = l.sets.slice(0, ex.sets - (ex.optional || 0));
    exEl.classList.toggle('complete', req.every(x => x.ok));
    save();
    if (s.ok) startTimer(i >= req.length - 1 ? 90 : 75);
  } else if (act === 'finish' && w) {
    w.done = true; save(); stopTimer();
    toast(`Sesión ${w.s} guardada`);
    location.hash = '#hoy';
  } else if (act === 'del-workout' && w) {
    document.getElementById('del-zone').innerHTML = `<span class="small">¿Borrar la sesión y sus pesos?</span><button class="btn danger sm" data-act="del-workout-yes">Sí, borrar</button><button class="btn ghost sm" data-act="cancel-del">Cancelar</button>`;
  } else if (act === 'cancel-del') {
    document.getElementById('del-zone').innerHTML = `<button class="btn danger sm" data-act="del-workout">Borrar esta sesión</button>`;
  } else if (act === 'del-workout-yes' && w) {
    S.workouts = S.workouts.filter(x => x.id !== w.id); save(); toast('Sesión borrada'); location.hash = '#hoy';
  } else if (act === 'del-ruck') {
    S.rucks = S.rucks.filter(r => r.id !== b.dataset.id); save(); route();
  } else if (act === 'ci-prev' || act === 'ci-next') {
    ciWeek = addDays(ciWeek || mondayOf(todayISO()), act === 'ci-prev' ? -7 : 7);
    renderCheckin();
  } else if (act === 'box') {
    const mon = ciWeek || mondayOf(todayISO());
    const c = S.checkins[mon] || {};
    const st = weekStats(mon);
    const cur = c[b.dataset.f] ?? st[b.dataset.f];
    const i = +b.dataset.i;
    ciSet(b.dataset.f, cur === i + 1 ? i : i + 1);
    renderCheckin();
  } else if (act === 'energy') {
    const mon = ciWeek || mondayOf(todayISO());
    const v = +b.dataset.v;
    ciSet('energy', num((S.checkins[mon] || {}).energy) === v ? '' : v);
    b.parentElement.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', num(S.checkins[mon].energy) === +c.dataset.v));
  } else if (act === 'export') {
    exportData();
  } else if (act === 'reset') {
    document.getElementById('reset-zone').innerHTML = `<span class="small">Esto borra sesiones, rucking y check-ins de este teléfono.</span><button class="btn danger sm" data-act="reset-yes">Sí, borrar todo</button><button class="btn ghost sm" data-act="reset-no">Cancelar</button>`;
  } else if (act === 'reset-no') {
    renderGuia();
  } else if (act === 'reset-yes') {
    S = defaultState(); save(); toast('Datos borrados'); location.hash = '#hoy'; route();
  }
});

view.addEventListener('input', e => {
  const el = e.target;
  const w = curWorkout();
  if (w && el.dataset.f) {
    const exEl = el.closest('[data-ex]');
    if (el.dataset.f === 'note') w.note = el.value;
    else if (el.dataset.f === 'date') { if (el.value) w.date = el.value; }
    else if (exEl) {
      const l = w.log[exEl.dataset.ex];
      if (el.dataset.f === 'load') l.load = el.value.trim();
      if (el.dataset.f === 'set') l.sets[+el.dataset.i].v = el.value.trim();
    }
    save();
  } else if (el.dataset.ci) {
    ciSet(el.dataset.ci, el.type === 'checkbox' ? el.checked : el.value);
  }
});

view.addEventListener('change', e => {
  const el = e.target;
  if (el.id === 'prog-ex') { progEx = el.value; renderProgreso(); }
  else if (el.id === 'set-start' && el.value) { S.start = mondayOf(el.value); save(); weekchip(); renderGuia(); toast('Inicio del bloque actualizado'); }
  else if (el.id === 'import-file' && el.files[0]) importData(el.files[0]);
});

view.addEventListener('submit', e => {
  const f = e.target;
  if (f.dataset.form !== 'ruck') return;
  e.preventDefault();
  const d = new FormData(f);
  S.rucks.push({ id: uid(), date: d.get('date') || todayISO(), km: d.get('km'), min: d.get('min'), lb: d.get('lb') });
  save(); toast('Rucking guardado'); route();
});

/* ---------- Respaldo ---------- */

function exportData() {
  const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `lockin-respaldo-${todayISO()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function importData(file) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const d = JSON.parse(r.result);
      if (!d || !Array.isArray(d.workouts) || !Array.isArray(d.rucks)) throw new Error('formato');
      S = Object.assign(defaultState(), d); save(); toast('Respaldo importado'); route();
    } catch (e) { toast('Ese archivo no es un respaldo de esta app.'); }
  };
  r.readAsText(file);
}

/* ---------- Arranque ---------- */

route();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
