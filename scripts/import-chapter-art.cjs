const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/import-chapter-art.cjs <extracted build folder>');
const root = path.resolve(__dirname, '..');
const stage = path.join(root, '.release-prep');
const graphics = path.join(source, 'Graphics');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'wiki/data-dex.js'), 'utf8'), context);
const dex = context.window.VDEX.DEX;
const normalize = value => value.toUpperCase().replace(/[^A-Z0-9]/g, '');
function parse(filename) {
  const records = []; let record;
  for (const line of fs.readFileSync(path.join(source, 'PBS', filename), 'utf8').split(/\r?\n/)) {
    const text = line.trim();
    if (!text || text.startsWith('#')) continue;
    if (text.startsWith('[')) { record = { id: text.slice(1, -1) }; records.push(record); continue; }
    const index = text.indexOf('=');
    if (index < 0 || !record) continue;
    const key = text.slice(0, index).trim(), value = text.slice(index + 1).trim();
    record[key] = record[key] === undefined ? value : [record[key], value].flat();
  }
  return records;
}
const species = parse('pokemon.txt'), forms = parse('pokemon_forms.txt');
const moves = new Map(parse('moves.txt').map(m => [m.id, m.Name]));
const abilities = new Map(parse('abilities.txt').map(m => [m.id, m.Name]));
const machines = parse('items.txt').filter(item => item.Move && /^TM\d+/.test(item.id));
const order = fs.readFileSync(path.join(source, 'PBS/regional_dexes.txt'), 'utf8').split(/\r?\n/).map(s => s.trim()).filter(s => s && !s.startsWith('#') && !s.startsWith('['));
const sheetPath = path.join(stage, 'dex-sheet.json');
const sheetRows = fs.existsSync(sheetPath) ? JSON.parse(fs.readFileSync(sheetPath, 'utf8').replace(/^\uFEFF/, '')) : [];
const sheetNumbers = new Map(sheetRows.flatMap(row => {
  const name = Object.entries(row).find(([key]) => /^B\d+$/.test(key))?.[1];
  const number = Number(Object.entries(row).find(([key]) => /^A\d+$/.test(key))?.[1]);
  return name && Number.isInteger(number) && number > 0 ? [[normalize(name), number]] : [];
}));
const variants = [['Front', ''], ['Front/frame2', '-f2'], ['Back', '-back'], ['Front shiny', '-shiny'], ['Front shiny/frame2', '-shiny-f2'], ['Back shiny', '-shiny-back'], ['Front anomaly', '-anomaly'], ['Front anomaly/frame2', '-anomaly-f2'], ['Back anomaly', '-anomaly-back'], ['Icons', '-icon']];
const report = { visibleSpecies: 0, copiedSprites: 0, copiedItems: 0, stagedSpecies: 0, missingSprites: [], missingItems: [], pendingDexNumbers: [] };
const write = (file, value) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n'); };
const copy = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); };
// Verify identity mapping before changing public assets.
for (const d of dex.filter(d => !d.undiscovered)) {
  const s = species.find(s => normalize(s.Name) === normalize(d.name));
  if (!s || order[Number(d.dex) - 1] !== s.id) throw new Error('Dex mapping mismatch: ' + d.name);
  const id = s.id === 'KAMOLEON' ? 'KAMOLEON_1' : s.id;
  if (!fs.existsSync(path.join(graphics, 'Pokemon/Front', id + '.png'))) throw new Error('Missing front sprite: ' + s.id);
}
function importSprites(id, destination, prefix, publicEntry) {
  for (const [folder, suffix] of variants) {
    const from = path.join(graphics, 'Pokemon', folder, id + '.png');
    const to = path.join(destination, prefix + suffix + '.png');
    if (fs.existsSync(from)) { copy(from, to); if (publicEntry) report.copiedSprites++; }
    else {
      report.missingSprites.push({ species: id, variant: folder, public: publicEntry });
      if (publicEntry && fs.existsSync(to)) fs.unlinkSync(to);
    }
  }
}
const list = value => value ? value.split(',').map(s => s.trim()) : [];
const stats = value => Object.fromEntries(['HP', 'ATK', 'DEF', 'SPE', 'SPA', 'SPD'].map((key, i) => [key, Number(list(value)[i])]));
for (const s of species) {
  const d = dex.find(d => normalize(d.name) === normalize(s.Name));
  if (d && !d.undiscovered) {
    report.visibleSpecies++;
    importSprites(s.id === 'KAMOLEON' ? 'KAMOLEON_1' : s.id, path.join(root, 'sprites'), d.dex, true);
    if (s.id === 'KAMOLEON') {
      for (const [id, suffix] of [['KAMOLEON_2', 'low'], ['KAMOLEON_3', 'high']]) {
        for (const [folder, frame] of variants.slice(0, 3)) {
          const from = path.join(graphics, 'Pokemon', folder, id + '.png');
          const to = path.join(root, 'sprites', `${d.dex}-${suffix}${frame}.png`);
          if (fs.existsSync(from)) { copy(from, to); report.copiedSprites++; }
          else { report.missingSprites.push({species:id,variant:folder,public:true}); if(fs.existsSync(to))fs.unlinkSync(to); }
        }
      }
    }
  } else {
    if (!fs.existsSync(path.join(graphics, 'Pokemon/Front', s.id + '.png'))) continue;
    const regionalNumber = order.indexOf(s.id) + 1;
    const sheetNumber = sheetNumbers.get(normalize(s.Name));
    if (regionalNumber && sheetNumber && regionalNumber !== sheetNumber) throw new Error('Conflicting dex number: ' + s.Name);
    const number = regionalNumber || sheetNumber;
    const pairs = list(s.Moves), levelMoves = [];
    for (let i = 0; i < pairs.length; i += 2) levelMoves.push({ lv: pairs[i], name: moves.get(pairs[i + 1]) || pairs[i + 1] });
    const draft = { dex: number ? String(number).padStart(3, '0') : null, speciesId: s.id, name: s.Name, category: s.Category, types: list(s.Types), stats: stats(s.BaseStats), flavor: s.Pokedex, abilities: list(s.Abilities).map(id => abilities.get(id) || id), hidden: list(s.HiddenAbilities).map(id => abilities.get(id) || id), catchRate: Number(s.CatchRate), levelMoves, eggMoves: list(s.EggMoves).map(id => ({lv:'EGG',name:moves.get(id)||id})), tutorMoves: list(s.TutorMoves).map(id => moves.get(id)||id), found: [], releaseStatus: 'unreleased', source: s, forms: forms.filter(f => f.id.split(',')[0] === s.id) };
    Object.assign(draft, { height: s.Height ? `${s.Height} m` : '?', weight: s.Weight ? `${s.Weight} kg` : '?', baseExp: Number(s.BaseExp), baseFriendship: Number(s.Happiness), growthRate: s.GrowthRate, eggGroups: list(s.EggGroups), eggCycles: Number(s.HatchSteps), tmMoves: [], anomaly: null });
    const ev = list(s.EVs), evKeys = {HP:'HP',ATTACK:'ATK',DEFENSE:'DEF',SPEED:'SPE',SPECIAL_ATTACK:'SPA',SPECIAL_DEFENSE:'SPD'};
    draft.evYield = Object.fromEntries(ev.filter((_,i)=>i%2===0).map((key,i)=>[evKeys[key],Number(ev[i*2+1])]));
    const gender = {FemaleOneEighth:12.5,Female25Percent:25,Female50Percent:50,Female75Percent:75,FemaleSevenEighths:87.5,AlwaysMale:0,AlwaysFemale:100}[s.GenderRatio];
    draft.gender = gender === undefined ? null : {m:100-gender,f:gender};
    draft.hidden = draft.hidden[0] || null;
    draft.tmMoves = machines.filter(item => list(s.TutorMoves).includes(item.Move)).map(item => ({lv:item.id,name:moves.get(item.Move)||item.Move}));
    draft.evolutionSource = [s.Evolution || s.Evolutions || []].flat();
    const sourceForDex = id => { const regional = order.indexOf(id) + 1; const mon = species.find(mon=>mon.id===id); return regional || (mon && sheetNumbers.get(normalize(mon.Name))) || null; };
    const destinations = draft.evolutionSource.map(line => sourceForDex(line.split(',')[0])).filter(Boolean).map(n=>String(n).padStart(3,'0'));
    const parent = species.find(mon => [mon.Evolution||mon.Evolutions||[]].flat().some(line=>line.split(',')[0]===s.id));
    draft.evo = {};
    if (destinations.length) draft.evo.to = destinations.length===1?destinations[0]:destinations;
    if (parent && sourceForDex(parent.id)) {
      draft.evo.from = String(sourceForDex(parent.id)).padStart(3,'0');
      const branch = [parent.Evolution||parent.Evolutions].flat().find(line=>line.split(',')[0]===s.id).split(',');
      draft.evo.method = branch[1]==='Level' ? `Lv ${branch[2]}` : branch.slice(1).join(' · ');
    }
    draft.releaseNotes = ['Custom evolution descriptions and form triggers retain source identifiers for release review.'];
    write(path.join(stage, 'pokemon', s.id, 'page.json'), draft);
    importSprites(s.id, path.join(stage, 'pokemon', s.id, 'sprites'), draft.dex || s.id, false);
    if (!number) report.pendingDexNumbers.push(s.id);
    report.stagedSpecies++;
  }
}
for (const file of fs.readdirSync(path.join(root, 'items')).filter(f => f.endsWith('.png'))) {
  const aliases = { 'lum-berry.png': 'LUMBERRY.png', 'sitrus-berry.png': 'SITRUSBERRY.png' };
  const from = path.join(graphics, 'Items', aliases[file] || file);
  if (fs.existsSync(from)) { copy(from, path.join(root, 'items', file)); report.copiedItems++; }
  else report.missingItems.push(file);
}
write(path.join(stage, 'import-report.json'), report);
console.log(JSON.stringify({ ...report, missingSprites: report.missingSprites.length, pendingDexNumbers: report.pendingDexNumbers.length }, null, 2));
