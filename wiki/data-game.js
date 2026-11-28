/* Pokémon Void — game data: moves, abilities, items, locations, trainers, type chart.
   window.VGAME = { MOVES, ABILITIES, ITEMS, ROUTES, TRAINERS, CHART, eff, TYPE_ORDER } */
window.VGAME = (function () {
  // ---- Moves -------------------------------------------------------------
  const MOVES = [
  {
    "name": "Megahorn",
    "type": "BUG",
    "cls": "Physical",
    "pow": 120,
    "acc": 85,
    "pp": 10,
    "desc": "Using its tough and impressive horn, the user rams into the target with no letup."
  },
  {
    "name": "Attack Order",
    "type": "BUG",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 15,
    "desc": "The user calls out its underlings to pummel the target. Critical hits land more easily."
  },
  {
    "name": "Bug Buzz",
    "type": "BUG",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user vibrates its wings to generate a damaging sound wave. It may also lower the target's Sp. Def stat."
  },
  {
    "name": "First Impression",
    "type": "BUG",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "Although this move has great power, it only works the first turn the user is in battle."
  },
  {
    "name": "Pollen Puff",
    "type": "BUG",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 15,
    "desc": "Fires an exploding pollen puff at enemies, or a HP-restoring one at allies."
  },
  {
    "name": "Leech Life",
    "type": "BUG",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user drains the target's blood. The user's HP is restored by half the damage taken by the target."
  },
  {
    "name": "Lunge",
    "type": "BUG",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user makes a lunge at the target, attacking with full force. This lowers the target's Attack stat."
  },
  {
    "name": "X-Scissor",
    "type": "BUG",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user slashes at the foe by crossing its scythes or claws as if they were a pair of scissors."
  },
  {
    "name": "Signal Beam",
    "type": "BUG",
    "cls": "Special",
    "pow": 75,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks with a sinister beam of light. It may also confuse the target."
  },
  {
    "name": "Skitter Smack",
    "type": "BUG",
    "cls": "Physical",
    "pow": 70,
    "acc": 90,
    "pp": 10,
    "desc": "The user skitters behind the target to attack. This also lowers the target's Sp. Atk stat."
  },
  {
    "name": "U-turn",
    "type": "BUG",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "After making its attack, the user rushes back to switch places with a party Pokémon in waiting."
  },
  {
    "name": "Steamroller",
    "type": "BUG",
    "cls": "Physical",
    "pow": 65,
    "acc": 100,
    "pp": 20,
    "desc": "The user crushes its foes by rolling over them. This attack may make the target flinch."
  },
  {
    "name": "Bug Bite",
    "type": "BUG",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 20,
    "desc": "The user bites the target. If the target is holding a Berry, the user eats it and gains its effect."
  },
  {
    "name": "Silver Wind",
    "type": "BUG",
    "cls": "Special",
    "pow": 60,
    "acc": 100,
    "pp": 5,
    "desc": "The foe is attacked with powdery scales blown by wind. It may also raise all the user's stats."
  },
  {
    "name": "Fell Stinger",
    "type": "BUG",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 25,
    "desc": "When the user knocks out a target with this move, the user's Attack stat rises drastically."
  },
  {
    "name": "Struggle Bug",
    "type": "BUG",
    "cls": "Special",
    "pow": 50,
    "acc": 100,
    "pp": 20,
    "desc": "While resisting, the user attacks the opposing Pokémon. The targets' Sp. Atk stat is reduced."
  },
  {
    "name": "Fury Cutter",
    "type": "BUG",
    "cls": "Physical",
    "pow": 40,
    "acc": 95,
    "pp": 20,
    "desc": "The target is slashed with scythes or claws. Its power increases if it hits in succession."
  },
  {
    "name": "Pin Missile",
    "type": "BUG",
    "cls": "Physical",
    "pow": 25,
    "acc": 95,
    "pp": 20,
    "desc": "Sharp spikes are shot at the target in rapid succession. They hit two to five times in a row."
  },
  {
    "name": "Twineedle",
    "type": "BUG",
    "cls": "Physical",
    "pow": 25,
    "acc": 100,
    "pp": 20,
    "desc": "The foe is stabbed twice by a pair of stingers. It may also poison the target."
  },
  {
    "name": "Infestation",
    "type": "BUG",
    "cls": "Special",
    "pow": 20,
    "acc": 100,
    "pp": 20,
    "desc": "The target is infested and unable to flee for four to five turns."
  },
  {
    "name": "Defend Order",
    "type": "BUG",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user calls out its underlings to shield its body, raising its Defense and Sp. Def stats."
  },
  {
    "name": "Heal Order",
    "type": "BUG",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user calls out its underlings to heal it. The user regains up to half of its max HP."
  },
  {
    "name": "Powder",
    "type": "BUG",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 20,
    "desc": "The target is covered in a powder that explodes and damages it if it uses a Fire-type move."
  },
  {
    "name": "Quiver Dance",
    "type": "BUG",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user performs a beautiful dance. It boosts the user's Sp. Atk, Sp. Def, and Speed stats."
  },
  {
    "name": "Rage Powder",
    "type": "BUG",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user scatters irritating powder to draw attention to itself. Opponents aim only at the user."
  },
  {
    "name": "Spider Web",
    "type": "BUG",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user ensnares the target with thin, gooey silk so it can't flee from battle."
  },
  {
    "name": "Sticky Web",
    "type": "BUG",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "Weaves a sticky net around the opposing team, which lowers their Speed stats upon switching in."
  },
  {
    "name": "String Shot",
    "type": "BUG",
    "cls": "Status",
    "pow": 0,
    "acc": 95,
    "pp": 40,
    "desc": "The foe is bound with silk blown from the user's mouth. This silk reduces the target's Speed."
  },
  {
    "name": "Tail Glow",
    "type": "LIGHT",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user stares at flashing lights to focus its mind, drastically raising its Sp. Atk stat."
  },
  {
    "name": "Hyperspace Fury",
    "type": "COSMIC",
    "cls": "Physical",
    "pow": 100,
    "acc": "—",
    "pp": 5,
    "desc": "Unleashes a barrage of multi-arm attacks, skipping protections. The user's Defense stat falls."
  },
  {
    "name": "Foul Play",
    "type": "DARK",
    "cls": "Physical",
    "pow": 95,
    "acc": 100,
    "pp": 15,
    "desc": "The user turns the foe's power against it. It does more damage the higher the target's Attack stat."
  },
  {
    "name": "Fiery Wrath",
    "type": "DARK",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user transforms its wrath into a fire-like aura to attack. This may also make foes flinch."
  },
  {
    "name": "Darkest Lariat",
    "type": "DARK",
    "cls": "Physical",
    "pow": 85,
    "acc": 100,
    "pp": 10,
    "desc": "The user swings both arms and hits the target. Ignores the target's stat changes."
  },
  {
    "name": "Night Daze",
    "type": "DARK",
    "cls": "Special",
    "pow": 85,
    "acc": 95,
    "pp": 10,
    "desc": "The user lets loose a pitch-black shock wave at its target. It may also lower the target's accuracy."
  },
  {
    "name": "Crunch",
    "type": "DARK",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user crunches up the target with sharp fangs. It may also lower the target's Defense stat."
  },
  {
    "name": "Dark Pulse",
    "type": "DARK",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user releases a horrible aura imbued with dark thoughts. It may also make the target flinch."
  },
  {
    "name": "False Surrender",
    "type": "DARK",
    "cls": "Physical",
    "pow": 80,
    "acc": "—",
    "pp": 10,
    "desc": "The user pretends to bow its head, but then it stabs the target with its disheveled hair. Never misses."
  },
  {
    "name": "Jaw Lock",
    "type": "DARK",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "This move prevents the user and the target from switching out until either of them faints."
  },
  {
    "name": "Throat Chop",
    "type": "DARK",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks the target's throat. The target cannot use sound-based moves for two turns."
  },
  {
    "name": "Wicked Blow",
    "type": "DARK",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 5,
    "desc": "Strikes with a fierce blow through mastery of the Dark style. Always results in a critical hit."
  },
  {
    "name": "Lash Out",
    "type": "DARK",
    "cls": "Physical",
    "pow": 75,
    "acc": 100,
    "pp": 5,
    "desc": "The user lashes out to vent its frustration. Power is doubled if its stats dropped this turn."
  },
  {
    "name": "Night Slash",
    "type": "DARK",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 15,
    "desc": "The user slashes the target the instant an opportunity arises. Critical hits land more easily."
  },
  {
    "name": "Sucker Punch",
    "type": "DARK",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 5,
    "desc": "This move enables the user to attack first. It fails if the target is not readying an attack, however."
  },
  {
    "name": "Knock Off",
    "type": "DARK",
    "cls": "Physical",
    "pow": 65,
    "acc": 100,
    "pp": 20,
    "desc": "The user slaps down the target's held item, preventing that item from being used in the battle."
  },
  {
    "name": "Assurance",
    "type": "DARK",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 10,
    "desc": "If the target has already taken some damage in the same turn, this attack's power is doubled."
  },
  {
    "name": "Bite",
    "type": "DARK",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 25,
    "desc": "The target is bitten with viciously sharp fangs. It may make the target flinch."
  },
  {
    "name": "Brutal Swing",
    "type": "DARK",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 20,
    "desc": "The user swings its body around violently to inflict damage on everything in its vicinity."
  },
  {
    "name": "Feint Attack",
    "type": "DARK",
    "cls": "Physical",
    "pow": 60,
    "acc": 0,
    "pp": 20,
    "desc": "The user draws up to the foe disarmingly, then throws a sucker punch. It hits without fail."
  },
  {
    "name": "Thief",
    "type": "DARK",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 25,
    "desc": "The user attacks and steals the foe's held item simultaneously. It can't steal if the user holds an item."
  },
  {
    "name": "Snarl",
    "type": "DARK",
    "cls": "Special",
    "pow": 55,
    "acc": 95,
    "pp": 15,
    "desc": "The user yells as if it is ranting about something, making the target's Sp. Atk stat decrease."
  },
  {
    "name": "Payback",
    "type": "DARK",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 10,
    "desc": "If the user moves after the target, this attack's power will be doubled."
  },
  {
    "name": "Pursuit",
    "type": "DARK",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 20,
    "desc": "An attack move that inflicts double damage if used on a target that is switching out of battle."
  },
  {
    "name": "Beat Up",
    "type": "DARK",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 10,
    "desc": "The user gets all the party Pokémon to attack the foe. The more party Pokémon, the more damage."
  },
  {
    "name": "Fling",
    "type": "DARK",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 10,
    "desc": "The user flings its held item at the target to attack. Its power and effects depend on the item."
  },
  {
    "name": "Power Trip",
    "type": "DARK",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 10,
    "desc": "The user boasts of its strength. Power increases the more the user's stats are raised."
  },
  {
    "name": "Punishment",
    "type": "DARK",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 5,
    "desc": "This attack's power increases the more the target has powered up with stat changes."
  },
  {
    "name": "Dark Void",
    "type": "DARK",
    "cls": "Status",
    "pow": "—",
    "acc": 50,
    "pp": 10,
    "desc": "Opposing Pokémon are dragged into a world of total darkness that makes them sleep."
  },
  {
    "name": "Embargo",
    "type": "DARK",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 15,
    "desc": "It prevents the target from using its held item. Its Trainer is also prevented from using items on it."
  },
  {
    "name": "Fake Tears",
    "type": "DARK",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 20,
    "desc": "The user feigns crying to fluster the target, harshly lowering its Sp. Def stat."
  },
  {
    "name": "Flatter",
    "type": "DARK",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 15,
    "desc": "Flattery is used to confuse the target. However, it also raises the target's Sp. Atk stat."
  },
  {
    "name": "Hone Claws",
    "type": "DARK",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 15,
    "desc": "The user sharpens its claws to boost its Attack stat and accuracy."
  },
  {
    "name": "Memento",
    "type": "DARK",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 10,
    "desc": "The user faints when using this move. In return, it harshly lowers the target's Attack and Sp. Atk."
  },
  {
    "name": "Nasty Plot",
    "type": "DARK",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user stimulates its brain by thinking bad thoughts. It sharply raises the user's Sp. Atk."
  },
  {
    "name": "Obstruct",
    "type": "DARK",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user protects itself from all attacks. Direct contact lowers the attacker's Defense."
  },
  {
    "name": "Parting Shot",
    "type": "DARK",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 20,
    "desc": "With a parting threat, the user lowers the target's Attack and Sp. Atk stats. Then it switches out."
  },
  {
    "name": "Quash",
    "type": "DARK",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 15,
    "desc": "The user suppresses the target and makes its move go last."
  },
  {
    "name": "Snatch",
    "type": "DARK",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user steals the effects of any healing or stat-changing move the foe attempts to use."
  },
  {
    "name": "Switcheroo",
    "type": "DARK",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 10,
    "desc": "The user trades held items with the target faster than the eye can follow."
  },
  {
    "name": "Taunt",
    "type": "DARK",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 20,
    "desc": "The target is taunted into a rage that allows it to use only attack moves for three turns."
  },
  {
    "name": "Topsy-Turvy",
    "type": "DARK",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "All stat changes affecting the target turn topsy-turvy and become the opposite of what they were."
  },
  {
    "name": "Torment",
    "type": "DARK",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 15,
    "desc": "The user torments and enrages the foe, making it incapable of using the same move twice in a row."
  },
  {
    "name": "Eternabeam",
    "type": "DRAGON",
    "cls": "Special",
    "pow": 160,
    "acc": 90,
    "pp": 5,
    "desc": "This is Eternatus's most powerful attack in its original form. The user can't move on the next turn."
  },
  {
    "name": "Dragon Energy",
    "type": "DRAGON",
    "cls": "Special",
    "pow": 150,
    "acc": 100,
    "pp": 5,
    "desc": "Converts life-force into power to attack. The lower the user's HP, the lower the move's power."
  },
  {
    "name": "Roar of Time",
    "type": "DRAGON",
    "cls": "Special",
    "pow": 150,
    "acc": 90,
    "pp": 5,
    "desc": "The user blasts the target with power that distorts even time. The user must rest on the next turn."
  },
  {
    "name": "Draco Meteor",
    "type": "DRAGON",
    "cls": "Special",
    "pow": 130,
    "acc": 90,
    "pp": 5,
    "desc": "Comets are summoned down from the sky. The attack's recoil harshly reduces the user's Sp. Atk stat."
  },
  {
    "name": "Outrage",
    "type": "DRAGON",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 10,
    "desc": "The user rampages and attacks for two to three turns. It then becomes confused, however."
  },
  {
    "name": "Clanging Scales",
    "type": "DRAGON",
    "cls": "Special",
    "pow": 110,
    "acc": 100,
    "pp": 5,
    "desc": "The user rubs its scales and makes a huge noise. Also lowers the user's Defense stat."
  },
  {
    "name": "Core Enforcer",
    "type": "DRAGON",
    "cls": "Special",
    "pow": 100,
    "acc": 100,
    "pp": 10,
    "desc": "If the target has already moved this turn, the effect of its Ability is negated."
  },
  {
    "name": "Dragon Rush",
    "type": "DRAGON",
    "cls": "Physical",
    "pow": 100,
    "acc": 75,
    "pp": 10,
    "desc": "The user tackles the foe while exhibiting overwhelming menace. It may also make the target flinch."
  },
  {
    "name": "Dynamax Cannon",
    "type": "DRAGON",
    "cls": "Special",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "The user unleashes a strong beam from its core."
  },
  {
    "name": "Spacial Rend",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 100,
    "acc": 95,
    "pp": 5,
    "desc": "The user tears the target along with the space around it. Critical hits land more easily."
  },
  {
    "name": "Dragon Hammer",
    "type": "DRAGON",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 15,
    "desc": "The user uses its body like a hammer to attack the target and inflict damage."
  },
  {
    "name": "Dragon Pulse",
    "type": "DRAGON",
    "cls": "Special",
    "pow": 85,
    "acc": 100,
    "pp": 10,
    "desc": "The target is attacked with a shock wave generated by the user's gaping mouth."
  },
  {
    "name": "Dragon Claw",
    "type": "DRAGON",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user slashes the target with huge, sharp claws."
  },
  {
    "name": "Breaking Swipe",
    "type": "DRAGON",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 15,
    "desc": "The user swings its tough tail wildly and attacks all foes. This also lowers their Attack stats."
  },
  {
    "name": "Dragon Breath",
    "type": "DRAGON",
    "cls": "Special",
    "pow": 60,
    "acc": 100,
    "pp": 20,
    "desc": "The user exhales a mighty gust that inflicts damage. It may also leave the target with paralysis."
  },
  {
    "name": "Dragon Tail",
    "type": "DRAGON",
    "cls": "Physical",
    "pow": 60,
    "acc": 90,
    "pp": 10,
    "desc": "The user knocks away the target and drags out another Pokémon in its party. In the wild, the battle ends."
  },
  {
    "name": "Dragon Darts",
    "type": "DRAGON",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks twice using Dreepy. If there are two targets, this move hits each one once."
  },
  {
    "name": "Dual Chop",
    "type": "DRAGON",
    "cls": "Physical",
    "pow": 40,
    "acc": 90,
    "pp": 15,
    "desc": "The user attacks its target by hitting it with brutal strikes. The target is hit twice in a row."
  },
  {
    "name": "Twister",
    "type": "DRAGON",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 20,
    "desc": "The user whips up a vicious tornado to tear at the opposing team. It may also make targets flinch."
  },
  {
    "name": "Scale Shot",
    "type": "DRAGON",
    "cls": "Physical",
    "pow": 25,
    "acc": 90,
    "pp": 20,
    "desc": "Attacks by shooting scales two to five times in a row. Boosts the user's Speed but lowers its Defense."
  },
  {
    "name": "Dragon Rage",
    "type": "DRAGON",
    "cls": "Special",
    "pow": 1,
    "acc": 100,
    "pp": 10,
    "desc": "This attack hits the target with a shock wave of pure rage. This attack always inflicts 40 HP damage."
  },
  {
    "name": "Clangorous Soul",
    "type": "DRAGON",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 5,
    "desc": "The user raises all its stats by using some of its HP."
  },
  {
    "name": "Dragon Dance",
    "type": "DRAGON",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user vigorously performs a mystic, powerful dance that boosts its Attack and Speed stats."
  },
  {
    "name": "Bolt Strike",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 130,
    "acc": 85,
    "pp": 5,
    "desc": "The user charges at its foe, surrounding itself with lightning. It may also leave the target paralyzed."
  },
  {
    "name": "Volt Tackle",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 15,
    "desc": "The user electrifies itself, then charges at the foe. It causes considerable damage to the user as well."
  },
  {
    "name": "Zap Cannon",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 120,
    "acc": 50,
    "pp": 5,
    "desc": "The user fires an electric blast like a cannon to inflict damage and cause paralysis."
  },
  {
    "name": "Aura Wheel",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 110,
    "acc": 100,
    "pp": 10,
    "desc": "Morpeko attacks and raises its Speed with energy stored in its cheeks. Type changes with the user's form."
  },
  {
    "name": "Thunder",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 110,
    "acc": 70,
    "pp": 10,
    "desc": "A wicked thunderbolt is dropped on the foe to inflict damage. It may also leave the target paralyzed."
  },
  {
    "name": "Fusion Bolt",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "The user throws down a giant thunderbolt. It does more damage if influenced by an enormous flame."
  },
  {
    "name": "Plasma Fists",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks with electrically charged fists. Normal-type moves become Electric-type."
  },
  {
    "name": "Thunderbolt",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 15,
    "desc": "A strong electric blast is loosed at the target. It may also leave the target with paralysis."
  },
  {
    "name": "Wild Charge",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 15,
    "desc": "The user shrouds itself in electricity and smashes into its foe. It also damages the user a little."
  },
  {
    "name": "Bolt Beak",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 85,
    "acc": 100,
    "pp": 10,
    "desc": "Stabs the target with an electrified beak. Power is doubled if the user attacks first."
  },
  {
    "name": "Discharge",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "A flare of electricity is loosed to strike the area around the user. It may also cause paralysis."
  },
  {
    "name": "Overdrive",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks all foes by twanging a guitar or bass guitar, causing a huge echo and strong vibration."
  },
  {
    "name": "Thunder Cage",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 80,
    "acc": 90,
    "pp": 15,
    "desc": "The user traps the target in a cage of sparking electricity for four to five turns."
  },
  {
    "name": "Zing Zap",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "A strong electric blast crashes down on the target. This may also make the target flinch."
  },
  {
    "name": "Thunder Punch",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 75,
    "acc": 100,
    "pp": 15,
    "desc": "The target is punched with an electrified fist. It may also leave the target with paralysis."
  },
  {
    "name": "Rising Voltage",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "The user attacks with electric voltage rising from the ground. Power is doubled on Electric Terrain."
  },
  {
    "name": "Volt Switch",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "After making its attack, the user rushes back to switch places with a party Pokémon in waiting."
  },
  {
    "name": "Parabolic Charge",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 65,
    "acc": 100,
    "pp": 20,
    "desc": "The user attacks everything around it. The user's HP is restored by half the damage dealt."
  },
  {
    "name": "Spark",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 65,
    "acc": 100,
    "pp": 20,
    "desc": "The user throws an electrically charged tackle at the target. It may also leave the target with paralysis."
  },
  {
    "name": "Thunder Fang",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 65,
    "acc": 95,
    "pp": 15,
    "desc": "The user bites with electrified fangs. It may also make the target flinch or leave it with paralysis."
  },
  {
    "name": "Shock Wave",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 60,
    "acc": 0,
    "pp": 20,
    "desc": "The user strikes the target with a quick jolt of electricity. This attack cannot be evaded."
  },
  {
    "name": "Electroweb",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 55,
    "acc": 95,
    "pp": 15,
    "desc": "The user captures and attacks foes by using an electric net, which lowers their Speed stat."
  },
  {
    "name": "Charge Beam",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 50,
    "acc": 90,
    "pp": 10,
    "desc": "The user fires a concentrated bundle of electricity. It may also raise the user's Sp. Atk stat."
  },
  {
    "name": "Thunder Shock",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "A jolt of electricity is hurled at the foe to inflict damage. It may also leave the target with paralysis."
  },
  {
    "name": "Nuzzle",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 20,
    "acc": 100,
    "pp": 20,
    "desc": "The user nuzzles its electrified cheeks against the target. This also leaves the target with paralysis."
  },
  {
    "name": "Electro Ball",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 1,
    "acc": 100,
    "pp": 10,
    "desc": "The user hurls an electric orb at the foe. It does more damage the faster the user is."
  },
  {
    "name": "Charge",
    "type": "ELECTRIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user boosts the power of the Electric move it uses next. It also raises the user's Sp. Def stat."
  },
  {
    "name": "Eerie Impulse",
    "type": "ELECTRIC",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 15,
    "desc": "The user's body generates an eerie impulse. Harshly lowers the target's Sp. Atk stat."
  },
  {
    "name": "Electric Terrain",
    "type": "ELECTRIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user electrifies the ground for five turns. Pokémon on the ground no longer fall asleep."
  },
  {
    "name": "Electrify",
    "type": "ELECTRIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "If the target uses a move after being electrified, that move becomes Electric-type."
  },
  {
    "name": "Ion Deluge",
    "type": "ELECTRIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 25,
    "desc": "The user disperses electrically charged particles. Normal-type moves become Electric-type."
  },
  {
    "name": "Magnet Rise",
    "type": "ELECTRIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user levitates using electrically generated magnetism for five turns."
  },
  {
    "name": "Magnetic Flux",
    "type": "ELECTRIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "Manipulates magnetic fields to raise the Defense and Sp. Def stats of allies with Plus or Minus Abilities."
  },
  {
    "name": "Thunder Wave",
    "type": "ELECTRIC",
    "cls": "Status",
    "pow": 0,
    "acc": 90,
    "pp": 20,
    "desc": "A weak electric charge is launched at the target. It causes paralysis if it hits."
  },
  {
    "name": "Light of Ruin",
    "type": "FAIRY",
    "cls": "Special",
    "pow": 140,
    "acc": 90,
    "pp": 5,
    "desc": "Fires a powerful beam of light drawn from the Eternal Flower. It also damages the user a lot."
  },
  {
    "name": "Fleur Cannon",
    "type": "FAIRY",
    "cls": "Special",
    "pow": 130,
    "acc": 90,
    "pp": 5,
    "desc": "The user unleashes a strong beam. The attack's recoil harshly lowers the user's Sp. Atk stat."
  },
  {
    "name": "Misty Explosion",
    "type": "FAIRY",
    "cls": "Special",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks everything around and faints upon using this move. Power increases on Misty Terrain."
  },
  {
    "name": "Moonblast",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 95,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks by borrowing the power of the moon. This may also lower the target's Sp. Atk stat."
  },
  {
    "name": "Play Rough",
    "type": "FAIRY",
    "cls": "Physical",
    "pow": 90,
    "acc": 90,
    "pp": 10,
    "desc": "The user plays rough with the target and attacks it. This may also lower the target's Attack stat."
  },
  {
    "name": "Strange Steam",
    "type": "FAIRY",
    "cls": "Special",
    "pow": 90,
    "acc": 95,
    "pp": 10,
    "desc": "The user attacks the target by emitting steam. This may also confuse the target."
  },
  {
    "name": "Dazzling Gleam",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user damages opposing Pokémon by emitting a powerful flash."
  },
  {
    "name": "Spirit Break",
    "type": "FAIRY",
    "cls": "Physical",
    "pow": 75,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks the target with immense force. This also lowers the target's Sp. Atk stat."
  },
  {
    "name": "Draining Kiss",
    "type": "FAIRY",
    "cls": "Special",
    "pow": 50,
    "acc": 100,
    "pp": 10,
    "desc": "The user steals the target's HP with a kiss. The user's HP is restored by over half of the damage dealt."
  },
  {
    "name": "Disarming Voice",
    "type": "FAIRY",
    "cls": "Special",
    "pow": 40,
    "acc": 0,
    "pp": 15,
    "desc": "Letting out a charming cry, the user does emotional damage to foes. This attack never misses."
  },
  {
    "name": "Fairy Wind",
    "type": "FAIRY",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "The user stirs up a fairy wind and strikes the target with it."
  },
  {
    "name": "Nature's Madness",
    "type": "FAIRY",
    "cls": "Special",
    "pow": 1,
    "acc": 90,
    "pp": 10,
    "desc": "The user hits the target with the force of nature. It halves the target's HP."
  },
  {
    "name": "Aromatic Mist",
    "type": "FAIRY",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user raises the Sp. Def stat of an ally Pokémon by using a mysterious aroma."
  },
  {
    "name": "Baby-Doll Eyes",
    "type": "FAIRY",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 30,
    "desc": "The user stares with its baby-doll eyes, which lowers the target's Attack stat. Always goes first."
  },
  {
    "name": "Charm",
    "type": "FAIRY",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 20,
    "desc": "The user charmingly gazes at the foe, making it less wary. The target's Attack is harshly lowered."
  },
  {
    "name": "Crafty Shield",
    "type": "FAIRY",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user protects itself and its allies from status moves with a mysterious power."
  },
  {
    "name": "Decorate",
    "type": "FAIRY",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 15,
    "desc": "The user sharply raises the target's Attack and Sp. Atk stats by decorating the target."
  },
  {
    "name": "Fairy Lock",
    "type": "FAIRY",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "By locking down the battlefield, the user keeps all Pokémon from fleeing during the next turn."
  },
  {
    "name": "Floral Healing",
    "type": "FAIRY",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user restores the target's HP by up to half of its max HP. It restores more HP when the terrain is grass."
  },
  {
    "name": "Flower Shield",
    "type": "FAIRY",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user raises the Defense stats of all Grass-type Pokémon in battle with a mysterious power."
  },
  {
    "name": "Geomancy",
    "type": "COSMIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user absorbs energy and sharply raises its Sp. Atk, Sp. Def, and Speed stats on the next turn."
  },
  {
    "name": "Misty Terrain",
    "type": "FAIRY",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user covers the ground with mist for five turns. Grounded Pokémon can't gain status conditions."
  },
  {
    "name": "Moonlight",
    "type": "COSMIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "The user restores its own HP. The amount of HP regained varies with the weather."
  },
  {
    "name": "Sweet Kiss",
    "type": "FAIRY",
    "cls": "Status",
    "pow": 0,
    "acc": 75,
    "pp": 10,
    "desc": "The user kisses the target with a sweet, angelic cuteness that causes confusion."
  },
  {
    "name": "Focus Punch",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 150,
    "acc": 100,
    "pp": 20,
    "desc": "The user focuses its mind before launching a punch. It will fail if the user is hit before it is used."
  },
  {
    "name": "Meteor Assault",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 150,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks wildly with its thick leek. The user can't move on the next turn."
  },
  {
    "name": "High Jump Kick",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 130,
    "acc": 90,
    "pp": 10,
    "desc": "The target is attacked with a knee kick from a jump. If it misses, the user is hurt instead."
  },
  {
    "name": "Close Combat",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 5,
    "desc": "The user fights the foe up close without guarding itself. It also cuts the user's Defense and Sp. Def."
  },
  {
    "name": "Focus Blast",
    "type": "FIGHTING",
    "cls": "Special",
    "pow": 120,
    "acc": 70,
    "pp": 5,
    "desc": "The user heightens its mental focus and unleashes its power. It may also lower the target's Sp. Def."
  },
  {
    "name": "Superpower",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks the target with great power. However, it also lowers the user's Attack and Defense."
  },
  {
    "name": "Cross Chop",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 100,
    "acc": 80,
    "pp": 5,
    "desc": "The user delivers a double chop with its forearms crossed. Critical hits land more easily."
  },
  {
    "name": "Dynamic Punch",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 100,
    "acc": 50,
    "pp": 5,
    "desc": "The user punches the target with full, concentrated power. It confuses the target if it hits."
  },
  {
    "name": "Flying Press",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 100,
    "acc": 95,
    "pp": 10,
    "desc": "The user dives down onto the target from the sky. This move is Fighting and Flying type simultaneously."
  },
  {
    "name": "Hammer Arm",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 100,
    "acc": 90,
    "pp": 10,
    "desc": "The user swings and hits with its strong and heavy fist. It lowers the user's Speed, however."
  },
  {
    "name": "Jump Kick",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 100,
    "acc": 95,
    "pp": 10,
    "desc": "The user jumps up high, then strikes with a kick. If the kick misses, the user hurts itself."
  },
  {
    "name": "Sacred Sword",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks by slicing with its long horns. The target's stat changes don't affect the damage."
  },
  {
    "name": "Thunderous Kick",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "Overwhelms the target with lightning-like movement, then kicks. Lowers the target's Defense stat."
  },
  {
    "name": "Secret Sword",
    "type": "FIGHTING",
    "cls": "Special",
    "pow": 85,
    "acc": 100,
    "pp": 10,
    "desc": "The user cuts with its long horn. The odd power contained in it does physical damage to the foe."
  },
  {
    "name": "Sky Uppercut",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 85,
    "acc": 90,
    "pp": 15,
    "desc": "The user attacks the target with an uppercut thrown skyward with force."
  },
  {
    "name": "Aura Sphere",
    "type": "FIGHTING",
    "cls": "Special",
    "pow": 80,
    "acc": "—",
    "pp": 20,
    "desc": "The user looses a blast of aura power from deep within its body. This move is certain to hit."
  },
  {
    "name": "Body Press",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks by slamming its body into the target. Power increases the higher the user's Defense is."
  },
  {
    "name": "Submission",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 80,
    "acc": 80,
    "pp": 20,
    "desc": "The user grabs the target and recklessly dives for the ground. It also hurts the user slightly."
  },
  {
    "name": "Brick Break",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 75,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks with a swift chop. It can also break any barrier such as Light Screen and Reflect."
  },
  {
    "name": "Drain Punch",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 75,
    "acc": 100,
    "pp": 10,
    "desc": "An energy-draining punch. The user's HP is restored by half the damage taken by the target."
  },
  {
    "name": "Vital Throw",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 70,
    "acc": 0,
    "pp": 10,
    "desc": "The user attacks last. In return, this throw move is guaranteed not to miss."
  },
  {
    "name": "Wake-Up Slap",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 10,
    "desc": "This attack inflicts big damage on a sleeping target. It also wakes the target up, however."
  },
  {
    "name": "Low Sweep",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 65,
    "acc": 100,
    "pp": 20,
    "desc": "The user attacks the target's legs swiftly, reducing the target's Speed stat."
  },
  {
    "name": "Circle Throw",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 60,
    "acc": 90,
    "pp": 10,
    "desc": "The user throws the target and drags out another Pokémon in its party. In the wild, the battle ends."
  },
  {
    "name": "Force Palm",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 10,
    "desc": "The target is attacked with a shock wave. It may also leave the target with paralysis."
  },
  {
    "name": "Revenge",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 10,
    "desc": "An attack move that inflicts double the damage if the user has been hurt by the foe in the same turn."
  },
  {
    "name": "Rolling Kick",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 60,
    "acc": 85,
    "pp": 15,
    "desc": "The user lashes out with a quick, spinning kick. It may also make the target flinch."
  },
  {
    "name": "Storm Throw",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 10,
    "desc": "The user strikes the target with a fierce blow. This attack always results in a critical hit."
  },
  {
    "name": "Karate Chop",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 25,
    "desc": "The target is attacked with a sharp chop. Critical hits land more easily."
  },
  {
    "name": "Mach Punch",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "The user throws a punch at blinding speed. It is certain to strike first."
  },
  {
    "name": "Power-Up Punch",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 20,
    "desc": "Striking opponents repeatedly makes the user's fists harder, raising the user's Attack stat."
  },
  {
    "name": "Rock Smash",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks with a punch that can shatter a rock. It may also lower the foe's Defense stat."
  },
  {
    "name": "Vacuum Wave",
    "type": "FIGHTING",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "The user whirls its fists to send a wave of pure vacuum at the target. This move always goes first."
  },
  {
    "name": "Double Kick",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 30,
    "acc": 100,
    "pp": 30,
    "desc": "The target is quickly kicked twice in succession using both feet."
  },
  {
    "name": "Arm Thrust",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 15,
    "acc": 100,
    "pp": 20,
    "desc": "The user looses a flurry of open-palmed arm thrusts that hit two to five times in a row."
  },
  {
    "name": "Triple Kick",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 10,
    "acc": 90,
    "pp": 10,
    "desc": "A consecutive three-kick attack that becomes more powerful with each successive hit."
  },
  {
    "name": "Counter",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 20,
    "desc": "A retaliation move that counters any physical attack, inflicting double the damage taken."
  },
  {
    "name": "Final Gambit",
    "type": "FIGHTING",
    "cls": "Special",
    "pow": 1,
    "acc": 100,
    "pp": 5,
    "desc": "The user risks all to attack the foe. The user faints but does damage equal to its HP."
  },
  {
    "name": "Low Kick",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 20,
    "desc": "A powerful low kick that makes the foe fall over. It inflicts greater damage on heavier foes."
  },
  {
    "name": "Reversal",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 15,
    "desc": "An all-out attack that becomes more powerful the less HP the user has."
  },
  {
    "name": "Seismic Toss",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 20,
    "desc": "The target is thrown using the power of gravity. It inflicts damage equal to the user's level."
  },
  {
    "name": "Bulk Up",
    "type": "FIGHTING",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user tenses its muscles to bulk up its body, boosting both its Attack and Defense stats."
  },
  {
    "name": "Coaching",
    "type": "FIGHTING",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user properly coaches its ally Pokémon, boosting their Attack and Defense stats."
  },
  {
    "name": "Detect",
    "type": "FIGHTING",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "It enables the user to evade all attacks. Its chance of failing rises if it is used in succession."
  },
  {
    "name": "Mat Block",
    "type": "FIGHTING",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "Using a pulled-up mat as a shield, the user protects itself and its allies from damaging moves."
  },
  {
    "name": "No Retreat",
    "type": "FIGHTING",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "This move raises all the user's stats but prevents the user from switching out or fleeing."
  },
  {
    "name": "Octolock",
    "type": "FIGHTING",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 15,
    "desc": "Locks the target in and prevents it from fleeing. Also lowers the target's Defense and Sp. Def each turn."
  },
  {
    "name": "Quick Guard",
    "type": "FIGHTING",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 15,
    "desc": "The user protects itself and its allies from priority moves. If may fail if used in succession."
  },
  {
    "name": "V-create",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 180,
    "acc": 95,
    "pp": 5,
    "desc": "With a fiery forehead, the user hurls itself at the foe. It lowers the user's Defense, Sp. Def, and Speed."
  },
  {
    "name": "Blast Burn",
    "type": "FIRE",
    "cls": "Special",
    "pow": 150,
    "acc": 90,
    "pp": 5,
    "desc": "The target is razed by a fiery explosion. The user must rest on the next turn, however."
  },
  {
    "name": "Eruption",
    "type": "FIRE",
    "cls": "Special",
    "pow": 150,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks in an explosive fury. The lower the user's HP, the less powerful this attack becomes."
  },
  {
    "name": "Mind Blown",
    "type": "FIRE",
    "cls": "Special",
    "pow": 150,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks everything by causing its own head to explode. This also damages the user."
  },
  {
    "name": "Shell Trap",
    "type": "FIRE",
    "cls": "Special",
    "pow": 150,
    "acc": 100,
    "pp": 5,
    "desc": "The user sets a shell trap. If it is hit by a physical move, the trap explodes and hurt the attacker."
  },
  {
    "name": "Blue Flare",
    "type": "FIRE",
    "cls": "Special",
    "pow": 130,
    "acc": 85,
    "pp": 5,
    "desc": "The user attacks by engulfing the foe in a beautiful, yet intense, blue flame. It may also burn the foe."
  },
  {
    "name": "Burn Up",
    "type": "FIRE",
    "cls": "Special",
    "pow": 130,
    "acc": 100,
    "pp": 5,
    "desc": "To inflict massive damage, the user burns itself out. The user will no longer be Fire type."
  },
  {
    "name": "Overheat",
    "type": "FIRE",
    "cls": "Special",
    "pow": 130,
    "acc": 90,
    "pp": 5,
    "desc": "The user attacks the target at full power. The attack's recoil sharply reduces the user's Sp. Atk stat."
  },
  {
    "name": "Flare Blitz",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 15,
    "desc": "The user cloaks itself in fire and charges at the foe. The user also takes damage and may burn the target."
  },
  {
    "name": "Pyro Ball",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 120,
    "acc": 90,
    "pp": 5,
    "desc": "Attacks by igniting a small stone and launching it as a fiery ball. May also burn the target."
  },
  {
    "name": "Fire Blast",
    "type": "FIRE",
    "cls": "Special",
    "pow": 110,
    "acc": 85,
    "pp": 5,
    "desc": "The foe is attacked with an intense blast of all-consuming fire. It may also leave the target with a burn."
  },
  {
    "name": "Fusion Flare",
    "type": "FIRE",
    "cls": "Special",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "The user brings down a giant flame. It does more damage if influenced by an enormous thunderbolt."
  },
  {
    "name": "Inferno",
    "type": "FIRE",
    "cls": "Special",
    "pow": 100,
    "acc": 50,
    "pp": 5,
    "desc": "The user attacks by engulfing the target in an intense fire. It leaves the target with a burn."
  },
  {
    "name": "Magma Storm",
    "type": "FIRE",
    "cls": "Special",
    "pow": 100,
    "acc": 75,
    "pp": 5,
    "desc": "The target becomes trapped within a maelstrom of fire that rages for four to five turns."
  },
  {
    "name": "Sacred Fire",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 100,
    "acc": 95,
    "pp": 5,
    "desc": "The target is razed with a mystical fire of great intensity. It may also leave the target with a burn."
  },
  {
    "name": "Searing Shot",
    "type": "FIRE",
    "cls": "Special",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "An inferno of scarlet flames torches everything around the user. It may leave the foe with a burn."
  },
  {
    "name": "Heat Wave",
    "type": "FIRE",
    "cls": "Special",
    "pow": 95,
    "acc": 90,
    "pp": 10,
    "desc": "The user attacks by exhaling hot breath on the opposing team. It may also leave targets with a burn."
  },
  {
    "name": "Flamethrower",
    "type": "FIRE",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 15,
    "desc": "The target is scorched with an intense blast of fire. It may also leave the target with a burn."
  },
  {
    "name": "Blaze Kick",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 85,
    "acc": 90,
    "pp": 10,
    "desc": "The user launches a kick with a high critical-hit ratio. It may also leave the target with a burn."
  },
  {
    "name": "Fiery Dance",
    "type": "FIRE",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "Cloaked in flames, the user dances and flaps its wings. It may also raise the user's Sp. Atk stat."
  },
  {
    "name": "Fire Lash",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user strikes the target with a burning lash. This also lowers the target's Defense stat."
  },
  {
    "name": "Fire Pledge",
    "type": "FIRE",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "A column of fire hits opposing Pokémon. When used with its Grass equivalent, it makes a sea of fire."
  },
  {
    "name": "Lava Plume",
    "type": "FIRE",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "An inferno of scarlet flames torches everything around the user. It may leave targets with a burn."
  },
  {
    "name": "Fire Punch",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 75,
    "acc": 100,
    "pp": 15,
    "desc": "The target is punched with a fiery fist. It may leave the target with a burn."
  },
  {
    "name": "Mystical Fire",
    "type": "FIRE",
    "cls": "Special",
    "pow": 75,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks by breathing a special, hot fire. This also lowers the target's Sp. Atk stat."
  },
  {
    "name": "Burning Jealousy",
    "type": "FIRE",
    "cls": "Special",
    "pow": 70,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks with energy from jealousy. This burns all foes that had their stats boosted this turn."
  },
  {
    "name": "Flame Burst",
    "type": "FIRE",
    "cls": "Special",
    "pow": 70,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks the foe with a bursting flame. It also damages Pokémon next to the target."
  },
  {
    "name": "Fire Fang",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 65,
    "acc": 95,
    "pp": 15,
    "desc": "The user bites with flame-cloaked fangs. It may also make the target flinch or leave it burned."
  },
  {
    "name": "Flame Wheel",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 25,
    "desc": "The user cloaks itself in fire and charges at the target. It may also leave the target with a burn."
  },
  {
    "name": "Incinerate",
    "type": "FIRE",
    "cls": "Special",
    "pow": 60,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks the foe with fire. The target's held Berry becomes burnt up and unusable."
  },
  {
    "name": "Flame Charge",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 20,
    "desc": "The user cloaks itself in flame and attacks. Building up more power, it raises the user's Speed stat."
  },
  {
    "name": "Ember",
    "type": "FIRE",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 25,
    "desc": "The target is attacked with small flames. It may also leave the target with a burn."
  },
  {
    "name": "Fire Spin",
    "type": "FIRE",
    "cls": "Special",
    "pow": 35,
    "acc": 85,
    "pp": 15,
    "desc": "The target becomes trapped within a fierce vortex of fire that rages for four to five turns."
  },
  {
    "name": "Heat Crash",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 10,
    "desc": "The user slams the foe with its flaming body. The heavier the user is, the greater the damage."
  },
  {
    "name": "Sunny Day",
    "type": "FIRE",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "The user intensifies the sun for five turns, powering up Fire-type moves."
  },
  {
    "name": "Will-O-Wisp",
    "type": "FIRE",
    "cls": "Status",
    "pow": 0,
    "acc": 85,
    "pp": 15,
    "desc": "The user shoots a sinister, bluish-white flame at the target to inflict a burn."
  },
  {
    "name": "Sky Attack",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 140,
    "acc": 90,
    "pp": 5,
    "desc": "A second-turn attack move where critical hits land more easily. It may also make the target flinch."
  },
  {
    "name": "Brave Bird",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 15,
    "desc": "The user tucks in its wings and charges from a low altitude. The user also takes serious damage."
  },
  {
    "name": "Dragon Ascent",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 5,
    "desc": "The user soars upward and drops at high speeds. Its Defense and Sp. Def stats are lowered."
  },
  {
    "name": "Hurricane",
    "type": "FLYING",
    "cls": "Special",
    "pow": 110,
    "acc": 70,
    "pp": 10,
    "desc": "The user wraps its foe in a fierce wind that flies up into the sky. It may also confuse the foe."
  },
  {
    "name": "Aeroblast",
    "type": "FLYING",
    "cls": "Special",
    "pow": 100,
    "acc": 95,
    "pp": 5,
    "desc": "A vortex of air is shot at the target to inflict damage. Critical hits land more easily."
  },
  {
    "name": "Beak Blast",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 15,
    "desc": "The user heats up its beak before attacking. Making contact in this time results in a burn."
  },
  {
    "name": "Fly",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 90,
    "acc": 95,
    "pp": 15,
    "desc": "The user soars, then strikes on the second turn. It can also be used for flying to any familiar town."
  },
  {
    "name": "Bounce",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 85,
    "acc": 85,
    "pp": 5,
    "desc": "The user bounces up high, then drops on the foe on the second turn. It may also paralyze the foe."
  },
  {
    "name": "Drill Peck",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 20,
    "desc": "A corkscrewing attack with the sharp beak acting as a drill."
  },
  {
    "name": "Oblivion Wing",
    "type": "FLYING",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user absorbs its target's HP. The user's HP is restored by over half of the damage dealt."
  },
  {
    "name": "Air Slash",
    "type": "FLYING",
    "cls": "Special",
    "pow": 75,
    "acc": 95,
    "pp": 15,
    "desc": "The user attacks with a blade of air that slices even the sky. It may also make the target flinch."
  },
  {
    "name": "Chatter",
    "type": "FLYING",
    "cls": "Special",
    "pow": 65,
    "acc": 100,
    "pp": 20,
    "desc": "The user attacks using a sound wave based on words it has learned. It may also confuse the target."
  },
  {
    "name": "Aerial Ace",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 60,
    "acc": 0,
    "pp": 20,
    "desc": "The user confounds the foe with speed, then slashes. The attack lands without fail."
  },
  {
    "name": "Air Cutter",
    "type": "FLYING",
    "cls": "Special",
    "pow": 60,
    "acc": 95,
    "pp": 25,
    "desc": "The user launches razor-like wind to slash the opposing team. Critical hits land more easily."
  },
  {
    "name": "Pluck",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 20,
    "desc": "The user pecks the target. If the target is holding a Berry, the user eats it and gains its effect."
  },
  {
    "name": "Sky Drop",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 10,
    "desc": "The user takes the foe into the sky, then drops it on the next turn. The foe cannot attack while airborne."
  },
  {
    "name": "Wing Attack",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 35,
    "desc": "The target is struck with large, imposing wings spread wide to inflict damage."
  },
  {
    "name": "Acrobatics",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 55,
    "acc": 100,
    "pp": 15,
    "desc": "The user nimbly strikes the foe. This attack does more damage if the user is not holding an item."
  },
  {
    "name": "Dual Wingbeat",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 40,
    "acc": 90,
    "pp": 10,
    "desc": "The user slams the target with its wings. The target is hit twice in a row."
  },
  {
    "name": "Gust",
    "type": "FLYING",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 35,
    "desc": "A gust of wind is whipped up by wings and launched at the target to inflict damage."
  },
  {
    "name": "Peck",
    "type": "FLYING",
    "cls": "Physical",
    "pow": 35,
    "acc": 100,
    "pp": 35,
    "desc": "The target is jabbed with a sharply pointed beak or horn."
  },
  {
    "name": "Defog",
    "type": "FLYING",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 15,
    "desc": "A strong wind blows away the foe's obstacles such as Light Screen. It also lowers their evasion."
  },
  {
    "name": "Feather Dance",
    "type": "FLYING",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 15,
    "desc": "The user covers the target's body with a mass of down that harshly lowers its Attack stat."
  },
  {
    "name": "Mirror Move",
    "type": "FLYING",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user counters the target by mimicking the target's last move."
  },
  {
    "name": "Roost",
    "type": "FLYING",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user lands and rests its body. It restores the user's HP by up to half of its max HP."
  },
  {
    "name": "Tailwind",
    "type": "FLYING",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 15,
    "desc": "The user whips up a turbulent whirlwind that ups the Speed of all party Pokémon for four turns."
  },
  {
    "name": "Astral Barrage",
    "type": "GHOST",
    "cls": "Special",
    "pow": 120,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks by sending a frightful amount of small ghosts at opposing Pokémon."
  },
  {
    "name": "Shadow Force",
    "type": "GHOST",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 5,
    "desc": "The user disappears, then strikes the foe on the second turn. It hits even if the foe protects itself."
  },
  {
    "name": "Poltergeist",
    "type": "GHOST",
    "cls": "Physical",
    "pow": 110,
    "acc": 90,
    "pp": 5,
    "desc": "Attacks the target by controlling its item. The move fails if the target doesn't have an item."
  },
  {
    "name": "Moongeist Beam",
    "type": "GHOST",
    "cls": "Special",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "The user emits a sinister ray. This move can be used on the target regardless of its Abilities."
  },
  {
    "name": "Phantom Force",
    "type": "GHOST",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user vanishes somewhere, then strikes on the next turn. Hits through protections."
  },
  {
    "name": "Spectral Thief",
    "type": "GHOST",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user hides in the target's shadow, steals the target's stat boosts, and then attacks."
  },
  {
    "name": "Shadow Bone",
    "type": "GHOST",
    "cls": "Physical",
    "pow": 85,
    "acc": 100,
    "pp": 10,
    "desc": "The user beats the target with a bone containing a spirit. May lower the target's Defense stat."
  },
  {
    "name": "Shadow Ball",
    "type": "GHOST",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user hurls a shadowy blob at the target. It may also lower the target's Sp. Def stat."
  },
  {
    "name": "Spirit Shackle",
    "type": "GHOST",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks while also stitching the target's shadow to the ground to prevent it fleeing."
  },
  {
    "name": "Shadow Claw",
    "type": "GHOST",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 15,
    "desc": "The user slashes with a sharp claw made from shadows. Critical hits land more easily."
  },
  {
    "name": "Hex",
    "type": "GHOST",
    "cls": "Special",
    "pow": 65,
    "acc": 100,
    "pp": 10,
    "desc": "This relentless attack does massive damage to a target affected by status problems."
  },
  {
    "name": "Ominous Wind",
    "type": "GHOST",
    "cls": "Special",
    "pow": 60,
    "acc": 100,
    "pp": 5,
    "desc": "The user blasts the target with a gust of repulsive wind. It may also raise all the user's stats at once."
  },
  {
    "name": "Shadow Punch",
    "type": "GHOST",
    "cls": "Physical",
    "pow": 60,
    "acc": "—",
    "pp": 20,
    "desc": "The user throws a punch from the shadows. The punch lands without fail."
  },
  {
    "name": "Shadow Sneak",
    "type": "GHOST",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "The user extends its shadow and attacks the target from behind. This move always goes first."
  },
  {
    "name": "Astonish",
    "type": "GHOST",
    "cls": "Physical",
    "pow": 30,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks the target while shouting in a startling fashion. It may also make the target flinch."
  },
  {
    "name": "Lick",
    "type": "GHOST",
    "cls": "Physical",
    "pow": 30,
    "acc": 100,
    "pp": 30,
    "desc": "The target is licked with a long tongue, causing damage. It may also leave the target with paralysis."
  },
  {
    "name": "Night Shade",
    "type": "GHOST",
    "cls": "Special",
    "pow": 1,
    "acc": 100,
    "pp": 15,
    "desc": "The user makes the foe see a frightening mirage. It inflicts damage matching the user's level."
  },
  {
    "name": "Confuse Ray",
    "type": "LIGHT",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 10,
    "desc": "The target is exposed to a sinister ray that triggers confusion."
  },
  {
    "name": "Curse",
    "type": "GHOST",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "A move that works differently for the Ghost type than for all the other types."
  },
  {
    "name": "Destiny Bond",
    "type": "GHOST",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "When this move is used, if the user faints, the foe that landed the knockout hit also faints."
  },
  {
    "name": "Grudge",
    "type": "GHOST",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "If the user faints, the user's grudge fully depletes the PP of the foe's move that knocked it out."
  },
  {
    "name": "Nightmare",
    "type": "GHOST",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 15,
    "desc": "A sleeping target sees a nightmare that inflicts some damage every turn."
  },
  {
    "name": "Spite",
    "type": "GHOST",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 10,
    "desc": "The user unleashes its grudge on the move last used by the target by cutting 4 PP from it."
  },
  {
    "name": "Trick-or-Treat",
    "type": "GHOST",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 20,
    "desc": "The user takes the target trick-or-treating. This adds Ghost type to the target's type."
  },
  {
    "name": "Frenzy Plant",
    "type": "GRASS",
    "cls": "Special",
    "pow": 150,
    "acc": 90,
    "pp": 5,
    "desc": "The user slams the target with an enormous tree. The user can't move on the next turn."
  },
  {
    "name": "Leaf Storm",
    "type": "GRASS",
    "cls": "Special",
    "pow": 130,
    "acc": 90,
    "pp": 5,
    "desc": "A storm of sharp is whipped up. The attack's recoil harshly reduces the user's Sp. Atk stat."
  },
  {
    "name": "Solar Blade",
    "type": "LIGHT",
    "cls": "Physical",
    "pow": 125,
    "acc": 100,
    "pp": 10,
    "desc": "The user gathers light energy into a blade, attacking the target on the next turn."
  },
  {
    "name": "Petal Dance",
    "type": "GRASS",
    "cls": "Special",
    "pow": 120,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks by scattering petals for two to three turns. The user then becomes confused."
  },
  {
    "name": "Power Whip",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 120,
    "acc": 85,
    "pp": 10,
    "desc": "The user violently whirls its vines or tentacles to harshly lash the target."
  },
  {
    "name": "Seed Flare",
    "type": "GRASS",
    "cls": "Special",
    "pow": 120,
    "acc": 85,
    "pp": 5,
    "desc": "The user generates a shock wave from within its body. It may harshly lower the target's Sp. Def."
  },
  {
    "name": "Solar Beam",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 120,
    "acc": 100,
    "pp": 10,
    "desc": "A two-turn attack. The user gathers light, then blasts a bundled beam on the second turn."
  },
  {
    "name": "Wood Hammer",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 15,
    "desc": "The user slams its rugged body into the target to attack. The user also sustains serious damage."
  },
  {
    "name": "Energy Ball",
    "type": "GRASS",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user draws power from nature and fires it at the target. It may also lower the target's Sp. Def."
  },
  {
    "name": "Leaf Blade",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 15,
    "desc": "The user handles a sharp leaf like a sword and attacks by slashing. It has a high critical-hit ratio."
  },
  {
    "name": "Petal Blizzard",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 15,
    "desc": "The user stirs up a violent petal blizzard and attacks everything around it."
  },
  {
    "name": "Apple Acid",
    "type": "GRASS",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "Attacks with an acidic liquid created from tart apples. This also lowers the target's Sp. Def."
  },
  {
    "name": "Drum Beating",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user plays its drum, controlling roots to attack. This also lowers the target's Speed stat."
  },
  {
    "name": "Grass Pledge",
    "type": "GRASS",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "A column of grass hits the foes. When used with its water equivalent, it creates a vast swamp."
  },
  {
    "name": "Grav Apple",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user inflicts damage by dropping an apple from high above. This also lowers the target's Defense."
  },
  {
    "name": "Seed Bomb",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user slams a barrage of hard-shelled seeds down on the target from above."
  },
  {
    "name": "Giga Drain",
    "type": "GRASS",
    "cls": "Special",
    "pow": 75,
    "acc": 100,
    "pp": 10,
    "desc": "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target."
  },
  {
    "name": "Horn Leech",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 75,
    "acc": 100,
    "pp": 10,
    "desc": "The user drains the foe's energy with its horns. The user's HP is restored by half the damage inflicted."
  },
  {
    "name": "Grassy Glide",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "Gliding on the ground, the user attacks the target. This move always goes first on Grassy Terrain."
  },
  {
    "name": "Trop Kick",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 15,
    "desc": "The user lands an intense tropical kick on the target. This also lowers the target's Attack stat."
  },
  {
    "name": "Leaf Tornado",
    "type": "GRASS",
    "cls": "Special",
    "pow": 65,
    "acc": 90,
    "pp": 10,
    "desc": "The user attacks its foe by encircling it in sharp leaves. This attack may also lower the foe's accuracy."
  },
  {
    "name": "Magical Leaf",
    "type": "GRASS",
    "cls": "Special",
    "pow": 60,
    "acc": 0,
    "pp": 20,
    "desc": "The user scatters curious leaves that chase the target. This attack will not miss."
  },
  {
    "name": "Needle Arm",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks by wildly swinging its thorny arms. It may also make the target flinch."
  },
  {
    "name": "Razor Leaf",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 55,
    "acc": 95,
    "pp": 25,
    "desc": "Sharp-edged leaves are launched to slash at the opposing team. Critical hits land more easily."
  },
  {
    "name": "Vine Whip",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 45,
    "acc": 100,
    "pp": 25,
    "desc": "The target is struck with slender, whiplike vines to inflict damage."
  },
  {
    "name": "Branch Poke",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 40,
    "desc": "The user attacks the target by poking it with a sharply pointed branch."
  },
  {
    "name": "Leafage",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 40,
    "desc": "The user attacks by pelting the target with leaves."
  },
  {
    "name": "Mega Drain",
    "type": "GRASS",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 15,
    "desc": "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target."
  },
  {
    "name": "Snap Trap",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 35,
    "acc": 100,
    "pp": 15,
    "desc": "The user snares the target in a snap trap for four to five turns."
  },
  {
    "name": "Bullet Seed",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 25,
    "acc": 100,
    "pp": 30,
    "desc": "The user forcefully shoots seeds at the target. Two to five seeds are shot in rapid succession."
  },
  {
    "name": "Absorb",
    "type": "GRASS",
    "cls": "Special",
    "pow": 20,
    "acc": 100,
    "pp": 25,
    "desc": "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target."
  },
  {
    "name": "Grass Knot",
    "type": "GRASS",
    "cls": "Special",
    "pow": 1,
    "acc": 100,
    "pp": 20,
    "desc": "The user snares the target with grass and trips it. The heavier the target, the greater the damage."
  },
  {
    "name": "Aromatherapy",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "The user releases a soothing scent that heals all status problems affecting the user's party."
  },
  {
    "name": "Cotton Guard",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user protects itself by wrapping its body in soft cotton, drastically raising its Defense stat."
  },
  {
    "name": "Cotton Spore",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 40,
    "desc": "The user releases cotton-like spores that cling to the foe, harshly reducing its Speed stat."
  },
  {
    "name": "Forest's Curse",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 20,
    "desc": "The user puts a forest curse on the target. The target is now Grass type as well."
  },
  {
    "name": "Grass Whistle",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 55,
    "pp": 15,
    "desc": "The user plays a pleasant melody that lulls the target into a deep sleep."
  },
  {
    "name": "Grassy Terrain",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user turns the ground to grass for five turns. Grounded Pokémon restore a little HP every turn."
  },
  {
    "name": "Ingrain",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user lays roots that restore its HP on every turn. Because it is rooted, it can't switch out."
  },
  {
    "name": "Jungle Healing",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user becomes one with the jungle, and restores HP and cures status conditions of itself and allies."
  },
  {
    "name": "Leech Seed",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 90,
    "pp": 10,
    "desc": "A seed is planted on the target. It steals some HP from the target every turn."
  },
  {
    "name": "Sleep Powder",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 75,
    "pp": 15,
    "desc": "The user scatters a big cloud of sleep-inducing dust around the target."
  },
  {
    "name": "Spiky Shield",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "Protects the user from attacks. Also damages attackers that make contact with the user."
  },
  {
    "name": "Spore",
    "type": "GRASS",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 15,
    "desc": "The user scatters bursts of spores that induce sleep."
  },
  {
    "name": "Strength Sap",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 10,
    "desc": "The user restores its HP by the target's Attack stat amount. Then lowers the target's Attack stat."
  },
  {
    "name": "Stun Spore",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 75,
    "pp": 30,
    "desc": "The user scatters a cloud of paralyzing powder. It may leave the target with paralysis."
  },
  {
    "name": "Synthesis",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "The user restores its own HP. The amount of HP regained varies with the weather."
  },
  {
    "name": "Worry Seed",
    "type": "GRASS",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 10,
    "desc": "A seed that causes worry is planted on the foe. It prevents sleep by making its Ability Insomnia."
  },
  {
    "name": "Precipice Blades",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 120,
    "acc": 85,
    "pp": 10,
    "desc": "The user attacks its foes by manifesting the power of the land in fearsome blades of stone."
  },
  {
    "name": "Earthquake",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 10,
    "desc": "The user sets off an earthquake that strikes every Pokémon around it."
  },
  {
    "name": "High Horsepower",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 95,
    "acc": 95,
    "pp": 10,
    "desc": "The user fiercely attacks the target using its entire body."
  },
  {
    "name": "Earth Power",
    "type": "GROUND",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user makes the ground under the foe erupt with power. It may also lower the target's Sp. Def."
  },
  {
    "name": "Land's Wrath",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user gathers the energy of the land and focuses that power on foes to damage them."
  },
  {
    "name": "Thousand Arrows",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "This move also hits Pokémon that are in the air. Those Pokémon are knocked down to the ground."
  },
  {
    "name": "Thousand Waves",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks with a wave that crawls along the ground. Those it hits can't flee from battle."
  },
  {
    "name": "Dig",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user burrows, then attacks on the second turn. It can also be used to exit dungeons."
  },
  {
    "name": "Drill Run",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 80,
    "acc": 95,
    "pp": 10,
    "desc": "The user crashes into its target while rotating its body like a drill. Critical hits land more easily."
  },
  {
    "name": "Stomping Tantrum",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 75,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks driven by frustration. Power increases if the user's previous move failed."
  },
  {
    "name": "Scorching Sands",
    "type": "GROUND",
    "cls": "Special",
    "pow": 70,
    "acc": 100,
    "pp": 10,
    "desc": "The user throws scorching sand at the target to attack. This may also burn the target."
  },
  {
    "name": "Bone Club",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 65,
    "acc": 85,
    "pp": 20,
    "desc": "The user clubs the target with a bone. It may also make the target flinch."
  },
  {
    "name": "Mud Bomb",
    "type": "GROUND",
    "cls": "Special",
    "pow": 65,
    "acc": 85,
    "pp": 10,
    "desc": "The user launches a hard-packed mud ball to attack. It may also lower the target's accuracy."
  },
  {
    "name": "Bulldoze",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 20,
    "desc": "The user strikes everything around it by stomping on the ground. It reduces hit Pokémon's Speed."
  },
  {
    "name": "Mud Shot",
    "type": "GROUND",
    "cls": "Special",
    "pow": 55,
    "acc": 95,
    "pp": 15,
    "desc": "The user attacks by hurling a blob of mud at the target. It also reduces the target's Speed."
  },
  {
    "name": "Bonemerang",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 50,
    "acc": 90,
    "pp": 10,
    "desc": "The user throws the bone it holds. The bone loops to hit the target twice, coming and going."
  },
  {
    "name": "Sand Tomb",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 35,
    "acc": 85,
    "pp": 15,
    "desc": "The user traps the target inside a harshly raging sandstorm for four to five turns."
  },
  {
    "name": "Bone Rush",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 25,
    "acc": 90,
    "pp": 10,
    "desc": "The user strikes the target with a hard bone two to five times in a row."
  },
  {
    "name": "Mud-Slap",
    "type": "GROUND",
    "cls": "Special",
    "pow": 20,
    "acc": 100,
    "pp": 10,
    "desc": "The user hurls mud in the target's face to inflict damage and lower its accuracy."
  },
  {
    "name": "Fissure",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 1,
    "acc": 30,
    "pp": 5,
    "desc": "The user opens up a fissure in the ground and drops the foe in. The target instantly faints if it hits."
  },
  {
    "name": "Magnitude",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 30,
    "desc": "The user looses a ground-shaking quake affecting everyone around the user. Its power varies."
  },
  {
    "name": "Mud Sport",
    "type": "GROUND",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 15,
    "desc": "The user covers itself with mud. It weakens Electric-type moves while the user is in the battle."
  },
  {
    "name": "Rototiller",
    "type": "GROUND",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user tills the soil to encourage plant growth. This raises the Attack and Sp. Atk of Grass types."
  },
  {
    "name": "Sand Attack",
    "type": "GROUND",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 15,
    "desc": "Sand is hurled in the target's face, reducing its accuracy."
  },
  {
    "name": "Shore Up",
    "type": "GROUND",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user regains up to half of its max HP. It restores more HP in a sandstorm."
  },
  {
    "name": "Spikes",
    "type": "GROUND",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user lays a trap of spikes at the foe's feet. The trap hurts foes that switch into battle."
  },
  {
    "name": "Freeze Shock",
    "type": "ICE",
    "cls": "Physical",
    "pow": 140,
    "acc": 90,
    "pp": 5,
    "desc": "On the second turn, the user hits the foe with electrically charged ice. It may also paralyze the foe."
  },
  {
    "name": "Ice Burn",
    "type": "ICE",
    "cls": "Special",
    "pow": 140,
    "acc": 90,
    "pp": 5,
    "desc": "On the second turn, an ultracold, freezing wind surrounds the foe. This may leave it with a burn."
  },
  {
    "name": "Glacial Lance",
    "type": "ICE",
    "cls": "Physical",
    "pow": 130,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks by hurling a blizzard-cloaked icicle lance at opposing Pokémon."
  },
  {
    "name": "Blizzard",
    "type": "ICE",
    "cls": "Special",
    "pow": 110,
    "acc": 70,
    "pp": 5,
    "desc": "A howling blizzard is summoned to strike the opposing team. It may also freeze them solid."
  },
  {
    "name": "Ice Hammer",
    "type": "ICE",
    "cls": "Physical",
    "pow": 100,
    "acc": 90,
    "pp": 10,
    "desc": "The user swings and hits with its strong, heavy fist. It lowers the user's Speed, however."
  },
  {
    "name": "Ice Beam",
    "type": "ICE",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The target is struck with an icy-cold beam of energy. It may also freeze the target solid."
  },
  {
    "name": "Icicle Crash",
    "type": "ICE",
    "cls": "Physical",
    "pow": 85,
    "acc": 90,
    "pp": 10,
    "desc": "The user attacks by harshly dropping an icicle onto the foe. It may also make the target flinch."
  },
  {
    "name": "Ice Punch",
    "type": "ICE",
    "cls": "Physical",
    "pow": 75,
    "acc": 100,
    "pp": 15,
    "desc": "The target is punched with an icy fist. It may also leave the target frozen."
  },
  {
    "name": "Freeze-Dry",
    "type": "ICE",
    "cls": "Special",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "The user rapidly cools the target. This may freeze the target. Is super-effective on Water types."
  },
  {
    "name": "Aurora Beam",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 65,
    "acc": 100,
    "pp": 20,
    "desc": "The target is hit with a rainbow-colored beam. This may also lower the target's Attack stat."
  },
  {
    "name": "Glaciate",
    "type": "ICE",
    "cls": "Special",
    "pow": 65,
    "acc": 95,
    "pp": 10,
    "desc": "The user attacks by blowing freezing cold air at the foe. This attack reduces the targets' Speed stat."
  },
  {
    "name": "Ice Fang",
    "type": "ICE",
    "cls": "Physical",
    "pow": 65,
    "acc": 95,
    "pp": 15,
    "desc": "The user bites with cold-infused fangs. It may also make the target flinch or leave it frozen."
  },
  {
    "name": "Avalanche",
    "type": "ICE",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 10,
    "desc": "An attack move that inflicts double the damage if the user has been hurt by the foe in the same turn."
  },
  {
    "name": "Frost Breath",
    "type": "ICE",
    "cls": "Special",
    "pow": 60,
    "acc": 90,
    "pp": 10,
    "desc": "The user blows a cold breath on the target. This attack always results in a critical hit."
  },
  {
    "name": "Icy Wind",
    "type": "ICE",
    "cls": "Special",
    "pow": 55,
    "acc": 95,
    "pp": 15,
    "desc": "The user attacks with a gust of chilled air. It also lowers the targets' Speed stat."
  },
  {
    "name": "Ice Shard",
    "type": "ICE",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "The user flash freezes chunks of ice and hurls them at the target. This move always goes first."
  },
  {
    "name": "Powder Snow",
    "type": "ICE",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 25,
    "desc": "The user attacks with a chilling gust of powdery snow. It may also freeze the targets."
  },
  {
    "name": "Ice Ball",
    "type": "ICE",
    "cls": "Physical",
    "pow": 30,
    "acc": 90,
    "pp": 20,
    "desc": "The user continually rolls into the target over five turns. It becomes stronger each time it hits."
  },
  {
    "name": "Icicle Spear",
    "type": "ICE",
    "cls": "Physical",
    "pow": 25,
    "acc": 100,
    "pp": 30,
    "desc": "The user launches sharp icicles at the target. It strikes two to five times in a row."
  },
  {
    "name": "Triple Axel",
    "type": "ICE",
    "cls": "Physical",
    "pow": 20,
    "acc": 90,
    "pp": 10,
    "desc": "A consecutive three-kick attack that becomes more powerful with each successful hit."
  },
  {
    "name": "Sheer Cold",
    "type": "ICE",
    "cls": "Special",
    "pow": 1,
    "acc": 30,
    "pp": 5,
    "desc": "The foe is attacked with a blast of absolute-zero cold. The target instantly faints if it hits."
  },
  {
    "name": "Aurora Veil",
    "type": "ICE",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "This move reduces damage from attacks for five turns. This can be used only in a hailstorm."
  },
  {
    "name": "Hail",
    "type": "ICE",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user summons a hail storm lasting five turns. It damages all Pokémon except the Ice type."
  },
  {
    "name": "Haze",
    "type": "ICE",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 30,
    "desc": "The user creates a haze that eliminates every stat change among all the Pokémon engaged in battle."
  },
  {
    "name": "Mist",
    "type": "ICE",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 30,
    "desc": "The user cloaks its body with a white mist that prevents any of its stats from being cut for five turns."
  },
  {
    "name": "Explosion",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 250,
    "acc": 100,
    "pp": 5,
    "desc": "The user explodes to inflict damage on those around it. The user faints upon using this move."
  },
  {
    "name": "Self-Destruct",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 200,
    "acc": 100,
    "pp": 5,
    "desc": "The user blows up to inflict damage on all Pokémon in battle. The user faints upon using this move."
  },
  {
    "name": "Giga Impact",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 150,
    "acc": 90,
    "pp": 5,
    "desc": "The user charges at the target using every bit of its power. The user must rest on the next turn."
  },
  {
    "name": "Hyper Beam",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 150,
    "acc": 90,
    "pp": 5,
    "desc": "The foe is attacked with a powerful beam. The user must rest on the next turn to regain its energy."
  },
  {
    "name": "Boomburst",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 140,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks everything around it with the destructive power of a terrible, explosive sound."
  },
  {
    "name": "Last Resort",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 140,
    "acc": 100,
    "pp": 5,
    "desc": "This move can be used only after the user has used all the other moves it knows in the battle."
  },
  {
    "name": "Skull Bash",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 130,
    "acc": 100,
    "pp": 10,
    "desc": "The user tucks in its head to raise its Defense in the first turn, then rams the foe on the next turn."
  },
  {
    "name": "Double-Edge",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 15,
    "desc": "A reckless, life-risking tackle. It also damages the user by a fairly large amount, however."
  },
  {
    "name": "Head Charge",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 15,
    "desc": "The user charges its head into the foe, using its powerful guard hair. The user also takes damage."
  },
  {
    "name": "Mega Kick",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 120,
    "acc": 75,
    "pp": 5,
    "desc": "The target is attacked by a kick launched with muscle-packed power."
  },
  {
    "name": "Multi-Attack",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 10,
    "desc": "Cloaking itself in high energy, the user slams into the target. This move's type depends on the held memory."
  },
  {
    "name": "Techno Blast",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 120,
    "acc": 100,
    "pp": 5,
    "desc": "The user fires a beam of light at its target. The type changes depending on the Drive the user holds."
  },
  {
    "name": "Thrash",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 10,
    "desc": "The user rampages and attacks for two to three turns. It then becomes confused, however."
  },
  {
    "name": "Egg Bomb",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 100,
    "acc": 75,
    "pp": 10,
    "desc": "A large egg is hurled at the target with maximum force to inflict damage."
  },
  {
    "name": "Judgment",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 100,
    "acc": 100,
    "pp": 10,
    "desc": "The user releases countless shots of light. Its type varies with the kind of Plate the user is holding."
  },
  {
    "name": "Hyper Voice",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user lets loose a horribly echoing shout with the power to inflict damage."
  },
  {
    "name": "Revelation Dance",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks the target by dancing very hard. The user's type determines the type of this move."
  },
  {
    "name": "Rock Climb",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 90,
    "acc": 85,
    "pp": 20,
    "desc": "The user attacks the target by smashing into it with incredible force. It may also confuse the target."
  },
  {
    "name": "Take Down",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 90,
    "acc": 85,
    "pp": 20,
    "desc": "A reckless, full-body charge attack for slamming into the foe. It also damages the user a little."
  },
  {
    "name": "Uproar",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks in an uproar for three turns. Over that time, no one can fall asleep."
  },
  {
    "name": "Body Slam",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 85,
    "acc": 100,
    "pp": 15,
    "desc": "The user drops onto the target with its full body weight. It may leave the target with paralysis."
  },
  {
    "name": "Extreme Speed",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 5,
    "desc": "The user charges the target at blinding speed. This attack always goes before any other move."
  },
  {
    "name": "Hyper Fang",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 80,
    "acc": 90,
    "pp": 15,
    "desc": "The user bites hard on the target with its sharp front fangs. It may also make the target flinch."
  },
  {
    "name": "Mega Punch",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 80,
    "acc": 85,
    "pp": 20,
    "desc": "The target is slugged by a punch thrown with muscle-packed power."
  },
  {
    "name": "Razor Wind",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "A two-turn attack. Blades of wind hit the foe on the second turn. Critical hits land more easily."
  },
  {
    "name": "Slam",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 80,
    "acc": 75,
    "pp": 20,
    "desc": "The target is slammed with a long tail, vines, etc., to inflict damage."
  },
  {
    "name": "Strength",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The target is slugged with a punch thrown at maximum power. It can also be used to move heavy boulders."
  },
  {
    "name": "Tri Attack",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user strikes with a simultaneous three-beam attack. May also paralyze, burn, or freeze the target."
  },
  {
    "name": "Crush Claw",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 75,
    "acc": 95,
    "pp": 10,
    "desc": "The user slashes the target with hard and sharp claws. It may also lower the target's Defense."
  },
  {
    "name": "Relic Song",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 75,
    "acc": 100,
    "pp": 10,
    "desc": "An ancient song appeals to the hearts of those listening. It may also induce sleep."
  },
  {
    "name": "Chip Away",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "Seeking an opening, the user strikes continually. The foe's stat changes don't affect the damage."
  },
  {
    "name": "Dizzy Punch",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 10,
    "desc": "The target is hit with rhythmically launched punches that may also leave it confused."
  },
  {
    "name": "Facade",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "An attack move that doubles its power if the user is poisoned, burned, or has paralysis."
  },
  {
    "name": "Headbutt",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 15,
    "desc": "The user sticks out its head and attacks by charging into the foe. It may also make the target flinch."
  },
  {
    "name": "Retaliate",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 5,
    "desc": "Gets revenge for a fainted ally. If an ally fainted in the last turn, this attack's damage increases."
  },
  {
    "name": "Secret Power",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "The user attacks with a secret power. Its added effects vary depending on the user's environment."
  },
  {
    "name": "Slash",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "The target is attacked with a slash of claws or blades. Critical hits land more easily."
  },
  {
    "name": "Smelling Salts",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 10,
    "desc": "This attack inflicts double damage on a paralyzed foe. It also cures the target's paralysis, however."
  },
  {
    "name": "Horn Attack",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 65,
    "acc": 100,
    "pp": 25,
    "desc": "The target is jabbed with a sharply pointed horn to inflict damage."
  },
  {
    "name": "Stomp",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 65,
    "acc": 100,
    "pp": 20,
    "desc": "The target is stomped with a big foot. It may also make the target flinch."
  },
  {
    "name": "Covet",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 25,
    "desc": "The user endearingly approaches the target, then steals the target's held item."
  },
  {
    "name": "Hidden Power",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 60,
    "acc": 100,
    "pp": 15,
    "desc": "A unique attack that varies in type and intensity depending on the Pokémon using it."
  },
  {
    "name": "Round",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 60,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks with a song. Others can join in the Round and make the attack do greater damage."
  },
  {
    "name": "Vise Grip",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 55,
    "acc": 100,
    "pp": 30,
    "desc": "The target is gripped and squeezed from both sides to inflict damage."
  },
  {
    "name": "Cut",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 50,
    "acc": 95,
    "pp": 30,
    "desc": "The target is cut with a scythe or a claw. It can also be used to cut down thin trees."
  },
  {
    "name": "Rapid Spin",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 40,
    "desc": "A spin attack that raises the user's Speed and eliminates the effects of Bind, Spikes, etc."
  },
  {
    "name": "Snore",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 50,
    "acc": 100,
    "pp": 15,
    "desc": "An attack that can be used only if the user is asleep. The harsh noise may also make the target flinch."
  },
  {
    "name": "Terrain Pulse",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 50,
    "acc": 100,
    "pp": 10,
    "desc": "Utilizes the power of the terrain to attack. This move's type and power vary with the terrain."
  },
  {
    "name": "Weather Ball",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 50,
    "acc": 100,
    "pp": 10,
    "desc": "An attack move that varies in power and type depending on the weather."
  },
  {
    "name": "Echoed Voice",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 15,
    "desc": "The user attacks the foe with an echoing voice. If this move is used every turn, it does greater damage."
  },
  {
    "name": "Fake Out",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 10,
    "desc": "An attack that hits first and makes the target flinch. It only works the first turn the user is in battle."
  },
  {
    "name": "False Swipe",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 40,
    "desc": "A restrained attack that prevents the target from fainting. The target is left with at least 1 HP."
  },
  {
    "name": "Hold Back",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 40,
    "desc": "The user holds back when it attacks, and the target is left with at least 1 HP."
  },
  {
    "name": "Pay Day",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 20,
    "desc": "Numerous coins are hurled at the target to inflict damage. Money is earned after battle."
  },
  {
    "name": "Pound",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 35,
    "desc": "The target is physically pounded with a long tail or a foreleg, etc."
  },
  {
    "name": "Quick Attack",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "The user lunges at the target at a speed that makes it almost invisible. It is sure to strike first."
  },
  {
    "name": "Scratch",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 35,
    "desc": "Hard, pointed, and sharp claws rake the target to inflict damage."
  },
  {
    "name": "Tackle",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 35,
    "desc": "A physical attack in which the user charges and slams into the target with its whole body."
  },
  {
    "name": "Double Hit",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 35,
    "acc": 90,
    "pp": 10,
    "desc": "The user slams the target with a long tail, vines, or tentacle. The target is hit twice in a row."
  },
  {
    "name": "Feint",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 30,
    "acc": 100,
    "pp": 10,
    "desc": "An attack that hits a target using Protect or Detect. It also lifts the effects of those moves."
  },
  {
    "name": "Tail Slap",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 25,
    "acc": 85,
    "pp": 10,
    "desc": "The user attacks by striking the target with its hard tail. It hits the Pokémon two to five times in a row."
  },
  {
    "name": "Rage",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 20,
    "acc": 100,
    "pp": 20,
    "desc": "As long as this move is in use, the user's Attack rises each time the user is hit in battle."
  },
  {
    "name": "Spike Cannon",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 20,
    "acc": 100,
    "pp": 15,
    "desc": "Sharp spikes are shot at the target in rapid succession. They hit two to five times in a row."
  },
  {
    "name": "Comet Punch",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 18,
    "acc": 85,
    "pp": 15,
    "desc": "The target is hit with a flurry of punches that strike two to five times in a row."
  },
  {
    "name": "Fury Swipes",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 18,
    "acc": 80,
    "pp": 15,
    "desc": "The target is raked with sharp claws or scythes for two to five times in quick succession."
  },
  {
    "name": "Barrage",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 15,
    "acc": 85,
    "pp": 20,
    "desc": "Round objects are hurled at the target to strike two to five times in a row."
  },
  {
    "name": "Bind",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 15,
    "acc": 85,
    "pp": 20,
    "desc": "Things such as long bodies or tentacles are used to bind and squeeze the foe for four to five turns."
  },
  {
    "name": "Double Slap",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 15,
    "acc": 85,
    "pp": 10,
    "desc": "The target is slapped repeatedly, back and forth, two to five times in a row."
  },
  {
    "name": "Fury Attack",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 15,
    "acc": 85,
    "pp": 20,
    "desc": "The target is jabbed repeatedly with a horn or beak two to five times in a row."
  },
  {
    "name": "Wrap",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 15,
    "acc": 90,
    "pp": 20,
    "desc": "A long body or vines are used to wrap and squeeze the target for four to five turns."
  },
  {
    "name": "Constrict",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 10,
    "acc": 100,
    "pp": 35,
    "desc": "The foe is attacked with long, creeping tentacles or vines. It may also lower the target's Speed."
  },
  {
    "name": "Bide",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 1,
    "acc": 0,
    "pp": 10,
    "desc": "The user endures attacks for two turns, then strikes back to cause double the damage taken."
  },
  {
    "name": "Crush Grip",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 5,
    "desc": "The target is crushed with great force. The attack is more powerful the more HP the target has left."
  },
  {
    "name": "Endeavor",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 5,
    "desc": "An attack move that cuts down the target's HP to equal the user's HP."
  },
  {
    "name": "Flail",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 15,
    "desc": "The user flails about aimlessly to attack. It becomes more powerful the less HP the user has."
  },
  {
    "name": "Frustration",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 20,
    "desc": "A full-power attack that grows more powerful the less the user likes its Trainer."
  },
  {
    "name": "Guillotine",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 1,
    "acc": 30,
    "pp": 5,
    "desc": "A vicious, tearing attack with big pincers. The target will faint instantly if this attack hits."
  },
  {
    "name": "Horn Drill",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 1,
    "acc": 30,
    "pp": 5,
    "desc": "The user stabs the foe with a horn that rotates like a drill. If it hits, the target faints instantly."
  },
  {
    "name": "Natural Gift",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 15,
    "desc": "The user draws power to attack by using its held Berry. The Berry determines its type and power."
  },
  {
    "name": "Present",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 1,
    "acc": 90,
    "pp": 15,
    "desc": "The user attacks by giving the target a gift with a hidden trap. It restores HP sometimes, however."
  },
  {
    "name": "Return",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 20,
    "desc": "A full-power attack that grows more powerful the more the user likes its Trainer."
  },
  {
    "name": "Sonic Boom",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 1,
    "acc": 90,
    "pp": 20,
    "desc": "The target is hit with a destructive shock wave that always inflicts 20 HP damage."
  },
  {
    "name": "Spit Up",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 1,
    "acc": 100,
    "pp": 10,
    "desc": "The power stored using the move Stockpile is released all at once in an attack."
  },
  {
    "name": "Super Fang",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 1,
    "acc": 90,
    "pp": 10,
    "desc": "The user chomps hard on the target with its sharp front fangs. It cuts the target's HP to half."
  },
  {
    "name": "Trump Card",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 1,
    "acc": 0,
    "pp": 5,
    "desc": "The fewer PP this move has, the greater its attack power."
  },
  {
    "name": "Wring Out",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 1,
    "acc": 100,
    "pp": 5,
    "desc": "The user powerfully wrings the foe. The more HP the foe has, the greater this attack's power."
  },
  {
    "name": "Acupressure",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 30,
    "desc": "The user applies pressure to stress points, sharply boosting one of its stats."
  },
  {
    "name": "After You",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 15,
    "desc": "The user helps the target and makes it use its move right after the user."
  },
  {
    "name": "Assist",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user hurriedly and randomly uses a move among those known by other Pokémon in the party."
  },
  {
    "name": "Attract",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 15,
    "desc": "If it is the opposite gender of the user, the target becomes infatuated and less likely to attack."
  },
  {
    "name": "Baton Pass",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 40,
    "desc": "The user switches places with a party Pokémon in waiting, passing along any stat changes."
  },
  {
    "name": "Belly Drum",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user maximizes its Attack stat in exchange for HP equal to half its max HP."
  },
  {
    "name": "Bestow",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 15,
    "desc": "The user passes its held item to the target when the target isn't holding an item."
  },
  {
    "name": "Block",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "The user blocks the target's way with arms spread wide to prevent escape."
  },
  {
    "name": "Camouflage",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user's type is changed depending on its environment, such as at water's edge, in grass, or in a cave."
  },
  {
    "name": "Captivate",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 20,
    "desc": "If it is the opposite gender of the user, the target is charmed into harshly lowering its Sp. Atk stat."
  },
  {
    "name": "Celebrate",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 40,
    "desc": "The Pokémon congratulates you on your special day!"
  },
  {
    "name": "Confide",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user tells the target a secret. The target loses focus and its Sp. Atk stat is lowered."
  },
  {
    "name": "Conversion",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 30,
    "desc": "The user changes its type to become the same type as one of its moves."
  },
  {
    "name": "Conversion 2",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 30,
    "desc": "The user changes its type to make itself resistant to the type of the attack the opponent used last."
  },
  {
    "name": "Copycat",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user mimics the move used immediately before it. The move fails if no other move has been used yet."
  },
  {
    "name": "Court Change",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "With its mysterious power, the user swaps the effects on either side of the field."
  },
  {
    "name": "Defense Curl",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 40,
    "desc": "The user curls up to conceal weak spots and raise its Defense stat."
  },
  {
    "name": "Disable",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 20,
    "desc": "For four turns, this move prevents the target from using the move it last used."
  },
  {
    "name": "Double Team",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 15,
    "desc": "By moving rapidly, the user makes illusory copies of itself to raise its evasiveness."
  },
  {
    "name": "Encore",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 5,
    "desc": "The user compels the target to keep using only the move it last used for three turns."
  },
  {
    "name": "Endure",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user endures any attack with at least 1 HP. Its chance of failing rises if it is used in succession."
  },
  {
    "name": "Entrainment",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 15,
    "desc": "The user dances to compel the target to mimic it, making the target's Ability the same as the user's."
  },
  {
    "name": "Flash",
    "type": "LIGHT",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 20,
    "desc": "The user flashes a light that cuts the target's accuracy. It can also be used to illuminate caves."
  },
  {
    "name": "Focus Energy",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 30,
    "desc": "The user takes a deep breath and focuses so that critical hits land more easily."
  },
  {
    "name": "Follow Me",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user draws attention to itself, making all targets take aim only at the user."
  },
  {
    "name": "Foresight",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 40,
    "desc": "Enables the user to hit a Ghost type with any kind of move. It also enables the user to hit an evasive foe."
  },
  {
    "name": "Glare",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 30,
    "desc": "The user intimidates the target with the pattern on its belly to cause paralysis."
  },
  {
    "name": "Growl",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 40,
    "desc": "The user growls in an endearing way, making the foe less wary. The foe's Attack stat is lowered."
  },
  {
    "name": "Growth",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user's body grows all at once, raising the Atk and Sp. Atk stats."
  },
  {
    "name": "Happy Hour",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 30,
    "desc": "Using Happy Hour doubles the amount of prize money received after battle."
  },
  {
    "name": "Harden",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 30,
    "desc": "The user stiffens all the muscles in its body to raise its Defense stat."
  },
  {
    "name": "Heal Bell",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "The user makes a soothing bell chime to heal the status problems of all the party Pokémon."
  },
  {
    "name": "Helping Hand",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user assists an ally by boosting the power of its attack."
  },
  {
    "name": "Hold Hands",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 40,
    "desc": "The user and an ally hold hands. This makes them very happy."
  },
  {
    "name": "Howl",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 40,
    "desc": "The user howls loudly to raise the spirit of itself and allies, boosting their Attack stats."
  },
  {
    "name": "Laser Focus",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 30,
    "desc": "The user focuses intensely. The attack on the next turn always results in a critical hit."
  },
  {
    "name": "Leer",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 30,
    "desc": "The user gains an intimidating leer with sharp eyes. The target's Defense stat is reduced."
  },
  {
    "name": "Lock-On",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "The user takes sure aim at the target. It ensures the next attack does not fail to hit the target."
  },
  {
    "name": "Lovely Kiss",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": 75,
    "pp": 10,
    "desc": "With a scary face, the user tries to force a kiss on the target. If it suceeds, the target falls asleep."
  },
  {
    "name": "Lucky Chant",
    "type": "LIGHT",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 30,
    "desc": "The user chants an incantation toward the sky, preventing the foe from landing critical hits."
  },
  {
    "name": "Me First",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user tries to cut ahead of the foe to steal and use the foe's intended move with greater power."
  },
  {
    "name": "Mean Look",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "The user pins the target with a dark, arresting look. The target becomes unable to flee."
  },
  {
    "name": "Metronome",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user waggles a finger and stimulates its brain into randomly using nearly any move."
  },
  {
    "name": "Milk Drink",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user restores its own HP by up to half of its maximum HP. May also be used in the field to heal HP."
  },
  {
    "name": "Mimic",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user copies the move last used by the foe. The move can be used until the user is switched out."
  },
  {
    "name": "Mind Reader",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "The user senses the foe's movements with its mind to ensure its next attack does not miss the foe."
  },
  {
    "name": "Minimize",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user compresses its body to make itself look smaller, which sharply raises its evasiveness."
  },
  {
    "name": "Morning Sun",
    "type": "LIGHT",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 5,
    "desc": "The user restores its own HP. The amount of HP regained varies with the weather."
  },
  {
    "name": "Nature Power",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "An attack that makes use of nature's power. Its effects vary depending on the user's environment."
  },
  {
    "name": "Noble Roar",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 30,
    "desc": "Letting out a noble roar, the user intimidates the target and lowers its Attack and Sp. Atk."
  },
  {
    "name": "Odor Sleuth",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 40,
    "desc": "Enables the user to hit a Ghost type with any type of move. It also enables the user to hit an evasive foe."
  },
  {
    "name": "Pain Split",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user adds its HP to the target's HP, then equally shares the combined HP with the target."
  },
  {
    "name": "Perish Song",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "Any Pokémon that hears this song faints in three turns, unless it switches out of battle."
  },
  {
    "name": "Play Nice",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user and target become friends. The target loses its will to fight, lowering its Attack stat."
  },
  {
    "name": "Protect",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "It enables the user to evade all attacks. Its chance of failing rises if it is used in succession."
  },
  {
    "name": "Psych Up",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user hypnotizes itself into copying any stat change made by the target."
  },
  {
    "name": "Recover",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "Restoring its own cells, the user restores its own HP by half of its max HP."
  },
  {
    "name": "Recycle",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user recycles a held item that has been used in battle so it can be used again."
  },
  {
    "name": "Reflect Type",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 15,
    "desc": "The user reflects the target's type, making it the same type as the target."
  },
  {
    "name": "Refresh",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user rests to cure itself of a poisoning, burn, or paralysis."
  },
  {
    "name": "Roar",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The target is scared off and replaced by another Pokémon in its party. In the wild, the battle ends."
  },
  {
    "name": "Safeguard",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 25,
    "desc": "The user creates a protective field that prevents status problems for five turns."
  },
  {
    "name": "Scary Face",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 10,
    "desc": "The user frightens the target with a scary face to harshly reduce its Speed stat."
  },
  {
    "name": "Screech",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 85,
    "pp": 40,
    "desc": "An earsplitting screech harshly reduces the target's Defense stat."
  },
  {
    "name": "Sharpen",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 30,
    "desc": "The user reduces its polygon count to make itself more jagged, raising the Attack stat."
  },
  {
    "name": "Shell Smash",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 15,
    "desc": "The user breaks its shell, lowering its defenses but sharply raising attacking and Speed stats."
  },
  {
    "name": "Simple Beam",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 15,
    "desc": "The user's mysterious psychic wave changes the target's Ability to Simple."
  },
  {
    "name": "Sing",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 55,
    "pp": 15,
    "desc": "A soothing lullaby is sung in a calming voice that puts the target into a deep slumber."
  },
  {
    "name": "Sketch",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 1,
    "desc": "It enables the user to permanently learn the move last used by the foe. Once used, Sketch disappears."
  },
  {
    "name": "Slack Off",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user slacks off, restoring its own HP by up to half of its maximum HP."
  },
  {
    "name": "Sleep Talk",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "While it is asleep, the user randomly uses one of the moves it knows."
  },
  {
    "name": "Smokescreen",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 20,
    "desc": "The user releases an obscuring cloud of smoke or ink. It reduces the target's accuracy."
  },
  {
    "name": "Soft-Boiled",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user restores its own HP by up to half of its maximum HP. May also be used in the field to heal HP."
  },
  {
    "name": "Splash",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 40,
    "desc": "The user just flops and splashes around to no effect at all..."
  },
  {
    "name": "Spotlight",
    "type": "LIGHT",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 15,
    "desc": "The user shines a spotlight on the target so that only it will be attacked during the turn."
  },
  {
    "name": "Stockpile",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user charges up power and raises both its Defense and Sp. Def. The move can be used three times."
  },
  {
    "name": "Stuff Cheeks",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user eats its held Berry, then sharply raises its Defense stat."
  },
  {
    "name": "Substitute",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user makes a copy of itself using some of its HP. The copy serves as the user's decoy."
  },
  {
    "name": "Supersonic",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 55,
    "pp": 20,
    "desc": "The user generates odd sound waves from its body. It may confuse the target."
  },
  {
    "name": "Swagger",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 85,
    "pp": 15,
    "desc": "The user enrages and confuses the target. However, it also sharply raises the target's Attack stat."
  },
  {
    "name": "Swallow",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The power stored using the move Stockpile is absorbed by the user to heal its HP."
  },
  {
    "name": "Sweet Scent",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 20,
    "desc": "A sweet scent that lowers the foe's evasiveness. It also lures wild Pokémon if used in grass, etc."
  },
  {
    "name": "Swords Dance",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "A frenetic dance to uplift the fighting spirit. It sharply raises the user's Attack stat."
  },
  {
    "name": "Tail Whip",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 30,
    "desc": "The user wags its tail cutely, making opposing Pokémon less wary and lowering their Defense stat."
  },
  {
    "name": "Tearful Look",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "Gets teary eyed to make the target lose its will to fight. Lowers the target's Attack and Sp. Atk."
  },
  {
    "name": "Teatime",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user has teatime with all the Pokémon in the battle. Each Pokémon eats its held Berry."
  },
  {
    "name": "Teeter Dance",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 20,
    "desc": "The user performs a wobbly dance that confuses the Pokémon around it."
  },
  {
    "name": "Tickle",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 20,
    "desc": "The user tickles the target into laughing, reducing its Attack and Defense stats."
  },
  {
    "name": "Transform",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user transforms into a copy of the target right down to having the same move set."
  },
  {
    "name": "Whirlwind",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The foe is blown away, to be replaced by another Pokémon in its party. In the wild, the battle ends."
  },
  {
    "name": "Wish",
    "type": "COSMIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "One turn after this move is used, the target's HP is restored by half the user's maximum HP."
  },
  {
    "name": "Work Up",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 30,
    "desc": "The user is roused, and its Attack and Sp. Atk stats increase."
  },
  {
    "name": "Yawn",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user lets loose a huge yawn that lulls the target into falling asleep on the next turn."
  },
  {
    "name": "Belch",
    "type": "POISON",
    "cls": "Special",
    "pow": 120,
    "acc": 90,
    "pp": 10,
    "desc": "The user lets out a damaging belch at the target. The user must eat a held Berry to use this move."
  },
  {
    "name": "Gunk Shot",
    "type": "POISON",
    "cls": "Physical",
    "pow": 120,
    "acc": 80,
    "pp": 5,
    "desc": "The user shoots filthy garbage at the target to attack. It may also poison the target."
  },
  {
    "name": "Sludge Wave",
    "type": "POISON",
    "cls": "Special",
    "pow": 95,
    "acc": 100,
    "pp": 10,
    "desc": "It swamps the area around the user with a giant sludge wave. It may also poison those hit."
  },
  {
    "name": "Shell Side Arm",
    "type": "POISON",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "Inflicts physical or special damage, whichever will be more effective. May also poison the target."
  },
  {
    "name": "Sludge Bomb",
    "type": "POISON",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "Unsanitary sludge is hurled at the target. It may also poison the target."
  },
  {
    "name": "Poison Jab",
    "type": "POISON",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 20,
    "desc": "The target is stabbed with a tentacle or arm seeped with poison. It may also poison the target."
  },
  {
    "name": "Cross Poison",
    "type": "POISON",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "A slashing attack with a poisonous blade that may also poison the foe. Critical hits land more easily."
  },
  {
    "name": "Sludge",
    "type": "POISON",
    "cls": "Special",
    "pow": 65,
    "acc": 100,
    "pp": 20,
    "desc": "Unsanitary sludge is hurled at the target. It may also poison the target."
  },
  {
    "name": "Venoshock",
    "type": "POISON",
    "cls": "Special",
    "pow": 65,
    "acc": 100,
    "pp": 10,
    "desc": "The user drenches the foe in a special poisonous liquid. Its power doubles if the target is poisoned."
  },
  {
    "name": "Clear Smog",
    "type": "POISON",
    "cls": "Special",
    "pow": 50,
    "acc": 0,
    "pp": 15,
    "desc": "The user attacks by throwing a clump of special mud. All status changes are returned to normal."
  },
  {
    "name": "Poison Fang",
    "type": "POISON",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 15,
    "desc": "The user bites the target with toxic fangs. It may also leave the target badly poisoned."
  },
  {
    "name": "Poison Tail",
    "type": "POISON",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 25,
    "desc": "The user hits the target with its tail. It may also poison the target. Critical hits land more easily."
  },
  {
    "name": "Acid",
    "type": "POISON",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "The foe is attacked with a spray of harsh acid. It may also lower the target's Sp. Def stat."
  },
  {
    "name": "Acid Spray",
    "type": "POISON",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 20,
    "desc": "The user spits fluid that works to melt the target. This harshly reduces the target's Sp. Def stat."
  },
  {
    "name": "Smog",
    "type": "POISON",
    "cls": "Special",
    "pow": 30,
    "acc": 70,
    "pp": 20,
    "desc": "The target is attacked with a discharge of filthy gases. It may also poison the target."
  },
  {
    "name": "Poison Sting",
    "type": "POISON",
    "cls": "Physical",
    "pow": 15,
    "acc": 100,
    "pp": 35,
    "desc": "The user stabs the target with a poisonous stinger. This may also poison the target."
  },
  {
    "name": "Acid Armor",
    "type": "POISON",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user alters its cellular structure to liquefy itself, sharply raising its Defense stat."
  },
  {
    "name": "Baneful Bunker",
    "type": "POISON",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "Protects the user from attacks. Also poisons any attacker that makes contact with the user."
  },
  {
    "name": "Coil",
    "type": "POISON",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user coils up and concentrates. This raises its Attack and Defense stats as well as its accuracy."
  },
  {
    "name": "Corrosive Gas",
    "type": "POISON",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 40,
    "desc": "The user surrounds everything around it with highly acidic gas and melts away items they hold."
  },
  {
    "name": "Gastro Acid",
    "type": "POISON",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 10,
    "desc": "The user hurls up its stomach acids on the foe. The fluid negates the effect of the target's Ability."
  },
  {
    "name": "Poison Gas",
    "type": "POISON",
    "cls": "Status",
    "pow": "—",
    "acc": 90,
    "pp": 40,
    "desc": "A cloud of poison gas is sprayed in the face of opposing Pokémon. It may poison those hit."
  },
  {
    "name": "Poison Powder",
    "type": "POISON",
    "cls": "Status",
    "pow": "—",
    "acc": 75,
    "pp": 35,
    "desc": "The user scatters a cloud of poisonous dust on the target. It may poison the target."
  },
  {
    "name": "Purify",
    "type": "POISON",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user heals the target's status condition. If so, it also restores the user's own HP."
  },
  {
    "name": "Toxic",
    "type": "POISON",
    "cls": "Status",
    "pow": 0,
    "acc": 90,
    "pp": 10,
    "desc": "A move that leaves the target badly poisoned. Its poison damage worsens every turn."
  },
  {
    "name": "Toxic Spikes",
    "type": "POISON",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user lays a trap of poison spikes at the foe's feet. They poison foes that switch into battle."
  },
  {
    "name": "Toxic Thread",
    "type": "POISON",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 20,
    "desc": "The user shoots poisonous threads to poison the target and lower the target's Speed stat."
  },
  {
    "name": "Venom Drench",
    "type": "POISON",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 20,
    "desc": "Foes are drenched in an odd liquid that lowers the Attack, Sp. Atk, and Speed of poisoned Pokémon."
  },
  {
    "name": "Prismatic Laser",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 160,
    "acc": 100,
    "pp": 10,
    "desc": "The user shoots powerful lasers using the power of a prism. The user can't move on the next turn."
  },
  {
    "name": "Psycho Boost",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 140,
    "acc": 90,
    "pp": 5,
    "desc": "The user attacks the target at full power. The attack's recoil harshly reduces the user's Sp. Atk stat."
  },
  {
    "name": "Future Sight",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 120,
    "acc": 100,
    "pp": 10,
    "desc": "Two turns after this move is used, a hunk of psychic energy attacks the target."
  },
  {
    "name": "Synchronoise",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 120,
    "acc": 100,
    "pp": 10,
    "desc": "Using an odd shock wave, the user damages any Pokémon of the same type as the user."
  },
  {
    "name": "Dream Eater",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 100,
    "acc": 100,
    "pp": 15,
    "desc": "The user eats the dreams of a sleeping foe. It absorbs half the damage caused to heal the user's HP."
  },
  {
    "name": "Photon Geyser",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks with a pillar of light. This move the higher of the user's Attack or Sp. Atk stat."
  },
  {
    "name": "Psystrike",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 100,
    "acc": 100,
    "pp": 10,
    "desc": "The user materializes an odd psychic wave to attack the target. This attack does physical damage."
  },
  {
    "name": "Freezing Glare",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user shoots its psychic power from its eyes to attack. This may also leave the target frozen."
  },
  {
    "name": "Psychic",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The target is hit by a strong telekinetic force. It may also reduce the target's Sp. Def stat."
  },
  {
    "name": "Psychic Fangs",
    "type": "PSYCHIC",
    "cls": "Physical",
    "pow": 85,
    "acc": 100,
    "pp": 10,
    "desc": "The user bites the target using psychic capabilities. This can also destroy Light Screen and Reflect."
  },
  {
    "name": "Eerie Spell",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks with tremendous psychic power. This also removes 3 PP from the target's last move."
  },
  {
    "name": "Expanding Force",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks the target with psychic power. Powers up and hits all foes on Psychic Terrain."
  },
  {
    "name": "Extrasensory",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 20,
    "desc": "The user attacks with an odd, unseeable power. It may also make the target flinch."
  },
  {
    "name": "Hyperspace Hole",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 80,
    "acc": "—",
    "pp": 5,
    "desc": "Using a hyperspace hole, the user appears right next to the target and strikes. Skips protections."
  },
  {
    "name": "Psyshock",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user materializes an odd psychic wave to attack the target. This attack does physical damage."
  },
  {
    "name": "Zen Headbutt",
    "type": "PSYCHIC",
    "cls": "Physical",
    "pow": 80,
    "acc": 90,
    "pp": 15,
    "desc": "The user focuses its willpower to its head and attacks the foe. It may also make the target flinch."
  },
  {
    "name": "Luster Purge",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 70,
    "acc": 100,
    "pp": 5,
    "desc": "The user lets loose a damaging burst of light. It may also reduce the target's Sp. Def stat."
  },
  {
    "name": "Mist Ball",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 70,
    "acc": 100,
    "pp": 5,
    "desc": "A mistlike flurry of down envelops and damages the target. It may also lower the target's Sp. Atk."
  },
  {
    "name": "Psycho Cut",
    "type": "PSYCHIC",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "The user tears at the target with blades formed by psychic power. Critical hits land more easily."
  },
  {
    "name": "Psybeam",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 65,
    "acc": 100,
    "pp": 20,
    "desc": "The target is attacked with a peculiar ray. It may also cause confusion."
  },
  {
    "name": "Heart Stamp",
    "type": "PSYCHIC",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 25,
    "desc": "The user unleashes a vicious blow after its cute act makes the foe less wary. It may also cause flinching."
  },
  {
    "name": "Confusion",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 50,
    "acc": 100,
    "pp": 25,
    "desc": "The target is hit by a weak telekinetic force. It may also leave the target confused."
  },
  {
    "name": "Stored Power",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 20,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks with stored power. The more the user's stats are raised, the greater the damage."
  },
  {
    "name": "Mirror Coat",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 1,
    "acc": 100,
    "pp": 20,
    "desc": "A retaliation move that counters any special attack, inflicting double the damage taken."
  },
  {
    "name": "Psywave",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 1,
    "acc": 100,
    "pp": 15,
    "desc": "The target is attacked with an odd psychic wave. The attack varies in intensity."
  },
  {
    "name": "Agility",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 30,
    "desc": "The user relaxes and lightens its body to move faster. It sharply boosts the Speed stat."
  },
  {
    "name": "Ally Switch",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 15,
    "desc": "The user teleports using a strange power and switches its place with one of its allies."
  },
  {
    "name": "Amnesia",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user temporarily empties its mind to forget its concerns. It sharply raises the user's Sp. Def stat."
  },
  {
    "name": "Barrier",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user throws up a sturdy wall that sharply raises its Defense stat."
  },
  {
    "name": "Calm Mind",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user quietly focuses its mind and calms its spirit to raise its Sp. Atk and Sp. Def stats."
  },
  {
    "name": "Cosmic Power",
    "type": "COSMIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user absorbs a mystical power from space to raise its Defense and Sp. Def stats."
  },
  {
    "name": "Gravity",
    "type": "COSMIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "Gravity is intensified for five turns, making moves involving flying unusable and negating Levitation."
  },
  {
    "name": "Guard Split",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user employs its psychic power to average its Defense and Sp. Def stats with those of its target."
  },
  {
    "name": "Guard Swap",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user employs its psychic power to switch changes to its Defense and Sp. Def with the target."
  },
  {
    "name": "Heal Block",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 15,
    "desc": "For five turns, the foe is prevented from using any moves, Abilities, or held items that recover HP."
  },
  {
    "name": "Heal Pulse",
    "type": "LIGHT",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user emits a healing pulse which restores the target's HP by up to half of its max HP."
  },
  {
    "name": "Healing Wish",
    "type": "LIGHT",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user faints. In return, the Pokémon taking its place will have its HP restored and status cured."
  },
  {
    "name": "Heart Swap",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user employs its psychic power to switch stat changes with the target."
  },
  {
    "name": "Hypnosis",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 60,
    "pp": 20,
    "desc": "The user employs hypnotic suggestion to make the target fall into a deep sleep."
  },
  {
    "name": "Imprison",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "If the foe knows any move also known by the user, the foe is prevented from using it."
  },
  {
    "name": "Instruct",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 15,
    "desc": "The user instructs the target to use the target's last move again."
  },
  {
    "name": "Kinesis",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": 80,
    "pp": 15,
    "desc": "The user distracts the target by bending a spoon. It lowers the target's accuracy."
  },
  {
    "name": "Light Screen",
    "type": "LIGHT",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 30,
    "desc": "A wondrous wall of light is put up to suppress damage from special attacks for five turns."
  },
  {
    "name": "Lunar Dance",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user faints. In return, the Pokémon taking its place will have its status and HP fully restored."
  },
  {
    "name": "Magic Coat",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 15,
    "desc": "A barrier reflects back to the target moves like Leech Seed and moves that damage status."
  },
  {
    "name": "Magic Powder",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 20,
    "desc": "The user scatters a cloud of magic powder that changes the target to Psychic type."
  },
  {
    "name": "Magic Room",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user creates a bizarre area in which Pokémon's held items lose their effects for five turns."
  },
  {
    "name": "Meditate",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 40,
    "desc": "The user meditates to awaken the power deep within its body and raise its Attack stat."
  },
  {
    "name": "Miracle Eye",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 40,
    "desc": "Enables the user to hit a Dark type with any type of move. It also enables the user to hit an evasive foe."
  },
  {
    "name": "Power Split",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user employs its psychic power to average its Attack and Sp. Atk stats with those of the target."
  },
  {
    "name": "Power Swap",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user employs its psychic power to switch changes to its Attack and Sp. Atk with the target."
  },
  {
    "name": "Power Trick",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user employs its psychic power to switch its Attack with its Defense stat."
  },
  {
    "name": "Psychic Terrain",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "Protects grounded Pokémon from priority moves and powers up Psychic-type moves for five turns."
  },
  {
    "name": "Psycho Shift",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 10,
    "desc": "Using its psychic power of suggestion, the user transfers its status problems to the target."
  },
  {
    "name": "Reflect",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "A wondrous wall of light is put up to suppress damage from physical attacks for five turns."
  },
  {
    "name": "Rest",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user goes to sleep for two turns. It fully restores the user's HP and heals any status problem."
  },
  {
    "name": "Role Play",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user mimics the target completely, copying the target's natural Ability."
  },
  {
    "name": "Skill Swap",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user employs its psychic power to exchange Abilities with the target."
  },
  {
    "name": "Speed Swap",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user exchanges Speed stats with the target."
  },
  {
    "name": "Telekinesis",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 15,
    "desc": "The user makes the target float with its psychic power. The target is easier to hit for three turns."
  },
  {
    "name": "Teleport",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user switches place with a party Pokémon. Also warps to the last Pokémon Center visited."
  },
  {
    "name": "Trick",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 10,
    "desc": "The user catches the target off guard and swaps its held item with its own."
  },
  {
    "name": "Trick Room",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 5,
    "desc": "The user creates a bizarre area in which slower Pokémon get to move first for five turns."
  },
  {
    "name": "Wonder Room",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user creates a bizarre area in which Pokémon's Defense and Sp. Def stats are swapped for 5 turns."
  },
  {
    "name": "Head Smash",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 150,
    "acc": 80,
    "pp": 5,
    "desc": "The user attacks the foe with a hazardous, full-power headbutt. The user also takes terrible damage."
  },
  {
    "name": "Rock Wrecker",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 150,
    "acc": 90,
    "pp": 5,
    "desc": "The user launches a huge boulder at the target to attack. It must rest on the next turn, however."
  },
  {
    "name": "Meteor Beam",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 120,
    "acc": 90,
    "pp": 10,
    "desc": "Gathers space power and boosts its Sp. Atk stat on the first turn, attacks on the next turn."
  },
  {
    "name": "Diamond Storm",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 100,
    "acc": 95,
    "pp": 5,
    "desc": "The user whips up a storm of diamonds to damage foes. This may also sharply raise the user's Defense stat."
  },
  {
    "name": "Stone Edge",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 100,
    "acc": 80,
    "pp": 5,
    "desc": "The user stabs the foe with sharpened stones from below. It has a high critical-hit ratio."
  },
  {
    "name": "Power Gem",
    "type": "ROCK",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 20,
    "desc": "The user attacks with a ray of light that sparkles as if it were made of gemstones."
  },
  {
    "name": "Rock Slide",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 75,
    "acc": 90,
    "pp": 10,
    "desc": "Large boulders are hurled at the foes to inflict damage. It may also make the targets flinch."
  },
  {
    "name": "Ancient Power",
    "type": "ROCK",
    "cls": "Special",
    "pow": 60,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks with a prehistoric power. It may also raise all the user's stats at once."
  },
  {
    "name": "Rock Tomb",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 60,
    "acc": 95,
    "pp": 15,
    "desc": "Boulders are hurled at the target. It also lowers the target's Speed by preventing its movement."
  },
  {
    "name": "Rock Throw",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 50,
    "acc": 90,
    "pp": 15,
    "desc": "The user picks up and throws a small rock at the target to attack."
  },
  {
    "name": "Smack Down",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 15,
    "desc": "The user throws a stone or projectile to attack. A flying Pokémon will fall to the ground when hit."
  },
  {
    "name": "Accelerock",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 20,
    "desc": "The user smashes into the target at high speed. This move always goes first."
  },
  {
    "name": "Rollout",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 30,
    "acc": 90,
    "pp": 20,
    "desc": "The user continually rolls into the target over five turns. It becomes stronger each time it hits."
  },
  {
    "name": "Rock Blast",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 25,
    "acc": 90,
    "pp": 10,
    "desc": "The user hurls hard rocks at the target. Two to five rocks are launched in quick succession."
  },
  {
    "name": "Rock Polish",
    "type": "ROCK",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user polishes its body to reduce drag. It can sharply raise the Speed stat."
  },
  {
    "name": "Sandstorm",
    "type": "ROCK",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "Summons a five-turn sandstorm to hurt all combatants except the Rock, Ground, and Steel types."
  },
  {
    "name": "Stealth Rock",
    "type": "ROCK",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user lays a trap of levitating stones around the foe. The trap hurts foes that switch into battle."
  },
  {
    "name": "Tar Shot",
    "type": "ROCK",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 15,
    "desc": "Pours sticky tar over the target, lowering its Speed and making it weaker to Fire-type moves."
  },
  {
    "name": "Wide Guard",
    "type": "ROCK",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user and its allies are protected from wide-ranging attacks for a turn. May fail if used in succession."
  },
  {
    "name": "Doom Desire",
    "type": "STEEL",
    "cls": "Special",
    "pow": 140,
    "acc": 100,
    "pp": 5,
    "desc": "Two turns after this move is used, the user blasts the target with a concentrated bundle of light."
  },
  {
    "name": "Steel Beam",
    "type": "STEEL",
    "cls": "Special",
    "pow": 140,
    "acc": 95,
    "pp": 5,
    "desc": "The user fires a beam of steel that it collected from its entire body. This also damages the user."
  },
  {
    "name": "Steel Roller",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 130,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks while destroying the terrain. This move fails when the ground isn't a terrain."
  },
  {
    "name": "Behemoth Bash",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "The user becomes a gigantic shield and slams into the target."
  },
  {
    "name": "Behemoth Blade",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "The user becomes a gigantic sword and cuts the target."
  },
  {
    "name": "Iron Tail",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 100,
    "acc": 75,
    "pp": 15,
    "desc": "The target is slammed with a steel-hard tail. It may also lower the target's Defense stat."
  },
  {
    "name": "Sunsteel Strike",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "The user slams into the target with the force of a meteor. Can't be stopped by the target's Ability."
  },
  {
    "name": "Meteor Mash",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 90,
    "acc": 90,
    "pp": 10,
    "desc": "The target is hit with a hard punch fired like a meteor. It may also raise the user's Attack."
  },
  {
    "name": "Anchor Shot",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 20,
    "desc": "The user entangles the target with its anchor chain. The target becomes unable to flee."
  },
  {
    "name": "Flash Cannon",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user gathers all its light energy and releases it at once. It may also lower the target's Sp. Def stat."
  },
  {
    "name": "Iron Head",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The foe slams the target with its steel-hard head. It may also make the target flinch."
  },
  {
    "name": "Smart Strike",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 70,
    "acc": "—",
    "pp": 10,
    "desc": "The user stabs the target with a sharp horn. This attack never misses."
  },
  {
    "name": "Steel Wing",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 70,
    "acc": 90,
    "pp": 25,
    "desc": "The target is hit with wings of steel. It may also raise the user's Defense stat."
  },
  {
    "name": "Double Iron Bash",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 5,
    "desc": "The user rotates, centering the hex nut in its chest, and then strikes twice. May cause flinching."
  },
  {
    "name": "Mirror Shot",
    "type": "STEEL",
    "cls": "Special",
    "pow": 65,
    "acc": 85,
    "pp": 10,
    "desc": "The user looses a flash of energy from its polished body. It may also lower the target's accuracy."
  },
  {
    "name": "Magnet Bomb",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 60,
    "acc": "—",
    "pp": 20,
    "desc": "The user launches steel bombs that stick to the target. This attack will not miss."
  },
  {
    "name": "Gear Grind",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 50,
    "acc": 85,
    "pp": 15,
    "desc": "The user attacks by throwing two steel gears at its target."
  },
  {
    "name": "Metal Claw",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 50,
    "acc": 95,
    "pp": 35,
    "desc": "The target is raked with steel claws. It may also raise the user's Attack stat."
  },
  {
    "name": "Bullet Punch",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "The user strikes the target with tough punches as fast as bullets. This move always goes first."
  },
  {
    "name": "Gyro Ball",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 5,
    "desc": "The user tackles the target with a high-speed spin. The slower the user, the greater the damage."
  },
  {
    "name": "Heavy Slam",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 10,
    "desc": "The user slams into the foe with its heavy body. The heavier the user, the greater the damage."
  },
  {
    "name": "Metal Burst",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 10,
    "desc": "The user retaliates with much greater power against the target that last inflicted damage on it."
  },
  {
    "name": "Autotomize",
    "type": "STEEL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 15,
    "desc": "The user sheds part of its body to make itself lighter and sharply raise its Speed stat."
  },
  {
    "name": "Gear Up",
    "type": "STEEL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 20,
    "desc": "The user engages its gears to raise the Attack and Sp. Atk of allies with the Plus or Minus Ability."
  },
  {
    "name": "Iron Defense",
    "type": "STEEL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 15,
    "desc": "The user hardens its body's surface like iron, sharply raising its Defense stat."
  },
  {
    "name": "King's Shield",
    "type": "STEEL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "Protects itself from damage. It also harshly lowers the Attack of attackers that make contact."
  },
  {
    "name": "Metal Sound",
    "type": "STEEL",
    "cls": "Status",
    "pow": 0,
    "acc": 85,
    "pp": 40,
    "desc": "A horrible sound like scraping metal harshly reduces the target's Sp. Def stat."
  },
  {
    "name": "Shift Gear",
    "type": "STEEL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user rotates its gears, raising its Attack and sharply raising its Speed."
  },
  {
    "name": "Hydro Cannon",
    "type": "WATER",
    "cls": "Special",
    "pow": 150,
    "acc": 90,
    "pp": 5,
    "desc": "The target is hit with a watery blast. The user must rest on the next turn, however."
  },
  {
    "name": "Water Spout",
    "type": "WATER",
    "cls": "Special",
    "pow": 150,
    "acc": 100,
    "pp": 5,
    "desc": "The user spouts water to damage the foe. The lower the user's HP, the less powerful it becomes."
  },
  {
    "name": "Hydro Pump",
    "type": "WATER",
    "cls": "Special",
    "pow": 110,
    "acc": 80,
    "pp": 5,
    "desc": "The target is blasted by a huge volume of water launched under great pressure."
  },
  {
    "name": "Origin Pulse",
    "type": "WATER",
    "cls": "Special",
    "pow": 110,
    "acc": 85,
    "pp": 10,
    "desc": "The user attacks opposing Pokémon with countless beams of light that glow a deep and brilliant blue."
  },
  {
    "name": "Steam Eruption",
    "type": "WATER",
    "cls": "Special",
    "pow": 110,
    "acc": 95,
    "pp": 5,
    "desc": "The user immerses the target in superheated steam. This may also leave the target with a burn."
  },
  {
    "name": "Crabhammer",
    "type": "WATER",
    "cls": "Physical",
    "pow": 100,
    "acc": 90,
    "pp": 10,
    "desc": "The target is hammered with a large pincer. Critical hits land more easily."
  },
  {
    "name": "Aqua Tail",
    "type": "WATER",
    "cls": "Physical",
    "pow": 90,
    "acc": 90,
    "pp": 10,
    "desc": "The user attacks by swinging its tail as if it were a vicious wave in a raging storm."
  },
  {
    "name": "Muddy Water",
    "type": "WATER",
    "cls": "Special",
    "pow": 90,
    "acc": 85,
    "pp": 10,
    "desc": "The user attacks by shooting muddy water at the opposing team. It may also lower the target's accuracy."
  },
  {
    "name": "Sparkling Aria",
    "type": "WATER",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user bursts into song, emitting many bubbles. Any burnt Pokémon will be healed by these bubbles."
  },
  {
    "name": "Surf",
    "type": "WATER",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 15,
    "desc": "It swamps the area around the user with a giant wave. It can also be used for crossing water."
  },
  {
    "name": "Fishious Rend",
    "type": "WATER",
    "cls": "Physical",
    "pow": 85,
    "acc": 100,
    "pp": 10,
    "desc": "The user rends the target with its hard gills. Power doubles if the user moves first."
  },
  {
    "name": "Liquidation",
    "type": "WATER",
    "cls": "Physical",
    "pow": 85,
    "acc": 100,
    "pp": 10,
    "desc": "The user slams into the target using a full-force blast of water. May lower the target's Defense."
  },
  {
    "name": "Dive",
    "type": "WATER",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "Diving on the first turn, the user rises and hits on the next turn. It can be used to dive in the ocean."
  },
  {
    "name": "Scald",
    "type": "WATER",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user shoots boiling hot water at its target. It may also leave the target with a burn."
  },
  {
    "name": "Snipe Shot",
    "type": "WATER",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user ignores any effects that redirect moves, allowing this move to hit the chosen target."
  },
  {
    "name": "Water Pledge",
    "type": "WATER",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "A column of water strikes the target. When combined with its fire equivalent, it makes a rainbow."
  },
  {
    "name": "Waterfall",
    "type": "WATER",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user charges at the target and may make it flinch. It can also be used to climb a waterfall."
  },
  {
    "name": "Razor Shell",
    "type": "WATER",
    "cls": "Physical",
    "pow": 75,
    "acc": 95,
    "pp": 10,
    "desc": "The user cuts the foe with sharp shells. It may also lower the target's Defense stat."
  },
  {
    "name": "Brine",
    "type": "WATER",
    "cls": "Special",
    "pow": 65,
    "acc": 100,
    "pp": 10,
    "desc": "If the target's HP is down to about half, this attack will hit with double the power."
  },
  {
    "name": "Bubble Beam",
    "type": "WATER",
    "cls": "Special",
    "pow": 65,
    "acc": 100,
    "pp": 20,
    "desc": "A spray of bubbles is forcefully ejected at the target. It may also lower its Speed stat."
  },
  {
    "name": "Octazooka",
    "type": "WATER",
    "cls": "Special",
    "pow": 65,
    "acc": 85,
    "pp": 10,
    "desc": "The user attacks by spraying ink in the foe's face or eyes. It may also lower the target's accuracy."
  },
  {
    "name": "Flip Turn",
    "type": "WATER",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 20,
    "desc": "After making its attack, the user rushes back to switch places with a party Pokémon in waiting."
  },
  {
    "name": "Water Pulse",
    "type": "WATER",
    "cls": "Special",
    "pow": 60,
    "acc": 100,
    "pp": 20,
    "desc": "The user attacks the target with a pulsing blast of water. It may also confuse the target."
  },
  {
    "name": "Aqua Jet",
    "type": "WATER",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 20,
    "desc": "The user lunges at the target at a speed that makes it almost invisible. It is sure to strike first."
  },
  {
    "name": "Bubble",
    "type": "WATER",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "A spray of countless bubbles is jetted at the opposing team. It may also lower the targets' Speed stats."
  },
  {
    "name": "Water Gun",
    "type": "WATER",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 25,
    "desc": "The target is blasted with a forceful shot of water."
  },
  {
    "name": "Clamp",
    "type": "WATER",
    "cls": "Physical",
    "pow": 35,
    "acc": 85,
    "pp": 15,
    "desc": "The target is clamped and squeezed by the user's very thick and sturdy shell for four to five turns."
  },
  {
    "name": "Whirlpool",
    "type": "WATER",
    "cls": "Special",
    "pow": 35,
    "acc": 85,
    "pp": 15,
    "desc": "Traps foes in a violent swirling whirlpool for four to five turns."
  },
  {
    "name": "Surging Strikes",
    "type": "WATER",
    "cls": "Physical",
    "pow": 25,
    "acc": 100,
    "pp": 5,
    "desc": "Hits three times in a row with mastery of the Water style. This attack always deals critical hits."
  },
  {
    "name": "Water Shuriken",
    "type": "WATER",
    "cls": "Special",
    "pow": 15,
    "acc": 100,
    "pp": 20,
    "desc": "The user hits the target with throwing stars 2-5 times in a row. This move always goes first."
  },
  {
    "name": "Aqua Ring",
    "type": "WATER",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user envelops itself in a veil made of water. It regains some HP on every turn."
  },
  {
    "name": "Life Dew",
    "type": "WATER",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user scatters mysterious water around and restores the HP of itself and its allies."
  },
  {
    "name": "Rain Dance",
    "type": "WATER",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "The user summons a heavy rain that falls for five turns, powering up Water-type moves."
  },
  {
    "name": "Soak",
    "type": "WATER",
    "cls": "Status",
    "pow": 0,
    "acc": 100,
    "pp": 20,
    "desc": "The user shoots a torrent of water at the target and changes the target's type to Water."
  },
  {
    "name": "Water Sport",
    "type": "WATER",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 15,
    "desc": "The user soaks itself with water. The move weakens Fire-type moves while the user is in the battle."
  },
  {
    "name": "Withdraw",
    "type": "WATER",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 40,
    "desc": "The user withdraws its body into its hard shell, raising its Defense stat."
  },
  {
    "name": "Swift",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 60,
    "acc": 0,
    "pp": 20,
    "desc": "Star-shaped rays are shot at the opposing team. This attack never misses."
  },
  {
    "name": "Star Shot",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "Charges up cosmic energy to release a shooting star."
  },
  {
    "name": "Orbital Laser",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 90,
    "acc": 95,
    "pp": 20,
    "desc": "Summons an intergalactic orbital laser, a large beam comes from the sky."
  },
  {
    "name": "Twilight Pulse",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 70,
    "acc": 95,
    "pp": 20,
    "desc": "Pulses a Bright Light that quickly turns dark. Has a 20% Chance to Flinch"
  },
  {
    "name": "Content Farm",
    "type": "ELECTRIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 7,
    "desc": "You revitalize your strength by making a new Video once a day."
  },
  {
    "name": "FOR YOU!!",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 100,
    "acc": 100,
    "pp": 10,
    "desc": "The target is attacked with a peculiar ray. It may also cause confusion."
  },
  {
    "name": "Astral Sign",
    "type": "COSMIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 30,
    "desc": "Raises attack or defense if self is targeted. Lowers attack or defense targeted another."
  },
  {
    "name": "Shell Burst",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 130,
    "acc": 100,
    "pp": 5,
    "desc": "Can only be used when Cosmic type. User loses Cosmic typing after use."
  },
  {
    "name": "Revaling Light",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "After dealing damage, reveal the target's held item."
  },
  {
    "name": "Poizap Dart",
    "type": "POISON",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 10,
    "desc": "If they move faster it has a chance of poisioning or paralysis, if it's slower it's a priority move with half the damage."
  },
  {
    "name": "Dire Claw",
    "type": "POISON",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user may critically hit with its ruinous claws. May also leave the target poisoned, paralyzed, or asleep."
  },
  {
    "name": "Springtide Storm",
    "type": "FAIRY",
    "cls": "Special",
    "pow": 100,
    "acc": 80,
    "pp": 5,
    "desc": "The user wraps winds of fierce emotion around opponents. This may lower their Attack stats."
  },
  {
    "name": "Raging Fury",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 10,
    "desc": "The user rampages around spewing flames for two to three turns. The user then becomes confused."
  },
  {
    "name": "Wave Crash",
    "type": "WATER",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 10,
    "desc": "The user shrouds itself in water and slams into the target. This also damages the user."
  },
  {
    "name": "Chloroblast",
    "type": "GRASS",
    "cls": "Special",
    "pow": 150,
    "acc": 95,
    "pp": 5,
    "desc": "The user launches its amassed chlorophyll to inflict damage on the target. This also damages the user."
  },
  {
    "name": "Mountain Gale",
    "type": "ICE",
    "cls": "Physical",
    "pow": 100,
    "acc": 85,
    "pp": 10,
    "desc": "The user hurls giant chunks of ice at the target. This may also make the target flinch."
  },
  {
    "name": "Headlong Rush",
    "type": "GROUND",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 5,
    "desc": "The user rams into the target in a full-body tackle. This lowers the user’s Defense and Sp. Def stats."
  },
  {
    "name": "Barb Barrage",
    "type": "POISON",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 10,
    "desc": "Fires toxic barbs which may poison the target. Power is doubled if the target is poisoned."
  },
  {
    "name": "Esper Wing",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user slashes with aura-enriched wings which boosts its Speed stat. Critical hits land more easily."
  },
  {
    "name": "Bitter Malice",
    "type": "GHOST",
    "cls": "Special",
    "pow": 75,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks the target with spine-chilling resentment. This also lowers the target’s Attack stat."
  },
  {
    "name": "Triple Arrows",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user fires arrows which may lower the target’s Defense or make it flinch. Critical hits land more easily."
  },
  {
    "name": "Bleakwind Storm",
    "type": "FLYING",
    "cls": "Special",
    "pow": 100,
    "acc": 80,
    "pp": 10,
    "desc": "The user attacks with cold winds that cause opposing Pokémon to tremble. This may lower their Speed stats."
  },
  {
    "name": "Wildbolt Storm",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 100,
    "acc": 80,
    "pp": 10,
    "desc": "The user attacks opposing Pokémon with a thunderous tempest. This may also leave them paralyzed."
  },
  {
    "name": "Sandsear Storm",
    "type": "GROUND",
    "cls": "Special",
    "pow": 100,
    "acc": 80,
    "pp": 10,
    "desc": "The user wraps fierce winds and hot sand around opponents. This may leave them with a burn."
  },
  {
    "name": "Lunar Blessing",
    "type": "COSMIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 5,
    "desc": "The user is blessed by the moon, restoring HP and curing status conditions of itself and allies."
  },
  {
    "name": "Psyshield Bash",
    "type": "PSYCHIC",
    "cls": "Physical",
    "pow": 70,
    "acc": 90,
    "pp": 10,
    "desc": "Cloaking itself in psychic energy, the user slams into the target. This raises the user’s Defense."
  },
  {
    "name": "Power Shift",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user swaps its Attack and Defense stats."
  },
  {
    "name": "Stone Axe",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 65,
    "acc": 90,
    "pp": 15,
    "desc": "The user swings at the opponent with its stone axes. May leave floating rocks around the target."
  },
  {
    "name": "Mystical Power",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 70,
    "acc": 90,
    "pp": 10,
    "desc": "The user attacks by emitting a mysterious power. This also boosts the user’s Sp. Atk stat."
  },
  {
    "name": "Victory Dance",
    "type": "FIGHTING",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user performs an intense dance to usher in victory, raising its Attack, Defense, and Speed."
  },
  {
    "name": "Shelter",
    "type": "STEEL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user makes its skin as hard as an iron shield, sharply boosting its Defense stat."
  },
  {
    "name": "Infernal Parade",
    "type": "GHOST",
    "cls": "Special",
    "pow": 60,
    "acc": 100,
    "pp": 15,
    "desc": "Hurls fireballs which may cause burns. Power is doubled if the target has a status condition."
  },
  {
    "name": "Ceaseless Edge",
    "type": "DARK",
    "cls": "Physical",
    "pow": 65,
    "acc": 90,
    "pp": 15,
    "desc": "The user slashes the opponent with its shell blade. May leave spikes around the target."
  },
  {
    "name": "Take Heart",
    "type": "PSYCHIC",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user lifts its spirits, curing its own status conditions and boosting its Sp. Atk and Sp. Def stats."
  },
  {
    "name": "Aqua Cutter",
    "type": "WATER",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "The user expels pressurized water to cut at the target like a blade. Critical hits land more easily."
  },
  {
    "name": "Aqua Step",
    "type": "WATER",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks the target using light and fluid dance steps. This also boosts the user’s Speed stat."
  },
  {
    "name": "Armor Cannon",
    "type": "FIRE",
    "cls": "Special",
    "pow": 120,
    "acc": 100,
    "pp": 5,
    "desc": "The user shoots its own armor out as blazing projectiles. This lowers the user’s Defense and Sp. Def."
  },
  {
    "name": "Axe Kick",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 120,
    "acc": 90,
    "pp": 10,
    "desc": "Performs a downward kick which may confuse the target. The user takes damage if it misses."
  },
  {
    "name": "Bitter Blade",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "A spiteful slashing attack. The user’s HP is restored by up to half the damage taken by the target."
  },
  {
    "name": "Blazing Torque",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "This move is only used by a Starmobile. It may leave the target with a burn."
  },
  {
    "name": "Chilling Water",
    "type": "WATER",
    "cls": "Special",
    "pow": 50,
    "acc": 100,
    "pp": 20,
    "desc": "The user showers the target with frigid water. This also lowers the target's Attack stat."
  },
  {
    "name": "Chilly Reception",
    "type": "ICE",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user tells a chillingly bad joke and switches out. This summons a snowstorm lasting five turns."
  },
  {
    "name": "Collision Course",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "A massive prehistoric explosion. This move’s power is boosted more than usual if it’s a supereffective hit."
  },
  {
    "name": "Combat Torque",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 10,
    "desc": "This move is only used by a Starmobile. It may paralyze the target."
  },
  {
    "name": "Comeuppance",
    "type": "DARK",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 10,
    "desc": "The user retaliates with much greater force against the opponent that last inflicted damage on it."
  },
  {
    "name": "Doodle",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": 100,
    "pp": 10,
    "desc": "The user captures a quick sketch, changing the Abilities of the user and its allies to the target's."
  },
  {
    "name": "Double Shock",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks by discharging all of its electricity. The user will no longer be Electric type."
  },
  {
    "name": "Electro Drift",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "A futuristic electric strike. This move’s power is boosted more than usual if it’s a supereffective hit."
  },
  {
    "name": "Fillet Away",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user sharply boosts its Attack, Sp. Atk, and Speed stats by using its own HP."
  },
  {
    "name": "Flower Trick",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 70,
    "acc": "—",
    "pp": 10,
    "desc": "The user throws a rigged bouquet of flowers at the target, which always hits and lands a critical hit."
  },
  {
    "name": "Gigaton Hammer",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 160,
    "acc": 100,
    "pp": 5,
    "desc": "The user attacks with its huge hammer. This move can’t be used twice in a row."
  },
  {
    "name": "Glaive Rush",
    "type": "DRAGON",
    "cls": "Physical",
    "pow": 120,
    "acc": 100,
    "pp": 5,
    "desc": "The user becomes highly vulnerable to attacks until its next turn after using this move."
  },
  {
    "name": "Hyper Drill",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "The user spins the pointed part of its body at high speed to pierce the target, ignoring protections."
  },
  {
    "name": "Ice Spinner",
    "type": "ICE",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user spins into the target with feet covered in thin ice. This also destroys the terrain."
  },
  {
    "name": "Jet Punch",
    "type": "WATER",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 15,
    "desc": "The user summons a torrent around its fist and punches at blinding speed. Always goes first."
  },
  {
    "name": "Kowtow Cleave",
    "type": "DARK",
    "cls": "Physical",
    "pow": 85,
    "acc": 0,
    "pp": 10,
    "desc": "The user kowtows to make the target lower its guard, then slashes. This attack never misses."
  },
  {
    "name": "Last Respects",
    "type": "GHOST",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks to avenge its allies. The move’s power increases for each defeated ally."
  },
  {
    "name": "Lumina Crash",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks by unleashing a peculiar, mind-bending light that harshly lowers the target’s Sp. Def."
  },
  {
    "name": "Magical Torque",
    "type": "FAIRY",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 10,
    "desc": "This move is only used by a Starmobile. It may confuse the target."
  },
  {
    "name": "Make It Rain",
    "type": "STEEL",
    "cls": "Special",
    "pow": 120,
    "acc": 100,
    "pp": 5,
    "desc": "The user throws out a huge mass of coins, lowering its Sp. Atk stat. Money is earned after the battle."
  },
  {
    "name": "Mortal Spin",
    "type": "POISON",
    "cls": "Physical",
    "pow": 30,
    "acc": 100,
    "pp": 15,
    "desc": "Performs a spin that eliminates certain traps and hazards. This also poisons opposing Pokémon."
  },
  {
    "name": "Noxious Torque",
    "type": "POISON",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 10,
    "desc": "This move is only used by a Starmobile. It may poison the target."
  },
  {
    "name": "Order Up",
    "type": "DRAGON",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "If used when the user has a Tatsugiri in its mouth, a boost occurs based on its form."
  },
  {
    "name": "Population Bomb",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 20,
    "acc": 90,
    "pp": 10,
    "desc": "The user’s fellows gather in droves to perform a combo attack that hits one to ten times in a row."
  },
  {
    "name": "Pounce",
    "type": "BUG",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 20,
    "desc": "The user attacks by pouncing on the target. This also lowers the target’s Speed stat."
  },
  {
    "name": "Rage Fist",
    "type": "GHOST",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 10,
    "desc": "The user converts its rage into energy to attack. The move’s power increases every time the user is hit."
  },
  {
    "name": "Raging Bull",
    "type": "NORMAL",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "The user charges and destroys enemy barriers. This move’s type depends on the user’s form."
  },
  {
    "name": "Revival Blessing",
    "type": "LIGHT",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 1,
    "desc": "The user revives a party Pokémon that has fainted and restores half their max HP."
  },
  {
    "name": "Ruination",
    "type": "DARK",
    "cls": "Special",
    "pow": 1,
    "acc": 90,
    "pp": 10,
    "desc": "The user summons a ruinous disaster. This cuts the target’s HP in half."
  },
  {
    "name": "Salt Cure",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 15,
    "desc": "The user salt cures the target, inflicting damage every turn. Steel and Water types take more damage."
  },
  {
    "name": "Shed Tail",
    "type": "NORMAL",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "The user creates a substitute and switches places with a party Pokémon in waiting."
  },
  {
    "name": "Silk Trap",
    "type": "BUG",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "User spins a silken trap to protect itself. Lowers the Speed of any that make direct contact."
  },
  {
    "name": "Snowscape",
    "type": "ICE",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "Summons a five-turn snowstorm that boosts the Defense of Ice-type Pokémon."
  },
  {
    "name": "Spicy Extract",
    "type": "GRASS",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 15,
    "desc": "Emits a spicy extract which raises the target’s Attack and lowers Defense by two stages each."
  },
  {
    "name": "Spin Out",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "The user inflicts damage on the target with a furious spin. This harshly lowers the user’s Speed."
  },
  {
    "name": "Tidy Up",
    "type": "NORMAL",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "Clears hazards and substitutes from the field. This also boosts the user’s Attack and Speed."
  },
  {
    "name": "Torch Song",
    "type": "FIRE",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "The user blows out raging flames as if singing a song. This also boosts the user’s Sp. Atk stat."
  },
  {
    "name": "Trailblaze",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 20,
    "desc": "The user attacks suddenly as if leaping out from tall grass. This boosts the user's Speed stat."
  },
  {
    "name": "Triple Dive",
    "type": "WATER",
    "cls": "Physical",
    "pow": 30,
    "acc": 95,
    "pp": 10,
    "desc": "The user performs a perfectly timed triple dive, hitting the target three times in a row."
  },
  {
    "name": "Twin Beam",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 10,
    "desc": "The user shoots mystical beams from its eyes to inflict damage. The target is hit twice in a row."
  },
  {
    "name": "Wicked Torque",
    "type": "DARK",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "This move is only used by a Starmobile. It may put the target to sleep."
  },
  {
    "name": "Hydro Steam",
    "type": "WATER",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user blasts the target with boiling-hot water whose power is boosted in harsh sunlight."
  },
  {
    "name": "Psyblade",
    "type": "PSYCHIC",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user rends the target with an ethereal blade whose power is boosted on Electric Terrain."
  },
  {
    "name": "Blood Moon",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 140,
    "acc": 100,
    "pp": 5,
    "desc": "The user unleashes the full brunt of its spirit from a blood moon. This move can't be used twice in a row."
  },
  {
    "name": "Matcha Gotcha",
    "type": "GRASS",
    "cls": "Special",
    "pow": 80,
    "acc": 90,
    "pp": 15,
    "desc": "Blasts opponents with hot tea. Heals the user by half the damage dealt and may also burn targets."
  },
  {
    "name": "Syrup Bomb",
    "type": "GRASS",
    "cls": "Special",
    "pow": 60,
    "acc": 85,
    "pp": 10,
    "desc": "An explosion of sticky candy syrup, which drop the target's Speed stat each turn for three turns."
  },
  {
    "name": "Ivy Cudgel",
    "type": "GRASS",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 10,
    "desc": "An ivy-wrapped cudgel strike with a high critical-hit ratio. Type changes based on the user's Mask."
  },
  {
    "name": "Electro Shot",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 130,
    "acc": 100,
    "pp": 10,
    "desc": "A two-turn attack. The user boosts its Sp. Atk and then fires a high-voltage shot."
  },
  {
    "name": "Tera Starstorm",
    "type": "NORMAL",
    "cls": "Special",
    "pow": 120,
    "acc": 100,
    "pp": 5,
    "desc": "When used by Terapagos in its Stellar Form, this move damages all opposing Pokémon."
  },
  {
    "name": "Fickle Beam",
    "type": "DRAGON",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 5,
    "desc": "Sometimes all of the user's heads shoot beams in unison, doubling this move's power."
  },
  {
    "name": "Burning Bulwark",
    "type": "FIRE",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 10,
    "desc": "Protects the user from attacks. Also burns any attacker that makes contact with the user."
  },
  {
    "name": "Thunderclap",
    "type": "ELECTRIC",
    "cls": "Special",
    "pow": 70,
    "acc": 100,
    "pp": 5,
    "desc": "This move enables the user to attack first. It fails if the target is not readying an attack, however."
  },
  {
    "name": "Mighty Cleave",
    "type": "ROCK",
    "cls": "Physical",
    "pow": 95,
    "acc": 100,
    "pp": 5,
    "desc": "The user cleaves the target. This move hits even if the target protects itself."
  },
  {
    "name": "Tachyon Cutter",
    "type": "STEEL",
    "cls": "Special",
    "pow": 50,
    "acc": "—",
    "pp": 10,
    "desc": "The user attacks by launching particle blades at the target twice in a row. This attack never misses."
  },
  {
    "name": "Hard Press",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 1,
    "acc": 100,
    "pp": 10,
    "desc": "The target is crushed with great force. The attack is more powerful the more HP the target has left."
  },
  {
    "name": "Dragon Cheer",
    "type": "DRAGON",
    "cls": "Status",
    "pow": "—",
    "acc": "—",
    "pp": 15,
    "desc": "The user raises its allies’ critical hit ratio with a draconic cry. This rouses Dragon types more."
  },
  {
    "name": "Alluring Voice",
    "type": "FAIRY",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "Attacks using an angelic voice. This confuses the target if its stats have been raised this turn."
  },
  {
    "name": "Temper Flare",
    "type": "FIRE",
    "cls": "Physical",
    "pow": 75,
    "acc": 100,
    "pp": 10,
    "desc": "The user attacks driven by frustration. Power increases if the user's previous move failed."
  },
  {
    "name": "Supercell Slam",
    "type": "ELECTRIC",
    "cls": "Physical",
    "pow": 100,
    "acc": 95,
    "pp": 15,
    "desc": "The user drops onto the target with its electrified body. If it misses, the user is hurt instead."
  },
  {
    "name": "Psychic Noise",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 75,
    "acc": 100,
    "pp": 10,
    "desc": "Attacks the target with unpleasant sound waves. Prevents the target from healing for two turns."
  },
  {
    "name": "Upper Hand",
    "type": "FIGHTING",
    "cls": "Physical",
    "pow": 65,
    "acc": 100,
    "pp": 15,
    "desc": "An attack that hits first and makes the target flinch. Fails if the target isn't using a high priority move."
  },
  {
    "name": "Malignant Chain",
    "type": "POISON",
    "cls": "Special",
    "pow": 100,
    "acc": 100,
    "pp": 5,
    "desc": "Wraps the target in a toxic, corrosive chain. This may also leave the target badly poisoned."
  },
  {
    "name": "Nihil Light",
    "type": "DRAGON",
    "cls": "Special",
    "pow": 200,
    "acc": 100,
    "pp": 10,
    "desc": "A powerful light that defies nature, striking Fairy types and ignoring target stat changes."
  },
  {
    "name": "Full Moon Bind",
    "type": "COSMIC",
    "cls": "Physical",
    "pow": 15,
    "acc": 90,
    "pp": 15,
    "desc": "Binds the target in moonlight for five turns, draining its HP each turn. The user absorbs the damage dealt."
  },
  {
    "name": "Star Seeker",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 60,
    "acc": 100,
    "pp": 15,
    "desc": "A seeking star strikes the target. If it switches out, half the damage hits the Pokémon that replaces it."
  },
  {
    "name": "Space Dust",
    "type": "COSMIC",
    "cls": "Physical",
    "pow": 55,
    "acc": 95,
    "pp": 15,
    "desc": "The user flings cosmic dust at the target. This may also lower the target's accuracy."
  },
  {
    "name": "Phaser",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 15,
    "acc": 100,
    "pp": 25,
    "desc": "The user fires a beam of phased energy. This may also leave the target with paralysis."
  },
  {
    "name": "Eclipse Strike",
    "type": "COSMIC",
    "cls": "Physical",
    "pow": 75,
    "acc": 100,
    "pp": 10,
    "desc": "The user strikes from the shadow of an eclipse. Power doubles if the user's last move missed."
  },
  {
    "name": "Gamma Charge",
    "type": "COSMIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 20,
    "desc": "The user absorbs gamma rays to raise its Sp. Atk and Sp. Def stats."
  },
  {
    "name": "Starstorm",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 25,
    "acc": 100,
    "pp": 30,
    "desc": "Stars rain down two to five times, ignoring Reflect, Light Screen, Aurora Veil and substitutes."
  },
  {
    "name": "Zero Gravity",
    "type": "COSMIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "Gravity vanishes for four turns, reversing every Pokémon's Speed stat. Fails while Gravity is in effect."
  },
  {
    "name": "Galactic Nebula",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 110,
    "acc": 80,
    "pp": 5,
    "desc": "The user engulfs the target in a swirling nebula of cosmic gas."
  },
  {
    "name": "Tractor Beam",
    "type": "COSMIC",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 5,
    "desc": "Locks the target in a tractor beam so it can't escape. The user's next move against it can't miss."
  },
  {
    "name": "Revealing Light",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "After dealing damage, reveal the target's held item."
  },
  {
    "name": "R.G.Beam",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 85,
    "acc": 100,
    "pp": 15,
    "desc": "The user fires a red-green beam of light."
  },
  {
    "name": "Shining Burst",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 80,
    "acc": 95,
    "pp": 15,
    "desc": "The user releases stored light. Damage is calculated using the user's Sp. Def instead of its Sp. Atk."
  },
  {
    "name": "Rainbow Bolt",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 120,
    "acc": 70,
    "pp": 5,
    "desc": "A bolt of rainbow light strikes the target. It can't miss in rain."
  },
  {
    "name": "Chi Blast",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 30,
    "acc": 100,
    "pp": 20,
    "desc": "Hits once more with each consecutive use, up to six. Each hit may lower the target's Sp. Atk."
  },
  {
    "name": "Bright Cannon",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 120,
    "acc": 70,
    "pp": 5,
    "desc": "The user fires a powerful cannon of light."
  },
  {
    "name": "Warming Light",
    "type": "LIGHT",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "A gentle, warm light restores a little HP to the user and its allies."
  },
  {
    "name": "Cleansing Light",
    "type": "LIGHT",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "A purifying light cures the user or an ally of sleep, burn, freezing, paralysis or poison."
  },
  {
    "name": "Radiant Blessing",
    "type": "LIGHT",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user gives up half its HP. When it faints, the next Pokémon sent out has all its stats raised."
  },
  {
    "name": "Eternal Aura",
    "type": "LIGHT",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 1,
    "desc": "For three turns, super effective hits on the user's side become not very effective."
  },
  {
    "name": "Prism Punch",
    "type": "LIGHT",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 25,
    "desc": "The user strikes with a fist that refracts light like a prism."
  },
  {
    "name": "Divine Slash",
    "type": "LIGHT",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 20,
    "desc": "A holy slash that ignores any changes to the target's defensive stats."
  },
  {
    "name": "Shine Fang",
    "type": "LIGHT",
    "cls": "Physical",
    "pow": 80,
    "acc": 100,
    "pp": 15,
    "desc": "The user bites with glowing fangs. This may also lower the target's Speed stat."
  },
  {
    "name": "Flash Step",
    "type": "LIGHT",
    "cls": "Physical",
    "pow": 50,
    "acc": 100,
    "pp": 20,
    "desc": "The user moves in a flash of light. It strikes twice if it moves before the target."
  },
  {
    "name": "Duality",
    "type": "LIGHT",
    "cls": "Physical",
    "pow": 100,
    "acc": 100,
    "pp": 10,
    "desc": "Every turn this move type changes to dark and vice versa. Light -> Dark ->"
  },
  {
    "name": "Crystalize",
    "type": "ROCK",
    "cls": "Special",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "The user crystalizes the air around the target. This move is super effective against Rock types."
  },
  {
    "name": "Fantasia Blast",
    "type": "FAIRY",
    "cls": "Special",
    "pow": 95,
    "acc": 100,
    "pp": 15,
    "desc": "A dreamlike blast of fairy energy. This may also lower the target's Sp. Atk stat."
  },
  {
    "name": "Happily Ever After",
    "type": "FAIRY",
    "cls": "Special",
    "pow": 55,
    "acc": 95,
    "pp": 15,
    "desc": "The user moves last. Its power doubles if the user wasn't attacked this turn."
  },
  {
    "name": "Cupid's Bow",
    "type": "FAIRY",
    "cls": "Physical",
    "pow": 50,
    "acc": 90,
    "pp": 10,
    "desc": "The user fires a heart-tipped arrow. This may make the target fall in love, regardless of gender."
  },
  {
    "name": "Mood Swing",
    "type": "PSYCHIC",
    "cls": "Special",
    "pow": 85,
    "acc": 100,
    "pp": 10,
    "desc": "Kamoleon's mood bursts out. Unhappy: taunts the target. Normal: torments it. Happy: blocks its items."
  },
  {
    "name": "Cleansing Flames",
    "type": "FIRE",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 10,
    "desc": "Purifying flames strike the targets and cure their status conditions, except burns."
  },
  {
    "name": "Sonar Ping",
    "type": "WATER",
    "cls": "Special",
    "pow": 50,
    "acc": 0,
    "pp": 10,
    "desc": "Pings the target with sonar. It never misses, and its power doubles with each consecutive use, up to 200."
  },
  {
    "name": "Divine Gift",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 80,
    "acc": 100,
    "pp": 10,
    "desc": "A Grass/Light technique that raises a random stat of the user."
  },
  {
    "name": "Supernova",
    "type": "COSMIC",
    "cls": "Physical",
    "pow": 120,
    "acc": 95,
    "pp": 5,
    "desc": "The user explodes with stellar force, hitting all foes. The recoil harshly lowers the user's Attack."
  },
  {
    "name": "Lightspeed Dash",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 70,
    "acc": 100,
    "pp": 20,
    "desc": "The user dashes at the speed of light, then raises its Speed stat."
  },
  {
    "name": "Astro Jab",
    "type": "COSMIC",
    "cls": "Physical",
    "pow": 90,
    "acc": 100,
    "pp": 15,
    "desc": "The user jabs with a star-charged strike. This may also lower the target's Defense stat."
  },
  {
    "name": "Stellar Blade",
    "type": "COSMIC",
    "cls": "Physical",
    "pow": 100,
    "acc": 90,
    "pp": 5,
    "desc": "The user slashes with a blade of starlight. This move is super effective against Cosmic types."
  },
  {
    "name": "EDL",
    "type": "COSMIC",
    "cls": "Physical",
    "pow": 60,
    "acc": 100,
    "pp": 10,
    "desc": "A strange cosmic strike. It has a 10% chance each to burn, paralyze, or freeze the target."
  },
  {
    "name": "Antimatter Cannon",
    "type": "COSMIC",
    "cls": "Special",
    "pow": 130,
    "acc": 90,
    "pp": 5,
    "desc": "Fires a blast of antimatter, charged by draining 5 PP at random from the user's other moves."
  },
  {
    "name": "Light Sphere",
    "type": "LIGHT",
    "cls": "Special",
    "pow": 60,
    "acc": 100,
    "pp": 20,
    "desc": "The user hurls a sphere of dazzling light."
  },
  {
    "name": "Smite",
    "type": "LIGHT",
    "cls": "Physical",
    "pow": 70,
    "acc": 100,
    "pp": 15,
    "desc": "A righteous strike. Its power rises if the target is the last Pokémon on its team."
  },
  {
    "name": "Sparkling Aegis",
    "type": "LIGHT",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user cloaks itself in a sparkling shield, raising its Attack and Sp. Def stats."
  },
  {
    "name": "Bright Blade",
    "type": "LIGHT",
    "cls": "Physical",
    "pow": 120,
    "acc": 80,
    "pp": 5,
    "desc": "The user slashes with a blade of pure light. It can't miss in harsh sunlight."
  },
  {
    "name": "Overcook",
    "type": "FAIRY",
    "cls": "Status",
    "pow": 0,
    "acc": 0,
    "pp": 10,
    "desc": "The user overcooks itself, losing half its HP to maximize its Defense and gain the Fire type."
  },
  {
    "name": "Head Bonk",
    "type": "STEEL",
    "cls": "Physical",
    "pow": 100,
    "acc": 90,
    "pp": 15,
    "desc": "The user slams its head into the target. Both the user and the target become confused."
  },
  {
    "name": "Aether Strike",
    "type": "FAIRY",
    "cls": "Physical",
    "pow": 40,
    "acc": 100,
    "pp": 30,
    "desc": "The user strikes with a burst of aether."
  },
  {
    "name": "Rewind Beam",
    "type": "ROCK",
    "cls": "Special",
    "pow": 90,
    "acc": 100,
    "pp": 15,
    "desc": "A beam that turns back time on the target, undoing its most recent stat boost."
  }
];

  // ---- Abilities ---------------------------------------------------------
  const ABILITIES = [
  {
    "name": "Gaia Guardian",
    "desc": "On entering battle, swaps its Attack and Speed stats."
  },
  {
    "name": "Stench",
    "desc": "The stench may cause the target to flinch."
  },
  {
    "name": "Drizzle",
    "desc": "The Pokémon makes it rain if it appears in battle."
  },
  {
    "name": "Speed Boost",
    "desc": "Its Speed stat is gradually boosted."
  },
  {
    "name": "Battle Armor",
    "desc": "The Pokémon is protected against critical hits."
  },
  {
    "name": "Sturdy",
    "desc": "It cannot be knocked out with one hit."
  },
  {
    "name": "Damp",
    "desc": "Prevents the use of self-destructing moves."
  },
  {
    "name": "Limber",
    "desc": "The Pokémon is protected from paralysis."
  },
  {
    "name": "Sand Veil",
    "desc": "Boosts the Pokémon's evasion in a sandstorm."
  },
  {
    "name": "Static",
    "desc": "Contact with the Pokémon may cause paralysis."
  },
  {
    "name": "Volt Absorb",
    "desc": "Restores HP if hit by an Electric-type move."
  },
  {
    "name": "Water Absorb",
    "desc": "Restores HP if hit by a Water-type move."
  },
  {
    "name": "Oblivious",
    "desc": "Prevents it from becoming infatuated."
  },
  {
    "name": "Cloud Nine",
    "desc": "Eliminates the effects of weather."
  },
  {
    "name": "Compound Eyes",
    "desc": "The Pokémon's accuracy is boosted."
  },
  {
    "name": "Insomnia",
    "desc": "Prevents the Pokémon from falling asleep."
  },
  {
    "name": "Color Change",
    "desc": "Changes the Pokémon's type to the foe's move."
  },
  {
    "name": "Immunity",
    "desc": "Prevents the Pokémon from getting poisoned."
  },
  {
    "name": "Flash Fire",
    "desc": "It powers up Fire-type moves if it's hit by one."
  },
  {
    "name": "Shield Dust",
    "desc": "Blocks the added effects of attacks taken."
  },
  {
    "name": "Own Tempo",
    "desc": "Prevents the Pokémon from becoming confused."
  },
  {
    "name": "Suction Cups",
    "desc": "Negates all moves that force switching out."
  },
  {
    "name": "Intimidate",
    "desc": "Lowers the foe's Attack stat."
  },
  {
    "name": "Shadow Tag",
    "desc": "Prevents the foe from escaping."
  },
  {
    "name": "Rough Skin",
    "desc": "Inflicts damage to the foe on contact."
  },
  {
    "name": "Wonder Guard",
    "desc": "Only super-effective moves will hit."
  },
  {
    "name": "Levitate",
    "desc": "Gives full immunity to all Ground-type moves."
  },
  {
    "name": "Effect Spore",
    "desc": "Contact may poison or cause paralysis or sleep."
  },
  {
    "name": "Synchronize",
    "desc": "Passes a burn, poison, or paralysis to the foe."
  },
  {
    "name": "Clear Body",
    "desc": "Prevents other Pokémon from lowering its stats."
  },
  {
    "name": "Natural Cure",
    "desc": "All status problems heal when it switches out."
  },
  {
    "name": "Lightning Rod",
    "desc": "Draws in all Electric-type moves to up Sp. Attack."
  },
  {
    "name": "Serene Grace",
    "desc": "Boosts the likelihood of added effects appearing."
  },
  {
    "name": "Swift Swim",
    "desc": "Boosts the Pokémon's Speed in rain."
  },
  {
    "name": "Chlorophyll",
    "desc": "Boosts the Pokémon's Speed in sunshine."
  },
  {
    "name": "Illuminate",
    "desc": "Raises the likelihood of meeting wild Pokémon."
  },
  {
    "name": "Trace",
    "desc": "The Pokémon copies a foe's Ability."
  },
  {
    "name": "Huge Power",
    "desc": "Raises the Pokémon's Attack stat."
  },
  {
    "name": "Poison Point",
    "desc": "Contact with the Pokémon may poison the attacker."
  },
  {
    "name": "Inner Focus",
    "desc": "The Pokémon is protected from flinching."
  },
  {
    "name": "Magma Armor",
    "desc": "Prevents the Pokémon from becoming frozen."
  },
  {
    "name": "Water Veil",
    "desc": "Prevents the Pokémon from getting a burn."
  },
  {
    "name": "Magnet Pull",
    "desc": "Prevents Steel-type Pokémon from escaping."
  },
  {
    "name": "Soundproof",
    "desc": "Gives full immunity to all sound-based moves."
  },
  {
    "name": "Rain Dish",
    "desc": "The Pokémon gradually regains HP in rain."
  },
  {
    "name": "Sand Stream",
    "desc": "The Pokémon summons a sandstorm in battle."
  },
  {
    "name": "Pressure",
    "desc": "The Pokémon raises the foe's PP usage."
  },
  {
    "name": "Thick Fat",
    "desc": "Ups resistance to Fire- and Ice-type moves."
  },
  {
    "name": "Early Bird",
    "desc": "The Pokémon awakens quickly from sleep."
  },
  {
    "name": "Flame Body",
    "desc": "Contact with the Pokémon may burn the attacker."
  },
  {
    "name": "Run Away",
    "desc": "Enables a sure getaway from wild Pokémon."
  },
  {
    "name": "Keen Eye",
    "desc": "Prevents other Pokémon from lowering accuracy."
  },
  {
    "name": "Hyper Cutter",
    "desc": "Prevents other Pokémon from lowering Attack stat."
  },
  {
    "name": "Pickup",
    "desc": "The Pokémon may pick up items."
  },
  {
    "name": "Truant",
    "desc": "Pokémon can't attack on consecutive turns."
  },
  {
    "name": "Hustle",
    "desc": "Boosts the Attack stat, but lowers accuracy."
  },
  {
    "name": "Cute Charm",
    "desc": "Contact with the Pokémon may cause infatuation."
  },
  {
    "name": "Plus",
    "desc": "Ups Sp. Atk if another Pokémon has Plus or Minus."
  },
  {
    "name": "Minus",
    "desc": "Ups Sp. Atk if another Pokémon has Plus or Minus."
  },
  {
    "name": "Forecast",
    "desc": "Castform transforms with the weather."
  },
  {
    "name": "Sticky Hold",
    "desc": "Protects the Pokémon from item theft."
  },
  {
    "name": "Shed Skin",
    "desc": "The Pokémon may heal its own status problems."
  },
  {
    "name": "Guts",
    "desc": "Boosts Attack if there is a status problem."
  },
  {
    "name": "Marvel Scale",
    "desc": "Ups Defense if there is a status problem."
  },
  {
    "name": "Liquid Ooze",
    "desc": "Damages attackers using any draining move."
  },
  {
    "name": "Overgrow",
    "desc": "Powers up Grass-type moves in a pinch.",
    "mons": [
      "001",
      "002",
      "003"
    ]
  },
  {
    "name": "Blaze",
    "desc": "Powers up Fire-type moves in a pinch."
  },
  {
    "name": "Torrent",
    "desc": "Powers up Water-type moves in a pinch."
  },
  {
    "name": "Swarm",
    "desc": "Powers up Bug-type moves in a pinch."
  },
  {
    "name": "Rock Head",
    "desc": "Protects the Pokémon from recoil damage."
  },
  {
    "name": "Drought",
    "desc": "Turns the sunlight harsh if it is in battle."
  },
  {
    "name": "Arena Trap",
    "desc": "Prevents the foe from fleeing."
  },
  {
    "name": "Vital Spirit",
    "desc": "Prevents the Pokémon from falling asleep."
  },
  {
    "name": "White Smoke",
    "desc": "Prevents other Pokémon from lowering its stats."
  },
  {
    "name": "Pure Power",
    "desc": "Raises the Pokémon's Attack stat."
  },
  {
    "name": "Shell Armor",
    "desc": "The Pokémon is protected against critical hits."
  },
  {
    "name": "Air Lock",
    "desc": "Eliminates the effects of weather."
  },
  {
    "name": "Tangled Feet",
    "desc": "Raises evasion if the Pokémon is confused."
  },
  {
    "name": "Motor Drive",
    "desc": "Raises Speed if hit by an Electric-type move."
  },
  {
    "name": "Rivalry",
    "desc": "Deals more damage to a foe of the same gender."
  },
  {
    "name": "Steadfast",
    "desc": "Raises Speed each time the Pokémon flinches."
  },
  {
    "name": "Snow Cloak",
    "desc": "Raises evasion in a hailstorm."
  },
  {
    "name": "Gluttony",
    "desc": "Encourages the early use of a held Berry."
  },
  {
    "name": "Anger Point",
    "desc": "Maxes Attack after taking a critical hit."
  },
  {
    "name": "Unburden",
    "desc": "Raises Speed if a held item is used."
  },
  {
    "name": "Heatproof",
    "desc": "Weakens the power of Fire-type moves."
  },
  {
    "name": "Simple",
    "desc": "The Pokémon is prone to wild stat changes."
  },
  {
    "name": "Dry Skin",
    "desc": "Reduces HP if it is hot. Water restores HP."
  },
  {
    "name": "Download",
    "desc": "Adjusts power according to a foe's defenses."
  },
  {
    "name": "Iron Fist",
    "desc": "Boosts the power of punching moves."
  },
  {
    "name": "Poison Heal",
    "desc": "Restores HP if the Pokémon is poisoned."
  },
  {
    "name": "Adaptability",
    "desc": "Powers up moves of the same type."
  },
  {
    "name": "Skill Link",
    "desc": "Increases the frequency of multi-strike moves."
  },
  {
    "name": "Hydration",
    "desc": "Heals status problems if it is raining."
  },
  {
    "name": "Solar Power",
    "desc": "In sunshine, Sp. Atk is boosted but HP decreases."
  },
  {
    "name": "Quick Feet",
    "desc": "Boosts Speed if there is a status problem."
  },
  {
    "name": "Normalize",
    "desc": "All the Pokémon's moves become the Normal type."
  },
  {
    "name": "Sniper",
    "desc": "Powers up moves if they become critical hits."
  },
  {
    "name": "Magic Guard",
    "desc": "The Pokémon only takes damage from attacks."
  },
  {
    "name": "No Guard",
    "desc": "Ensures attacks by or against the Pokémon land."
  },
  {
    "name": "Stall",
    "desc": "The Pokémon moves after all other Pokémon do."
  },
  {
    "name": "Technician",
    "desc": "Powers up the Pokémon's weaker moves."
  },
  {
    "name": "Leaf Guard",
    "desc": "Prevents problems with status in sunny weather."
  },
  {
    "name": "Klutz",
    "desc": "The Pokémon can't use any held items."
  },
  {
    "name": "Mold Breaker",
    "desc": "Moves can be used regardless of Abilities."
  },
  {
    "name": "Super Luck",
    "desc": "Heightens the critical-hit ratios of moves."
  },
  {
    "name": "Aftermath",
    "desc": "Damages the attacker landing the finishing hit."
  },
  {
    "name": "Anticipation",
    "desc": "Senses a foe's dangerous moves."
  },
  {
    "name": "Forewarn",
    "desc": "Determines what moves a foe has."
  },
  {
    "name": "Unaware",
    "desc": "Ignores any stat changes in the Pokémon."
  },
  {
    "name": "Tinted Lens",
    "desc": "Powers up \"not very effective\" moves."
  },
  {
    "name": "Filter",
    "desc": "Reduces damage from super-effective attacks."
  },
  {
    "name": "Slow Start",
    "desc": "Temporarily halves Attack and Speed."
  },
  {
    "name": "Scrappy",
    "desc": "Enables moves to hit Ghost-type Pokémon."
  },
  {
    "name": "Storm Drain",
    "desc": "Draws in all Water-type moves to up Sp. Attack."
  },
  {
    "name": "Ice Body",
    "desc": "The Pokémon gradually regains HP in a hailstorm."
  },
  {
    "name": "Solid Rock",
    "desc": "Reduces damage from super-effective attacks."
  },
  {
    "name": "Snow Warning",
    "desc": "The Pokémon summons a hailstorm in battle."
  },
  {
    "name": "Honey Gather",
    "desc": "The Pokémon may gather Honey from somewhere."
  },
  {
    "name": "Frisk",
    "desc": "The Pokémon can check a foe's held item."
  },
  {
    "name": "Reckless",
    "desc": "Powers up moves that have recoil damage."
  },
  {
    "name": "Multitype",
    "desc": "Changes type to match the held Plate."
  },
  {
    "name": "Flower Gift",
    "desc": "Powers up party Pokémon when it is sunny."
  },
  {
    "name": "Bad Dreams",
    "desc": "Reduces a sleeping foe's HP."
  },
  {
    "name": "Pickpocket",
    "desc": "Steals an item when hit by another Pokémon."
  },
  {
    "name": "Sheer Force",
    "desc": "Removes added effects to increase move damage."
  },
  {
    "name": "Contrary",
    "desc": "Makes stat changes have an opposite effect."
  },
  {
    "name": "Unnerve",
    "desc": "Makes the foe nervous and unable to eat Berries."
  },
  {
    "name": "Defiant",
    "desc": "When its stats are lowered its Attack increases."
  },
  {
    "name": "Defeatist",
    "desc": "Lowers stats when HP becomes half or less."
  },
  {
    "name": "Cursed Body",
    "desc": "May disable a move used on the Pokémon."
  },
  {
    "name": "Healer",
    "desc": "May heal an ally's status conditions."
  },
  {
    "name": "Friend Guard",
    "desc": "Reduces damage done to allies."
  },
  {
    "name": "Weak Armor",
    "desc": "Physical attacks lower Defense and raise Speed."
  },
  {
    "name": "Heavy Metal",
    "desc": "Doubles the Pokémon's weight."
  },
  {
    "name": "Light Metal",
    "desc": "Halves the Pokémon's weight."
  },
  {
    "name": "Multiscale",
    "desc": "Reduces damage when HP is full."
  },
  {
    "name": "Toxic Boost",
    "desc": "Powers up physical attacks when poisoned."
  },
  {
    "name": "Flare Boost",
    "desc": "Powers up special attacks when burned."
  },
  {
    "name": "Harvest",
    "desc": "May create another Berry after one is used."
  },
  {
    "name": "Telepathy",
    "desc": "Anticipates an ally's attack and dodges it."
  },
  {
    "name": "Moody",
    "desc": "Raises one stat and lowers another."
  },
  {
    "name": "Overcoat",
    "desc": "Protects the Pokémon from damage from weather."
  },
  {
    "name": "Poison Touch",
    "desc": "May poison targets when a Pokémon makes contact."
  },
  {
    "name": "Regenerator",
    "desc": "Restores a little HP when withdrawn from battle."
  },
  {
    "name": "Big Pecks",
    "desc": "Protects from Defense-lowering attacks."
  },
  {
    "name": "Sand Rush",
    "desc": "Boosts the Pokémon's Speed in a sandstorm."
  },
  {
    "name": "Wonder Skin",
    "desc": "Makes status-changing moves more likely to miss."
  },
  {
    "name": "Analytic",
    "desc": "Boosts move power when the Pokémon moves last."
  },
  {
    "name": "Illusion",
    "desc": "Comes out disguised as the Pokémon in back."
  },
  {
    "name": "Imposter",
    "desc": "It transforms itself into the Pokémon it is facing."
  },
  {
    "name": "Infiltrator",
    "desc": "Passes through the foe's barrier and strikes."
  },
  {
    "name": "Mummy",
    "desc": "Contact with this Pokémon spreads this Ability."
  },
  {
    "name": "Moxie",
    "desc": "Boosts Attack after knocking out any Pokémon."
  },
  {
    "name": "Justified",
    "desc": "Raises Attack when hit by a Dark-type move."
  },
  {
    "name": "Rattled",
    "desc": "Some move types scare it and boost its Speed."
  },
  {
    "name": "Magic Bounce",
    "desc": "Reflects status-changing moves."
  },
  {
    "name": "Sap Sipper",
    "desc": "Boosts Attack when hit by a Grass-type move."
  },
  {
    "name": "Prankster",
    "desc": "Gives priority to a status move."
  },
  {
    "name": "Sand Force",
    "desc": "Boosts certain moves' power in a sandstorm."
  },
  {
    "name": "Iron Barbs",
    "desc": "Inflicts damage to the Pokémon on contact."
  },
  {
    "name": "Zen Mode",
    "desc": "Changes the Pokémon's shape when HP is halved."
  },
  {
    "name": "Victory Star",
    "desc": "Boosts the accuracy of its allies and itself."
  },
  {
    "name": "Turboblaze",
    "desc": "Moves can be used regardless of Abilities."
  },
  {
    "name": "Teravolt",
    "desc": "Moves can be used regardless of Abilities."
  },
  {
    "name": "Aroma Veil",
    "desc": "Protects against attacks that limit move choices."
  },
  {
    "name": "Flower Veil",
    "desc": "Protects Grass-type allies from stat/status effects."
  },
  {
    "name": "Cheek Pouch",
    "desc": "Restores HP as well when the Pokémon eats a Berry."
  },
  {
    "name": "Protean",
    "desc": "It changes type to that of the move it's about to use."
  },
  {
    "name": "Fur Coat",
    "desc": "Halves the damage from physical moves."
  },
  {
    "name": "Magician",
    "desc": "Steals the held item of a Pokémon it hits."
  },
  {
    "name": "Bulletproof",
    "desc": "Protects the Pokémon from some ball and bomb moves."
  },
  {
    "name": "Competitive",
    "desc": "Sharply boosts Sp. Atk when a stat is lowered."
  },
  {
    "name": "Strong Jaw",
    "desc": "Boosts the power of biting moves."
  },
  {
    "name": "Refrigerate",
    "desc": "Normal-type moves become Ice-type and powered up."
  },
  {
    "name": "Sweet Veil",
    "desc": "Prevents itself and allies from falling asleep."
  },
  {
    "name": "Stance Change",
    "desc": "Changes between Blade and Shield Forme with attacks."
  },
  {
    "name": "Gale Wings",
    "desc": "Flying-type moves gain priority when its HP is full."
  },
  {
    "name": "Mega Launcher",
    "desc": "Powers up aura and pulse moves."
  },
  {
    "name": "Grass Pelt",
    "desc": "Boosts the Defense stat on Grassy Terrain."
  },
  {
    "name": "Symbiosis",
    "desc": "Passes its held item to an ally that has used theirs."
  },
  {
    "name": "Tough Claws",
    "desc": "Powers up moves that make direct contact."
  },
  {
    "name": "Pixilate",
    "desc": "Normal-type moves become Fairy-type and powered up."
  },
  {
    "name": "Gooey",
    "desc": "Contact with it lowers the attacker's Speed stat."
  },
  {
    "name": "Aerilate",
    "desc": "Normal-type moves become Flying-type and power up."
  },
  {
    "name": "Parental Bond",
    "desc": "Parent and child each attacks."
  },
  {
    "name": "Dark Aura",
    "desc": "Powers up each Pokémon's Dark-type moves."
  },
  {
    "name": "Fairy Aura",
    "desc": "Powers up each Pokémon's Fairy-type moves."
  },
  {
    "name": "Aura Break",
    "desc": "Reverses \"Aura\" Abilities to weaken affected moves."
  },
  {
    "name": "Primordial Sea",
    "desc": "Changes the weather to nullify Fire-type moves."
  },
  {
    "name": "Desolate Land",
    "desc": "Changes the weather to nullify Water-type moves."
  },
  {
    "name": "Delta Stream",
    "desc": "Alters weather to remove Flying-type's weaknesses."
  },
  {
    "name": "Stamina",
    "desc": "Boosts Defense when hit by an attack.",
    "mons": [
      "001",
      "002",
      "003"
    ],
    "rare": false
  },
  {
    "name": "Wimp Out",
    "desc": "Cowardly switches out if its HP becomes half or less."
  },
  {
    "name": "Emergency Exit",
    "desc": "Switches out if its HP becomes half or less."
  },
  {
    "name": "Water Compaction",
    "desc": "Sharply ups Defense when hit by a Water-type move."
  },
  {
    "name": "Merciless",
    "desc": "Its attacks are critical hits when it is poisoned."
  },
  {
    "name": "Shields Down",
    "desc": "Its shell breaks if its HP becomes half or less."
  },
  {
    "name": "Stakeout",
    "desc": "Deals doubles damage to a target's replacement."
  },
  {
    "name": "Water Bubble",
    "desc": "Weakens incoming Fire-type moves and prevents burns."
  },
  {
    "name": "Steelworker",
    "desc": "Powers up Steel-type moves."
  },
  {
    "name": "Berserk",
    "desc": "Ups Sp. Atk if a hit makes its HP half or less."
  },
  {
    "name": "Slush Rush",
    "desc": "Boosts the Pokémon's Speed stat in a hailstorm."
  },
  {
    "name": "Long Reach",
    "desc": "Uses moves without making contact with the target."
  },
  {
    "name": "Liquid Voice",
    "desc": "Its sound-based moves become Water-type."
  },
  {
    "name": "Triage",
    "desc": "Gives priority to a healing move."
  },
  {
    "name": "Galvanize",
    "desc": "Normal-type moves become Electric-type and powered."
  },
  {
    "name": "Surge Surfer",
    "desc": "Doubles Speed on Electric Terrain."
  },
  {
    "name": "Schooling",
    "desc": "Forms a powerful school while it has a lot of HP."
  },
  {
    "name": "Disguise",
    "desc": "Its shroud protects it from an attack just once."
  },
  {
    "name": "Battle Bond",
    "desc": "Defeating a foe lets it become Ash-Greninja."
  },
  {
    "name": "Power Construct",
    "desc": "Changes with other Cells if HP becomes half or less."
  },
  {
    "name": "Corrosion",
    "desc": "It can poison Steel- and Poison-type targets."
  },
  {
    "name": "Comatose",
    "desc": "It's always drowsing, and attacks without waking."
  },
  {
    "name": "Queenly Majesty",
    "desc": "Makes foes unable to use priority attacks."
  },
  {
    "name": "Innards Out",
    "desc": "Damages an attacker that lands the finishing hit."
  },
  {
    "name": "Dancer",
    "desc": "Repeats another Pokémon's dance move immediately."
  },
  {
    "name": "Battery",
    "desc": "Powers up ally Pokémon's special moves."
  },
  {
    "name": "Fluffy",
    "desc": "Resists contact damage but weaker to Fire-type."
  },
  {
    "name": "Dazzling",
    "desc": "Makes foes unable to use priority attacks."
  },
  {
    "name": "Soul-Heart",
    "desc": "Boosts Sp. Atk each time a Pokémon faints."
  },
  {
    "name": "Tangling Hair",
    "desc": "Contact with it lowers the attacker's Speed."
  },
  {
    "name": "Receiver",
    "desc": "Copies the Ability of a defeated ally."
  },
  {
    "name": "Power of Alchemy",
    "desc": "Copies the Ability of a defeated ally."
  },
  {
    "name": "Beast Boost",
    "desc": "Boosts its best stat each time it deals a KO."
  },
  {
    "name": "RKS System",
    "desc": "Its type matches the memory disc it holds."
  },
  {
    "name": "Electric Surge",
    "desc": "Turns the ground into Electric Terrain."
  },
  {
    "name": "Psychic Surge",
    "desc": "Turns the ground into Psychic Terrain."
  },
  {
    "name": "Misty Surge",
    "desc": "Turns the ground into Misty Terrain."
  },
  {
    "name": "Grassy Surge",
    "desc": "Turns the ground into Grassy Terrain."
  },
  {
    "name": "Full Metal Body",
    "desc": "Prevents other Pokémon from lowering its stats."
  },
  {
    "name": "Shadow Shield",
    "desc": "Resists damage while its HP is full."
  },
  {
    "name": "Prism Armor",
    "desc": "Reduces damage from super-effective attacks."
  },
  {
    "name": "Neuroforce",
    "desc": "Powers up moves that are super-effective."
  },
  {
    "name": "Intrepid Sword",
    "desc": "Boosts Attack when entering a battle."
  },
  {
    "name": "Dauntless Shield",
    "desc": "Boosts Defense when entering a battle."
  },
  {
    "name": "Libero",
    "desc": "It changes type to that of the move it's about to use."
  },
  {
    "name": "Ball Fetch",
    "desc": "Retrieves the first thrown Poké Ball if it failed."
  },
  {
    "name": "Cotton Down",
    "desc": "Scatters Speed-lowering cotton fluff when hit."
  },
  {
    "name": "Propeller Tail",
    "desc": "This Pokémon's moves cannot be redirected."
  },
  {
    "name": "Mirror Armor",
    "desc": "Bounces back stat-lowering effects."
  },
  {
    "name": "Gulp Missile",
    "desc": "Catches prey via Surf or Dive, spits it out when hit."
  },
  {
    "name": "Stalwart",
    "desc": "This Pokémon's moves cannot be redirected."
  },
  {
    "name": "Steam Engine",
    "desc": "Boosts Speed drastically if hit by a Fire or Water move."
  },
  {
    "name": "Punk Rock",
    "desc": "Powers up own sound moves. Resists other sound moves."
  },
  {
    "name": "Sand Spit",
    "desc": "Creates a sandstorm when hit by an attack."
  },
  {
    "name": "Ice Scales",
    "desc": "Halves the damage taken from special moves."
  },
  {
    "name": "Ripen",
    "desc": "Ripens Berries and doubles their effect."
  },
  {
    "name": "Ice Face",
    "desc": "Blocks a physical hit, but the ice head breaks."
  },
  {
    "name": "Power Spot",
    "desc": "Just being next to the Pokémon powers up moves."
  },
  {
    "name": "Mimicry",
    "desc": "Changes type depending on the terrain."
  },
  {
    "name": "Screen Cleaner",
    "desc": "On entering battle, clears effects of Reflect, etc."
  },
  {
    "name": "Steely Spirit",
    "desc": "Powers up ally Pokémon's Steel-type moves."
  },
  {
    "name": "Perish Body",
    "desc": "Both Pokémon faint 3 turns after taking a contact hit."
  },
  {
    "name": "Wandering Spirit",
    "desc": "Swaps Abilities with contact-making Pokémon."
  },
  {
    "name": "Gorilla Tactics",
    "desc": "Boosts Attack, but allows only one move to be used."
  },
  {
    "name": "Neutralizing Gas",
    "desc": "Nullifies the effects of all other Abilities."
  },
  {
    "name": "Pastel Veil",
    "desc": "Protects the Pokémon and its allies from poisoning."
  },
  {
    "name": "Hunger Switch",
    "desc": "Changes between Full Belly and Hangry Mode each turn."
  },
  {
    "name": "Quick Draw",
    "desc": "Enables the Pokémon to move first occasionally."
  },
  {
    "name": "Unseen Fist",
    "desc": "The Pokémon's contact moves ignore protections."
  },
  {
    "name": "Curious Medicine",
    "desc": "Removes all allies' stat changes on joining battle."
  },
  {
    "name": "Transistor",
    "desc": "Powers up Electric-type moves."
  },
  {
    "name": "Dragon's Maw",
    "desc": "Powers up Dragon-type moves."
  },
  {
    "name": "Chilling Neigh",
    "desc": "When knocking out a target, raises Attack."
  },
  {
    "name": "Grim Neigh",
    "desc": "When knocking out a target, raises Sp. Atk."
  },
  {
    "name": "As One",
    "desc": "Combines Unnerve and Chilling Neigh Abilities."
  },
  {
    "name": "As One",
    "desc": "Combines Unnerve and Grim Neigh Abilities."
  },
  {
    "name": "Sickness",
    "desc": "Poisons all other Pokémon, allies included, after 2 turns."
  },
  {
    "name": "Stampede",
    "desc": "Gives one recoil move +4 priority and halves recoil damage."
  },
  {
    "name": "Short Fuse",
    "desc": "Allows charging moves to be used instantly."
  },
  {
    "name": "Knit Trap",
    "desc": "Starts knitting, then lays Sticky Web after 3 turns."
  },
  {
    "name": "Food Coma",
    "desc": "Contact heals the attacker but lowers two random stats."
  },
  {
    "name": "Family Warmth",
    "desc": "Raises Sp. Def after using a Fairy-type move."
  },
  {
    "name": "Family Hold",
    "desc": "Raises Sp. Atk after using a Ghost-type move."
  },
  {
    "name": "Ninja Swap",
    "desc": "Makes a free substitute when the foe switches out."
  },
  {
    "name": "Cold-Blooded",
    "desc": "Boosts Speed in sun and critical-hit rate, but lowers Speed in snow."
  },
  {
    "name": "Surprise!",
    "desc": "Lowers opposing Pokemon's Defense on entry."
  },
  {
    "name": "Beam Me Up",
    "desc": "Powers up beam moves by 50%."
  },
  {
    "name": "Staggering",
    "desc": "Takes only 20% damage from the first hit, then sharply lowers Defense."
  },
  {
    "name": "Star Collapse",
    "desc": "Raises Attack and starts sunny weather after taking down a foe."
  },
  {
    "name": "Dark Abyss",
    "desc": "Absorbs the Void, preventing Water-type weaknesses."
  },
  {
    "name": "Anger Shell",
    "desc": "Gets a powerful boost if a hit makes its HP half or less."
  },
  {
    "name": "Armor Tail",
    "desc": "Prevents opposing Pokémon from using priority moves."
  },
  {
    "name": "Beads of Ruin",
    "desc": "Lowers the Sp. Def of all Pokémon except the user."
  },
  {
    "name": "Commander",
    "desc": "Pairs up and commands with an active Dondozo."
  },
  {
    "name": "Costar",
    "desc": "Copies an ally's stat changes upon entry to battle."
  },
  {
    "name": "Cud Chew",
    "desc": "Reuses an eaten Berry at the end of the next turn."
  },
  {
    "name": "Earth Eater",
    "desc": "Restores HP if hit by a Ground-type move."
  },
  {
    "name": "Electromorphosis",
    "desc": "The Pokémon becomes charged upon taking damage."
  },
  {
    "name": "Good as Gold",
    "desc": "The Pokémon becomes immune to status moves."
  },
  {
    "name": "Guard Dog",
    "desc": "Boosts Atk if intimidated and immune to being forced out."
  },
  {
    "name": "Hadron Engine",
    "desc": "Turns the ground into Electric Terrain and boosts Sp. Atk."
  },
  {
    "name": "Lingering Aroma",
    "desc": "Contact with this Pokémon spreads this Ability."
  },
  {
    "name": "Mycelium Might",
    "desc": "Status moves are unimpeded by this Ability but slower to use."
  },
  {
    "name": "Opportunist",
    "desc": "Copies an opponent's stat boost during a turn."
  },
  {
    "name": "Orichalcum Pulse",
    "desc": "Turns the sunlight harsh while boosing Attack."
  },
  {
    "name": "Protosynthesis",
    "desc": "Boosts its best stat in harsh sunlight."
  },
  {
    "name": "Purifying Salt",
    "desc": "Gains protection from status effects and Ghost-type moves."
  },
  {
    "name": "Quark Drive",
    "desc": "Boosts its best stat in Electric Terrain."
  },
  {
    "name": "Rocky Payload",
    "desc": "Powers up Rock-type moves."
  },
  {
    "name": "Seed Sower",
    "desc": "Turns the ground into Grassy Terrain upon taking damage."
  },
  {
    "name": "Sharpness",
    "desc": "Powers up slicing moves."
  },
  {
    "name": "Supreme Overlord",
    "desc": "Boosts the power of its moves with every fainted ally."
  },
  {
    "name": "Sword of Ruin",
    "desc": "Lowers the Defense of all Pokémon except the user."
  },
  {
    "name": "Tablets of Ruin",
    "desc": "Lowers the Attack of all Pokémon except the user."
  },
  {
    "name": "Thermal Exchange",
    "desc": "Boosts Atk when hit by a Fire-type move and prevents burns."
  },
  {
    "name": "Toxic Debris",
    "desc": "Scatters poison spikes when hit by physical moves."
  },
  {
    "name": "Vessel of Ruin",
    "desc": "Lowers the Sp. Atk of all Pokémon except the user."
  },
  {
    "name": "Well-Baked Body",
    "desc": "Fire-type moves deal no damage and sharply boost Defense."
  },
  {
    "name": "Wind Power",
    "desc": "The Pokémon becomes charged from taking wind damage."
  },
  {
    "name": "Wind Rider",
    "desc": "Boosts Attack in Tailwind or when attacked by wind moves."
  },
  {
    "name": "Zero to Hero",
    "desc": "Transforms into its Hero Form when it switches out."
  },
  {
    "name": "Supersweet Syrup",
    "desc": "Lowers the foe's evasion once per battle."
  },
  {
    "name": "Hospitality",
    "desc": "Restores ally's HP a little when entering battle."
  },
  {
    "name": "Toxic Chain",
    "desc": "May badly poison targets when the user attacks."
  },
  {
    "name": "Mind's Eye",
    "desc": "Prevents accuracy loss. Ignores Ghost immunities."
  },
  {
    "name": "Embody Aspect",
    "desc": "The user's shining mask raises its Speed stat."
  },
  {
    "name": "Embody Aspect",
    "desc": "The user's shining mask raises its Sp. Def stat."
  },
  {
    "name": "Embody Aspect",
    "desc": "The user's shining mask raises its Attack stat."
  },
  {
    "name": "Embody Aspect",
    "desc": "The user's shining mask raises its Defense stat."
  },
  {
    "name": "Poison Puppeteer",
    "desc": "Moves that inflict poison also cause confusion."
  },
  {
    "name": "Tera Shift",
    "desc": "Enters Terastal Form when sent out."
  },
  {
    "name": "Tera Shell",
    "desc": "Resists all types when HP is full."
  },
  {
    "name": "Teraform Zero",
    "desc": "Eliminates all weather and terrain."
  },
  {
    "name": "Mega Sol",
    "desc": "Uses its moves as if in sunny weather."
  },
  {
    "name": "Dragonize",
    "desc": "Normal-type moves become Dragon-type and powered."
  },
  {
    "name": "Piercing Drill",
    "desc": "Contact moves deals a quarter of damage against protections."
  },
  {
    "name": "Spicy Spray",
    "desc": "Burns the attacker when hit by a damaging move."
  },
  {
    "name": "Burning Novae",
    "desc": "Attacks on burned targets are always critical hits."
  },
  {
    "name": "Deep Abyss",
    "desc": "Foes can't use two moves of the same type in a row."
  },
  {
    "name": "Sand Bath",
    "desc": "The Pokémon gradually regains HP in a sandstorm."
  },
  {
    "name": "Teething",
    "desc": "Biting moves are weaker but strike first."
  },
  {
    "name": "Scavenging",
    "desc": "After winning a battle, it may scavenge an item, sometimes one the wild foe was holding."
  },
  {
    "name": "Frighten",
    "desc": "Lowers opposing Pokémon's Sp. Atk on entry."
  },
  {
    "name": "Unkempt",
    "desc": "Turns wild when not hit by a physical move for 2 turns. A physical hit tames it again."
  },
  {
    "name": "Clumsy",
    "desc": "When hit by an attack, it may drop its held item."
  },
  {
    "name": "Lifeguard",
    "desc": "Once per battle, saves an ally from fainting, leaving it with 1 HP."
  },
  {
    "name": "Connecting...",
    "desc": "After 6 turns it connects to a satellite and raises all stats every turn."
  },
  {
    "name": "Burning Hot",
    "desc": "Powers up Fire-type moves by 50%."
  },
  {
    "name": "Aerobatics",
    "desc": "Ignores entry hazards, can't be grounded, and is immune to Ground moves."
  },
  {
    "name": "Boiling Point",
    "desc": "Starts boiling after 3 turns. Water moves may then burn."
  },
  {
    "name": "Mirroring",
    "desc": "Copies the stat changes of the foe in front of it on entry."
  },
  {
    "name": "Just Desserts",
    "desc": "Stat drops become stat rises, but the Pokémon always moves last."
  }
];

  // ---- Items -------------------------------------------------------------
  // Optional item art: add icon: 'items/example.png' to any item.
  // categories (you can add): Evolution, Valuable, Battle Items, Key Item, Medicine, Poké Ball, Berries
  const ITEMS = [
    {
      "id": "SCHOOLID",
      "name": "School ID",
      "cat": "Key Items",
      "icon": "items/SCHOOLID.png",
      "desc": "Your personal identification card for school.",
      "find": ""
    },
    {
      "id": "IVYSID",
      "name": "Ivy's School ID",
      "cat": "Key Items",
      "icon": "items/IVYSID.png",
      "desc": "A student identification card belonging to Ivy. She badly needs it.",
      "find": ""
    },
    {
      "id": "CHATEAUTICKET",
      "name": "Chateau Pass",
      "cat": "Key Items",
      "icon": "items/CHATEAUTICKET.png",
      "desc": "Used to go to the back of Chateau Seiya.",
      "find": ""
    },
    {
      "id": "APPROVALLETTER",
      "name": "Approval letter",
      "cat": "Key Items",
      "icon": "items/APPROVALLETTER.png",
      "desc": "Your letter of approval for your adventure.",
      "find": ""
    },
    {
      "id": "WARMMEAL",
      "name": "Chef's Warm Meal",
      "cat": "Key Items",
      "icon": "items/WARMMEAL.png",
      "desc": "A hot, delicious full-course meal prepared during Chef Seiya's cooking class. Deliver it to your parents before it cools.",
      "find": ""
    },
    {
      "id": "WHEAT",
      "name": "Sack of Wheat",
      "cat": "Key Items",
      "icon": "items/WHEAT.png",
      "desc": "A bundle of wheat.",
      "find": ""
    },
    {
      "id": "BERRIES",
      "name": "Bunch of Berries",
      "cat": "Key Items",
      "icon": "items/BERRIES.png",
      "desc": "A bunch of berries.",
      "find": ""
    },
    {
      "id": "IMPORTEDCREAM",
      "name": "Imported Cream",
      "cat": "Key Items",
      "icon": "items/IMPORTEDCREAM.png",
      "desc": "Grade-A Galarian vanilla cream ordered by Chateau Seiya. Keep it cold and don't shake it yet.",
      "find": ""
    },
    {
      "id": "PREPPEDCREAM",
      "name": "Prepped Cream",
      "cat": "Key Items",
      "icon": "items/PREPPEDCREAM.png",
      "desc": "Cream Emi sweetened and chilled. It still has to be whipped by hand. Use it to start whisking.",
      "find": ""
    },
    {
      "id": "WHIPPEDCREAM",
      "name": "Hand-Whipped Cream",
      "cat": "Key Items",
      "icon": "items/WHIPPEDCREAM.png",
      "desc": "Fluffy cream you whipped yourself, ready for Chef Seiya's finishing touch.",
      "find": ""
    },
    {
      "id": "HONEYBOTTLE",
      "name": "Bottle of Honey",
      "cat": "Key Items",
      "icon": "items/HONEYBOTTLE.png",
      "desc": "A bottle of sweet honey.",
      "find": ""
    },
    {
      "id": "SYNCBAND",
      "name": "Syncband",
      "cat": "Key Items",
      "icon": "items/SYNCBAND.png",
      "desc": "A technological band that enables Sync-Tuning once per battle.",
      "find": ""
    },
    {
      "id": "SYNCSCALE",
      "name": "Sync Scale",
      "cat": "Key Items",
      "icon": "items/SYNCSCALE.png",
      "desc": "A mysterious scale that works with the Sync Band, can be used to control Sync-Break.",
      "find": ""
    },
    {
      "id": "CERBAMENTCOMBINE",
      "name": "Cerbament item",
      "cat": "Key Items",
      "icon": "items/CERBAMENTCOMBINE.png",
      "desc": "An item that combines Gleeruption and Scorow to form a different creature.",
      "find": ""
    },
    {
      "id": "WHIPPEDDREAM",
      "name": "Whipped Dream",
      "cat": "Evolution Items",
      "icon": "items/WHIPPEDDREAM.png",
      "desc": "A specialized mixing set to turn Tartort into Scallery.",
      "find": ""
    },
    {
      "id": "REPEL",
      "name": "Repel",
      "cat": "Other Items",
      "icon": "items/REPEL.png",
      "desc": "An item that prevents weak wild Pokémon from appearing for 100 steps after its use.",
      "find": ""
    },
    {
      "id": "SUPERREPEL",
      "name": "Super Repel",
      "cat": "Other Items",
      "icon": "items/SUPERREPEL.png",
      "desc": "An item that prevents weak wild Pokémon from appearing for 200 steps after its use.",
      "find": ""
    },
    {
      "id": "MAXREPEL",
      "name": "Max Repel",
      "cat": "Other Items",
      "icon": "items/MAXREPEL.png",
      "desc": "An item that prevents weak wild Pokémon from appearing for 250 steps after its use.",
      "find": ""
    },
    {
      "id": "BLACKFLUTE",
      "name": "Black Flute",
      "cat": "Other Items",
      "icon": "items/BLACKFLUTE.png",
      "desc": "A black flute made from blown glass. Its melody makes wild Pokémon less likely to appear.",
      "find": ""
    },
    {
      "id": "WHITEFLUTE",
      "name": "White Flute",
      "cat": "Other Items",
      "icon": "items/WHITEFLUTE.png",
      "desc": "A white flute made from blown glass. Its melody makes wild Pokémon more likely to appear.",
      "find": ""
    },
    {
      "id": "HONEY",
      "name": "Honey",
      "cat": "Other Items",
      "icon": "items/HONEY.png",
      "desc": "A sweet honey with a lush aroma that attracts wild Pokémon when used in tall grass, in caves, or elsewhere.",
      "find": ""
    },
    {
      "id": "REDSHARD",
      "name": "Red Shard",
      "cat": "Other Items",
      "icon": "items/REDSHARD.png",
      "desc": "A small red shard. It appears to be from some sort of implement made long ago.",
      "find": ""
    },
    {
      "id": "YELLOWSHARD",
      "name": "Yellow Shard",
      "cat": "Other Items",
      "icon": "items/YELLOWSHARD.png",
      "desc": "A small yellow shard. It appears to be from some sort of implement made long ago.",
      "find": ""
    },
    {
      "id": "BLUESHARD",
      "name": "Blue Shard",
      "cat": "Other Items",
      "icon": "items/BLUESHARD.png",
      "desc": "A small blue shard. It appears to be from some sort of implement made long ago.",
      "find": ""
    },
    {
      "id": "GREENSHARD",
      "name": "Green Shard",
      "cat": "Other Items",
      "icon": "items/GREENSHARD.png",
      "desc": "A small green shard. It appears to be from some sort of implement made long ago.",
      "find": ""
    },
    {
      "id": "FIRESTONE",
      "name": "Fire Stone",
      "cat": "Evolution Items",
      "icon": "items/FIRESTONE.png",
      "desc": "A peculiar stone that makes certain species of Pokémon evolve. It is colored orange.",
      "find": ""
    },
    {
      "id": "THUNDERSTONE",
      "name": "Thunder Stone",
      "cat": "Evolution Items",
      "icon": "items/THUNDERSTONE.png",
      "desc": "A peculiar stone that makes certain species of Pokémon evolve. It has a thunderbolt pattern.",
      "find": ""
    },
    {
      "id": "WATERSTONE",
      "name": "Water Stone",
      "cat": "Evolution Items",
      "icon": "items/WATERSTONE.png",
      "desc": "A peculiar stone that makes certain species of Pokémon evolve. It is a clear, light blue.",
      "find": ""
    },
    {
      "id": "LEAFSTONE",
      "name": "Leaf Stone",
      "cat": "Evolution Items",
      "icon": "items/LEAFSTONE.png",
      "desc": "A peculiar stone that makes certain species of Pokémon evolve. It has a leaf pattern.",
      "find": ""
    },
    {
      "id": "MOONSTONE",
      "name": "Moon Stone",
      "cat": "Evolution Items",
      "icon": "items/MOONSTONE.png",
      "desc": "A peculiar stone that makes certain species of Pokémon evolve. It is as black as the night sky.",
      "find": ""
    },
    {
      "id": "COSMICSTONE",
      "name": "Cosmic Stone",
      "cat": "Evolution Items",
      "icon": "items/COSMICSTONE.png",
      "desc": "A peculiar stone that makes certain species of Pokémon evolve. It glitters like a distant galaxy.",
      "find": ""
    },
    {
      "id": "SUNSTONE",
      "name": "Sun Stone",
      "cat": "Evolution Items",
      "icon": "items/SUNSTONE.png",
      "desc": "A peculiar stone that makes certain species of Pokémon evolve. It is as red as the sun.",
      "find": ""
    },
    {
      "id": "DUSKSTONE",
      "name": "Dusk Stone",
      "cat": "Evolution Items",
      "icon": "items/DUSKSTONE.png",
      "desc": "A peculiar stone that makes certain species of Pokémon evolve. It is as dark as dark can be.",
      "find": ""
    },
    {
      "id": "DAWNSTONE",
      "name": "Dawn Stone",
      "cat": "Evolution Items",
      "icon": "items/DAWNSTONE.png",
      "desc": "A peculiar stone that makes certain species of Pokémon evolve. It sparkles like eyes.",
      "find": ""
    },
    {
      "id": "SHINYSTONE",
      "name": "Shiny Stone",
      "cat": "Evolution Items",
      "icon": "items/SHINYSTONE.png",
      "desc": "A peculiar stone that makes certain species of Pokémon evolve. It shines with a dazzling light.",
      "find": ""
    },
    {
      "id": "ICESTONE",
      "name": "Ice Stone",
      "cat": "Evolution Items",
      "icon": "items/ICESTONE.png",
      "desc": "A peculiar stone that makes certain species of Pokémon evolve. It has a snowflake pattern.",
      "find": ""
    },
    {
      "id": "REDAPRICORN",
      "name": "Red Apricorn",
      "cat": "Other Items",
      "icon": "items/REDAPRICORN.png",
      "desc": "A red Apricorn. It assails your nostrils.",
      "find": ""
    },
    {
      "id": "YELLOWAPRICORN",
      "name": "Yellow Apricorn",
      "cat": "Other Items",
      "icon": "items/YELLOWAPRICORN.png",
      "desc": "A yellow Apricorn. It has an invigorating scent.",
      "find": ""
    },
    {
      "id": "BLUEAPRICORN",
      "name": "Blue Apricorn",
      "cat": "Other Items",
      "icon": "items/BLUEAPRICORN.png",
      "desc": "A blue Apricorn. It smells a bit like grass.",
      "find": ""
    },
    {
      "id": "GREENAPRICORN",
      "name": "Green Apricorn",
      "cat": "Other Items",
      "icon": "items/GREENAPRICORN.png",
      "desc": "A green Apricorn. It has a mysterious, aromatic scent.",
      "find": ""
    },
    {
      "id": "PINKAPRICORN",
      "name": "Pink Apricorn",
      "cat": "Other Items",
      "icon": "items/PINKAPRICORN.png",
      "desc": "A pink Apricorn. It has a nice, sweet scent.",
      "find": ""
    },
    {
      "id": "WHITEAPRICORN",
      "name": "White Apricorn",
      "cat": "Other Items",
      "icon": "items/WHITEAPRICORN.png",
      "desc": "A white Apricorn. It doesn't smell like anything.",
      "find": ""
    },
    {
      "id": "BLACKAPRICORN",
      "name": "Black Apricorn",
      "cat": "Other Items",
      "icon": "items/BLACKAPRICORN.png",
      "desc": "A black Apricorn. It has an indescribable scent.",
      "find": ""
    },
    {
      "id": "HELIXFOSSIL",
      "name": "Helix Fossil",
      "cat": "Fossils",
      "icon": "items/HELIXFOSSIL.png",
      "desc": "A fossil of an ancient Pokémon that lived in the sea. It appears to be part of a seashell.",
      "find": ""
    },
    {
      "id": "DOMEFOSSIL",
      "name": "Dome Fossil",
      "cat": "Fossils",
      "icon": "items/DOMEFOSSIL.png",
      "desc": "A fossil of an ancient Pokémon that lived in the sea. It appears to be part of a shell.",
      "find": ""
    },
    {
      "id": "OLDAMBER",
      "name": "Old Amber",
      "cat": "Fossils",
      "icon": "items/OLDAMBER.png",
      "desc": "A piece of amber that contains the genes of an ancient Pokémon. It is clear with a reddish tint.",
      "find": ""
    },
    {
      "id": "ROOTFOSSIL",
      "name": "Root Fossil",
      "cat": "Fossils",
      "icon": "items/ROOTFOSSIL.png",
      "desc": "A fossil of an ancient Pokémon that lived in the sea. It appears to be part of a plant root.",
      "find": ""
    },
    {
      "id": "CLAWFOSSIL",
      "name": "Claw Fossil",
      "cat": "Fossils",
      "icon": "items/CLAWFOSSIL.png",
      "desc": "A fossil of an ancient Pokémon that lived in the sea. It appears to be part of a claw.",
      "find": ""
    },
    {
      "id": "SKULLFOSSIL",
      "name": "Skull Fossil",
      "cat": "Fossils",
      "icon": "items/SKULLFOSSIL.png",
      "desc": "A fossil from a prehistoric Pokémon that lived on the land. It appears to be part of a head.",
      "find": ""
    },
    {
      "id": "ARMORFOSSIL",
      "name": "Armor Fossil",
      "cat": "Fossils",
      "icon": "items/ARMORFOSSIL.png",
      "desc": "A fossil from a prehistoric Pokémon that lived on the land. It appears to be part of a collar.",
      "find": ""
    },
    {
      "id": "COVERFOSSIL",
      "name": "Cover Fossil",
      "cat": "Fossils",
      "icon": "items/COVERFOSSIL.png",
      "desc": "A fossil of an ancient Pokémon that lived in the sea in ancient times. It appears to be part of its back.",
      "find": ""
    },
    {
      "id": "PLUMEFOSSIL",
      "name": "Plume Fossil",
      "cat": "Fossils",
      "icon": "items/PLUMEFOSSIL.png",
      "desc": "A fossil of an ancient Pokémon that flew in the sky in ancient times. It appears to be part of its wing.",
      "find": ""
    },
    {
      "id": "PRETTYFEATHER",
      "name": "Pretty Feather",
      "cat": "Treasures",
      "icon": "items/PRETTYFEATHER.png",
      "desc": "Though this feather is beautiful, it's just a regular feather and has no effect on Pokémon.",
      "find": ""
    },
    {
      "id": "TINYMUSHROOM",
      "name": "Tiny Mushroom",
      "cat": "Treasures",
      "icon": "items/TINYMUSHROOM.png",
      "desc": "A small and rare mushroom. It is sought after by collectors.",
      "find": ""
    },
    {
      "id": "BIGMUSHROOM",
      "name": "Big Mushroom",
      "cat": "Treasures",
      "icon": "items/BIGMUSHROOM.png",
      "desc": "A large and rare mushroom. It is sought after by collectors.",
      "find": ""
    },
    {
      "id": "BALMMUSHROOM",
      "name": "Balm Mushroom",
      "cat": "Treasures",
      "icon": "items/BALMMUSHROOM.png",
      "desc": "A rare mushroom which gives off a nice fragrance. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "PEARL",
      "name": "Pearl",
      "cat": "Treasures",
      "icon": "items/PEARL.png",
      "desc": "A somewhat-small pearl that sparkles in a pretty silver color. It can be sold cheaply to shops.",
      "find": ""
    },
    {
      "id": "BIGPEARL",
      "name": "Big Pearl",
      "cat": "Treasures",
      "icon": "items/BIGPEARL.png",
      "desc": "A quite-large pearl that sparkles in a pretty silver color. It can be sold at a high price to shops.",
      "find": ""
    },
    {
      "id": "PEARLSTRING",
      "name": "Pearl String",
      "cat": "Treasures",
      "icon": "items/PEARLSTRING.png",
      "desc": "Very large pearls that sparkle in a pretty silver color. A maniac will buy them for a high price.",
      "find": ""
    },
    {
      "id": "STARDUST",
      "name": "Stardust",
      "cat": "Treasures",
      "icon": "items/STARDUST.png",
      "desc": "Lovely, red-colored sand with a loose, silky feel. It can be sold at a high price to shops.",
      "find": ""
    },
    {
      "id": "STARPIECE",
      "name": "Star Piece",
      "cat": "Treasures",
      "icon": "items/STARPIECE.png",
      "desc": "A shard of a pretty gem that sparkles in a red color. It can be sold at a high price to shops.",
      "find": ""
    },
    {
      "id": "COMETSHARD",
      "name": "Comet Shard",
      "cat": "Treasures",
      "icon": "items/COMETSHARD.png",
      "desc": "A shard which fell to the ground when a comet approached. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "NUGGET",
      "name": "Nugget",
      "cat": "Treasures",
      "icon": "items/NUGGET.png",
      "desc": "A nugget of pure gold that gives off a lustrous gleam. It can be sold at a high price to shops.",
      "find": ""
    },
    {
      "id": "BIGNUGGET",
      "name": "Big Nugget",
      "cat": "Treasures",
      "icon": "items/BIGNUGGET.png",
      "desc": "A big nugget of pure gold that gives off a lustrous gleam. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "HEARTSCALE",
      "name": "Heart Scale",
      "cat": "Other Items",
      "icon": "items/HEARTSCALE.png",
      "desc": "A pretty, heart-shaped scale that is extremely rare. It glows faintly in the colors of the rainbow.",
      "find": ""
    },
    {
      "id": "SLOWPOKETAIL",
      "name": "Slowpoke Tail",
      "cat": "Treasures",
      "icon": "items/SLOWPOKETAIL.png",
      "desc": "A very tasty tail of something. It can be sold at a high price to shops.",
      "find": ""
    },
    {
      "id": "RAREBONE",
      "name": "Rare Bone",
      "cat": "Treasures",
      "icon": "items/RAREBONE.png",
      "desc": "A bone that is extremely valuable for Pokémon archaeology. It can be sold for a high price to shops.",
      "find": ""
    },
    {
      "id": "RELICCOPPER",
      "name": "Relic Copper",
      "cat": "Treasures",
      "icon": "items/RELICCOPPER.png",
      "desc": "A copper coin used in a civilization about 3,000 years ago. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "RELICSILVER",
      "name": "Relic Silver",
      "cat": "Treasures",
      "icon": "items/RELICSILVER.png",
      "desc": "A silver coin used in a civilization about 3,000 years ago. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "RELICGOLD",
      "name": "Relic Gold",
      "cat": "Treasures",
      "icon": "items/RELICGOLD.png",
      "desc": "A gold coin used in a civilization about 3,000 years ago. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "RELICVASE",
      "name": "Relic Vase",
      "cat": "Treasures",
      "icon": "items/RELICVASE.png",
      "desc": "A vase made in a civilization about 3,000 years ago. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "RELICBAND",
      "name": "Relic Band",
      "cat": "Treasures",
      "icon": "items/RELICBAND.png",
      "desc": "A bracelet made in a civilization about 3,000 years ago. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "RELICSTATUE",
      "name": "Relic Statue",
      "cat": "Treasures",
      "icon": "items/RELICSTATUE.png",
      "desc": "A stone figure made in a civilization about 3,000 years ago. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "RELICCROWN",
      "name": "Relic Crown",
      "cat": "Treasures",
      "icon": "items/RELICCROWN.png",
      "desc": "A crown made in a civilization about 3,000 years ago. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "GROWTHMULCH",
      "name": "Growth Mulch",
      "cat": "Other Items",
      "icon": "items/GROWTHMULCH.png",
      "desc": "A fertilizer to be spread on soft soil in regions where Berries are grown. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "DAMPMULCH",
      "name": "Damp Mulch",
      "cat": "Other Items",
      "icon": "items/DAMPMULCH.png",
      "desc": "A fertilizer to be spread on soft soil in regions where Berries are grown. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "STABLEMULCH",
      "name": "Stable Mulch",
      "cat": "Other Items",
      "icon": "items/STABLEMULCH.png",
      "desc": "A fertilizer to be spread on soft soil in regions where Berries are grown. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "GOOEYMULCH",
      "name": "Gooey Mulch",
      "cat": "Other Items",
      "icon": "items/GOOEYMULCH.png",
      "desc": "A fertilizer to be spread on soft soil in regions where Berries are grown. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "SHOALSALT",
      "name": "Shoal Salt",
      "cat": "Other Items",
      "icon": "items/SHOALSALT.png",
      "desc": "Pure salt that can be discovered deep inside the Shoal Cave. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "SHOALSHELL",
      "name": "Shoal Shell",
      "cat": "Other Items",
      "icon": "items/SHOALSHELL.png",
      "desc": "A pretty seashell that can be found deep inside the Shoal Cave. A maniac will buy it for a high price.",
      "find": ""
    },
    {
      "id": "ODDKEYSTONE",
      "name": "Odd Keystone",
      "cat": "Other Items",
      "icon": "items/ODDKEYSTONE.png",
      "desc": "A vital item that is needed to keep a stone tower from collapsing. Voices can be heard from it occasionally.",
      "find": ""
    },
    {
      "id": "AIRBALLOON",
      "name": "Air Balloon",
      "cat": "Held Items",
      "icon": "items/AIRBALLOON.png",
      "desc": "An item to be held by a Pokémon. The holder will float in the air until hit. Once hit, this item will burst.",
      "find": ""
    },
    {
      "id": "BRIGHTPOWDER",
      "name": "Bright Powder",
      "cat": "Held Items",
      "icon": "items/BRIGHTPOWDER.png",
      "desc": "An item to be held by a Pokémon. It casts a tricky glare that lowers the opponent's accuracy.",
      "find": ""
    },
    {
      "id": "EVIOLITE",
      "name": "Eviolite",
      "cat": "Held Items",
      "icon": "items/EVIOLITE.png",
      "desc": "A mysterious evolutionary lump. When held, it raises the Defense and Sp. Def if the holder can still evolve.",
      "find": ""
    },
    {
      "id": "FLOATSTONE",
      "name": "Float Stone",
      "cat": "Other Items",
      "icon": "items/FLOATSTONE.png",
      "desc": "A very light stone. It reduces the weight of a Pokémon when held.",
      "find": ""
    },
    {
      "id": "DESTINYKNOT",
      "name": "Destiny Knot",
      "cat": "Held Items",
      "icon": "items/DESTINYKNOT.png",
      "desc": "A long, thin, bright-red string to be held by a Pokémon. If the holder becomes infatuated, so does the foe.",
      "find": ""
    },
    {
      "id": "ROCKYHELMET",
      "name": "Rocky Helmet",
      "cat": "Held Items",
      "icon": "items/ROCKYHELMET.png",
      "desc": "If the holder of this item takes damage, the attacker will also be damaged upon contact.",
      "find": ""
    },
    {
      "id": "ASSAULTVEST",
      "name": "Assault Vest",
      "cat": "Held Items",
      "icon": "items/ASSAULTVEST.png",
      "desc": "An item to be held by a Pokémon. This offensive vest raises Sp. Def but prevents the use of status moves.",
      "find": ""
    },
    {
      "id": "PROTECTIVEPADS",
      "name": "Protective Pads",
      "cat": "Held Items",
      "icon": "items/PROTECTIVEPADS.png",
      "desc": "An item to be held by a Pokémon. They protect the holder from effects caused by making contact.",
      "find": ""
    },
    {
      "id": "HEAVYDUTYBOOTS",
      "name": "Heavy-Duty Boots",
      "cat": "Other Items",
      "icon": "items/HEAVYDUTYBOOTS.png",
      "desc": "These boots prevent the effects of traps set on the battlefield.",
      "find": ""
    },
    {
      "id": "EJECTBUTTON",
      "name": "Eject Button",
      "cat": "Held Items",
      "icon": "items/EJECTBUTTON.png",
      "desc": "If the holder is hit by an attack, it will switch with another Pokémon in your party.",
      "find": ""
    },
    {
      "id": "EJECTPACK",
      "name": "Eject Pack",
      "cat": "Held Items",
      "icon": "items/EJECTPACK.png",
      "desc": "An item to be held by a Pokémon. When the holder's stats are lowered, it will be switched out of battle.",
      "find": ""
    },
    {
      "id": "REDCARD",
      "name": "Red Card",
      "cat": "Held Items",
      "icon": "items/REDCARD.png",
      "desc": "A card with a mysterious power. When the holder is struck by a foe, the attacker is removed from battle.",
      "find": ""
    },
    {
      "id": "SHEDSHELL",
      "name": "Shed Shell",
      "cat": "Held Items",
      "icon": "items/SHEDSHELL.png",
      "desc": "An item to be held by a Pokémon. This discarded carapace lets the holder switch out of battle without fail.",
      "find": ""
    },
    {
      "id": "SMOKEBALL",
      "name": "Smoke Ball",
      "cat": "Held Items",
      "icon": "items/SMOKEBALL.png",
      "desc": "An item to be held by a Pokémon. It enables the holder to flee from any wild Pokémon without fail.",
      "find": ""
    },
    {
      "id": "LUCKYEGG",
      "name": "Lucky Egg",
      "cat": "Held Items",
      "icon": "items/LUCKYEGG.png",
      "desc": "An item to be held by a Pokémon. It is an egg filled with happiness that earns extra Exp. Points in battle.",
      "find": ""
    },
    {
      "id": "EXPSHARE",
      "name": "Exp. Share",
      "cat": "Held Items",
      "icon": "items/EXPSHARE.png",
      "desc": "An item to be held by a Pokémon. The holder gets a share of a battle's Exp. Points without battling.",
      "find": ""
    },
    {
      "id": "AMULETCOIN",
      "name": "Amulet Coin",
      "cat": "Held Items",
      "icon": "items/AMULETCOIN.png",
      "desc": "An item to be held by a Pokémon. It doubles a battle's prize money if the holding Pokémon joins in.",
      "find": ""
    },
    {
      "id": "SOOTHEBELL",
      "name": "Soothe Bell",
      "cat": "Held Items",
      "icon": "items/SOOTHEBELL.png",
      "desc": "An item to be held by a Pokémon. The comforting chime of this bell calms the holder, making it friendly.",
      "find": ""
    },
    {
      "id": "CLEANSETAG",
      "name": "Cleanse Tag",
      "cat": "Held Items",
      "icon": "items/CLEANSETAG.png",
      "desc": "An item to be held by a Pokémon. It helps keep wild Pokémon away if the holder is the first one in the party.",
      "find": ""
    },
    {
      "id": "CHOICEBAND",
      "name": "Choice Band",
      "cat": "Held Items",
      "icon": "items/CHOICEBAND.png",
      "desc": "An item to be held by a Pokémon. This headband ups Attack, but allows the use of only one move.",
      "find": ""
    },
    {
      "id": "CHOICESPECS",
      "name": "Choice Specs",
      "cat": "Held Items",
      "icon": "items/CHOICESPECS.png",
      "desc": "An item to be held by a Pokémon. These curious glasses boost Sp. Atk but allows the use of only one move.",
      "find": ""
    },
    {
      "id": "CHOICESCARF",
      "name": "Choice Scarf",
      "cat": "Held Items",
      "icon": "items/CHOICESCARF.png",
      "desc": "An item to be held by a Pokémon. This scarf boosts Speed but allows the use of only one move.",
      "find": ""
    },
    {
      "id": "HEATROCK",
      "name": "Heat Rock",
      "cat": "Held Items",
      "icon": "items/HEATROCK.png",
      "desc": "A Pokémon held item that extends the duration of the move Sunny Day used by the holder.",
      "find": ""
    },
    {
      "id": "DAMPROCK",
      "name": "Damp Rock",
      "cat": "Held Items",
      "icon": "items/DAMPROCK.png",
      "desc": "A Pokémon held item that extends the duration of the move Rain Dance used by the holder.",
      "find": ""
    },
    {
      "id": "SMOOTHROCK",
      "name": "Smooth Rock",
      "cat": "Held Items",
      "icon": "items/SMOOTHROCK.png",
      "desc": "A Pokémon held item that extends the duration of the move Sandstorm used by the holder.",
      "find": ""
    },
    {
      "id": "ICYROCK",
      "name": "Icy Rock",
      "cat": "Held Items",
      "icon": "items/ICYROCK.png",
      "desc": "A Pokémon held item that extends the duration of the move Hail used by the holder.",
      "find": ""
    },
    {
      "id": "TERRAINEXTENDER",
      "name": "Terrain Extender",
      "cat": "Held Items",
      "icon": "items/TERRAINEXTENDER.png",
      "desc": "An item to be held by a Pokémon. It extends the duration of the terrain caused by the holder.",
      "find": ""
    },
    {
      "id": "LIGHTCLAY",
      "name": "Light Clay",
      "cat": "Held Items",
      "icon": "items/LIGHTCLAY.png",
      "desc": "An item to be held by a Pokémon. Protective moves like Light Screen and Reflect will be effective longer.",
      "find": ""
    },
    {
      "id": "GRIPCLAW",
      "name": "Grip Claw",
      "cat": "Other Items",
      "icon": "items/GRIPCLAW.png",
      "desc": "A Pokémon held item that extends the duration of multiturn attacks like Bind and Wrap.",
      "find": ""
    },
    {
      "id": "BINDINGBAND",
      "name": "Binding Band",
      "cat": "Other Items",
      "icon": "items/BINDINGBAND.png",
      "desc": "A band that increases the power of binding moves when held.",
      "find": ""
    },
    {
      "id": "BIGROOT",
      "name": "Big Root",
      "cat": "Held Items",
      "icon": "items/BIGROOT.png",
      "desc": "A Pokémon held item that boosts the power of HP-stealing moves to let the holder recover more HP.",
      "find": ""
    },
    {
      "id": "BLACKSLUDGE",
      "name": "Black Sludge",
      "cat": "Other Items",
      "icon": "items/BLACKSLUDGE.png",
      "desc": "A held item that gradually restores the HP of Poison-type Pokémon. It inflicts damage on all other types.",
      "find": ""
    },
    {
      "id": "LEFTOVERS",
      "name": "Leftovers",
      "cat": "Held Items",
      "icon": "items/LEFTOVERS.png",
      "desc": "An item to be held by a Pokémon. The holder's HP is gradually restored during battle.",
      "find": ""
    },
    {
      "id": "SHELLBELL",
      "name": "Shell Bell",
      "cat": "Held Items",
      "icon": "items/SHELLBELL.png",
      "desc": "An item to be held by a Pokémon. The holder's HP is restored a little every time it inflicts damage.",
      "find": ""
    },
    {
      "id": "MENTALHERB",
      "name": "Mental Herb",
      "cat": "Held Items",
      "icon": "items/MENTALHERB.png",
      "desc": "An item to be held by a Pokémon. It snaps the holder out of infatuation. It can be used only once.",
      "find": ""
    },
    {
      "id": "WHITEHERB",
      "name": "White Herb",
      "cat": "Held Items",
      "icon": "items/WHITEHERB.png",
      "desc": "An item to be held by a Pokémon. It restores any lowered stat in battle. It can be used only once.",
      "find": ""
    },
    {
      "id": "POWERHERB",
      "name": "Power Herb",
      "cat": "Held Items",
      "icon": "items/POWERHERB.png",
      "desc": "A single-use item to be held by a Pokémon. It allows the immediate use of a move that charges up first.",
      "find": ""
    },
    {
      "id": "ABSORBBULB",
      "name": "Absorb Bulb",
      "cat": "Held Items",
      "icon": "items/ABSORBBULB.png",
      "desc": "A consumable bulb. If the holder is hit by a Water-type move, its Sp. Atk will rise.",
      "find": ""
    },
    {
      "id": "CELLBATTERY",
      "name": "Cell Battery",
      "cat": "Held Items",
      "icon": "items/CELLBATTERY.png",
      "desc": "A consumable battery. If the holder is hit by an Electric-type move, its Attack will rise.",
      "find": ""
    },
    {
      "id": "LUMINOUSMOSS",
      "name": "Luminous Moss",
      "cat": "Held Items",
      "icon": "items/LUMINOUSMOSS.png",
      "desc": "An item to be held by a Pokémon. It boosts Sp. Def if hit by a Water-type attack. It can only be used once.",
      "find": ""
    },
    {
      "id": "WEAKNESSPOLICY",
      "name": "Weakness Policy",
      "cat": "Held Items",
      "icon": "items/WEAKNESSPOLICY.png",
      "desc": "An item to be held by a Pokémon. The holder's Attack and Sp. Atk sharply increase if hit by a move it's weak to.",
      "find": ""
    },
    {
      "id": "BLUNDERPOLICY",
      "name": "Blunder Policy",
      "cat": "Other Items",
      "icon": "items/BLUNDERPOLICY.png",
      "desc": "Raises Speed sharply when a Pokémon misses with a move because of accuracy.",
      "find": ""
    },
    {
      "id": "THROATSPRAY",
      "name": "Throat Spray",
      "cat": "Other Items",
      "icon": "items/THROATSPRAY.png",
      "desc": "Raises Sp. Atk when a Pokémon uses a sound-based move.",
      "find": ""
    },
    {
      "id": "ROOMSERVICE",
      "name": "Room Service",
      "cat": "Held Items",
      "icon": "items/ROOMSERVICE.png",
      "desc": "An item to be held by a Pokémon. Lowers Speed when Trick Room takes effect.",
      "find": ""
    },
    {
      "id": "ELECTRICSEED",
      "name": "Electric Seed",
      "cat": "Held Items",
      "icon": "items/ELECTRICSEED.png",
      "desc": "An item to be held by a Pokémon. It boosts Defense on Electric Terrain. It can only be used once.",
      "find": ""
    },
    {
      "id": "GRASSYSEED",
      "name": "Grassy Seed",
      "cat": "Held Items",
      "icon": "items/GRASSYSEED.png",
      "desc": "An item to be held by a Pokémon. It boosts Defense on Grassy Terrain. It can only be used once.",
      "find": ""
    },
    {
      "id": "MISTYSEED",
      "name": "Misty Seed",
      "cat": "Held Items",
      "icon": "items/MISTYSEED.png",
      "desc": "An item to be held by a Pokémon. It boosts Sp. Def on Misty Terrain. It can only be used once.",
      "find": ""
    },
    {
      "id": "PSYCHICSEED",
      "name": "Psychic Seed",
      "cat": "Held Items",
      "icon": "items/PSYCHICSEED.png",
      "desc": "An item to be held by a Pokémon. It boosts Sp. Def on Psychic Terrain. It can only be used once.",
      "find": ""
    },
    {
      "id": "LIFEORB",
      "name": "Life Orb",
      "cat": "Held Items",
      "icon": "items/LIFEORB.png",
      "desc": "An item to be held by a Pokémon. It boosts the power of moves, but at the cost of some HP on each hit.",
      "find": ""
    },
    {
      "id": "EXPERTBELT",
      "name": "Expert Belt",
      "cat": "Held Items",
      "icon": "items/EXPERTBELT.png",
      "desc": "An item to be held by a Pokémon. It is a well-worn belt that slightly boosts the power of supereffective moves.",
      "find": ""
    },
    {
      "id": "METRONOME",
      "name": "Metronome",
      "cat": "Other Items",
      "icon": "items/METRONOME.png",
      "desc": "A Pokémon held item that boosts a move used consecutively. Its effect is reset if another move is used.",
      "find": ""
    },
    {
      "id": "MUSCLEBAND",
      "name": "Muscle Band",
      "cat": "Held Items",
      "icon": "items/MUSCLEBAND.png",
      "desc": "An item to be held by a Pokémon. It is a headband that slightly boosts the power of physical moves.",
      "find": ""
    },
    {
      "id": "WISEGLASSES",
      "name": "Wise Glasses",
      "cat": "Held Items",
      "icon": "items/WISEGLASSES.png",
      "desc": "An item to be held by a Pokémon. It is a thick pair of glasses that slightly boosts the power of special moves.",
      "find": ""
    },
    {
      "id": "RAZORCLAW",
      "name": "Razor Claw",
      "cat": "Held Items",
      "icon": "items/RAZORCLAW.png",
      "desc": "An item to be held by a Pokémon. It is a sharply hooked claw that ups the holder's critical-hit ratio.",
      "find": ""
    },
    {
      "id": "SCOPELENS",
      "name": "Scope Lens",
      "cat": "Held Items",
      "icon": "items/SCOPELENS.png",
      "desc": "An item to be held by a Pokémon. It is a lens that boosts the holder's critical-hit ratio.",
      "find": ""
    },
    {
      "id": "WIDELENS",
      "name": "Wide Lens",
      "cat": "Held Items",
      "icon": "items/WIDELENS.png",
      "desc": "An item to be held by a Pokémon. It is a magnifying lens that slightly boosts the accuracy of moves.",
      "find": ""
    },
    {
      "id": "ZOOMLENS",
      "name": "Zoom Lens",
      "cat": "Held Items",
      "icon": "items/ZOOMLENS.png",
      "desc": "An item to be held by a Pokémon. If the holder moves after its target, its accuracy will be boosted.",
      "find": ""
    },
    {
      "id": "KINGSROCK",
      "name": "King's Rock",
      "cat": "Held Items",
      "icon": "items/KINGSROCK.png",
      "desc": "An item to be held by a Pokémon. When the holder inflicts damage, the target may flinch.",
      "find": ""
    },
    {
      "id": "RAZORFANG",
      "name": "Razor Fang",
      "cat": "Held Items",
      "icon": "items/RAZORFANG.png",
      "desc": "An item to be held by a Pokémon. It may make foes and allies flinch when the holder inflicts damage.",
      "find": ""
    },
    {
      "id": "LAGGINGTAIL",
      "name": "Lagging Tail",
      "cat": "Held Items",
      "icon": "items/LAGGINGTAIL.png",
      "desc": "An item to be held by a Pokémon. It is tremendously heavy and makes the holder move slower than usual.",
      "find": ""
    },
    {
      "id": "QUICKCLAW",
      "name": "Quick Claw",
      "cat": "Held Items",
      "icon": "items/QUICKCLAW.png",
      "desc": "An item to be held by a Pokémon. A light, sharp claw that lets the bearer move first occasionally.",
      "find": ""
    },
    {
      "id": "FOCUSBAND",
      "name": "Focus Band",
      "cat": "Held Items",
      "icon": "items/FOCUSBAND.png",
      "desc": "An item to be held by a Pokémon. The holder may endure a potential KO attack, leaving it with just 1 HP.",
      "find": ""
    },
    {
      "id": "FOCUSSASH",
      "name": "Focus Sash",
      "cat": "Held Items",
      "icon": "items/FOCUSSASH.png",
      "desc": "An item to be held by a Pokémon. If it has full HP, the holder will endure one potential KO attack, leaving 1 HP.",
      "find": ""
    },
    {
      "id": "FLAMEORB",
      "name": "Flame Orb",
      "cat": "Held Items",
      "icon": "items/FLAMEORB.png",
      "desc": "An item to be held by a Pokémon. It is a bizarre orb that inflicts a burn on the holder in battle.",
      "find": ""
    },
    {
      "id": "TOXICORB",
      "name": "Toxic Orb",
      "cat": "Held Items",
      "icon": "items/TOXICORB.png",
      "desc": "An item to be held by a Pokémon. It is a bizarre orb that badly poisons the holder in battle.",
      "find": ""
    },
    {
      "id": "STICKYBARB",
      "name": "Sticky Barb",
      "cat": "Held Items",
      "icon": "items/STICKYBARB.png",
      "desc": "A held item that damages the holder on every turn. It may latch on to Pokémon that touch the holder.",
      "find": ""
    },
    {
      "id": "IRONBALL",
      "name": "Iron Ball",
      "cat": "Held Items",
      "icon": "items/IRONBALL.png",
      "desc": "A Pokémon held item that cuts Speed. It makes Flying-type and levitating holders susceptible to Ground moves.",
      "find": ""
    },
    {
      "id": "RINGTARGET",
      "name": "Ring Target",
      "cat": "Other Items",
      "icon": "items/RINGTARGET.png",
      "desc": "Moves that would otherwise have no effect will land on the Pokémon that holds it.",
      "find": ""
    },
    {
      "id": "MACHOBRACE",
      "name": "Macho Brace",
      "cat": "Held Items",
      "icon": "items/MACHOBRACE.png",
      "desc": "An item to be held by a Pokémon. It is a stiff, heavy brace that promotes strong growth but lowers Speed.",
      "find": ""
    },
    {
      "id": "POWERWEIGHT",
      "name": "Power Weight",
      "cat": "Other Items",
      "icon": "items/POWERWEIGHT.png",
      "desc": "A Pokémon held item that promotes HP gain on leveling, but reduces the Speed stat.",
      "find": ""
    },
    {
      "id": "POWERBRACER",
      "name": "Power Bracer",
      "cat": "Other Items",
      "icon": "items/POWERBRACER.png",
      "desc": "A Pokémon held item that promotes Attack gain on leveling, but reduces the Speed stat.",
      "find": ""
    },
    {
      "id": "POWERBELT",
      "name": "Power Belt",
      "cat": "Other Items",
      "icon": "items/POWERBELT.png",
      "desc": "A Pokémon held item that promotes Defense gain on leveling, but reduces the Speed stat.",
      "find": ""
    },
    {
      "id": "POWERLENS",
      "name": "Power Lens",
      "cat": "Other Items",
      "icon": "items/POWERLENS.png",
      "desc": "A Pokémon held item that promotes Sp. Atk gain on leveling, but reduces the Speed stat.",
      "find": ""
    },
    {
      "id": "POWERBAND",
      "name": "Power Band",
      "cat": "Other Items",
      "icon": "items/POWERBAND.png",
      "desc": "A Pokémon held item that promotes Sp. Def gain on leveling, but reduces the Speed stat.",
      "find": ""
    },
    {
      "id": "POWERANKLET",
      "name": "Power Anklet",
      "cat": "Other Items",
      "icon": "items/POWERANKLET.png",
      "desc": "A Pokémon held item that promotes Speed gain on leveling, but reduces the Speed stat.",
      "find": ""
    },
    {
      "id": "LAXINCENSE",
      "name": "Lax Incense",
      "cat": "Held Items",
      "icon": "items/LAXINCENSE.png",
      "desc": "An item to be held by a Pokémon. The tricky aroma of this incense may make attacks miss the holder.",
      "find": ""
    },
    {
      "id": "FULLINCENSE",
      "name": "Full Incense",
      "cat": "Held Items",
      "icon": "items/FULLINCENSE.png",
      "desc": "An item to be held by a Pokémon. This exotic-smelling incense makes the holder bloated and slow moving.",
      "find": ""
    },
    {
      "id": "LUCKINCENSE",
      "name": "Luck Incense",
      "cat": "Held Items",
      "icon": "items/LUCKINCENSE.png",
      "desc": "An item to be held by a Pokémon. It doubles a battle's prize money if the holding Pokémon joins in.",
      "find": ""
    },
    {
      "id": "PUREINCENSE",
      "name": "Pure Incense",
      "cat": "Held Items",
      "icon": "items/PUREINCENSE.png",
      "desc": "An item to be held by a Pokémon. It helps keep wild Pokémon away if the holder is the first one in the party.",
      "find": ""
    },
    {
      "id": "SEAINCENSE",
      "name": "Sea Incense",
      "cat": "Held Items",
      "icon": "items/SEAINCENSE.png",
      "desc": "An item to be held by a Pokémon. It has a curious aroma that boosts the power of Water-type moves.",
      "find": ""
    },
    {
      "id": "WAVEINCENSE",
      "name": "Wave Incense",
      "cat": "Held Items",
      "icon": "items/WAVEINCENSE.png",
      "desc": "An item to be held by a Pokémon. It has a curious aroma that boosts the power of Water-type moves.",
      "find": ""
    },
    {
      "id": "ROSEINCENSE",
      "name": "Rose Incense",
      "cat": "Held Items",
      "icon": "items/ROSEINCENSE.png",
      "desc": "An item to be held by a Pokémon. This exotic-smelling incense boosts the power of Grass-type moves.",
      "find": ""
    },
    {
      "id": "ODDINCENSE",
      "name": "Odd Incense",
      "cat": "Held Items",
      "icon": "items/ODDINCENSE.png",
      "desc": "An item to be held by a Pokémon. This exotic-smelling incense boosts the power of Psychic-type moves.",
      "find": ""
    },
    {
      "id": "ROCKINCENSE",
      "name": "Rock Incense",
      "cat": "Held Items",
      "icon": "items/ROCKINCENSE.png",
      "desc": "An item to be held by a Pokémon. This exotic-smelling incense boosts the power of Rock-type moves.",
      "find": ""
    },
    {
      "id": "CHARCOAL",
      "name": "Charcoal",
      "cat": "Held Items",
      "icon": "items/CHARCOAL.png",
      "desc": "An item to be held by a Pokémon. It is a combustible fuel that boosts the power of Fire-type moves.",
      "find": ""
    },
    {
      "id": "MYSTICWATER",
      "name": "Mystic Water",
      "cat": "Held Items",
      "icon": "items/MYSTICWATER.png",
      "desc": "An item to be held by a Pokémon. It is a teardrop-shaped gem that ups the power of Water-type moves.",
      "find": ""
    },
    {
      "id": "MAGNET",
      "name": "Magnet",
      "cat": "Held Items",
      "icon": "items/MAGNET.png",
      "desc": "An item to be held by a Pokémon. It is a powerful magnet that boosts the power of Electric-type moves.",
      "find": ""
    },
    {
      "id": "MIRACLESEED",
      "name": "Miracle Seed",
      "cat": "Held Items",
      "icon": "items/MIRACLESEED.png",
      "desc": "An item to be held by a Pokémon. It is a seed imbued with life that ups the power of Grass-type moves.",
      "find": ""
    },
    {
      "id": "NEVERMELTICE",
      "name": "Never-Melt Ice",
      "cat": "Held Items",
      "icon": "items/NEVERMELTICE.png",
      "desc": "An item to be held by a Pokémon. It is a piece of ice that repels heat and boosts Ice-type moves.",
      "find": ""
    },
    {
      "id": "BLACKBELT",
      "name": "Black Belt",
      "cat": "Held Items",
      "icon": "items/BLACKBELT.png",
      "desc": "An item to be held by a Pokémon. It is a belt that boosts determination and Fighting-type moves.",
      "find": ""
    },
    {
      "id": "POISONBARB",
      "name": "Poison Barb",
      "cat": "Held Items",
      "icon": "items/POISONBARB.png",
      "desc": "An item to be held by a Pokémon. It is a small, poisonous barb that ups the power of Poison-type moves.",
      "find": ""
    },
    {
      "id": "SOFTSAND",
      "name": "Soft Sand",
      "cat": "Held Items",
      "icon": "items/SOFTSAND.png",
      "desc": "An item to be held by a Pokémon. It is a loose, silky sand that boosts the power of Ground-type moves.",
      "find": ""
    },
    {
      "id": "SHARPBEAK",
      "name": "Sharp Beak",
      "cat": "Held Items",
      "icon": "items/SHARPBEAK.png",
      "desc": "An item to be held by a Pokémon. It is a long, sharp beak that boosts the power of Flying-type moves.",
      "find": ""
    },
    {
      "id": "TWISTEDSPOON",
      "name": "Twisted Spoon",
      "cat": "Held Items",
      "icon": "items/TWISTEDSPOON.png",
      "desc": "An item to be held by a Pokémon. It is a spoon imbued with telekinetic power that boosts Psychic-type moves.",
      "find": ""
    },
    {
      "id": "SILVERPOWDER",
      "name": "Silver Powder",
      "cat": "Held Items",
      "icon": "items/SILVERPOWDER.png",
      "desc": "An item to be held by a Pokémon. It is a shiny, silver powder that ups the power of Bug-type moves.",
      "find": ""
    },
    {
      "id": "HARDSTONE",
      "name": "Hard Stone",
      "cat": "Held Items",
      "icon": "items/HARDSTONE.png",
      "desc": "An item to be held by a Pokémon. It is an unbreakable stone that ups the power of Rock-type moves.",
      "find": ""
    },
    {
      "id": "SPELLTAG",
      "name": "Spell Tag",
      "cat": "Held Items",
      "icon": "items/SPELLTAG.png",
      "desc": "An item to be held by a Pokémon. It is a sinister, eerie tag that boosts the power of Ghost-type moves.",
      "find": ""
    },
    {
      "id": "DRAGONFANG",
      "name": "Dragon Fang",
      "cat": "Held Items",
      "icon": "items/DRAGONFANG.png",
      "desc": "An item to be held by a Pokémon. It is a hard and sharp fang that ups the power of Dragon-type moves.",
      "find": ""
    },
    {
      "id": "BLACKGLASSES",
      "name": "Black Glasses",
      "cat": "Held Items",
      "icon": "items/BLACKGLASSES.png",
      "desc": "An item to be held by a Pokémon. It is a shady-looking pair of glasses that boosts Dark-type moves.",
      "find": ""
    },
    {
      "id": "METALCOAT",
      "name": "Metal Coat",
      "cat": "Held Items",
      "icon": "items/METALCOAT.png",
      "desc": "An item to be held by a Pokémon. It is a special metallic film that ups the power of Steel-type moves.",
      "find": ""
    },
    {
      "id": "SILKSCARF",
      "name": "Silk Scarf",
      "cat": "Held Items",
      "icon": "items/SILKSCARF.png",
      "desc": "An item to be held by a Pokémon. It is a sumptuous scarf that boosts the power of Normal-type moves.",
      "find": ""
    },
    {
      "id": "FLAMEPLATE",
      "name": "Flame Plate",
      "cat": "Held Items",
      "icon": "items/FLAMEPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Fire-type moves.",
      "find": ""
    },
    {
      "id": "SPLASHPLATE",
      "name": "Splash Plate",
      "cat": "Held Items",
      "icon": "items/SPLASHPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Water-type moves.",
      "find": ""
    },
    {
      "id": "ZAPPLATE",
      "name": "Zap Plate",
      "cat": "Held Items",
      "icon": "items/ZAPPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Electric-type moves.",
      "find": ""
    },
    {
      "id": "MEADOWPLATE",
      "name": "Meadow Plate",
      "cat": "Held Items",
      "icon": "items/MEADOWPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Grass-type moves.",
      "find": ""
    },
    {
      "id": "ICICLEPLATE",
      "name": "Icicle Plate",
      "cat": "Held Items",
      "icon": "items/ICICLEPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Ice-type moves.",
      "find": ""
    },
    {
      "id": "FISTPLATE",
      "name": "Fist Plate",
      "cat": "Held Items",
      "icon": "items/FISTPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Fighting-type moves.",
      "find": ""
    },
    {
      "id": "TOXICPLATE",
      "name": "Toxic Plate",
      "cat": "Held Items",
      "icon": "items/TOXICPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Poison-type moves.",
      "find": ""
    },
    {
      "id": "EARTHPLATE",
      "name": "Earth Plate",
      "cat": "Held Items",
      "icon": "items/EARTHPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Ground-type moves.",
      "find": ""
    },
    {
      "id": "SKYPLATE",
      "name": "Sky Plate",
      "cat": "Held Items",
      "icon": "items/SKYPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Flying-type moves.",
      "find": ""
    },
    {
      "id": "MINDPLATE",
      "name": "Mind Plate",
      "cat": "Held Items",
      "icon": "items/MINDPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Psychic-type moves.",
      "find": ""
    },
    {
      "id": "INSECTPLATE",
      "name": "Insect Plate",
      "cat": "Held Items",
      "icon": "items/INSECTPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Bug-type moves.",
      "find": ""
    },
    {
      "id": "STONEPLATE",
      "name": "Stone Plate",
      "cat": "Held Items",
      "icon": "items/STONEPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Rock-type moves.",
      "find": ""
    },
    {
      "id": "SPOOKYPLATE",
      "name": "Spooky Plate",
      "cat": "Held Items",
      "icon": "items/SPOOKYPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Ghost-type moves.",
      "find": ""
    },
    {
      "id": "DRACOPLATE",
      "name": "Draco Plate",
      "cat": "Held Items",
      "icon": "items/DRACOPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Dragon-type moves.",
      "find": ""
    },
    {
      "id": "DREADPLATE",
      "name": "Dread Plate",
      "cat": "Held Items",
      "icon": "items/DREADPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Dark-type moves.",
      "find": ""
    },
    {
      "id": "IRONPLATE",
      "name": "Iron Plate",
      "cat": "Held Items",
      "icon": "items/IRONPLATE.png",
      "desc": "An item to be held by a Pokémon. It is a stone tablet that boosts the power of Steel-type moves.",
      "find": ""
    },
    {
      "id": "FIREGEM",
      "name": "Fire Gem",
      "cat": "Other Items",
      "icon": "items/FIREGEM.png",
      "desc": "A gem with an essence of fire. When held, it strengthens the power of a Fire-type move only once.",
      "find": ""
    },
    {
      "id": "WATERGEM",
      "name": "Water Gem",
      "cat": "Other Items",
      "icon": "items/WATERGEM.png",
      "desc": "A gem with an essence of water. When held, it strengthens the power of a Water-type move only once.",
      "find": ""
    },
    {
      "id": "ELECTRICGEM",
      "name": "Electric Gem",
      "cat": "Other Items",
      "icon": "items/ELECTRICGEM.png",
      "desc": "A gem with an essence of electricity. When held, it strengthens the power of an Electric-type move only once.",
      "find": ""
    },
    {
      "id": "GRASSGEM",
      "name": "Grass Gem",
      "cat": "Other Items",
      "icon": "items/GRASSGEM.png",
      "desc": "A gem with an essence of nature. When held, it strengthens the power of a Grass-type move only once.",
      "find": ""
    },
    {
      "id": "ICEGEM",
      "name": "Ice Gem",
      "cat": "Other Items",
      "icon": "items/ICEGEM.png",
      "desc": "A gem with an essence of ice. When held, it strengthens the power of an Ice-type move only once.",
      "find": ""
    },
    {
      "id": "FIGHTINGGEM",
      "name": "Fighting Gem",
      "cat": "Other Items",
      "icon": "items/FIGHTINGGEM.png",
      "desc": "A gem with an essence of combat. When held, it strengthens the power of a Fighting-type move only once.",
      "find": ""
    },
    {
      "id": "POISONGEM",
      "name": "Poison Gem",
      "cat": "Other Items",
      "icon": "items/POISONGEM.png",
      "desc": "A gem with an essence of poison. When held, it strengthens the power of a Poison-type move only once.",
      "find": ""
    },
    {
      "id": "GROUNDGEM",
      "name": "Ground Gem",
      "cat": "Other Items",
      "icon": "items/GROUNDGEM.png",
      "desc": "A gem with an essence of land. When held, it strengthens the power of a Ground-type move only once.",
      "find": ""
    },
    {
      "id": "FLYINGGEM",
      "name": "Flying Gem",
      "cat": "Other Items",
      "icon": "items/FLYINGGEM.png",
      "desc": "A gem with an essence of air. When held, it strengthens the power of a Flying-type move only once.",
      "find": ""
    },
    {
      "id": "PSYCHICGEM",
      "name": "Psychic Gem",
      "cat": "Other Items",
      "icon": "items/PSYCHICGEM.png",
      "desc": "A gem with an essence of the mind. When held, it strengthens the power of a Psychic-type move only once.",
      "find": ""
    },
    {
      "id": "BUGGEM",
      "name": "Bug Gem",
      "cat": "Other Items",
      "icon": "items/BUGGEM.png",
      "desc": "A gem with an insect-like essence. When held, it strengthens the power of a Bug-type move only once.",
      "find": ""
    },
    {
      "id": "ROCKGEM",
      "name": "Rock Gem",
      "cat": "Other Items",
      "icon": "items/ROCKGEM.png",
      "desc": "A gem with an essence of rock. When held, it strengthens the power of a Rock-type move only once.",
      "find": ""
    },
    {
      "id": "GHOSTGEM",
      "name": "Ghost Gem",
      "cat": "Other Items",
      "icon": "items/GHOSTGEM.png",
      "desc": "A gem with a spectral essence. When held, it strengthens the power of a Ghost-type move only once.",
      "find": ""
    },
    {
      "id": "DRAGONGEM",
      "name": "Dragon Gem",
      "cat": "Other Items",
      "icon": "items/DRAGONGEM.png",
      "desc": "A gem with a draconic essence. When held, it strengthens the power of a Dragon-type move only once.",
      "find": ""
    },
    {
      "id": "DARKGEM",
      "name": "Dark Gem",
      "cat": "Other Items",
      "icon": "items/DARKGEM.png",
      "desc": "A gem with an essence of darkness. When held, it strengthens the power of a Dark-type move only once.",
      "find": ""
    },
    {
      "id": "STEELGEM",
      "name": "Steel Gem",
      "cat": "Other Items",
      "icon": "items/STEELGEM.png",
      "desc": "A gem with an essence of steel. When held, it strengthens the power of a Steel-type move only once.",
      "find": ""
    },
    {
      "id": "NORMALGEM",
      "name": "Normal Gem",
      "cat": "Other Items",
      "icon": "items/NORMALGEM.png",
      "desc": "A gem with an ordinary essence. When held, it strengthens the power of a Normal-type move only once.",
      "find": ""
    },
    {
      "id": "LIGHTBALL",
      "name": "Light Ball",
      "cat": "Held Items",
      "icon": "items/LIGHTBALL.png",
      "desc": "An item to be held by Pikachu. It is a puzzling orb that raises the Attack and Sp. Atk stat.",
      "find": ""
    },
    {
      "id": "LUCKYPUNCH",
      "name": "Lucky Punch",
      "cat": "Held Items",
      "icon": "items/LUCKYPUNCH.png",
      "desc": "An item to be held by Chansey. It is a pair of gloves that boosts Chansey's critical-hit ratio.",
      "find": ""
    },
    {
      "id": "METALPOWDER",
      "name": "Metal Powder",
      "cat": "Held Items",
      "icon": "items/METALPOWDER.png",
      "desc": "An item to be held by Ditto. Extremely fine yet hard, this odd powder boosts the Defense stat.",
      "find": ""
    },
    {
      "id": "QUICKPOWDER",
      "name": "Quick Powder",
      "cat": "Held Items",
      "icon": "items/QUICKPOWDER.png",
      "desc": "An item to be held by Ditto. Extremely fine yet hard, this odd powder boosts the Speed stat.",
      "find": ""
    },
    {
      "id": "THICKCLUB",
      "name": "Thick Club",
      "cat": "Held Items",
      "icon": "items/THICKCLUB.png",
      "desc": "An item to be held by Cubone or Marowak. It is a hard bone of some sort that boosts the Attack stat.",
      "find": ""
    },
    {
      "id": "LEEK",
      "name": "Leek",
      "cat": "Held Items",
      "icon": "items/LEEK.png",
      "desc": "An item to be held by Farfetch'd. It is a very long and stiff stalk of leek that boosts the critical-hit ratio.",
      "find": ""
    },
    {
      "id": "SOULDEW",
      "name": "Soul Dew",
      "cat": "Held Items",
      "icon": "items/SOULDEW.png",
      "desc": "A wondrous orb to be held by either Latios or Latias. It raises the power of Psychic- and Dragon-type moves.",
      "find": ""
    },
    {
      "id": "DEEPSEATOOTH",
      "name": "Deep Sea Tooth",
      "cat": "Held Items",
      "icon": "items/DEEPSEATOOTH.png",
      "desc": "An item to be held by Clamperl. A fang that gleams a sharp silver, it raises the Sp. Atk stat.",
      "find": ""
    },
    {
      "id": "DEEPSEASCALE",
      "name": "Deep Sea Scale",
      "cat": "Held Items",
      "icon": "items/DEEPSEASCALE.png",
      "desc": "An item to be held by Clamperl. A scale that shines a faint pink, it raises the Sp. Def stat.",
      "find": ""
    },
    {
      "id": "ADAMANTORB",
      "name": "Adamant Orb",
      "cat": "Held Items",
      "icon": "items/ADAMANTORB.png",
      "desc": "A brightly gleaming orb to be held by Dialga. It boosts the power of Dragon- and Steel-type moves.",
      "find": ""
    },
    {
      "id": "LUSTROUSORB",
      "name": "Lustrous Orb",
      "cat": "Held Items",
      "icon": "items/LUSTROUSORB.png",
      "desc": "A beautifully glowing orb to be held by Palkia. It boosts the power of Dragon- and Water-type moves.",
      "find": ""
    },
    {
      "id": "GRISEOUSORB",
      "name": "Griseous Orb",
      "cat": "Held Items",
      "icon": "items/GRISEOUSORB.png",
      "desc": "A glowing orb to be held by Giratina. It boosts the power of Dragon- and Ghost-type moves.",
      "find": ""
    },
    {
      "id": "DOUSEDRIVE",
      "name": "Douse Drive",
      "cat": "Held Items",
      "icon": "items/DOUSEDRIVE.png",
      "desc": "A cassette to be held by Genesect. It changes Techno Blast to a Water-type move.",
      "find": ""
    },
    {
      "id": "SHOCKDRIVE",
      "name": "Shock Drive",
      "cat": "Held Items",
      "icon": "items/SHOCKDRIVE.png",
      "desc": "A cassette to be held by Genesect. It changes Techno Blast to an Electric-type move.",
      "find": ""
    },
    {
      "id": "BURNDRIVE",
      "name": "Burn Drive",
      "cat": "Held Items",
      "icon": "items/BURNDRIVE.png",
      "desc": "A cassette to be held by Genesect. It changes Techno Blast to a Fire-type move.",
      "find": ""
    },
    {
      "id": "CHILLDRIVE",
      "name": "Chill Drive",
      "cat": "Held Items",
      "icon": "items/CHILLDRIVE.png",
      "desc": "A cassette to be held by Genesect. It changes Techno Blast to an Ice-type move.",
      "find": ""
    },
    {
      "id": "EVERSTONE",
      "name": "Everstone",
      "cat": "Held Items",
      "icon": "items/EVERSTONE.png",
      "desc": "An item to be held by a Pokémon. The Pokémon holding this peculiar stone is prevented from evolving.",
      "find": ""
    },
    {
      "id": "DRAGONSCALE",
      "name": "Dragon Scale",
      "cat": "Held Items",
      "icon": "items/DRAGONSCALE.png",
      "desc": "A thick and tough scale. Dragon-type Pokémon may be holding this item when caught.",
      "find": ""
    },
    {
      "id": "UPGRADE",
      "name": "Upgrade",
      "cat": "Other Items",
      "icon": "items/UPGRADE.png",
      "desc": "A transparent device filled with all sorts of data. It was produced by Silph Co.",
      "find": ""
    },
    {
      "id": "DUBIOUSDISC",
      "name": "Dubious Disc",
      "cat": "Other Items",
      "icon": "items/DUBIOUSDISC.png",
      "desc": "A transparent device overflowing with dubious data.  Its producer is unknown.",
      "find": ""
    },
    {
      "id": "PROTECTOR",
      "name": "Protector",
      "cat": "Other Items",
      "icon": "items/PROTECTOR.png",
      "desc": "A protective item of some sort. It is extremely stiff and heavy. It is loved by a certain Pokémon.",
      "find": ""
    },
    {
      "id": "ELECTIRIZER",
      "name": "Electirizer",
      "cat": "Other Items",
      "icon": "items/ELECTIRIZER.png",
      "desc": "A box packed with a tremendous amount of electric energy. It is loved by a certain Pokémon.",
      "find": ""
    },
    {
      "id": "MAGMARIZER",
      "name": "Magmarizer",
      "cat": "Other Items",
      "icon": "items/MAGMARIZER.png",
      "desc": "A box packed with a tremendous amount of magma energy. It is loved by a certain Pokémon.",
      "find": ""
    },
    {
      "id": "REAPERCLOTH",
      "name": "Reaper Cloth",
      "cat": "Other Items",
      "icon": "items/REAPERCLOTH.png",
      "desc": "A cloth imbued with horrifyingly strong spiritual energy. It is loved by a certain Pokémon.",
      "find": ""
    },
    {
      "id": "PRISMSCALE",
      "name": "Prism Scale",
      "cat": "Other Items",
      "icon": "items/PRISMSCALE.png",
      "desc": "A mysterious scale that evolves certain Pokémon. It shines in rainbow colors.",
      "find": ""
    },
    {
      "id": "OVALSTONE",
      "name": "Oval Stone",
      "cat": "Other Items",
      "icon": "items/OVALSTONE.png",
      "desc": "A peculiar stone that makes certain species of Pokémon evolve. It is shaped like an egg.",
      "find": ""
    },
    {
      "id": "POTION",
      "name": "Potion",
      "cat": "Medicines",
      "icon": "items/POTION.png",
      "desc": "A spray-type medicine for treating wounds. It can be used to restore 20 HP to a single Pokémon.",
      "find": ""
    },
    {
      "id": "SUPERPOTION",
      "name": "Super Potion",
      "cat": "Medicines",
      "icon": "items/SUPERPOTION.png",
      "desc": "A spray-type medicine for treating wounds. It can be used to restore 60 HP to a single Pokémon.",
      "find": ""
    },
    {
      "id": "HYPERPOTION",
      "name": "Hyper Potion",
      "cat": "Medicines",
      "icon": "items/HYPERPOTION.png",
      "desc": "A spray-type medicine for treating wounds. It can be used to restore 120 HP to a single Pokémon.",
      "find": ""
    },
    {
      "id": "MAXPOTION",
      "name": "Max Potion",
      "cat": "Medicines",
      "icon": "items/MAXPOTION.png",
      "desc": "A spray-type medicine for treating wounds. It can completely restore the max HP of a single Pokémon.",
      "find": ""
    },
    {
      "id": "FULLRESTORE",
      "name": "Full Restore",
      "cat": "Medicines",
      "icon": "items/FULLRESTORE.png",
      "desc": "A medicine that fully restores the HP and heals any status problems of a single Pokémon.",
      "find": ""
    },
    {
      "id": "SACREDASH",
      "name": "Sacred Ash",
      "cat": "Medicines",
      "icon": "items/SACREDASH.png",
      "desc": "It revives all fainted Pokémon. In doing so, it also fully restores their HP.",
      "find": ""
    },
    {
      "id": "AWAKENING",
      "name": "Awakening",
      "cat": "Medicines",
      "icon": "items/AWAKENING.png",
      "desc": "A spray-type medicine. It awakens a Pokémon from the clutches of sleep.",
      "find": ""
    },
    {
      "id": "ANTIDOTE",
      "name": "Antidote",
      "cat": "Medicines",
      "icon": "items/ANTIDOTE.png",
      "desc": "A spray-type medicine. It lifts the effect of poison from one Pokémon.",
      "find": ""
    },
    {
      "id": "BURNHEAL",
      "name": "Burn Heal",
      "cat": "Medicines",
      "icon": "items/BURNHEAL.png",
      "desc": "A spray-type medicine. It heals a single Pokémon that is suffering from a burn.",
      "find": ""
    },
    {
      "id": "PARALYZEHEAL",
      "name": "Paralyze Heal",
      "cat": "Medicines",
      "icon": "items/PARALYZEHEAL.png",
      "desc": "A spray-type medicine. It eliminates paralysis from a single Pokémon.",
      "find": ""
    },
    {
      "id": "ICEHEAL",
      "name": "Ice Heal",
      "cat": "Medicines",
      "icon": "items/ICEHEAL.png",
      "desc": "A spray-type medicine. It defrosts a Pokémon that has been frozen solid.",
      "find": ""
    },
    {
      "id": "FULLHEAL",
      "name": "Full Heal",
      "cat": "Medicines",
      "icon": "items/FULLHEAL.png",
      "desc": "A spray-type medicine. It heals all the status problems of a single Pokémon.",
      "find": ""
    },
    {
      "id": "RAGECANDYBAR",
      "name": "Rage Candy Bar",
      "cat": "Medicines",
      "icon": "items/RAGECANDYBAR.png",
      "desc": "Mahogany Town's famous candy. It can be used once to heal all the status conditions of a Pokémon.",
      "find": ""
    },
    {
      "id": "LAVACOOKIE",
      "name": "Lava Cookie",
      "cat": "Medicines",
      "icon": "items/LAVACOOKIE.png",
      "desc": "Lavaridge Town's local specialty. It heals all the status problems of one Pokémon.",
      "find": ""
    },
    {
      "id": "OLDGATEAU",
      "name": "Old Gateau",
      "cat": "Medicines",
      "icon": "items/OLDGATEAU.png",
      "desc": "Old Chateau's hidden specialty. It heals all the status problems of a single Pokémon.",
      "find": ""
    },
    {
      "id": "CASTELIACONE",
      "name": "Casteliacone",
      "cat": "Medicines",
      "icon": "items/CASTELIACONE.png",
      "desc": "Castelia City's specialty, soft-serve ice cream. It heals all the status problems of a single Pokémon.",
      "find": ""
    },
    {
      "id": "SHALOURSABLE",
      "name": "Shalour Sable",
      "cat": "Medicines",
      "icon": "items/SHALOURSABLE.png",
      "desc": "Shalour City's famous shortbread. It can be used once to heal all the status conditions of a Pokémon.",
      "find": ""
    },
    {
      "id": "REVIVE",
      "name": "Revive",
      "cat": "Medicines",
      "icon": "items/REVIVE.png",
      "desc": "A medicine that revives a fainted Pokémon. It restores half the Pokémon's maximum HP.",
      "find": ""
    },
    {
      "id": "MAXREVIVE",
      "name": "Max Revive",
      "cat": "Medicines",
      "icon": "items/MAXREVIVE.png",
      "desc": "A medicine that revives a fainted Pokémon. It fully restores the Pokémon's HP.",
      "find": ""
    },
    {
      "id": "BERRYJUICE",
      "name": "Berry Juice",
      "cat": "Medicines",
      "icon": "items/BERRYJUICE.png",
      "desc": "A 100% pure juice made of Berries. It restores the HP of one Pokémon by just 20 points.",
      "find": ""
    },
    {
      "id": "SWEETHEART",
      "name": "Sweet Heart",
      "cat": "Medicines",
      "icon": "items/SWEETHEART.png",
      "desc": "Very sweet chocolate. It restores the HP of one Pokémon by only 20 points.",
      "find": ""
    },
    {
      "id": "FRESHWATER",
      "name": "Fresh Water",
      "cat": "Medicines",
      "icon": "items/FRESHWATER.png",
      "desc": "Water with high mineral content. It can be used to restore 30 HP to a single Pokémon.",
      "find": ""
    },
    {
      "id": "SODAPOP",
      "name": "Soda Pop",
      "cat": "Medicines",
      "icon": "items/SODAPOP.png",
      "desc": "A highly carbonated soda drink. It can be used to restore 50 HP to a single Pokémon.",
      "find": ""
    },
    {
      "id": "LEMONADE",
      "name": "Lemonade",
      "cat": "Medicines",
      "icon": "items/LEMONADE.png",
      "desc": "A very sweet and refreshing drink. It can be used to restore 70 HP to a single Pokémon.",
      "find": ""
    },
    {
      "id": "MOOMOOMILK",
      "name": "Moomoo Milk",
      "cat": "Medicines",
      "icon": "items/MOOMOOMILK.png",
      "desc": "Milk with a very high nutrition content. It restores the HP of one Pokémon by 100 points.",
      "find": ""
    },
    {
      "id": "ENERGYPOWDER",
      "name": "Energy Powder",
      "cat": "Medicines",
      "icon": "items/ENERGYPOWDER.png",
      "desc": "A very bitter medicinal powder. It can be used to restore 60 HP to a single Pokémon.",
      "find": ""
    },
    {
      "id": "ENERGYROOT",
      "name": "Energy Root",
      "cat": "Medicines",
      "icon": "items/ENERGYROOT.png",
      "desc": "An extremely bitter medicinal root. It can be used to restore 120 HP to a single Pokémon.",
      "find": ""
    },
    {
      "id": "HEALPOWDER",
      "name": "Heal Powder",
      "cat": "Medicines",
      "icon": "items/HEALPOWDER.png",
      "desc": "A very bitter medicine powder. It heals all the status problems of a single Pokémon.",
      "find": ""
    },
    {
      "id": "REVIVALHERB",
      "name": "Revival Herb",
      "cat": "Medicines",
      "icon": "items/REVIVALHERB.png",
      "desc": "A very bitter medicinal herb. It revives a fainted Pokémon, fully restoring its HP.",
      "find": ""
    },
    {
      "id": "ETHER",
      "name": "Ether",
      "cat": "Medicines",
      "icon": "items/ETHER.png",
      "desc": "It restores the PP of a Pokémon's selected move by a maximum of 10 points.",
      "find": ""
    },
    {
      "id": "MAXETHER",
      "name": "Max Ether",
      "cat": "Medicines",
      "icon": "items/MAXETHER.png",
      "desc": "It fully restores the PP of a single selected move that has been learned by the target Pokémon.",
      "find": ""
    },
    {
      "id": "ELIXIR",
      "name": "Elixir",
      "cat": "Medicines",
      "icon": "items/ELIXIR.png",
      "desc": "It restores the PP of all the moves learned by the targeted Pokémon by 10 points each.",
      "find": ""
    },
    {
      "id": "MAXELIXIR",
      "name": "Max Elixir",
      "cat": "Medicines",
      "icon": "items/MAXELIXIR.png",
      "desc": "It fully restores the PP of all the moves learned by the targeted Pokémon.",
      "find": ""
    },
    {
      "id": "PPUP",
      "name": "PP Up",
      "cat": "Medicines",
      "icon": "items/PPUP.png",
      "desc": "It slightly raises the maximum PP of a selected move that has been learned by the target Pokémon.",
      "find": ""
    },
    {
      "id": "PPMAX",
      "name": "PP Max",
      "cat": "Medicines",
      "icon": "items/PPMAX.png",
      "desc": "It maximally raises the top PP of a selected move that has been learned by the target Pokémon.",
      "find": ""
    },
    {
      "id": "HPUP",
      "name": "HP Up",
      "cat": "Medicines",
      "icon": "items/HPUP.png",
      "desc": "A nutritious drink for Pokémon. It raises the base HP of a single Pokémon.",
      "find": ""
    },
    {
      "id": "PROTEIN",
      "name": "Protein",
      "cat": "Medicines",
      "icon": "items/PROTEIN.png",
      "desc": "A nutritious drink for Pokémon. It raises the base Attack stat of a single Pokémon.",
      "find": ""
    },
    {
      "id": "IRON",
      "name": "Iron",
      "cat": "Medicines",
      "icon": "items/IRON.png",
      "desc": "A nutritious drink for Pokémon. It raises the base Defense stat of a single Pokémon.",
      "find": ""
    },
    {
      "id": "CALCIUM",
      "name": "Calcium",
      "cat": "Medicines",
      "icon": "items/CALCIUM.png",
      "desc": "A nutritious drink for Pokémon. It raises the base Sp. Atk (Special Attack) stat of a single Pokémon.",
      "find": ""
    },
    {
      "id": "ZINC",
      "name": "Zinc",
      "cat": "Medicines",
      "icon": "items/ZINC.png",
      "desc": "A nutritious drink for Pokémon. It raises the base Sp. Def (Special Defense) stat of a single Pokémon.",
      "find": ""
    },
    {
      "id": "CARBOS",
      "name": "Carbos",
      "cat": "Medicines",
      "icon": "items/CARBOS.png",
      "desc": "A nutritious drink for Pokémon. It raises the base Speed stat of a single Pokémon.",
      "find": ""
    },
    {
      "id": "HEALTHFEATHER",
      "name": "Health Feather",
      "cat": "Medicines",
      "icon": "items/HEALTHFEATHER.png",
      "desc": "An item for use on a Pokémon. It slightly increases the base HP of a single Pokémon.",
      "find": ""
    },
    {
      "id": "MUSCLEFEATHER",
      "name": "Muscle Feather",
      "cat": "Medicines",
      "icon": "items/MUSCLEFEATHER.png",
      "desc": "An item for use on a Pokémon. It slightly increases the base Attack stat of a single Pokémon.",
      "find": ""
    },
    {
      "id": "RESISTFEATHER",
      "name": "Resist Feather",
      "cat": "Medicines",
      "icon": "items/RESISTFEATHER.png",
      "desc": "An item for use on a Pokémon. It slightly increases the base Defense stat of a single Pokémon.",
      "find": ""
    },
    {
      "id": "GENIUSFEATHER",
      "name": "Genius Feather",
      "cat": "Medicines",
      "icon": "items/GENIUSFEATHER.png",
      "desc": "An item for use on a Pokémon. It slightly increases the base Sp. Atk stat of a single Pokémon.",
      "find": ""
    },
    {
      "id": "CLEVERFEATHER",
      "name": "Clever Feather",
      "cat": "Medicines",
      "icon": "items/CLEVERFEATHER.png",
      "desc": "An item for use on a Pokémon. It slightly increases the base Sp. Def stat of a single Pokémon.",
      "find": ""
    },
    {
      "id": "SWIFTFEATHER",
      "name": "Swift Feather",
      "cat": "Medicines",
      "icon": "items/SWIFTFEATHER.png",
      "desc": "An item for use on a Pokémon. It slightly increases the base Speed stat of a single Pokémon.",
      "find": ""
    },
    {
      "id": "ABILITYCAPSULE",
      "name": "Ability Capsule",
      "cat": "Medicines",
      "icon": "items/ABILITYCAPSULE.png",
      "desc": "A capsule that allows a Pokémon with two Abilities to switch between these Abilities when it is used.",
      "find": ""
    },
    {
      "id": "ABILITYPATCH",
      "name": "Ability Patch",
      "cat": "Medicines",
      "icon": "items/ABILITYPATCH.png",
      "desc": "A patch that allows a Pokémon with a regular Ability to have a rare Ability.",
      "find": ""
    },
    {
      "id": "RARECANDY",
      "name": "Rare Candy",
      "cat": "Medicines",
      "icon": "items/RARECANDY.png",
      "desc": "A candy that is packed with energy. It raises the level of a single Pokémon by one.",
      "find": ""
    },
    {
      "id": "MASTERBALL",
      "name": "Master Ball",
      "cat": "Poké Balls",
      "icon": "items/MASTERBALL.png",
      "desc": "The best Ball with the ultimate level of performance. It will catch any wild Pokémon without fail.",
      "find": ""
    },
    {
      "id": "ULTRABALL",
      "name": "Ultra Ball",
      "cat": "Poké Balls",
      "icon": "items/ULTRABALL.png",
      "desc": "An ultra-performance Ball that provides a higher Pokémon catch rate than a Great Ball.",
      "find": ""
    },
    {
      "id": "GREATBALL",
      "name": "Great Ball",
      "cat": "Poké Balls",
      "icon": "items/GREATBALL.png",
      "desc": "A good, high-performance Ball that provides a higher Pokémon catch rate than a standard Poké Ball.",
      "find": ""
    },
    {
      "id": "POKEBALL",
      "name": "Poké Ball",
      "cat": "Poké Balls",
      "icon": "items/POKEBALL.png",
      "desc": "A device for catching wild Pokémon. It is thrown like a ball at the target. It is designed as a capsule system.",
      "find": ""
    },
    {
      "id": "SAFARIBALL",
      "name": "Safari Ball",
      "cat": "Poké Balls",
      "icon": "items/SAFARIBALL.png",
      "desc": "A special Poké Ball that is used only in the Safari Zone. It is decorated in a camouflage pattern.",
      "find": ""
    },
    {
      "id": "SPORTBALL",
      "name": "Sport Ball",
      "cat": "Poké Balls",
      "icon": "items/SPORTBALL.png",
      "desc": "A special Poké Ball for the Bug-Catching Contest.",
      "find": ""
    },
    {
      "id": "NETBALL",
      "name": "Net Ball",
      "cat": "Poké Balls",
      "icon": "items/NETBALL.png",
      "desc": "A somewhat different Poké Ball that works especially well on Water- and Bug-type Pokémon.",
      "find": ""
    },
    {
      "id": "DIVEBALL",
      "name": "Dive Ball",
      "cat": "Poké Balls",
      "icon": "items/DIVEBALL.png",
      "desc": "A somewhat different Poké Ball that works especially well on Pokémon that live underwater.",
      "find": ""
    },
    {
      "id": "NESTBALL",
      "name": "Nest Ball",
      "cat": "Poké Balls",
      "icon": "items/NESTBALL.png",
      "desc": "A somewhat different Poké Ball that works especially well on weaker Pokémon in the wild.",
      "find": ""
    },
    {
      "id": "REPEATBALL",
      "name": "Repeat Ball",
      "cat": "Poké Balls",
      "icon": "items/REPEATBALL.png",
      "desc": "A somewhat different Poké Ball that works especially well on Pokémon species that were previously caught.",
      "find": ""
    },
    {
      "id": "TIMERBALL",
      "name": "Timer Ball",
      "cat": "Poké Balls",
      "icon": "items/TIMERBALL.png",
      "desc": "A somewhat different Ball that becomes progressively better the more turns there are in a battle.",
      "find": ""
    },
    {
      "id": "LUXURYBALL",
      "name": "Luxury Ball",
      "cat": "Poké Balls",
      "icon": "items/LUXURYBALL.png",
      "desc": "A comfortable Poké Ball that makes a caught wild Pokémon quickly grow friendly.",
      "find": ""
    },
    {
      "id": "PREMIERBALL",
      "name": "Premier Ball",
      "cat": "Poké Balls",
      "icon": "items/PREMIERBALL.png",
      "desc": "A somewhat rare Poké Ball that has been specially made to commemorate an event of some sort.",
      "find": ""
    },
    {
      "id": "DUSKBALL",
      "name": "Dusk Ball",
      "cat": "Poké Balls",
      "icon": "items/DUSKBALL.png",
      "desc": "A somewhat different Poké Ball that makes it easier to catch wild Pokémon at night or in dark places like caves.",
      "find": ""
    },
    {
      "id": "HEALBALL",
      "name": "Heal Ball",
      "cat": "Poké Balls",
      "icon": "items/HEALBALL.png",
      "desc": "A remedial Poké Ball that restores the caught Pokémon's HP and eliminates any status problem.",
      "find": ""
    },
    {
      "id": "QUICKBALL",
      "name": "Quick Ball",
      "cat": "Poké Balls",
      "icon": "items/QUICKBALL.png",
      "desc": "A somewhat different Poké Ball that provides a better catch rate if used at the start of a wild encounter.",
      "find": ""
    },
    {
      "id": "CHERISHBALL",
      "name": "Cherish Ball",
      "cat": "Poké Balls",
      "icon": "items/CHERISHBALL.png",
      "desc": "A quite rare Poké Ball that has been specially crafted to commemorate an occasion of some sort.",
      "find": ""
    },
    {
      "id": "FASTBALL",
      "name": "Fast Ball",
      "cat": "Poké Balls",
      "icon": "items/FASTBALL.png",
      "desc": "A Poké Ball that makes it easier to catch fast Pokémon.",
      "find": ""
    },
    {
      "id": "LEVELBALL",
      "name": "Level Ball",
      "cat": "Poké Balls",
      "icon": "items/LEVELBALL.png",
      "desc": "A Poké Ball for catching Pokémon that are a lower level than your own.",
      "find": ""
    },
    {
      "id": "LUREBALL",
      "name": "Lure Ball",
      "cat": "Poké Balls",
      "icon": "items/LUREBALL.png",
      "desc": "A Poké Ball for catching Pokémon hooked by a Rod when fishing.",
      "find": ""
    },
    {
      "id": "HEAVYBALL",
      "name": "Heavy Ball",
      "cat": "Poké Balls",
      "icon": "items/HEAVYBALL.png",
      "desc": "A Poké Ball for catching very heavy Pokémon.",
      "find": ""
    },
    {
      "id": "LOVEBALL",
      "name": "Love Ball",
      "cat": "Poké Balls",
      "icon": "items/LOVEBALL.png",
      "desc": "A Poké Ball for catching Pokémon that are the opposite gender of your Pokémon.",
      "find": ""
    },
    {
      "id": "FRIENDBALL",
      "name": "Friend Ball",
      "cat": "Poké Balls",
      "icon": "items/FRIENDBALL.png",
      "desc": "A Poké Ball that makes caught Pokémon more friendly.",
      "find": ""
    },
    {
      "id": "MOONBALL",
      "name": "Moon Ball",
      "cat": "Poké Balls",
      "icon": "items/MOONBALL.png",
      "desc": "A Poké Ball for catching Pokémon that evolve using the Moon Stone.",
      "find": ""
    },
    {
      "id": "TRAININGBALL",
      "name": "Training Ball",
      "cat": "Poké Balls",
      "icon": "items/TRAININGBALL.png",
      "desc": "A Poké Ball made for training. A Pokémon caught in it always gains 3 effort points from each Pokémon it defeats.",
      "find": ""
    },
    {
      "id": "CHERIBERRY",
      "name": "Cheri Berry",
      "cat": "Berries",
      "icon": "items/CHERIBERRY.png",
      "desc": "It may be used or held by a Pokémon to recover from paralysis.",
      "find": ""
    },
    {
      "id": "CHESTOBERRY",
      "name": "Chesto Berry",
      "cat": "Berries",
      "icon": "items/CHESTOBERRY.png",
      "desc": "It may be used or held by a Pokémon to recover from sleep.",
      "find": ""
    },
    {
      "id": "PECHABERRY",
      "name": "Pecha Berry",
      "cat": "Berries",
      "icon": "items/PECHABERRY.png",
      "desc": "It may be used or held by a Pokémon to recover from poison.",
      "find": ""
    },
    {
      "id": "RAWSTBERRY",
      "name": "Rawst Berry",
      "cat": "Berries",
      "icon": "items/RAWSTBERRY.png",
      "desc": "It may be used or held by a Pokémon to recover from a burn.",
      "find": ""
    },
    {
      "id": "ASPEARBERRY",
      "name": "Aspear Berry",
      "cat": "Berries",
      "icon": "items/ASPEARBERRY.png",
      "desc": "It may be used or held by a Pokémon to defrost it.",
      "find": ""
    },
    {
      "id": "LEPPABERRY",
      "name": "Leppa Berry",
      "cat": "Berries",
      "icon": "items/LEPPABERRY.png",
      "desc": "It may be used or held by a Pokémon to restore a move's PP by 10.",
      "find": ""
    },
    {
      "id": "ORANBERRY",
      "name": "Oran Berry",
      "cat": "Berries",
      "icon": "items/ORANBERRY.png",
      "desc": "It may be used or held by a Pokémon to heal the user by just 10 HP.",
      "find": ""
    },
    {
      "id": "PERSIMBERRY",
      "name": "Persim Berry",
      "cat": "Berries",
      "icon": "items/PERSIMBERRY.png",
      "desc": "It may be used or held by a Pokémon to recover from confusion.",
      "find": ""
    },
    {
      "id": "LUMBERRY",
      "name": "Lum Berry",
      "cat": "Berries",
      "icon": "items/LUMBERRY.png",
      "desc": "It may be used or held by a Pokémon to recover from any status problem.",
      "find": ""
    },
    {
      "id": "SITRUSBERRY",
      "name": "Sitrus Berry",
      "cat": "Berries",
      "icon": "items/SITRUSBERRY.png",
      "desc": "It may be used or held by a Pokémon to heal the user's HP a little.",
      "find": ""
    },
    {
      "id": "FIGYBERRY",
      "name": "Figy Berry",
      "cat": "Berries",
      "icon": "items/FIGYBERRY.png",
      "desc": "If held by a Pokémon, it restores the user's HP in a pinch, but will cause confusion if it hates the taste.",
      "find": ""
    },
    {
      "id": "WIKIBERRY",
      "name": "Wiki Berry",
      "cat": "Berries",
      "icon": "items/WIKIBERRY.png",
      "desc": "If held by a Pokémon, it restores the user's HP in a pinch, but will cause confusion if it hates the taste.",
      "find": ""
    },
    {
      "id": "MAGOBERRY",
      "name": "Mago Berry",
      "cat": "Berries",
      "icon": "items/MAGOBERRY.png",
      "desc": "If held by a Pokémon, it restores the user's HP in a pinch, but will cause confusion if it hates the taste.",
      "find": ""
    },
    {
      "id": "AGUAVBERRY",
      "name": "Aguav Berry",
      "cat": "Berries",
      "icon": "items/AGUAVBERRY.png",
      "desc": "If held by a Pokémon, it restores the user's HP in a pinch, but will cause confusion if it hates the taste.",
      "find": ""
    },
    {
      "id": "IAPAPABERRY",
      "name": "Iapapa Berry",
      "cat": "Berries",
      "icon": "items/IAPAPABERRY.png",
      "desc": "If held by a Pokémon, it restores the user's HP in a pinch, but will cause confusion if it hates the taste.",
      "find": ""
    },
    {
      "id": "RAZZBERRY",
      "name": "Razz Berry",
      "cat": "Berries",
      "icon": "items/RAZZBERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "BLUKBERRY",
      "name": "Bluk Berry",
      "cat": "Berries",
      "icon": "items/BLUKBERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "NANABBERRY",
      "name": "Nanab Berry",
      "cat": "Berries",
      "icon": "items/NANABBERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "WEPEARBERRY",
      "name": "Wepear Berry",
      "cat": "Berries",
      "icon": "items/WEPEARBERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "PINAPBERRY",
      "name": "Pinap Berry",
      "cat": "Berries",
      "icon": "items/PINAPBERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "POMEGBERRY",
      "name": "Pomeg Berry",
      "cat": "Berries",
      "icon": "items/POMEGBERRY.png",
      "desc": "Using it on a Pokémon makes it more friendly, but it also lowers its base HP.",
      "find": ""
    },
    {
      "id": "KELPSYBERRY",
      "name": "Kelpsy Berry",
      "cat": "Berries",
      "icon": "items/KELPSYBERRY.png",
      "desc": "Using it on a Pokémon makes it more friendly, but it also lowers its base Attack stat.",
      "find": ""
    },
    {
      "id": "QUALOTBERRY",
      "name": "Qualot Berry",
      "cat": "Berries",
      "icon": "items/QUALOTBERRY.png",
      "desc": "Using it on a Pokémon makes it more friendly, but it also lowers its base Defense stat.",
      "find": ""
    },
    {
      "id": "HONDEWBERRY",
      "name": "Hondew Berry",
      "cat": "Berries",
      "icon": "items/HONDEWBERRY.png",
      "desc": "Using it on a Pokémon makes it more friendly, but it also lowers its base Sp. Atk stat.",
      "find": ""
    },
    {
      "id": "GREPABERRY",
      "name": "Grepa Berry",
      "cat": "Berries",
      "icon": "items/GREPABERRY.png",
      "desc": "Using it on a Pokémon makes it more friendly, but it also lowers its base Sp. Def stat.",
      "find": ""
    },
    {
      "id": "TAMATOBERRY",
      "name": "Tamato Berry",
      "cat": "Berries",
      "icon": "items/TAMATOBERRY.png",
      "desc": "Using it on a Pokémon makes it more friendly, but it also lowers its base Speed stat.",
      "find": ""
    },
    {
      "id": "CORNNBERRY",
      "name": "Cornn Berry",
      "cat": "Berries",
      "icon": "items/CORNNBERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "MAGOSTBERRY",
      "name": "Magost Berry",
      "cat": "Berries",
      "icon": "items/MAGOSTBERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "RABUTABERRY",
      "name": "Rabuta Berry",
      "cat": "Berries",
      "icon": "items/RABUTABERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "NOMELBERRY",
      "name": "Nomel Berry",
      "cat": "Berries",
      "icon": "items/NOMELBERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "SPELONBERRY",
      "name": "Spelon Berry",
      "cat": "Berries",
      "icon": "items/SPELONBERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "PAMTREBERRY",
      "name": "Pamtre Berry",
      "cat": "Berries",
      "icon": "items/PAMTREBERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "WATMELBERRY",
      "name": "Watmel Berry",
      "cat": "Berries",
      "icon": "items/WATMELBERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "DURINBERRY",
      "name": "Durin Berry",
      "cat": "Berries",
      "icon": "items/DURINBERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "BELUEBERRY",
      "name": "Belue Berry",
      "cat": "Berries",
      "icon": "items/BELUEBERRY.png",
      "desc": "In the Sinnoh region, they like to make sweets known as Poffins with this Berry.",
      "find": ""
    },
    {
      "id": "OCCABERRY",
      "name": "Occa Berry",
      "cat": "Berries",
      "icon": "items/OCCABERRY.png",
      "desc": "Weakens a supereffective Fire-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "PASSHOBERRY",
      "name": "Passho Berry",
      "cat": "Berries",
      "icon": "items/PASSHOBERRY.png",
      "desc": "Weakens a supereffective Water-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "WACANBERRY",
      "name": "Wacan Berry",
      "cat": "Berries",
      "icon": "items/WACANBERRY.png",
      "desc": "Weakens a supereffective Electric-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "RINDOBERRY",
      "name": "Rindo Berry",
      "cat": "Berries",
      "icon": "items/RINDOBERRY.png",
      "desc": "Weakens a supereffective Grass-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "YACHEBERRY",
      "name": "Yache Berry",
      "cat": "Berries",
      "icon": "items/YACHEBERRY.png",
      "desc": "Weakens a supereffective Ice-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "CHOPLEBERRY",
      "name": "Chople Berry",
      "cat": "Berries",
      "icon": "items/CHOPLEBERRY.png",
      "desc": "Weakens a supereffective Fighting-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "KEBIABERRY",
      "name": "Kebia Berry",
      "cat": "Berries",
      "icon": "items/KEBIABERRY.png",
      "desc": "Weakens a supereffective Poison-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "SHUCABERRY",
      "name": "Shuca Berry",
      "cat": "Berries",
      "icon": "items/SHUCABERRY.png",
      "desc": "Weakens a supereffective Ground-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "COBABERRY",
      "name": "Coba Berry",
      "cat": "Berries",
      "icon": "items/COBABERRY.png",
      "desc": "Weakens a supereffective Flying-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "PAYAPABERRY",
      "name": "Payapa Berry",
      "cat": "Berries",
      "icon": "items/PAYAPABERRY.png",
      "desc": "Weakens a supereffective Psychic-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "TANGABERRY",
      "name": "Tanga Berry",
      "cat": "Berries",
      "icon": "items/TANGABERRY.png",
      "desc": "Weakens a supereffective Bug-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "CHARTIBERRY",
      "name": "Charti Berry",
      "cat": "Berries",
      "icon": "items/CHARTIBERRY.png",
      "desc": "Weakens a supereffective Rock-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "KASIBBERRY",
      "name": "Kasib Berry",
      "cat": "Berries",
      "icon": "items/KASIBBERRY.png",
      "desc": "Weakens a supereffective Ghost-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "HABANBERRY",
      "name": "Haban Berry",
      "cat": "Berries",
      "icon": "items/HABANBERRY.png",
      "desc": "Weakens a supereffective Dragon-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "COLBURBERRY",
      "name": "Colbur Berry",
      "cat": "Berries",
      "icon": "items/COLBURBERRY.png",
      "desc": "Weakens a supereffective Dark-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "BABIRIBERRY",
      "name": "Babiri Berry",
      "cat": "Berries",
      "icon": "items/BABIRIBERRY.png",
      "desc": "Weakens a supereffective Steel-type attack against the holding Pokémon.",
      "find": ""
    },
    {
      "id": "CHILANBERRY",
      "name": "Chilan Berry",
      "cat": "Berries",
      "icon": "items/CHILANBERRY.png",
      "desc": "Weakens a Normal-type attack against the Pokémon holding this berry.",
      "find": ""
    },
    {
      "id": "LIECHIBERRY",
      "name": "Liechi Berry",
      "cat": "Berries",
      "icon": "items/LIECHIBERRY.png",
      "desc": "If held by a Pokémon, it raises its Attack stat in a pinch.",
      "find": ""
    },
    {
      "id": "GANLONBERRY",
      "name": "Ganlon Berry",
      "cat": "Berries",
      "icon": "items/GANLONBERRY.png",
      "desc": "If held by a Pokémon, it raises its Defense stat in a pinch.",
      "find": ""
    },
    {
      "id": "SALACBERRY",
      "name": "Salac Berry",
      "cat": "Berries",
      "icon": "items/SALACBERRY.png",
      "desc": "If held by a Pokémon, it raises its Speed stat in a pinch.",
      "find": ""
    },
    {
      "id": "PETAYABERRY",
      "name": "Petaya Berry",
      "cat": "Berries",
      "icon": "items/PETAYABERRY.png",
      "desc": "If held by a Pokémon, it raises its Sp. Atk stat in a pinch.",
      "find": ""
    },
    {
      "id": "APICOTBERRY",
      "name": "Apicot Berry",
      "cat": "Berries",
      "icon": "items/APICOTBERRY.png",
      "desc": "If held by a Pokémon, it raises its Sp. Def stat in a pinch.",
      "find": ""
    },
    {
      "id": "LANSATBERRY",
      "name": "Lansat Berry",
      "cat": "Berries",
      "icon": "items/LANSATBERRY.png",
      "desc": "If held by a Pokémon, it raises its critical-hit ratio in a pinch.",
      "find": ""
    },
    {
      "id": "STARFBERRY",
      "name": "Starf Berry",
      "cat": "Berries",
      "icon": "items/STARFBERRY.png",
      "desc": "If held by a Pokémon, it sharply raises one of its stats in a pinch.",
      "find": ""
    },
    {
      "id": "ENIGMABERRY",
      "name": "Enigma Berry",
      "cat": "Berries",
      "icon": "items/ENIGMABERRY.png",
      "desc": "If held by a Pokémon, it restores its HP if it is hit by any supereffective attack.",
      "find": ""
    },
    {
      "id": "MICLEBERRY",
      "name": "Micle Berry",
      "cat": "Berries",
      "icon": "items/MICLEBERRY.png",
      "desc": "If held by a Pokémon, it raises the accuracy of a move just once in a pinch.",
      "find": ""
    },
    {
      "id": "CUSTAPBERRY",
      "name": "Custap Berry",
      "cat": "Berries",
      "icon": "items/CUSTAPBERRY.png",
      "desc": "If held by a Pokémon, it gets to move first just once in a pinch.",
      "find": ""
    },
    {
      "id": "JABOCABERRY",
      "name": "Jaboca Berry",
      "cat": "Berries",
      "icon": "items/JABOCABERRY.png",
      "desc": "If held by a Pokémon and a physical attack lands, the attacker also takes damage.",
      "find": ""
    },
    {
      "id": "ROWAPBERRY",
      "name": "Rowap Berry",
      "cat": "Berries",
      "icon": "items/ROWAPBERRY.png",
      "desc": "If held by a Pokémon and a special attack lands, the attacker also takes damage.",
      "find": ""
    },
    {
      "id": "GRASSMAIL",
      "name": "Grass Mail",
      "cat": "Mail",
      "icon": "items/GRASSMAIL.png",
      "desc": "Stationery featuring a print of a refreshingly green field. Let a Pokémon hold it for delivery.",
      "find": ""
    },
    {
      "id": "FLAMEMAIL",
      "name": "Flame Mail",
      "cat": "Mail",
      "icon": "items/FLAMEMAIL.png",
      "desc": "Stationery featuring a print of flames in blazing red. Let a Pokémon hold it for delivery.",
      "find": ""
    },
    {
      "id": "BUBBLEMAIL",
      "name": "Bubble Mail",
      "cat": "Mail",
      "icon": "items/BUBBLEMAIL.png",
      "desc": "Stationery featuring a print of a blue world underwater. Let a Pokémon hold it for delivery.",
      "find": ""
    },
    {
      "id": "BLOOMMAIL",
      "name": "Bloom Mail",
      "cat": "Mail",
      "icon": "items/BLOOMMAIL.png",
      "desc": "Stationery featuring a print of pretty floral patterns. Let a Pokémon hold it for delivery.",
      "find": ""
    },
    {
      "id": "TUNNELMAIL",
      "name": "Tunnel Mail",
      "cat": "Mail",
      "icon": "items/TUNNELMAIL.png",
      "desc": "Stationery featuring a print of a dimly lit coal mine. Let a Pokémon hold it for delivery.",
      "find": ""
    },
    {
      "id": "STEELMAIL",
      "name": "Steel Mail",
      "cat": "Mail",
      "icon": "items/STEELMAIL.png",
      "desc": "Stationery featuring a print of cool mechanical designs. Let a Pokémon hold it for delivery.",
      "find": ""
    },
    {
      "id": "HEARTMAIL",
      "name": "Heart Mail",
      "cat": "Mail",
      "icon": "items/HEARTMAIL.png",
      "desc": "Stationery featuring a print of giant heart patterns. Let a Pokémon hold it for delivery.",
      "find": ""
    },
    {
      "id": "SNOWMAIL",
      "name": "Snow Mail",
      "cat": "Mail",
      "icon": "items/SNOWMAIL.png",
      "desc": "Stationery featuring a print of a chilly, snow-covered world. Let a Pokémon hold it for delivery.",
      "find": ""
    },
    {
      "id": "SPACEMAIL",
      "name": "Space Mail",
      "cat": "Mail",
      "icon": "items/SPACEMAIL.png",
      "desc": "Stationery featuring a print depicting the huge expanse of space. Let a Pokémon hold it for delivery.",
      "find": ""
    },
    {
      "id": "AIRMAIL",
      "name": "Air Mail",
      "cat": "Mail",
      "icon": "items/AIRMAIL.png",
      "desc": "Stationery featuring a print of colorful letter sets. Let a Pokémon hold it for delivery.",
      "find": ""
    },
    {
      "id": "MOSAICMAIL",
      "name": "Mosaic Mail",
      "cat": "Mail",
      "icon": "items/MOSAICMAIL.png",
      "desc": "Stationery featuring a print of a vivid rainbow pattern. Let a Pokémon hold it for delivery.",
      "find": ""
    },
    {
      "id": "BRICKMAIL",
      "name": "Brick Mail",
      "cat": "Mail",
      "icon": "items/BRICKMAIL.png",
      "desc": "Stationery featuring a print of a tough-looking brick pattern. Let a Pokémon hold it for delivery.",
      "find": ""
    },
    {
      "id": "XATTACK",
      "name": "X Attack",
      "cat": "Battle Items",
      "icon": "items/XATTACK.png",
      "desc": "An item that sharply boosts the Attack stat of a Pokémon while it remains in battle.",
      "find": ""
    },
    {
      "id": "XATTACK2",
      "name": "X Attack 2",
      "cat": "Battle Items",
      "icon": "items/XATTACK2.png",
      "desc": "It sharply raises the Attack stat of a Pokémon in battle. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XATTACK3",
      "name": "X Attack 3",
      "cat": "Battle Items",
      "icon": "items/XATTACK3.png",
      "desc": "It drastically raises the Attack stat of a Pokémon in battle. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XATTACK6",
      "name": "X Attack 6",
      "cat": "Battle Items",
      "icon": "items/XATTACK6.png",
      "desc": "It raises the Attack stat of a Pokémon in battle immensely. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XDEFENSE",
      "name": "X Defense",
      "cat": "Battle Items",
      "icon": "items/XDEFENSE.png",
      "desc": "An item that sharply boosts the Defense of a Pokémon while it remains in battle.",
      "find": ""
    },
    {
      "id": "XDEFENSE2",
      "name": "X Defense 2",
      "cat": "Battle Items",
      "icon": "items/XDEFENSE2.png",
      "desc": "It sharply raises the Defense stat of a Pokémon in battle. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XDEFENSE3",
      "name": "X Defense 3",
      "cat": "Battle Items",
      "icon": "items/XDEFENSE3.png",
      "desc": "It drastically raises the Defense stat of a Pokémon in battle. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XDEFENSE6",
      "name": "X Defense 6",
      "cat": "Battle Items",
      "icon": "items/XDEFENSE6.png",
      "desc": "It raises the Defense stat of a Pokémon in battle immensely. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XSPATK",
      "name": "X Sp. Atk",
      "cat": "Battle Items",
      "icon": "items/XSPATK.png",
      "desc": "An item that sharply boosts the Sp. Atk stat of a Pokémon while it remains in battle.",
      "find": ""
    },
    {
      "id": "XSPATK2",
      "name": "X Sp. Atk 2",
      "cat": "Battle Items",
      "icon": "items/XSPATK2.png",
      "desc": "It sharply raises the Sp. Atk stat of a Pokémon in battle. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XSPATK3",
      "name": "X Sp. Atk 3",
      "cat": "Battle Items",
      "icon": "items/XSPATK3.png",
      "desc": "It drastically raises the Sp. Atk stat of a Pokémon in battle. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XSPATK6",
      "name": "X Sp. Atk 6",
      "cat": "Battle Items",
      "icon": "items/XSPATK6.png",
      "desc": "It raises the Sp. Atk stat of a Pokémon in battle immensely. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XSPDEF",
      "name": "X Sp. Def",
      "cat": "Battle Items",
      "icon": "items/XSPDEF.png",
      "desc": "An item that sharply boosts the Sp. Def stat of a Pokémon while it remains in battle.",
      "find": ""
    },
    {
      "id": "XSPDEF2",
      "name": "X Sp. Def 2",
      "cat": "Battle Items",
      "icon": "items/XSPDEF2.png",
      "desc": "It sharply raises the Sp. Def stat of a Pokémon in battle. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XSPDEF3",
      "name": "X Sp. Def 3",
      "cat": "Battle Items",
      "icon": "items/XSPDEF3.png",
      "desc": "It drastically raises the Sp. Def stat of a Pokémon in battle. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XSPDEF6",
      "name": "X Sp. Def 6",
      "cat": "Battle Items",
      "icon": "items/XSPDEF6.png",
      "desc": "It raises the Sp. Def stat of a Pokémon in battle immensely. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XSPEED",
      "name": "X Speed",
      "cat": "Battle Items",
      "icon": "items/XSPEED.png",
      "desc": "An item that sharply boosts the Speed stat of a Pokémon while it remains in battle.",
      "find": ""
    },
    {
      "id": "XSPEED2",
      "name": "X Speed 2",
      "cat": "Battle Items",
      "icon": "items/XSPEED2.png",
      "desc": "It sharply raises the Speed stat of a Pokémon in battle. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XSPEED3",
      "name": "X Speed 3",
      "cat": "Battle Items",
      "icon": "items/XSPEED3.png",
      "desc": "It drastically raises the Speed stat of a Pokémon in battle. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XSPEED6",
      "name": "X Speed 6",
      "cat": "Battle Items",
      "icon": "items/XSPEED6.png",
      "desc": "It raises the Speed stat of a Pokémon in battle immensely. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XACCURACY",
      "name": "X Accuracy",
      "cat": "Battle Items",
      "icon": "items/XACCURACY.png",
      "desc": "An item that sharply boosts the accuracy of a Pokémon while it remains in battle.",
      "find": ""
    },
    {
      "id": "XACCURACY2",
      "name": "X Accuracy 2",
      "cat": "Battle Items",
      "icon": "items/XACCURACY2.png",
      "desc": "It sharply raises the accuracy of a Pokémon in battle. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XACCURACY3",
      "name": "X Accuracy 3",
      "cat": "Battle Items",
      "icon": "items/XACCURACY3.png",
      "desc": "It drastically raises the accuracy of a Pokémon in battle. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "XACCURACY6",
      "name": "X Accuracy 6",
      "cat": "Battle Items",
      "icon": "items/XACCURACY6.png",
      "desc": "It raises the accuracy of a Pokémon in battle immensely. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "DIREHIT",
      "name": "Dire Hit",
      "cat": "Battle Items",
      "icon": "items/DIREHIT.png",
      "desc": "An item that raises the critical-hit ratio greatly. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "DIREHIT2",
      "name": "Dire Hit 2",
      "cat": "Battle Items",
      "icon": "items/DIREHIT2.png",
      "desc": "It sharply raises the critical-hit ratio. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "DIREHIT3",
      "name": "Dire Hit 3",
      "cat": "Battle Items",
      "icon": "items/DIREHIT3.png",
      "desc": "It greatly raises the critical-hit ratio. It wears off if the Pokémon is withdrawn.",
      "find": ""
    },
    {
      "id": "GUARDSPEC",
      "name": "Guard Spec.",
      "cat": "Battle Items",
      "icon": "items/GUARDSPEC.png",
      "desc": "An item that prevents stat reduction among the Trainer's party Pokémon for five turns after use.",
      "find": ""
    },
    {
      "id": "RESETURGE",
      "name": "Reset Urge",
      "cat": "Battle Items",
      "icon": "items/RESETURGE.png",
      "desc": "When used, it restores any stat changes of an ally Pokémon.",
      "find": ""
    },
    {
      "id": "ABILITYURGE",
      "name": "Ability Urge",
      "cat": "Battle Items",
      "icon": "items/ABILITYURGE.png",
      "desc": "When used, it activates the Ability of an ally Pokémon.",
      "find": ""
    },
    {
      "id": "ITEMURGE",
      "name": "Item Urge",
      "cat": "Battle Items",
      "icon": "items/ITEMURGE.png",
      "desc": "When used, it causes an ally Pokémon to use its held item.",
      "find": ""
    },
    {
      "id": "ITEMDROP",
      "name": "Item Drop",
      "cat": "Battle Items",
      "icon": "items/ITEMDROP.png",
      "desc": "When used, it causes an ally Pokémon to drop a held item.",
      "find": ""
    },
    {
      "id": "BLUEFLUTE",
      "name": "Blue Flute",
      "cat": "Battle Items",
      "icon": "items/BLUEFLUTE.png",
      "desc": "A blue flute made from blown glass. Its melody awakens a single Pokémon from sleep.",
      "find": ""
    },
    {
      "id": "YELLOWFLUTE",
      "name": "Yellow Flute",
      "cat": "Battle Items",
      "icon": "items/YELLOWFLUTE.png",
      "desc": "A yellow flute made from blown glass. Its melody snaps a single Pokémon out of confusion.",
      "find": ""
    },
    {
      "id": "REDFLUTE",
      "name": "Red Flute",
      "cat": "Battle Items",
      "icon": "items/REDFLUTE.png",
      "desc": "A red flute made from blown glass. Its melody snaps a single Pokémon out of infatuation.",
      "find": ""
    },
    {
      "id": "POKEDOLL",
      "name": "Poké Doll",
      "cat": "Battle Items",
      "icon": "items/POKEDOLL.png",
      "desc": "A doll that attracts Pokémon. Use it to flee from any battle with a wild Pokémon.",
      "find": ""
    },
    {
      "id": "FLUFFYTAIL",
      "name": "Fluffy Tail",
      "cat": "Battle Items",
      "icon": "items/FLUFFYTAIL.png",
      "desc": "An item that attracts Pokémon. Use it to flee from any battle with a wild Pokémon.",
      "find": ""
    },
    {
      "id": "POKETOY",
      "name": "Poké Toy",
      "cat": "Battle Items",
      "icon": "items/POKETOY.png",
      "desc": "An item that attracts Pokémon. Use it to flee from any battle with a wild Pokémon.",
      "find": ""
    },
    {
      "id": "BICYCLE",
      "name": "Bicycle",
      "cat": "Key Items",
      "icon": "items/BICYCLE.png",
      "desc": "A folding Bicycle that enables much faster movement than the Running Shoes.",
      "find": ""
    },
    {
      "id": "OLDROD",
      "name": "Old Rod",
      "cat": "Key Items",
      "icon": "items/OLDROD.png",
      "desc": "An old and beat-up fishing rod. Use it by any body of water to fish for wild aquatic Pokémon.",
      "find": ""
    },
    {
      "id": "GOODROD",
      "name": "Good Rod",
      "cat": "Key Items",
      "icon": "items/GOODROD.png",
      "desc": "A new, good-quality fishing rod. Use it by any body of water to fish for wild aquatic Pokémon.",
      "find": ""
    },
    {
      "id": "SUPERROD",
      "name": "Super Rod",
      "cat": "Key Items",
      "icon": "items/SUPERROD.png",
      "desc": "An awesome, high-tech fishing rod. Use it by any body of water to fish for wild aquatic Pokémon.",
      "find": ""
    },
    {
      "id": "ITEMFINDER",
      "name": "Itemfinder",
      "cat": "Key Items",
      "icon": "items/ITEMFINDER.png",
      "desc": "A device used for finding items. If there is a hidden item nearby when it is used, it emits a signal.",
      "find": ""
    },
    {
      "id": "DOWSINGMACHINE",
      "name": "Dowsing Machine",
      "cat": "Key Items",
      "icon": "items/DOWSINGMACHINE.png",
      "desc": "It checks for unseen items in the area and makes noise and lights when it finds something.",
      "find": ""
    },
    {
      "id": "POKERADAR",
      "name": "Poké Radar",
      "cat": "Key Items",
      "icon": "items/POKERADAR.png",
      "desc": "A tool that can search out Pokémon that are hiding in grass. Its battery is recharged as you walk.",
      "find": ""
    },
    {
      "id": "TOWNMAP",
      "name": "Town Map",
      "cat": "Key Items",
      "icon": "items/TOWNMAP.png",
      "desc": "A very convenient map that can be viewed anytime. It even shows your present location.",
      "find": ""
    },
    {
      "id": "ESCAPEROPE",
      "name": "Escape Rope",
      "cat": "Key Items",
      "icon": "items/ESCAPEROPE.png",
      "desc": "A long, durable rope. Use it to escape instantly from a cave or a dungeon.",
      "find": ""
    },
    {
      "id": "COINCASE",
      "name": "Coin Case",
      "cat": "Key Items",
      "icon": "items/COINCASE.png",
      "desc": "A case for holding coins obtained at the Game Corner. It holds up to 99,999 coins.",
      "find": ""
    },
    {
      "id": "POKEFLUTE",
      "name": "Poké Flute",
      "cat": "Key Items",
      "icon": "items/POKEFLUTE.png",
      "desc": "A flute that is said to instantly awaken any Pokémon. It has a lovely tone.",
      "find": ""
    },
    {
      "id": "SOOTSACK",
      "name": "Soot Sack",
      "cat": "Key Items",
      "icon": "items/SOOTSACK.png",
      "desc": "A sack used to gather and hold volcanic ash.",
      "find": ""
    },
    {
      "id": "SILPHSCOPE",
      "name": "Silph Scope",
      "cat": "Key Items",
      "icon": "items/SILPHSCOPE.png",
      "desc": "A scope that makes unseeable Pokémon visible. It is made by Silph Co.",
      "find": ""
    },
    {
      "id": "DEVONSCOPE",
      "name": "Devon Scope",
      "cat": "Key Items",
      "icon": "items/DEVONSCOPE.png",
      "desc": "A device by Devon that signals any unseeable Pokémon.",
      "find": ""
    },
    {
      "id": "SQUIRTBOTTLE",
      "name": "Squirt Bottle",
      "cat": "Key Items",
      "icon": "items/SQUIRTBOTTLE.png",
      "desc": "A watering can shaped like a Squirtle. It helps promote healthy growth of Berries planted in soft soil.",
      "find": ""
    },
    {
      "id": "SPRAYDUCK",
      "name": "Sprayduck",
      "cat": "Key Items",
      "icon": "items/SPRAYDUCK.png",
      "desc": "A watering can shaped like a Psyduck. It helps promote healthy growth of Berries planted in soft soil.",
      "find": ""
    },
    {
      "id": "WAILMERPAIL",
      "name": "Wailmer Pail",
      "cat": "Key Items",
      "icon": "items/WAILMERPAIL.png",
      "desc": "A nifty watering pail. Use it to promote strong growth in Berries planted in soft soil.",
      "find": ""
    },
    {
      "id": "GRACIDEA",
      "name": "Gracidea",
      "cat": "Key Items",
      "icon": "items/GRACIDEA.png",
      "desc": "A flower sometimes bundled in bouquets to convey gratitude on special occasions like birthdays.",
      "find": ""
    },
    {
      "id": "REVEALGLASS",
      "name": "Reveal Glass",
      "cat": "Key Items",
      "icon": "items/REVEALGLASS.png",
      "desc": "A glass that reveals the truth. It is a mysterious glass that returns a Pokémon back to its original shape.",
      "find": ""
    },
    {
      "id": "DNASPLICERS",
      "name": "DNA Splicers",
      "cat": "Key Items",
      "icon": "items/DNASPLICERS.png",
      "desc": "A splicer that fuses Gleeruption and Scorow into Cerbament. Both must be at least Lv. 40.",
      "find": ""
    },
    {
      "id": "DNASPLICERSUSED",
      "name": "DNA Splicers",
      "cat": "Key Items",
      "icon": "items/DNASPLICERSUSED.png",
      "desc": "A splicer that separates Cerbament back into Gleeruption and Scorow.",
      "find": ""
    },
    {
      "id": "OVALCHARM",
      "name": "Oval Charm",
      "cat": "Key Items",
      "icon": "items/OVALCHARM.png",
      "desc": "An oval charm said to increase the chance of Eggs being found at the Day Care.",
      "find": ""
    },
    {
      "id": "SHINYCHARM",
      "name": "Shiny Charm",
      "cat": "Key Items",
      "icon": "items/SHINYCHARM.png",
      "desc": "A shiny charm said to increase the chance of finding a Shiny Pokémon.",
      "find": ""
    },
    {
      "id": "ANOMALYCHARM",
      "name": "Anomaly Charm",
      "cat": "Key Items",
      "icon": "items/ANOMALYCHARM.png",
      "desc": "A strange charm said to increase the chance of finding an Anomaly Pokémon.",
      "find": ""
    },
    {
      "id": "EXPCHARM",
      "name": "Exp. Charm",
      "cat": "Key Items",
      "icon": "items/EXPCHARM.png",
      "desc": "A charm that increases the Exp. Points that Pokémon can get. A machine-like object is inside it.",
      "find": ""
    },
    {
      "id": "AURORATICKET",
      "name": "Aurora Ticket",
      "cat": "Key Items",
      "icon": "items/AURORATICKET.png",
      "desc": "A ticket required to board the ship to Doxy Island. It glows beautifully.",
      "find": ""
    },
    {
      "id": "OLDSEAMAP",
      "name": "Old Sea Map",
      "cat": "Key Items",
      "icon": "items/OLDSEAMAP.png",
      "desc": "A faded sea chart that shows the way to a certain island.",
      "find": ""
    },
    {
      "id": "STRANGESTONE",
      "name": "Strange Stone",
      "cat": "Key Items",
      "icon": "items/STRANGESTONE.png",
      "desc": "A Strange Stone Sadie requested for me to get, it almost feels alive somehow...",
      "find": ""
    },
    {
      "id": "ARMADISCITE",
      "name": "Armadiscite",
      "cat": "Other Items",
      "icon": "items/ARMADISCITE.png",
      "desc": "Mega Stones from the Drapalla Region, it allows Armadisco to Mega-Evolve.",
      "find": ""
    },
    {
      "id": "PALAZITE",
      "name": "Palazite",
      "cat": "Other Items",
      "icon": "items/PALAZITE.png",
      "desc": "Mega Stones from the Drapalla Region, it allows Palazard to Mega-Evolve.",
      "find": ""
    },
    {
      "id": "GROWTH_BADGE",
      "name": "Growth Badge",
      "cat": "Key Items",
      "icon": "items/GROWTH_BADGE.png",
      "desc": "A badge earned by defeating the Limerico Gym Leader Clara.",
      "find": ""
    },
    {
      "id": "CULINARY_BADGE",
      "name": "Culinary Badge",
      "cat": "Key Items",
      "icon": "items/CULINARY_BADGE.png",
      "desc": "A badge earned by defeating the Consilia Gym Leader Seiya.",
      "find": ""
    },
    {
      "id": "COOKINGCOUPON",
      "name": "Cooking Coupons",
      "cat": "Key Items",
      "icon": "items/COOKINGCOUPON.png",
      "desc": "Coupons for the Consilia Cooking Class.",
      "find": ""
    },
    {
      "id": "EXPSHARE_DEVICE",
      "name": "Exp. Share v2",
      "cat": "Key Items",
      "icon": "items/EXPSHARE_DEVICE.png",
      "desc": "A modular device that distributes Exp. Points. Can be upgraded with new functions.",
      "find": ""
    },
    {
      "id": "FEATHERBALL",
      "name": "Feather Ball",
      "cat": "Poké Balls",
      "icon": "items/FEATHERBALL.png",
      "desc": "A ball that flies fast and true ideal for catching nimble Pokémon or Pokémon that fly high in the air.",
      "find": ""
    },
    {
      "id": "PUNCHINGGLOVE",
      "name": "Punching Glove",
      "cat": "Held Items",
      "icon": "items/PUNCHINGGLOVE.png",
      "desc": "An item to be held by a Pokémon. It boosts the holder's punching moves and prevents direct contact.",
      "find": ""
    },
    {
      "id": "LOADEDDICE",
      "name": "Loaded Dice",
      "cat": "Held Items",
      "icon": "items/LOADEDDICE.png",
      "desc": "An item to be held by a Pokémon. It ensures the holder's multistrike moves hit more times.",
      "find": ""
    }
  ];


  const PICKUP = [{"band":"1-10","cells":[{"name":"Potion","pct":30,"icon":"POTION.png"},{"name":"Antidote","pct":10,"icon":"ANTIDOTE.png"},{"name":"Super Potion","pct":10,"icon":"SUPERPOTION.png"},{"name":"Great Ball","pct":10,"icon":"GREATBALL.png"},{"name":"Repel","pct":10,"icon":"REPEL.png"},{"name":"Escape Rope","pct":10,"icon":"ESCAPEROPE.png"},{"name":"Full Heal","pct":10,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":4,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":4,"icon":"ULTRABALL.png"},{"name":"Hyper Potion","pct":1,"icon":"HYPERPOTION.png"},{"name":"Nugget","pct":1,"icon":"NUGGET.png"}]},{"band":"11-20","cells":[{"name":"Antidote","pct":30,"icon":"ANTIDOTE.png"},{"name":"Super Potion","pct":10,"icon":"SUPERPOTION.png"},{"name":"Great Ball","pct":10,"icon":"GREATBALL.png"},{"name":"Repel","pct":10,"icon":"REPEL.png"},{"name":"Escape Rope","pct":10,"icon":"ESCAPEROPE.png"},{"name":"Full Heal","pct":10,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":10,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":4,"icon":"ULTRABALL.png"},{"name":"Revive","pct":4,"icon":"REVIVE.png"},{"name":"Nugget","pct":1,"icon":"NUGGET.png"},{"name":"King's Rock","pct":1,"icon":"KINGSROCK.png"}]},{"band":"21-30","cells":[{"name":"Super Potion","pct":30,"icon":"SUPERPOTION.png"},{"name":"Great Ball","pct":10,"icon":"GREATBALL.png"},{"name":"Repel","pct":10,"icon":"REPEL.png"},{"name":"Escape Rope","pct":10,"icon":"ESCAPEROPE.png"},{"name":"Full Heal","pct":10,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":10,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":10,"icon":"ULTRABALL.png"},{"name":"Revive","pct":4,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":4,"icon":"RARECANDY.png"},{"name":"King's Rock","pct":1,"icon":"KINGSROCK.png"},{"name":"Full Restore","pct":1,"icon":"FULLRESTORE.png"}]},{"band":"31-40","cells":[{"name":"Great Ball","pct":30,"icon":"GREATBALL.png"},{"name":"Repel","pct":10,"icon":"REPEL.png"},{"name":"Escape Rope","pct":10,"icon":"ESCAPEROPE.png"},{"name":"Full Heal","pct":10,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":10,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":10,"icon":"ULTRABALL.png"},{"name":"Revive","pct":10,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":4,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":4,"icon":"SUNSTONE.png"},{"name":"Full Restore","pct":1,"icon":"FULLRESTORE.png"},{"name":"Ether","pct":1,"icon":"ETHER.png"}]},{"band":"41-50","cells":[{"name":"Repel","pct":30,"icon":"REPEL.png"},{"name":"Escape Rope","pct":10,"icon":"ESCAPEROPE.png"},{"name":"Full Heal","pct":10,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":10,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":10,"icon":"ULTRABALL.png"},{"name":"Revive","pct":10,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":10,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":4,"icon":"SUNSTONE.png"},{"name":"Moon Stone","pct":4,"icon":"MOONSTONE.png"},{"name":"Ether","pct":1,"icon":"ETHER.png"},{"name":"Iron Ball","pct":1,"icon":"IRONBALL.png"}]},{"band":"51-60","cells":[{"name":"Escape Rope","pct":30,"icon":"ESCAPEROPE.png"},{"name":"Full Heal","pct":10,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":10,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":10,"icon":"ULTRABALL.png"},{"name":"Revive","pct":10,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":10,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":10,"icon":"SUNSTONE.png"},{"name":"Moon Stone","pct":4,"icon":"MOONSTONE.png"},{"name":"Heart Scale","pct":4,"icon":"HEARTSCALE.png"},{"name":"Iron Ball","pct":1,"icon":"IRONBALL.png"},{"name":"Destiny Knot","pct":1,"icon":"DESTINYKNOT.png"}]},{"band":"61-70","cells":[{"name":"Full Heal","pct":30,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":10,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":10,"icon":"ULTRABALL.png"},{"name":"Revive","pct":10,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":10,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":10,"icon":"SUNSTONE.png"},{"name":"Moon Stone","pct":10,"icon":"MOONSTONE.png"},{"name":"Heart Scale","pct":4,"icon":"HEARTSCALE.png"},{"name":"Full Restore","pct":4,"icon":"FULLRESTORE.png"},{"name":"Destiny Knot","pct":1,"icon":"DESTINYKNOT.png"},{"name":"Elixir","pct":1,"icon":"ELIXIR.png"}]},{"band":"71-80","cells":[{"name":"Hyper Potion","pct":30,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":10,"icon":"ULTRABALL.png"},{"name":"Revive","pct":10,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":10,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":10,"icon":"SUNSTONE.png"},{"name":"Moon Stone","pct":10,"icon":"MOONSTONE.png"},{"name":"Heart Scale","pct":10,"icon":"HEARTSCALE.png"},{"name":"Full Restore","pct":4,"icon":"FULLRESTORE.png"},{"name":"Max Revive","pct":4,"icon":"MAXREVIVE.png"},{"name":"Elixir","pct":1,"icon":"ELIXIR.png"},{"name":"Destiny Knot","pct":1,"icon":"DESTINYKNOT.png"}]},{"band":"81-90","cells":[{"name":"Ultra Ball","pct":30,"icon":"ULTRABALL.png"},{"name":"Revive","pct":10,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":10,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":10,"icon":"SUNSTONE.png"},{"name":"Moon Stone","pct":10,"icon":"MOONSTONE.png"},{"name":"Heart Scale","pct":10,"icon":"HEARTSCALE.png"},{"name":"Full Restore","pct":10,"icon":"FULLRESTORE.png"},{"name":"Max Revive","pct":4,"icon":"MAXREVIVE.png"},{"name":"PP Up","pct":4,"icon":"PPUP.png"},{"name":"Destiny Knot","pct":1,"icon":"DESTINYKNOT.png"},{"name":"Leftovers","pct":1,"icon":"LEFTOVERS.png"}]},{"band":"91-100","cells":[{"name":"Revive","pct":30,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":10,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":10,"icon":"SUNSTONE.png"},{"name":"Moon Stone","pct":10,"icon":"MOONSTONE.png"},{"name":"Heart Scale","pct":10,"icon":"HEARTSCALE.png"},{"name":"Full Restore","pct":10,"icon":"FULLRESTORE.png"},{"name":"Max Revive","pct":10,"icon":"MAXREVIVE.png"},{"name":"PP Up","pct":4,"icon":"PPUP.png"},{"name":"Max Elixir","pct":4,"icon":"MAXELIXIR.png"},{"name":"Leftovers","pct":1,"icon":"LEFTOVERS.png"},{"name":"Destiny Knot","pct":1,"icon":"DESTINYKNOT.png"}]}];


  // ---- Locations ---------------------------------------------------------
  const ROUTES = [
  {
    "slug": "saudade-town",
    "name": "Saudade Town",
    "kind": "Town",
    "tag": "",
    "desc": "The starting town, home to the player and their mother. Known for its bustling market, golden wheat fields, and cozy, nostalgic atmosphere. Here you meet rivals Nya, Seren, and Kayden, and receive your Starter from Pecan along with your Running Shoes.",
    "exits": "South — Route 3 | East — Route 1 | West — Route 2",
    "encounter": "Starters",
    "map": "saudade-town.png",
    "mons": [],
    "encounters": [],
    "items": [
      "Running Shoes",
      "Rare Candy x2",
      "Potion"
    ],
    "quests": [],
    "npcs": [
      {
        "name": "Kayden",
        "role": "Rival",
        "sprite": "POKEMONTRAINER_KAYDEN.png",
        "line": "A talented boy who wants to be the very best.",
        "team": ""
      },
      {
        "name": "Pecan",
        "role": "Pokémon Trainer",
        "team": [
          {
            "dex": "013",
            "name": "Rarcraft",
            "lv": 5,
            "ability": "",
            "moves": [
              "Tail Whip",
              "Thief"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "POKEMONTRAINER_Pecan",
          "Pecan",
          "1"
        ],
        "sprite": "POKEMONTRAINER_PECAN.png"
      }
    ],
    "notes": [
      [
        "Around town",
        "Visit the quest board for Mom to Mom: bring your Mom and Kayden’s mom together to earn a Rare Candy. Heimskur’s Fields asks you to lend Heimskur a Pokémon and rewards $3,000. You can choose which Pokémon to lend; he will not take your last partner."
      ],
      [
        "After Chapter 1",
        "A strange portal opens beside the old gym once the chapter is complete."
      ]
    ],
    "questGuide": [
      {
        "title": "Starting My Internship",
        "kind": "Story",
        "description": "After getting your School ID from Mom, meet Pecan and the other interns in Saudade Town, collect your starter, then head through Eventide Forest to Professor Hickory's Lab.",
        "giver": "Professor Hickory",
        "report": "",
        "reward": "",
        "requires": []
      },
      {
        "title": "Mom to Mom",
        "kind": "Side quest",
        "description": "Kayden's mom, Kaya, left a note on the Saudade Town quest board asking for parenting advice. Talk to Kaya, then bring your Mom over to Kayden's house.",
        "giver": "Kaya",
        "report": "Kaya at Kayden's house",
        "reward": "1x Rare Candy",
        "requires": []
      },
      {
        "title": "Heimskur's Fields",
        "kind": "Side quest",
        "description": "Heimskur wants help with the grain fields in Saudade Town. Bring him a Dustalon to till the soil, a Scraqua to water the crops, a Pawnut to seed them and a Twilawoof to help them grow.",
        "giver": "Heimskur",
        "report": "Heimskur in Saudade Town",
        "reward": "$3000",
        "requires": []
      }
    ],
    "pickups": [
      {
        "event": 41,
        "x": 6,
        "y": 45,
        "id": "RARECANDY",
        "name": "Rare Candy",
        "quantity": 1,
        "hidden": false,
        "left": 8.227848101265822,
        "top": 70
      },
      {
        "event": 42,
        "x": 50,
        "y": 8,
        "id": "POTION",
        "name": "Potion",
        "quantity": 1,
        "hidden": false,
        "left": 63.92405063291139,
        "top": 13.076923076923078
      },
      {
        "event": 54,
        "x": 35,
        "y": 9,
        "id": "POKEBALL",
        "name": "Poké Ball",
        "quantity": 1,
        "hidden": false,
        "left": 44.936708860759495,
        "top": 14.615384615384617
      },
      {
        "event": 65,
        "x": 13,
        "y": 50,
        "id": "ORANBERRY",
        "name": "Oran Berry",
        "quantity": 1,
        "hidden": false,
        "left": 17.088607594936708,
        "top": 77.6923076923077
      }
    ]
  },
  {
    "slug": "route-1",
    "name": "Route 1",
    "kind": "Route",
    "tag": "",
    "desc": "The first route east of Saudade Town, winding north toward Eventide Forest through wheat fields and tall grass.",
    "exits": "Northeast — Eventide Forest | Southeast — Route 5 | West — Saudade Town",
    "encounter": "Grass",
    "map": "route-1.png",
    "mons": [
      "013",
      "010",
      "017",
      "044",
      "041"
    ],
    "encounters": [
      {
        "dex": "013",
        "pct": 30,
        "lv": "2-4",
        "method": "Land"
      },
      {
        "dex": "010",
        "pct": 30,
        "lv": "2-4",
        "method": "Land"
      },
      {
        "dex": "017",
        "pct": 25,
        "lv": "2-4",
        "method": "Land"
      },
      {
        "dex": "044",
        "pct": 10,
        "lv": "3-4",
        "method": "Land"
      },
      {
        "dex": "041",
        "pct": 5,
        "lv": "3-4",
        "method": "Land"
      }
    ],
    "items": [
      "Pokéball x3",
      "Potion x2",
      "Oran Berry"
    ],
    "quests": [],
    "npcs": [
      {
        "name": "Bartholomew",
        "role": "Youngster",
        "sprite": "YOUNGSTER.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "013",
            "name": "Rarcraft",
            "lv": 2,
            "ability": "",
            "moves": [
              "Scratch",
              "Tail Whip"
            ],
            "note": ""
          },
          {
            "dex": "013",
            "name": "Rarcraft",
            "lv": 3,
            "ability": "",
            "moves": [
              "Scratch",
              "Tail Whip",
              "Thief"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "YOUNGSTER",
          "Bartholomew",
          "0"
        ]
      },
      {
        "name": "Amanda",
        "role": "Lass",
        "sprite": "LASS.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "010",
            "name": "Sicklet",
            "lv": 5,
            "ability": "",
            "moves": [
              "Tackle",
              "Growl"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "LASS",
          "Amanda",
          "0"
        ]
      }
    ],
    "notes": [
      [
        "Quest board",
        "Sedi-Saga I: The Chosen One sends you to fetch Sadie’s strange stone. The rewards are Sedimite, five Potions and $500."
      ]
    ],
    "questGuide": [
      {
        "title": "Sedi-Saga I: The Chosen One",
        "kind": "Side quest",
        "description": "Sadie asked me to get a stone in Sedimite Grove, in between two green and orange trees.",
        "giver": "Sadie",
        "report": "Sadie in Sedimite Grove",
        "reward": "5x Potion, A special Pokémon, $500",
        "requires": []
      },
      {
        "title": "A Handful of Hattot",
        "kind": "Side quest",
        "description": "After running in circles all morning Ivan lost all of his Hattot, help retrieve them and return them to their owner.",
        "giver": "Ivan",
        "report": "",
        "reward": "1x Lava Cookie",
        "requires": []
      }
    ],
    "pickups": [
      {
        "event": 1,
        "x": 24,
        "y": 11,
        "id": "POKEBALL",
        "name": "Poké Ball",
        "quantity": 1,
        "hidden": false,
        "left": 41.52542372881356,
        "top": 25.555555555555554
      },
      {
        "event": 4,
        "x": 53,
        "y": 7,
        "id": "POKEBALL",
        "name": "Poké Ball",
        "quantity": 1,
        "hidden": false,
        "left": 90.67796610169492,
        "top": 16.666666666666664
      },
      {
        "event": 6,
        "x": 15,
        "y": 38,
        "id": "REPEL",
        "name": "Repel",
        "quantity": 1,
        "hidden": false,
        "left": 26.27118644067797,
        "top": 85.55555555555556
      },
      {
        "event": 8,
        "x": 35,
        "y": 22,
        "id": "POKEBALL",
        "name": "Poké Ball",
        "quantity": 1,
        "hidden": false,
        "left": 60.16949152542372,
        "top": 50
      },
      {
        "event": 22,
        "x": 48,
        "y": 31,
        "id": "ORANBERRY",
        "name": "Oran Berry",
        "quantity": 1,
        "hidden": false,
        "left": 82.20338983050848,
        "top": 70
      }
    ]
  },
  {
    "slug": "eventide-forest",
    "name": "Eventide Forest",
    "kind": "Forest",
    "tag": "",
    "desc": "A dense forest north of Route 1. Reetle's Grotto is hidden here and contains the Strange Stone — look for the path between a small brown tree and a green tree. Leads north to Professor Hickory's Lab.",
    "exits": "North — Professor Hickory's Lab | South — Route 1 | East — Route 5 (Acciome)",
    "encounter": "Grass",
    "map": "eventide-forest.png",
    "mons": [
      "017",
      "010",
      "025",
      "027",
      "023",
      "052",
      "034"
    ],
    "encounters": [
      {
        "dex": "017",
        "pct": 25,
        "lv": "3-5",
        "method": "Land"
      },
      {
        "dex": "010",
        "pct": 21,
        "lv": "3-5",
        "method": "Land"
      },
      {
        "dex": "025",
        "pct": 16,
        "lv": "3-5",
        "method": "Land"
      },
      {
        "dex": "027",
        "pct": 16,
        "lv": "3-5",
        "method": "Land"
      },
      {
        "dex": "023",
        "pct": 16,
        "lv": "3-5",
        "method": "Land"
      },
      {
        "dex": "052",
        "pct": 5,
        "lv": "3-5",
        "method": "Land"
      },
      {
        "dex": "034",
        "pct": 1,
        "lv": "6",
        "method": "Land"
      }
    ],
    "items": [
      "Great Ball",
      "Potion"
    ],
    "quests": [],
    "npcs": [
      {
        "name": "Lorenzo",
        "role": "Bug Catcher",
        "sprite": "BUGCATCHER.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "017",
            "name": "Reetle",
            "lv": 6,
            "ability": "",
            "moves": [
              "Astonish",
              "Growl",
              "Flail"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "BUGCATCHER",
          "Lorenzo",
          "0"
        ]
      },
      {
        "name": "Dustin",
        "role": "Student",
        "sprite": "STUDENT_M.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "020",
            "name": "Dustalon",
            "lv": 4,
            "ability": "",
            "moves": [
              "Tackle",
              "Sand Attack"
            ],
            "note": ""
          },
          {
            "dex": "029",
            "name": "Capikid",
            "lv": 5,
            "ability": "",
            "moves": [
              "Thunder Shock",
              "Baby-Doll Eyes",
              "Double Slap"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "STUDENT_M",
          "Dustin",
          "0"
        ]
      },
      {
        "name": "Jenny",
        "role": "Student",
        "sprite": "STUDENT_F.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "025",
            "name": "Yarnsect",
            "lv": 5,
            "ability": "",
            "moves": [
              "Fairy Wind",
              "String Shot",
              "Cut"
            ],
            "note": ""
          },
          {
            "dex": "027",
            "name": "Pawnut",
            "lv": 5,
            "ability": "",
            "moves": [
              "Tackle",
              "Harden",
              "Leech Seed"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "STUDENT_F",
          "Jenny",
          "0"
        ]
      }
    ],
    "notes": [
      [
        "Sadie’s forest game",
        "Sedi-Saga IV is a game of Forest Tag: chase Sadie while her Pokémon block the way. Completing it earns a Leaf Stone."
      ],
      [
        "The Blue Reetle",
        "Speak to Rory about finding an Anomaly Reetle. This quest rewards the Anomaly Charm."
      ]
    ],
    "questGuide": [
      {
        "title": "Sedi-Saga IV: Tag, You're It!",
        "kind": "Side quest",
        "description": "Sadie has turned druid and dares you to tag her in Eventide Forest. She lets Pokémon out to block your way whenever you get close. Battle them aside and corner her.",
        "giver": "Sadie",
        "report": "Sadie in Eventide Forest",
        "reward": "1x Leaf Stone",
        "requires": [
          "Sedi-Saga I: The Chosen One"
        ]
      },
      {
        "title": "The Blue Reetle",
        "kind": "Side quest",
        "description": "Rory has spent weeks in Eventide Forest hoping to spot a blue Reetle, the anomaly form of Reetle. Find one and show it to him.",
        "giver": "Rory",
        "report": "Rory in Eventide Forest",
        "reward": "1x Anomaly Charm",
        "requires": []
      }
    ],
    "pickups": [
      {
        "event": 10,
        "x": 11,
        "y": 37,
        "id": "POTION",
        "name": "Potion",
        "quantity": 1,
        "hidden": false,
        "left": 16.19718309859155,
        "top": 72.11538461538461
      },
      {
        "event": 11,
        "x": 48,
        "y": 31,
        "id": "GREATBALL",
        "name": "Great Ball",
        "quantity": 1,
        "hidden": false,
        "left": 68.30985915492957,
        "top": 60.57692307692307
      },
      {
        "event": 32,
        "x": 15,
        "y": 7,
        "id": "ANTIDOTE",
        "name": "Antidote",
        "quantity": 1,
        "hidden": false,
        "left": 21.830985915492956,
        "top": 14.423076923076922
      }
    ]
  },
  {
    "slug": "professor-hickorys-lab",
    "name": "Professor Hickory's Lab",
    "kind": "Lab",
    "tag": "",
    "desc": "The research laboratory north of Eventide Forest, home to Professor Hickory's study of the Drapalla region's Pokémon and the anomalies of the Nullspace Rift.",
    "exits": "South — Eventide Forest",
    "encounter": "",
    "map": "professor-hickorys-lab.png",
    "mons": [],
    "encounters": [],
    "items": [],
    "quests": [],
    "npcs": [
      {
        "name": "Professor Hickory",
        "role": "Professor",
        "sprite": "PROFESSOR_HICKORY.png",
        "starterDependent": false,
        "line": "The region's leading researcher, devoted to the Pokémon of Drapalla and the mysteries of the Void.",
        "team": ""
      },
      {
        "name": "Pecan",
        "role": "Pokémon Trainer",
        "team": [
          {
            "dex": "013",
            "name": "Rarcraft",
            "lv": 9,
            "ability": "Frisk",
            "moves": [
              "Covet",
              "Tail Whip",
              "Thief",
              "Recycle"
            ],
            "note": ""
          },
          {
            "dex": "065",
            "name": "Walewep",
            "lv": 10,
            "ability": "Scrappy",
            "moves": [
              "Quick Attack",
              "Leer",
              "Endure",
              "Take Down"
            ],
            "note": "GeneSync → Stampede"
          }
        ],
        "sourceTrainer": [
          "POKEMONTRAINER_Pecan",
          "Pecan",
          "2"
        ],
        "sprite": "POKEMONTRAINER_PECAN.png"
      }
    ],
    "notes": [
      [
        "Your first partner",
        "Pecan introduces the starter Pokémon before you make your choice."
      ],
      [
        "Lab debrief",
        "Maple gives you the upgraded Exp. Share. After the chapter, Hickory checks your seen and caught totals for the Chapter 1 Pokédex, and Pecan and Maple have more to say."
      ]
    ],
    "questGuide": [
      {
        "title": "Syncing Up with the Professor",
        "kind": "Story",
        "description": "Professor Hickory called once the school day ended, and told the 4 of us to \"Sync Up\" at the Lab whatever that can mean.",
        "giver": "Professor Hickory",
        "report": "",
        "reward": "",
        "requires": []
      },
      {
        "title": "Task 1 : Report to Hickory",
        "kind": "Story",
        "description": "Head to the Professor's Lab and tell Hickory everything: what happened in Pebpup Cave, earning your first Gym Badge, the strange Marmie, and \"Team Void.\"",
        "giver": "Hickory",
        "report": "",
        "reward": "",
        "requires": []
      }
    ],
    "pickups": [
      {
        "event": 9,
        "x": 14,
        "y": 27,
        "id": "POTION",
        "name": "Potion",
        "quantity": 1,
        "hidden": false,
        "left": 28.999999999999996,
        "top": 68.75
      }
    ]
  },
  {
    "slug": "route-5",
    "name": "Route 5",
    "kind": "Route",
    "tag": "",
    "desc": "Connects Eventide Forest to Acciome City. A grassy route patrolled by students and a returning rival.",
    "exits": "West — Eventide Forest | East — Acciome | Southwest — Route 1",
    "encounter": "Grass",
    "map": "route-5.png",
    "mons": [
      "013",
      "029",
      "041",
      "061",
      "084",
      "081",
      "091"
    ],
    "encounters": [
      {
        "dex": "013",
        "pct": 25,
        "lv": "4-6",
        "method": "Land"
      },
      {
        "dex": "029",
        "pct": 25,
        "lv": "4-6",
        "method": "Land"
      },
      {
        "dex": "041",
        "pct": 15,
        "lv": "4-6",
        "method": "Land"
      },
      {
        "dex": "061",
        "pct": 10,
        "lv": "4-6",
        "method": "Land"
      },
      {
        "dex": "084",
        "pct": 10,
        "lv": "4-6",
        "method": "Land"
      },
      {
        "dex": "081",
        "pct": 10,
        "lv": "4-6",
        "method": "Land"
      },
      {
        "dex": "091",
        "pct": 5,
        "lv": "6",
        "method": "Land"
      }
    ],
    "items": [
      "Potion"
    ],
    "quests": [],
    "npcs": [
      {
        "name": "Nikola",
        "role": "Pokékid",
        "sprite": "POKEKID.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "047",
            "name": "Pebpup",
            "lv": 6,
            "ability": "",
            "moves": [
              "Bide",
              "Rollout"
            ],
            "note": ""
          },
          {
            "dex": "036",
            "name": "Scraqua",
            "lv": 6,
            "ability": "",
            "moves": [
              "Tackle",
              "Water Sport"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "POKEKID",
          "Nikola",
          "0"
        ]
      },
      {
        "name": "Tina",
        "role": "Florist",
        "sprite": "FLORIST.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "025",
            "name": "Yarnsect",
            "lv": 5,
            "ability": "",
            "moves": [
              "Fairy Wind",
              "String Shot",
              "Cut"
            ],
            "note": ""
          },
          {
            "dex": "041",
            "name": "Shrubcub",
            "lv": 6,
            "ability": "",
            "moves": [
              "Leafage",
              "Leer",
              "Absorb"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "FLORIST",
          "Tina",
          "0"
        ]
      },
      {
        "name": "Kimmi",
        "role": "Perfume Girl",
        "sprite": "PERFUME_GIRL.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "034",
            "name": "Tartort",
            "lv": 8,
            "ability": "",
            "moves": [
              "Absorb",
              "Sweet Scent",
              "Natural Gift",
              "Growth"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "PERFUME_GIRL",
          "Kimmi",
          "0"
        ]
      },
      {
        "name": "Rival (Ronan / Nya / Seren)",
        "role": "Rival",
        "starterDependent": true,
        "team": [
          {
            "dex": "056",
            "name": "Purssume",
            "lv": 9,
            "ability": "",
            "moves": [
              "Astonish",
              "Growl",
              "Quick Attack"
            ],
            "note": ""
          }
        ],
        "starterOptions": [
          {
            "dex": "004",
            "name": "Flaret",
            "lv": 11,
            "ability": "",
            "moves": [
              "Tackle",
              "Tail Whip",
              "Ember",
              "Brutal Swing"
            ],
            "note": "",
            "ifYouPicked": "Tamatoo (Grass)"
          },
          {
            "dex": "007",
            "name": "Cubble",
            "lv": 11,
            "ability": "",
            "moves": [
              "Pound",
              "Growl",
              "Bubble",
              "Fake Out"
            ],
            "note": "",
            "ifYouPicked": "Flaret (Fire)"
          },
          {
            "dex": "001",
            "name": "Tamatoo",
            "lv": 11,
            "ability": "",
            "moves": [
              "Tackle",
              "Defense Curl",
              "Leafage",
              "Barrage"
            ],
            "note": "",
            "ifYouPicked": "Cubble (Water)"
          }
        ],
        "starterNote": "Your rival’s identity depends on your character. Their starter depends on yours."
      }
    ],
    "notes": [
      [
        "Quest board",
        "Treasure in the Trash sends you into Acciome to recover Scrap’s lost parts from the bins. Earn an Upgrade and three Rarcraft comics, then return for daily trash diving."
      ]
    ],
    "questGuide": [
      {
        "title": "Treasure in the Trash",
        "kind": "Side quest",
        "description": "Scrap on Route 5 will teach you how to dive a dumpster properly. He stashed a busted radio, a coil of copper wire and a cracked camera lens in Acciome City's bins, then forgot which ones. Find all three.",
        "giver": "Scrap",
        "report": "Scrap on Route 5",
        "reward": "1x Upgrade, 1x Might Knight Comic, 1x Harpyie Comic, 1x Sugar Rush Comic",
        "requires": []
      }
    ],
    "pickups": [
      {
        "event": 9,
        "x": 31,
        "y": 28,
        "id": "PARALYZEHEAL",
        "name": "Paralyze Heal",
        "quantity": 1,
        "hidden": false,
        "left": 41.44736842105263,
        "top": 51.81818181818182
      },
      {
        "event": 22,
        "x": 59,
        "y": 47,
        "id": "POTION",
        "name": "Potion",
        "quantity": 1,
        "hidden": false,
        "left": 78.28947368421053,
        "top": 86.36363636363636
      },
      {
        "event": 23,
        "x": 59,
        "y": 27,
        "id": "ANTIDOTE",
        "name": "Antidote",
        "quantity": 1,
        "hidden": false,
        "left": 78.28947368421053,
        "top": 50
      }
    ]
  },
  {
    "slug": "acciome-city",
    "name": "Acciome City",
    "kind": "City",
    "tag": "",
    "desc": "A highly developed city known for its prestigious university and tight-knit community, filled with apartments and parks dedicated to its founder, Arun. Acciome University nurtures aspiring trainers, researchers, and educators. The player attends classes and has their first rival battle against Kayden here.",
    "exits": "West — Route 5",
    "encounter": "",
    "map": "acciome-city.png",
    "mons": [],
    "encounters": [],
    "items": [
      "Potion x2"
    ],
    "quests": [],
    "npcs": [
      {
        "name": "Kayden",
        "role": "Rival",
        "sprite": "POKEMONTRAINER_KAYDEN.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "010",
            "name": "Sicklet",
            "lv": 8,
            "ability": "",
            "moves": [
              "Tackle",
              "Growl",
              "Gust"
            ],
            "note": ""
          },
          {
            "dex": "049",
            "name": "Twilawoof",
            "lv": 9,
            "ability": "",
            "moves": [
              "Revealing Light",
              "Growl",
              "Howl",
              "Swift"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "POKEMONTRAINER_Kayden",
          "Kayden",
          "1"
        ]
      },
      {
        "name": "Ryan",
        "role": "Student",
        "team": [
          {
            "dex": "023",
            "name": "Marmie",
            "lv": 8,
            "ability": "Fur Coat",
            "moves": [
              "Work Up",
              "Power Trip",
              "Leer",
              "Fake Out"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "STUDENT_M",
          "Ryan",
          "0"
        ],
        "sprite": "STUDENT_M.png"
      },
      {
        "name": "Sophie",
        "role": "Student",
        "team": [
          {
            "dex": "029",
            "name": "Capikid",
            "lv": 8,
            "ability": "Fluffy",
            "moves": [
              "Thunder Shock",
              "Baby-Doll Eyes",
              "Double Slap",
              "Thunder Wave"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "STUDENT_F",
          "Sophie",
          "0"
        ],
        "sprite": "STUDENT_F.png"
      },
      {
        "name": "Gabi",
        "role": "Student",
        "team": [
          {
            "dex": "044",
            "name": "Cruspud",
            "lv": 12,
            "ability": "",
            "moves": [
              "Growth",
              "Rollout",
              "Sand Attack",
              "Infestation"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "STUDENT_F",
          "Gabi",
          "0"
        ],
        "sprite": "STUDENT_F.png"
      },
      {
        "name": "Ron",
        "role": "Student",
        "team": [
          {
            "dex": "079",
            "name": "Bunlet",
            "lv": 14,
            "ability": "",
            "moves": [
              "Mud Sport",
              "Fairy Wind",
              "Harden",
              "Flame Charge"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "STUDENT_M",
          "Ron",
          "0"
        ],
        "sprite": "STUDENT_M.png"
      },
      {
        "name": "Chad",
        "role": "Student",
        "team": [
          {
            "dex": "034",
            "name": "Tartort",
            "lv": 16,
            "ability": "",
            "moves": [
              "Natural Gift",
              "Growth",
              "Breaking Swipe",
              "Leaf Tornado"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "SCHOOLBOY",
          "Chad",
          "0"
        ],
        "sprite": "SCHOOLBOY.png"
      }
    ],
    "notes": [
      [
        "University lunchroom",
        "Lunchroom Ruckus starts at the city quest board. Defeat three troublemakers in the university lunchroom for a Casteliacone and a new box wallpaper."
      ],
      [
        "Poké Mart",
        "The second clerk sells Heal Balls, Training Balls, X items, Dire Hit and Guard Spec."
      ],
      [
        "Trash diving",
        "Start Treasure in the Trash at the Route 5 board, then search Acciome’s bins for Scrap’s lost parts. Completing it unlocks daily trash diving."
      ],
      [
        "After two badges",
        "In the postgame, challenge Dustin in Battle of Body. Win the sumo-wheel shoving match to receive an Assault Vest."
      ]
    ],
    "questGuide": [
      {
        "title": "Another Day At School",
        "kind": "Story",
        "description": "It's the third day of school at Acciome City University. Attend your usual classes, PKMN101 and BATTLE101, while you wait for the call about your ID update.",
        "giver": "Professor Hickory",
        "report": "",
        "reward": "",
        "requires": []
      },
      {
        "title": "ID Lost",
        "kind": "Side quest",
        "description": "Ivy lost her ID in Acciome City. She visited the Poké Mart, the Acciome Apartments, and the Plaza before she noticed. Help her track it down.",
        "giver": "Ivy",
        "report": "",
        "reward": "$1500",
        "requires": []
      },
      {
        "title": "Lunchroom Ruckus",
        "kind": "Side quest",
        "description": "Three students have taken over the Acciome University lunchroom with their food Pokémon. Battle all three and put an end to the ruckus.",
        "giver": "Principal Kaur",
        "report": "Principal Kaur",
        "reward": "1x Casteliacone",
        "requires": []
      },
      {
        "title": "Battle of Body",
        "kind": "Side quest",
        "description": "Dustin is training with Vane on the Acciome City court. He says battles are more than Pokémon: they're a battle of body, too. Beat him in a sumo-style shoving match by timing the wheel.",
        "giver": "Dustin",
        "report": "Dustin on the Acciome court",
        "reward": "1x Assault Vest",
        "requires": []
      }
    ],
    "pickups": [
      {
        "event": 41,
        "x": 30,
        "y": 34,
        "id": "POTION",
        "name": "Potion",
        "quantity": 1,
        "hidden": false,
        "left": 34.659090909090914,
        "top": 46
      },
      {
        "event": 42,
        "x": 63,
        "y": 51,
        "id": "ANTIDOTE",
        "name": "Antidote",
        "quantity": 1,
        "hidden": false,
        "left": 72.1590909090909,
        "top": 68.66666666666667
      },
      {
        "event": 43,
        "x": 64,
        "y": 32,
        "id": "REPEL",
        "name": "Repel",
        "quantity": 1,
        "hidden": false,
        "left": 73.29545454545455,
        "top": 43.333333333333336
      }
    ]
  },
  {
    "slug": "route-2",
    "name": "Route 2",
    "kind": "Route",
    "tag": "",
    "desc": "Home to a fishing hut where you can obtain the Old Rod by speaking to the fisherman inside. Connects Saudade Town to Limerico Town, with a path northwest to Pebpup Cavern.",
    "exits": "East — Saudade Town | West — Limerico Town | Northwest — Pebpup Cavern",
    "encounter": "Grass · Old Rod",
    "map": "route-2.png",
    "mons": [
      "013",
      "010",
      "047",
      "038",
      "056",
      "044",
      "036",
      "063",
      "097"
    ],
    "encounters": [
      {
        "dex": "013",
        "pct": 25,
        "lv": "5-7",
        "method": "Land"
      },
      {
        "dex": "010",
        "pct": 25,
        "lv": "5-7",
        "method": "Land"
      },
      {
        "dex": "047",
        "pct": 15,
        "lv": "5-7",
        "method": "Land"
      },
      {
        "dex": "038",
        "pct": 10,
        "lv": "5-7",
        "method": "Land"
      },
      {
        "dex": "056",
        "pct": 10,
        "lv": "5-7",
        "method": "Land"
      },
      {
        "dex": "044",
        "pct": 10,
        "lv": "5-7",
        "method": "Land"
      },
      {
        "dex": "036",
        "pct": 5,
        "lv": "5-7",
        "method": "Land"
      },
      {
        "dex": "063",
        "pct": 75,
        "lv": "5-7",
        "method": "OldRod"
      },
      {
        "dex": "097",
        "pct": 25,
        "lv": "5-7",
        "method": "OldRod"
      }
    ],
    "items": [
      "Potion",
      "Big Root"
    ],
    "quests": [],
    "npcs": [
      {
        "name": "Jay M.",
        "role": "Fisherman",
        "sprite": "FISHERMAN.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "063",
            "name": "Rhythfin",
            "lv": 8,
            "ability": "",
            "moves": [
              "Bubble",
              "Growl",
              "Aqua Jet"
            ],
            "note": ""
          },
          {
            "dex": "097",
            "name": "Broocling",
            "lv": 9,
            "ability": "",
            "moves": [
              "Tackle",
              "Tail Whip",
              "Pursuit",
              "Water Gun"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "FISHERMAN",
          "Jay M.",
          "0"
        ]
      },
      {
        "name": "Fran",
        "role": "Student",
        "sprite": "STUDENT_F.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "052",
            "name": "Karmold",
            "lv": 11,
            "ability": "",
            "moves": [
              "Camouflage",
              "Hypnosis",
              "Lick",
              "Return"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "SCHOOLGIRL",
          "Fran",
          "0"
        ]
      },
      {
        "name": "Rival (Nya / Seren / Ronan)",
        "role": "Rival",
        "starterDependent": true,
        "team": [
          {
            "dex": "056",
            "name": "Purssume",
            "lv": 13,
            "ability": "",
            "moves": [
              "Bite",
              "Quick Attack",
              "Double Team",
              "Growl"
            ],
            "note": ""
          },
          {
            "dex": "054",
            "name": "Petitour",
            "lv": 13,
            "ability": "",
            "moves": [
              "Flash",
              "Charge",
              "Charge Beam",
              "Bug Bite"
            ],
            "note": ""
          }
        ],
        "starterOptions": [
          {
            "dex": "007",
            "name": "Cubble",
            "lv": 15,
            "ability": "",
            "moves": [
              "Fake Out",
              "Bubble",
              "Fake Tears",
              "Pound"
            ],
            "note": "GeneSync → Unaware",
            "ifYouPicked": "Tamatoo (Grass)"
          },
          {
            "dex": "001",
            "name": "Tamatoo",
            "lv": 15,
            "ability": "",
            "moves": [
              "Defense Curl",
              "Leafage",
              "Barrage",
              "Grass Whistle"
            ],
            "note": "GeneSync → Stamina",
            "ifYouPicked": "Flaret (Fire)"
          },
          {
            "dex": "004",
            "name": "Flaret",
            "lv": 15,
            "ability": "",
            "moves": [
              "Ember",
              "Brutal Swing",
              "Sand Attack",
              "Tackle"
            ],
            "note": "GeneSync → Competitive",
            "ifYouPicked": "Cubble (Water)"
          }
        ],
        "starterNote": "Your rival’s identity depends on your character. Their starter depends on yours."
      }
    ],
    "notes": [
      [
        "Fishing challenge",
        "Pick up Bite Report from the quest board. Catch Pokémon in at least three fishing areas and show Raul to earn a Dive Ball, a Net Ball and a Pearl."
      ],
      [
        "Rival battle",
        "The ditzy rival’s team is level 15–17, including an evolved starter."
      ]
    ],
    "questGuide": [
      {
        "title": "Bite Report",
        "kind": "Side quest",
        "description": "Raul at the Fishing House on Route 2 posted a notice: fish up Pokémon in three different areas and bring them to him in your party.",
        "giver": "Raul",
        "report": "Raul at the Fishing House",
        "reward": "1x Dive Ball, 1x Net Ball, 1x Pearl",
        "requires": []
      }
    ],
    "pickups": [
      {
        "event": 14,
        "x": 23,
        "y": 11,
        "id": "BIGROOT",
        "name": "Big Root",
        "quantity": 1,
        "hidden": false,
        "left": 39.166666666666664,
        "top": 23
      },
      {
        "event": 25,
        "x": 11,
        "y": 30,
        "id": "POTION",
        "name": "Potion",
        "quantity": 1,
        "hidden": false,
        "left": 19.166666666666668,
        "top": 61
      },
      {
        "event": "fishing-house",
        "id": "OLDROD",
        "name": "Old Rod",
        "quantity": 1,
        "hidden": false,
        "left": 77.5,
        "top": 19,
        "description": "Speak to the fisherman inside the house."
      }
    ]
  },
  {
    "slug": "pebpup-cavern",
    "name": "Pebpup Cavern",
    "kind": "Cave",
    "tag": "",
    "desc": "Known for its large Pebpup population and mysterious distortion-like properties. Site of the player's first encounter with Gym Leader Clara and first clash with Team Pokémon Void, alongside Seren and Pecan. Find the Exp. Share in the northwest of the Main Den and a Repel on its central ledge.",
    "exits": "West — Limerico Town | (connects to Route 2)",
    "encounter": "Cave · Old Rod",
    "mons": [
      "047",
      "025",
      "093",
      "063"
    ],
    "encounters": [
      {
        "dex": "047",
        "pct": 82,
        "lv": "5-8",
        "method": "Cave"
      },
      {
        "dex": "025",
        "pct": 16,
        "lv": "6-8",
        "method": "Cave"
      },
      {
        "dex": "093",
        "pct": 2,
        "lv": "7-8",
        "method": "Cave"
      },
      {
        "dex": "063",
        "pct": 90,
        "lv": "5-8",
        "method": "OldRod"
      },
      {
        "dex": "093",
        "pct": 10,
        "lv": "7-8",
        "method": "OldRod"
      }
    ],
    "items": [
      "Exp. Share",
      "Repel"
    ],
    "quests": [],
    "npcs": [
      {
        "name": "Vivian",
        "role": "Scientist",
        "sprite": "SCIENTIST_F.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "010",
            "name": "Sicklet",
            "lv": 9,
            "ability": "",
            "moves": [
              "Tackle",
              "Growl",
              "Gust",
              "Acid"
            ],
            "note": ""
          },
          {
            "dex": "013",
            "name": "Rarcraft",
            "lv": 9,
            "ability": "",
            "moves": [
              "Scratch",
              "Tail Whip",
              "Thief",
              "Recycle"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "SCIENTIST_F",
          "Vivian",
          "0"
        ]
      }
    ],
    "questGuide": [
      {
        "title": "Task 1 : Pebpup Cave Study",
        "kind": "Story",
        "description": "You and one of your Rivals are under Pecan's Supervision to investigate some strange readings found in Pebpup Cave on Route 2.",
        "giver": "Pecan",
        "report": "",
        "reward": "",
        "requires": []
      },
      {
        "title": "Saving Maumau",
        "kind": "Story",
        "description": "With no one else around, and it being on the way, you decided to go to Pebpup Cave to investigate a missing Marmie and see the \"Strange Purple People\".",
        "giver": "Kathleen",
        "report": "",
        "reward": "",
        "requires": []
      }
    ],
    "map": "pebpup-entrance.png",
    "maps": [
      {
        "name": "Entrance",
        "file": "pebpup-entrance.png",
        "pickups": [],
        "connections": [
          {
            "event": 4,
            "name": "Route 2",
            "left": 50,
            "top": 70,
            "slug": "route-2"
          },
          {
            "event": 8,
            "name": "Main Den",
            "left": 54,
            "top": 26,
            "file": "pebpup-main-den.png"
          }
        ]
      },
      {
        "name": "Main Den",
        "file": "pebpup-main-den.png",
        "pickups": [
          {
            "event": 20,
            "x": 32,
            "y": 19,
            "id": "REPEL",
            "name": "Repel",
            "quantity": 1,
            "hidden": false,
            "left": 55.08474576271186,
            "top": 48.75
          },
          {
            "event": 26,
            "x": 11,
            "y": 9,
            "id": "EXPSHARE",
            "name": "Exp. Share",
            "quantity": 1,
            "hidden": false,
            "left": 19.491525423728813,
            "top": 23.75
          }
        ],
        "connections": [
          {
            "event": 1,
            "name": "Entrance",
            "left": 75.42372881355932,
            "top": 83.75,
            "file": "pebpup-entrance.png"
          },
          {
            "event": 2,
            "name": "Inner Den · lower",
            "left": 85.59322033898306,
            "top": 68.75,
            "file": "pebpup-inner-den.png"
          },
          {
            "event": 3,
            "name": "Inner Den · upper",
            "left": 75.42372881355932,
            "top": 16.25,
            "file": "pebpup-inner-den.png"
          },
          {
            "event": 22,
            "name": "Limerico Town",
            "left": 11.016949152542372,
            "top": 41.25,
            "slug": "limerico-town"
          }
        ]
      },
      {
        "name": "Inner Den",
        "file": "pebpup-inner-den.png",
        "pickups": [],
        "connections": [
          {
            "event": 1,
            "name": "Main Den · lower",
            "left": 29.310344827586203,
            "top": 67.1875,
            "file": "pebpup-main-den.png"
          },
          {
            "event": 2,
            "name": "Main Den · upper",
            "left": 29.310344827586203,
            "top": 29.6875,
            "file": "pebpup-main-den.png"
          }
        ]
      }
    ]
  },
  {
    "slug": "limerico-town",
    "name": "Limerico Town",
    "kind": "Town",
    "tag": "",
    "desc": "Home to the Limerico Siblings, known for its abundance of livestock and farm life. Hosts the first Gym, led by Gym Leader Clara, as well as the first Pokémon Void Daycare Center. The Pokémart's trash can secretly holds a Leftovers — well worth grabbing early.",
    "exits": "North — Pebpup Cavern (Western Entrance) | East — Route 2 | West — Route 4",
    "encounter": "",
    "map": "limerico-town.png",
    "mons": [],
    "encounters": [],
    "items": [
      "Leftovers",
      "Everstone"
    ],
    "quests": [],
    "npcs": [
      {
        "name": "Forest",
        "role": "Farmer",
        "sprite": "FARMER.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "038",
            "name": "Scalfling",
            "lv": 10,
            "ability": "",
            "moves": [
              "Poison Sting",
              "Tail Whip",
              "Rage",
              "Beat Up"
            ],
            "note": ""
          },
          {
            "dex": "027",
            "name": "Pawnut",
            "lv": 11,
            "ability": "",
            "moves": [
              "Tackle",
              "Harden",
              "Leech Seed",
              "Growth"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "FARMER",
          "Forest",
          "0"
        ]
      },
      {
        "name": "Siesta",
        "role": "Harvester",
        "sprite": "HARVESTER.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "044",
            "name": "Cruspud",
            "lv": 13,
            "ability": "",
            "moves": [
              "Mud Shot",
              "Infestation",
              "Growth",
              "Absorb"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "HARVESTER",
          "Siesta",
          "0"
        ]
      },
      {
        "name": "Clara",
        "role": "Gym Leader",
        "sprite": "LEADER_CLARA.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "044",
            "name": "Cruspud",
            "lv": 12,
            "ability": "Harvest",
            "moves": [
              "Rollout",
              "Sand Attack",
              "Infestation",
              "Work Up"
            ],
            "note": "Held item: Oran Berry"
          },
          {
            "dex": "036",
            "name": "Scraqua",
            "lv": 13,
            "ability": "",
            "moves": [
              "Tackle",
              "Aqua Jet",
              "Work Up",
              "Bite"
            ],
            "note": ""
          },
          {
            "dex": "039",
            "name": "Bision",
            "lv": 15,
            "ability": "Intimidate",
            "moves": [
              "Work Up",
              "Poison Tail",
              "Rage",
              "Pounce"
            ],
            "note": "Held item: Sitrus Berry · GeneSync → Cud Chew"
          }
        ],
        "sourceTrainer": [
          "LEADER_CLARA",
          "Clara",
          "1"
        ]
      }
    ],
    "notes": [
      [
        "Growth Badge",
        "Clara runs the first Gym. Nate welcomes you to a ranch trial through hay bales before the leader battle. Leaving during the trial resets it."
      ],
      [
        "Poké Mart",
        "The second clerk sells Friend Balls, Repeat Balls and vitamins: HP Up, Protein, Iron, Calcium, Zinc and Carbos."
      ],
      [
        "Quest board",
        "Take on two ranch jobs in Ranch Rush. In A Prism in the Nest, hatch Mari’s Egg and show her the Prislect; the quest includes a Shiny Prislect Egg."
      ]
    ],
    "questGuide": [
      {
        "title": "Task 1? The Barnyard.",
        "kind": "Story",
        "description": "Under a misunderstanding, you decide to join your other rivals working at the Barn.",
        "giver": "Mari",
        "report": "",
        "reward": "",
        "requires": []
      },
      {
        "title": "Rustlers on the Ranch",
        "kind": "Story",
        "description": "Gym Leader 1, First Seat Clara of the Limerico Twins is challenging you to her Gym in Limerico Town.",
        "giver": "Hickory",
        "report": "",
        "reward": "",
        "requires": []
      },
      {
        "title": "Ranch Rush: Work Mindset",
        "kind": "Side quest",
        "description": "Farmer JJ posted a challenge: Gym Leader Clara still holds a feeding shift score of 7800. Work a shift in the Limerico barn and beat it to prove your work mindset.",
        "giver": "Farmer JJ",
        "report": "Farmer JJ in the Limerico barn",
        "reward": "1x Rare Candy, $1000",
        "requires": [
          "Task 1? The Barnyard."
        ]
      },
      {
        "title": "Ranch Rush: Top of the Barn",
        "kind": "Side quest",
        "description": "You beat Clara, but Farmer JJ says the real record belongs to Clayton: 9000 points in a single feeding shift. Work a shift in the Limerico barn and take the top spot.",
        "giver": "Farmer JJ",
        "report": "Farmer JJ in the Limerico barn",
        "reward": "1x Ability Capsule, $2500",
        "requires": [
          "Ranch Rush: Work Mindset"
        ]
      },
      {
        "title": "A Prism in the Nest",
        "kind": "Side quest",
        "description": "Mari says breeding is complicated, and breeders overseas use a copying Pokémon to make it easier. Hers is a Prislect, and she wishes she had another. Visit her at the Day-Care.",
        "giver": "Mari",
        "report": "Mari at the Limerico Day-Care",
        "reward": "Shiny Prislect Egg",
        "requires": []
      }
    ],
    "pickups": []
  },
  {
    "slug": "route-4",
    "name": "Route 4",
    "kind": "Route",
    "tag": "",
    "desc": "A route west of Limerico Town leading north toward Apocrypha Town.",
    "exits": "North — Apocrypha Town | Southeast — Limerico Town",
    "encounter": "Grass",
    "map": "route-4.png",
    "mons": [
      "032",
      "086",
      "017",
      "108",
      "100",
      "049",
      "104",
      "018"
    ],
    "encounters": [
      {
        "dex": "032",
        "pct": 25,
        "lv": "8-11",
        "method": "Land"
      },
      {
        "dex": "086",
        "pct": 20,
        "lv": "8-11",
        "method": "Land"
      },
      {
        "dex": "017",
        "pct": 15,
        "lv": "8-11",
        "method": "Land"
      },
      {
        "dex": "108",
        "pct": 15,
        "lv": "8-11",
        "method": "Land"
      },
      {
        "dex": "100",
        "pct": 10,
        "lv": "9-11",
        "method": "Land"
      },
      {
        "dex": "049",
        "pct": 5,
        "lv": "9-11",
        "method": "Land"
      },
      {
        "dex": "104",
        "pct": 5,
        "lv": "9-11",
        "method": "Land"
      },
      {
        "dex": "018",
        "pct": 5,
        "lv": "12",
        "method": "Land"
      }
    ],
    "items": [
      "PP Up",
      "Zinc",
      "Quick Ball",
      "Rare Candy"
    ],
    "quests": [],
    "npcs": [
      {
        "name": "Felix",
        "role": "Student",
        "sprite": "STUDENT_M.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "111",
            "name": "SC0R-910",
            "lv": 22,
            "ability": "",
            "moves": [
              "Ancient Power",
              "Wonder Room",
              "Disable",
              "Revealing Light"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "STUDENT_M",
          "Felix",
          "0"
        ]
      },
      {
        "name": "Natty",
        "role": "Lass",
        "sprite": "LASS.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "034",
            "name": "Tartort",
            "lv": 20,
            "ability": "",
            "moves": [
              "Leaf Tornado",
              "Breaking Swipe",
              "Growth",
              "Sweet Scent"
            ],
            "note": ""
          },
          {
            "dex": "087",
            "name": "Flarflock",
            "lv": 20,
            "ability": "",
            "moves": [
              "Incinerate",
              "Flatter",
              "Round",
              "Sing"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "LASS",
          "Natty",
          "0"
        ]
      },
      {
        "name": "Huebert",
        "role": "Pokékid",
        "sprite": "POKEKID.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "091",
            "name": "Mangmo",
            "lv": 19,
            "ability": "",
            "moves": [
              "Wing Attack",
              "Defog",
              "Twister",
              "Quick Attack"
            ],
            "note": ""
          },
          {
            "dex": "036",
            "name": "Scraqua",
            "lv": 20,
            "ability": "",
            "moves": [
              "Snarl",
              "Aqua Jet",
              "Bite",
              "Howl"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "POKEKID",
          "Huebert",
          "0"
        ]
      }
    ],
    "questGuide": [],
    "pickups": [
      {
        "event": 30,
        "x": 43,
        "y": 33,
        "id": "QUICKBALL",
        "name": "Quick Ball",
        "quantity": 1,
        "hidden": false,
        "left": 79.0909090909091,
        "top": 35.26315789473684
      },
      {
        "event": 31,
        "x": 9,
        "y": 57,
        "id": "ZINC",
        "name": "Zinc",
        "quantity": 1,
        "hidden": false,
        "left": 17.272727272727273,
        "top": 60.526315789473685
      },
      {
        "event": 32,
        "x": 10,
        "y": 38,
        "id": "RARECANDY",
        "name": "Rare Candy",
        "quantity": 1,
        "hidden": false,
        "left": 19.090909090909093,
        "top": 40.526315789473685
      }
    ]
  },
  {
    "slug": "route-3",
    "name": "Route 3",
    "kind": "Route",
    "tag": "",
    "desc": "A grassy route home to a variety of early-game Pokémon.",
    "exits": "North — Saudade Town | South — Aphora Town",
    "encounter": "Grass · Old Rod",
    "map": "route-3.png",
    "mons": [
      "013",
      "020",
      "029",
      "059",
      "056",
      "063",
      "097",
      "089"
    ],
    "encounters": [
      {
        "dex": "013",
        "pct": 25,
        "lv": "3-5",
        "method": "Land"
      },
      {
        "dex": "020",
        "pct": 25,
        "lv": "3-5",
        "method": "Land"
      },
      {
        "dex": "029",
        "pct": 25,
        "lv": "3-5",
        "method": "Land"
      },
      {
        "dex": "059",
        "pct": 15,
        "lv": "3-5",
        "method": "Land"
      },
      {
        "dex": "056",
        "pct": 10,
        "lv": "4-5",
        "method": "Land"
      },
      {
        "dex": "063",
        "pct": 70,
        "lv": "5-7",
        "method": "OldRod"
      },
      {
        "dex": "097",
        "pct": 25,
        "lv": "5-7",
        "method": "OldRod"
      },
      {
        "dex": "089",
        "pct": 5,
        "lv": "6-7",
        "method": "OldRod"
      }
    ],
    "items": [],
    "quests": [],
    "npcs": [
      {
        "name": "Teddy",
        "role": "Student",
        "sprite": "STUDENT_M.png",
        "starterDependent": false,
        "team": [
          {
            "dex": "017",
            "name": "Reetle",
            "lv": 4,
            "ability": "",
            "moves": [
              "Astonish",
              "Growl",
              "Flail"
            ],
            "note": ""
          },
          {
            "dex": "032",
            "name": "Powse",
            "lv": 5,
            "ability": "",
            "moves": [
              "Pound",
              "Tail Whip",
              "Work Up"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "SCHOOLBOY",
          "Teddy",
          "0"
        ]
      }
    ],
    "notes": [
      [
        "Quest board",
        "Sedi-Saga III challenges you to find the real Sadie in a mirror shell game over three rounds. Your reward is a Fire Stone."
      ]
    ],
    "questGuide": [
      {
        "title": "Sedi-Saga III: Mirror, Mirror",
        "kind": "Side quest",
        "description": "Sadie waits on the field on Route 3. She splits into mirror images and shuffles them; keep your eyes on the real Sadie and pick her out, three rounds in a row.",
        "giver": "Sadie",
        "report": "Sadie on Route 3",
        "reward": "1x Fire Stone",
        "requires": [
          "Sedi-Saga I: The Chosen One"
        ]
      }
    ],
    "pickups": []
  },
  {
    "slug": "aphora-town",
    "name": "Aphora Town",
    "kind": "Town",
    "tag": "",
    "desc": "A place steeped in history, filled with clues about Primordial Pokémon and the origins of Cosmic and Light types. Known for its beautiful crystal-blue flowers. Here you can find the Pokédoll (from a ghostly child in one of the houses) and the Move Re-Learner (inside one of the homes).",
    "exits": "North — Route 3",
    "encounter": "",
    "map": "aphora-town.png",
    "mons": [],
    "encounters": [],
    "items": [
      "Pokédoll"
    ],
    "quests": [],
    "npcs": [
      {
        "name": "Student Teddy",
        "role": "Student",
        "sprite": "STUDENT_M.png",
        "line": "",
        "team": ""
      }
    ],
    "notes": [
      [
        "Quest board",
        "Sedi-Saga II: Patience of a True Monk is two rounds of Red Light, Green Light with Sadie. Finish it to receive a Water Stone."
      ]
    ],
    "questGuide": [
      {
        "title": "Sedi-Saga II: Patience of a True Monk",
        "kind": "Side quest",
        "description": "Sadie awaits atop the stairs in Aphora Town with a trial: the Patience Practice of a True Monk. Advance while her back is turned and stand still as stone when she faces you. Pass the warm-up, then the real test on the path above.",
        "giver": "Sadie",
        "report": "Sadie",
        "reward": "1x Water Stone",
        "requires": [
          "Sedi-Saga I: The Chosen One"
        ]
      }
    ],
    "pickups": [
      {
        "event": 32,
        "x": 33,
        "y": 13,
        "id": "POTION",
        "name": "Potion",
        "quantity": 1,
        "hidden": false,
        "left": 59.82142857142857,
        "top": 22.5
      },
      {
        "event": 35,
        "x": 44,
        "y": 23,
        "id": "POTION",
        "name": "Potion",
        "quantity": 1,
        "hidden": false,
        "left": 79.46428571428571,
        "top": 39.166666666666664
      }
    ]
  },
  {
    "slug": "consilia-town",
    "name": "Consilia Town",
    "kind": "Town",
    "tag": "Town",
    "desc": "A town of food, cooking challenges and the Culinary Badge. Consilia is also at the centre of Chapter 1’s finale.",
    "exits": "",
    "encounter": "",
    "mons": [],
    "encounters": [],
    "items": [],
    "quests": [],
    "npcs": [
      {
        "name": "Seiya",
        "role": "Gym Leader",
        "team": [
          {
            "dex": "034",
            "name": "Tartort",
            "lv": 20,
            "ability": "",
            "moves": [
              "Leaf Tornado",
              "Breaking Swipe",
              "Growth",
              "Rest"
            ],
            "note": ""
          },
          {
            "dex": "071",
            "name": "Sedificer",
            "lv": 21,
            "ability": "",
            "moves": [
              "Charge Beam",
              "Charge",
              "Rock Tomb",
              "Metronome"
            ],
            "note": ""
          },
          {
            "dex": "080",
            "name": "Boarger",
            "lv": 23,
            "ability": "Food Coma",
            "moves": [
              "Overcook",
              "Rest",
              "Flame Charge",
              "Secret Power"
            ],
            "note": "Held item: Chesto Berry · GeneSync → Unaware"
          }
        ],
        "sourceTrainer": [
          "LEADER_SEIYA",
          "Seiya",
          "0"
        ]
      },
      {
        "name": "Viper",
        "role": "Void Grunt",
        "team": [
          {
            "dex": "045",
            "name": "Rotato",
            "lv": 20,
            "ability": "",
            "moves": [
              "Leech Seed",
              "Mud Shot",
              "Frustration",
              "Infestation"
            ],
            "note": ""
          },
          {
            "dex": "109",
            "name": "Ocuclaw",
            "lv": 22,
            "ability": "",
            "moves": [
              "Ominous Wind",
              "Air Cutter",
              "Disable",
              "Razor Wind"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "VOIDGRUNT_F",
          "Viper",
          "0"
        ],
        "sprite": "VOIDGRUNT_F.png"
      },
      {
        "name": "Vander",
        "role": "Void Grunt",
        "team": [
          {
            "dex": "045",
            "name": "Rotato",
            "lv": 20,
            "ability": "",
            "moves": [
              "Leech Seed",
              "Mud Shot",
              "Frustration",
              "Infestation"
            ],
            "note": ""
          },
          {
            "dex": "104",
            "name": "Pymood",
            "lv": 22,
            "ability": "",
            "moves": [
              "Fire Spin",
              "Roar",
              "Quash",
              "Feint Attack"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "VOIDGRUNT_M",
          "Vander",
          "0"
        ],
        "sprite": "VOIDGRUNT_M.png"
      },
      {
        "name": "Misogi",
        "role": "Waitress",
        "team": [
          {
            "dex": "016",
            "name": "Razoom",
            "lv": 20,
            "ability": "",
            "moves": [
              "Electro Ball",
              "Swift",
              "Charm",
              "Snarl"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "WAITRESS",
          "Misogi",
          "0"
        ],
        "sprite": "WAITRESS.png"
      },
      {
        "name": "Hamy",
        "role": "Sous Chef",
        "team": [
          {
            "dex": "079",
            "name": "Bunlet",
            "lv": 19,
            "ability": "",
            "moves": [
              "Flame Charge",
              "Harden",
              "Fairy Wind",
              "Aromatic Mist"
            ],
            "note": ""
          },
          {
            "dex": "027",
            "name": "Pawnut",
            "lv": 20,
            "ability": "",
            "moves": [
              "Bullet Seed",
              "Protect",
              "Growth",
              "Harden"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "SOUSCHEF_F",
          "Hamy",
          "0"
        ],
        "sprite": "SOUSCHEF_F.png"
      },
      {
        "name": "Kyle",
        "role": "Sous Chef",
        "team": [
          {
            "dex": "093",
            "name": "Shorecite",
            "lv": 19,
            "ability": "",
            "moves": [
              "Brine",
              "Protect",
              "Vise Grip",
              "Rock Throw"
            ],
            "note": ""
          },
          {
            "dex": "063",
            "name": "Rhythfin",
            "lv": 19,
            "ability": "",
            "moves": [
              "Bubble Beam",
              "Life Dew",
              "Round",
              "Sing"
            ],
            "note": ""
          },
          {
            "dex": "087",
            "name": "Flarflock",
            "lv": 20,
            "ability": "",
            "moves": [
              "Incinerate",
              "Sunny Day",
              "Round",
              "Sing"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "SOUSCHEF_M",
          "Kyle",
          "0"
        ],
        "sprite": "SOUSCHEF_M.png"
      }
    ],
    "notes": [
      [
        "Culinary Badge",
        "Seiya’s Gym trial is a three-course meal: prepare an appetizer, an entrée and a dessert using the oven, stove, fryer and countertop. A wrong dish triggers a battle with Misogi, Hamy or Kyle. Use the dessert checklist to track the base, cream and garnish."
      ],
      [
        "Cooking tips",
        "Seiya only accepts finished dishes. You may discard one dish per round. Holding Run lets you move faster while carrying food."
      ],
      [
        "Poké Mart",
        "The second clerk stocks Lure Balls, Nest Balls and the type-resist berries."
      ],
      [
        "Deliveries and desserts",
        "Delivery Driver Wanted starts at the board and sends you between Consilia and Acciome for two food deliveries. After the chapter, Sweet Dreams asks you to whip cream for Seiya. Lily, in the eastern houses, offers a Choice Scarf if you give her the Whipped Dream."
      ],
      [
        "Chapter finale · spoilers",
        "Team Void kidnaps Seiya during Taken To-Go. Join Kayden in a double battle, then follow the grunts to Corrupted Route 6. On your return, Seiya gives you TM014 Rest."
      ]
    ],
    "map": "consilia-town.png",
    "questGuide": [
      {
        "title": "Task 2 : Learning Life Basics",
        "kind": "Story",
        "description": "Hickory is telling you to learn the basics of life, emphasized through relaxation & recovery, as well as cooking for sustenance.",
        "giver": "Hickory",
        "report": "",
        "reward": "",
        "requires": []
      },
      {
        "title": "Good Spots for Ingredients",
        "kind": "Story",
        "description": "Sous Chef Jae is requesting Wheat from Saudade, Berries from Acciome, and Honey from Limerico. Approach the right person and return to Jae after.",
        "giver": "Jae",
        "report": "",
        "reward": "",
        "requires": []
      },
      {
        "title": "Pokémon Master Chef",
        "kind": "Story",
        "description": "Gym Leader 2, Second Seat Seiya, the Cooking Hero is challenging you to his Gym in Consilia Town.",
        "giver": "Hickory",
        "report": "",
        "reward": "",
        "requires": []
      },
      {
        "title": "Sweet Dreams",
        "kind": "Side quest",
        "description": "Pick up Chateau Seiya's imported cream at Acciome Imports, have Emi prep it in Consilia, whip it yourself, then bring it to Chef Seiya at the Consilia Gym.",
        "giver": "Chef Seiya",
        "report": "Seiya at the Consilia Gym",
        "reward": "1x Whipped Dream",
        "requires": []
      },
      {
        "title": "A Little Girl's Dream",
        "kind": "Side quest",
        "description": "Lily lives in the houses on the east side of Consilia. She has saved for months to eat at the Chateau, and her Tartort has always dreamed of becoming a Scallery. Chef Seiya asked you to make her dream come true.",
        "giver": "Chef Seiya",
        "report": "Lily in Consilia",
        "reward": "",
        "requires": []
      }
    ],
    "related": [
      {
        "slug": "chateau-seiya",
        "name": "Chateau Seiya"
      },
      {
        "slug": "corrupted-route-6",
        "name": "Corrupted Route 6"
      }
    ],
    "pickups": [
      {
        "event": 117,
        "x": 8,
        "y": 12,
        "id": "LEMONADE",
        "name": "Lemonade",
        "quantity": 1,
        "hidden": false,
        "left": 13.076923076923078,
        "top": 26.595744680851062
      },
      {
        "event": 118,
        "x": 52,
        "y": 15,
        "id": "GREATBALL",
        "name": "Great Ball",
        "quantity": 1,
        "hidden": false,
        "left": 80.76923076923077,
        "top": 32.97872340425532
      },
      {
        "event": 119,
        "x": 13,
        "y": 39,
        "id": "HYPERPOTION",
        "name": "Hyper Potion",
        "quantity": 1,
        "hidden": false,
        "left": 20.76923076923077,
        "top": 84.04255319148936
      }
    ]
  },
  {
    "slug": "route-6",
    "name": "Route 6",
    "kind": "Route",
    "tag": "Route",
    "desc": "A route with grass encounters, Old Rod fishing and a race against Jaime.",
    "exits": "",
    "encounter": "Grass · Old Rod",
    "mons": [
      "044",
      "020",
      "038",
      "086",
      "059",
      "101",
      "079",
      "063",
      "097",
      "093"
    ],
    "encounters": [
      {
        "dex": "044",
        "pct": 25,
        "lv": "9-13",
        "method": "Land"
      },
      {
        "dex": "020",
        "pct": 21,
        "lv": "9-12",
        "method": "Land"
      },
      {
        "dex": "038",
        "pct": 14,
        "lv": "10-12",
        "method": "Land"
      },
      {
        "dex": "086",
        "pct": 14,
        "lv": "10-12",
        "method": "Land"
      },
      {
        "dex": "059",
        "pct": 10,
        "lv": "10-12",
        "method": "Land"
      },
      {
        "dex": "101",
        "pct": 8,
        "lv": "11-12",
        "method": "Land"
      },
      {
        "dex": "079",
        "pct": 8,
        "lv": "11-12",
        "method": "Land"
      },
      {
        "dex": "063",
        "pct": 60,
        "lv": "9-12",
        "method": "OldRod"
      },
      {
        "dex": "097",
        "pct": 30,
        "lv": "10-12",
        "method": "OldRod"
      },
      {
        "dex": "093",
        "pct": 10,
        "lv": "12",
        "method": "OldRod"
      }
    ],
    "items": [],
    "quests": [],
    "npcs": [
      {
        "name": "Garrett",
        "role": "Farmer",
        "team": [
          {
            "dex": "086",
            "name": "Hattot",
            "lv": 15,
            "ability": "",
            "moves": [
              "Sunny Day",
              "Round",
              "Sing",
              "Ember"
            ],
            "note": ""
          },
          {
            "dex": "079",
            "name": "Bunlet",
            "lv": 16,
            "ability": "",
            "moves": [
              "Flame Charge",
              "Harden",
              "Fairy Wind",
              "Mud Sport"
            ],
            "note": ""
          },
          {
            "dex": "087",
            "name": "Flarflock",
            "lv": 15,
            "ability": "",
            "moves": [
              "Flatter",
              "Round",
              "Sing",
              "Ember"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "FARMER",
          "Garrett",
          "0"
        ]
      },
      {
        "name": "Bellavie",
        "role": "Florist",
        "team": [
          {
            "dex": "041",
            "name": "Shrubcub",
            "lv": 15,
            "ability": "",
            "moves": [
              "Mega Drain",
              "Stun Spore",
              "Fury Swipes",
              "Leer"
            ],
            "note": ""
          },
          {
            "dex": "034",
            "name": "Tartort",
            "lv": 15,
            "ability": "",
            "moves": [
              "Leaf Tornado",
              "Breaking Swipe",
              "Growth",
              "Sweet Scent"
            ],
            "note": ""
          },
          {
            "dex": "026",
            "name": "Grantula",
            "lv": 16,
            "ability": "Cute Charm",
            "moves": [
              "Draining Kiss",
              "Silk Trap",
              "Struggle Bug",
              "Cut"
            ],
            "note": "GeneSync → Swarm"
          }
        ],
        "sourceTrainer": [
          "FLORIST",
          "Bellavie",
          "0"
        ]
      },
      {
        "name": "Jayo",
        "role": "Void Grunt",
        "team": [
          {
            "dex": "044",
            "name": "Cruspud",
            "lv": 14,
            "ability": "",
            "moves": [
              "Mud Shot",
              "Infestation",
              "Growth",
              "Sand Attack"
            ],
            "note": ""
          },
          {
            "dex": "108",
            "name": "Ocubitten",
            "lv": 15,
            "ability": "",
            "moves": [
              "Air Cutter",
              "Disable",
              "Pursuit",
              "Supersonic"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "VOIDGRUNT_F",
          "Jayo",
          "0"
        ],
        "sprite": "VOIDGRUNT_F.png"
      },
      {
        "name": "Chris",
        "role": "Void Grunt",
        "team": [
          {
            "dex": "104",
            "name": "Pymood",
            "lv": 17,
            "ability": "",
            "moves": [
              "Howl",
              "Feint Attack",
              "Smog",
              "Fire Spin"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "VOIDGRUNT_M",
          "Chris",
          "0"
        ],
        "sprite": "VOIDGRUNT_M.png"
      },
      {
        "name": "Grant",
        "role": "Photographer",
        "team": [
          {
            "dex": "018",
            "name": "Concewn",
            "lv": 15,
            "ability": "",
            "moves": [
              "Screech",
              "Iron Defense",
              "Pounce",
              "Flail"
            ],
            "note": ""
          },
          {
            "dex": "100",
            "name": "Armadisco",
            "lv": 16,
            "ability": "",
            "moves": [
              "Metronome",
              "Metal Claw",
              "Rapid Spin",
              "Prism Punch"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "PHOTOGRAPHER",
          "Grant",
          "0"
        ]
      },
      {
        "name": "Landon",
        "role": "Backpacker",
        "team": [
          {
            "dex": "047",
            "name": "Pebpup",
            "lv": 16,
            "ability": "",
            "moves": [
              "Rock Polish",
              "Smack Down",
              "Defense Curl",
              "Bide"
            ],
            "note": ""
          },
          {
            "dex": "020",
            "name": "Dustalon",
            "lv": 17,
            "ability": "",
            "moves": [
              "Mud-Slap",
              "Hone Claws",
              "Gust",
              "Quick Attack"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "BACKPACKER",
          "Landon",
          "0"
        ]
      }
    ],
    "notes": [
      [
        "Jaime’s Race",
        "Take the quest from the board. Defeat two trainers, then race Jaime up the route for $500."
      ],
      [
        "Battle preparation",
        "Wild Pokémon are level 13–16. Garrett’s team is level 15–16."
      ]
    ],
    "map": "route-6.png",
    "questGuide": [
      {
        "title": "Race Against Jaime",
        "kind": "Side quest",
        "description": "Jaime says nobody on Route 6 can keep up. Beat Farmer Garrett and Florist Bellavie, then race Jaime from the desert gate to the sandy clearing past the bridge.",
        "giver": "Jaime",
        "report": "Jaime at the Route 6 desert gate",
        "reward": "$500",
        "requires": []
      }
    ],
    "related": [
      {
        "slug": "corrupted-route-6",
        "name": "Corrupted Route 6"
      }
    ],
    "pickups": [
      {
        "event": 16,
        "x": 44,
        "y": 7,
        "id": "SUPERPOTION",
        "name": "Super Potion",
        "quantity": 1,
        "hidden": false,
        "left": 68.46153846153847,
        "top": 9.375
      },
      {
        "event": 17,
        "x": 53,
        "y": 42,
        "id": "NETBALL",
        "name": "Net Ball",
        "quantity": 1,
        "hidden": false,
        "left": 82.3076923076923,
        "top": 53.125
      },
      {
        "event": 18,
        "x": 17,
        "y": 27,
        "id": "ESCAPEROPE",
        "name": "Escape Rope",
        "quantity": 1,
        "hidden": false,
        "left": 26.923076923076923,
        "top": 34.375
      },
      {
        "event": 30,
        "x": 56,
        "y": 65,
        "id": "SUPERPOTION",
        "name": "Super Potion",
        "quantity": 1,
        "hidden": false,
        "left": 86.92307692307692,
        "top": 81.875
      }
    ]
  },
  {
    "slug": "route-7",
    "name": "Route 7",
    "kind": "Route",
    "tag": "Route",
    "desc": "Explore the grass or use the Old Rod to find different wild Pokémon.",
    "exits": "",
    "encounter": "Grass · Old Rod",
    "mons": [
      "010",
      "054",
      "091",
      "023",
      "056",
      "065",
      "063",
      "097"
    ],
    "encounters": [
      {
        "dex": "010",
        "pct": 25,
        "lv": "8-11",
        "method": "Land"
      },
      {
        "dex": "054",
        "pct": 25,
        "lv": "8-11",
        "method": "Land"
      },
      {
        "dex": "091",
        "pct": 15,
        "lv": "8-11",
        "method": "Land"
      },
      {
        "dex": "023",
        "pct": 15,
        "lv": "8-11",
        "method": "Land"
      },
      {
        "dex": "056",
        "pct": 10,
        "lv": "8-11",
        "method": "Land"
      },
      {
        "dex": "065",
        "pct": 10,
        "lv": "8-11",
        "method": "Land"
      },
      {
        "dex": "063",
        "pct": 70,
        "lv": "8-11",
        "method": "OldRod"
      },
      {
        "dex": "097",
        "pct": 30,
        "lv": "8-11",
        "method": "OldRod"
      }
    ],
    "items": [],
    "quests": [],
    "npcs": [],
    "questGuide": []
  },
  {
    "slug": "route-8",
    "name": "Route 8",
    "kind": "Route",
    "tag": "Route",
    "desc": "Farmland crossed by a river, with windmills, a produce cart and a race towards the ranch.",
    "exits": "",
    "encounter": "Grass",
    "mons": [
      "018",
      "045",
      "023",
      "079",
      "041",
      "011",
      "113",
      "095"
    ],
    "encounters": [
      {
        "dex": "018",
        "pct": 20,
        "lv": "20-23",
        "method": "Land"
      },
      {
        "dex": "045",
        "pct": 15,
        "lv": "20-23",
        "method": "Land"
      },
      {
        "dex": "023",
        "pct": 15,
        "lv": "20-23",
        "method": "Land"
      },
      {
        "dex": "079",
        "pct": 15,
        "lv": "20-23",
        "method": "Land"
      },
      {
        "dex": "041",
        "pct": 10,
        "lv": "20-23",
        "method": "Land"
      },
      {
        "dex": "011",
        "pct": 10,
        "lv": "20-23",
        "method": "Land"
      },
      {
        "dex": "113",
        "pct": 10,
        "lv": "20-23",
        "method": "Land"
      },
      {
        "dex": "095",
        "pct": 5,
        "lv": "21-23",
        "method": "Land"
      }
    ],
    "items": [],
    "quests": [],
    "npcs": [
      {
        "name": "Hank",
        "role": "Farmer",
        "team": [
          {
            "dex": "084",
            "name": "Bunbris",
            "lv": 21,
            "ability": "",
            "moves": [
              "Clear Smog",
              "Double Slap",
              "Cotton Spore",
              "Mud Bomb"
            ],
            "note": ""
          },
          {
            "dex": "045",
            "name": "Rotato",
            "lv": 23,
            "ability": "",
            "moves": [
              "Infestation",
              "Mud Shot",
              "Leech Seed",
              "Frustration"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "FARMER",
          "Hank",
          "0"
        ],
        "sprite": "FARMER.png"
      },
      {
        "name": "Wade",
        "role": "HERDER",
        "team": [
          {
            "dex": "023",
            "name": "Marmie",
            "lv": 21,
            "ability": "",
            "moves": [
              "Fake Out",
              "Arm Thrust",
              "Focus Energy",
              "Comet Punch"
            ],
            "note": ""
          },
          {
            "dex": "032",
            "name": "Powse",
            "lv": 22,
            "ability": "",
            "moves": [
              "Quick Attack",
              "Focus Energy",
              "Double Hit",
              "Fire Fang"
            ],
            "note": ""
          },
          {
            "dex": "056",
            "name": "Purssume",
            "lv": 23,
            "ability": "",
            "moves": [
              "Double Team",
              "Confusion",
              "Swift",
              "Fake Out"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "HERDER",
          "Wade",
          "0"
        ],
        "sprite": "HERDER.png"
      },
      {
        "name": "Marigold",
        "role": "Florist",
        "team": [
          {
            "dex": "079",
            "name": "Bunlet",
            "lv": 21,
            "ability": "",
            "moves": [
              "Harden",
              "Flame Charge",
              "Aromatic Mist",
              "Secret Power"
            ],
            "note": ""
          },
          {
            "dex": "041",
            "name": "Shrubcub",
            "lv": 22,
            "ability": "",
            "moves": [
              "Mega Drain",
              "Sleep Powder",
              "Assurance",
              "Razor Leaf"
            ],
            "note": ""
          },
          {
            "dex": "026",
            "name": "Grantula",
            "lv": 22,
            "ability": "",
            "moves": [
              "Struggle Bug",
              "Sweet Scent",
              "Draining Kiss",
              "Spider Web"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "FLORIST",
          "Marigold",
          "0"
        ],
        "sprite": "FLORIST.png"
      },
      {
        "name": "Reggie",
        "role": "Fisherman",
        "team": [
          {
            "dex": "063",
            "name": "Rhythfin",
            "lv": 22,
            "ability": "",
            "moves": [
              "Round",
              "Bubble Beam",
              "Life Dew",
              "Screech"
            ],
            "note": ""
          },
          {
            "dex": "098",
            "name": "Brooskip",
            "lv": 23,
            "ability": "",
            "moves": [
              "Mist",
              "Rain Dance",
              "Water Pulse",
              "Whirlwind"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "FISHERMAN",
          "Reggie",
          "0"
        ],
        "sprite": "FISHERMAN.png"
      },
      {
        "name": "Toby",
        "role": "Bug Catcher",
        "team": [
          {
            "dex": "018",
            "name": "Concewn",
            "lv": 22,
            "ability": "",
            "moves": [
              "Pounce",
              "Screech",
              "Magnitude",
              "Laser Focus"
            ],
            "note": ""
          },
          {
            "dex": "011",
            "name": "Buzzant",
            "lv": 22,
            "ability": "",
            "moves": [
              "Acid",
              "Quick Attack",
              "Double Team",
              "Air Slash"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "BUGCATCHER",
          "Toby",
          "0"
        ],
        "sprite": "BUGCATCHER.png"
      },
      {
        "name": "Cleo",
        "role": "Photographer",
        "team": [
          {
            "dex": "091",
            "name": "Mangmo",
            "lv": 21,
            "ability": "",
            "moves": [
              "Twister",
              "Defog",
              "Wing Attack",
              "Focus Energy"
            ],
            "note": ""
          },
          {
            "dex": "015",
            "name": "Rasoar",
            "lv": 23,
            "ability": "",
            "moves": [
              "Snarl",
              "Charm",
              "Retaliate",
              "Quick Guard"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "PHOTOGRAPHER",
          "Cleo",
          "0"
        ]
      },
      {
        "name": "Poppy",
        "role": "HARVESTER",
        "team": [
          {
            "dex": "034",
            "name": "Tartort",
            "lv": 22,
            "ability": "",
            "moves": [
              "Growth",
              "Breaking Swipe",
              "Leaf Tornado",
              "Aromatic Mist"
            ],
            "note": ""
          },
          {
            "dex": "027",
            "name": "Pawnut",
            "lv": 22,
            "ability": "",
            "moves": [
              "Growth",
              "Protect",
              "Bullet Seed",
              "Giga Drain"
            ],
            "note": ""
          },
          {
            "dex": "045",
            "name": "Rotato",
            "lv": 23,
            "ability": "Stench",
            "moves": [
              "Infestation",
              "Mud Shot",
              "Leech Seed",
              "Frustration"
            ],
            "note": "GeneSync → Sap Sipper"
          }
        ],
        "sourceTrainer": [
          "HARVESTER",
          "Poppy",
          "0"
        ],
        "sprite": "HARVESTER.png"
      }
    ],
    "notes": [
      [
        "Along the route",
        "There are seven trainers at level 21–23 and five item pickups to search for."
      ],
      [
        "Produce cart",
        "Stock up on Fresh Water, Soda Pop, Lemonade and Moomoo Milk."
      ],
      [
        "Jaime’s Rematch",
        "Visit the quest board for a longer race against Jaime to the ranch. Win a Quick Claw and $1,500."
      ]
    ],
    "map": "route-8.png",
    "questGuide": [
      {
        "title": "Jaime's Rematch",
        "kind": "Side quest",
        "description": "Jaime has been training on Route 8 ever since you beat him on Route 6. Beat Farmer Hank and Harvester Poppy, then race him from the west end of the top path, across the bridge, to the ranch stairs.",
        "giver": "Jaime",
        "report": "Jaime on Route 8",
        "reward": "1x Quick Claw, $1500",
        "requires": []
      }
    ],
    "pickups": [
      {
        "event": 18,
        "x": 5,
        "y": 27,
        "id": "SUPERPOTION",
        "name": "Super Potion",
        "quantity": 1,
        "hidden": false,
        "left": 5.445544554455446,
        "top": 39.285714285714285
      },
      {
        "event": 19,
        "x": 60,
        "y": 61,
        "id": "MIRACLESEED",
        "name": "Miracle Seed",
        "quantity": 1,
        "hidden": false,
        "left": 59.900990099009896,
        "top": 87.85714285714286
      },
      {
        "event": 20,
        "x": 95,
        "y": 11,
        "id": "GREATBALL",
        "name": "Great Ball",
        "quantity": 1,
        "hidden": false,
        "left": 94.55445544554455,
        "top": 16.428571428571427
      },
      {
        "event": 21,
        "x": 44,
        "y": 39,
        "id": "SUPERREPEL",
        "name": "Super Repel",
        "quantity": 1,
        "hidden": false,
        "left": 44.05940594059406,
        "top": 56.42857142857143
      },
      {
        "event": 22,
        "x": 33,
        "y": 20,
        "id": "ETHER",
        "name": "Ether",
        "quantity": 1,
        "hidden": false,
        "left": 33.16831683168317,
        "top": 29.28571428571429
      }
    ]
  },
  {
    "slug": "route-9",
    "name": "Route 9",
    "kind": "Route",
    "tag": "Route",
    "desc": "A cliffside beach with a waterfall, a café and a lifeguard. Bring an Old Rod to fish along the coast.",
    "exits": "",
    "encounter": "Grass · Old Rod",
    "mons": [
      "059",
      "158",
      "020",
      "091",
      "109",
      "056",
      "093",
      "063",
      "089"
    ],
    "encounters": [
      {
        "dex": "059",
        "pct": 20,
        "lv": "22-25",
        "method": "Land"
      },
      {
        "dex": "158",
        "pct": 20,
        "lv": "22-25",
        "method": "Land"
      },
      {
        "dex": "020",
        "pct": 15,
        "lv": "22-25",
        "method": "Land"
      },
      {
        "dex": "091",
        "pct": 15,
        "lv": "22-25",
        "method": "Land"
      },
      {
        "dex": "109",
        "pct": 15,
        "lv": "22-25",
        "method": "Land"
      },
      {
        "dex": "056",
        "pct": 10,
        "lv": "22-25",
        "method": "Land"
      },
      {
        "dex": "093",
        "pct": 5,
        "lv": "23-25",
        "method": "Land"
      },
      {
        "dex": "063",
        "pct": 50,
        "lv": "22-25",
        "method": "OldRod"
      },
      {
        "dex": "089",
        "pct": 25,
        "lv": "22-25",
        "method": "OldRod"
      },
      {
        "dex": "093",
        "pct": 15,
        "lv": "23-25",
        "method": "OldRod"
      },
      {
        "dex": "059",
        "pct": 10,
        "lv": "22-25",
        "method": "OldRod"
      }
    ],
    "items": [],
    "quests": [],
    "npcs": [
      {
        "name": "Marlo",
        "role": "Fisherman",
        "team": [
          {
            "dex": "059",
            "name": "Bouyabee",
            "lv": 23,
            "ability": "",
            "moves": [
              "Aqua Jet",
              "Fake Out",
              "Stuff Cheeks",
              "Smelling Salts"
            ],
            "note": ""
          },
          {
            "dex": "093",
            "name": "Shorecite",
            "lv": 24,
            "ability": "",
            "moves": [
              "Vise Grip",
              "Protect",
              "Brine",
              "Safeguard"
            ],
            "note": ""
          },
          {
            "dex": "098",
            "name": "Brooskip",
            "lv": 25,
            "ability": "",
            "moves": [
              "Rain Dance",
              "Water Pulse",
              "Whirlwind",
              "Dive"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "FISHERMAN",
          "Marlo",
          "0"
        ],
        "sprite": "FISHERMAN.png"
      },
      {
        "name": "Coralie",
        "role": "Perfume Girl",
        "team": [
          {
            "dex": "079",
            "name": "Bunlet",
            "lv": 23,
            "ability": "",
            "moves": [
              "Secret Power",
              "Stockpile",
              "Spit Up",
              "Swallow"
            ],
            "note": ""
          },
          {
            "dex": "026",
            "name": "Grantula",
            "lv": 25,
            "ability": "",
            "moves": [
              "Sweet Scent",
              "Draining Kiss",
              "Spider Web",
              "Signal Beam"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "PERFUME_GIRL",
          "Coralie",
          "0"
        ],
        "sprite": "PERFUME_GIRL.png"
      },
      {
        "name": "Dune",
        "role": "Backpacker",
        "team": [
          {
            "dex": "018",
            "name": "Concewn",
            "lv": 24,
            "ability": "",
            "moves": [
              "Pounce",
              "Screech",
              "Magnitude",
              "Laser Focus"
            ],
            "note": ""
          },
          {
            "dex": "020",
            "name": "Dustalon",
            "lv": 24,
            "ability": "",
            "moves": [
              "Gust",
              "Hone Claws",
              "Mud-Slap",
              "Whirlwind"
            ],
            "note": ""
          },
          {
            "dex": "109",
            "name": "Ocuclaw",
            "lv": 25,
            "ability": "",
            "moves": [
              "Disable",
              "Air Cutter",
              "Ominous Wind",
              "Torment"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "BACKPACKER",
          "Dune",
          "0"
        ]
      },
      {
        "name": "Shelly",
        "role": "Lass",
        "team": [
          {
            "dex": "079",
            "name": "Bunlet",
            "lv": 24,
            "ability": "",
            "moves": [
              "Secret Power",
              "Stockpile",
              "Spit Up",
              "Swallow"
            ],
            "note": ""
          },
          {
            "dex": "030",
            "name": "Capicharga",
            "lv": 24,
            "ability": "",
            "moves": [
              "Electrify",
              "Hyper Fang",
              "Shock Wave",
              "Eerie Impulse"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "LASS",
          "Shelly",
          "0"
        ],
        "sprite": "LASS.png"
      },
      {
        "name": "Rio",
        "role": "Youngster",
        "team": [
          {
            "dex": "091",
            "name": "Mangmo",
            "lv": 23,
            "ability": "",
            "moves": [
              "Defog",
              "Wing Attack",
              "Focus Energy",
              "Vacuum Wave"
            ],
            "note": ""
          },
          {
            "dex": "016",
            "name": "Razoom",
            "lv": 25,
            "ability": "",
            "moves": [
              "Snarl",
              "Charm",
              "Retaliate",
              "Detect"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "YOUNGSTER",
          "Rio",
          "0"
        ],
        "sprite": "YOUNGSTER.png"
      },
      {
        "name": "Lani",
        "role": "Waitress",
        "team": [
          {
            "dex": "034",
            "name": "Tartort",
            "lv": 24,
            "ability": "",
            "moves": [
              "Growth",
              "Breaking Swipe",
              "Leaf Tornado",
              "Aromatic Mist"
            ],
            "note": ""
          },
          {
            "dex": "056",
            "name": "Purssume",
            "lv": 25,
            "ability": "",
            "moves": [
              "Confusion",
              "Swift",
              "Fake Out",
              "Hyper Fang"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "WAITRESS",
          "Lani",
          "0"
        ],
        "sprite": "WAITRESS.png"
      },
      {
        "name": "Pierce",
        "role": "Photographer",
        "team": [
          {
            "dex": "036",
            "name": "Scraqua",
            "lv": 24,
            "ability": "",
            "moves": [
              "Aqua Jet",
              "Odor Sleuth",
              "Snarl",
              "Screech"
            ],
            "note": ""
          },
          {
            "dex": "089",
            "name": "Garot",
            "lv": 24,
            "ability": "",
            "moves": [
              "Miracle Eye",
              "Psybeam",
              "Water Pulse",
              "Imprison"
            ],
            "note": ""
          },
          {
            "dex": "015",
            "name": "Rasoar",
            "lv": 25,
            "ability": "",
            "moves": [
              "Snarl",
              "Charm",
              "Retaliate",
              "Quick Guard"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "PHOTOGRAPHER",
          "Pierce",
          "0"
        ]
      }
    ],
    "notes": [
      [
        "Along the coast",
        "There are seven trainers at level 23–25 and four item pickups."
      ],
      [
        "Tidy Tides",
        "Accept the quest at the board and collect four pieces of litter from the beach. The rewards are a Shell Bell and $1,000."
      ]
    ],
    "map": "route-9.png",
    "questGuide": [
      {
        "title": "Tidy Tides",
        "kind": "Side quest",
        "description": "Kai keeps the Route 9 beach safe, but after a busy weekend there's litter everywhere. Wild Pokémon keep getting tangled in it. Pick up the 4 pieces of litter on the beach and report back.",
        "giver": "Lifeguard Kai",
        "report": "Kai on the Route 9 beach",
        "reward": "1x Shell Bell, $1000",
        "requires": []
      }
    ],
    "pickups": [
      {
        "event": 20,
        "x": 7,
        "y": 11,
        "id": "BIGPEARL",
        "name": "Big Pearl",
        "quantity": 1,
        "hidden": false,
        "left": 10.56338028169014,
        "top": 26.136363636363637
      },
      {
        "event": 21,
        "x": 63,
        "y": 20,
        "id": "NETBALL",
        "name": "Net Ball",
        "quantity": 1,
        "hidden": false,
        "left": 89.43661971830986,
        "top": 46.590909090909086
      },
      {
        "event": 22,
        "x": 11,
        "y": 24,
        "id": "MYSTICWATER",
        "name": "Mystic Water",
        "quantity": 1,
        "hidden": false,
        "left": 16.19718309859155,
        "top": 55.68181818181818
      },
      {
        "event": 23,
        "x": 57,
        "y": 8,
        "id": "DIVEBALL",
        "name": "Dive Ball",
        "quantity": 1,
        "hidden": false,
        "left": 80.98591549295774,
        "top": 19.318181818181817
      }
    ]
  },
  {
    "slug": "corrupted-route-6",
    "name": "Corrupted Route 6",
    "kind": "Route",
    "tag": "Route",
    "desc": "Purple fog covers this distorted version of Route 6. Its wild Pokémon are level 21–24.",
    "exits": "",
    "encounter": "Grass · Old Rod",
    "mons": [
      "044",
      "020",
      "038",
      "086",
      "059",
      "101",
      "079",
      "063",
      "097",
      "093"
    ],
    "encounters": [
      {
        "dex": "044",
        "pct": 25,
        "lv": "17-22",
        "method": "Land"
      },
      {
        "dex": "020",
        "pct": 21,
        "lv": "17-22",
        "method": "Land"
      },
      {
        "dex": "038",
        "pct": 14,
        "lv": "17-22",
        "method": "Land"
      },
      {
        "dex": "086",
        "pct": 14,
        "lv": "17-22",
        "method": "Land"
      },
      {
        "dex": "059",
        "pct": 10,
        "lv": "17-22",
        "method": "Land"
      },
      {
        "dex": "101",
        "pct": 8,
        "lv": "17-22",
        "method": "Land"
      },
      {
        "dex": "079",
        "pct": 8,
        "lv": "17-22",
        "method": "Land"
      },
      {
        "dex": "063",
        "pct": 60,
        "lv": "21-24",
        "method": "OldRod"
      },
      {
        "dex": "097",
        "pct": 30,
        "lv": "21-24",
        "method": "OldRod"
      },
      {
        "dex": "093",
        "pct": 10,
        "lv": "24",
        "method": "OldRod"
      }
    ],
    "items": [],
    "quests": [],
    "npcs": [
      {
        "name": "Viper",
        "role": "Void Grunt",
        "team": [
          {
            "dex": "045",
            "name": "Rotato",
            "lv": 20,
            "ability": "",
            "moves": [
              "Leech Seed",
              "Mud Shot",
              "Frustration",
              "Infestation"
            ],
            "note": ""
          },
          {
            "dex": "109",
            "name": "Ocuclaw",
            "lv": 22,
            "ability": "",
            "moves": [
              "Ominous Wind",
              "Air Cutter",
              "Disable",
              "Razor Wind"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "VOIDGRUNT_F",
          "Viper",
          "0"
        ],
        "sprite": "VOIDGRUNT_F.png"
      },
      {
        "name": "Vander",
        "role": "Void Grunt",
        "team": [
          {
            "dex": "045",
            "name": "Rotato",
            "lv": 20,
            "ability": "",
            "moves": [
              "Leech Seed",
              "Mud Shot",
              "Frustration",
              "Infestation"
            ],
            "note": ""
          },
          {
            "dex": "104",
            "name": "Pymood",
            "lv": 22,
            "ability": "",
            "moves": [
              "Fire Spin",
              "Roar",
              "Quash",
              "Feint Attack"
            ],
            "note": ""
          }
        ],
        "sourceTrainer": [
          "VOIDGRUNT_M",
          "Vander",
          "0"
        ],
        "sprite": "VOIDGRUNT_M.png"
      }
    ],
    "notes": [
      [
        "Connections",
        "This version of the route connects to Limerico, Consilia and Route 8."
      ],
      [
        "Taken To-Go · spoilers",
        "Follow Team Void here with Kayden, meet Danielle and face the corrupted Blightato. An optional scene near a hidden cave changes one of Kayden’s later lines."
      ]
    ],
    "map": "corrupted-route-6.png",
    "questGuide": [
      {
        "title": "Taken To-Go",
        "kind": "Story",
        "description": "Follow Team Void from Consilia and rescue Seiya with Kayden.",
        "giver": "Hickory",
        "requires": []
      }
    ],
    "pickups": [
      {
        "event": 78,
        "x": 45,
        "y": 7,
        "id": "DUSKBALL",
        "name": "Dusk Ball",
        "quantity": 1,
        "hidden": false,
        "left": 70,
        "top": 9.375
      },
      {
        "event": 79,
        "x": 18,
        "y": 28,
        "id": "REPEL",
        "name": "Repel",
        "quantity": 1,
        "hidden": false,
        "left": 28.46153846153846,
        "top": 35.625
      },
      {
        "event": 80,
        "x": 40,
        "y": 32,
        "id": "HYPERPOTION",
        "name": "Hyper Potion",
        "quantity": 1,
        "hidden": false,
        "left": 62.30769230769231,
        "top": 40.625
      }
    ]
  },
  {
    "slug": "chateau-seiya",
    "name": "Chateau Seiya",
    "kind": "Landmark",
    "tag": "Landmark",
    "desc": "Explore Chateau Seiya with the area map below.",
    "exits": "",
    "encounter": "",
    "mons": [],
    "encounters": [],
    "items": [],
    "quests": [],
    "npcs": [],
    "map": "chateau-seiya.png",
    "questGuide": [
      {
        "title": "Delivery Driver Wanted",
        "kind": "Side quest",
        "description": "Jared at Chateau Seiya is short-staffed and needs someone to run deliveries. Pick up the orders from Jared and get them to their customers while they're still warm.",
        "giver": "Jared",
        "report": "Jared at Chateau Seiya",
        "reward": "1x TM010",
        "requires": []
      }
    ],
    "pickups": []
  }
];

const TRAINERS = [
  // sample trainer
  // {
  //   name: 'Youngster Milo',
  //   loc: 'saudade-town',
  //   role: 'Youngster',
  //   type: 'GRASS',
  //   badge: '—',
  //   team: ['001'],
  //   desc: 'A cheerful new trainer waiting near the town path.'
  // },
];

  // ---- Type chart --------------------------------------------------------
  const TYPE_ORDER = ['NORMAL', 'FIRE', 'WATER', 'ELECTRIC', 'GRASS', 'ICE', 'FIGHTING', 'POISON', 'GROUND', 'FLYING', 'PSYCHIC', 'BUG', 'ROCK', 'GHOST', 'DRAGON', 'DARK', 'STEEL', 'FAIRY', 'LIGHT', 'COSMIC'];
  // per attacking type: se = 2×, nv = 0.5×, no = 0×
  const CHART = {
    NORMAL: { se: ['COSMIC'], nv: ['ROCK', 'STEEL'], no: ['GHOST'] },
    FIRE: { se: ['GRASS', 'ICE', 'BUG', 'STEEL'], nv: ['FIRE', 'WATER', 'ROCK', 'DRAGON'], no: ['COSMIC'] },
    WATER: { se: ['FIRE', 'GROUND', 'ROCK', 'LIGHT'], nv: ['WATER', 'GRASS', 'DRAGON'], no: [] },
    ELECTRIC: { se: ['WATER', 'FLYING'], nv: ['ELECTRIC', 'GRASS', 'DRAGON'], no: ['GROUND'] },
    GRASS: { se: ['WATER', 'GROUND', 'ROCK', 'LIGHT'], nv: ['FIRE', 'GRASS', 'POISON', 'FLYING', 'BUG', 'DRAGON', 'STEEL'], no: [] },
    ICE: { se: ['GRASS', 'GROUND', 'FLYING', 'DRAGON', 'LIGHT'], nv: ['FIRE', 'WATER', 'ICE', 'STEEL'], no: [] },
    FIGHTING: { se: ['NORMAL', 'ICE', 'ROCK', 'DARK', 'STEEL'], nv: ['POISON', 'FLYING', 'PSYCHIC', 'BUG', 'FAIRY', 'LIGHT'], no: ['GHOST'] },
    POISON: { se: ['GRASS', 'FAIRY', 'LIGHT'], nv: ['POISON', 'GROUND', 'ROCK', 'GHOST'], no: ['STEEL'] },
    GROUND: { se: ['FIRE', 'ELECTRIC', 'POISON', 'ROCK', 'STEEL'], nv: ['GRASS', 'BUG', 'COSMIC'], no: ['FLYING'] },
    FLYING: { se: ['GRASS', 'FIGHTING', 'BUG'], nv: ['ELECTRIC', 'ROCK', 'STEEL'], no: [] },
    PSYCHIC: { se: ['FIGHTING', 'POISON'], nv: ['PSYCHIC', 'STEEL'], no: ['DARK'] },
    BUG: { se: ['GRASS', 'PSYCHIC', 'DARK', 'COSMIC'], nv: ['FIRE', 'FIGHTING', 'POISON', 'FLYING', 'GHOST', 'STEEL', 'FAIRY'], no: [] },
    ROCK: { se: ['FIRE', 'ICE', 'FLYING', 'BUG'], nv: ['FIGHTING', 'GROUND', 'STEEL', 'COSMIC'], no: [] },
    GHOST: { se: ['PSYCHIC', 'GHOST'], nv: ['DARK', 'LIGHT'], no: ['NORMAL'] },
    DRAGON: { se: ['DRAGON'], nv: ['STEEL'], no: ['FAIRY'] },
    DARK: { se: ['PSYCHIC', 'GHOST', 'LIGHT'], nv: ['FIGHTING', 'DARK', 'FAIRY'], no: [] },
    STEEL: { se: ['ICE', 'ROCK', 'FAIRY'], nv: ['FIRE', 'WATER', 'ELECTRIC', 'STEEL'], no: [] },
    FAIRY: { se: ['FIGHTING', 'DRAGON', 'DARK'], nv: ['FIRE', 'POISON', 'STEEL', 'LIGHT', 'COSMIC'], no: [] },
    LIGHT: { se: ['FIGHTING', 'GHOST', 'DRAGON', 'DARK', 'COSMIC'], nv: ['FIRE', 'WATER', 'GRASS', 'ICE'], no: [] },
    COSMIC: { se: ['FIRE', 'FLYING', 'STEEL', 'FAIRY'], nv: ['ELECTRIC', 'BUG', 'LIGHT', 'COSMIC'], no: ['ICE'] },
  };
  const eff = (atk, def) => {
    const c = CHART[atk];
    if (!c) return 1;
    if (c.no.includes(def)) return 0;
    if (c.se.includes(def)) return 2;
    if (c.nv.includes(def)) return 0.5;
    return 1;
  };

  const _moveNorm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  let _moveIndex = null;
  const byMove = (name) => {
    const flat = MOVES.flat();
    const exact = flat.find(m => m.name === name);
    if (exact) return exact;
    if (!_moveIndex) { _moveIndex = new Map(); for (const m of flat) _moveIndex.set(_moveNorm(m.name), m); }
    return _moveIndex.get(_moveNorm(name)) || null;
  };

  const computeMatchups = (types) => {
    const weak = [], resist = [], immune = [];
    for (const atk of TYPE_ORDER) {
      const mult = types.reduce((m, def) => m * eff(atk, def), 1);
      if (mult === 0) immune.push(atk);
      else if (mult >= 2) weak.push(atk);
      else if (mult <= 0.5) resist.push(atk);
    }
    return { weak, resist, immune };
  };
  // detailed: split into exact multiplier tiers (x4, x2, x0.5, x0.25, x0)
  const computeMatchupsDetailed = (types) => {
    const x4 = [], x2 = [], half = [], quarter = [], immune = [];
    for (const atk of TYPE_ORDER) {
      const mult = types.reduce((m, def) => m * eff(atk, def), 1);
      if (mult === 0) immune.push(atk);
      else if (mult >= 4) x4.push(atk);
      else if (mult >= 2) x2.push(atk);
      else if (mult <= 0.25) quarter.push(atk);
      else if (mult <= 0.5) half.push(atk);
    }
    return { x4, x2, half, quarter, immune };
  };

  // ---- share-code compression helpers (used by Team Builder + Living Dex) ----
  // Preserve released share-code IDs; new move names are appended.
  const SHARE_MOVE_NAMES = ["Absorb","Accelerock","Acid","Acid Armor","Acid Spray","Acrobatics","Acupressure","Aerial Ace","Aeroblast","After You","Agility","Air Cutter","Air Slash","Alluring Voice","Ally Switch","Amnesia","Anchor Shot","Ancient Power","Apple Acid","Aqua Cutter","Aqua Jet","Aqua Ring","Aqua Step","Aqua Tail","Arm Thrust","Armor Cannon","Aromatherapy","Aromatic Mist","Assist","Assurance","Astonish","Astral Barrage","Astral Sign","Attack Order","Attract","Aura Sphere","Aura Wheel","Aurora Beam","Aurora Veil","Autotomize","Avalanche","Axe Kick","Baby-Doll Eyes","Baneful Bunker","Barb Barrage","Barrage","Barrier","Baton Pass","Beak Blast","Beat Up","Behemoth Bash","Behemoth Blade","Belch","Belly Drum","Bestow","Bide","Bind","Bite","Bitter Blade","Bitter Malice","Blast Burn","Blaze Kick","Blazing Torque","Bleakwind Storm","Blizzard","Block","Blood Moon","Blue Flare","Body Press","Body Slam","Bolt Beak","Bolt Strike","Bone Club","Bone Rush","Bonemerang","Boomburst","Bounce","Branch Poke","Brave Bird","Breaking Swipe","Brick Break","Brightcannon","Brine","Brutal Swing","Bubble","Bubble Beam","Bug Bite","Bug Buzz","Bulk Up","Bulldoze","Bullet Punch","Bullet Seed","Burn Up","Burning Bulwark","Burning Jealousy","Calm Mind","Camouflage","Captivate","Ceaseless Edge","Celebrate","Charge","Charge Beam","Charm","Chatter","Chi Blast","Chilling Water","Chilly Reception","Chip Away","Chloroblast","Circle Throw","Clamp","Clanging Scales","Clangorous Soul","Cleansing Flames","Cleansinglight","Clear Smog","Close Combat","Coaching","Coil","Collision Course","Combat Torque","Comet Punch","Comeuppance","Confide","Confuse Ray","Confusion","Constrict","Content Farm","Conversion","Conversion 2","Copycat","Core Enforcer","Corrosive Gas","Cosmic Power","Cotton Guard","Cotton Spore","Counter","Court Change","Covet","Crabhammer","Crafty Shield","Cross Chop","Cross Poison","Crunch","Crush Claw","Crush Grip","Crystalize","Cupidsbow","Curse","Cut","Dark Pulse","Dark Void","Darkest Lariat","Dazzling Gleam","Decorate","Defend Order","Defense Curl","Defog","Destiny Bond","Detect","Diamond Storm","Dig","Dire Claw","Disable","Disarming Voice","Discharge","Dive","Divine Gift","Divineslash","Dizzy Punch","Doodle","Doom Desire","Double Hit","Double Iron Bash","Double Kick","Double Shock","Double Slap","Double Team","Double-Edge","Draco Meteor","Dragon Ascent","Dragon Breath","Dragon Cheer","Dragon Claw","Dragon Dance","Dragon Darts","Dragon Energy","Dragon Hammer","Dragon Pulse","Dragon Rage","Dragon Rush","Dragon Tail","Drain Punch","Draining Kiss","Dream Eater","Drill Peck","Drill Run","Drum Beating","Dual Chop","Dual Wingbeat","Duality","Dynamax Cannon","Dynamic Punch","Earth Power","Earthquake","Echoed Voice","Eclipsestrike","Eerie Impulse","Eerie Spell","Egg Bomb","Electric Terrain","Electrify","Electro Ball","Electro Drift","Electro Shot","Electroweb","Embargo","Ember","Encore","Endeavor","Endure","Energy Ball","Entrainment","Eruption","Esper Wing","Eternabeam","Eternalaura","Expanding Force","Explosion","Extrasensory","Extreme Speed","Facade","Fairy Lock","Fairy Wind","Fake Out","Fake Tears","False Surrender","False Swipe","Fantasiablast","Feather Dance","Feint","Feint Attack","Fell Stinger","Fickle Beam","Fiery Dance","Fiery Wrath","Fillet Away","Final Gambit","Fire Blast","Fire Fang","Fire Lash","Fire Pledge","Fire Punch","Fire Spin","First Impression","Fishious Rend","Fissure","Flail","Flame Burst","Flame Charge","Flame Wheel","Flamethrower","Flare Blitz","Flash","Flash Cannon","Flashstep","Flatter","Fleur Cannon","Fling","Flip Turn","Floral Healing","Flower Shield","Flower Trick","Fly","Flying Press","Focus Blast","Focus Energy","Focus Punch","Follow Me","FOR YOU!!","Force Palm","Foresight","Forest's Curse","Foul Play","Freeze Shock","Freeze-Dry","Freezing Glare","Frenzy Plant","Frost Breath","Frustration","Fullmoonbind","Fury Attack","Fury Cutter","Fury Swipes","Fusion Bolt","Fusion Flare","Future Sight","Galacticnebula","Gammacharge","Gastro Acid","Gear Grind","Gear Up","Geomancy","Giga Drain","Giga Impact","Gigaton Hammer","Glacial Lance","Glaciate","Glaive Rush","Glare","Grass Knot","Grass Pledge","Grass Whistle","Grassy Glide","Grassy Terrain","Grav Apple","Gravity","Growl","Growth","Grudge","Guard Split","Guard Swap","Guillotine","Gunk Shot","Gust","Gyro Ball","Hail","Hammer Arm","Happilyeverafter","Happy Hour","Hard Press","Harden","Haze","Head Charge","Head Smash","Headbutt","Headlong Rush","Heal Bell","Heal Block","Heal Order","Heal Pulse","Healing Wish","Heart Stamp","Heart Swap","Heat Crash","Heat Wave","Heavy Slam","Helping Hand","Hex","Hidden Power","High Horsepower","High Jump Kick","Hold Back","Hold Hands","Hone Claws","Horn Attack","Horn Drill","Horn Leech","Howl","Hurricane","Hydro Cannon","Hydro Pump","Hydro Steam","Hyper Beam","Hyper Drill","Hyper Fang","Hyper Voice","Hyperspace Fury","Hyperspace Hole","Hypnosis","Ice Ball","Ice Beam","Ice Burn","Ice Fang","Ice Hammer","Ice Punch","Ice Shard","Ice Spinner","Icicle Crash","Icicle Spear","Icy Wind","Imprison","Incinerate","Infernal Parade","Inferno","Infestation","Ingrain","Instruct","Ion Deluge","Iron Defense","Iron Head","Iron Tail","Ivy Cudgel","Jaw Lock","Jet Punch","Judgment","Jump Kick","Jungle Healing","Karate Chop","Kinesis","King's Shield","Knock Off","Kowtow Cleave","Land's Wrath","Laser Focus","Lash Out","Last Resort","Last Respects","Lava Plume","Leaf Blade","Leaf Storm","Leaf Tornado","Leafage","Leech Life","Leech Seed","Leer","Lick","Life Dew","Light of Ruin","Light Screen","Light Speed Dash","Liquidation","Lock-On","Lovely Kiss","Low Kick","Low Sweep","Lucky Chant","Lumina Crash","Lunar Blessing","Lunar Dance","Lunge","Luster Purge","Mach Punch","Magic Coat","Magic Powder","Magic Room","Magical Leaf","Magical Torque","Magma Storm","Magnet Bomb","Magnet Rise","Magnetic Flux","Magnitude","Make It Rain","Malignant Chain","Mat Block","Matcha Gotcha","Me First","Mean Look","Meditate","Mega Drain","Mega Kick","Mega Punch","Megahorn","Memento","Metal Burst","Metal Claw","Metal Sound","Meteor Assault","Meteor Beam","Meteor Mash","Metronome","Mighty Cleave","Milk Drink","Mimic","Mind Blown","Mind Reader","Minimize","Miracle Eye","Mirror Coat","Mirror Move","Mirror Shot","Mist","Mist Ball","Misty Explosion","Misty Terrain","Moodswing","Moonblast","Moongeist Beam","Moonlight","Morning Sun","Mortal Spin","Mountain Gale","Mud Bomb","Mud Shot","Mud Sport","Mud-Slap","Muddy Water","Multi-Attack","Mystical Fire","Mystical Power","Nasty Plot","Natural Gift","Nature Power","Nature's Madness","Needle Arm","Night Daze","Night Shade","Night Slash","Nightmare","Nihil Light","No Retreat","Noble Roar","Noxious Torque","Nuzzle","Oblivion Wing","Obstruct","Octazooka","Octolock","Odor Sleuth","Ominous Wind","Orbital Laser","Order Up","Origin Pulse","Outrage","Overdrive","Overheat","Pain Split","Parabolic Charge","Parting Shot","Pay Day","Payback","Peck","Perish Song","Petal Blizzard","Petal Dance","Phantom Force","Phaser","Photon Geyser","Pin Missile","Plasma Fists","Play Nice","Play Rough","Pluck","Poison Fang","Poison Gas","Poison Jab","Poison Powder","Poison Sting","Poison Tail","Poizap Dart","Pollen Puff","Poltergeist","Population Bomb","Pounce","Pound","Powder","Powder Snow","Power Gem","Power Shift","Power Split","Power Swap","Power Trick","Power Trip","Power Whip","Power-Up Punch","Precipice Blades","Present","Prismatic Laser","Prismpunch","Protect","Psybeam","Psyblade","Psych Up","Psychic","Psychic Fangs","Psychic Noise","Psychic Terrain","Psycho Boost","Psycho Cut","Psycho Shift","Psyshield Bash","Psyshock","Psystrike","Psywave","Punishment","Purify","Pursuit","Pyro Ball","Quash","Quick Attack","Quick Guard","Quiver Dance","Radiantblessing","Rage","Rage Fist","Rage Powder","Raging Bull","Raging Fury","Rain Dance","Rainbowbolt","Rapid Spin","Razor Leaf","Razor Shell","Razor Wind","Recover","Recycle","Reflect","Reflect Type","Refresh","Relic Song","Rest","Retaliate","Return","Revaling Light","Revealing Light","Revelation Dance","Revenge","Reversal","Revival Blessing","Rgbeam","Rising Voltage","Roar","Roar of Time","Rock Blast","Rock Climb","Rock Polish","Rock Slide","Rock Smash","Rock Throw","Rock Tomb","Rock Wrecker","Role Play","Rolling Kick","Rollout","Roost","Rototiller","Round","Ruination","Sacred Fire","Sacred Sword","Safeguard","Salt Cure","Sand Attack","Sand Tomb","Sandsear Storm","Sandstorm","Scald","Scale Shot","Scary Face","Scorching Sands","Scratch","Screech","Searing Shot","Secret Power","Secret Sword","Seed Bomb","Seed Flare","Seismic Toss","Self-Destruct","Shadow Ball","Shadow Bone","Shadow Claw","Shadow Force","Shadow Punch","Shadow Sneak","Sharpen","Shed Tail","Sheer Cold","Shell Burst","Shell Side Arm","Shell Smash","Shell Trap","Shelter","Shift Gear","Shinefang","Shiningburst","Shock Wave","Shore Up","Signal Beam","Silk Trap","Silver Wind","Simple Beam","Sing","Sketch","Skill Swap","Skitter Smack","Skull Bash","Sky Attack","Sky Drop","Sky Uppercut","Slack Off","Slam","Slash","Sleep Powder","Sleep Talk","Sludge","Sludge Bomb","Sludge Wave","Smack Down","Smart Strike","Smelling Salts","Smog","Smokescreen","Snap Trap","Snarl","Snatch","Snipe Shot","Snore","Snowscape","Soak","Soft-Boiled","Solar Beam","Solar Blade","Sonar Ping","Sonic Boom","Space Dust","Spacial Rend","Spark","Sparkling Aria","Spectral Thief","Speed Swap","Spicy Extract","Spider Web","Spike Cannon","Spikes","Spiky Shield","Spin Out","Spirit Break","Spirit Shackle","Spit Up","Spite","Splash","Spore","Spotlight","Springtide Storm","Star Shot","Starseeker","Starstorm","Stealth Rock","Steam Eruption","Steamroller","Steel Beam","Steel Roller","Steel Wing","Sticky Web","Stockpile","Stomp","Stomping Tantrum","Stone Axe","Stone Edge","Stored Power","Storm Throw","Strange Steam","Strength","Strength Sap","String Shot","Struggle Bug","Stuff Cheeks","Stun Spore","Submission","Substitute","Sucker Punch","Sunny Day","Sunsteel Strike","Super Fang","Supercell Slam","Supernova","Superpower","Supersonic","Surf","Surging Strikes","Swagger","Swallow","Sweet Kiss","Sweet Scent","Swift","Switcheroo","Swords Dance","Synchronoise","Synthesis","Syrup Bomb","Tachyon Cutter","Tackle","Tail Glow","Tail Slap","Tail Whip","Tailwind","Take Down","Take Heart","Tar Shot","Taunt","Tearful Look","Teatime","Techno Blast","Teeter Dance","Telekinesis","Teleport","Temper Flare","Tera Starstorm","Terrain Pulse","Thief","Thousand Arrows","Thousand Waves","Thrash","Throat Chop","Thunder","Thunder Cage","Thunder Fang","Thunder Punch","Thunder Shock","Thunder Wave","Thunderbolt","Thunderclap","Thunderous Kick","Tickle","Tidy Up","Topsy-Turvy","Torch Song","Torment","Toxic","Toxic Spikes","Toxic Thread","Tractorbeam","Trailblaze","Transform","Tri Attack","Trick","Trick Room","Trick-or-Treat","Triple Arrows","Triple Axel","Triple Dive","Triple Kick","Trop Kick","Trump Card","Twilight Pulse","Twin Beam","Twineedle","Twister","U-turn","Upper Hand","Uproar","V-create","Vacuum Wave","Venom Drench","Venoshock","Victory Dance","Vine Whip","Vise Grip","Vital Throw","Volt Switch","Volt Tackle","Wake-Up Slap","Warminglight","Water Gun","Water Pledge","Water Pulse","Water Shuriken","Water Sport","Water Spout","Waterfall","Wave Crash","Weather Ball","Whirlpool","Whirlwind","Wicked Blow","Wicked Torque","Wide Guard","Wild Charge","Wildbolt Storm","Will-O-Wisp","Wing Attack","Wish","Withdraw","Wonder Room","Wood Hammer","Work Up","Worry Seed","Wrap","Wring Out","X-Scissor","Yawn","Zap Cannon","Zen Headbutt","Zerogravity","Zing Zap","Antimatter Cannon","Astro Jab","Bright Blade","EDL","Light Sphere","Smite","Sparkling Aegis","Stellar Blade"];
  let _moveIds = null, _idMoves = null;
  const _mvNorm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  function _buildMoveIds() {
    const names = [...SHARE_MOVE_NAMES, ...Array.from(new Set(MOVES.flat().map(m => m.name))).filter(n => !SHARE_MOVE_NAMES.some(old => _mvNorm(old) === _mvNorm(n))).sort((a, b) => a.localeCompare(b))];
    _moveIds = new Map(); _idMoves = new Map();
    names.forEach((n, i) => { const id = i.toString(36).padStart(2, '0'); _moveIds.set(_mvNorm(n), id); _idMoves.set(id, n); });
  }
  const moveToId = (name) => { if (!_moveIds) _buildMoveIds(); return _moveIds.get(_mvNorm(name)) || null; };
  const idToMove = (id) => { if (!_idMoves) _buildMoveIds(); return _idMoves.get(id) || null; };



  return { MOVES, ABILITIES, ITEMS, PICKUP, ROUTES, TRAINERS, CHART, eff, TYPE_ORDER, byMove, computeMatchups, computeMatchupsDetailed, moveToId, idToMove };
})();
