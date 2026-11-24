/* Pokémon Void — Pokédex data (placeholder content; swap in real data/sprites).
   window.VDEX = { TYPES, DEX, STAT_LABELS, STAT_MAX, byDex } */
window.VDEX = (function () {
  const STAT_MAX = 200;
  const STAT_LABELS = { HP: 'HP', ATK: 'Attack', DEF: 'Defense', SPA: 'Sp. Atk', SPD: 'Sp. Def', SPE: 'Speed' };

  // 18 standard types + 2 custom (LIGHT, COSMIC), tuned for the dark cosmic theme.
  const TYPES = {
    NORMAL: { name: 'Normal', bg: '#4a463f', glow: '#bdb4a6', fg: '#efeae2' },
    FIRE: { name: 'Fire', bg: '#7a3318', glow: '#ff7a3c', fg: '#ffe6d6' },
    WATER: { name: 'Water', bg: '#1c456e', glow: '#3c9bff', fg: '#d9ecff' },
    ELECTRIC: { name: 'Electric', bg: '#6e5a12', glow: '#ffd23c', fg: '#fff7d6' },
    GRASS: { name: 'Grass', bg: '#27531f', glow: '#5fd13c', fg: '#e0ffd6' },
    ICE: { name: 'Ice', bg: '#1f5a5e', glow: '#5fe6e0', fg: '#dafcff' },
    FIGHTING: { name: 'Fighting', bg: '#6e2420', glow: '#ff5f4c', fg: '#ffe0db' },
    POISON: { name: 'Poison', bg: '#4a1f5e', glow: '#c45fff', fg: '#f3deff' },
    GROUND: { name: 'Ground', bg: '#5e451f', glow: '#e0a85f', fg: '#fff0d6' },
    FLYING: { name: 'Flying', bg: '#2f3f6e', glow: '#8aa8ff', fg: '#e0e8ff' },
    PSYCHIC: { name: 'Psychic', bg: '#7a2f57', glow: '#ff5fa2', fg: '#ffe1ee' },
    BUG: { name: 'Bug', bg: '#4a5e1f', glow: '#b4d13c', fg: '#f1ffd6' },
    ROCK: { name: 'Rock', bg: '#5e5230', glow: '#cbb472', fg: '#fff6dc' },
    GHOST: { name: 'Ghost', bg: '#43356b', glow: '#a07bd6', fg: '#e9defb' },
    DRAGON: { name: 'Dragon', bg: '#2d2470', glow: '#7c6cff', fg: '#e3dcff' },
    DARK: { name: 'Dark', bg: '#2a2329', glow: '#8a7b8e', fg: '#e7e0e8' },
    STEEL: { name: 'Steel', bg: '#3c454d', glow: '#9fb3c2', fg: '#e8edf2' },
    FAIRY: { name: 'Fairy', bg: '#6e2f55', glow: '#ff8ad1', fg: '#ffe3f4' },
    LIGHT: { name: 'Light', bg: '#4a4212', glow: '#ffe566', fg: '#fffce8' },
    COSMIC: { name: 'Cosmic', bg: '#15375e', glow: '#33d6ff', fg: '#dff1ff' },
  };

  // Learnset entries store only lv + name (+ optional sig flag for signature-move styling).
  // Full move data (type, class, power, acc, pp, desc) lives in VGAME.MOVES and is looked up at render time.
  const M = (lv, name, sig) => ({ lv, name, ...(sig ? { sig } : {}) });
  const EGG = (name, sig) => ({ lv: 'EGG', name, ...(sig ? { sig } : {}) });
  const TM = (num, name, sig) => ({ lv: `TM${String(num).padStart(2, '0')}`, name, ...(sig ? { sig } : {}) });

  const DEX = [
    {
      "dex": "001",
      "name": "Tamatoo",
      "category": "Mudcake",
      "types": [
        "GRASS"
      ],
      "height": "1'04\" ft",
      "weight": "25.4 lbs",
      "catchRate": 140,
      "found": [
        "Saudade Town (Starter)"
      ],
      "abilities": [
        "Overgrow"
      ],
      "hidden": "Stamina",
      "stats": {
        "HP": 54,
        "ATK": 58,
        "DEF": 58,
        "SPE": 50,
        "SPA": 40,
        "SPD": 50
      },
      "flavor": "To get nutrition, Tamatoo chews soil in its mouth like gum. After the soil has lost its nutrients, it spits out small pucks of dirt called “Mud Cakes”.",
      "evo": {
        "to": "002"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "5",
          "name": "Defense Curl"
        },
        {
          "lv": "7",
          "name": "Leafage"
        },
        {
          "lv": "11",
          "name": "Barrage"
        },
        {
          "lv": "15",
          "name": "Grass Whistle"
        },
        {
          "lv": "18",
          "name": "Razor Leaf"
        },
        {
          "lv": "22",
          "name": "Worry Seed"
        },
        {
          "lv": "25",
          "name": "Headbutt"
        },
        {
          "lv": "29",
          "name": "Stealth Rock"
        },
        {
          "lv": "32",
          "name": "Rock Blast"
        },
        {
          "lv": "36",
          "name": "Bulk Up"
        },
        {
          "lv": "39",
          "name": "Stone Edge"
        },
        {
          "lv": "43",
          "name": "Leaf Storm"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Grassy Glide"
        },
        {
          "lv": "EGG",
          "name": "Vital Throw"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        }
      ],
      "anomaly": {
        "discoverer": "Mapleaudino"
      },
      "evYield": {
        "DEF": 1
      },
      "baseFriendship": 50,
      "baseExp": 64,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field",
        "Grass"
      ],
      "gender": {
        "m": 87.5,
        "f": 12.5
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "002",
      "name": "Terradua",
      "category": "Stoneroller",
      "types": [
        "GRASS",
        "ROCK"
      ],
      "height": "4'07\" ft",
      "weight": "1470.9 lbs",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Overgrow"
      ],
      "hidden": "Stamina",
      "stats": {
        "HP": 64,
        "ATK": 83,
        "DEF": 83,
        "SPE": 65,
        "SPA": 55,
        "SPD": 65
      },
      "flavor": "Terradua treat their boulders with lots of tender love and care. Some have boulders so well kept that they sparkle like crystals.",
      "evo": {
        "from": "001",
        "to": "003",
        "method": "Lv 16"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Defense Curl"
        },
        {
          "lv": "1",
          "name": "Leafage"
        },
        {
          "lv": "1",
          "name": "Barrage"
        },
        {
          "lv": "15",
          "name": "Grass Whistle"
        },
        {
          "lv": "19",
          "name": "Razor Leaf"
        },
        {
          "lv": "24",
          "name": "Worry Seed"
        },
        {
          "lv": "28",
          "name": "Headbutt"
        },
        {
          "lv": "33",
          "name": "Stealth Rock"
        },
        {
          "lv": "37",
          "name": "Rock Blast"
        },
        {
          "lv": "42",
          "name": "Bulk Up"
        },
        {
          "lv": "46",
          "name": "Stone Edge"
        },
        {
          "lv": "50",
          "name": "Leaf Storm"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        }
      ],
      "anomaly": {
        "discoverer": "Mapleaudino"
      },
      "evYield": {
        "DEF": 1,
        "ATK": 1
      },
      "baseFriendship": 50,
      "baseExp": 142,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field",
        "Grass"
      ],
      "gender": {
        "m": 87.5,
        "f": 12.5
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "003",
      "name": "Terratlus",
      "category": "World Defender",
      "types": [
        "GRASS",
        "ROCK"
      ],
      "height": "7'07\" ft",
      "weight": "1567.9 lbs",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Gaia Guardian",
        "Overgrow"
      ],
      "hidden": "Stamina",
      "stats": {
        "HP": 84,
        "ATK": 103,
        "DEF": 118,
        "SPE": 75,
        "SPA": 70,
        "SPD": 80
      },
      "flavor": "Terratlus, known as \"Protectors\", are calm and kind, devoted to the rock they've kept. It's said that their rocks hold the light of the world.",
      "evo": {
        "from": "002",
        "method": "Lv 38"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Defense Curl"
        },
        {
          "lv": "1",
          "name": "Leafage"
        },
        {
          "lv": "1",
          "name": "Barrage"
        },
        {
          "lv": "11",
          "name": "Seismic Toss"
        },
        {
          "lv": "15",
          "name": "Grass Whistle"
        },
        {
          "lv": "19",
          "name": "Razor Leaf"
        },
        {
          "lv": "24",
          "name": "Worry Seed"
        },
        {
          "lv": "28",
          "name": "Headbutt"
        },
        {
          "lv": "33",
          "name": "Stealth Rock"
        },
        {
          "lv": "39",
          "name": "Rock Blast"
        },
        {
          "lv": "46",
          "name": "Bulk Up"
        },
        {
          "lv": "52",
          "name": "Chi Blast"
        },
        {
          "lv": "59",
          "name": "Stone Edge"
        },
        {
          "lv": "66",
          "name": "Leaf Storm"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        }
      ],
      "anomaly": {
        "discoverer": "Mapleaudino"
      },
      "evYield": {
        "DEF": 2,
        "ATK": 1
      },
      "baseFriendship": 50,
      "baseExp": 236,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field",
        "Grass"
      ],
      "gender": {
        "m": 87.5,
        "f": 12.5
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "004",
      "name": "Flaret",
      "category": "Bounding Flame",
      "types": [
        "FIRE"
      ],
      "height": "0'08\" ft",
      "weight": "4.4 lbs",
      "catchRate": 140,
      "found": [
        "Saudade Town (Starter)"
      ],
      "abilities": [
        "Blaze"
      ],
      "hidden": "Competitive",
      "stats": {
        "HP": 45,
        "ATK": 60,
        "DEF": 45,
        "SPE": 63,
        "SPA": 52,
        "SPD": 45
      },
      "flavor": "Flaret are most often seen on clear nights in groups of 4-5, stargazing. When excited, their tails can heat up to over 1000°F.",
      "evo": {
        "to": "005"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "3",
          "name": "Tail Whip"
        },
        {
          "lv": "6",
          "name": "Ember"
        },
        {
          "lv": "11",
          "name": "Brutal Swing"
        },
        {
          "lv": "15",
          "name": "Sand Attack"
        },
        {
          "lv": "18",
          "name": "Flame Wheel"
        },
        {
          "lv": "22",
          "name": "After You"
        },
        {
          "lv": "25",
          "name": "Slam"
        },
        {
          "lv": "29",
          "name": "Light Screen"
        },
        {
          "lv": "33",
          "name": "Lightspeed Dash"
        },
        {
          "lv": "36",
          "name": "Coil"
        },
        {
          "lv": "39",
          "name": "Supernova"
        },
        {
          "lv": "43",
          "name": "Burn Up"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Fire Spin"
        },
        {
          "lv": "EGG",
          "name": "Baton Pass"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "eliasderzocker2"
      },
      "evYield": {
        "SPE": 1
      },
      "baseFriendship": 50,
      "baseExp": 62,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 87.5,
        "f": 12.5
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "005",
      "name": "Warrpen",
      "category": "Starfire",
      "types": [
        "FIRE",
        "COSMIC"
      ],
      "height": "1'08\" ft",
      "weight": "10.1 lbs",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Blaze"
      ],
      "hidden": "Competitive",
      "stats": {
        "HP": 60,
        "ATK": 81,
        "DEF": 57,
        "SPE": 83,
        "SPA": 77,
        "SPD": 57
      },
      "flavor": "The stars in Warrpen’s tail are stars that have yet to be born. When that time comes, they disappear from its tail.",
      "evo": {
        "from": "004",
        "to": "006",
        "method": "Lv 16"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Space Dust"
        },
        {
          "lv": "1",
          "name": "Space Dust"
        },
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "1",
          "name": "Ember"
        },
        {
          "lv": "1",
          "name": "Brutal Swing"
        },
        {
          "lv": "15",
          "name": "Sand Attack"
        },
        {
          "lv": "19",
          "name": "Flame Wheel"
        },
        {
          "lv": "24",
          "name": "After You"
        },
        {
          "lv": "28",
          "name": "Slam"
        },
        {
          "lv": "33",
          "name": "Light Screen"
        },
        {
          "lv": "37",
          "name": "Lightspeed Dash"
        },
        {
          "lv": "42",
          "name": "Coil"
        },
        {
          "lv": "46",
          "name": "Supernova"
        },
        {
          "lv": "51",
          "name": "Burn Up"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        }
      ],
      "anomaly": {
        "discoverer": "eliasderzocker2"
      },
      "evYield": {
        "SPE": 1,
        "ATK": 1
      },
      "baseFriendship": 50,
      "baseExp": 142,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 87.5,
        "f": 12.5
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "006",
      "name": "Galeliadea",
      "category": "Supernova",
      "types": [
        "FIRE",
        "COSMIC"
      ],
      "height": "2'07\" ft",
      "weight": "15.4 lbs",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Burning Novae",
        "Blaze"
      ],
      "hidden": "Competitive",
      "stats": {
        "HP": 75,
        "ATK": 96,
        "DEF": 72,
        "SPE": 113,
        "SPA": 102,
        "SPD": 72
      },
      "flavor": "Unlike its previous stage, Galeliadea’s stars are dying. As they fade, they ripple across its body in stunning colors",
      "evo": {
        "from": "005",
        "method": "Lv 38"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Cleansing Flames"
        },
        {
          "lv": "1",
          "name": "Cleansing Flames"
        },
        {
          "lv": "1",
          "name": "Space Dust"
        },
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "1",
          "name": "Ember"
        },
        {
          "lv": "1",
          "name": "Brutal Swing"
        },
        {
          "lv": "11",
          "name": "Agility"
        },
        {
          "lv": "15",
          "name": "Sand Attack"
        },
        {
          "lv": "19",
          "name": "Flame Wheel"
        },
        {
          "lv": "24",
          "name": "After You"
        },
        {
          "lv": "28",
          "name": "Slam"
        },
        {
          "lv": "33",
          "name": "Light Screen"
        },
        {
          "lv": "40",
          "name": "Lightspeed Dash"
        },
        {
          "lv": "46",
          "name": "Coil"
        },
        {
          "lv": "52",
          "name": "Supernova"
        },
        {
          "lv": "59",
          "name": "Moonlight"
        },
        {
          "lv": "67",
          "name": "Burn Up"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        }
      ],
      "anomaly": {
        "discoverer": "eliasderzocker2"
      },
      "evYield": {
        "SPE": 2,
        "ATK": 1
      },
      "baseFriendship": 50,
      "baseExp": 240,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 87.5,
        "f": 12.5
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "007",
      "name": "Cubble",
      "category": "Pondering",
      "types": [
        "WATER"
      ],
      "height": "1'04\" ft",
      "weight": "15 lbs",
      "catchRate": 140,
      "found": [
        "Saudade Town (Starter)"
      ],
      "abilities": [
        "Torrent"
      ],
      "hidden": "Unaware",
      "stats": {
        "HP": 65,
        "ATK": 36,
        "DEF": 58,
        "SPE": 33,
        "SPA": 50,
        "SPD": 68
      },
      "flavor": "Cubble are curious and constantly tired little creatures even if they did nothing. Each bubble they make is said to be a thought from their day.",
      "evo": {
        "to": "008"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "4",
          "name": "Growl"
        },
        {
          "lv": "6",
          "name": "Bubble"
        },
        {
          "lv": "11",
          "name": "Fake Out"
        },
        {
          "lv": "15",
          "name": "Fake Tears"
        },
        {
          "lv": "18",
          "name": "Bubble Beam"
        },
        {
          "lv": "22",
          "name": "Aqua Ring"
        },
        {
          "lv": "25",
          "name": "Yawn"
        },
        {
          "lv": "29",
          "name": "Hyper Voice"
        },
        {
          "lv": "32",
          "name": "Whirlpool"
        },
        {
          "lv": "36",
          "name": "Amnesia"
        },
        {
          "lv": "39",
          "name": "Hydro Pump"
        },
        {
          "lv": "43",
          "name": "Meteor Beam"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Chilling Water"
        },
        {
          "lv": "EGG",
          "name": "Echoed Voice"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "thechosenbug"
      },
      "evYield": {
        "SPD": 1
      },
      "baseFriendship": 50,
      "baseExp": 63,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field",
        "Water 1"
      ],
      "gender": {
        "m": 87.5,
        "f": 12.5
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "008",
      "name": "Popnaut",
      "category": "Pop Performer",
      "types": [
        "WATER",
        "NORMAL"
      ],
      "height": "2'07\" ft",
      "weight": "98.1 lbs",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Torrent"
      ],
      "hidden": "Unaware",
      "stats": {
        "HP": 75,
        "ATK": 46,
        "DEF": 68,
        "SPE": 58,
        "SPA": 80,
        "SPD": 88
      },
      "flavor": "Popnaut love to jump around and are full of energy. They may not know much, but they put all of their energy towards having fun.",
      "evo": {
        "from": "007",
        "to": "009",
        "method": "Lv 16"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Swift"
        },
        {
          "lv": "1",
          "name": "Swift"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Bubble"
        },
        {
          "lv": "1",
          "name": "Fake Out"
        },
        {
          "lv": "15",
          "name": "Fake Tears"
        },
        {
          "lv": "19",
          "name": "Bubble Beam"
        },
        {
          "lv": "24",
          "name": "Aqua Ring"
        },
        {
          "lv": "28",
          "name": "Yawn"
        },
        {
          "lv": "33",
          "name": "Hyper Voice"
        },
        {
          "lv": "37",
          "name": "Whirlpool"
        },
        {
          "lv": "42",
          "name": "Amnesia"
        },
        {
          "lv": "46",
          "name": "Hydro Pump"
        },
        {
          "lv": "50",
          "name": "Meteor Beam"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        }
      ],
      "anomaly": {
        "discoverer": "thechosenbug"
      },
      "evYield": {
        "SPD": 1,
        "SPA": 1
      },
      "baseFriendship": 50,
      "baseExp": 142,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field",
        "Water 1"
      ],
      "gender": {
        "m": 87.5,
        "f": 12.5
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "009",
      "name": "Kodinaut",
      "category": "Retired Abyss",
      "types": [
        "WATER",
        "NORMAL"
      ],
      "height": "6'03\" ft",
      "weight": "800.1 lbs",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Deep Abyss",
        "Torrent"
      ],
      "hidden": "Unaware",
      "stats": {
        "HP": 95,
        "ATK": 66,
        "DEF": 88,
        "SPE": 58,
        "SPA": 115,
        "SPD": 108
      },
      "flavor": "Kodinaut love silent and dark places like the bottom of the ocean, known for its calm and silence. It's said that if awoken, a calamity soon follows.",
      "evo": {
        "from": "008",
        "method": "Lv 38"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Sonar Ping"
        },
        {
          "lv": "1",
          "name": "Sonar Ping"
        },
        {
          "lv": "1",
          "name": "Swift"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Fake Out"
        },
        {
          "lv": "8",
          "name": "Bubble"
        },
        {
          "lv": "11",
          "name": "Calm Mind"
        },
        {
          "lv": "15",
          "name": "Fake Tears"
        },
        {
          "lv": "19",
          "name": "Bubble Beam"
        },
        {
          "lv": "24",
          "name": "Aqua Ring"
        },
        {
          "lv": "28",
          "name": "Yawn"
        },
        {
          "lv": "33",
          "name": "Hyper Voice"
        },
        {
          "lv": "39",
          "name": "Whirlpool"
        },
        {
          "lv": "46",
          "name": "Amnesia"
        },
        {
          "lv": "52",
          "name": "Hydro Pump"
        },
        {
          "lv": "59",
          "name": "Meteor Beam"
        },
        {
          "lv": "66",
          "name": "Belly Drum"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        }
      ],
      "anomaly": {
        "discoverer": "thechosenbug"
      },
      "evYield": {
        "SPA": 2,
        "SPD": 1
      },
      "baseFriendship": 50,
      "baseExp": 239,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field",
        "Water 1"
      ],
      "gender": {
        "m": 87.5,
        "f": 12.5
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "010",
      "name": "Sicklet",
      "category": "Sick Chick",
      "types": [
        "FLYING"
      ],
      "height": "1'00\" ft",
      "weight": "7.7 lbs",
      "catchRate": 255,
      "found": [
        "Route 1",
        "Route 2",
        "Eventide Forest"
      ],
      "abilities": [
        "Keen Eye",
        "Poison Touch"
      ],
      "hidden": "Overcoat",
      "stats": {
        "HP": 43,
        "ATK": 31,
        "DEF": 39,
        "SPE": 63,
        "SPA": 56,
        "SPD": 47
      },
      "flavor": "Sicklet are social Pokémon that often travel in groups. If one falls ill, the other Sicklet care for it until it recovers.",
      "evo": {
        "to": "011"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "5",
          "name": "Gust"
        },
        {
          "lv": "8",
          "name": "Acid"
        },
        {
          "lv": "12",
          "name": "Quick Attack"
        },
        {
          "lv": "15",
          "name": "Double Team"
        },
        {
          "lv": "21",
          "name": "Air Slash"
        },
        {
          "lv": "25",
          "name": "Toxic"
        },
        {
          "lv": "31",
          "name": "Sludge"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Steel Wing"
        },
        {
          "lv": "EGG",
          "name": "Ominous Wind"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Jade V"
      },
      "evYield": {
        "SPE": 1
      },
      "baseFriendship": 50,
      "baseExp": 49,
      "growthRate": "Medium",
      "eggGroups": [
        "Flying"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "011",
      "name": "Buzzant",
      "category": "Airborne Illness",
      "types": [
        "FLYING",
        "POISON"
      ],
      "height": "3'11\" ft",
      "weight": "70.5 lbs",
      "catchRate": 120,
      "found": [],
      "abilities": [
        "Merciless",
        "Poison Touch"
      ],
      "hidden": "Overcoat",
      "stats": {
        "HP": 57,
        "ATK": 46,
        "DEF": 56,
        "SPE": 87,
        "SPA": 74,
        "SPD": 68
      },
      "flavor": "Buzzant are opportunistic, known to pick on poisoned Pokémon, attacking them until they faint.",
      "evo": {
        "from": "010",
        "to": "012",
        "method": "Lv 14"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Gust"
        },
        {
          "lv": "1",
          "name": "Acid"
        },
        {
          "lv": "1",
          "name": "Quick Attack"
        },
        {
          "lv": "18",
          "name": "Double Team"
        },
        {
          "lv": "22",
          "name": "Air Slash"
        },
        {
          "lv": "26",
          "name": "Sludge"
        },
        {
          "lv": "29",
          "name": "Toxic"
        },
        {
          "lv": "32",
          "name": "Defog"
        },
        {
          "lv": "37",
          "name": "Sludge Bomb"
        },
        {
          "lv": "42",
          "name": "Toxic Spikes"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Jade V"
      },
      "evYield": {
        "SPE": 2
      },
      "baseFriendship": 50,
      "baseExp": 119,
      "growthRate": "Medium",
      "eggGroups": [
        "Flying"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "012",
      "name": "Grimazos",
      "category": "Plague Doctor",
      "types": [
        "FLYING",
        "POISON"
      ],
      "height": "5'11\" ft",
      "weight": "97.9 lbs",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Merciless",
        "Sickness"
      ],
      "hidden": "Overcoat",
      "stats": {
        "HP": 86,
        "ATK": 73,
        "DEF": 68,
        "SPE": 95,
        "SPA": 97,
        "SPD": 74
      },
      "flavor": "Grimazos are said to spread poison and sickness wherever it goes, though it seems to be a choice they make themselves.",
      "evo": {
        "from": "011",
        "method": "Lv 30"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Venoshock"
        },
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Gust"
        },
        {
          "lv": "1",
          "name": "Acid"
        },
        {
          "lv": "1",
          "name": "Quick Attack"
        },
        {
          "lv": "1",
          "name": "Double Team"
        },
        {
          "lv": "1",
          "name": "Air Slash"
        },
        {
          "lv": "1",
          "name": "Sludge"
        },
        {
          "lv": "1",
          "name": "Toxic"
        },
        {
          "lv": "36",
          "name": "Defog"
        },
        {
          "lv": "41",
          "name": "Sludge Bomb"
        },
        {
          "lv": "45",
          "name": "Hurricane"
        },
        {
          "lv": "49",
          "name": "Toxic Spikes"
        },
        {
          "lv": "53",
          "name": "Brave Bird"
        },
        {
          "lv": "58",
          "name": "Sludge Wave"
        },
        {
          "lv": "64",
          "name": "Memento"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Jade V"
      },
      "evYield": {
        "SPA": 2,
        "SPE": 1
      },
      "baseFriendship": 50,
      "baseExp": 243,
      "growthRate": "Medium",
      "eggGroups": [
        "Flying"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "013",
      "name": "Rarcraft",
      "category": "Scavenging",
      "types": [
        "NORMAL"
      ],
      "height": "1'00\" ft",
      "weight": "4.6 lbs",
      "catchRate": 255,
      "found": [
        "Route 1",
        "Route 2",
        "Route 3",
        "Route 5"
      ],
      "abilities": [
        "Pickup",
        "Frisk"
      ],
      "hidden": "Pickpocket",
      "stats": {
        "HP": 37,
        "ATK": 42,
        "DEF": 40,
        "SPE": 54,
        "SPA": 32,
        "SPD": 37
      },
      "flavor": "Inspired by trashed, old, comic books, Rarcraft dream of becoming heroes. Their favorite powers are high durability, super speed and flight.",
      "evo": {
        "to": [
          "014",
          "015",
          "016"
        ],
        "note": "Put Rarcraft first in your party before using a trash can."
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Scratch"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "3",
          "name": "Thief"
        },
        {
          "lv": "6",
          "name": "Recycle"
        },
        {
          "lv": "9",
          "name": "Covet"
        },
        {
          "lv": "12",
          "name": "Snarl"
        },
        {
          "lv": "15",
          "name": "Charm"
        },
        {
          "lv": "18",
          "name": "Retaliate"
        },
        {
          "lv": "21",
          "name": "Switcheroo"
        },
        {
          "lv": "24",
          "name": "Nature Power"
        },
        {
          "lv": "27",
          "name": "Play Rough"
        },
        {
          "lv": "30",
          "name": "Snatch"
        },
        {
          "lv": "33",
          "name": "Fling"
        },
        {
          "lv": "36",
          "name": "Last Resort"
        },
        {
          "lv": "39",
          "name": "Tidy Up"
        },
        {
          "lv": "42",
          "name": "Baton Pass"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Mud-Slap"
        },
        {
          "lv": "EGG",
          "name": "Comet Punch"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPE": 1
      },
      "baseFriendship": 70,
      "baseExp": 51,
      "growthRate": "Medium",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "014",
      "name": "Raclank",
      "category": "Sturdy Knight",
      "types": [
        "NORMAL",
        "STEEL"
      ],
      "height": "4'07\" ft",
      "weight": "151.9 lbs",
      "catchRate": 127,
      "found": [],
      "abilities": [
        "Mirror Armor",
        "Battle Armor"
      ],
      "hidden": "Heatproof",
      "stats": {
        "HP": 67,
        "ATK": 80,
        "DEF": 90,
        "SPE": 64,
        "SPA": 42,
        "SPD": 72
      },
      "flavor": "Inspired by the hero \"Might Knight\", Raclank shields themselves with a trash can. No amount of heat or blunt force can put a dent into it.",
      "evo": {
        "from": "013",
        "method": "Lv 20+ · Trash can · Highest DEF",
        "details": "Hold Might Knight Comic to choose this evolution instead of using stats. Without a comic, compare Defense, Attack and Speed; ties favour Defense, then Attack. The comic is consumed."
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Bullet Punch"
        },
        {
          "lv": "1",
          "name": "Bullet Punch"
        },
        {
          "lv": "1",
          "name": "Switcheroo"
        },
        {
          "lv": "1",
          "name": "Nature Power"
        },
        {
          "lv": "1",
          "name": "Play Rough"
        },
        {
          "lv": "1",
          "name": "Fling"
        },
        {
          "lv": "1",
          "name": "Scratch"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "3",
          "name": "Thief"
        },
        {
          "lv": "6",
          "name": "Recycle"
        },
        {
          "lv": "9",
          "name": "Covet"
        },
        {
          "lv": "12",
          "name": "Snarl"
        },
        {
          "lv": "15",
          "name": "Charm"
        },
        {
          "lv": "18",
          "name": "Retaliate"
        },
        {
          "lv": "23",
          "name": "Wide Guard"
        },
        {
          "lv": "28",
          "name": "Heavy Slam"
        },
        {
          "lv": "33",
          "name": "Leaf Blade"
        },
        {
          "lv": "38",
          "name": "Snatch"
        },
        {
          "lv": "43",
          "name": "Meteor Mash"
        },
        {
          "lv": "48",
          "name": "Last Resort"
        },
        {
          "lv": "53",
          "name": "Sacred Sword"
        },
        {
          "lv": "58",
          "name": "Baton Pass"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        },
        {
          "lv": "TM16",
          "name": "Low Sweep"
        }
      ],
      "anomaly": null,
      "evYield": {
        "DEF": 1,
        "ATK": 1
      },
      "baseFriendship": 70,
      "baseExp": 145,
      "growthRate": "Medium",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "015",
      "name": "Rasoar",
      "category": "Paper Wing",
      "types": [
        "NORMAL",
        "FLYING"
      ],
      "height": "4'03\" ft",
      "weight": "111.3 lbs",
      "catchRate": 127,
      "found": [],
      "abilities": [
        "Gale Wings",
        "Infiltrator"
      ],
      "hidden": "Prankster",
      "stats": {
        "HP": 67,
        "ATK": 97,
        "DEF": 56,
        "SPE": 84,
        "SPA": 52,
        "SPD": 59
      },
      "flavor": "Inspired by the heroine \"Harpyie\", Rasoar use wings made out of newspapers to fly. Strangely, some of the newspapers showcase headlines from the future.",
      "evo": {
        "from": "013",
        "method": "Lv 20+ · Trash can · Highest ATK",
        "details": "Hold Harpyie Comic to choose this evolution instead of using stats. Without a comic, compare Defense, Attack and Speed; ties favour Defense, then Attack. The comic is consumed."
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Wing Attack"
        },
        {
          "lv": "1",
          "name": "Wing Attack"
        },
        {
          "lv": "1",
          "name": "Switcheroo"
        },
        {
          "lv": "1",
          "name": "Nature Power"
        },
        {
          "lv": "1",
          "name": "Play Rough"
        },
        {
          "lv": "1",
          "name": "Fling"
        },
        {
          "lv": "1",
          "name": "Scratch"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "3",
          "name": "Thief"
        },
        {
          "lv": "6",
          "name": "Recycle"
        },
        {
          "lv": "9",
          "name": "Covet"
        },
        {
          "lv": "12",
          "name": "Snarl"
        },
        {
          "lv": "15",
          "name": "Charm"
        },
        {
          "lv": "18",
          "name": "Retaliate"
        },
        {
          "lv": "23",
          "name": "Quick Guard"
        },
        {
          "lv": "28",
          "name": "Fly"
        },
        {
          "lv": "33",
          "name": "Grav Apple"
        },
        {
          "lv": "38",
          "name": "Snatch"
        },
        {
          "lv": "43",
          "name": "Tailwind"
        },
        {
          "lv": "48",
          "name": "Last Resort"
        },
        {
          "lv": "53",
          "name": "Flying Press"
        },
        {
          "lv": "58",
          "name": "Baton Pass"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        }
      ],
      "anomaly": null,
      "evYield": {
        "ATK": 1,
        "SPE": 1
      },
      "baseFriendship": 70,
      "baseExp": 145,
      "growthRate": "Medium",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "016",
      "name": "Razoom",
      "category": "Sugar Rush",
      "types": [
        "NORMAL",
        "ELECTRIC"
      ],
      "height": "4'11\" ft",
      "weight": "136.7 lbs",
      "catchRate": 127,
      "found": [],
      "abilities": [
        "Speed Boost",
        "Insomnia"
      ],
      "hidden": "Electric Surge",
      "stats": {
        "HP": 67,
        "ATK": 52,
        "DEF": 50,
        "SPE": 94,
        "SPA": 75,
        "SPD": 77
      },
      "flavor": "Inspired by the hero \"Sugar Rush\", Razoom fuels itself with fizzed up energy drinks, racing beyond the naked eye. But never enough for time travel.",
      "evo": {
        "from": "013",
        "method": "Lv 20+ · Trash can · Highest SPE",
        "details": "Hold Sugar Rush Comic to choose this evolution instead of using stats. Without a comic, compare Defense, Attack and Speed; ties favour Defense, then Attack. The comic is consumed."
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Swift"
        },
        {
          "lv": "0",
          "name": "Electro Ball"
        },
        {
          "lv": "1",
          "name": "Swift"
        },
        {
          "lv": "1",
          "name": "Electro Ball"
        },
        {
          "lv": "1",
          "name": "Switcheroo"
        },
        {
          "lv": "1",
          "name": "Nature Power"
        },
        {
          "lv": "1",
          "name": "Play Rough"
        },
        {
          "lv": "1",
          "name": "Fling"
        },
        {
          "lv": "1",
          "name": "Scratch"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "3",
          "name": "Thief"
        },
        {
          "lv": "6",
          "name": "Recycle"
        },
        {
          "lv": "9",
          "name": "Covet"
        },
        {
          "lv": "12",
          "name": "Snarl"
        },
        {
          "lv": "15",
          "name": "Charm"
        },
        {
          "lv": "18",
          "name": "Retaliate"
        },
        {
          "lv": "23",
          "name": "Detect"
        },
        {
          "lv": "28",
          "name": "Parabolic Charge"
        },
        {
          "lv": "33",
          "name": "Tri Attack"
        },
        {
          "lv": "38",
          "name": "Snatch"
        },
        {
          "lv": "43",
          "name": "Thunderclap"
        },
        {
          "lv": "48",
          "name": "Last Resort"
        },
        {
          "lv": "53",
          "name": "Boomburst"
        },
        {
          "lv": "58",
          "name": "Baton Pass"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        },
        {
          "lv": "TM16",
          "name": "Low Sweep"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPE": 2
      },
      "baseFriendship": 70,
      "baseExp": 145,
      "growthRate": "Medium",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "017",
      "name": "Reetle",
      "category": "Charging",
      "types": [
        "BUG"
      ],
      "height": "1'00\" ft",
      "weight": "6.8 lbs",
      "catchRate": 255,
      "found": [
        "Route 1",
        "Eventide Forest"
      ],
      "abilities": [
        "Rattled",
        "Compound Eyes"
      ],
      "hidden": "Soundproof",
      "stats": {
        "HP": 35,
        "ATK": 30,
        "DEF": 30,
        "SPE": 40,
        "SPA": 25,
        "SPD": 30
      },
      "flavor": "Reetle is assumed to be easy prey due to how physically weak it is, but its outer carapace is toughened from blindly ramming into rocks and trees.",
      "evo": {
        "to": "018"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Astonish"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "4",
          "name": "Flail"
        },
        {
          "lv": "8",
          "name": "Pounce"
        },
        {
          "lv": "12",
          "name": "Screech"
        },
        {
          "lv": "20",
          "name": "Hyper Voice"
        },
        {
          "lv": "36",
          "name": "Boomburst"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Headbutt"
        },
        {
          "lv": "EGG",
          "name": "Fissure"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        }
      ],
      "anomaly": {
        "discoverer": "BeckS"
      },
      "evYield": {
        "SPE": 1
      },
      "baseFriendship": 50,
      "baseExp": 36,
      "growthRate": "Medium",
      "eggGroups": [
        "Bug",
        "Monster"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "018",
      "name": "Concewn",
      "category": "Crashing",
      "types": [
        "BUG",
        "GROUND"
      ],
      "height": "2'00\" ft",
      "weight": "34 lbs",
      "catchRate": 120,
      "found": [
        "Route 4"
      ],
      "abilities": [
        "Shed Skin",
        "Compound Eyes"
      ],
      "hidden": "Soundproof",
      "stats": {
        "HP": 55,
        "ATK": 50,
        "DEF": 80,
        "SPE": 45,
        "SPA": 45,
        "SPD": 60
      },
      "flavor": "In ancient times their shell was used as armor. Concewn strangely enjoy taking hits and seek out strong attackers.",
      "evo": {
        "from": "017",
        "to": "019",
        "method": "Lv 12"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Iron Defense"
        },
        {
          "lv": "1",
          "name": "Iron Defense"
        },
        {
          "lv": "1",
          "name": "Smack Down"
        },
        {
          "lv": "1",
          "name": "Astonish"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "4",
          "name": "Flail"
        },
        {
          "lv": "8",
          "name": "Pounce"
        },
        {
          "lv": "12",
          "name": "Screech"
        },
        {
          "lv": "16",
          "name": "Magnitude"
        },
        {
          "lv": "21",
          "name": "Laser Focus"
        },
        {
          "lv": "26",
          "name": "Take Down"
        },
        {
          "lv": "31",
          "name": "Lunge"
        },
        {
          "lv": "36",
          "name": "Acupressure"
        },
        {
          "lv": "41",
          "name": "Double-Edge"
        },
        {
          "lv": "46",
          "name": "Spikes"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "BeckS"
      },
      "evYield": {
        "DEF": 2
      },
      "baseFriendship": 50,
      "baseExp": 117,
      "growthRate": "Medium",
      "eggGroups": [
        "Bug",
        "Monster"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "019",
      "name": "Rihnihilate",
      "category": "Raging",
      "types": [
        "BUG",
        "GROUND"
      ],
      "height": "4'03\" ft",
      "weight": "82.2 lbs",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Stampede",
        "Moxie"
      ],
      "hidden": "Reckless",
      "stats": {
        "HP": 80,
        "ATK": 120,
        "DEF": 100,
        "SPE": 90,
        "SPA": 45,
        "SPD": 70
      },
      "flavor": "An enraged Rihnihilate can smash through walls, trees and even creatures alike to reach its target, earning the title \"unstoppable force\".",
      "evo": {
        "from": "018",
        "method": "Lv 32"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Drill Run"
        },
        {
          "lv": "1",
          "name": "Drill Run"
        },
        {
          "lv": "1",
          "name": "Iron Defense"
        },
        {
          "lv": "1",
          "name": "Smack Down"
        },
        {
          "lv": "1",
          "name": "Astonish"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "4",
          "name": "Flail"
        },
        {
          "lv": "8",
          "name": "Pounce"
        },
        {
          "lv": "12",
          "name": "Screech"
        },
        {
          "lv": "16",
          "name": "Magnitude"
        },
        {
          "lv": "21",
          "name": "Laser Focus"
        },
        {
          "lv": "26",
          "name": "Take Down"
        },
        {
          "lv": "31",
          "name": "Lunge"
        },
        {
          "lv": "36",
          "name": "Acupressure"
        },
        {
          "lv": "42",
          "name": "Double-Edge"
        },
        {
          "lv": "48",
          "name": "Megahorn"
        },
        {
          "lv": "54",
          "name": "Spikes"
        },
        {
          "lv": "60",
          "name": "Head Smash"
        },
        {
          "lv": "66",
          "name": "Headlong Rush"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "BeckS"
      },
      "evYield": {
        "ATK": 2,
        "DEF": 1
      },
      "baseFriendship": 50,
      "baseExp": 253,
      "growthRate": "Medium",
      "eggGroups": [
        "Bug",
        "Monster"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "020",
      "name": "Dustalon",
      "category": "Brood Litter",
      "types": [
        "GROUND"
      ],
      "height": "1'04\" ft",
      "weight": "4 lbs",
      "catchRate": 120,
      "found": [
        "Route 3"
      ],
      "abilities": [
        "Tangled Feet",
        "Big Pecks"
      ],
      "hidden": "Keen Eye",
      "stats": {
        "HP": 67,
        "ATK": 40,
        "DEF": 50,
        "SPE": 40,
        "SPA": 50,
        "SPD": 60
      },
      "flavor": "Dustalon's wings are too small to fly yet, so instead, they help their flocks by burrowing underground and gathering materials for their elders.",
      "evo": {
        "to": [
          "021",
          "022"
        ]
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Sand Attack"
        },
        {
          "lv": "6",
          "name": "Quick Attack"
        },
        {
          "lv": "9",
          "name": "Gust"
        },
        {
          "lv": "13",
          "name": "Hone Claws"
        },
        {
          "lv": "17",
          "name": "Mud-Slap"
        },
        {
          "lv": "22",
          "name": "Whirlwind"
        },
        {
          "lv": "26",
          "name": "Aerial Ace"
        },
        {
          "lv": "31",
          "name": "Agility"
        },
        {
          "lv": "36",
          "name": "Feather Dance"
        },
        {
          "lv": "41",
          "name": "Brave Bird"
        },
        {
          "lv": "46",
          "name": "Hurricane"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Air Cutter"
        },
        {
          "lv": "EGG",
          "name": "Pursuit"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": null,
      "evYield": {
        "HP": 1
      },
      "baseFriendship": 50,
      "baseExp": 76,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field",
        "Flying"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "021",
      "name": "Tufftalon",
      "category": "Ground Guardian",
      "types": [
        "GROUND",
        "FLYING"
      ],
      "height": "4'07\" ft",
      "weight": "114.6 lbs",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Sand Bath",
        "Big Pecks"
      ],
      "hidden": "Sand Spit",
      "stats": {
        "HP": 105,
        "ATK": 95,
        "DEF": 115,
        "SPE": 50,
        "SPA": 65,
        "SPD": 75
      },
      "flavor": "Their large bodies make them too heavy for flight, so instead, they use their strength to build ample rock niches with materials gathered by Dustalon.",
      "evo": {
        "from": "020",
        "method": "Lv 30 (male)"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Drill Peck"
        },
        {
          "lv": "1",
          "name": "Drill Peck"
        },
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Sand Attack"
        },
        {
          "lv": "1",
          "name": "Quick Attack"
        },
        {
          "lv": "1",
          "name": "Gust"
        },
        {
          "lv": "1",
          "name": "Hone Claws"
        },
        {
          "lv": "1",
          "name": "Mud-Slap"
        },
        {
          "lv": "1",
          "name": "Whirlwind"
        },
        {
          "lv": "1",
          "name": "Aerial Ace"
        },
        {
          "lv": "35",
          "name": "Stomping Tantrum"
        },
        {
          "lv": "41",
          "name": "Feather Dance"
        },
        {
          "lv": "47",
          "name": "Brave Bird"
        },
        {
          "lv": "52",
          "name": "Stealth Rock"
        },
        {
          "lv": "58",
          "name": "Iron Defense"
        },
        {
          "lv": "64",
          "name": "Earthquake"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Rathalor"
      },
      "evYield": {
        "DEF": 2
      },
      "baseFriendship": 50,
      "baseExp": 232,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field",
        "Flying"
      ],
      "gender": {
        "m": 100,
        "f": 0
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "022",
      "name": "Cufftalon",
      "category": "Aerial Guardian",
      "types": [
        "FLYING",
        "GROUND"
      ],
      "height": "3'11\" ft",
      "weight": "83.8 lbs",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Sand Rush",
        "Big Pecks"
      ],
      "hidden": "Sand Stream",
      "stats": {
        "HP": 75,
        "ATK": 50,
        "DEF": 65,
        "SPE": 105,
        "SPA": 115,
        "SPD": 95
      },
      "flavor": "Their quick and nimble bodies make them able to fly, which helps them survey the ground and gather food for the group.",
      "evo": {
        "from": "020",
        "method": "Lv 30 (female)"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Air Slash"
        },
        {
          "lv": "1",
          "name": "Air Slash"
        },
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Sand Attack"
        },
        {
          "lv": "1",
          "name": "Quick Attack"
        },
        {
          "lv": "1",
          "name": "Gust"
        },
        {
          "lv": "1",
          "name": "Hone Claws"
        },
        {
          "lv": "1",
          "name": "Mud-Slap"
        },
        {
          "lv": "1",
          "name": "Whirlwind"
        },
        {
          "lv": "1",
          "name": "Aerial Ace"
        },
        {
          "lv": "35",
          "name": "Scorching Sands"
        },
        {
          "lv": "41",
          "name": "Defog"
        },
        {
          "lv": "47",
          "name": "Hurricane"
        },
        {
          "lv": "52",
          "name": "U-turn"
        },
        {
          "lv": "58",
          "name": "Agility"
        },
        {
          "lv": "64",
          "name": "Earth Power"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Rathalor"
      },
      "evYield": {
        "SPA": 2
      },
      "baseFriendship": 50,
      "baseExp": 232,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field",
        "Flying"
      ],
      "gender": {
        "m": 0,
        "f": 100
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "023",
      "name": "Marmie",
      "category": "Scrappy",
      "types": [
        "NORMAL",
        "DARK"
      ],
      "height": "0'08\" ft",
      "weight": "19.8 lbs",
      "catchRate": 180,
      "found": [
        "Eventide Forest"
      ],
      "abilities": [
        "Fur Coat",
        "Opportunist"
      ],
      "hidden": "Hustle",
      "stats": {
        "HP": 50,
        "ATK": 60,
        "DEF": 50,
        "SPE": 55,
        "SPA": 30,
        "SPD": 45
      },
      "flavor": "Despite its tiny size, Marmie brims with fighting spirit. Swinging its tiny fists at foes ten times larger, though they land like soft and fluffy pats.",
      "evo": {
        "to": "024"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Power Trip"
        },
        {
          "lv": "1",
          "name": "Leer"
        },
        {
          "lv": "5",
          "name": "Work Up"
        },
        {
          "lv": "8",
          "name": "Fake Out"
        },
        {
          "lv": "12",
          "name": "Arm Thrust"
        },
        {
          "lv": "15",
          "name": "Focus Energy"
        },
        {
          "lv": "19",
          "name": "Comet Punch"
        },
        {
          "lv": "22",
          "name": "Beat Up"
        },
        {
          "lv": "26",
          "name": "Vital Throw"
        },
        {
          "lv": "29",
          "name": "Bulk Up"
        },
        {
          "lv": "33",
          "name": "Strength"
        },
        {
          "lv": "36",
          "name": "Knock Off"
        },
        {
          "lv": "40",
          "name": "Drain Punch"
        },
        {
          "lv": "43",
          "name": "Nasty Plot"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Chip Away"
        },
        {
          "lv": "EGG",
          "name": "Taunt"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        },
        {
          "lv": "TM16",
          "name": "Low Sweep"
        }
      ],
      "anomaly": null,
      "evYield": {
        "ATK": 1
      },
      "baseFriendship": 50,
      "baseExp": 70,
      "growthRate": "Slow",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "024",
      "name": "Maulmot",
      "category": "Humble",
      "types": [
        "FIGHTING",
        "DARK"
      ],
      "height": "5'11\" ft",
      "weight": "396.8 lbs",
      "catchRate": 90,
      "found": [],
      "abilities": [
        "Fur Coat",
        "Opportunist"
      ],
      "hidden": "Truant",
      "stats": {
        "HP": 95,
        "ATK": 105,
        "DEF": 80,
        "SPE": 75,
        "SPA": 40,
        "SPD": 75
      },
      "flavor": "Maulmot is immensely strong yet shuns conflict, using its bulk to block cave entrances, but would rather take a nap than throw a punch.",
      "evo": {
        "from": "023",
        "method": "Lv 25"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Obstruct"
        },
        {
          "lv": "1",
          "name": "Obstruct"
        },
        {
          "lv": "1",
          "name": "Body Press"
        },
        {
          "lv": "1",
          "name": "Nasty Plot"
        },
        {
          "lv": "1",
          "name": "Power Trip"
        },
        {
          "lv": "1",
          "name": "Leer"
        },
        {
          "lv": "1",
          "name": "Work Up"
        },
        {
          "lv": "1",
          "name": "Fake Out"
        },
        {
          "lv": "12",
          "name": "Arm Thrust"
        },
        {
          "lv": "15",
          "name": "Focus Energy"
        },
        {
          "lv": "19",
          "name": "Comet Punch"
        },
        {
          "lv": "22",
          "name": "Beat Up"
        },
        {
          "lv": "27",
          "name": "Vital Throw"
        },
        {
          "lv": "31",
          "name": "Bulk Up"
        },
        {
          "lv": "36",
          "name": "Strength"
        },
        {
          "lv": "40",
          "name": "Knock Off"
        },
        {
          "lv": "45",
          "name": "Drain Punch"
        },
        {
          "lv": "49",
          "name": "Yawn"
        },
        {
          "lv": "54",
          "name": "Final Gambit"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        },
        {
          "lv": "TM16",
          "name": "Low Sweep"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        }
      ],
      "anomaly": null,
      "evYield": {
        "ATK": 1,
        "HP": 1
      },
      "baseFriendship": 50,
      "baseExp": 194,
      "growthRate": "Slow",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": [],
      "forms": [
        {
          "name": "Corrupted Maulmot",
          "category": "Warrior",
          "types": [
            "FIGHTING",
            "COSMIC"
          ],
          "stats": {
            "HP": 95,
            "ATK": 115,
            "DEF": 70,
            "SPE": 105,
            "SPA": 20,
            "SPD": 65
          },
          "height": "9'10\" ft",
          "weight": "647.5 lbs",
          "abilities": [
            "Fur Coat",
            "Sheer Force"
          ],
          "hidden": "Mind's Eye",
          "catchRate": 25,
          "baseFriendship": 0,
          "baseExp": 194,
          "growthRate": "Slow",
          "eggGroups": [
            "Field"
          ],
          "eggCycles": 3840,
          "gender": {
            "m": 50,
            "f": 50
          },
          "evYield": {
            "ATK": 1,
            "SPE": 1
          },
          "levelMoves": [
            {
              "lv": "0",
              "name": "Eclipse Strike"
            },
            {
              "lv": "1",
              "name": "Eclipse Strike"
            },
            {
              "lv": "1",
              "name": "Psycho Cut"
            },
            {
              "lv": "1",
              "name": "Gamma Charge"
            },
            {
              "lv": "1",
              "name": "Power Trip"
            },
            {
              "lv": "1",
              "name": "Leer"
            },
            {
              "lv": "1",
              "name": "Work Up"
            },
            {
              "lv": "1",
              "name": "Fake Out"
            },
            {
              "lv": "12",
              "name": "Arm Thrust"
            },
            {
              "lv": "15",
              "name": "Focus Energy"
            },
            {
              "lv": "19",
              "name": "Comet Punch"
            },
            {
              "lv": "22",
              "name": "Beat Up"
            },
            {
              "lv": "27",
              "name": "Vital Throw"
            },
            {
              "lv": "31",
              "name": "Bulk Up"
            },
            {
              "lv": "36",
              "name": "Slash"
            },
            {
              "lv": "40",
              "name": "Astro Jab"
            },
            {
              "lv": "45",
              "name": "Sacred Sword"
            },
            {
              "lv": "49",
              "name": "Yawn"
            },
            {
              "lv": "54",
              "name": "Stellar Blade"
            }
          ],
          "eggMoves": [],
          "tmMoves": [
            {
              "lv": "TM04",
              "name": "Work Up"
            },
            {
              "lv": "TM02",
              "name": "Double Team"
            },
            {
              "lv": "TM05",
              "name": "Protect"
            },
            {
              "lv": "TM09",
              "name": "Thief"
            },
            {
              "lv": "TM14",
              "name": "Rest"
            },
            {
              "lv": "TM15",
              "name": "Thunder Wave"
            },
            {
              "lv": "TM16",
              "name": "Low Sweep"
            },
            {
              "lv": "TM08",
              "name": "Bulldoze"
            }
          ],
          "tutorMoves": [],
          "flavor": "Maulmot’s refusal to fight leaves it defenseless against creeping corruption, trapped in its own mind, helpless watching its fists swing",
          "spriteSuffix": "form-1",
          "spriteVariants": [
            {
              "label": "F1",
              "suffix": "form-1"
            },
            {
              "label": "F2",
              "suffix": "form-1-f2"
            },
            {
              "label": "Back",
              "suffix": "form-1-back"
            },
            {
              "label": "Shiny F1",
              "suffix": "form-1-shiny"
            }
          ]
        }
      ]
    },
    {
      "dex": "025",
      "name": "Yarnsect",
      "category": "Tangled",
      "types": [
        "BUG",
        "FAIRY"
      ],
      "height": "1'00\" ft",
      "weight": "4.4 lbs",
      "catchRate": 255,
      "found": [
        "Eventide Forest",
        "Pebpup Cavern"
      ],
      "abilities": [
        "Cute Charm",
        "Oblivious"
      ],
      "hidden": "Swarm",
      "stats": {
        "HP": 32,
        "ATK": 29,
        "DEF": 40,
        "SPE": 38,
        "SPA": 40,
        "SPD": 31
      },
      "flavor": "Yarnsect Yarn is a Drapallan Staple as it is one of the largest farmed materials due to its surprising durability, softness, and warmth.",
      "evo": {
        "to": "026"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Fairy Wind"
        },
        {
          "lv": "1",
          "name": "String Shot"
        },
        {
          "lv": "5",
          "name": "Cut"
        },
        {
          "lv": "8",
          "name": "Struggle Bug"
        },
        {
          "lv": "11",
          "name": "Sweet Scent"
        },
        {
          "lv": "14",
          "name": "Draining Kiss"
        },
        {
          "lv": "18",
          "name": "Spider Web"
        },
        {
          "lv": "22",
          "name": "Signal Beam"
        },
        {
          "lv": "25",
          "name": "Happily Ever After"
        },
        {
          "lv": "29",
          "name": "Sticky Web"
        },
        {
          "lv": "33",
          "name": "Rage Powder"
        },
        {
          "lv": "36",
          "name": "Bug Buzz"
        },
        {
          "lv": "40",
          "name": "Fantasia Blast"
        },
        {
          "lv": "44",
          "name": "First Impression"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Lunge"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "mymiguelito"
      },
      "evYield": {
        "SPD": 1
      },
      "baseFriendship": 70,
      "baseExp": 52,
      "growthRate": "Medium",
      "eggGroups": [
        "Bug",
        "Fairy"
      ],
      "gender": {
        "m": 25,
        "f": 75
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "026",
      "name": "Grantula",
      "category": "Knitting",
      "types": [
        "BUG",
        "FAIRY"
      ],
      "height": "2'07\" ft",
      "weight": "34.2 lbs",
      "catchRate": 90,
      "found": [],
      "abilities": [
        "Cute Charm",
        "Knit Trap"
      ],
      "hidden": "Swarm",
      "stats": {
        "HP": 60,
        "ATK": 49,
        "DEF": 80,
        "SPE": 76,
        "SPA": 80,
        "SPD": 59
      },
      "flavor": "Grantula are extremely loyal to their trainers. If you spend enough time with one, it will knit you a sweater using its yarn.",
      "evo": {
        "from": "025",
        "method": "Lv 15"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Silk Trap"
        },
        {
          "lv": "1",
          "name": "Silk Trap"
        },
        {
          "lv": "1",
          "name": "Fairy Wind"
        },
        {
          "lv": "1",
          "name": "String Shot"
        },
        {
          "lv": "1",
          "name": "Cut"
        },
        {
          "lv": "1",
          "name": "Struggle Bug"
        },
        {
          "lv": "11",
          "name": "Sweet Scent"
        },
        {
          "lv": "14",
          "name": "Draining Kiss"
        },
        {
          "lv": "19",
          "name": "Spider Web"
        },
        {
          "lv": "24",
          "name": "Signal Beam"
        },
        {
          "lv": "28",
          "name": "Happily Ever After"
        },
        {
          "lv": "33",
          "name": "Sticky Web"
        },
        {
          "lv": "37",
          "name": "Rage Powder"
        },
        {
          "lv": "41",
          "name": "Bug Buzz"
        },
        {
          "lv": "45",
          "name": "Fantasia Blast"
        },
        {
          "lv": "49",
          "name": "First Impression"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "mymiguelito"
      },
      "evYield": {
        "SPA": 1,
        "SPD": 1
      },
      "baseFriendship": 70,
      "baseExp": 162,
      "growthRate": "Medium",
      "eggGroups": [
        "Bug",
        "Fairy"
      ],
      "gender": {
        "m": 25,
        "f": 75
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "027",
      "name": "Pawnut",
      "category": "Seed Squire",
      "types": [
        "GRASS"
      ],
      "height": "1'04\" ft",
      "weight": "9.9 lbs",
      "catchRate": 255,
      "found": [
        "Eventide Forest"
      ],
      "abilities": [
        "Inner Focus",
        "Weak Armor"
      ],
      "hidden": "Anger Shell",
      "stats": {
        "HP": 50,
        "ATK": 70,
        "DEF": 65,
        "SPE": 40,
        "SPA": 25,
        "SPD": 55
      },
      "flavor": "A feeble Pokémon, Pawnut is often too scared to move. Foraging Cufftalon will sometimes pick them up, mistaking it for an acorn.",
      "evo": {
        "to": "028"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "4",
          "name": "Leech Seed"
        },
        {
          "lv": "7",
          "name": "Growth"
        },
        {
          "lv": "11",
          "name": "Protect"
        },
        {
          "lv": "16",
          "name": "Bullet Seed"
        },
        {
          "lv": "22",
          "name": "Giga Drain"
        },
        {
          "lv": "26",
          "name": "Ingrain"
        },
        {
          "lv": "32",
          "name": "Seed Bomb"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Worry Seed"
        },
        {
          "lv": "EGG",
          "name": "Power Whip"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Cybermage"
      },
      "evYield": {
        "ATK": 1
      },
      "baseFriendship": 50,
      "baseExp": 65,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field",
        "Grass"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "028",
      "name": "Peaknight",
      "category": "Valiant",
      "types": [
        "GRASS",
        "FIGHTING"
      ],
      "height": "4'07\" ft",
      "weight": "132.3 lbs",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Inner Focus",
        "Weak Armor"
      ],
      "hidden": "Anger Shell",
      "stats": {
        "HP": 70,
        "ATK": 102,
        "DEF": 90,
        "SPE": 105,
        "SPA": 55,
        "SPD": 80
      },
      "flavor": "Now much braver, Peaknight is a noble fighter. It is said that ancient warriors modeled their armor after Peaknight's hard exterior.",
      "evo": {
        "from": "027",
        "method": "Level up holding Assault Vest"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Mach Punch"
        },
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "1",
          "name": "Bullet Seed"
        },
        {
          "lv": "1",
          "name": "Growth"
        },
        {
          "lv": "1",
          "name": "Protect"
        },
        {
          "lv": "1",
          "name": "Leech Seed"
        },
        {
          "lv": "1",
          "name": "Giga Drain"
        },
        {
          "lv": "1",
          "name": "Ingrain"
        },
        {
          "lv": "26",
          "name": "Brick Break"
        },
        {
          "lv": "30",
          "name": "Fake Out"
        },
        {
          "lv": "35",
          "name": "Low Kick"
        },
        {
          "lv": "38",
          "name": "Trailblaze"
        },
        {
          "lv": "42",
          "name": "Facade"
        },
        {
          "lv": "48",
          "name": "Seed Bomb"
        },
        {
          "lv": "53",
          "name": "High Horsepower"
        },
        {
          "lv": "58",
          "name": "Close Combat"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM16",
          "name": "Low Sweep"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        }
      ],
      "anomaly": {
        "discoverer": "Cybermage"
      },
      "evYield": {
        "SPE": 2
      },
      "baseFriendship": 50,
      "baseExp": 165,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field",
        "Grass"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "029",
      "name": "Capikid",
      "category": "Tiny Spark",
      "types": [
        "ELECTRIC"
      ],
      "height": "1'04\" ft",
      "weight": "21.6 lbs",
      "catchRate": 220,
      "found": [
        "Route 3",
        "Route 5"
      ],
      "abilities": [
        "Fluffy",
        "Volt Absorb"
      ],
      "hidden": "Klutz",
      "stats": {
        "HP": 25,
        "ATK": 25,
        "DEF": 25,
        "SPE": 50,
        "SPA": 45,
        "SPD": 40
      },
      "flavor": "Capikid stores electrical energy in the fluffy clouds around its body. On dry days, herds roll about, rumbling like tiny thunderstorms.",
      "evo": {
        "to": "030"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Thunder Shock"
        },
        {
          "lv": "1",
          "name": "Baby-Doll Eyes"
        },
        {
          "lv": "4",
          "name": "Double Slap"
        },
        {
          "lv": "8",
          "name": "Thunder Wave"
        },
        {
          "lv": "12",
          "name": "Charge Beam"
        },
        {
          "lv": "16",
          "name": "Helping Hand"
        },
        {
          "lv": "20",
          "name": "Follow Me"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Spark"
        },
        {
          "lv": "EGG",
          "name": "Body Slam"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": {
        "discoverer": "miggins"
      },
      "evYield": {
        "SPE": 1
      },
      "baseFriendship": 50,
      "baseExp": 41,
      "growthRate": "Medium",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 2560,
      "tutorMoves": []
    },
    {
      "dex": "030",
      "name": "Capicharga",
      "category": "Static Weeze",
      "types": [
        "ELECTRIC"
      ],
      "height": "2'07\" ft",
      "weight": "88.8 lbs",
      "catchRate": 180,
      "found": [],
      "abilities": [
        "Fluffy",
        "Volt Absorb"
      ],
      "hidden": "Refrigerate",
      "stats": {
        "HP": 40,
        "ATK": 40,
        "DEF": 45,
        "SPE": 90,
        "SPA": 80,
        "SPD": 55
      },
      "flavor": "Capicharga delight in thunderstorms, happily waiting to absorb lightning strikes. Its cheeks would hum and glow indicating that it's full of charge.",
      "evo": {
        "from": "029",
        "to": "031",
        "method": "High friendship"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Double Slap"
        },
        {
          "lv": "1",
          "name": "Follow Me"
        },
        {
          "lv": "1",
          "name": "Charge Beam"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Thunder Wave"
        },
        {
          "lv": "1",
          "name": "Thunder Shock"
        },
        {
          "lv": "1",
          "name": "Baby-Doll Eyes"
        },
        {
          "lv": "3",
          "name": "Quick Attack"
        },
        {
          "lv": "8",
          "name": "Nuzzle"
        },
        {
          "lv": "12",
          "name": "Electrify"
        },
        {
          "lv": "15",
          "name": "Hyper Fang"
        },
        {
          "lv": "18",
          "name": "Shock Wave"
        },
        {
          "lv": "23",
          "name": "Eerie Impulse"
        },
        {
          "lv": "27",
          "name": "Mist"
        },
        {
          "lv": "30",
          "name": "Discharge"
        },
        {
          "lv": "35",
          "name": "Frost Breath"
        },
        {
          "lv": "39",
          "name": "Calm Mind"
        },
        {
          "lv": "42",
          "name": "Super Fang"
        },
        {
          "lv": "45",
          "name": "Volt Tackle"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": {
        "discoverer": "miggins"
      },
      "evYield": {
        "SPE": 2
      },
      "baseFriendship": 50,
      "baseExp": 118,
      "growthRate": "Medium",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 2560,
      "tutorMoves": []
    },
    {
      "dex": "031",
      "name": "Capibarron",
      "category": "Cold Shock",
      "types": [
        "ELECTRIC",
        "ICE"
      ],
      "height": "5'03\" ft",
      "weight": "213.6 lbs",
      "catchRate": 70,
      "found": [],
      "abilities": [
        "Thick Fat",
        "Volt Absorb"
      ],
      "hidden": "Refrigerate",
      "stats": {
        "HP": 140,
        "ATK": 70,
        "DEF": 55,
        "SPE": 50,
        "SPA": 110,
        "SPD": 65
      },
      "flavor": "Capibarron emerge when Capicharga absorb ice from a snowstorm. They unleash freeze lightning at sub-zero temperatures, storing it for later.",
      "evo": {
        "from": "030",
        "method": "Level up knowing Frost Breath"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Ion Deluge"
        },
        {
          "lv": "1",
          "name": "Ion Deluge"
        },
        {
          "lv": "1",
          "name": "Belly Drum"
        },
        {
          "lv": "1",
          "name": "Double Slap"
        },
        {
          "lv": "1",
          "name": "Follow Me"
        },
        {
          "lv": "1",
          "name": "Charge Beam"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Thunder Wave"
        },
        {
          "lv": "1",
          "name": "Thunder Shock"
        },
        {
          "lv": "1",
          "name": "Baby-Doll Eyes"
        },
        {
          "lv": "3",
          "name": "Quick Attack"
        },
        {
          "lv": "8",
          "name": "Nuzzle"
        },
        {
          "lv": "12",
          "name": "Electrify"
        },
        {
          "lv": "15",
          "name": "Hyper Fang"
        },
        {
          "lv": "18",
          "name": "Shock Wave"
        },
        {
          "lv": "23",
          "name": "Eerie Impulse"
        },
        {
          "lv": "27",
          "name": "Mist"
        },
        {
          "lv": "30",
          "name": "Discharge"
        },
        {
          "lv": "35",
          "name": "Frost Breath"
        },
        {
          "lv": "40",
          "name": "Calm Mind"
        },
        {
          "lv": "44",
          "name": "Super Fang"
        },
        {
          "lv": "47",
          "name": "Thunder"
        },
        {
          "lv": "51",
          "name": "Chilly Reception"
        },
        {
          "lv": "56",
          "name": "Sheer Cold"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        }
      ],
      "anomaly": {
        "discoverer": "miggins"
      },
      "evYield": {
        "HP": 2,
        "SPA": 1
      },
      "baseFriendship": 50,
      "baseExp": 220,
      "growthRate": "Medium",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 2560,
      "tutorMoves": []
    },
    {
      "dex": "032",
      "name": "Powse",
      "category": "Popping",
      "types": [
        "NORMAL"
      ],
      "height": "0'04\" ft",
      "weight": "0.2 lbs",
      "catchRate": 190,
      "found": [
        "Route 4"
      ],
      "abilities": [
        "Cheek Pouch"
      ],
      "hidden": "Aftermath",
      "stats": {
        "HP": 25,
        "ATK": 71,
        "DEF": 37,
        "SPE": 65,
        "SPA": 61,
        "SPD": 37
      },
      "flavor": "Powse are popular pets, but unsuitable for small children. They are curious and often end up in situations that cause them to explode.",
      "evo": {
        "to": "033"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "4",
          "name": "Work Up"
        },
        {
          "lv": "8",
          "name": "Quick Attack"
        },
        {
          "lv": "13",
          "name": "Focus Energy"
        },
        {
          "lv": "17",
          "name": "Double Hit"
        },
        {
          "lv": "21",
          "name": "Fire Fang"
        },
        {
          "lv": "26",
          "name": "Spark"
        },
        {
          "lv": "26",
          "name": "Self-Destruct"
        },
        {
          "lv": "30",
          "name": "Uproar"
        },
        {
          "lv": "34",
          "name": "Pain Split"
        },
        {
          "lv": "39",
          "name": "Bounce"
        },
        {
          "lv": "43",
          "name": "Explosion"
        },
        {
          "lv": "47",
          "name": "Super Fang"
        },
        {
          "lv": "52",
          "name": "Skull Bash"
        },
        {
          "lv": "56",
          "name": "Memento"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Meteor Beam"
        },
        {
          "lv": "EGG",
          "name": "Baby-Doll Eyes"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "ATK": 1
      },
      "baseFriendship": 50,
      "baseExp": 61,
      "growthRate": "Medium",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "033",
      "name": "Boomurine",
      "category": "Booming",
      "types": [
        "NORMAL",
        "FIRE"
      ],
      "height": "0'08\" ft",
      "weight": "1.5 lbs",
      "catchRate": 75,
      "found": [],
      "abilities": [
        "Short Fuse"
      ],
      "hidden": "Aftermath",
      "stats": {
        "HP": 50,
        "ATK": 111,
        "DEF": 57,
        "SPE": 100,
        "SPA": 121,
        "SPD": 57
      },
      "flavor": "When angered, its tail ignites. Once the flame reaches the body of Boomurine, it erupts in a blast equal to 55 megatons of TNT.",
      "evo": {
        "from": "032",
        "method": "Fire Stone"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Fire Lash"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "4",
          "name": "Work Up"
        },
        {
          "lv": "8",
          "name": "Quick Attack"
        },
        {
          "lv": "13",
          "name": "Focus Energy"
        },
        {
          "lv": "17",
          "name": "Double Hit"
        },
        {
          "lv": "21",
          "name": "Fire Fang"
        },
        {
          "lv": "26",
          "name": "Spark"
        },
        {
          "lv": "26",
          "name": "Self-Destruct"
        },
        {
          "lv": "30",
          "name": "Uproar"
        },
        {
          "lv": "34",
          "name": "Pain Split"
        },
        {
          "lv": "39",
          "name": "Bounce"
        },
        {
          "lv": "43",
          "name": "Explosion"
        },
        {
          "lv": "47",
          "name": "Super Fang"
        },
        {
          "lv": "52",
          "name": "Skull Bash"
        },
        {
          "lv": "56",
          "name": "Memento"
        },
        {
          "lv": "60",
          "name": "Burn Up"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "ATK": 1,
        "SPA": 1
      },
      "baseFriendship": 50,
      "baseExp": 176,
      "growthRate": "Medium",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "034",
      "name": "Tartort",
      "category": "Dragonfruit",
      "types": [
        "GRASS"
      ],
      "height": "2'11\" ft",
      "weight": "33.3 lbs",
      "catchRate": 120,
      "found": [
        "Eventide Forest"
      ],
      "abilities": [
        "Sweet Veil",
        "Ripen"
      ],
      "hidden": "Supersweet Syrup",
      "stats": {
        "HP": 40,
        "ATK": 40,
        "DEF": 55,
        "SPE": 40,
        "SPA": 70,
        "SPD": 55
      },
      "flavor": "Tartort's berry is a prized delicacy. Only certified chefs are allowed to prepare it, as incorrect preparation is said to drive consumers insane.",
      "evo": {
        "to": "035"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Absorb"
        },
        {
          "lv": "1",
          "name": "Sweet Scent"
        },
        {
          "lv": "1",
          "name": "Natural Gift"
        },
        {
          "lv": "5",
          "name": "Growth"
        },
        {
          "lv": "10",
          "name": "Breaking Swipe"
        },
        {
          "lv": "15",
          "name": "Leaf Tornado"
        },
        {
          "lv": "20",
          "name": "Aromatic Mist"
        },
        {
          "lv": "25",
          "name": "Chilling Water"
        },
        {
          "lv": "30",
          "name": "Giga Drain"
        },
        {
          "lv": "35",
          "name": "Weather Ball"
        },
        {
          "lv": "40",
          "name": "Nasty Plot"
        },
        {
          "lv": "45",
          "name": "Earth Power"
        },
        {
          "lv": "50",
          "name": "Decorate"
        },
        {
          "lv": "55",
          "name": "Aromatherapy"
        },
        {
          "lv": "60",
          "name": "Leaf Storm"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Leech Seed"
        },
        {
          "lv": "EGG",
          "name": "Dragon Tail"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "BeckS"
      },
      "evYield": {
        "SPA": 1
      },
      "baseFriendship": 50,
      "baseExp": 58,
      "growthRate": "Erratic",
      "eggGroups": [
        "Grass",
        "Dragon"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "035",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "evo": {
        "from": "034",
        "method": "item ???"
      },
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "036",
      "name": "Scraqua",
      "category": "Water Droplet",
      "types": [
        "WATER"
      ],
      "height": "1'00\" ft",
      "weight": "29.8 lbs",
      "catchRate": 190,
      "found": [
        "Route 2"
      ],
      "abilities": [
        "Teething",
        "Hydration"
      ],
      "hidden": "Ball Fetch",
      "stats": {
        "HP": 50,
        "ATK": 60,
        "DEF": 45,
        "SPE": 60,
        "SPA": 30,
        "SPD": 35
      },
      "flavor": "A very trusting Pokémon that loves attention. When happy, Scraqua makes a sound similar to a boiling kettle.",
      "evo": {
        "to": "037"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "4",
          "name": "Water Sport"
        },
        {
          "lv": "7",
          "name": "Howl"
        },
        {
          "lv": "10",
          "name": "Bite"
        },
        {
          "lv": "13",
          "name": "Odor Sleuth"
        },
        {
          "lv": "16",
          "name": "Aqua Jet"
        },
        {
          "lv": "19",
          "name": "Snarl"
        },
        {
          "lv": "22",
          "name": "Screech"
        },
        {
          "lv": "25",
          "name": "Poison Fang"
        },
        {
          "lv": "28",
          "name": "Roar"
        },
        {
          "lv": "31",
          "name": "Chip Away"
        },
        {
          "lv": "34",
          "name": "Flip Turn"
        },
        {
          "lv": "36",
          "name": "Crunch"
        },
        {
          "lv": "40",
          "name": "Taunt"
        },
        {
          "lv": "44",
          "name": "Wave Crash"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Hyper Fang"
        },
        {
          "lv": "EGG",
          "name": "Soak"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Zimo7866"
      },
      "evYield": {
        "ATK": 1
      },
      "baseFriendship": 50,
      "baseExp": 56,
      "growthRate": "Medium",
      "eggGroups": [
        "Field",
        "Water 1"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "037",
      "name": "Hydrena",
      "category": "Water Pressure",
      "types": [
        "WATER",
        "DARK"
      ],
      "height": "4'07\" ft",
      "weight": "77.2 lbs",
      "catchRate": 90,
      "found": [],
      "abilities": [
        "Strong Jaw",
        "Hydration"
      ],
      "hidden": "Scavenging",
      "stats": {
        "HP": 82,
        "ATK": 110,
        "DEF": 80,
        "SPE": 88,
        "SPA": 50,
        "SPD": 70
      },
      "flavor": "Hydrena possess the most lethal bite of any Pokémon, with teeth capable of firing pressurized water. Packs are led by the oldest female.",
      "evo": {
        "from": "036",
        "method": "Lv 30"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Aqua Cutter"
        },
        {
          "lv": "1",
          "name": "Aqua Cutter"
        },
        {
          "lv": "1",
          "name": "Ice Fang"
        },
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Water Sport"
        },
        {
          "lv": "1",
          "name": "Howl"
        },
        {
          "lv": "1",
          "name": "Bite"
        },
        {
          "lv": "13",
          "name": "Odor Sleuth"
        },
        {
          "lv": "16",
          "name": "Aqua Jet"
        },
        {
          "lv": "19",
          "name": "Snarl"
        },
        {
          "lv": "22",
          "name": "Screech"
        },
        {
          "lv": "25",
          "name": "Poison Fang"
        },
        {
          "lv": "28",
          "name": "Roar"
        },
        {
          "lv": "33",
          "name": "Chip Away"
        },
        {
          "lv": "37",
          "name": "Flip Turn"
        },
        {
          "lv": "40",
          "name": "Crunch"
        },
        {
          "lv": "45",
          "name": "Taunt"
        },
        {
          "lv": "50",
          "name": "Wave Crash"
        },
        {
          "lv": "56",
          "name": "Comeuppance"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Zimo7866"
      },
      "evYield": {
        "ATK": 2
      },
      "baseFriendship": 50,
      "baseExp": 172,
      "growthRate": "Medium",
      "eggGroups": [
        "Field",
        "Water 1"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": [],
      "forms": [
        {
          "name": "Corrupted Hydrena",
          "category": "Water Expansion",
          "types": [
            "WATER",
            "COSMIC"
          ],
          "stats": {
            "HP": 82,
            "ATK": 130,
            "DEF": 104,
            "SPE": 44,
            "SPA": 40,
            "SPD": 80
          },
          "height": "4'11\" ft",
          "weight": "109.1 lbs",
          "abilities": [
            "Strong Jaw",
            "Battle Armor"
          ],
          "hidden": "Frighten",
          "catchRate": 25,
          "baseFriendship": 0,
          "baseExp": 172,
          "growthRate": "Medium",
          "eggGroups": [
            "Field",
            "Water 1"
          ],
          "eggCycles": 3840,
          "gender": {
            "m": 50,
            "f": 50
          },
          "evYield": {
            "ATK": 1,
            "DEF": 1
          },
          "levelMoves": [
            {
              "lv": "0",
              "name": "Eclipse Strike"
            },
            {
              "lv": "1",
              "name": "Eclipse Strike"
            },
            {
              "lv": "1",
              "name": "Tractor Beam"
            },
            {
              "lv": "1",
              "name": "Ice Fang"
            },
            {
              "lv": "1",
              "name": "Aqua Cutter"
            },
            {
              "lv": "1",
              "name": "Tackle"
            },
            {
              "lv": "1",
              "name": "Water Sport"
            },
            {
              "lv": "1",
              "name": "Howl"
            },
            {
              "lv": "1",
              "name": "Bite"
            },
            {
              "lv": "13",
              "name": "Odor Sleuth"
            },
            {
              "lv": "16",
              "name": "Aqua Jet"
            },
            {
              "lv": "19",
              "name": "Snarl"
            },
            {
              "lv": "22",
              "name": "Screech"
            },
            {
              "lv": "25",
              "name": "Poison Fang"
            },
            {
              "lv": "28",
              "name": "Roar"
            },
            {
              "lv": "33",
              "name": "Chip Away"
            },
            {
              "lv": "37",
              "name": "Flip Turn"
            },
            {
              "lv": "40",
              "name": "Jaw Lock"
            },
            {
              "lv": "45",
              "name": "Moonlight"
            },
            {
              "lv": "50",
              "name": "Wave Crash"
            },
            {
              "lv": "56",
              "name": "Supernova"
            }
          ],
          "eggMoves": [],
          "tmMoves": [
            {
              "lv": "TM04",
              "name": "Work Up"
            },
            {
              "lv": "TM02",
              "name": "Double Team"
            },
            {
              "lv": "TM05",
              "name": "Protect"
            },
            {
              "lv": "TM09",
              "name": "Thief"
            },
            {
              "lv": "TM14",
              "name": "Rest"
            }
          ],
          "tutorMoves": [],
          "flavor": "Banished Hydrena are easy targets for corruption. Ashamed of themselves, they hide behind the protective skeleton growing from their back.",
          "spriteSuffix": "form-1",
          "spriteVariants": [
            {
              "label": "F1",
              "suffix": "form-1"
            },
            {
              "label": "F2",
              "suffix": "form-1-f2"
            },
            {
              "label": "Back",
              "suffix": "form-1-back"
            },
            {
              "label": "Shiny F1",
              "suffix": "form-1-shiny"
            },
            {
              "label": "Shiny F2",
              "suffix": "form-1-shiny-f2"
            },
            {
              "label": "Shiny Back",
              "suffix": "form-1-shiny-back"
            },
            {
              "label": "Anomaly F1",
              "suffix": "form-1-anomaly"
            },
            {
              "label": "Anomaly F2",
              "suffix": "form-1-anomaly-f2"
            },
            {
              "label": "Anomaly Back",
              "suffix": "form-1-anomaly-back"
            }
          ]
        }
      ]
    },
    {
      "dex": "038",
      "name": "Scalfling",
      "category": "Toxic Rush",
      "types": [
        "NORMAL",
        "POISON"
      ],
      "height": "1'04\" ft",
      "weight": "115.7 lbs",
      "catchRate": 190,
      "found": [
        "Route 2"
      ],
      "abilities": [
        "Intimidate",
        "Poison Point"
      ],
      "hidden": "Cud Chew",
      "stats": {
        "HP": 70,
        "ATK": 50,
        "DEF": 32,
        "SPE": 27,
        "SPA": 29,
        "SPD": 32
      },
      "flavor": "Scalfling’s poison is undeveloped, so it battles by charging its horns around to gain momentum and striking at opponents’ blind spots.",
      "evo": {
        "to": "039"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Poison Sting"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "5",
          "name": "Rage"
        },
        {
          "lv": "10",
          "name": "Beat Up"
        },
        {
          "lv": "14",
          "name": "Curse"
        },
        {
          "lv": "20",
          "name": "Headbutt"
        },
        {
          "lv": "25",
          "name": "Belch"
        },
        {
          "lv": "30",
          "name": "Poison Jab"
        },
        {
          "lv": "35",
          "name": "Agility"
        },
        {
          "lv": "40",
          "name": "Superpower"
        },
        {
          "lv": "45",
          "name": "Skull Bash"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Headlong Rush"
        },
        {
          "lv": "EGG",
          "name": "Pounce"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": {
        "discoverer": "Wolfernix"
      },
      "evYield": {
        "HP": 1
      },
      "baseFriendship": 60,
      "baseExp": 50,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Monster",
        "Bug"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "039",
      "name": "Bision",
      "category": "Poison Charge",
      "types": [
        "NORMAL",
        "POISON"
      ],
      "height": "3'03\" ft",
      "weight": "180.8 lbs",
      "catchRate": 120,
      "found": [],
      "abilities": [
        "Intimidate",
        "Poison Point"
      ],
      "hidden": "Cud Chew",
      "stats": {
        "HP": 90,
        "ATK": 70,
        "DEF": 52,
        "SPE": 47,
        "SPA": 49,
        "SPD": 52
      },
      "flavor": "Bision anger quickly; though its charge is easy to dodge, its tail strikes independently and cannot be avoided.",
      "evo": {
        "from": "038",
        "to": "040",
        "method": "Lv 15"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Poison Tail"
        },
        {
          "lv": "1",
          "name": "Poison Tail"
        },
        {
          "lv": "1",
          "name": "Poison Sting"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "1",
          "name": "Rage"
        },
        {
          "lv": "1",
          "name": "Beat Up"
        },
        {
          "lv": "14",
          "name": "Curse"
        },
        {
          "lv": "21",
          "name": "Headbutt"
        },
        {
          "lv": "27",
          "name": "Belch"
        },
        {
          "lv": "33",
          "name": "Poison Jab"
        },
        {
          "lv": "39",
          "name": "Agility"
        },
        {
          "lv": "45",
          "name": "Superpower"
        },
        {
          "lv": "51",
          "name": "Skull Bash"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": {
        "discoverer": "Wolfernix"
      },
      "evYield": {
        "HP": 1,
        "ATK": 1
      },
      "baseFriendship": 60,
      "baseExp": 131,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Monster",
        "Bug"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "040",
      "name": "Taurocnid",
      "category": "Lethal Rage",
      "types": [
        "NORMAL",
        "POISON"
      ],
      "height": "5'11\" ft",
      "weight": "274.3 lbs",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Intimidate",
        "Poison Point"
      ],
      "hidden": "Cud Chew",
      "stats": {
        "HP": 120,
        "ATK": 100,
        "DEF": 72,
        "SPE": 92,
        "SPA": 64,
        "SPD": 72
      },
      "flavor": "Constantly filled with rage and energy, Taurocnid store an assortment of toxins in its three tails; neurotoxin, cytotoxin, and sedative.",
      "evo": {
        "from": "039",
        "method": "Lv 40"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Raging Bull"
        },
        {
          "lv": "1",
          "name": "Raging Bull"
        },
        {
          "lv": "1",
          "name": "Poison Tail"
        },
        {
          "lv": "1",
          "name": "Poison Sting"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "1",
          "name": "Rage"
        },
        {
          "lv": "1",
          "name": "Beat Up"
        },
        {
          "lv": "14",
          "name": "Curse"
        },
        {
          "lv": "21",
          "name": "Headbutt"
        },
        {
          "lv": "27",
          "name": "Belch"
        },
        {
          "lv": "33",
          "name": "Poison Jab"
        },
        {
          "lv": "39",
          "name": "Agility"
        },
        {
          "lv": "46",
          "name": "Superpower"
        },
        {
          "lv": "54",
          "name": "Fire Lash"
        },
        {
          "lv": "62",
          "name": "Skull Bash"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": {
        "discoverer": "Wolfernix"
      },
      "evYield": {
        "HP": 2,
        "ATK": 1
      },
      "baseFriendship": 60,
      "baseExp": 231,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Monster",
        "Bug"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "041",
      "name": "Shrubcub",
      "category": "Potted Bush",
      "types": [
        "GRASS"
      ],
      "height": "2'04\" ft",
      "weight": "24.9 lbs",
      "catchRate": 180,
      "found": [
        "Route 1",
        "Route 5"
      ],
      "abilities": [
        "Leaf Guard",
        "Regenerator"
      ],
      "hidden": "Chlorophyll",
      "stats": {
        "HP": 75,
        "ATK": 45,
        "DEF": 50,
        "SPE": 65,
        "SPA": 30,
        "SPD": 55
      },
      "flavor": "Shrubcubs' pot is its favorite haven. People who truly cherish their home plants can often find Shrubcub in their spare pots.",
      "evo": {
        "to": "042"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Leafage"
        },
        {
          "lv": "1",
          "name": "Leer"
        },
        {
          "lv": "4",
          "name": "Absorb"
        },
        {
          "lv": "8",
          "name": "Fury Swipes"
        },
        {
          "lv": "12",
          "name": "Stun Spore"
        },
        {
          "lv": "14",
          "name": "Mega Drain"
        },
        {
          "lv": "16",
          "name": "Sleep Powder"
        },
        {
          "lv": "18",
          "name": "Assurance"
        },
        {
          "lv": "20",
          "name": "Razor Leaf"
        },
        {
          "lv": "24",
          "name": "Giga Drain"
        },
        {
          "lv": "28",
          "name": "Rest"
        },
        {
          "lv": "32",
          "name": "Leaf Blade"
        },
        {
          "lv": "36",
          "name": "Night Slash"
        },
        {
          "lv": "40",
          "name": "Synthesis"
        },
        {
          "lv": "44",
          "name": "Leaf Storm"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Leaf Tornado"
        },
        {
          "lv": "EGG",
          "name": "Stomping Tantrum"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "charliepk_"
      },
      "evYield": {
        "HP": 1
      },
      "baseFriendship": 50,
      "baseExp": 66,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Grass"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "042",
      "name": "Furilage",
      "category": "Shaped Bush",
      "types": [
        "GRASS"
      ],
      "height": "5'11\" ft",
      "weight": "440.3 lbs",
      "catchRate": 60,
      "found": [],
      "abilities": [
        "Leaf Guard",
        "Regenerator"
      ],
      "hidden": "Chlorophyll",
      "stats": {
        "HP": 95,
        "ATK": 60,
        "DEF": 70,
        "SPE": 85,
        "SPA": 45,
        "SPD": 70
      },
      "flavor": "Furilage are friendly yet a gardener’s nightmare, digging up plants and crops to claim their place for easy water and fertilizer.",
      "evo": {
        "from": "041",
        "to": "043",
        "method": "Lv 22"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Grassy Terrain"
        },
        {
          "lv": "1",
          "name": "Grassy Terrain"
        },
        {
          "lv": "1",
          "name": "Leafage"
        },
        {
          "lv": "1",
          "name": "Leer"
        },
        {
          "lv": "1",
          "name": "Absorb"
        },
        {
          "lv": "1",
          "name": "Fury Swipes"
        },
        {
          "lv": "12",
          "name": "Stun Spore"
        },
        {
          "lv": "14",
          "name": "Mega Drain"
        },
        {
          "lv": "16",
          "name": "Sleep Powder"
        },
        {
          "lv": "18",
          "name": "Assurance"
        },
        {
          "lv": "20",
          "name": "Razor Leaf"
        },
        {
          "lv": "25",
          "name": "Giga Drain"
        },
        {
          "lv": "30",
          "name": "Rest"
        },
        {
          "lv": "35",
          "name": "Leaf Blade"
        },
        {
          "lv": "40",
          "name": "Night Slash"
        },
        {
          "lv": "45",
          "name": "Synthesis"
        },
        {
          "lv": "50",
          "name": "Leaf Storm"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "charliepk_"
      },
      "evYield": {
        "HP": 2
      },
      "baseFriendship": 50,
      "baseExp": 175,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Grass"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "043",
      "name": "Grizzlawn",
      "category": "Garden Kept",
      "types": [
        "GRASS"
      ],
      "height": "7'10\" ft",
      "weight": "639.3 lbs",
      "catchRate": 20,
      "found": [],
      "abilities": [
        "Unkempt",
        "Regenerator"
      ],
      "hidden": "Chlorophyll",
      "stats": {
        "HP": 108,
        "ATK": 75,
        "DEF": 86,
        "SPE": 92,
        "SPA": 55,
        "SPD": 102
      },
      "flavor": "A happy Grizzlawn releases pheromones that boost plant growth, but its fur demands constant care and mistreatment can make it aggressive.",
      "evo": {
        "from": "042",
        "method": "Leaf Stone"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Wood Hammer"
        },
        {
          "lv": "1",
          "name": "Wood Hammer"
        },
        {
          "lv": "1",
          "name": "Grassy Terrain"
        },
        {
          "lv": "1",
          "name": "Leafage"
        },
        {
          "lv": "1",
          "name": "Leer"
        },
        {
          "lv": "1",
          "name": "Absorb"
        },
        {
          "lv": "1",
          "name": "Fury Swipes"
        },
        {
          "lv": "12",
          "name": "Stun Spore"
        },
        {
          "lv": "14",
          "name": "Mega Drain"
        },
        {
          "lv": "16",
          "name": "Sleep Powder"
        },
        {
          "lv": "18",
          "name": "Assurance"
        },
        {
          "lv": "20",
          "name": "Razor Leaf"
        },
        {
          "lv": "25",
          "name": "Giga Drain"
        },
        {
          "lv": "30",
          "name": "Rest"
        },
        {
          "lv": "35",
          "name": "Leaf Blade"
        },
        {
          "lv": "40",
          "name": "Night Slash"
        },
        {
          "lv": "45",
          "name": "Synthesis"
        },
        {
          "lv": "50",
          "name": "Leaf Storm"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "charliepk_"
      },
      "evYield": {
        "HP": 2,
        "SPE": 1
      },
      "baseFriendship": 50,
      "baseExp": 270,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Grass"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": [],
      "forms": [
        {
          "name": "F-Form Grizzlawn",
          "category": "Garden Kept",
          "types": [
            "GRASS",
            "DARK"
          ],
          "stats": {
            "HP": 108,
            "ATK": 102,
            "DEF": 86,
            "SPE": 55,
            "SPA": 92,
            "SPD": 75
          },
          "height": "7'10\" ft",
          "weight": "639.3 lbs",
          "abilities": [
            "Unkempt"
          ],
          "hidden": "Chlorophyll",
          "catchRate": 20,
          "baseFriendship": 50,
          "baseExp": 270,
          "growthRate": "Parabolic",
          "eggGroups": [
            "Grass"
          ],
          "eggCycles": 6400,
          "gender": {
            "m": 50,
            "f": 50
          },
          "evYield": {
            "HP": 2,
            "ATK": 1
          },
          "levelMoves": [
            {
              "lv": "0",
              "name": "Wood Hammer"
            },
            {
              "lv": "1",
              "name": "Wood Hammer"
            },
            {
              "lv": "1",
              "name": "Grassy Terrain"
            },
            {
              "lv": "1",
              "name": "Leafage"
            },
            {
              "lv": "1",
              "name": "Leer"
            },
            {
              "lv": "1",
              "name": "Absorb"
            },
            {
              "lv": "1",
              "name": "Fury Swipes"
            },
            {
              "lv": "12",
              "name": "Stun Spore"
            },
            {
              "lv": "14",
              "name": "Mega Drain"
            },
            {
              "lv": "16",
              "name": "Sleep Powder"
            },
            {
              "lv": "18",
              "name": "Assurance"
            },
            {
              "lv": "20",
              "name": "Razor Leaf"
            },
            {
              "lv": "25",
              "name": "Giga Drain"
            },
            {
              "lv": "30",
              "name": "Rest"
            },
            {
              "lv": "35",
              "name": "Leaf Blade"
            },
            {
              "lv": "40",
              "name": "Night Slash"
            },
            {
              "lv": "45",
              "name": "Synthesis"
            },
            {
              "lv": "50",
              "name": "Leaf Storm"
            }
          ],
          "eggMoves": [],
          "tmMoves": [
            {
              "lv": "TM04",
              "name": "Work Up"
            },
            {
              "lv": "TM05",
              "name": "Protect"
            },
            {
              "lv": "TM06",
              "name": "Disarming Voice"
            },
            {
              "lv": "TM14",
              "name": "Rest"
            }
          ],
          "tutorMoves": [],
          "flavor": "A happy Grizzlawn releases pheromones that boost plant growth, but its fur demands constant care and mistreatment can make it aggressive.",
          "spriteSuffix": "form-1",
          "spriteVariants": [
            {
              "label": "F1",
              "suffix": "form-1"
            },
            {
              "label": "Shiny F1",
              "suffix": "form-1-shiny"
            }
          ]
        }
      ]
    },
    {
      "dex": "044",
      "name": "Cruspud",
      "category": "Spoiled",
      "types": [
        "GROUND"
      ],
      "height": "0'04\" ft",
      "weight": "2.9 lbs",
      "catchRate": 230,
      "found": [
        "Route 1",
        "Route 2"
      ],
      "abilities": [
        "Stench"
      ],
      "hidden": "Harvest",
      "stats": {
        "HP": 30,
        "ATK": 30,
        "DEF": 60,
        "SPE": 20,
        "SPA": 30,
        "SPD": 70
      },
      "flavor": "In sunlight, Cruspud buries itself beneath the soil, leaving only its sprout exposed. Farmers see its presence as a sign of rotting crops.",
      "evo": {
        "to": "045"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Absorb"
        },
        {
          "lv": "1",
          "name": "Growth"
        },
        {
          "lv": "4",
          "name": "Rollout"
        },
        {
          "lv": "7",
          "name": "Sand Attack"
        },
        {
          "lv": "10",
          "name": "Infestation"
        },
        {
          "lv": "13",
          "name": "Mud Shot"
        },
        {
          "lv": "16",
          "name": "Leech Seed"
        },
        {
          "lv": "19",
          "name": "Frustration"
        },
        {
          "lv": "22",
          "name": "Scary Face"
        },
        {
          "lv": "25",
          "name": "Giga Drain"
        },
        {
          "lv": "28",
          "name": "Stomping Tantrum"
        },
        {
          "lv": "31",
          "name": "Scary Face"
        },
        {
          "lv": "34",
          "name": "Poison Jab"
        },
        {
          "lv": "37",
          "name": "Strength Sap"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Sludge"
        },
        {
          "lv": "EGG",
          "name": "Snap Trap"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "akaliaboca"
      },
      "evYield": {
        "SPD": 1
      },
      "baseFriendship": 30,
      "baseExp": 36,
      "growthRate": "Fluctuating",
      "eggGroups": [
        "Grass",
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "045",
      "name": "Rotato",
      "category": "Molding",
      "types": [
        "GROUND",
        "GRASS"
      ],
      "height": "1'08\" ft",
      "weight": "22.5 lbs",
      "catchRate": 120,
      "found": [],
      "abilities": [
        "Stench"
      ],
      "hidden": "Sap Sipper",
      "stats": {
        "HP": 40,
        "ATK": 50,
        "DEF": 95,
        "SPE": 30,
        "SPA": 45,
        "SPD": 110
      },
      "flavor": "If left in soil too long, Rotato develops soft, dark patches. To avoid being picked, it releases an odor that leaves farmers and trainers dizzy.",
      "evo": {
        "from": "044",
        "to": "046",
        "method": "Lv 18"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Bite"
        },
        {
          "lv": "1",
          "name": "Bite"
        },
        {
          "lv": "1",
          "name": "Absorb"
        },
        {
          "lv": "1",
          "name": "Growth"
        },
        {
          "lv": "1",
          "name": "Rollout"
        },
        {
          "lv": "1",
          "name": "Sand Attack"
        },
        {
          "lv": "10",
          "name": "Infestation"
        },
        {
          "lv": "13",
          "name": "Mud Shot"
        },
        {
          "lv": "16",
          "name": "Leech Seed"
        },
        {
          "lv": "20",
          "name": "Frustration"
        },
        {
          "lv": "24",
          "name": "Ingrain"
        },
        {
          "lv": "28",
          "name": "Giga Drain"
        },
        {
          "lv": "32",
          "name": "Stomping Tantrum"
        },
        {
          "lv": "36",
          "name": "Scary Face"
        },
        {
          "lv": "40",
          "name": "Poison Jab"
        },
        {
          "lv": "44",
          "name": "Strength Sap"
        },
        {
          "lv": "48",
          "name": "Power Whip"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "akaliaboca"
      },
      "evYield": {
        "SPD": 1,
        "DEF": 1
      },
      "baseFriendship": 30,
      "baseExp": 120,
      "growthRate": "Fluctuating",
      "eggGroups": [
        "Grass",
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "046",
      "name": "Blightato",
      "category": "Rotting",
      "types": [
        "GROUND",
        "GRASS"
      ],
      "height": "3'07\" ft",
      "weight": "194.2 lbs",
      "catchRate": 50,
      "found": [],
      "abilities": [
        "Stench"
      ],
      "hidden": "Sap Sipper",
      "stats": {
        "HP": 55,
        "ATK": 70,
        "DEF": 135,
        "SPE": 45,
        "SPA": 60,
        "SPD": 145
      },
      "flavor": "Blightato thrives in abandoned fields. Its flesh and leaves rot so deeply that entire harvests are forsaken once it's beneath the soil.",
      "evo": {
        "from": "045",
        "method": "Lv 35"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Gastro Acid"
        },
        {
          "lv": "1",
          "name": "Gastro Acid"
        },
        {
          "lv": "1",
          "name": "Block"
        },
        {
          "lv": "1",
          "name": "Bite"
        },
        {
          "lv": "1",
          "name": "Absorb"
        },
        {
          "lv": "1",
          "name": "Growth"
        },
        {
          "lv": "1",
          "name": "Rollout"
        },
        {
          "lv": "1",
          "name": "Sand Attack"
        },
        {
          "lv": "10",
          "name": "Infestation"
        },
        {
          "lv": "13",
          "name": "Mud Shot"
        },
        {
          "lv": "16",
          "name": "Leech Seed"
        },
        {
          "lv": "20",
          "name": "Frustration"
        },
        {
          "lv": "24",
          "name": "Ingrain"
        },
        {
          "lv": "28",
          "name": "Giga Drain"
        },
        {
          "lv": "32",
          "name": "Stomping Tantrum"
        },
        {
          "lv": "37",
          "name": "Scary Face"
        },
        {
          "lv": "42",
          "name": "Poison Jab"
        },
        {
          "lv": "47",
          "name": "Strength Sap"
        },
        {
          "lv": "52",
          "name": "Power Whip"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "akaliaboca"
      },
      "evYield": {
        "SPD": 2,
        "DEF": 1
      },
      "baseFriendship": 30,
      "baseExp": 218,
      "growthRate": "Fluctuating",
      "eggGroups": [
        "Grass",
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": [],
      "forms": [
        {
          "name": "Corrupted Blightato",
          "category": "Zombie-Potato",
          "types": [
            "GROUND",
            "COSMIC"
          ],
          "stats": {
            "HP": 55,
            "ATK": 60,
            "DEF": 115,
            "SPE": 45,
            "SPA": 110,
            "SPD": 125
          },
          "height": "3'07\" ft",
          "weight": "6441 lbs",
          "abilities": [
            "Poison Heal"
          ],
          "hidden": "Arena Trap",
          "catchRate": 25,
          "baseFriendship": 0,
          "baseExp": 218,
          "growthRate": "Fluctuating",
          "eggGroups": [
            "Grass",
            "Field"
          ],
          "eggCycles": 3840,
          "gender": {
            "m": 50,
            "f": 50
          },
          "evYield": {
            "SPD": 2,
            "SPA": 1
          },
          "levelMoves": [
            {
              "lv": "0",
              "name": "Moonblast"
            },
            {
              "lv": "1",
              "name": "Moonblast"
            },
            {
              "lv": "1",
              "name": "Scary Face"
            },
            {
              "lv": "1",
              "name": "Tractor Beam"
            },
            {
              "lv": "1",
              "name": "Bite"
            },
            {
              "lv": "1",
              "name": "Absorb"
            },
            {
              "lv": "1",
              "name": "Growth"
            },
            {
              "lv": "1",
              "name": "Rollout"
            },
            {
              "lv": "1",
              "name": "Sand Attack"
            },
            {
              "lv": "10",
              "name": "Infestation"
            },
            {
              "lv": "13",
              "name": "Mud Shot"
            },
            {
              "lv": "16",
              "name": "Leech Seed"
            },
            {
              "lv": "20",
              "name": "Frustration"
            },
            {
              "lv": "24",
              "name": "Ingrain"
            },
            {
              "lv": "28",
              "name": "Giga Drain"
            },
            {
              "lv": "32",
              "name": "Stomping Tantrum"
            },
            {
              "lv": "37",
              "name": "Gamma Charge"
            },
            {
              "lv": "42",
              "name": "Sludge Wave"
            },
            {
              "lv": "47",
              "name": "Zero Gravity"
            },
            {
              "lv": "52",
              "name": "Galactic Nebula"
            }
          ],
          "eggMoves": [],
          "tmMoves": [
            {
              "lv": "TM04",
              "name": "Work Up"
            },
            {
              "lv": "TM05",
              "name": "Protect"
            },
            {
              "lv": "TM08",
              "name": "Bulldoze"
            },
            {
              "lv": "TM14",
              "name": "Rest"
            }
          ],
          "tutorMoves": [],
          "flavor": "Blightato no longer rests, and instead actively seeks new fields to corrupt leaving trails of withered crops and poisonous berries behind.",
          "spriteSuffix": "form-1",
          "spriteVariants": [
            {
              "label": "F1",
              "suffix": "form-1"
            },
            {
              "label": "F2",
              "suffix": "form-1-f2"
            },
            {
              "label": "Shiny F1",
              "suffix": "form-1-shiny"
            },
            {
              "label": "Shiny F2",
              "suffix": "form-1-shiny-f2"
            }
          ]
        }
      ]
    },
    {
      "dex": "047",
      "name": "Pebpup",
      "category": "Pet Rock",
      "types": [
        "NORMAL",
        "ROCK"
      ],
      "height": "1'04\" ft",
      "weight": "68.6 lbs",
      "catchRate": 255,
      "found": [
        "Route 2",
        "Pebpup Cavern"
      ],
      "abilities": [
        "Sturdy",
        "Solid Rock"
      ],
      "hidden": "Stall",
      "stats": {
        "HP": 60,
        "ATK": 47,
        "DEF": 65,
        "SPE": 10,
        "SPA": 25,
        "SPD": 35
      },
      "flavor": "Pebpups are Pokémon born in rocks struggling to move. It'll often headbutt its trainers to let them know they trust them.",
      "evo": {
        "to": "048"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Bide"
        },
        {
          "lv": "4",
          "name": "Rollout"
        },
        {
          "lv": "7",
          "name": "Defense Curl"
        },
        {
          "lv": "10",
          "name": "Odor Sleuth"
        },
        {
          "lv": "13",
          "name": "Smack Down"
        },
        {
          "lv": "16",
          "name": "Rock Polish"
        },
        {
          "lv": "19",
          "name": "Accelerock"
        },
        {
          "lv": "22",
          "name": "Fire Fang"
        },
        {
          "lv": "25",
          "name": "Laser Focus"
        },
        {
          "lv": "28",
          "name": "Take Down"
        },
        {
          "lv": "32",
          "name": "Lava Plume"
        },
        {
          "lv": "36",
          "name": "Rock Slide"
        },
        {
          "lv": "40",
          "name": "Scary Face"
        },
        {
          "lv": "44",
          "name": "Crunch"
        },
        {
          "lv": "48",
          "name": "Swords Dance"
        },
        {
          "lv": "52",
          "name": "Head Smash"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Shelter"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        }
      ],
      "anomaly": {
        "discoverer": "ai.rkurai"
      },
      "evYield": {
        "DEF": 2
      },
      "baseFriendship": 70,
      "baseExp": 51,
      "growthRate": "Medium",
      "eggGroups": [
        "Mineral"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "048",
      "name": "Rocweiler",
      "category": "Wild Rock",
      "types": [
        "NORMAL",
        "ROCK"
      ],
      "height": "3'11\" ft",
      "weight": "202.8 lbs",
      "catchRate": 120,
      "found": [],
      "abilities": [
        "Rock Head",
        "Solid Rock"
      ],
      "hidden": "Guard Dog",
      "stats": {
        "HP": 70,
        "ATK": 72,
        "DEF": 105,
        "SPE": 85,
        "SPA": 45,
        "SPD": 90
      },
      "flavor": "Rocweilers are protective of trainers who raised them till it's out of its rock. Newly caught Rocweilers will take time to gain its trust.",
      "evo": {
        "from": "047",
        "method": "Lv 20"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Spiky Shield"
        },
        {
          "lv": "1",
          "name": "Spiky Shield"
        },
        {
          "lv": "1",
          "name": "Bide"
        },
        {
          "lv": "1",
          "name": "Rollout"
        },
        {
          "lv": "1",
          "name": "Defense Curl"
        },
        {
          "lv": "1",
          "name": "Odor Sleuth"
        },
        {
          "lv": "13",
          "name": "Smack Down"
        },
        {
          "lv": "16",
          "name": "Rock Polish"
        },
        {
          "lv": "19",
          "name": "Accelerock"
        },
        {
          "lv": "23",
          "name": "Fire Fang"
        },
        {
          "lv": "27",
          "name": "Laser Focus"
        },
        {
          "lv": "31",
          "name": "Take Down"
        },
        {
          "lv": "36",
          "name": "Lava Plume"
        },
        {
          "lv": "41",
          "name": "Rock Slide"
        },
        {
          "lv": "46",
          "name": "Scary Face"
        },
        {
          "lv": "51",
          "name": "Crunch"
        },
        {
          "lv": "56",
          "name": "Swords Dance"
        },
        {
          "lv": "61",
          "name": "Head Smash"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        }
      ],
      "anomaly": {
        "discoverer": "ai.rkurai"
      },
      "evYield": {
        "DEF": 2
      },
      "baseFriendship": 70,
      "baseExp": 145,
      "growthRate": "Medium",
      "eggGroups": [
        "Mineral"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": [],
      "forms": [
        {
          "name": "Mega Rocweiler",
          "category": "Wild Rock",
          "types": [
            "FIRE",
            "ROCK"
          ],
          "stats": {
            "HP": 70,
            "ATK": 95,
            "DEF": 75,
            "SPE": 115,
            "SPA": 135,
            "SPD": 77
          },
          "height": "5'11\" ft",
          "weight": "253.5 lbs",
          "abilities": [
            "Berserk"
          ],
          "hidden": "Berserk",
          "catchRate": 120,
          "baseFriendship": 70,
          "baseExp": 145,
          "growthRate": "Medium",
          "eggGroups": [
            "Mineral"
          ],
          "eggCycles": 3840,
          "gender": {
            "m": 50,
            "f": 50
          },
          "evYield": {
            "DEF": 2
          },
          "levelMoves": [
            {
              "lv": "0",
              "name": "Spiky Shield"
            },
            {
              "lv": "1",
              "name": "Spiky Shield"
            },
            {
              "lv": "1",
              "name": "Bide"
            },
            {
              "lv": "1",
              "name": "Rollout"
            },
            {
              "lv": "1",
              "name": "Defense Curl"
            },
            {
              "lv": "1",
              "name": "Odor Sleuth"
            },
            {
              "lv": "13",
              "name": "Smack Down"
            },
            {
              "lv": "16",
              "name": "Rock Polish"
            },
            {
              "lv": "19",
              "name": "Accelerock"
            },
            {
              "lv": "23",
              "name": "Fire Fang"
            },
            {
              "lv": "27",
              "name": "Laser Focus"
            },
            {
              "lv": "31",
              "name": "Take Down"
            },
            {
              "lv": "36",
              "name": "Lava Plume"
            },
            {
              "lv": "41",
              "name": "Rock Slide"
            },
            {
              "lv": "46",
              "name": "Scary Face"
            },
            {
              "lv": "51",
              "name": "Crunch"
            },
            {
              "lv": "56",
              "name": "Swords Dance"
            },
            {
              "lv": "61",
              "name": "Head Smash"
            }
          ],
          "eggMoves": [],
          "tmMoves": [
            {
              "lv": "TM04",
              "name": "Work Up"
            },
            {
              "lv": "TM02",
              "name": "Double Team"
            },
            {
              "lv": "TM05",
              "name": "Protect"
            },
            {
              "lv": "TM08",
              "name": "Bulldoze"
            }
          ],
          "tutorMoves": [],
          "flavor": "Rocweilers are protective of trainers who raised them till it's out of its rock. Newly caught Rockweilers will take time to gain its trust.",
          "spriteSuffix": "form-1",
          "spriteVariants": [
            {
              "label": "F1",
              "suffix": "form-1"
            },
            {
              "label": "Shiny F1",
              "suffix": "form-1-shiny"
            }
          ]
        }
      ]
    },
    {
      "dex": "049",
      "name": "Twilawoof",
      "category": "Luna Pup",
      "types": [
        "LIGHT",
        "DARK"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 240,
      "found": [
        "Route 4"
      ],
      "abilities": [
        "Intimidate",
        "Illuminate"
      ],
      "hidden": "Defiant",
      "stats": {
        "HP": 60,
        "ATK": 70,
        "DEF": 40,
        "SPE": 80,
        "SPA": 40,
        "SPD": 40
      },
      "flavor": "Twilawoof are playful within their pack, but flee at the sight of outsiders. Rarely seen in the wild, they almost never bond with humans.",
      "evo": {
        "to": "050"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Feint"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "5",
          "name": "Howl"
        },
        {
          "lv": "9",
          "name": "Swift"
        },
        {
          "lv": "12",
          "name": "Feint Attack"
        },
        {
          "lv": "16",
          "name": "Roar"
        },
        {
          "lv": "20",
          "name": "Flash Step"
        },
        {
          "lv": "23",
          "name": "Thunder Fang"
        },
        {
          "lv": "27",
          "name": "Swagger"
        },
        {
          "lv": "31",
          "name": "Night Daze"
        },
        {
          "lv": "34",
          "name": "Haze"
        },
        {
          "lv": "38",
          "name": "Crunch"
        },
        {
          "lv": "42",
          "name": "Parting Shot"
        },
        {
          "lv": "45",
          "name": "Shine Fang"
        },
        {
          "lv": "49",
          "name": "Eclipse Strike"
        },
        {
          "lv": "54",
          "name": "Swords Dance"
        },
        {
          "lv": "57",
          "name": "Extreme Speed"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Ice Fang"
        },
        {
          "lv": "EGG",
          "name": "Fire Fang"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPE": 1
      },
      "baseFriendship": 70,
      "baseExp": 70,
      "growthRate": "Fast",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "050",
      "name": "Twilycan",
      "category": "Eclipse Dog",
      "types": [
        "LIGHT",
        "DARK"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 150,
      "found": [],
      "abilities": [
        "Intimidate",
        "Illuminate"
      ],
      "hidden": "Defiant",
      "stats": {
        "HP": 70,
        "ATK": 80,
        "DEF": 50,
        "SPE": 100,
        "SPA": 60,
        "SPD": 50
      },
      "flavor": "Twilycan are calm, endearing creatures who usually lead the pack. Indifferent to humans, they only seek help when needed.",
      "evo": {
        "from": "049",
        "to": "051",
        "method": "Lv 32"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Feint"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "5",
          "name": "Howl"
        },
        {
          "lv": "8",
          "name": "Swift"
        },
        {
          "lv": "11",
          "name": "Feint Attack"
        },
        {
          "lv": "15",
          "name": "Roar"
        },
        {
          "lv": "18",
          "name": "Flash Step"
        },
        {
          "lv": "21",
          "name": "Thunder Fang"
        },
        {
          "lv": "25",
          "name": "Swagger"
        },
        {
          "lv": "28",
          "name": "Haze"
        },
        {
          "lv": "31",
          "name": "Night Daze"
        },
        {
          "lv": "36",
          "name": "Crunch"
        },
        {
          "lv": "40",
          "name": "Parting Shot"
        },
        {
          "lv": "44",
          "name": "Shine Fang"
        },
        {
          "lv": "49",
          "name": "Eclipse Strike"
        },
        {
          "lv": "53",
          "name": "Swords Dance"
        },
        {
          "lv": "57",
          "name": "Extreme Speed"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPA": 1,
        "ATK": 1
      },
      "baseFriendship": 70,
      "baseExp": 140,
      "growthRate": "Fast",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "051",
      "name": "Equinine",
      "category": "Equinox Wolf",
      "types": [
        "LIGHT",
        "DARK"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 75,
      "found": [],
      "abilities": [
        "Intimidate",
        "Illuminate"
      ],
      "hidden": "Defiant",
      "stats": {
        "HP": 90,
        "ATK": 115,
        "DEF": 65,
        "SPE": 110,
        "SPA": 85,
        "SPD": 65
      },
      "flavor": "Little is known about Equinine, though they are said to be the Grandmasters of all Twilikind, commanding multiple packs across their territories.",
      "evo": {
        "from": "050",
        "method": "Shiny Stone"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Feint"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "5",
          "name": "Howl"
        },
        {
          "lv": "8",
          "name": "Swift"
        },
        {
          "lv": "11",
          "name": "Feint Attack"
        },
        {
          "lv": "15",
          "name": "Roar"
        },
        {
          "lv": "18",
          "name": "Flash Step"
        },
        {
          "lv": "21",
          "name": "Thunder Fang"
        },
        {
          "lv": "25",
          "name": "Swagger"
        },
        {
          "lv": "28",
          "name": "Haze"
        },
        {
          "lv": "31",
          "name": "Night Daze"
        },
        {
          "lv": "36",
          "name": "Crunch"
        },
        {
          "lv": "40",
          "name": "Parting Shot"
        },
        {
          "lv": "44",
          "name": "Shine Fang"
        },
        {
          "lv": "49",
          "name": "Eclipse Strike"
        },
        {
          "lv": "53",
          "name": "Swords Dance"
        },
        {
          "lv": "57",
          "name": "Extreme Speed"
        },
        {
          "lv": "63",
          "name": "Eternal Aura"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPE": 2,
        "ATK": 1
      },
      "baseFriendship": 70,
      "baseExp": 180,
      "growthRate": "Fast",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "052",
      "name": "Karmold",
      "category": "Emotional",
      "types": [
        "NORMAL",
        "PSYCHIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 120,
      "found": [
        "Eventide Forest"
      ],
      "abilities": [
        "Color Change",
        "Protean"
      ],
      "hidden": "Adaptability",
      "stats": {
        "HP": 44,
        "ATK": 34,
        "DEF": 34,
        "SPE": 44,
        "SPA": 64,
        "SPD": 44
      },
      "flavor": "Karmold’s emotions are uncontrollable, so its body shows every color of the rainbow rather than shifting hues for camouflage.",
      "evo": {
        "to": [
          "053A",
          "053B",
          "053C"
        ]
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Camouflage"
        },
        {
          "lv": "1",
          "name": "Reflect Type"
        },
        {
          "lv": "1",
          "name": "Lick"
        },
        {
          "lv": "5",
          "name": "Hypnosis"
        },
        {
          "lv": "10",
          "name": "Return"
        },
        {
          "lv": "10",
          "name": "Frustration"
        },
        {
          "lv": "13",
          "name": "Night Shade"
        },
        {
          "lv": "17",
          "name": "Glare"
        },
        {
          "lv": "22",
          "name": "Psybeam"
        },
        {
          "lv": "25",
          "name": "Miracle Eye"
        },
        {
          "lv": "29",
          "name": "Uproar"
        },
        {
          "lv": "34",
          "name": "R.G.Beam"
        },
        {
          "lv": "37",
          "name": "Role Play"
        },
        {
          "lv": "41",
          "name": "Wring Out"
        },
        {
          "lv": "46",
          "name": "Future Sight"
        },
        {
          "lv": "49",
          "name": "Nasty Plot"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Warming Light"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPA": 1
      },
      "baseFriendship": 50,
      "baseExp": 52,
      "growthRate": "Medium",
      "eggGroups": [
        "Monster",
        "Dragon"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "053A",
      "name": "Kamoleon (Low)",
      "category": "Personality",
      "types": [
        "NORMAL",
        "PSYCHIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Color Change",
        "Protean"
      ],
      "hidden": "Adaptability",
      "stats": {
        "HP": 74,
        "ATK": 59,
        "DEF": 54,
        "SPE": 84,
        "SPA": 120,
        "SPD": 89
      },
      "flavor": "Kamoleon’s personality mirrors its trainer. As their bond deepens, it shifts from the chaotic Karmold to the temperament it grows closest to.",
      "evo": {
        "from": "052",
        "method": "Lv 32 · Low friendship"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Mood Swing"
        },
        {
          "lv": "1",
          "name": "Mood Swing"
        },
        {
          "lv": "1",
          "name": "Guard Split"
        },
        {
          "lv": "1",
          "name": "Camouflage"
        },
        {
          "lv": "1",
          "name": "Reflect Type"
        },
        {
          "lv": "1",
          "name": "Lick"
        },
        {
          "lv": "1",
          "name": "Hypnosis"
        },
        {
          "lv": "10",
          "name": "Return"
        },
        {
          "lv": "10",
          "name": "Frustration"
        },
        {
          "lv": "13",
          "name": "Night Shade"
        },
        {
          "lv": "17",
          "name": "Glare"
        },
        {
          "lv": "22",
          "name": "Psybeam"
        },
        {
          "lv": "25",
          "name": "Miracle Eye"
        },
        {
          "lv": "29",
          "name": "Uproar"
        },
        {
          "lv": "35",
          "name": "R.G.Beam"
        },
        {
          "lv": "39",
          "name": "Role Play"
        },
        {
          "lv": "44",
          "name": "Wring Out"
        },
        {
          "lv": "50",
          "name": "Future Sight"
        },
        {
          "lv": "54",
          "name": "Nasty Plot"
        },
        {
          "lv": "59",
          "name": "Eerie Spell"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPA": 2
      },
      "baseFriendship": 50,
      "baseExp": 155,
      "growthRate": "Medium",
      "eggGroups": [
        "Monster",
        "Dragon"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": [],
      "formName": "Low Friendship",
      "sourceSpecies": "KAMOLEON",
      "sourceForm": 0,
      "sourceArt": "KAMOLEON_2",
      "baseDex": "053"
    },
    {
      "dex": "053B",
      "name": "Kamoleon (Mid)",
      "category": "Personality",
      "types": [
        "NORMAL",
        "PSYCHIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Color Change",
        "Protean"
      ],
      "hidden": "Adaptability",
      "stats": {
        "HP": 74,
        "ATK": 59,
        "DEF": 54,
        "SPE": 84,
        "SPA": 120,
        "SPD": 89
      },
      "flavor": "Kamoleon’s personality mirrors its trainer. As their bond deepens, it shifts from the chaotic Karmold to the temperament it grows closest to.",
      "evo": {
        "from": "052",
        "method": "Lv 32 · Mid friendship"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Mood Swing"
        },
        {
          "lv": "1",
          "name": "Mood Swing"
        },
        {
          "lv": "1",
          "name": "Power Trick"
        },
        {
          "lv": "1",
          "name": "Camouflage"
        },
        {
          "lv": "1",
          "name": "Reflect Type"
        },
        {
          "lv": "1",
          "name": "Lick"
        },
        {
          "lv": "1",
          "name": "Hypnosis"
        },
        {
          "lv": "10",
          "name": "Return"
        },
        {
          "lv": "10",
          "name": "Frustration"
        },
        {
          "lv": "13",
          "name": "Night Shade"
        },
        {
          "lv": "17",
          "name": "Glare"
        },
        {
          "lv": "22",
          "name": "Psybeam"
        },
        {
          "lv": "25",
          "name": "Miracle Eye"
        },
        {
          "lv": "29",
          "name": "Uproar"
        },
        {
          "lv": "35",
          "name": "R.G.Beam"
        },
        {
          "lv": "39",
          "name": "Role Play"
        },
        {
          "lv": "44",
          "name": "Wring Out"
        },
        {
          "lv": "50",
          "name": "Future Sight"
        },
        {
          "lv": "54",
          "name": "Nasty Plot"
        },
        {
          "lv": "59",
          "name": "Dream Eater"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPA": 2
      },
      "baseFriendship": 50,
      "baseExp": 155,
      "growthRate": "Medium",
      "eggGroups": [
        "Monster",
        "Dragon"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": [],
      "formName": "Mid Friendship",
      "sourceSpecies": "KAMOLEON",
      "sourceForm": 1,
      "sourceArt": "KAMOLEON_1",
      "baseDex": "053"
    },
    {
      "dex": "053C",
      "name": "Kamoleon (High)",
      "category": "Personality",
      "types": [
        "NORMAL",
        "PSYCHIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Color Change",
        "Protean"
      ],
      "hidden": "Adaptability",
      "stats": {
        "HP": 74,
        "ATK": 59,
        "DEF": 54,
        "SPE": 84,
        "SPA": 120,
        "SPD": 89
      },
      "flavor": "Kamoleon’s personality mirrors its trainer. As their bond deepens, it shifts from the chaotic Karmold to the temperament it grows closest to.",
      "evo": {
        "from": "052",
        "method": "Lv 32 · High friendship"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Mood Swing"
        },
        {
          "lv": "1",
          "name": "Mood Swing"
        },
        {
          "lv": "1",
          "name": "Guard Swap"
        },
        {
          "lv": "1",
          "name": "Camouflage"
        },
        {
          "lv": "1",
          "name": "Reflect Type"
        },
        {
          "lv": "1",
          "name": "Lick"
        },
        {
          "lv": "1",
          "name": "Hypnosis"
        },
        {
          "lv": "10",
          "name": "Return"
        },
        {
          "lv": "10",
          "name": "Frustration"
        },
        {
          "lv": "13",
          "name": "Night Shade"
        },
        {
          "lv": "17",
          "name": "Glare"
        },
        {
          "lv": "22",
          "name": "Psybeam"
        },
        {
          "lv": "25",
          "name": "Miracle Eye"
        },
        {
          "lv": "29",
          "name": "Uproar"
        },
        {
          "lv": "35",
          "name": "R.G.Beam"
        },
        {
          "lv": "39",
          "name": "Role Play"
        },
        {
          "lv": "44",
          "name": "Wring Out"
        },
        {
          "lv": "50",
          "name": "Future Sight"
        },
        {
          "lv": "54",
          "name": "Nasty Plot"
        },
        {
          "lv": "59",
          "name": "Rainbow Bolt"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPA": 2
      },
      "baseFriendship": 50,
      "baseExp": 155,
      "growthRate": "Medium",
      "eggGroups": [
        "Monster",
        "Dragon"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": [],
      "formName": "High Friendship",
      "sourceSpecies": "KAMOLEON",
      "sourceForm": 2,
      "sourceArt": "KAMOLEON_3",
      "baseDex": "053"
    },
    {
      "dex": "054",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "evo": {
        "to": "055"
      },
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "055",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "056",
      "name": "Purssume",
      "category": "Lonely Lost",
      "types": [
        "NORMAL",
        "PSYCHIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 170,
      "found": [
        "Route 2",
        "Route 3"
      ],
      "abilities": [
        "Run Away",
        "Pickup"
      ],
      "hidden": "Clumsy",
      "stats": {
        "HP": 60,
        "ATK": 55,
        "DEF": 65,
        "SPE": 65,
        "SPA": 55,
        "SPD": 55
      },
      "flavor": "Purssume, found in the middle of routes, trails, and roads. It seems to always throw itself in harm’s way from the lack of their parent.",
      "evo": {
        "to": [
          "057",
          "058"
        ]
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Astonish"
        },
        {
          "lv": "5",
          "name": "Growl"
        },
        {
          "lv": "7",
          "name": "Quick Attack"
        },
        {
          "lv": "11",
          "name": "Bite"
        },
        {
          "lv": "13",
          "name": "Double Team"
        },
        {
          "lv": "15",
          "name": "Confusion"
        },
        {
          "lv": "17",
          "name": "Swift"
        },
        {
          "lv": "19",
          "name": "Fake Out"
        },
        {
          "lv": "24",
          "name": "Hyper Fang"
        },
        {
          "lv": "27",
          "name": "Psychic Fangs"
        },
        {
          "lv": "29",
          "name": "Rest"
        },
        {
          "lv": "32",
          "name": "Crunch"
        },
        {
          "lv": "33",
          "name": "Bulk Up"
        },
        {
          "lv": "36",
          "name": "Crafty Shield"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Spotlight"
        },
        {
          "lv": "EGG",
          "name": "Last Resort"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "DEF": 1
      },
      "baseFriendship": 0,
      "baseExp": 150,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "057",
      "name": "Fellsum",
      "category": "Abandoned",
      "types": [
        "GHOST",
        "PSYCHIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 100,
      "found": [],
      "abilities": [
        "Anticipation",
        "Cursed Body"
      ],
      "hidden": "Perish Body",
      "stats": {
        "HP": 80,
        "ATK": 35,
        "DEF": 85,
        "SPE": 65,
        "SPA": 120,
        "SPD": 100
      },
      "flavor": "Fellsum results from Purssume's desire to harm itself, finding solace in aiding fainted and wild Purssume, protecting them at whatever cost.",
      "evo": {
        "from": "056",
        "method": "Special evolution"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Shadow Ball"
        },
        {
          "lv": "1",
          "name": "Shadow Ball"
        },
        {
          "lv": "1",
          "name": "Astonish"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Quick Attack"
        },
        {
          "lv": "11",
          "name": "Bite"
        },
        {
          "lv": "13",
          "name": "Double Team"
        },
        {
          "lv": "15",
          "name": "Confusion"
        },
        {
          "lv": "17",
          "name": "Swift"
        },
        {
          "lv": "19",
          "name": "Fake Out"
        },
        {
          "lv": "24",
          "name": "Hyper Fang"
        },
        {
          "lv": "27",
          "name": "Psychic Fangs"
        },
        {
          "lv": "36",
          "name": "Curse"
        },
        {
          "lv": "39",
          "name": "Destiny Bond"
        },
        {
          "lv": "45",
          "name": "Psychic"
        },
        {
          "lv": "47",
          "name": "Wide Guard"
        },
        {
          "lv": "50",
          "name": "Will-O-Wisp"
        },
        {
          "lv": "53",
          "name": "Dark Pulse"
        },
        {
          "lv": "57",
          "name": "Heal Pulse"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPA": 2
      },
      "baseFriendship": 0,
      "baseExp": 220,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "058",
      "name": "Foundsum",
      "category": "Found Family",
      "types": [
        "FAIRY",
        "PSYCHIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 100,
      "found": [],
      "abilities": [
        "Magic Guard",
        "Misty Surge"
      ],
      "hidden": "Pixilate",
      "stats": {
        "HP": 100,
        "ATK": 40,
        "DEF": 95,
        "SPE": 75,
        "SPA": 90,
        "SPD": 85
      },
      "flavor": "Foundsum is a result of a Purssume's wish to shield others from its own fate, embracing fellow Purssume with warmth and power.",
      "evo": {
        "from": "056",
        "method": "High friendship"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Draining Kiss"
        },
        {
          "lv": "1",
          "name": "Draining Kiss"
        },
        {
          "lv": "1",
          "name": "Astonish"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Quick Attack"
        },
        {
          "lv": "11",
          "name": "Bite"
        },
        {
          "lv": "13",
          "name": "Double Team"
        },
        {
          "lv": "15",
          "name": "Confusion"
        },
        {
          "lv": "17",
          "name": "Swift"
        },
        {
          "lv": "19",
          "name": "Fake Out"
        },
        {
          "lv": "24",
          "name": "Hyper Fang"
        },
        {
          "lv": "27",
          "name": "Psychic Fangs"
        },
        {
          "lv": "30",
          "name": "Psychic"
        },
        {
          "lv": "33",
          "name": "Light Screen"
        },
        {
          "lv": "36",
          "name": "Reflect"
        },
        {
          "lv": "40",
          "name": "Moonblast"
        },
        {
          "lv": "45",
          "name": "Shadow Ball"
        },
        {
          "lv": "47",
          "name": "Quick Guard"
        },
        {
          "lv": "50",
          "name": "Moonlight"
        },
        {
          "lv": "50",
          "name": "Thunder Wave"
        },
        {
          "lv": "57",
          "name": "Heal Pulse"
        },
        {
          "lv": "60",
          "name": "Revival Blessing"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        }
      ],
      "anomaly": null,
      "evYield": {
        "DEF": 1,
        "SPA": 1
      },
      "baseFriendship": 200,
      "baseExp": 220,
      "growthRate": "Parabolic",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "059",
      "name": "Bouyabee",
      "category": "Floaty",
      "types": [
        "WATER",
        "NORMAL"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 190,
      "found": [
        "Route 3"
      ],
      "abilities": [
        "Swift Swim",
        "Vital Spirit"
      ],
      "hidden": "Friend Guard",
      "stats": {
        "HP": 59,
        "ATK": 59,
        "DEF": 40,
        "SPE": 42,
        "SPA": 40,
        "SPD": 53
      },
      "flavor": "An excellent swimmer that doesn't believe in itself very much. Its tail is filled with a gas that allows it to float on any liquid.",
      "evo": {
        "to": "060"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Splash"
        },
        {
          "lv": "1",
          "name": "Sand Attack"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Water Sport"
        },
        {
          "lv": "11",
          "name": "Aqua Jet"
        },
        {
          "lv": "14",
          "name": "Fake Out"
        },
        {
          "lv": "17",
          "name": "Stuff Cheeks"
        },
        {
          "lv": "21",
          "name": "Smelling Salts"
        },
        {
          "lv": "24",
          "name": "Surf"
        },
        {
          "lv": "27",
          "name": "Soak"
        },
        {
          "lv": "31",
          "name": "Wake-Up Slap"
        },
        {
          "lv": "34",
          "name": "Super Fang"
        },
        {
          "lv": "37",
          "name": "Coaching"
        },
        {
          "lv": "41",
          "name": "Triple Dive"
        },
        {
          "lv": "44",
          "name": "Flip Turn"
        },
        {
          "lv": "47",
          "name": "Baton Pass"
        },
        {
          "lv": "51",
          "name": "Last Resort"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Aqua Ring"
        },
        {
          "lv": "EGG",
          "name": "Body Slam"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": ".z25"
      },
      "evYield": {
        "ATK": 1
      },
      "baseFriendship": 50,
      "baseExp": 66,
      "growthRate": "Medium",
      "eggGroups": [
        "Field",
        "Water 1"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "060",
      "name": "Inflatuft",
      "category": "Beach Guard",
      "types": [
        "WATER",
        "NORMAL"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 75,
      "found": [],
      "abilities": [
        "Swift Swim",
        "Lifeguard"
      ],
      "hidden": "Friend Guard",
      "stats": {
        "HP": 79,
        "ATK": 94,
        "DEF": 65,
        "SPE": 92,
        "SPA": 65,
        "SPD": 78
      },
      "flavor": "Inflatuft do not fear deep water. It spends most of its day floating across lakes and rivers, using its floaties to steer.",
      "evo": {
        "from": "059",
        "method": "Level up knowing Surf"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Chilling Water"
        },
        {
          "lv": "1",
          "name": "Splash"
        },
        {
          "lv": "1",
          "name": "Sand Attack"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Water Sport"
        },
        {
          "lv": "11",
          "name": "Aqua Jet"
        },
        {
          "lv": "14",
          "name": "Fake Out"
        },
        {
          "lv": "17",
          "name": "Stuff Cheeks"
        },
        {
          "lv": "21",
          "name": "Smelling Salts"
        },
        {
          "lv": "24",
          "name": "Surf"
        },
        {
          "lv": "27",
          "name": "Soak"
        },
        {
          "lv": "31",
          "name": "Wake-Up Slap"
        },
        {
          "lv": "34",
          "name": "Super Fang"
        },
        {
          "lv": "37",
          "name": "Coaching"
        },
        {
          "lv": "41",
          "name": "Triple Dive"
        },
        {
          "lv": "44",
          "name": "Flip Turn"
        },
        {
          "lv": "47",
          "name": "Baton Pass"
        },
        {
          "lv": "51",
          "name": "Last Resort"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM16",
          "name": "Low Sweep"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        }
      ],
      "anomaly": {
        "discoverer": ".z25"
      },
      "evYield": {
        "ATK": 1,
        "SPE": 1
      },
      "baseFriendship": 50,
      "baseExp": 173,
      "growthRate": "Medium",
      "eggGroups": [
        "Field",
        "Water 1"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "061",
      "name": "Mitenna",
      "category": "Sattelite",
      "types": [
        "COSMIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 190,
      "found": [
        "Route 5"
      ],
      "abilities": [
        "Download",
        "Levitate"
      ],
      "hidden": "Serene Grace",
      "stats": {
        "HP": 55,
        "ATK": 35,
        "DEF": 43,
        "SPE": 30,
        "SPA": 55,
        "SPD": 70
      },
      "flavor": "Mitenna drifts through the upper atmosphere, releasing faint pulses of energy believed to be attempts at communication with the unknown.",
      "evo": {
        "to": "062"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Phaser"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "5",
          "name": "Fairy Wind"
        },
        {
          "lv": "9",
          "name": "Sweet Kiss"
        },
        {
          "lv": "13",
          "name": "Sonic Boom"
        },
        {
          "lv": "17",
          "name": "Shock Wave"
        },
        {
          "lv": "21",
          "name": "Star Seeker"
        },
        {
          "lv": "25",
          "name": "Tractor Beam"
        },
        {
          "lv": "29",
          "name": "Self-Destruct"
        },
        {
          "lv": "33",
          "name": "Mirror Coat"
        },
        {
          "lv": "37",
          "name": "Orbital Laser"
        },
        {
          "lv": "41",
          "name": "Calm Mind"
        },
        {
          "lv": "45",
          "name": "Fantasia Blast"
        },
        {
          "lv": "49",
          "name": "Wish"
        },
        {
          "lv": "53",
          "name": "Meteor Beam"
        },
        {
          "lv": "57",
          "name": "Synchronoise"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Uproar"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": {
        "discoverer": "thepitthedarknesscomesfrom"
      },
      "evYield": {
        "SPD": 1
      },
      "baseFriendship": 50,
      "baseExp": 56,
      "growthRate": "Fast",
      "eggGroups": [
        "Fairy",
        "Amorphous"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "062",
      "name": "Orbalink",
      "category": "Communication",
      "types": [
        "COSMIC",
        "FAIRY"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 70,
      "found": [],
      "abilities": [
        "Connecting...",
        "Levitate"
      ],
      "hidden": "Serene Grace",
      "stats": {
        "HP": 85,
        "ATK": 55,
        "DEF": 73,
        "SPE": 55,
        "SPA": 95,
        "SPD": 125
      },
      "flavor": "It is said that Orbalink acts as a bridge between worlds, transmitting unknown types of energy and waves across vast cosmic distances.",
      "evo": {
        "from": "061",
        "method": "Moon Stone"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Happily Ever After"
        },
        {
          "lv": "1",
          "name": "Happily Ever After"
        },
        {
          "lv": "1",
          "name": "Phaser"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Fairy Wind"
        },
        {
          "lv": "1",
          "name": "Sweet Kiss"
        },
        {
          "lv": "13",
          "name": "Sonic Boom"
        },
        {
          "lv": "17",
          "name": "Shock Wave"
        },
        {
          "lv": "21",
          "name": "Star Seeker"
        },
        {
          "lv": "25",
          "name": "Tractor Beam"
        },
        {
          "lv": "29",
          "name": "Self-Destruct"
        },
        {
          "lv": "33",
          "name": "Mirror Coat"
        },
        {
          "lv": "37",
          "name": "Orbital Laser"
        },
        {
          "lv": "41",
          "name": "Calm Mind"
        },
        {
          "lv": "45",
          "name": "Fantasia Blast"
        },
        {
          "lv": "49",
          "name": "Wish"
        },
        {
          "lv": "53",
          "name": "Meteor Beam"
        },
        {
          "lv": "57",
          "name": "Synchronoise"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": {
        "discoverer": "thepitthedarknesscomesfrom"
      },
      "evYield": {
        "SPD": 2
      },
      "baseFriendship": 50,
      "baseExp": 168,
      "growthRate": "Fast",
      "eggGroups": [
        "Fairy",
        "Amorphous"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "063",
      "name": "Rhythfin",
      "category": "Fish Score",
      "types": [
        "WATER"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 180,
      "found": [
        "Route 2",
        "Route 3",
        "Pebpup Cavern"
      ],
      "abilities": [
        "Swift Swim"
      ],
      "hidden": "Liquid Voice",
      "stats": {
        "HP": 50,
        "ATK": 45,
        "DEF": 45,
        "SPE": 60,
        "SPA": 65,
        "SPD": 55
      },
      "flavor": "Rhythfin stores tons of energy, much like an excited child. When threatened, schools cluster to intimidate other Pokémon.",
      "evo": {
        "to": "064"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Bubble"
        },
        {
          "lv": "3",
          "name": "Growl"
        },
        {
          "lv": "6",
          "name": "Aqua Jet"
        },
        {
          "lv": "8",
          "name": "Sing"
        },
        {
          "lv": "11",
          "name": "Round"
        },
        {
          "lv": "14",
          "name": "Bubble Beam"
        },
        {
          "lv": "17",
          "name": "Life Dew"
        },
        {
          "lv": "20",
          "name": "Screech"
        },
        {
          "lv": "23",
          "name": "Whirlpool"
        },
        {
          "lv": "26",
          "name": "Metal Sound"
        },
        {
          "lv": "30",
          "name": "Hyper Voice"
        },
        {
          "lv": "33",
          "name": "Surf"
        },
        {
          "lv": "36",
          "name": "Icy Wind"
        },
        {
          "lv": "39",
          "name": "Heal Bell"
        },
        {
          "lv": "42",
          "name": "Rain Dance"
        },
        {
          "lv": "45",
          "name": "Psychic Noise"
        },
        {
          "lv": "48",
          "name": "Perish Song"
        },
        {
          "lv": "51",
          "name": "Boomburst"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Water Spout"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPA": 1
      },
      "baseFriendship": 50,
      "baseExp": 80,
      "growthRate": "Medium",
      "eggGroups": [
        "Water 2"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "064",
      "name": "Swimatonic",
      "category": "Harmony School",
      "types": [
        "WATER"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 125,
      "found": [],
      "abilities": [
        "Swift Swim"
      ],
      "hidden": "Liquid Voice",
      "stats": {
        "HP": 74,
        "ATK": 69,
        "DEF": 69,
        "SPE": 81,
        "SPA": 102,
        "SPD": 69
      },
      "flavor": "Like a guardian of the reefs, Swimatonic carves graceful paths through the ocean, leaving shimmering trails that help reefs flourish.",
      "evo": {
        "from": "063",
        "method": "Lv 30"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Sparkling Aria"
        },
        {
          "lv": "1",
          "name": "Sparkling Aria"
        },
        {
          "lv": "1",
          "name": "Bubble"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Aqua Jet"
        },
        {
          "lv": "8",
          "name": "Sing"
        },
        {
          "lv": "11",
          "name": "Round"
        },
        {
          "lv": "14",
          "name": "Bubble Beam"
        },
        {
          "lv": "17",
          "name": "Life Dew"
        },
        {
          "lv": "20",
          "name": "Screech"
        },
        {
          "lv": "23",
          "name": "Whirlpool"
        },
        {
          "lv": "26",
          "name": "Metal Sound"
        },
        {
          "lv": "30",
          "name": "Hyper Voice"
        },
        {
          "lv": "34",
          "name": "Surf"
        },
        {
          "lv": "37",
          "name": "Icy Wind"
        },
        {
          "lv": "41",
          "name": "Heal Bell"
        },
        {
          "lv": "45",
          "name": "Rain Dance"
        },
        {
          "lv": "50",
          "name": "Psychic Noise"
        },
        {
          "lv": "53",
          "name": "Perish Song"
        },
        {
          "lv": "57",
          "name": "Boomburst"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPA": 2
      },
      "baseFriendship": 50,
      "baseExp": 220,
      "growthRate": "Medium",
      "eggGroups": [
        "Water 2"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "065",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "066",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "evo": {
        "from": "065",
        "method": "Knock Out 20 Pokemon"
      },
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "067",
      "name": "Sedimite",
      "category": "Potential",
      "types": [
        "ROCK"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [
        "Quest: Strange Stone (from Sadie, Saudade Town)"
      ],
      "abilities": [
        "Sturdy"
      ],
      "hidden": "Adaptability",
      "stats": {
        "HP": 50,
        "ATK": 50,
        "DEF": 50,
        "SPE": 40,
        "SPA": 50,
        "SPD": 50
      },
      "flavor": "Sedimite has a cute and friendly nature, sometimes placing random rocks and items into its core purely for fun.",
      "evo": {
        "to": [
          "068",
          "069",
          "070",
          "071",
          "072",
          "073",
          "074",
          "075",
          "076",
          "077",
          "078"
        ]
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Rock Throw"
        },
        {
          "lv": "5",
          "name": "Sharpen"
        },
        {
          "lv": "10",
          "name": "Hidden Power"
        },
        {
          "lv": "15",
          "name": "Play Nice"
        },
        {
          "lv": "20",
          "name": "Ancient Power"
        },
        {
          "lv": "25",
          "name": "Rock Tomb"
        },
        {
          "lv": "30",
          "name": "Metronome"
        },
        {
          "lv": "35",
          "name": "Role Play"
        },
        {
          "lv": "40",
          "name": "Secret Power"
        },
        {
          "lv": "45",
          "name": "Charm"
        },
        {
          "lv": "50",
          "name": "Self-Destruct"
        },
        {
          "lv": "55",
          "name": "Rock Wrecker"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Encore"
        },
        {
          "lv": "EGG",
          "name": "Tickle"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Sassyshoelace"
      },
      "evYield": {
        "HP": 1
      },
      "baseFriendship": 50,
      "baseExp": 65,
      "growthRate": "Slow",
      "eggGroups": [
        "Mineral",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "068",
      "name": "Sedimage",
      "category": "Learned",
      "types": [
        "ROCK",
        "FIRE"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Magician"
      ],
      "hidden": "Magic Guard",
      "stats": {
        "HP": 80,
        "ATK": 70,
        "DEF": 50,
        "SPE": 90,
        "SPA": 130,
        "SPD": 110
      },
      "flavor": "It has a deep attachment to its staff as it cannot attack without it. It carves trails of glistening molten rock to mark its territory.",
      "evo": {
        "from": "067",
        "method": "Fire Stone"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Ember"
        },
        {
          "lv": "1",
          "name": "Ember"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Rock Throw"
        },
        {
          "lv": "1",
          "name": "Ancient Power"
        },
        {
          "lv": "1",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Metronome"
        },
        {
          "lv": "1",
          "name": "Role Play"
        },
        {
          "lv": "1",
          "name": "Secret Power"
        },
        {
          "lv": "1",
          "name": "Charm"
        },
        {
          "lv": "1",
          "name": "Self-Destruct"
        },
        {
          "lv": "5",
          "name": "Sharpen"
        },
        {
          "lv": "10",
          "name": "Hidden Power"
        },
        {
          "lv": "15",
          "name": "Play Nice"
        },
        {
          "lv": "20",
          "name": "Confuse Ray"
        },
        {
          "lv": "25",
          "name": "Incinerate"
        },
        {
          "lv": "30",
          "name": "Magic Powder"
        },
        {
          "lv": "35",
          "name": "Mystical Fire"
        },
        {
          "lv": "40",
          "name": "Power Gem"
        },
        {
          "lv": "45",
          "name": "Barrier"
        },
        {
          "lv": "50",
          "name": "Fire Blast"
        },
        {
          "lv": "55",
          "name": "Rock Wrecker"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Medeis"
      },
      "evYield": {
        "SPA": 2
      },
      "baseFriendship": 50,
      "baseExp": 184,
      "growthRate": "Slow",
      "eggGroups": [
        "Mineral",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "069",
      "name": "Sedimonk",
      "category": "Iron Will",
      "types": [
        "ROCK",
        "WATER"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Inner Focus"
      ],
      "hidden": "Anticipation",
      "stats": {
        "HP": 80,
        "ATK": 130,
        "DEF": 110,
        "SPE": 70,
        "SPA": 50,
        "SPD": 90
      },
      "flavor": "Meditation is one of Sedimonk’s favorite activities. It often sits near rivers, canals, or any body of water to find peace.",
      "evo": {
        "from": "067",
        "method": "Water Stone"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Aqua Jet"
        },
        {
          "lv": "1",
          "name": "Aqua Jet"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Rock Throw"
        },
        {
          "lv": "1",
          "name": "Ancient Power"
        },
        {
          "lv": "1",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Metronome"
        },
        {
          "lv": "1",
          "name": "Role Play"
        },
        {
          "lv": "1",
          "name": "Secret Power"
        },
        {
          "lv": "1",
          "name": "Charm"
        },
        {
          "lv": "1",
          "name": "Self-Destruct"
        },
        {
          "lv": "5",
          "name": "Sharpen"
        },
        {
          "lv": "10",
          "name": "Hidden Power"
        },
        {
          "lv": "15",
          "name": "Play Nice"
        },
        {
          "lv": "20",
          "name": "Focus Energy"
        },
        {
          "lv": "25",
          "name": "Brine"
        },
        {
          "lv": "30",
          "name": "Court Change"
        },
        {
          "lv": "35",
          "name": "Mega Punch"
        },
        {
          "lv": "40",
          "name": "Liquidation"
        },
        {
          "lv": "45",
          "name": "Quick Guard"
        },
        {
          "lv": "50",
          "name": "Surging Strikes"
        },
        {
          "lv": "55",
          "name": "Rock Wrecker"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Sassyshoelace"
      },
      "evYield": {
        "ATK": 2
      },
      "baseFriendship": 50,
      "baseExp": 184,
      "growthRate": "Slow",
      "eggGroups": [
        "Mineral",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "070",
      "name": "Sedruid",
      "category": "Nature",
      "types": [
        "ROCK",
        "GRASS"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Natural Cure"
      ],
      "hidden": "Serene Grace",
      "stats": {
        "HP": 90,
        "ATK": 50,
        "DEF": 130,
        "SPE": 80,
        "SPA": 70,
        "SPD": 110
      },
      "flavor": "Sedruid stands watch at the edge of forests. Its rocky frame shields the trees, while its leafy body is said to be able to restore damaged soil.",
      "evo": {
        "from": "067",
        "method": "Leaf Stone"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Trailblaze"
        },
        {
          "lv": "1",
          "name": "Trailblaze"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Rock Throw"
        },
        {
          "lv": "1",
          "name": "Ancient Power"
        },
        {
          "lv": "1",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Metronome"
        },
        {
          "lv": "1",
          "name": "Role Play"
        },
        {
          "lv": "1",
          "name": "Secret Power"
        },
        {
          "lv": "1",
          "name": "Charm"
        },
        {
          "lv": "1",
          "name": "Self-Destruct"
        },
        {
          "lv": "5",
          "name": "Sharpen"
        },
        {
          "lv": "10",
          "name": "Hidden Power"
        },
        {
          "lv": "15",
          "name": "Play Nice"
        },
        {
          "lv": "20",
          "name": "Grass Whistle"
        },
        {
          "lv": "25",
          "name": "Magical Leaf"
        },
        {
          "lv": "30",
          "name": "Forest's Curse"
        },
        {
          "lv": "35",
          "name": "Aromatherapy"
        },
        {
          "lv": "40",
          "name": "Energy Ball"
        },
        {
          "lv": "45",
          "name": "Jungle Healing"
        },
        {
          "lv": "50",
          "name": "Wood Hammer"
        },
        {
          "lv": "55",
          "name": "Rock Wrecker"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Jobi1849"
      },
      "evYield": {
        "DEF": 2
      },
      "baseFriendship": 50,
      "baseExp": 184,
      "growthRate": "Slow",
      "eggGroups": [
        "Mineral",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "071",
      "name": "Sedificer",
      "category": "Artisan",
      "types": [
        "ROCK",
        "ELECTRIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Technician"
      ],
      "hidden": "Tinted Lens",
      "stats": {
        "HP": 50,
        "ATK": 80,
        "DEF": 70,
        "SPE": 110,
        "SPA": 90,
        "SPD": 130
      },
      "flavor": "Sedificer’s glowing crystals hum like generators. It delights in crafting gadgets, startling opponents with sudden bursts of electricity.",
      "evo": {
        "from": "067",
        "method": "Thunder Stone"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Charge Beam"
        },
        {
          "lv": "1",
          "name": "Charge Beam"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Rock Throw"
        },
        {
          "lv": "1",
          "name": "Ancient Power"
        },
        {
          "lv": "1",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Metronome"
        },
        {
          "lv": "1",
          "name": "Role Play"
        },
        {
          "lv": "1",
          "name": "Secret Power"
        },
        {
          "lv": "1",
          "name": "Charm"
        },
        {
          "lv": "1",
          "name": "Self-Destruct"
        },
        {
          "lv": "5",
          "name": "Sharpen"
        },
        {
          "lv": "10",
          "name": "Hidden Power"
        },
        {
          "lv": "15",
          "name": "Play Nice"
        },
        {
          "lv": "20",
          "name": "Charge"
        },
        {
          "lv": "25",
          "name": "Parabolic Charge"
        },
        {
          "lv": "30",
          "name": "Ion Deluge"
        },
        {
          "lv": "35",
          "name": "Crystalize"
        },
        {
          "lv": "40",
          "name": "Signal Beam"
        },
        {
          "lv": "45",
          "name": "Rock Polish"
        },
        {
          "lv": "50",
          "name": "Electro Shot"
        },
        {
          "lv": "55",
          "name": "Rock Wrecker"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": {
        "discoverer": "tyla771"
      },
      "evYield": {
        "SPD": 2
      },
      "baseFriendship": 50,
      "baseExp": 184,
      "growthRate": "Slow",
      "eggGroups": [
        "Mineral",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "072",
      "name": "Sedivout",
      "category": "Divine",
      "types": [
        "ROCK",
        "STEEL"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Steely Spirit"
      ],
      "hidden": "Stalwart",
      "stats": {
        "HP": 90,
        "ATK": 110,
        "DEF": 130,
        "SPE": 50,
        "SPA": 70,
        "SPD": 80
      },
      "flavor": "Its armor gleams with starlight, crowned by purple flames. It channels the vast silence of space itself.",
      "evo": {
        "from": "067",
        "method": "Sun Stone"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Bullet Punch"
        },
        {
          "lv": "1",
          "name": "Bullet Punch"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Rock Throw"
        },
        {
          "lv": "1",
          "name": "Ancient Power"
        },
        {
          "lv": "1",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Metronome"
        },
        {
          "lv": "1",
          "name": "Role Play"
        },
        {
          "lv": "1",
          "name": "Secret Power"
        },
        {
          "lv": "1",
          "name": "Charm"
        },
        {
          "lv": "1",
          "name": "Self-Destruct"
        },
        {
          "lv": "5",
          "name": "Sharpen"
        },
        {
          "lv": "10",
          "name": "Hidden Power"
        },
        {
          "lv": "15",
          "name": "Play Nice"
        },
        {
          "lv": "20",
          "name": "Endure"
        },
        {
          "lv": "25",
          "name": "Mirror Shot"
        },
        {
          "lv": "30",
          "name": "Wide Guard"
        },
        {
          "lv": "35",
          "name": "Rock Blast"
        },
        {
          "lv": "40",
          "name": "Anchor Shot"
        },
        {
          "lv": "45",
          "name": "Autotomize"
        },
        {
          "lv": "50",
          "name": "Sunsteel Strike"
        },
        {
          "lv": "55",
          "name": "Rock Wrecker"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "MaxToshio"
      },
      "evYield": {
        "DEF": 2
      },
      "baseFriendship": 50,
      "baseExp": 184,
      "growthRate": "Slow",
      "eggGroups": [
        "Mineral",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "073",
      "name": "Sedirogue",
      "category": "Darkness",
      "types": [
        "ROCK",
        "DARK"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Unburden"
      ],
      "hidden": "Stakeout",
      "stats": {
        "HP": 50,
        "ATK": 110,
        "DEF": 90,
        "SPE": 130,
        "SPA": 80,
        "SPD": 70
      },
      "flavor": "It moves in the shade and shadows, striking swiftly before vanishing into smoke.",
      "evo": {
        "from": "067",
        "method": "Moon Stone"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Pursuit"
        },
        {
          "lv": "1",
          "name": "Pursuit"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Rock Throw"
        },
        {
          "lv": "1",
          "name": "Ancient Power"
        },
        {
          "lv": "1",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Metronome"
        },
        {
          "lv": "1",
          "name": "Role Play"
        },
        {
          "lv": "1",
          "name": "Secret Power"
        },
        {
          "lv": "1",
          "name": "Charm"
        },
        {
          "lv": "1",
          "name": "Self-Destruct"
        },
        {
          "lv": "5",
          "name": "Sharpen"
        },
        {
          "lv": "10",
          "name": "Hidden Power"
        },
        {
          "lv": "15",
          "name": "Play Nice"
        },
        {
          "lv": "20",
          "name": "Snatch"
        },
        {
          "lv": "25",
          "name": "Feint Attack"
        },
        {
          "lv": "30",
          "name": "Psycho Cut"
        },
        {
          "lv": "35",
          "name": "Embargo"
        },
        {
          "lv": "40",
          "name": "Night Slash"
        },
        {
          "lv": "45",
          "name": "Taunt"
        },
        {
          "lv": "50",
          "name": "Kowtow Cleave"
        },
        {
          "lv": "55",
          "name": "Rock Wrecker"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Sassyshoelace"
      },
      "evYield": {
        "SPE": 2
      },
      "baseFriendship": 50,
      "baseExp": 184,
      "growthRate": "Slow",
      "eggGroups": [
        "Mineral",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "074",
      "name": "Sediserker",
      "category": "Barbaric",
      "types": [
        "ROCK",
        "ICE"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Berserk"
      ],
      "hidden": "Sharpness",
      "stats": {
        "HP": 110,
        "ATK": 130,
        "DEF": 90,
        "SPE": 80,
        "SPA": 50,
        "SPD": 70
      },
      "flavor": "It charges into battle with twin axes of frozen stone. Pokémon know not to attack when it sees its icy mane gleaming with fury.",
      "evo": {
        "from": "067",
        "method": "Ice Stone"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Ice Shard"
        },
        {
          "lv": "1",
          "name": "Ice Shard"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Rock Throw"
        },
        {
          "lv": "1",
          "name": "Ancient Power"
        },
        {
          "lv": "1",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Metronome"
        },
        {
          "lv": "1",
          "name": "Role Play"
        },
        {
          "lv": "1",
          "name": "Secret Power"
        },
        {
          "lv": "1",
          "name": "Charm"
        },
        {
          "lv": "1",
          "name": "Self-Destruct"
        },
        {
          "lv": "5",
          "name": "Sharpen"
        },
        {
          "lv": "10",
          "name": "Hidden Power"
        },
        {
          "lv": "15",
          "name": "Play Nice"
        },
        {
          "lv": "20",
          "name": "Mist"
        },
        {
          "lv": "25",
          "name": "Avalanche"
        },
        {
          "lv": "30",
          "name": "Slash"
        },
        {
          "lv": "35",
          "name": "Swagger"
        },
        {
          "lv": "40",
          "name": "Stone Axe"
        },
        {
          "lv": "45",
          "name": "No Retreat"
        },
        {
          "lv": "50",
          "name": "Icicle Crash"
        },
        {
          "lv": "55",
          "name": "Rock Wrecker"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "allen041612"
      },
      "evYield": {
        "ATK": 2
      },
      "baseFriendship": 50,
      "baseExp": 184,
      "growthRate": "Slow",
      "eggGroups": [
        "Mineral",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "075",
      "name": "Sediranger",
      "category": "Long Range",
      "types": [
        "ROCK",
        "FLYING"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Sniper"
      ],
      "hidden": "Super Luck",
      "stats": {
        "HP": 70,
        "ATK": 90,
        "DEF": 80,
        "SPE": 130,
        "SPA": 110,
        "SPD": 50
      },
      "flavor": "Absorbing dawn energy, it becomes the perfect hunter. It's said this Pokémon never misses its target.",
      "evo": {
        "from": "067",
        "method": "Dawn Stone"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Gust"
        },
        {
          "lv": "1",
          "name": "Gust"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Rock Throw"
        },
        {
          "lv": "1",
          "name": "Ancient Power"
        },
        {
          "lv": "1",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Metronome"
        },
        {
          "lv": "1",
          "name": "Role Play"
        },
        {
          "lv": "1",
          "name": "Secret Power"
        },
        {
          "lv": "1",
          "name": "Charm"
        },
        {
          "lv": "1",
          "name": "Self-Destruct"
        },
        {
          "lv": "5",
          "name": "Sharpen"
        },
        {
          "lv": "10",
          "name": "Hidden Power"
        },
        {
          "lv": "15",
          "name": "Play Nice"
        },
        {
          "lv": "20",
          "name": "Focus Energy"
        },
        {
          "lv": "25",
          "name": "Air Cutter"
        },
        {
          "lv": "30",
          "name": "Cupid's Bow"
        },
        {
          "lv": "35",
          "name": "Acupressure"
        },
        {
          "lv": "40",
          "name": "Air Slash"
        },
        {
          "lv": "45",
          "name": "Spirit Shackle"
        },
        {
          "lv": "50",
          "name": "Lock-On"
        },
        {
          "lv": "55",
          "name": "Rock Wrecker"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        }
      ],
      "anomaly": {
        "discoverer": "mickiewicz333"
      },
      "evYield": {
        "SPE": 2
      },
      "baseFriendship": 50,
      "baseExp": 184,
      "growthRate": "Slow",
      "eggGroups": [
        "Mineral",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "076",
      "name": "Sedimancer",
      "category": "Reviver",
      "types": [
        "ROCK",
        "GHOST"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Shadow Tag"
      ],
      "hidden": "Wandering Spirit",
      "stats": {
        "HP": 70,
        "ATK": 80,
        "DEF": 50,
        "SPE": 90,
        "SPA": 110,
        "SPD": 130
      },
      "flavor": "Sedimancer weaves ghostly energy into stone, raising walls that shift like living shadows. It is feared as the builder of haunted fortresses.",
      "evo": {
        "from": "067",
        "method": "Dusk Stone"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Night Shade"
        },
        {
          "lv": "1",
          "name": "Night Shade"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Rock Throw"
        },
        {
          "lv": "1",
          "name": "Ancient Power"
        },
        {
          "lv": "1",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Metronome"
        },
        {
          "lv": "1",
          "name": "Role Play"
        },
        {
          "lv": "1",
          "name": "Secret Power"
        },
        {
          "lv": "1",
          "name": "Charm"
        },
        {
          "lv": "1",
          "name": "Self-Destruct"
        },
        {
          "lv": "5",
          "name": "Sharpen"
        },
        {
          "lv": "10",
          "name": "Hidden Power"
        },
        {
          "lv": "15",
          "name": "Play Nice"
        },
        {
          "lv": "20",
          "name": "Spite"
        },
        {
          "lv": "25",
          "name": "Hex"
        },
        {
          "lv": "30",
          "name": "Full Moon Bind"
        },
        {
          "lv": "35",
          "name": "Curse"
        },
        {
          "lv": "40",
          "name": "Bitter Malice"
        },
        {
          "lv": "45",
          "name": "Revival Blessing"
        },
        {
          "lv": "50",
          "name": "Last Respects"
        },
        {
          "lv": "55",
          "name": "Rock Wrecker"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        }
      ],
      "anomaly": {
        "discoverer": "3nder27"
      },
      "evYield": {
        "SPD": 2
      },
      "baseFriendship": 50,
      "baseExp": 184,
      "growthRate": "Slow",
      "eggGroups": [
        "Mineral",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "077",
      "name": "Sediric",
      "category": "Healer",
      "types": [
        "ROCK",
        "LIGHT"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Triage"
      ],
      "hidden": "Healer",
      "stats": {
        "HP": 130,
        "ATK": 70,
        "DEF": 110,
        "SPE": 50,
        "SPA": 90,
        "SPD": 80
      },
      "flavor": "Sediric’s body glows with divine energy. It is known to restore vitality by bathing companions in radiant waves.",
      "evo": {
        "from": "067",
        "method": "Shiny Stone"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Divine Slash"
        },
        {
          "lv": "1",
          "name": "Divine Slash"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Rock Throw"
        },
        {
          "lv": "1",
          "name": "Ancient Power"
        },
        {
          "lv": "1",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Metronome"
        },
        {
          "lv": "1",
          "name": "Role Play"
        },
        {
          "lv": "1",
          "name": "Secret Power"
        },
        {
          "lv": "1",
          "name": "Charm"
        },
        {
          "lv": "1",
          "name": "Self-Destruct"
        },
        {
          "lv": "5",
          "name": "Sharpen"
        },
        {
          "lv": "10",
          "name": "Hidden Power"
        },
        {
          "lv": "15",
          "name": "Play Nice"
        },
        {
          "lv": "20",
          "name": "Cleansing Light"
        },
        {
          "lv": "25",
          "name": "Aurora Beam"
        },
        {
          "lv": "30",
          "name": "Draining Kiss"
        },
        {
          "lv": "35",
          "name": "Warming Light"
        },
        {
          "lv": "40",
          "name": "Shining Burst"
        },
        {
          "lv": "45",
          "name": "Radiant Blessing"
        },
        {
          "lv": "50",
          "name": "Rainbow Bolt"
        },
        {
          "lv": "55",
          "name": "Rock Wrecker"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        }
      ],
      "anomaly": {
        "discoverer": "Sassyshoelace"
      },
      "evYield": {
        "HP": 2
      },
      "baseFriendship": 50,
      "baseExp": 184,
      "growthRate": "Slow",
      "eggGroups": [
        "Mineral",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "078",
      "name": "Sedilock",
      "category": "Oathbreaker",
      "types": [
        "ROCK",
        "COSMIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Mold Breaker"
      ],
      "hidden": "Telepathy",
      "stats": {
        "HP": 110,
        "ATK": 50,
        "DEF": 80,
        "SPE": 70,
        "SPA": 130,
        "SPD": 90
      },
      "flavor": "Sedilock glows with stardust, testing trainers with riddles; when angered, its aura is said to be strong enough to bend gravity.",
      "evo": {
        "from": "067",
        "method": "Cosmic Stone"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Star Shot"
        },
        {
          "lv": "1",
          "name": "Star Shot"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Helping Hand"
        },
        {
          "lv": "1",
          "name": "Rock Throw"
        },
        {
          "lv": "1",
          "name": "Ancient Power"
        },
        {
          "lv": "1",
          "name": "Rock Tomb"
        },
        {
          "lv": "1",
          "name": "Metronome"
        },
        {
          "lv": "1",
          "name": "Role Play"
        },
        {
          "lv": "1",
          "name": "Secret Power"
        },
        {
          "lv": "1",
          "name": "Charm"
        },
        {
          "lv": "1",
          "name": "Self-Destruct"
        },
        {
          "lv": "5",
          "name": "Sharpen"
        },
        {
          "lv": "10",
          "name": "Hidden Power"
        },
        {
          "lv": "15",
          "name": "Play Nice"
        },
        {
          "lv": "20",
          "name": "Heal Block"
        },
        {
          "lv": "25",
          "name": "Star Seeker"
        },
        {
          "lv": "30",
          "name": "Swift"
        },
        {
          "lv": "35",
          "name": "Zero Gravity"
        },
        {
          "lv": "40",
          "name": "Starstorm"
        },
        {
          "lv": "45",
          "name": "Gamma Charge"
        },
        {
          "lv": "50",
          "name": "Meteor Beam"
        },
        {
          "lv": "55",
          "name": "Rock Wrecker"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        }
      ],
      "anomaly": {
        "discoverer": "Sassyshoelace"
      },
      "evYield": {
        "SPA": 2
      },
      "baseFriendship": 50,
      "baseExp": 184,
      "growthRate": "Slow",
      "eggGroups": [
        "Mineral",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "079",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "evo": {
        "to": "080"
      },
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "080",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "081",
      "name": "Corelet",
      "category": "Smiley Star",
      "types": [
        "COSMIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 130,
      "found": [
        "Route 5"
      ],
      "abilities": [
        "Burning Hot",
        "Drought"
      ],
      "hidden": "Solar Power",
      "stats": {
        "HP": 100,
        "ATK": 10,
        "DEF": 25,
        "SPE": 10,
        "SPA": 50,
        "SPD": 5
      },
      "flavor": "Once part of a gigantrum, it split away and rose to the mesosphere. Legends say a shooting corelet heralds the fulfillment of deepest desires.",
      "evo": {
        "to": "082"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Sunny Day"
        },
        {
          "lv": "1",
          "name": "Star Shot"
        },
        {
          "lv": "5",
          "name": "Defense Curl"
        },
        {
          "lv": "10",
          "name": "Gravity"
        },
        {
          "lv": "15",
          "name": "Flame Burst"
        },
        {
          "lv": "19",
          "name": "Cleansing Light"
        },
        {
          "lv": "24",
          "name": "Starstorm"
        },
        {
          "lv": "29",
          "name": "Warming Light"
        },
        {
          "lv": "33",
          "name": "Dazzling Gleam"
        },
        {
          "lv": "38",
          "name": "Will-O-Wisp"
        },
        {
          "lv": "43",
          "name": "Weather Ball"
        },
        {
          "lv": "47",
          "name": "Heat Wave"
        },
        {
          "lv": "52",
          "name": "Power Split"
        },
        {
          "lv": "57",
          "name": "Galactic Nebula"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": {
        "discoverer": "Azel42"
      },
      "evYield": {
        "HP": 1
      },
      "baseFriendship": 50,
      "baseExp": 110,
      "growthRate": "Fast",
      "eggGroups": [
        "Undiscovered"
      ],
      "gender": null,
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "082",
      "name": "Gigantrum",
      "category": "Red Giant",
      "types": [
        "COSMIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 60,
      "found": [],
      "abilities": [
        "Burning Hot",
        "Drought"
      ],
      "hidden": "Solar Power",
      "stats": {
        "HP": 150,
        "ATK": 35,
        "DEF": 55,
        "SPE": 50,
        "SPA": 100,
        "SPD": 10
      },
      "flavor": "As they grow, Gigantrum drains heat from its surroundings, leaving itself in eternal cold. Only authorized labs may possess this species.",
      "evo": {
        "from": "081",
        "to": "083",
        "method": "Lv 20"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Sunny Day"
        },
        {
          "lv": "1",
          "name": "Star Shot"
        },
        {
          "lv": "1",
          "name": "Defense Curl"
        },
        {
          "lv": "1",
          "name": "Gravity"
        },
        {
          "lv": "15",
          "name": "Flame Burst"
        },
        {
          "lv": "19",
          "name": "Cleansing Light"
        },
        {
          "lv": "25",
          "name": "Starstorm"
        },
        {
          "lv": "31",
          "name": "Warming Light"
        },
        {
          "lv": "36",
          "name": "Dazzling Gleam"
        },
        {
          "lv": "42",
          "name": "Will-O-Wisp"
        },
        {
          "lv": "48",
          "name": "Weather Ball"
        },
        {
          "lv": "53",
          "name": "Heat Wave"
        },
        {
          "lv": "59",
          "name": "Power Split"
        },
        {
          "lv": "65",
          "name": "Galactic Nebula"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": {
        "discoverer": "Azel42"
      },
      "evYield": {
        "HP": 2
      },
      "baseFriendship": 30,
      "baseExp": 350,
      "growthRate": "Fast",
      "eggGroups": [
        "Undiscovered"
      ],
      "gender": null,
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "083",
      "name": "Colapsore",
      "category": "Collapsed Star",
      "types": [
        "COSMIC",
        "LIGHT"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 20,
      "found": [],
      "abilities": [
        "Burning Hot",
        "Drought"
      ],
      "hidden": "Solar Power",
      "stats": {
        "HP": 200,
        "ATK": 60,
        "DEF": 65,
        "SPE": 70,
        "SPA": 140,
        "SPD": 15
      },
      "flavor": "As they amass so much heat, it collapses into itself, resulting in a phenomenon called a supernova, becoming the unstable form that it is.",
      "evo": {
        "from": "082",
        "method": "Lv 55"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Bright Cannon"
        },
        {
          "lv": "1",
          "name": "Bright Cannon"
        },
        {
          "lv": "1",
          "name": "Supernova"
        },
        {
          "lv": "1",
          "name": "Destiny Bond"
        },
        {
          "lv": "1",
          "name": "Explosion"
        },
        {
          "lv": "1",
          "name": "Sunny Day"
        },
        {
          "lv": "1",
          "name": "Star Shot"
        },
        {
          "lv": "1",
          "name": "Defense Curl"
        },
        {
          "lv": "1",
          "name": "Gravity"
        },
        {
          "lv": "15",
          "name": "Flame Burst"
        },
        {
          "lv": "19",
          "name": "Gravity"
        },
        {
          "lv": "25",
          "name": "Starstorm"
        },
        {
          "lv": "31",
          "name": "Warming Light"
        },
        {
          "lv": "36",
          "name": "Dazzling Gleam"
        },
        {
          "lv": "42",
          "name": "Will-O-Wisp"
        },
        {
          "lv": "48",
          "name": "Weather Ball"
        },
        {
          "lv": "54",
          "name": "Heat Wave"
        },
        {
          "lv": "61",
          "name": "Power Split"
        },
        {
          "lv": "68",
          "name": "Galactic Nebula"
        },
        {
          "lv": "76",
          "name": "Shell Burst"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": {
        "discoverer": "Azel42"
      },
      "evYield": {
        "HP": 3
      },
      "baseFriendship": 30,
      "baseExp": 601,
      "growthRate": "Fast",
      "eggGroups": [
        "Undiscovered"
      ],
      "gender": null,
      "eggCycles": 6400,
      "tutorMoves": []
    },
    {
      "dex": "084",
      "name": "Bunbris",
      "category": "Dust Bunny",
      "types": [
        "NORMAL",
        "GROUND"
      ],
      "height": "1'00\" ft",
      "weight": "Unknown",
      "catchRate": 190,
      "found": [
        "Route 5"
      ],
      "abilities": [
        "Pickup",
        "Surprise!"
      ],
      "hidden": "Fluffy",
      "stats": {
        "HP": 20,
        "ATK": 58,
        "DEF": 70,
        "SPE": 58,
        "SPA": 58,
        "SPD": 35
      },
      "flavor": "Bunbris are known to be playful, hopping like little bunnies, but they grow timid when strangers draw near.",
      "evo": {
        "to": "085"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Baby-Doll Eyes"
        },
        {
          "lv": "5",
          "name": "Work Up"
        },
        {
          "lv": "8",
          "name": "Clear Smog"
        },
        {
          "lv": "13",
          "name": "Double Slap"
        },
        {
          "lv": "18",
          "name": "Cotton Spore"
        },
        {
          "lv": "21",
          "name": "Mud Bomb"
        },
        {
          "lv": "26",
          "name": "Uproar"
        },
        {
          "lv": "31",
          "name": "Curse"
        },
        {
          "lv": "34",
          "name": "Happily Ever After"
        },
        {
          "lv": "39",
          "name": "Substitute"
        },
        {
          "lv": "44",
          "name": "Thrash"
        },
        {
          "lv": "47",
          "name": "Cotton Guard"
        },
        {
          "lv": "52",
          "name": "Grudge"
        },
        {
          "lv": "58",
          "name": "Trump Card"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Charm"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        }
      ],
      "anomaly": {
        "discoverer": "Mapleaudino"
      },
      "evYield": {
        "DEF": 1
      },
      "baseFriendship": 50,
      "baseExp": 59,
      "growthRate": "Fluctuating",
      "eggGroups": [
        "Amorphous"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 2560,
      "tutorMoves": []
    },
    {
      "dex": "085",
      "name": "Amalgaton",
      "category": "Burling Cloud",
      "types": [
        "NORMAL",
        "GHOST"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 50,
      "found": [],
      "abilities": [
        "Infiltrator",
        "Surprise!"
      ],
      "hidden": "Fluffy",
      "stats": {
        "HP": 120,
        "ATK": 93,
        "DEF": 101,
        "SPE": 45,
        "SPA": 93,
        "SPD": 57
      },
      "flavor": "Amalgaton are larger, braver Bunbris. Though still playful at heart, their size makes most trainers either battle them or flee from fear.",
      "evo": {
        "from": "084",
        "method": "Special evolution"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Phantom Force"
        },
        {
          "lv": "1",
          "name": "Phantom Force"
        },
        {
          "lv": "1",
          "name": "Shadow Sneak"
        },
        {
          "lv": "1",
          "name": "Pound"
        },
        {
          "lv": "1",
          "name": "Baby-Doll Eyes"
        },
        {
          "lv": "1",
          "name": "Work Up"
        },
        {
          "lv": "1",
          "name": "Clear Smog"
        },
        {
          "lv": "13",
          "name": "Double Slap"
        },
        {
          "lv": "18",
          "name": "Cotton Spore"
        },
        {
          "lv": "21",
          "name": "Mud Bomb"
        },
        {
          "lv": "26",
          "name": "Uproar"
        },
        {
          "lv": "32",
          "name": "Curse"
        },
        {
          "lv": "36",
          "name": "Happily Ever After"
        },
        {
          "lv": "42",
          "name": "Substitute"
        },
        {
          "lv": "48",
          "name": "Thrash"
        },
        {
          "lv": "52",
          "name": "Cotton Guard"
        },
        {
          "lv": "58",
          "name": "Grudge"
        },
        {
          "lv": "65",
          "name": "Trump Card"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        }
      ],
      "anomaly": {
        "discoverer": "Mapleaudino"
      },
      "evYield": {
        "HP": 1,
        "DEF": 1
      },
      "baseFriendship": 0,
      "baseExp": 182,
      "growthRate": "Fluctuating",
      "eggGroups": [
        "Amorphous"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 2560,
      "tutorMoves": []
    },
    {
      "dex": "086",
      "name": "Hattot",
      "category": "Chicken Wing",
      "types": [
        "FIRE"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 250,
      "found": [
        "Route 4"
      ],
      "abilities": [
        "Early Bird",
        "Run Away"
      ],
      "hidden": "Costar",
      "stats": {
        "HP": 40,
        "ATK": 44,
        "DEF": 35,
        "SPE": 56,
        "SPA": 51,
        "SPD": 44
      },
      "flavor": "A real delight on farms. Hattot especially in large groups can create beautiful melodies with their chirping. They never get tired of it.",
      "evo": {
        "to": "087"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Peck"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "5",
          "name": "Ember"
        },
        {
          "lv": "8",
          "name": "Sing"
        },
        {
          "lv": "12",
          "name": "Round"
        },
        {
          "lv": "15",
          "name": "Sunny Day"
        },
        {
          "lv": "19",
          "name": "Incinerate"
        },
        {
          "lv": "22",
          "name": "Echoed Voice"
        },
        {
          "lv": "26",
          "name": "Encore"
        },
        {
          "lv": "29",
          "name": "Blaze Kick"
        },
        {
          "lv": "33",
          "name": "Alluring Voice"
        },
        {
          "lv": "36",
          "name": "Feather Dance"
        },
        {
          "lv": "40",
          "name": "Heat Wave"
        },
        {
          "lv": "43",
          "name": "Spotlight"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Air Slash"
        },
        {
          "lv": "EGG",
          "name": "Burning Jealousy"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPE": 1
      },
      "baseFriendship": 50,
      "baseExp": 50,
      "growthRate": "Fast",
      "eggGroups": [
        "Flying",
        "Field"
      ],
      "gender": {
        "m": 25,
        "f": 75
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "087",
      "name": "Flarflock",
      "category": "Fried Chicken",
      "types": [
        "FIRE"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 120,
      "found": [],
      "abilities": [
        "Early Bird",
        "Rivalry"
      ],
      "hidden": "Costar",
      "stats": {
        "HP": 60,
        "ATK": 55,
        "DEF": 46,
        "SPE": 82,
        "SPA": 67,
        "SPD": 60
      },
      "flavor": "Unlike their pre-evo, Flarflock despise music. Their cry is a rough croak, not a chirp, and it visibly frustrates them.",
      "evo": {
        "from": "086",
        "to": "088",
        "method": "Lv 15"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Flatter"
        },
        {
          "lv": "1",
          "name": "Flatter"
        },
        {
          "lv": "1",
          "name": "Peck"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Ember"
        },
        {
          "lv": "1",
          "name": "Sing"
        },
        {
          "lv": "12",
          "name": "Round"
        },
        {
          "lv": "15",
          "name": "Sunny Day"
        },
        {
          "lv": "20",
          "name": "Incinerate"
        },
        {
          "lv": "24",
          "name": "Echoed Voice"
        },
        {
          "lv": "29",
          "name": "Encore"
        },
        {
          "lv": "33",
          "name": "Blaze Kick"
        },
        {
          "lv": "38",
          "name": "Alluring Voice"
        },
        {
          "lv": "42",
          "name": "Feather Dance"
        },
        {
          "lv": "47",
          "name": "Heat Wave"
        },
        {
          "lv": "51",
          "name": "Spotlight"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        },
        {
          "lv": "TM16",
          "name": "Low Sweep"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPE": 2
      },
      "baseFriendship": 50,
      "baseExp": 122,
      "growthRate": "Fast",
      "eggGroups": [
        "Flying",
        "Field"
      ],
      "gender": {
        "m": 25,
        "f": 75
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "088",
      "name": "Bawkurn",
      "category": "Hot Sauce",
      "types": [
        "FIRE"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Early Bird",
        "Rivalry"
      ],
      "hidden": "Costar",
      "stats": {
        "HP": 80,
        "ATK": 70,
        "DEF": 56,
        "SPE": 111,
        "SPA": 88,
        "SPD": 80
      },
      "flavor": "With its tail feathers, Bawkurn weaves enchanting melodies. Regaining its singing voice, it manipulates fire by shifting notes.",
      "evo": {
        "from": "087",
        "method": "Lv 32"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Torch Song"
        },
        {
          "lv": "1",
          "name": "Torch Song"
        },
        {
          "lv": "1",
          "name": "Overdrive"
        },
        {
          "lv": "1",
          "name": "Flatter"
        },
        {
          "lv": "1",
          "name": "Peck"
        },
        {
          "lv": "1",
          "name": "Growl"
        },
        {
          "lv": "1",
          "name": "Ember"
        },
        {
          "lv": "1",
          "name": "Sing"
        },
        {
          "lv": "12",
          "name": "Round"
        },
        {
          "lv": "15",
          "name": "Sunny Day"
        },
        {
          "lv": "20",
          "name": "Incinerate"
        },
        {
          "lv": "24",
          "name": "Echoed Voice"
        },
        {
          "lv": "29",
          "name": "Encore"
        },
        {
          "lv": "33",
          "name": "Blaze Kick"
        },
        {
          "lv": "39",
          "name": "Alluring Voice"
        },
        {
          "lv": "44",
          "name": "Feather Dance"
        },
        {
          "lv": "50",
          "name": "Heat Wave"
        },
        {
          "lv": "55",
          "name": "Spotlight"
        },
        {
          "lv": "61",
          "name": "Perish Song"
        },
        {
          "lv": "66",
          "name": "Boomburst"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        },
        {
          "lv": "TM16",
          "name": "Low Sweep"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPE": 2,
        "SPA": 1
      },
      "baseFriendship": 50,
      "baseExp": 240,
      "growthRate": "Fast",
      "eggGroups": [
        "Flying",
        "Field"
      ],
      "gender": {
        "m": 25,
        "f": 75
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "089",
      "name": "Garot",
      "category": "Tarot Gar",
      "types": [
        "WATER",
        "PSYCHIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 200,
      "found": [
        "Route 3"
      ],
      "abilities": [
        "Forewarn",
        "Hydration"
      ],
      "hidden": "Magic Bounce",
      "stats": {
        "HP": 70,
        "ATK": 80,
        "DEF": 35,
        "SPE": 30,
        "SPA": 70,
        "SPD": 35
      },
      "flavor": "Garot lurks beneath the waters, light dances across its markings. Many treat this sight as an omen and immediately return.",
      "evo": {
        "to": "090"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Water Gun"
        },
        {
          "lv": "3",
          "name": "Meditate"
        },
        {
          "lv": "6",
          "name": "Confuse Ray"
        },
        {
          "lv": "10",
          "name": "Bite"
        },
        {
          "lv": "13",
          "name": "Miracle Eye"
        },
        {
          "lv": "16",
          "name": "Psybeam"
        },
        {
          "lv": "20",
          "name": "Water Pulse"
        },
        {
          "lv": "23",
          "name": "Imprison"
        },
        {
          "lv": "26",
          "name": "Barrage"
        },
        {
          "lv": "30",
          "name": "Magic Room"
        },
        {
          "lv": "33",
          "name": "Ancient Power"
        },
        {
          "lv": "36",
          "name": "Life Dew"
        },
        {
          "lv": "40",
          "name": "Psychic Fangs"
        },
        {
          "lv": "43",
          "name": "Surf"
        },
        {
          "lv": "46",
          "name": "Recover"
        },
        {
          "lv": "50",
          "name": "Power Gem"
        },
        {
          "lv": "53",
          "name": "Shadow Ball"
        },
        {
          "lv": "55",
          "name": "Future Sight"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Aqua Jet"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "cryodor."
      },
      "evYield": {
        "HP": 1
      },
      "baseFriendship": 50,
      "baseExp": 120,
      "growthRate": "Fast",
      "eggGroups": [
        "Water 2"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "090",
      "name": "Garcana",
      "category": "Arcana Incarnate",
      "types": [
        "WATER",
        "PSYCHIC"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 80,
      "found": [],
      "abilities": [
        "Forewarn",
        "Hydration"
      ],
      "hidden": "Magic Bounce",
      "stats": {
        "HP": 100,
        "ATK": 85,
        "DEF": 63,
        "SPE": 61,
        "SPA": 90,
        "SPD": 63
      },
      "flavor": "Garcana moves soundlessly through the dark, its vast form a silent presence that unsettles all who sense it nearby.",
      "evo": {
        "from": "089",
        "method": "Level up knowing Ancient Power"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Water Gun"
        },
        {
          "lv": "3",
          "name": "Meditate"
        },
        {
          "lv": "6",
          "name": "Confuse Ray"
        },
        {
          "lv": "10",
          "name": "Bite"
        },
        {
          "lv": "13",
          "name": "Miracle Eye"
        },
        {
          "lv": "16",
          "name": "Psybeam"
        },
        {
          "lv": "20",
          "name": "Water Pulse"
        },
        {
          "lv": "23",
          "name": "Imprison"
        },
        {
          "lv": "26",
          "name": "Barrage"
        },
        {
          "lv": "30",
          "name": "Magic Room"
        },
        {
          "lv": "33",
          "name": "Ancient Power"
        },
        {
          "lv": "36",
          "name": "Life Dew"
        },
        {
          "lv": "40",
          "name": "Psychic Fangs"
        },
        {
          "lv": "43",
          "name": "Surf"
        },
        {
          "lv": "46",
          "name": "Recover"
        },
        {
          "lv": "50",
          "name": "Power Gem"
        },
        {
          "lv": "53",
          "name": "Shadow Ball"
        },
        {
          "lv": "55",
          "name": "Future Sight"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "cryodor."
      },
      "evYield": {
        "HP": 2
      },
      "baseFriendship": 50,
      "baseExp": 250,
      "growthRate": "Fast",
      "eggGroups": [
        "Water 2"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "091",
      "name": "Mangmo",
      "category": "Gustling",
      "types": [
        "FLYING"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 180,
      "found": [
        "Route 5"
      ],
      "abilities": [
        "Steadfast",
        "Scrappy"
      ],
      "hidden": "Air Lock",
      "stats": {
        "HP": 30,
        "ATK": 50,
        "DEF": 30,
        "SPE": 60,
        "SPA": 35,
        "SPD": 40
      },
      "flavor": "Mangmo often trains alone, mastering small gusts of wind. It guides air around its body to glide great distances.",
      "evo": {
        "to": "092"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Quick Attack"
        },
        {
          "lv": "4",
          "name": "Gust"
        },
        {
          "lv": "7",
          "name": "Leer"
        },
        {
          "lv": "10",
          "name": "Twister"
        },
        {
          "lv": "13",
          "name": "Defog"
        },
        {
          "lv": "16",
          "name": "Wing Attack"
        },
        {
          "lv": "19",
          "name": "Focus Energy"
        },
        {
          "lv": "22",
          "name": "Vacuum Wave"
        },
        {
          "lv": "25",
          "name": "Tickle"
        },
        {
          "lv": "28",
          "name": "Slam"
        },
        {
          "lv": "31",
          "name": "Agility"
        },
        {
          "lv": "35",
          "name": "Acrobatics"
        },
        {
          "lv": "39",
          "name": "Drain Punch"
        },
        {
          "lv": "43",
          "name": "Seismic Toss"
        },
        {
          "lv": "47",
          "name": "Bulk Up"
        },
        {
          "lv": "51",
          "name": "Thrash"
        },
        {
          "lv": "55",
          "name": "Close Combat"
        },
        {
          "lv": "59",
          "name": "Hurricane"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Comet Punch"
        },
        {
          "lv": "EGG",
          "name": "Air Cutter"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM16",
          "name": "Low Sweep"
        }
      ],
      "anomaly": {
        "discoverer": "TheDragonMaster"
      },
      "evYield": {
        "SPE": 1
      },
      "baseFriendship": 50,
      "baseExp": 62,
      "growthRate": "Fast",
      "eggGroups": [
        "Flying",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 2560,
      "tutorMoves": []
    },
    {
      "dex": "092",
      "name": "Mangmight",
      "category": "Windblade",
      "types": [
        "FLYING",
        "FIGHTING"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 50,
      "found": [],
      "abilities": [
        "Steadfast",
        "Scrappy"
      ],
      "hidden": "Air Lock",
      "stats": {
        "HP": 95,
        "ATK": 90,
        "DEF": 75,
        "SPE": 105,
        "SPA": 70,
        "SPD": 100
      },
      "flavor": "With powerful ear movements and swift martial skills, it bends the air around its body to strike with invisible blasts of wind.",
      "evo": {
        "from": "091",
        "method": "Lv 45"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Flying Press"
        },
        {
          "lv": "1",
          "name": "Flying Press"
        },
        {
          "lv": "1",
          "name": "Quick Attack"
        },
        {
          "lv": "1",
          "name": "Gust"
        },
        {
          "lv": "1",
          "name": "Leer"
        },
        {
          "lv": "10",
          "name": "Twister"
        },
        {
          "lv": "13",
          "name": "Defog"
        },
        {
          "lv": "16",
          "name": "Wing Attack"
        },
        {
          "lv": "19",
          "name": "Focus Energy"
        },
        {
          "lv": "22",
          "name": "Vacuum Wave"
        },
        {
          "lv": "25",
          "name": "Tickle"
        },
        {
          "lv": "28",
          "name": "Slam"
        },
        {
          "lv": "31",
          "name": "Agility"
        },
        {
          "lv": "35",
          "name": "Acrobatics"
        },
        {
          "lv": "39",
          "name": "Drain Punch"
        },
        {
          "lv": "43",
          "name": "Seismic Toss"
        },
        {
          "lv": "48",
          "name": "Bulk Up"
        },
        {
          "lv": "53",
          "name": "Thrash"
        },
        {
          "lv": "58",
          "name": "Close Combat"
        },
        {
          "lv": "63",
          "name": "Hurricane"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM16",
          "name": "Low Sweep"
        }
      ],
      "anomaly": {
        "discoverer": "TheDragonMaster"
      },
      "evYield": {
        "SPE": 2
      },
      "baseFriendship": 50,
      "baseExp": 201,
      "growthRate": "Fast",
      "eggGroups": [
        "Flying",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 2560,
      "tutorMoves": []
    },
    {
      "dex": "093",
      "name": "Shorecite",
      "category": "Calcite",
      "types": [
        "WATER",
        "ROCK"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 190,
      "found": [
        "Pebpup Cavern"
      ],
      "abilities": [
        "Purifying Salt",
        "Shell Armor"
      ],
      "hidden": "Storm Drain",
      "stats": {
        "HP": 40,
        "ATK": 60,
        "DEF": 75,
        "SPE": 50,
        "SPA": 40,
        "SPD": 40
      },
      "flavor": "With its small claws, Shorecite burrows beneath the sand to evade predators, leaving its stone-like shell exposed to blend with rocks.",
      "evo": {
        "to": "094"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Withdraw"
        },
        {
          "lv": "3",
          "name": "Rock Throw"
        },
        {
          "lv": "8",
          "name": "Vise Grip"
        },
        {
          "lv": "13",
          "name": "Protect"
        },
        {
          "lv": "17",
          "name": "Brine"
        },
        {
          "lv": "22",
          "name": "Safeguard"
        },
        {
          "lv": "27",
          "name": "Rock Blast"
        },
        {
          "lv": "31",
          "name": "Razor Shell"
        },
        {
          "lv": "36",
          "name": "Shelter"
        },
        {
          "lv": "41",
          "name": "Crabhammer"
        },
        {
          "lv": "45",
          "name": "Heavy Slam"
        },
        {
          "lv": "56",
          "name": "Shell Smash"
        },
        {
          "lv": "61",
          "name": "Stealth Rock"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Crystalize"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Cryodor"
      },
      "evYield": {
        "DEF": 1
      },
      "baseFriendship": 50,
      "baseExp": 65,
      "growthRate": "Fluctuating",
      "eggGroups": [
        "Water 3",
        "Mineral"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "094",
      "name": "Giganshore",
      "category": "Calstelagmite",
      "types": [
        "WATER",
        "ROCK"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 75,
      "found": [],
      "abilities": [
        "Purifying Salt",
        "Shell Armor"
      ],
      "hidden": "Storm Drain",
      "stats": {
        "HP": 90,
        "ATK": 100,
        "DEF": 125,
        "SPE": 40,
        "SPA": 70,
        "SPD": 70
      },
      "flavor": "With its vast shell and claws, Giganshore fears no predators. It protects Shorecite, letting them roam across its back.",
      "evo": {
        "from": "093",
        "method": "Lv 40"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Salt Cure"
        },
        {
          "lv": "1",
          "name": "Salt Cure"
        },
        {
          "lv": "1",
          "name": "Defend Order"
        },
        {
          "lv": "1",
          "name": "Attack Order"
        },
        {
          "lv": "1",
          "name": "Withdraw"
        },
        {
          "lv": "1",
          "name": "Rock Throw"
        },
        {
          "lv": "1",
          "name": "Vise Grip"
        },
        {
          "lv": "1",
          "name": "Protect"
        },
        {
          "lv": "17",
          "name": "Brine"
        },
        {
          "lv": "22",
          "name": "Safeguard"
        },
        {
          "lv": "27",
          "name": "Rock Blast"
        },
        {
          "lv": "31",
          "name": "Razor Shell"
        },
        {
          "lv": "36",
          "name": "Shelter"
        },
        {
          "lv": "42",
          "name": "Crabhammer"
        },
        {
          "lv": "47",
          "name": "Heavy Slam"
        },
        {
          "lv": "53",
          "name": "Shell Smash"
        },
        {
          "lv": "59",
          "name": "Stealth Rock"
        },
        {
          "lv": "66",
          "name": "Rock Wrecker"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM08",
          "name": "Bulldoze"
        }
      ],
      "anomaly": {
        "discoverer": "Cryodor"
      },
      "evYield": {
        "DEF": 2
      },
      "baseFriendship": 50,
      "baseExp": 170,
      "growthRate": "Fluctuating",
      "eggGroups": [
        "Water 3",
        "Mineral"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "095",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "evo": {
        "to": "096"
      },
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "096",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "evo": {
        "from": "095",
        "method": "Lv 48"
      },
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "097",
      "name": "Broocling",
      "category": "Windswept",
      "types": [
        "WATER"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 245,
      "found": [
        "Route 2",
        "Route 3"
      ],
      "abilities": [
        "Wind Rider",
        "Own Tempo"
      ],
      "hidden": "Cloud Nine",
      "stats": {
        "HP": 40,
        "ATK": 48,
        "DEF": 39,
        "SPE": 55,
        "SPA": 61,
        "SPD": 39
      },
      "flavor": "After big storms some people might find Broocling in their home ponds. Their light bodies and wing shaped fins allow them to glide up to 100km.",
      "evo": {
        "to": "098"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "3",
          "name": "Pursuit"
        },
        {
          "lv": "6",
          "name": "Water Gun"
        },
        {
          "lv": "10",
          "name": "Mist"
        },
        {
          "lv": "13",
          "name": "Rain Dance"
        },
        {
          "lv": "16",
          "name": "Water Pulse"
        },
        {
          "lv": "20",
          "name": "Whirlwind"
        },
        {
          "lv": "23",
          "name": "Dive"
        },
        {
          "lv": "26",
          "name": "Defog"
        },
        {
          "lv": "30",
          "name": "Fly"
        },
        {
          "lv": "33",
          "name": "Air Slash"
        },
        {
          "lv": "36",
          "name": "Steel Wing"
        },
        {
          "lv": "40",
          "name": "Tailwind"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Whirlwind"
        },
        {
          "lv": "EGG",
          "name": "Acrobatics"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Burritoo"
      },
      "evYield": {
        "SPA": 1
      },
      "baseFriendship": 50,
      "baseExp": 60,
      "growthRate": "Medium",
      "eggGroups": [
        "Water 2",
        "Flying"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "098",
      "name": "Brooskip",
      "category": "Fish Skipper",
      "types": [
        "WATER",
        "FLYING"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 120,
      "found": [],
      "abilities": [
        "Wind Rider",
        "Aerobatics"
      ],
      "hidden": "Cloud Nine",
      "stats": {
        "HP": 55,
        "ATK": 63,
        "DEF": 57,
        "SPE": 77,
        "SPA": 77,
        "SPD": 57
      },
      "flavor": "Is it a Sicklet? Is it a plane? No, it's Brooskip! Ecstatic about their newfound ability to fly, they spend more time in the sky than in the water.",
      "evo": {
        "from": "097",
        "to": "099",
        "method": "Lv 17"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Sky Drop"
        },
        {
          "lv": "1",
          "name": "Aerial Ace"
        },
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "3",
          "name": "Pursuit"
        },
        {
          "lv": "6",
          "name": "Water Gun"
        },
        {
          "lv": "10",
          "name": "Mist"
        },
        {
          "lv": "13",
          "name": "Rain Dance"
        },
        {
          "lv": "16",
          "name": "Water Pulse"
        },
        {
          "lv": "21",
          "name": "Whirlwind"
        },
        {
          "lv": "25",
          "name": "Dive"
        },
        {
          "lv": "29",
          "name": "Defog"
        },
        {
          "lv": "34",
          "name": "Fly"
        },
        {
          "lv": "38",
          "name": "Air Slash"
        },
        {
          "lv": "42",
          "name": "Steel Wing"
        },
        {
          "lv": "47",
          "name": "Tailwind"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Burritoo"
      },
      "evYield": {
        "SPA": 1,
        "SPE": 1
      },
      "baseFriendship": 50,
      "baseExp": 135,
      "growthRate": "Medium",
      "eggGroups": [
        "Water 2",
        "Flying"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "099",
      "name": "Writrout",
      "category": "Fly Fish",
      "types": [
        "WATER",
        "FLYING"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Wind Rider",
        "Aerobatics"
      ],
      "hidden": "Cloud Nine",
      "stats": {
        "HP": 65,
        "ATK": 83,
        "DEF": 75,
        "SPE": 112,
        "SPA": 112,
        "SPD": 75
      },
      "flavor": "During droughts, Writrout carries aquatic Pokémon to safer waters. Its age is measured by wingspan.",
      "evo": {
        "from": "098",
        "method": "Level up knowing Fly"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Sky Drop"
        },
        {
          "lv": "1",
          "name": "Aerial Ace"
        },
        {
          "lv": "1",
          "name": "Tackle"
        },
        {
          "lv": "1",
          "name": "Tail Whip"
        },
        {
          "lv": "3",
          "name": "Pursuit"
        },
        {
          "lv": "6",
          "name": "Water Gun"
        },
        {
          "lv": "10",
          "name": "Mist"
        },
        {
          "lv": "13",
          "name": "Rain Dance"
        },
        {
          "lv": "16",
          "name": "Water Pulse"
        },
        {
          "lv": "21",
          "name": "Whirlwind"
        },
        {
          "lv": "25",
          "name": "Dive"
        },
        {
          "lv": "29",
          "name": "Defog"
        },
        {
          "lv": "34",
          "name": "Fly"
        },
        {
          "lv": "39",
          "name": "Air Slash"
        },
        {
          "lv": "44",
          "name": "Steel Wing"
        },
        {
          "lv": "50",
          "name": "Tailwind"
        },
        {
          "lv": "58",
          "name": "Water Spout"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        }
      ],
      "anomaly": {
        "discoverer": "Burritoo"
      },
      "evYield": {
        "SPA": 2,
        "SPE": 1
      },
      "baseFriendship": 50,
      "baseExp": 255,
      "growthRate": "Medium",
      "eggGroups": [
        "Water 2",
        "Flying"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "100",
      "name": "Armadisco",
      "category": "Disco Ball",
      "types": [
        "LIGHT",
        "STEEL"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 90,
      "found": [
        "Route 4"
      ],
      "abilities": [
        "Dancer"
      ],
      "hidden": "Dazzling",
      "stats": {
        "HP": 60,
        "ATK": 88,
        "DEF": 102,
        "SPE": 88,
        "SPA": 48,
        "SPD": 69
      },
      "flavor": "Its shell is formed of a thin prism layer over a carbon mirror undercoat. Light striking it reflects in shifting colors, depending on the angle.",
      "evo": null,
      "levelMoves": [
        {
          "lv": "1",
          "name": "Prism Punch"
        },
        {
          "lv": "3",
          "name": "Defense Curl"
        },
        {
          "lv": "6",
          "name": "Rapid Spin"
        },
        {
          "lv": "10",
          "name": "Spotlight"
        },
        {
          "lv": "12",
          "name": "Metal Claw"
        },
        {
          "lv": "15",
          "name": "Metronome"
        },
        {
          "lv": "19",
          "name": "R.G.Beam"
        },
        {
          "lv": "21",
          "name": "Teeter Dance"
        },
        {
          "lv": "24",
          "name": "Entrainment"
        },
        {
          "lv": "28",
          "name": "Gyro Ball"
        },
        {
          "lv": "30",
          "name": "Encore"
        },
        {
          "lv": "33",
          "name": "Flash Step"
        },
        {
          "lv": "37",
          "name": "Captivate"
        },
        {
          "lv": "39",
          "name": "Triple Axel"
        },
        {
          "lv": "42",
          "name": "Moonlight"
        },
        {
          "lv": "46",
          "name": "Victory Dance"
        },
        {
          "lv": "51",
          "name": "Steel Roller"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Sing"
        },
        {
          "lv": "EGG",
          "name": "Rollout"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM06",
          "name": "Disarming Voice"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        },
        {
          "lv": "TM16",
          "name": "Low Sweep"
        }
      ],
      "anomaly": null,
      "evYield": {
        "DEF": 1
      },
      "baseFriendship": 70,
      "baseExp": 152,
      "growthRate": "Erratic",
      "eggGroups": [
        "Field",
        "Human-Like"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 5120,
      "tutorMoves": [],
      "forms": [
        {
          "name": "Mega Armadisco",
          "category": "Disco Embodiment",
          "types": [
            "LIGHT",
            "STEEL"
          ],
          "stats": {
            "HP": 60,
            "ATK": 128,
            "DEF": 102,
            "SPE": 128,
            "SPA": 58,
            "SPD": 79
          },
          "height": "Unknown",
          "weight": "Unknown",
          "abilities": [
            "Dancer"
          ],
          "hidden": "Dancer",
          "catchRate": 90,
          "baseFriendship": 70,
          "baseExp": 152,
          "growthRate": "Erratic",
          "eggGroups": [
            "Field",
            "Human-Like"
          ],
          "eggCycles": 5120,
          "gender": {
            "m": 50,
            "f": 50
          },
          "evYield": {
            "DEF": 1
          },
          "levelMoves": [
            {
              "lv": "1",
              "name": "Prism Punch"
            },
            {
              "lv": "3",
              "name": "Defense Curl"
            },
            {
              "lv": "6",
              "name": "Rapid Spin"
            },
            {
              "lv": "10",
              "name": "Spotlight"
            },
            {
              "lv": "12",
              "name": "Metal Claw"
            },
            {
              "lv": "15",
              "name": "Metronome"
            },
            {
              "lv": "19",
              "name": "R.G.Beam"
            },
            {
              "lv": "21",
              "name": "Teeter Dance"
            },
            {
              "lv": "24",
              "name": "Entrainment"
            },
            {
              "lv": "28",
              "name": "Gyro Ball"
            },
            {
              "lv": "30",
              "name": "Encore"
            },
            {
              "lv": "33",
              "name": "Flash Step"
            },
            {
              "lv": "37",
              "name": "Captivate"
            },
            {
              "lv": "39",
              "name": "Triple Axel"
            },
            {
              "lv": "42",
              "name": "Moonlight"
            },
            {
              "lv": "46",
              "name": "Victory Dance"
            },
            {
              "lv": "51",
              "name": "Steel Roller"
            }
          ],
          "eggMoves": [
            {
              "lv": "EGG",
              "name": "Sing"
            },
            {
              "lv": "EGG",
              "name": "Rollout"
            }
          ],
          "tmMoves": [
            {
              "lv": "TM04",
              "name": "Work Up"
            },
            {
              "lv": "TM02",
              "name": "Double Team"
            },
            {
              "lv": "TM03",
              "name": "Revealing Light"
            },
            {
              "lv": "TM05",
              "name": "Protect"
            },
            {
              "lv": "TM06",
              "name": "Disarming Voice"
            },
            {
              "lv": "TM09",
              "name": "Thief"
            },
            {
              "lv": "TM14",
              "name": "Rest"
            },
            {
              "lv": "TM15",
              "name": "Thunder Wave"
            },
            {
              "lv": "TM16",
              "name": "Low Sweep"
            }
          ],
          "tutorMoves": [],
          "flavor": "After Mega Evolving, spikes of pure Mega Energy appear on Armadisco’s Body. These spikes are able to vibrate air on a molecular to create music.",
          "spriteSuffix": "form-1",
          "spriteVariants": [
            {
              "label": "F1",
              "suffix": "form-1"
            },
            {
              "label": "F2",
              "suffix": "form-1-f2"
            },
            {
              "label": "Back",
              "suffix": "form-1-back"
            },
            {
              "label": "Shiny F1",
              "suffix": "form-1-shiny"
            },
            {
              "label": "Shiny F2",
              "suffix": "form-1-shiny-f2"
            },
            {
              "label": "Shiny Back",
              "suffix": "form-1-shiny-back"
            }
          ]
        }
      ]
    },
    {
      "dex": "101",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "evo": {
        "to": "102"
      },
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "102",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "evo": {
        "to": "103"
      },
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "103",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "104",
      "name": "Pymood",
      "category": "Dewy-eyed cub",
      "types": [
        "FIRE"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 190,
      "found": [
        "Route 4"
      ],
      "abilities": [
        "Flash Fire",
        "Oblivious"
      ],
      "hidden": "Moody",
      "stats": {
        "HP": 45,
        "ATK": 30,
        "DEF": 30,
        "SPE": 55,
        "SPA": 55,
        "SPD": 45
      },
      "flavor": "Sensitive Pymood are often abandoned, but those raised with care form unwavering loyalty.",
      "evo": {
        "to": [
          "105",
          "106"
        ]
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Howl"
        },
        {
          "lv": "1",
          "name": "Ember"
        },
        {
          "lv": "4",
          "name": "Smog"
        },
        {
          "lv": "8",
          "name": "Quash"
        },
        {
          "lv": "13",
          "name": "Feint Attack"
        },
        {
          "lv": "17",
          "name": "Fire Spin"
        },
        {
          "lv": "21",
          "name": "Roar"
        },
        {
          "lv": "26",
          "name": "Snarl"
        },
        {
          "lv": "30",
          "name": "Burning Jealousy"
        },
        {
          "lv": "34",
          "name": "Acupressure"
        },
        {
          "lv": "39",
          "name": "Mean Look"
        },
        {
          "lv": "43",
          "name": "Punishment"
        },
        {
          "lv": "47",
          "name": "Noble Roar"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Incinerate"
        },
        {
          "lv": "EGG",
          "name": "Crunch"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPA": 1
      },
      "baseFriendship": 50,
      "baseExp": 52,
      "growthRate": "Medium",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "105",
      "name": "Gleeruption",
      "category": "Jovial Disorder",
      "types": [
        "FIRE",
        "DARK"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 90,
      "found": [],
      "abilities": [
        "Flash Fire",
        "Oblivious"
      ],
      "hidden": "Moody",
      "stats": {
        "HP": 60,
        "ATK": 50,
        "DEF": 45,
        "SPE": 75,
        "SPA": 80,
        "SPD": 60
      },
      "flavor": "Gleeruption are very prideful creatures, usually getting into fights recklessly due to this; they're very prone to injuries.",
      "evo": {
        "from": "104",
        "method": "Lv 25 (high friendship)"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Heal Block"
        },
        {
          "lv": "1",
          "name": "Heal Block"
        },
        {
          "lv": "1",
          "name": "Return"
        },
        {
          "lv": "1",
          "name": "Charm"
        },
        {
          "lv": "1",
          "name": "Howl"
        },
        {
          "lv": "1",
          "name": "Ember"
        },
        {
          "lv": "1",
          "name": "Smog"
        },
        {
          "lv": "1",
          "name": "Quash"
        },
        {
          "lv": "13",
          "name": "Feint Attack"
        },
        {
          "lv": "17",
          "name": "Fire Spin"
        },
        {
          "lv": "21",
          "name": "Roar"
        },
        {
          "lv": "27",
          "name": "Snarl"
        },
        {
          "lv": "32",
          "name": "Burning Jealousy"
        },
        {
          "lv": "37",
          "name": "Acupressure"
        },
        {
          "lv": "43",
          "name": "Mean Look"
        },
        {
          "lv": "48",
          "name": "Overheat"
        },
        {
          "lv": "53",
          "name": "Noble Roar"
        },
        {
          "lv": "58",
          "name": "Punishment"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPA": 1,
        "SPE": 1
      },
      "baseFriendship": 70,
      "baseExp": 131,
      "growthRate": "Medium",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "106",
      "name": "Scorow",
      "category": "Somber Sepulture",
      "types": [
        "FIRE",
        "DARK"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 90,
      "found": [],
      "abilities": [
        "Flash Fire",
        "Oblivious"
      ],
      "hidden": "Moody",
      "stats": {
        "HP": 60,
        "ATK": 50,
        "DEF": 45,
        "SPE": 75,
        "SPA": 70,
        "SPD": 70
      },
      "flavor": "Shaped by a somber past, Scorow distrust humans and often attack when confronted. Yet recent domestication efforts have begun to succeed.",
      "evo": {
        "from": "104",
        "method": "Lv 25 (low friendship)"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Embargo"
        },
        {
          "lv": "1",
          "name": "Embargo"
        },
        {
          "lv": "1",
          "name": "Frustration"
        },
        {
          "lv": "1",
          "name": "Tearful Look"
        },
        {
          "lv": "1",
          "name": "Howl"
        },
        {
          "lv": "1",
          "name": "Ember"
        },
        {
          "lv": "1",
          "name": "Smog"
        },
        {
          "lv": "1",
          "name": "Quash"
        },
        {
          "lv": "13",
          "name": "Feint Attack"
        },
        {
          "lv": "17",
          "name": "Fire Spin"
        },
        {
          "lv": "21",
          "name": "Roar"
        },
        {
          "lv": "27",
          "name": "Snarl"
        },
        {
          "lv": "32",
          "name": "Burning Jealousy"
        },
        {
          "lv": "37",
          "name": "Acupressure"
        },
        {
          "lv": "43",
          "name": "Mean Look"
        },
        {
          "lv": "48",
          "name": "Inferno"
        },
        {
          "lv": "53",
          "name": "Noble Roar"
        },
        {
          "lv": "58",
          "name": "Punishment"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPE": 1,
        "SPD": 1
      },
      "baseFriendship": 30,
      "baseExp": 131,
      "growthRate": "Medium",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "107",
      "name": "Cerbament",
      "category": "Mercurial Chimera",
      "types": [
        "FIRE",
        "DARK"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 10,
      "found": [],
      "abilities": [
        "Flash Fire",
        "Guard Dog"
      ],
      "hidden": "Moody",
      "stats": {
        "HP": 90,
        "ATK": 75,
        "DEF": 60,
        "SPE": 85,
        "SPA": 125,
        "SPD": 105
      },
      "flavor": "Legend says only the pure-hearted witness Cerbament, with tales of their Herculean trials echoing through the ages.",
      "evo": {
        "from": [
          "105",
          "106"
        ],
        "method": "Use Cerbament item",
        "details": "Have Gleeruption and Scorow in your party, then use the Cerbament item on either. Both combine into one Cerbament."
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Infernal Parade"
        },
        {
          "lv": "1",
          "name": "Infernal Parade"
        },
        {
          "lv": "1",
          "name": "Double Hit"
        },
        {
          "lv": "1",
          "name": "Howl"
        },
        {
          "lv": "1",
          "name": "Ember"
        },
        {
          "lv": "1",
          "name": "Smog"
        },
        {
          "lv": "1",
          "name": "Quash"
        },
        {
          "lv": "13",
          "name": "Feint Attack"
        },
        {
          "lv": "17",
          "name": "Fire Spin"
        },
        {
          "lv": "21",
          "name": "Roar"
        },
        {
          "lv": "27",
          "name": "Snarl"
        },
        {
          "lv": "32",
          "name": "Burning Jealousy"
        },
        {
          "lv": "37",
          "name": "Acupressure"
        },
        {
          "lv": "44",
          "name": "Mean Look"
        },
        {
          "lv": "50",
          "name": "Punishment"
        },
        {
          "lv": "56",
          "name": "Noble Roar"
        },
        {
          "lv": "63",
          "name": "Fiery Wrath"
        },
        {
          "lv": "71",
          "name": "Eruption"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPA": 2,
        "SPD": 1
      },
      "baseFriendship": 50,
      "baseExp": 245,
      "growthRate": "Medium",
      "eggGroups": [
        "Field"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "108",
      "name": "Ocubitten",
      "category": "Sneaky",
      "types": [
        "DARK",
        "FLYING"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 245,
      "found": [
        "Route 4"
      ],
      "abilities": [
        "Stakeout",
        "Unnerve"
      ],
      "hidden": "Triage",
      "stats": {
        "HP": 34,
        "ATK": 50,
        "DEF": 34,
        "SPE": 74,
        "SPA": 60,
        "SPD": 42
      },
      "flavor": "It maybe small but Ocubitten watches in the shadows with its red glowing eyes and it likes to play tricks on passersby that come too close.",
      "evo": {
        "to": "109"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Leer"
        },
        {
          "lv": "1",
          "name": "Absorb"
        },
        {
          "lv": "5",
          "name": "Supersonic"
        },
        {
          "lv": "8",
          "name": "Pursuit"
        },
        {
          "lv": "12",
          "name": "Disable"
        },
        {
          "lv": "15",
          "name": "Air Cutter"
        },
        {
          "lv": "19",
          "name": "Ominous Wind"
        },
        {
          "lv": "22",
          "name": "Torment"
        },
        {
          "lv": "26",
          "name": "Full Moon Bind"
        },
        {
          "lv": "29",
          "name": "Night Slash"
        },
        {
          "lv": "33",
          "name": "Mind Reader"
        },
        {
          "lv": "37",
          "name": "Leech Life"
        },
        {
          "lv": "40",
          "name": "Parting Shot"
        },
        {
          "lv": "44",
          "name": "Nasty Plot"
        },
        {
          "lv": "47",
          "name": "Razor Wind"
        }
      ],
      "eggMoves": [
        {
          "lv": "EGG",
          "name": "Air Slash"
        },
        {
          "lv": "EGG",
          "name": "Twister"
        }
      ],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPE": 1
      },
      "baseFriendship": 50,
      "baseExp": 49,
      "growthRate": "Medium",
      "eggGroups": [
        "Flying"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "109",
      "name": "Ocuclaw",
      "category": "Surprise Ambush",
      "types": [
        "DARK",
        "FLYING"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 95,
      "found": [],
      "abilities": [
        "Stakeout",
        "Unnerve"
      ],
      "hidden": "Triage",
      "stats": {
        "HP": 54,
        "ATK": 70,
        "DEF": 44,
        "SPE": 94,
        "SPA": 80,
        "SPD": 52
      },
      "flavor": "Ocuclaw cloaks itself like a shadow, often resting but sometimes swooping to startle smaller Pokémon before they can react.",
      "evo": {
        "from": "108",
        "to": "110",
        "method": "Lv 18"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Feint Attack"
        },
        {
          "lv": "1",
          "name": "Feint Attack"
        },
        {
          "lv": "1",
          "name": "Razor Wind"
        },
        {
          "lv": "1",
          "name": "Leer"
        },
        {
          "lv": "1",
          "name": "Absorb"
        },
        {
          "lv": "1",
          "name": "Supersonic"
        },
        {
          "lv": "1",
          "name": "Pursuit"
        },
        {
          "lv": "12",
          "name": "Disable"
        },
        {
          "lv": "15",
          "name": "Air Cutter"
        },
        {
          "lv": "20",
          "name": "Ominous Wind"
        },
        {
          "lv": "24",
          "name": "Torment"
        },
        {
          "lv": "29",
          "name": "Full Moon Bind"
        },
        {
          "lv": "33",
          "name": "Night Slash"
        },
        {
          "lv": "38",
          "name": "Mind Reader"
        },
        {
          "lv": "42",
          "name": "Leech Life"
        },
        {
          "lv": "47",
          "name": "Parting Shot"
        },
        {
          "lv": "51",
          "name": "Nasty Plot"
        },
        {
          "lv": "55",
          "name": "Razor Wind"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPE": 1,
        "SPA": 1
      },
      "baseFriendship": 50,
      "baseExp": 134,
      "growthRate": "Medium",
      "eggGroups": [
        "Flying"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "110",
      "name": "Ocurage",
      "category": "Shadow Terror",
      "types": [
        "DARK",
        "FLYING"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 45,
      "found": [],
      "abilities": [
        "Stakeout",
        "Unnerve"
      ],
      "hidden": "Triage",
      "stats": {
        "HP": 74,
        "ATK": 92,
        "DEF": 64,
        "SPE": 99,
        "SPA": 103,
        "SPD": 72
      },
      "flavor": "Ocurage soars through the night, its vast wings casting shadows below. Spotting prey within, it dives at blinding speed to strike.",
      "evo": {
        "from": "109",
        "method": "Lv 37"
      },
      "levelMoves": [
        {
          "lv": "0",
          "name": "Oblivion Wing"
        },
        {
          "lv": "1",
          "name": "Oblivion Wing"
        },
        {
          "lv": "1",
          "name": "Razor Wind"
        },
        {
          "lv": "1",
          "name": "Feint Attack"
        },
        {
          "lv": "1",
          "name": "Leer"
        },
        {
          "lv": "1",
          "name": "Absorb"
        },
        {
          "lv": "1",
          "name": "Supersonic"
        },
        {
          "lv": "1",
          "name": "Pursuit"
        },
        {
          "lv": "12",
          "name": "Disable"
        },
        {
          "lv": "15",
          "name": "Air Cutter"
        },
        {
          "lv": "20",
          "name": "Ominous Wind"
        },
        {
          "lv": "24",
          "name": "Torment"
        },
        {
          "lv": "29",
          "name": "Full Moon Bind"
        },
        {
          "lv": "33",
          "name": "Night Slash"
        },
        {
          "lv": "39",
          "name": "Mind Reader"
        },
        {
          "lv": "44",
          "name": "Leech Life"
        },
        {
          "lv": "50",
          "name": "Parting Shot"
        },
        {
          "lv": "55",
          "name": "Nasty Plot"
        },
        {
          "lv": "61",
          "name": "Hurricane"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM02",
          "name": "Double Team"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM07",
          "name": "Confuse Ray"
        },
        {
          "lv": "TM09",
          "name": "Thief"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "anomaly": null,
      "evYield": {
        "SPA": 2,
        "SPE": 1
      },
      "baseFriendship": 50,
      "baseExp": 238,
      "growthRate": "Medium",
      "eggGroups": [
        "Flying"
      ],
      "gender": {
        "m": 50,
        "f": 50
      },
      "eggCycles": 3840,
      "tutorMoves": []
    },
    {
      "dex": "111",
      "name": "SC0R-910",
      "category": "Luminary",
      "types": [
        "ROCK",
        "LIGHT"
      ],
      "height": "Unknown",
      "weight": "Unknown",
      "catchRate": 150,
      "found": [
        "Namano Cave"
      ],
      "abilities": [
        "Clear Body",
        "Analytic"
      ],
      "hidden": "Download",
      "stats": {
        "HP": 50,
        "ATK": 59,
        "DEF": 81,
        "SPE": 20,
        "SPA": 59,
        "SPD": 81
      },
      "flavor": "This ancient Pokémon has existed since dawn. Scientists failed to alter it, yet many believe it inspired human invention.",
      "evo": {
        "to": "112"
      },
      "levelMoves": [
        {
          "lv": "1",
          "name": "Hidden Power"
        },
        {
          "lv": "1",
          "name": "Harden"
        },
        {
          "lv": "5",
          "name": "Vise Grip"
        },
        {
          "lv": "8",
          "name": "Revealing Light"
        },
        {
          "lv": "13",
          "name": "Disable"
        },
        {
          "lv": "16",
          "name": "Wonder Room"
        },
        {
          "lv": "21",
          "name": "Ancient Power"
        },
        {
          "lv": "24",
          "name": "Light Sphere"
        },
        {
          "lv": "29",
          "name": "Imprison"
        },
        {
          "lv": "32",
          "name": "Rock Blast"
        },
        {
          "lv": "37",
          "name": "Recover"
        },
        {
          "lv": "40",
          "name": "Smite"
        },
        {
          "lv": "45",
          "name": "Sparkling Aegis"
        },
        {
          "lv": "48",
          "name": "Bright Blade"
        },
        {
          "lv": "54",
          "name": "Guillotine"
        }
      ],
      "eggMoves": [],
      "tmMoves": [
        {
          "lv": "TM04",
          "name": "Work Up"
        },
        {
          "lv": "TM01",
          "name": "Aerial Ace"
        },
        {
          "lv": "TM03",
          "name": "Revealing Light"
        },
        {
          "lv": "TM05",
          "name": "Protect"
        },
        {
          "lv": "TM14",
          "name": "Rest"
        },
        {
          "lv": "TM15",
          "name": "Thunder Wave"
        }
      ],
      "evYield": {
        "DEF": 1
      },
      "baseFriendship": 30,
      "baseExp": 66,
      "growthRate": "Slow",
      "eggGroups": [
        "Undiscovered"
      ],
      "gender": null,
      "eggCycles": 5120,
      "tutorMoves": []
    },
    {
      "dex": "113",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "evo": {
        "to": "114"
      },
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "114",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    },
    {
      "dex": "115",
      "name": "???",
      "category": "Undiscovered",
      "types": [
        "NORMAL"
      ],
      "height": "???",
      "weight": "???",
      "catchRate": "???",
      "found": [],
      "abilities": [],
      "hidden": null,
      "stats": {
        "HP": 0,
        "ATK": 0,
        "DEF": 0,
        "SPA": 0,
        "SPD": 0,
        "SPE": 0
      },
      "flavor": "This Pokémon has not yet been catalogued in the VOIDDEX.",
      "levelMoves": [],
      "eggMoves": [],
      "tmMoves": [],
      "anomaly": null,
      "undiscovered": true,
      "evYield": {},
      "baseFriendship": 0,
      "baseExp": 0,
      "growthRate": "???",
      "eggGroups": [],
      "gender": null,
      "eggCycles": 0
    }
  ];

  const canonicalDex = n => String(n).toUpperCase() === '053' ? '053B' : String(n).toUpperCase();
  const byDex = n => DEX.find(d => d.dex === canonicalDex(n));
  const FORM_SHARE_IDS = { '053A': 1053, '053B': 1054, '053C': 1055 };
  const dexToNumber = n => FORM_SHARE_IDS[canonicalDex(n)] || Number(n);
  const numberToDex = n => Object.keys(FORM_SHARE_IDS).find(k => FORM_SHARE_IDS[k] === n) || canonicalDex(String(n).padStart(3, '0'));

  return { TYPES, DEX, STAT_LABELS, STAT_MAX, byDex, canonicalDex, dexToNumber, numberToDex };
})();
