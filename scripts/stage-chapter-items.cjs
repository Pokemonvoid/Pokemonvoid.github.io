const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = process.argv[2];
if (!source) throw new Error('Provide the extracted Graphics directory.');
const root = path.resolve(__dirname, '..');
const stage = path.join(root, '.release-prep/chapter1-items');
function records(file) {
  const result = []; let row;
  for (const raw of fs.readFileSync(path.join(source, 'PBS', file), 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    if (line.startsWith('[')) { row = {id: line.slice(1, line.indexOf(']'))}; result.push(row); continue; }
    const eq = line.indexOf('=');
    if (row && eq >= 0) row[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
  }
  return result;
}
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'wiki/data-game.js'), 'utf8'), context);
const existing = context.window.VGAME.ITEMS;
const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z0-9]/g, '');
const items = new Map([...records('items.txt'), ...records('items_Gen_9_Pack.txt')].map(row => [row.id, row]));
const moves = new Map([...records('moves.txt'), ...records('moves_Gen_9_Pack.txt')].map(row => [row.id, row]));
const artRoot = path.join(source, 'Graphics/Items');
const artwork = new Map(fs.readdirSync(artRoot).map(file => [file.toUpperCase(), file]));
const output = [], report = {added: [], updated: [], missingArtwork: [], excluded: [], unmatchedExisting: []};
const matched = new Set();
fs.mkdirSync(path.join(stage, 'items'), {recursive: true});
function category(row) {
  const flags = (row.Flags || '').split(',');
  if (flags.includes('KeyItem') || row.Pocket === '8') return 'Key Items';
  if (flags.includes('EvolutionStone')) return 'Evolution Items';
  if (row.Move || row.Pocket === '4') return 'TMs';
  if (flags.includes('Fossil')) return 'Fossils';
  if (/^(PRETTYFEATHER|TINYMUSHROOM|BIGMUSHROOM|BALMMUSHROOM|PEARL|BIGPEARL|PEARLSTRING|STARDUST|STARPIECE|COMETSHARD|NUGGET|BIGNUGGET|SLOWPOKETAIL|RAREBONE|RELIC.*)$/.test(row.id)) return 'Treasures';
  if (row.Pocket === '1' && /held by|hold it|holder|holding/i.test(row.Description || '')) return 'Held Items';
  return {'2':'Medicines', '3':'Poké Balls', '5':'Berries', '6':'Mail', '7':'Battle Items'}[row.Pocket] || 'Other Items';
}
for (const row of items.values()) {
  if (row.MegaStone === 'INFLATUFT' || /mega inflatuft/i.test(row.Name || '')) { report.excluded.push(row.id); continue; }
  const old = existing.find(item => normalize(path.basename(item.icon || '', '.png')) === normalize(row.id) || normalize(item.name) === normalize(row.Name));
  if (old) matched.add(old);
  const art = artwork.get((row.id + '.png').toUpperCase());
  if (!art) { report.missingArtwork.push(row.id); continue; }
  if (!row.Name || !row.Description) throw new Error('Incomplete item: ' + row.id);
  const item = {id: row.id, name: row.Name, cat: category(row), icon: 'items/' + row.id + '.png', desc: row.Description, find: ''};
  if (old?.cat === 'Evolution' && item.cat === 'Other Items') item.cat = 'Evolution Items';
  if (row.Move) item.move = moves.get(row.Move)?.Name || row.Move;
  output.push(item);
  report[old ? 'updated' : 'added'].push(row.id);
  fs.copyFileSync(path.join(artRoot, art), path.join(stage, item.icon));
}
for (const old of existing) {
  if (!matched.has(old)) report.unmatchedExisting.push(old.name);
  if (!output.some(item => normalize(item.name) === normalize(old.name))) output.push(old);
}
// Several key items have separate internal IDs for their used/unused states.
const unique = [];
for (const item of output) {
  const duplicate = unique.find(other => other.name === item.name && other.desc === item.desc);
  if (duplicate) { duplicate.alternateIds = [...(duplicate.alternateIds || []), item.id]; }
  else unique.push(item);
}
fs.writeFileSync(path.join(stage, 'items.json'), JSON.stringify(unique, null, 2) + '\n');
fs.writeFileSync(path.join(stage, 'audit.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({total: unique.length, ...Object.fromEntries(Object.entries(report).map(([key, value]) => [key, value.length]))}, null, 2));
