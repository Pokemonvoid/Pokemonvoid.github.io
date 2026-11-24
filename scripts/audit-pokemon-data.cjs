const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/audit-pokemon-data.cjs <build folder> [--update-descriptions]');
const root = path.resolve(__dirname, '..');
function parse(file) {
  const records = []; let row;
  for (const raw of fs.readFileSync(path.join(source, 'PBS', file), 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    if (line.startsWith('[')) { row = { id: line.slice(1, line.indexOf(']')) }; records.push(row); continue; }
    const pos = line.indexOf('=');
    if (!row || pos < 0) continue;
    const key = line.slice(0, pos).trim(), value = line.slice(pos + 1).trim();
    row[key] = row[key] === undefined ? value : [row[key], value].flat();
  }
  return records;
}
const context = { window: {} }; vm.createContext(context);
const dexPath = path.join(root, 'wiki/data-dex.js');
let code = fs.readFileSync(dexPath, 'utf8');
vm.runInContext(code, context);
vm.runInContext(fs.readFileSync(path.join(root, 'wiki/data-game.js'), 'utf8'), context);
const before = context.window.VDEX.DEX, game = context.window.VGAME;
const base = parse('pokemon.txt'), forms = parse('pokemon_forms.txt');
const norm = value => String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
const list = value => value ? value.split(',').map(s => s.trim()) : [];
const sort = values => [...values].sort();
const equal = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const sourceFor = d => {
  const s = base.find(s=>d.sourceSpecies ? s.id===d.sourceSpecies : norm(s.Name)===norm(d.name));
  return d.sourceForm ? {...s,...forms.find(f=>f.id===`${d.sourceSpecies},${d.sourceForm}`)} : s;
};
const descriptions = [], differences = [], counts = {};
for (const d of before.filter(d => !d.undiscovered)) {
  const s = sourceFor(d);
  if (!s) throw new Error('Missing source species: ' + d.name);
  const changes = [];
  const check = (field, wiki, current) => { if (!equal(wiki,current)) { changes.push({field,wiki,current}); counts[field]=(counts[field]||0)+1; } };
  if (d.flavor !== s.Pokedex) {
    descriptions.push({dex:d.dex,name:d.name,before:d.flavor,after:s.Pokedex});
    if (process.argv.includes('--update-descriptions')) {
      const isJson = code.includes(`"dex": "${d.dex}"`);
      const start = code.indexOf(isJson ? `"dex": "${d.dex}"` : `dex: '${d.dex}'`), end = code.indexOf('\n    },', start);
      if (start < 0 || end < 0) throw new Error('Cannot locate species block: ' + d.dex);
      const block = code.slice(start,end);
      const escaped = s.Pokedex.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
      const updated = isJson
        ? block.replace(/^      "flavor": .*,$/m, () => `      "flavor": ${JSON.stringify(s.Pokedex)},`)
        : block.replace(/^      flavor: .*,$/m, () => `      flavor: '${escaped}',`);
      if (updated === block) throw new Error('Cannot locate description: ' + d.dex);
      code = code.slice(0,start)+updated+code.slice(end);
    }
  }
  check('types',d.types,list(s.Types));
  check('stats', ['HP','ATK','DEF','SPE','SPA','SPD'].map(k=>d.stats[k]),list(s.BaseStats).map(Number));
  for(const [field,key] of [['catchRate','CatchRate'],['baseFriendship','Happiness'],['baseExp','BaseExp'],['eggCycles','HatchSteps']]) if(s[key])check(field,d[field],Number(s[key]));
  for(const [field,key] of [['category','Category'],['growthRate','GrowthRate']])check(field,d[field],s[key]);
  check('abilities',sort(d.abilities.map(norm)),sort(list(s.Abilities).map(norm)));
  check('hiddenAbility',sort((Array.isArray(d.hidden)?d.hidden:d.hidden?[d.hidden]:[]).map(norm)),sort(list(s.HiddenAbilities).map(norm)));
  check('eggGroups',sort(d.eggGroups.map(norm)),sort(list(s.EggGroups).map(norm)));
  const evKeys={HP:'HP',ATTACK:'ATK',DEFENSE:'DEF',SPEED:'SPE',SPECIAL_ATTACK:'SPA',SPECIAL_DEFENSE:'SPD'},ev=list(s.EVs);
  check('evYield',sort(Object.entries(d.evYield||{})),sort(ev.filter((_,i)=>i%2===0).map((key,i)=>[evKeys[key],Number(ev[i*2+1])])));
  const genders={FemaleOneEighth:12.5,Female25Percent:25,Female50Percent:50,Female75Percent:75,FemaleSevenEighths:87.5,AlwaysMale:0,AlwaysFemale:100};
  check('femalePercent',d.gender?.f??null,genders[s.GenderRatio]??null);
  const moves=list(s.Moves), pairs=[];for(let i=0;i<moves.length;i+=2)pairs.push(moves[i]+':'+norm(moves[i+1]));
  check('levelMoves',sort(d.levelMoves.map(m=>m.lv+':'+norm(m.name))),sort(pairs));
  check('eggMoves',sort(d.eggMoves.map(m=>norm(m.name))),sort(list(s.EggMoves).map(norm)));
  check('tutorCompatibility',sort(d.tmMoves.map(m=>norm(m.name))),sort(list(s.TutorMoves).map(norm)));
  if(changes.length)differences.push({dex:d.dex,name:d.name,changes});
}
const updatedContext={window:{}};vm.createContext(updatedContext);vm.runInContext(code,updatedContext);
const after=updatedContext.window.VDEX.DEX;
for(let i=0;i<before.length;i++) {
  const a={...before[i]},b={...after[i]};
  if(!a.undiscovered){delete a.flavor;delete b.flavor;}
  if(!equal(a,b))throw new Error('Unexpected non-description change: '+before[i].dex);
}
if(process.argv.includes('--update-descriptions'))fs.writeFileSync(dexPath,code);
const visible=before.filter(d=>!d.undiscovered);
const report={sources:source,visibleSpecies:visible.length,descriptionsUpdated:descriptions.length,descriptions,counts,differences,
  evolutionReview:visible.map(d=>{const s=sourceFor(d);return {name:d.name,source:[s.Evolution||s.Evolutions||[]].flat(),wiki:d.evo||null}}),
  formReview:forms.filter(f=>visible.some(d=>norm(d.name)===norm(base.find(s=>s.id===f.id.split(',')[0])?.Name))),
  measurements:visible.map(d=>{const s=sourceFor(d);return {name:d.name,wikiHeight:d.height,wikiWeight:d.weight,metres:s.Height||null,kilograms:s.Weight||null}}),
  limits:['Location strings and encounter tables need reconciliation with map metadata and events.','Custom evolution and form conditions need script-level review.','Tutor compatibility does not establish TM numbering.','Height and weight values are recorded for unit/rounding review, not counted as direct mismatches.','Stats use source order HP, Attack, Defense, Speed, Sp. Atk, Sp. Def.']};
fs.mkdirSync(path.join(root,'.release-prep'),{recursive:true});
fs.writeFileSync(path.join(root,'.release-prep/pokemon-data-audit.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({visibleSpecies:visible.length,descriptionsUpdated:descriptions.length,counts,formRecords:report.formReview.length},null,2));
