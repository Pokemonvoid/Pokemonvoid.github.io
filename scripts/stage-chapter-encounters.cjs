const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = process.argv[2];
if (!source) throw new Error('Provide the extracted Graphics directory.');
const root = path.resolve(__dirname, '..');
const stage = path.join(root, '.release-prep/chapter1-encounters');
const normalize = text => String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z0-9]/g, '');
function records(file) {
  const rows = []; let row;
  for (const raw of fs.readFileSync(path.join(source, 'PBS', file), 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    if (line.startsWith('[')) { row = {id: line.slice(1, line.indexOf(']'))}; rows.push(row); continue; }
    const eq = line.indexOf('=');
    if (row && eq >= 0) row[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
  }
  return rows;
}
const context = {window: {}};
for (const file of ['data-dex.js', 'data-game.js']) vm.runInNewContext(fs.readFileSync(path.join(root, 'wiki', file), 'utf8'), context);
const dex = context.window.VDEX.DEX;
const drafts = fs.readdirSync(path.join(root, '.release-prep/pokemon')).map(name => JSON.parse(fs.readFileSync(path.join(root, '.release-prep/pokemon', name, 'page.json'), 'utf8')));
const species = records('pokemon.txt');
const metadata = new Map(records('map_metadata.txt').map(row => [Number(row.id), row]));
const bySpecies = new Map(species.map(row => [row.id, {
  species: row.id, name: row.Name,
  dex: [...dex.filter(d => !d.undiscovered), ...drafts].filter(d => d.sourceSpecies === row.id || d.speciesId === row.id || normalize(d.name) === normalize(row.Name)).map(d => d.dex),
  encounters: [],
}]));
const tables = []; let table, location;
for (const raw of fs.readFileSync(path.join(source, 'PBS/encounters.txt'), 'utf8').split(/\r?\n/)) {
  const line = raw.trim();
  if (!line || line.startsWith('#')) continue;
  const header = line.match(/^\[(\d+)(?:,(\d+))?\]\s*(?:#\s*(.*))?$/);
  if (header) {
    const mapId = Number(header[1]), version = Number(header[2] || 0);
    const name = header[3] || metadata.get(mapId)?.Name;
    if (!name) throw new Error('Unnamed encounter map: ' + mapId);
    location = {mapId, version, name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')};
    continue;
  }
  const parts = line.split(',').map(value => value.trim());
  if (!/^\d+$/.test(parts[0])) {
    if (!location) throw new Error('Method without location');
    table = {...location, method: parts[0], triggerRate: parts[1] ? Number(parts[1]) : null, slots: []};
    tables.push(table); continue;
  }
  if (!table) throw new Error('Slot without method');
  const [weight, id, min, max = min] = parts;
  if (!bySpecies.has(id)) throw new Error('Unknown species: ' + id);
  table.slots.push({species: id, weight: Number(weight), minLevel: Number(min), maxLevel: Number(max)});
}
for (const table of tables) {
  const total = table.slots.reduce((sum, slot) => sum + slot.weight, 0);
  if (total <= 0) throw new Error('Empty table');
  table.totalWeight = total;
  for (const id of new Set(table.slots.map(slot => slot.species))) {
    const slots = table.slots.filter(slot => slot.species === id);
    const pct = slots.reduce((sum, slot) => sum + slot.weight, 0) * 100 / total;
    bySpecies.get(id).encounters.push({mapId: table.mapId, version: table.version, location: table.name, slug: table.slug, method: table.method, pct, minLevel: Math.min(...slots.map(s => s.minLevel)), maxLevel: Math.max(...slots.map(s => s.maxLevel)), slots});
  }
}
const routes = [];
for (const table of tables) {
  let route = routes.find(row => row.mapId === table.mapId && row.version === table.version);
  if (!route) { route = {mapId: table.mapId, version: table.version, slug: table.slug, name: table.name, mons: [], encounters: []}; routes.push(route); }
  for (const pokemon of bySpecies.values()) {
    for (const enc of pokemon.encounters.filter(enc => enc.mapId === table.mapId && enc.version === table.version && enc.method === table.method)) {
      if (pokemon.dex.length !== 1) throw new Error('Encounter needs an unambiguous dex: ' + pokemon.species);
      const id = pokemon.dex[0];
      if (!route.mons.includes(id)) route.mons.push(id);
      route.encounters.push({dex: id, pct: enc.pct, lv: enc.minLevel === enc.maxLevel ? String(enc.minLevel) : enc.minLevel + '-' + enc.maxLevel, method: enc.method});
    }
  }
}
const all = [...bySpecies.values()];
const audit = {
  maps: routes.length, tables: tables.length, speciesIndexed: all.length,
  speciesWithWildEncounters: all.filter(row => row.encounters.length).length,
  noWildTable: all.filter(row => !row.encounters.length).map(row => ({species: row.species, name: row.name, dex: row.dex})),
  notes: ['Percentages are conditional on encountering a Pokemon using the listed method, not per-step probabilities.', 'Repeated slots are combined only within the same map, version and method. Original weighted level slots are retained.', 'An absent wild-table entry does not prove a Pokemon is unobtainable. Gifts, events, quests and scripted encounters require separate verification.', 'This package is staged only. Merge route encounter fields and Pokemon location rendering during the Chapter 1 reveal; do not expose unreleased species early.']
};
fs.mkdirSync(stage, {recursive: true});
for (const [file, value] of Object.entries({'tables.json': tables, 'pokemon.json': all, 'routes.json': routes, 'audit.json': audit})) fs.writeFileSync(path.join(stage, file), JSON.stringify(value, null, 2) + '\n');
console.log(JSON.stringify({maps: audit.maps, tables: audit.tables, speciesIndexed: audit.speciesIndexed, speciesWithWildEncounters: audit.speciesWithWildEncounters, noWildTable: audit.noWildTable.length}, null, 2));
