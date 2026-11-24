const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// The workbook is intentionally not an input: it supplies dex numbers only.
const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/sync-pokemon-data.cjs <extracted Graphics folder>');
const root = path.resolve(__dirname, '..');
const list = value => value ? value.split(',').map(s => s.trim()) : [];
const norm = value => String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
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
const load = code => { const c = {window:{}}; vm.createContext(c); vm.runInContext(code,c); return c.window; };
const dexFile = path.join(root,'wiki/data-dex.js'), gameFile = path.join(root,'wiki/data-game.js');
let dexCode = fs.readFileSync(dexFile,'utf8'), gameCode = fs.readFileSync(gameFile,'utf8');
const dex = load(dexCode).VDEX.DEX, game = load(gameCode).VGAME;
const originalHidden = JSON.stringify(dex.filter(d=>d.undiscovered));
const moves = new Map([...parse('moves.txt'),...parse('moves_Gen_9_Pack.txt')].map(s=>[s.id,s]));
const abilities = new Map([...parse('abilities.txt'),...parse('abilities_Gen_9_Pack.txt')].map(s=>[s.id,s]));
const species = parse('pokemon.txt'), forms = parse('pokemon_forms.txt'), items = parse('items.txt');
const neededMoves = new Set(), neededAbilities = new Set();
function nameFor(records, id, used) {
  const record = records.get(id);
  if (!record?.Name) throw new Error('Missing source definition: '+id);
  used.add(id); return record.Name;
}
const moveName = id => nameFor(moves,id,neededMoves);
const abilityName = id => nameFor(abilities,id,neededAbilities);
const genders = {FemaleOneEighth:12.5,Female25Percent:25,Female50Percent:50,Female75Percent:75,FemaleSevenEighths:87.5,AlwaysMale:0,AlwaysFemale:100};
const evKeys = {HP:'HP',ATTACK:'ATK',DEFENSE:'DEF',SPEED:'SPE',SPECIAL_ATTACK:'SPA',SPECIAL_DEFENSE:'SPD'};
const eggNames = {Monster:'Monster',Water1:'Water 1',Water2:'Water 2',Water3:'Water 3',Bug:'Bug',Flying:'Flying',Field:'Field',Fairy:'Fairy',Grass:'Grass',Humanlike:'Human-Like',Mineral:'Mineral',Amorphous:'Amorphous',Ditto:'Ditto',Dragon:'Dragon',Undiscovered:'Undiscovered'};
function data(s, old) {
  const stats = list(s.BaseStats).map(Number), ev = list(s.EVs), learned = list(s.Moves);
  const signature = new Set([...old.levelMoves,...old.eggMoves,...old.tmMoves].filter(m=>m.sig).map(m=>norm(m.name)));
  const entry = (lv,id) => { const name=moveName(id); return {lv:String(lv),name,...(signature.has(norm(name))?{sig:true}:{})}; };
  const levelMoves = []; for(let i=0;i<learned.length;i+=2)levelMoves.push(entry(learned[i],learned[i+1]));
  const tmMoves = [], tutorMoves = [];
  for(const id of list(s.TutorMoves)) {
    const machines = items.filter(item=>item.Move===id && /^(TM|HM)\d+$/.test(item.id));
    if (machines.length) for(const machine of machines)tmMoves.push(entry(machine.id.replace(/^(TM|HM)0+(\d)/,'$1$2').replace(/^(TM|HM)(\d)$/,'$10$2'),id));
    else tutorMoves.push(entry('TUTOR',id));
  }
  const inches = Math.round(Number(s.Height)*100/2.54);
  return {
    category:s.Category, types:list(s.Types), stats:Object.fromEntries(['HP','ATK','DEF','SPE','SPA','SPD'].map((key,i)=>[key,stats[i]])),
    height:`${Math.floor(inches/12)}'${String(inches%12).padStart(2,'0')}" ft`, weight:`${Number((Number(s.Weight)*2.2046226218).toFixed(1))} lbs`,
    abilities:list(s.Abilities).map(abilityName), hidden:list(s.HiddenAbilities).map(abilityName).join(', '),
    catchRate:Number(s.CatchRate),baseFriendship:Number(s.Happiness),baseExp:Number(s.BaseExp),growthRate:s.GrowthRate,
    eggGroups:list(s.EggGroups).map(g=>eggNames[g]||g),eggCycles:Number(s.HatchSteps),
    gender:s.GenderRatio==='Genderless'?null:{m:100-genders[s.GenderRatio],f:genders[s.GenderRatio]},
    evYield:Object.fromEntries(ev.filter((_,i)=>i%2===0).map((key,i)=>[evKeys[key],Number(ev[i*2+1])])),
    levelMoves,eggMoves:list(s.EggMoves).map(id=>entry('EGG',id)),tmMoves,tutorMoves
  };
}
const changes = [], stagedForms = [], spriteCopies = [];
const formArt = {MAULMOT:'MAULMOT_C',HYDRENA:'HYDRENA_C',GRIZZLAWN:'GRIZZLAWN_F',BLIGHTATO:'BLIGHTATO_C',ROCWEILER:'ROCWEILER_M',ARMADISCO:'ARMADISCO_M'};
const variants = [['Front',''],['Front/frame2','-f2'],['Back','-back'],['Front shiny','-shiny'],['Front shiny/frame2','-shiny-f2'],['Back shiny','-shiny-back'],['Front anomaly','-anomaly'],['Front anomaly/frame2','-anomaly-f2'],['Back anomaly','-anomaly-back']];
for(const d of dex.filter(d=>!d.undiscovered)) {
  const baseSource = species.find(s=>d.sourceSpecies ? s.id===d.sourceSpecies : norm(s.Name)===norm(d.name));
  const s = d.sourceForm ? {...baseSource,...forms.find(f=>f.id===`${d.sourceSpecies},${d.sourceForm}`)} : baseSource;
  if(!s)throw new Error('Missing species '+d.name);
  const next = {...d,...data(s,d)};
  const publicForms = [];
  for(const form of forms.filter(f=>d.sourceForm===undefined && f.id.split(',')[0]===s.id)) {
    const prepared = {name:form.FormName,...data({...s,...form},d),flavor:form.Pokedex||s.Pokedex};
    const art = s.id==='KAMOLEON' ? (form.id.endsWith(',1')?'KAMOLEON_1':'KAMOLEON_3') : formArt[s.id];
    if(!art || !fs.existsSync(path.join(source,'Graphics/Pokemon/Front',art+'.png'))) {
      stagedForms.push({dex:d.dex,id:form.id,...prepared}); continue;
    }
    prepared.spriteSuffix = s.id==='KAMOLEON' ? (form.id.endsWith(',1')?'mid':'high') : 'form-'+form.id.split(',')[1];
    prepared.spriteVariants = [];
    for(const [folder,suffix] of variants) {
      const input=path.join(source,'Graphics/Pokemon',folder,art+'.png');
      if(!fs.existsSync(input))continue;
      const outputSuffix=prepared.spriteSuffix+suffix;
      spriteCopies.push([input,path.join(root,'sprites',d.dex+'-'+outputSuffix+'.png')]);
      prepared.spriteVariants.push({label:({'':'F1','-f2':'F2','-back':'Back','-shiny':'Shiny F1','-shiny-f2':'Shiny F2','-shiny-back':'Shiny Back','-anomaly':'Anomaly F1','-anomaly-f2':'Anomaly F2','-anomaly-back':'Anomaly Back'})[suffix],suffix:outputSuffix});
    }
    publicForms.push(prepared);
  }
  if(s.id==='KAMOLEON'&&d.sourceForm===undefined)publicForms.unshift({name:'Low Friendship',...data(s,d),spriteSuffix:'low',flavor:s.Pokedex});
  if(publicForms.length)next.forms=publicForms;
  const fields = Object.keys(next).filter(k=>JSON.stringify(d[k])!==JSON.stringify(next[k]));
  if(!fields.length)continue;
  changes.push({dex:d.dex,name:d.name,fields});
  Object.assign(d,next);
}
const evolutionLimits=[];
for(const s of species) {
  const parent=dex.find(d=>!d.undiscovered&&norm(d.name)===norm(s.Name));
  if(!parent)continue;
  for(const evolution of [s.Evolution||s.Evolutions||[]].flat()) {
    const [target,method,value]=list(evolution), targetSource=species.find(row=>row.id===target);
    const child=dex.find(d=>!d.undiscovered&&norm(d.name)===norm(targetSource?.Name));
    if(!child)continue;
    const itemName=id=>items.find(item=>item.id===id)?.Name||id;
    let label, details;
    if(method==='Level')label='Lv '+value;
    else if(method==='LevelMale'||method==='LevelFemale')label=`Lv ${value} (${method==='LevelMale'?'male':'female'})`;
    else if(method==='Item')label=itemName(value);
    else if(method==='HoldItem')label='Level up holding '+itemName(value);
    else if(method==='HasMove')label='Level up knowing '+moveName(value);
    else if(method==='Happiness')label='High friendship';
    else if(method==='LevelFriendshipHigh'||method==='LevelFriendshipLow')label=`Lv ${value} (${method==='LevelFriendshipHigh'?'high':'low'} friendship)`;
    else if(method==='RarcraftTrashCan') {
      const branch={RACLANK:['Defense','MIGHTKNIGHTCOMIC'],RASOAR:['Attack','HARPYIECOMIC'],RAZOOM:['Speed','SUGARRUSHCOMIC']}[target];
      const stat={Defense:'DEF',Attack:'ATK',Speed:'SPE'}[branch[0]];
      label=`Lv ${value}+ · Trash can · Highest ${stat}`;
      parent.evo={...parent.evo,note:'Put Rarcraft first in your party before using a trash can.'};
      details=`Hold ${itemName(branch[1])} to choose this evolution instead of using stats. Without a comic, compare Defense, Attack and Speed; ties favour Defense, then Attack. The comic is consumed.`;
    } else if(method==='Event'&&target==='CERBAMENT') {
      label='Use Cerbament item';
      details='Have Gleeruption and Scorow in your party, then use the Cerbament item on either. Both combine into one Cerbament.';
    } else {
      label='Special evolution';
      evolutionLimits.push({species:s.id,target,method,value});
    }
    child.evo={...child.evo,method:label,...(details?{details}:{})};
  }
}
const dexStart=dexCode.indexOf('  const DEX = ['), dexEnd=dexCode.indexOf('\n  ];',dexStart);
if(dexStart<0||dexEnd<0)throw new Error('Cannot locate dex array');
dexCode=dexCode.slice(0,dexStart)+'  const DEX = '+JSON.stringify(dex,null,2).split('\n').join('\n  ')+';'+dexCode.slice(dexEnd+5);
// Freeze existing share-code IDs before extending the move catalogue.
const oldMoveNames = Array.from(new Set(game.MOVES.flat().map(m=>m.name))).sort((a,b)=>a.localeCompare(b));
if(!gameCode.includes('const SHARE_MOVE_NAMES =')) {
  gameCode = gameCode.replace('  let _moveIds = null, _idMoves = null;', '  const SHARE_MOVE_NAMES = '+JSON.stringify(oldMoveNames)+';\n  let _moveIds = null, _idMoves = null;');
  gameCode = gameCode.replace('const names = Array.from(new Set(MOVES.flat().map(m => m.name))).sort((a, b) => a.localeCompare(b));','const names = [...SHARE_MOVE_NAMES, ...Array.from(new Set(MOVES.flat().map(m => m.name))).filter(n => !SHARE_MOVE_NAMES.some(old => _mvNorm(old) === _mvNorm(n))).sort((a, b) => a.localeCompare(b))];');
  gameCode = gameCode.replace('// Stable alphabetical move-id map: name <-> 2-char base36 id.\n  // Sorted by name so adding NEW moves later never shifts existing ids (old codes stay valid).','// Preserve released share-code IDs; new move names are appended.');
}
const newMoves = game.MOVES.flat().map(m=>({...m})), newAbilities = game.ABILITIES.map(a=>({...a}));
for(const id of neededMoves) {
  const s=moves.get(id), updated={name:s.Name,type:s.Type,cls:s.Category,pow:Number(s.Power||0),acc:Number(s.Accuracy||0),pp:Number(s.TotalPP),desc:s.Description};
  const index=newMoves.findIndex(m=>norm(m.name)===norm(s.Name));
  if(index<0)newMoves.push(updated);else newMoves[index]={...newMoves[index],...updated};
}
for(const id of neededAbilities) {
  const s=abilities.get(id), updated={name:s.Name,desc:s.Description};
  const index=newAbilities.findIndex(a=>norm(a.name)===norm(s.Name));
  if(index<0)newAbilities.push(updated);else newAbilities[index]={...newAbilities[index],...updated};
}
function replaceArray(code, name, value) {
  const start=code.indexOf('  const '+name+' = ['), end=code.indexOf('\n  ];',start);
  if(start<0||end<0)throw new Error('Cannot locate '+name);
  return code.slice(0,start)+'  const '+name+' = '+JSON.stringify(value,null,2).split('\n').join('\n  ')+';'+code.slice(end+5);
}
gameCode=replaceArray(gameCode,'MOVES',newMoves);
gameCode=replaceArray(gameCode,'ABILITIES',newAbilities);
const finalDex=load(dexCode).VDEX.DEX, finalGame=load(gameCode).VGAME;
if(JSON.stringify(finalDex.filter(d=>d.undiscovered))!==originalHidden)throw new Error('Hidden entries changed');
for(const name of oldMoveNames)if(game.moveToId(name)!==finalGame.moveToId(name))throw new Error('Share-code changed: '+name);
for(const d of finalDex.filter(d=>!d.undiscovered)) {
  for(const m of [...d.levelMoves,...d.eggMoves,...d.tmMoves,...d.tutorMoves])if(!finalGame.byMove(m.name))throw new Error('Unresolved move '+m.name);
  if(Object.values(d.stats).some(n=>!Number.isFinite(n)))throw new Error('Invalid stats '+d.name);
}
fs.mkdirSync(path.join(root,'.release-prep'),{recursive:true});
fs.writeFileSync(path.join(root,'.release-prep/form-data.json'),JSON.stringify(stagedForms,null,2)+'\n');
fs.writeFileSync(path.join(root,'.release-prep/data-sync-report.json'),JSON.stringify({source,changes,formsPrepared:stagedForms.length,evolutionLimits,sourceConflicts:['Kamoleon form indices differ between pokemon_forms.txt and the Mood Swing Ruby script; forms are matched by named mood and artwork.']},null,2)+'\n');
fs.writeFileSync(dexFile,dexCode);
fs.writeFileSync(gameFile,gameCode);
for(const [input,output] of spriteCopies)fs.copyFileSync(input,output);
console.log(JSON.stringify({speciesUpdated:changes.length,formsWithoutArtwork:stagedForms.length,formSprites:spriteCopies.length,movesChecked:neededMoves.size,abilitiesChecked:neededAbilities.size,hiddenEntriesPreserved:true,shareCodesPreserved:true},null,2));
