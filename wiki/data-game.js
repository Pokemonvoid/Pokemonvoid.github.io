/* Pokémon Void — game data: moves, abilities, items, locations, trainers, type chart.
   window.VGAME = { MOVES, ABILITIES, ITEMS, ROUTES, TRAINERS, CHART, eff, TYPE_ORDER } */
window.VGAME = (function () {
  // ---- Moves -------------------------------------------------------------
  const MOVES = [
      {
        name: "Megahorn",
        type: "BUG",
        cls: "Physical",
        pow: 120,
        acc: 85,
        pp: 10,
        desc: "Using its tough and impressive horn, the user rams into the target with no letup."
      },
      {
        name: "Attack Order",
        type: "BUG",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 15,
        desc: "The user calls out its underlings to pummel the target. Critical hits land more easily."
      },
      {
        name: "Bug Buzz",
        type: "BUG",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user vibrates its wings to generate a damaging sound wave. It may also lower the target's Sp. Def stat."
      },
      {
        name: "First Impression",
        type: "BUG",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "Although this move has great power, it only works the first turn the user is in battle."
      },
      {
        name: "Pollen Puff",
        type: "BUG",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 15,
        desc: "Fires an exploding pollen puff at enemies, or a HP-restoring one at allies."
      },
      {
        name: "Leech Life",
        type: "BUG",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user drains the target's blood. The user's HP is restored by half the damage taken by the target."
      },
      {
        name: "Lunge",
        type: "BUG",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user makes a lunge at the target, attacking with full force. This lowers the target's Attack stat."
      },
      {
        name: "X-Scissor",
        type: "BUG",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user slashes at the foe by crossing its scythes or claws as if they were a pair of scissors."
      },
      {
        name: "Signal Beam",
        type: "LIGHT",
        cls: "Special",
        pow: 75,
        acc: 100,
        pp: 15,
        desc: "The user attacks with a sinister beam of light. It may also confuse the target."
      },
      {
        name: "Skitter Smack",
        type: "BUG",
        cls: "Physical",
        pow: 70,
        acc: 90,
        pp: 10,
        desc: "The user skitters behind the target to attack. This also lowers the target's Sp. Atk stat."
      },
      {
        name: "U-turn",
        type: "BUG",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 20,
        desc: "After making its attack, the user rushes back to switch places with a party Pokémon in waiting."
      },
      {
        name: "Steamroller",
        type: "BUG",
        cls: "Physical",
        pow: 65,
        acc: 100,
        pp: 20,
        desc: "The user crushes its foes by rolling over them. This attack may make the target flinch."
      },
      {
        name: "Bug Bite",
        type: "BUG",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 20,
        desc: "The user bites the target. If the target is holding a Berry, the user eats it and gains its effect."
      },
      {
        name: "Silver Wind",
        type: "BUG",
        cls: "Special",
        pow: 60,
        acc: 100,
        pp: 5,
        desc: "The foe is attacked with powdery scales blown by wind. It may also raise all the user's stats."
      },
      {
        name: "Fell Stinger",
        type: "BUG",
        cls: "Physical",
        pow: 50,
        acc: 100,
        pp: 25,
        desc: "When the user knocks out a target with this move, the user's Attack stat rises drastically."
      },
      {
        name: "Struggle Bug",
        type: "BUG",
        cls: "Special",
        pow: 50,
        acc: 100,
        pp: 20,
        desc: "While resisting, the user attacks the opposing Pokémon. The targets' Sp. Atk stat is reduced."
      },
      {
        name: "Fury Cutter",
        type: "BUG",
        cls: "Physical",
        pow: 40,
        acc: 95,
        pp: 20,
        desc: "The target is slashed with scythes or claws. Its power increases if it hits in succession."
      },
      {
        name: "Pin Missile",
        type: "BUG",
        cls: "Physical",
        pow: 25,
        acc: 95,
        pp: 20,
        desc: "Sharp spikes are shot at the target in rapid succession. They hit two to five times in a row."
      },
      {
        name: "Twineedle",
        type: "BUG",
        cls: "Physical",
        pow: 25,
        acc: 100,
        pp: 20,
        desc: "The foe is stabbed twice by a pair of stingers. It may also poison the target."
      },
      {
        name: "Infestation",
        type: "BUG",
        cls: "Special",
        pow: 20,
        acc: 100,
        pp: 20,
        desc: "The target is infested and unable to flee for four to five turns."
      },
      {
        name: "Defend Order",
        type: "BUG",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user calls out its underlings to shield its body, raising its Defense and Sp. Def stats."
      },
      {
        name: "Heal Order",
        type: "BUG",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user calls out its underlings to heal it. The user regains up to half of its max HP."
      },
      {
        name: "Powder",
        type: "BUG",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "The target is covered in a powder that explodes and damages it if it uses a Fire-type move."
      },
      {
        name: "Quiver Dance",
        type: "BUG",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user performs a beautiful dance. It boosts the user's Sp. Atk, Sp. Def, and Speed stats."
      },
      {
        name: "Rage Powder",
        type: "BUG",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user scatters irritating powder to draw attention to itself. Opponents aim only at the user."
      },
      {
        name: "Spider Web",
        type: "BUG",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user ensnares the target with thin, gooey silk so it can't flee from battle."
      },
      {
        name: "Sticky Web",
        type: "BUG",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "Weaves a sticky net around the opposing team, which lowers their Speed stats upon switching in."
      },
      {
        name: "String Shot",
        type: "BUG",
        cls: "Status",
        pow: "—",
        acc: 95,
        pp: 40,
        desc: "The foe is bound with silk blown from the user's mouth. This silk reduces the target's Speed."
      },
      {
        name: "Tail Glow",
        type: "LIGHT",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user stares at flashing lights to focus its mind, drastically raising its Sp. Atk stat."
      },
      {
        name: "Hyperspace Fury",
        type: "COSMIC",
        cls: "Physical",
        pow: 100,
        acc: "—",
        pp: 5,
        desc: "Unleashes a barrage of multi-arm attacks, skipping protections. The user's Defense stat falls."
      },
      {
        name: "Foul Play",
        type: "DARK",
        cls: "Physical",
        pow: 95,
        acc: 100,
        pp: 15,
        desc: "The user turns the foe's power against it. It does more damage the higher the target's Attack stat."
      },
      {
        name: "Fiery Wrath",
        type: "DARK",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user transforms its wrath into a fire-like aura to attack. This may also make foes flinch."
      },
      {
        name: "Darkest Lariat",
        type: "DARK",
        cls: "Physical",
        pow: 85,
        acc: 100,
        pp: 10,
        desc: "The user swings both arms and hits the target. Ignores the target's stat changes."
      },
      {
        name: "Night Daze",
        type: "DARK",
        cls: "Special",
        pow: 85,
        acc: 95,
        pp: 10,
        desc: "The user lets loose a pitch-black shock wave at its target. It may also lower the target's accuracy."
      },
      {
        name: "Crunch",
        type: "DARK",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user crunches up the target with sharp fangs. It may also lower the target's Defense stat."
      },
      {
        name: "Dark Pulse",
        type: "DARK",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user releases a horrible aura imbued with dark thoughts. It may also make the target flinch."
      },
      {
        name: "False Surrender",
        type: "DARK",
        cls: "Physical",
        pow: 80,
        acc: "—",
        pp: 10,
        desc: "The user pretends to bow its head, but then it stabs the target with its disheveled hair. Never misses."
      },
      {
        name: "Jaw Lock",
        type: "DARK",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "This move prevents the user and the target from switching out until either of them faints."
      },
      {
        name: "Throat Chop",
        type: "DARK",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user attacks the target's throat. The target cannot use sound-based moves for two turns."
      },
      {
        name: "Wicked Blow",
        type: "DARK",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 5,
        desc: "Strikes with a fierce blow through mastery of the Dark style. Always results in a critical hit."
      },
      {
        name: "Lash Out",
        type: "DARK",
        cls: "Physical",
        pow: 75,
        acc: 100,
        pp: 5,
        desc: "The user lashes out to vent its frustration. Power is doubled if its stats dropped this turn."
      },
      {
        name: "Night Slash",
        type: "DARK",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 15,
        desc: "The user slashes the target the instant an opportunity arises. Critical hits land more easily."
      },
      {
        name: "Sucker Punch",
        type: "DARK",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 5,
        desc: "This move enables the user to attack first. It fails if the target is not readying an attack, however."
      },
      {
        name: "Knock Off",
        type: "DARK",
        cls: "Physical",
        pow: 65,
        acc: 100,
        pp: 20,
        desc: "The user slaps down the target's held item, preventing that item from being used in the battle."
      },
      {
        name: "Assurance",
        type: "DARK",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 10,
        desc: "If the target has already taken some damage in the same turn, this attack's power is doubled."
      },
      {
        name: "Bite",
        type: "DARK",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 25,
        desc: "The target is bitten with viciously sharp fangs. It may make the target flinch."
      },
      {
        name: "Brutal Swing",
        type: "DARK",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 20,
        desc: "The user swings its body around violently to inflict damage on everything in its vicinity."
      },
      {
        name: "Feint Attack",
        type: "DARK",
        cls: "Physical",
        pow: 60,
        acc: "—",
        pp: 20,
        desc: "The user draws up to the foe disarmingly, then throws a sucker punch. It hits without fail."
      },
      {
        name: "Thief",
        type: "DARK",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 25,
        desc: "The user attacks and steals the foe's held item simultaneously. It can't steal if the user holds an item."
      },
      {
        name: "Snarl",
        type: "DARK",
        cls: "Special",
        pow: 55,
        acc: 95,
        pp: 15,
        desc: "The user yells as if it is ranting about something, making the target's Sp. Atk stat decrease."
      },
      {
        name: "Payback",
        type: "DARK",
        cls: "Physical",
        pow: 50,
        acc: 100,
        pp: 10,
        desc: "If the user moves after the target, this attack's power will be doubled."
      },
      {
        name: "Pursuit",
        type: "DARK",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 20,
        desc: "An attack move that inflicts double damage if used on a target that is switching out of battle."
      },
      {
        name: "Beat Up",
        type: "DARK",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 10,
        desc: "The user gets all the party Pokémon to attack the foe. The more party Pokémon, the more damage."
      },
      {
        name: "Fling",
        type: "DARK",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 10,
        desc: "The user flings its held item at the target to attack. Its power and effects depend on the item."
      },
      {
        name: "Power Trip",
        type: "DARK",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 10,
        desc: "The user boasts of its strength. Power increases the more the user's stats are raised."
      },
      {
        name: "Punishment",
        type: "DARK",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 5,
        desc: "This attack's power increases the more the target has powered up with stat changes."
      },
      {
        name: "Dark Void",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: 50,
        pp: 10,
        desc: "Opposing Pokémon are dragged into a world of total darkness that makes them sleep."
      },
      {
        name: "Embargo",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "It prevents the target from using its held item. Its Trainer is also prevented from using items on it."
      },
      {
        name: "Fake Tears",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "The user feigns crying to fluster the target, harshly lowering its Sp. Def stat."
      },
      {
        name: "Flatter",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "Flattery is used to confuse the target. However, it also raises the target's Sp. Atk stat."
      },
      {
        name: "Hone Claws",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user sharpens its claws to boost its Attack stat and accuracy."
      },
      {
        name: "Memento",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 10,
        desc: "The user faints when using this move. In return, it harshly lowers the target's Attack and Sp. Atk."
      },
      {
        name: "Nasty Plot",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user stimulates its brain by thinking bad thoughts. It sharply raises the user's Sp. Atk."
      },
      {
        name: "Obstruct",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user protects itself from all attacks. Direct contact lowers the attacker's Defense."
      },
      {
        name: "Parting Shot",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "With a parting threat, the user lowers the target's Attack and Sp. Atk stats. Then it switches out."
      },
      {
        name: "Quash",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "The user suppresses the target and makes its move go last."
      },
      {
        name: "Snatch",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user steals the effects of any healing or stat-changing move the foe attempts to use."
      },
      {
        name: "Switcheroo",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 10,
        desc: "The user trades held items with the target faster than the eye can follow."
      },
      {
        name: "Taunt",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "The target is taunted into a rage that allows it to use only attack moves for three turns."
      },
      {
        name: "Topsy-Turvy",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "All stat changes affecting the target turn topsy-turvy and become the opposite of what they were."
      },
      {
        name: "Torment",
        type: "DARK",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "The user torments and enrages the foe, making it incapable of using the same move twice in a row."
      },
      {
        name: "Eternabeam",
        type: "DRAGON",
        cls: "Special",
        pow: 160,
        acc: 90,
        pp: 5,
        desc: "This is Eternatus's most powerful attack in its original form. The user can't move on the next turn."
      },
      {
        name: "Dragon Energy",
        type: "DRAGON",
        cls: "Special",
        pow: 150,
        acc: 100,
        pp: 5,
        desc: "Converts life-force into power to attack. The lower the user's HP, the lower the move's power."
      },
      {
        name: "Roar of Time",
        type: "DRAGON",
        cls: "Special",
        pow: 150,
        acc: 90,
        pp: 5,
        desc: "The user blasts the target with power that distorts even time. The user must rest on the next turn."
      },
      {
        name: "Draco Meteor",
        type: "DRAGON",
        cls: "Special",
        pow: 130,
        acc: 90,
        pp: 5,
        desc: "Comets are summoned down from the sky. The attack's recoil harshly reduces the user's Sp. Atk stat."
      },
      {
        name: "Outrage",
        type: "DRAGON",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 10,
        desc: "The user rampages and attacks for two to three turns. It then becomes confused, however."
      },
      {
        name: "Clanging Scales",
        type: "DRAGON",
        cls: "Special",
        pow: 110,
        acc: 100,
        pp: 5,
        desc: "The user rubs its scales and makes a huge noise. Also lowers the user's Defense stat."
      },
      {
        name: "Core Enforcer",
        type: "DRAGON",
        cls: "Special",
        pow: 100,
        acc: 100,
        pp: 10,
        desc: "If the target has already moved this turn, the effect of its Ability is negated."
      },
      {
        name: "Dragon Rush",
        type: "DRAGON",
        cls: "Physical",
        pow: 100,
        acc: 75,
        pp: 10,
        desc: "The user tackles the foe while exhibiting overwhelming menace. It may also make the target flinch."
      },
      {
        name: "Dynamax Cannon",
        type: "DRAGON",
        cls: "Special",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "The user unleashes a strong beam from its core."
      },
      {
        name: "Spacial Rend",
        type: "COSMIC",
        cls: "Special",
        pow: 100,
        acc: 95,
        pp: 5,
        desc: "The user tears the target along with the space around it. Critical hits land more easily."
      },
      {
        name: "Dragon Hammer",
        type: "DRAGON",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 15,
        desc: "The user uses its body like a hammer to attack the target and inflict damage."
      },
      {
        name: "Dragon Pulse",
        type: "DRAGON",
        cls: "Special",
        pow: 85,
        acc: 100,
        pp: 10,
        desc: "The target is attacked with a shock wave generated by the user's gaping mouth."
      },
      {
        name: "Dragon Claw",
        type: "DRAGON",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user slashes the target with huge, sharp claws."
      },
      {
        name: "Breaking Swipe",
        type: "DRAGON",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 15,
        desc: "The user swings its tough tail wildly and attacks all foes. This also lowers their Attack stats."
      },
      {
        name: "Dragon Breath",
        type: "DRAGON",
        cls: "Special",
        pow: 60,
        acc: 100,
        pp: 20,
        desc: "The user exhales a mighty gust that inflicts damage. It may also leave the target with paralysis."
      },
      {
        name: "Dragon Tail",
        type: "DRAGON",
        cls: "Physical",
        pow: 60,
        acc: 90,
        pp: 10,
        desc: "The user knocks away the target and drags out another Pokémon in its party. In the wild, the battle ends."
      },
      {
        name: "Dragon Darts",
        type: "DRAGON",
        cls: "Physical",
        pow: 50,
        acc: 100,
        pp: 10,
        desc: "The user attacks twice using Dreepy. If there are two targets, this move hits each one once."
      },
      {
        name: "Dual Chop",
        type: "DRAGON",
        cls: "Physical",
        pow: 40,
        acc: 90,
        pp: 15,
        desc: "The user attacks its target by hitting it with brutal strikes. The target is hit twice in a row."
      },
      {
        name: "Twister",
        type: "DRAGON",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 20,
        desc: "The user whips up a vicious tornado to tear at the opposing team. It may also make targets flinch."
      },
      {
        name: "Scale Shot",
        type: "DRAGON",
        cls: "Physical",
        pow: 25,
        acc: 90,
        pp: 20,
        desc: "Attacks by shooting scales two to five times in a row. Boosts the user's Speed but lowers its Defense."
      },
      {
        name: "Dragon Rage",
        type: "DRAGON",
        cls: "Special",
        pow: 1,
        acc: 100,
        pp: 10,
        desc: "This attack hits the target with a shock wave of pure rage. This attack always inflicts 40 HP damage."
      },
      {
        name: "Clangorous Soul",
        type: "DRAGON",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user raises all its stats by using some of its HP."
      },
      {
        name: "Dragon Dance",
        type: "DRAGON",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user vigorously performs a mystic, powerful dance that boosts its Attack and Speed stats."
      },
      {
        name: "Bolt Strike",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 130,
        acc: 85,
        pp: 5,
        desc: "The user charges at its foe, surrounding itself with lightning. It may also leave the target paralyzed."
      },
      {
        name: "Volt Tackle",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 15,
        desc: "The user electrifies itself, then charges at the foe. It causes considerable damage to the user as well."
      },
      {
        name: "Zap Cannon",
        type: "ELECTRIC",
        cls: "Special",
        pow: 120,
        acc: 50,
        pp: 5,
        desc: "The user fires an electric blast like a cannon to inflict damage and cause paralysis."
      },
      {
        name: "Aura Wheel",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 110,
        acc: 100,
        pp: 10,
        desc: "Morpeko attacks and raises its Speed with energy stored in its cheeks. Type changes with the user's form."
      },
      {
        name: "Thunder",
        type: "ELECTRIC",
        cls: "Special",
        pow: 110,
        acc: 70,
        pp: 10,
        desc: "A wicked thunderbolt is dropped on the foe to inflict damage. It may also leave the target paralyzed."
      },
      {
        name: "Fusion Bolt",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "The user throws down a giant thunderbolt. It does more damage if influenced by an enormous flame."
      },
      {
        name: "Plasma Fists",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 15,
        desc: "The user attacks with electrically charged fists. Normal-type moves become Electric-type."
      },
      {
        name: "Thunderbolt",
        type: "ELECTRIC",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 15,
        desc: "A strong electric blast is loosed at the target. It may also leave the target with paralysis."
      },
      {
        name: "Wild Charge",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 15,
        desc: "The user shrouds itself in electricity and smashes into its foe. It also damages the user a little."
      },
      {
        name: "Bolt Beak",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 85,
        acc: 100,
        pp: 10,
        desc: "Stabs the target with an electrified beak. Power is doubled if the user attacks first."
      },
      {
        name: "Discharge",
        type: "ELECTRIC",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "A flare of electricity is loosed to strike the area around the user. It may also cause paralysis."
      },
      {
        name: "Overdrive",
        type: "ELECTRIC",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user attacks all foes by twanging a guitar or bass guitar, causing a huge echo and strong vibration."
      },
      {
        name: "Thunder Cage",
        type: "ELECTRIC",
        cls: "Special",
        pow: 80,
        acc: 90,
        pp: 15,
        desc: "The user traps the target in a cage of sparking electricity for four to five turns."
      },
      {
        name: "Zing Zap",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "A strong electric blast crashes down on the target. This may also make the target flinch."
      },
      {
        name: "Thunder Punch",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 75,
        acc: 100,
        pp: 15,
        desc: "The target is punched with an electrified fist. It may also leave the target with paralysis."
      },
      {
        name: "Rising Voltage",
        type: "ELECTRIC",
        cls: "Special",
        pow: 70,
        acc: 100,
        pp: 20,
        desc: "The user attacks with electric voltage rising from the ground. Power is doubled on Electric Terrain."
      },
      {
        name: "Volt Switch",
        type: "ELECTRIC",
        cls: "Special",
        pow: 70,
        acc: 100,
        pp: 20,
        desc: "After making its attack, the user rushes back to switch places with a party Pokémon in waiting."
      },
      {
        name: "Parabolic Charge",
        type: "ELECTRIC",
        cls: "Special",
        pow: 65,
        acc: 100,
        pp: 20,
        desc: "The user attacks everything around it. The user's HP is restored by half the damage dealt."
      },
      {
        name: "Spark",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 65,
        acc: 100,
        pp: 20,
        desc: "The user throws an electrically charged tackle at the target. It may also leave the target with paralysis."
      },
      {
        name: "Thunder Fang",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 65,
        acc: 95,
        pp: 15,
        desc: "The user bites with electrified fangs. It may also make the target flinch or leave it with paralysis."
      },
      {
        name: "Shock Wave",
        type: "ELECTRIC",
        cls: "Special",
        pow: 60,
        acc: "—",
        pp: 20,
        desc: "The user strikes the target with a quick jolt of electricity. This attack cannot be evaded."
      },
      {
        name: "Electroweb",
        type: "ELECTRIC",
        cls: "Special",
        pow: 55,
        acc: 95,
        pp: 15,
        desc: "The user captures and attacks foes by using an electric net, which lowers their Speed stat."
      },
      {
        name: "Charge Beam",
        type: "ELECTRIC",
        cls: "Special",
        pow: 50,
        acc: 90,
        pp: 10,
        desc: "The user fires a concentrated bundle of electricity. It may also raise the user's Sp. Atk stat."
      },
      {
        name: "Thunder Shock",
        type: "ELECTRIC",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 30,
        desc: "A jolt of electricity is hurled at the foe to inflict damage. It may also leave the target with paralysis."
      },
      {
        name: "Nuzzle",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 20,
        acc: 100,
        pp: 20,
        desc: "The user nuzzles its electrified cheeks against the target. This also leaves the target with paralysis."
      },
      {
        name: "Electro Ball",
        type: "ELECTRIC",
        cls: "Special",
        pow: 1,
        acc: 100,
        pp: 10,
        desc: "The user hurls an electric orb at the foe. It does more damage the faster the user is."
      },
      {
        name: "Charge",
        type: "ELECTRIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user boosts the power of the Electric move it uses next. It also raises the user's Sp. Def stat."
      },
      {
        name: "Eerie Impulse",
        type: "ELECTRIC",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "The user's body generates an eerie impulse. Harshly lowers the target's Sp. Atk stat."
      },
      {
        name: "Electric Terrain",
        type: "ELECTRIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user electrifies the ground for five turns. Pokémon on the ground no longer fall asleep."
      },
      {
        name: "Electrify",
        type: "ELECTRIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "If the target uses a move after being electrified, that move becomes Electric-type."
      },
      {
        name: "Ion Deluge",
        type: "ELECTRIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 25,
        desc: "The user disperses electrically charged particles. Normal-type moves become Electric-type."
      },
      {
        name: "Magnet Rise",
        type: "ELECTRIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user levitates using electrically generated magnetism for five turns."
      },
      {
        name: "Magnetic Flux",
        type: "ELECTRIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "Manipulates magnetic fields to raise the Defense and Sp. Def stats of allies with Plus or Minus Abilities."
      },
      {
        name: "Thunder Wave",
        type: "ELECTRIC",
        cls: "Status",
        pow: "—",
        acc: 90,
        pp: 20,
        desc: "A weak electric charge is launched at the target. It causes paralysis if it hits."
      },
      {
        name: "Light of Ruin",
        type: "FAIRY",
        cls: "Special",
        pow: 140,
        acc: 90,
        pp: 5,
        desc: "Fires a powerful beam of light drawn from the Eternal Flower. It also damages the user a lot."
      },
      {
        name: "Fleur Cannon",
        type: "FAIRY",
        cls: "Special",
        pow: 130,
        acc: 90,
        pp: 5,
        desc: "The user unleashes a strong beam. The attack's recoil harshly lowers the user's Sp. Atk stat."
      },
      {
        name: "Misty Explosion",
        type: "FAIRY",
        cls: "Special",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "The user attacks everything around and faints upon using this move. Power increases on Misty Terrain."
      },
      {
        name: "Moonblast",
        type: "COSMIC",
        cls: "Special",
        pow: 95,
        acc: 100,
        pp: 15,
        desc: "The user attacks by borrowing the power of the moon. This may also lower the target's Sp. Atk stat."
      },
      {
        name: "Play Rough",
        type: "FAIRY",
        cls: "Physical",
        pow: 90,
        acc: 90,
        pp: 10,
        desc: "The user plays rough with the target and attacks it. This may also lower the target's Attack stat."
      },
      {
        name: "Strange Steam",
        type: "FAIRY",
        cls: "Special",
        pow: 90,
        acc: 95,
        pp: 10,
        desc: "The user attacks the target by emitting steam. This may also confuse the target."
      },
      {
        name: "Dazzling Gleam",
        type: "LIGHT",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user damages opposing Pokémon by emitting a powerful flash."
      },
      {
        name: "Spirit Break",
        type: "FAIRY",
        cls: "Physical",
        pow: 75,
        acc: 100,
        pp: 15,
        desc: "The user attacks the target with immense force. This also lowers the target's Sp. Atk stat."
      },
      {
        name: "Draining Kiss",
        type: "FAIRY",
        cls: "Special",
        pow: 50,
        acc: 100,
        pp: 10,
        desc: "The user steals the target's HP with a kiss. The user's HP is restored by over half of the damage dealt."
      },
      {
        name: "Disarming Voice",
        type: "FAIRY",
        cls: "Special",
        pow: 40,
        acc: "—",
        pp: 15,
        desc: "Letting out a charming cry, the user does emotional damage to foes. This attack never misses."
      },
      {
        name: "Fairy Wind",
        type: "FAIRY",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 30,
        desc: "The user stirs up a fairy wind and strikes the target with it."
      },
      {
        name: "Nature's Madness",
        type: "FAIRY",
        cls: "Special",
        pow: 1,
        acc: 90,
        pp: 10,
        desc: "The user hits the target with the force of nature. It halves the target's HP."
      },
      {
        name: "Aromatic Mist",
        type: "FAIRY",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user raises the Sp. Def stat of an ally Pokémon by using a mysterious aroma."
      },
      {
        name: "Baby-Doll Eyes",
        type: "FAIRY",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 30,
        desc: "The user stares with its baby-doll eyes, which lowers the target's Attack stat. Always goes first."
      },
      {
        name: "Charm",
        type: "FAIRY",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "The user charmingly gazes at the foe, making it less wary. The target's Attack is harshly lowered."
      },
      {
        name: "Crafty Shield",
        type: "FAIRY",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user protects itself and its allies from status moves with a mysterious power."
      },
      {
        name: "Decorate",
        type: "FAIRY",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user sharply raises the target's Attack and Sp. Atk stats by decorating the target."
      },
      {
        name: "Fairy Lock",
        type: "FAIRY",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "By locking down the battlefield, the user keeps all Pokémon from fleeing during the next turn."
      },
      {
        name: "Floral Healing",
        type: "FAIRY",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user restores the target's HP by up to half of its max HP. It restores more HP when the terrain is grass."
      },
      {
        name: "Flower Shield",
        type: "FAIRY",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user raises the Defense stats of all Grass-type Pokémon in battle with a mysterious power."
      },
      {
        name: "Geomancy",
        type: "COSMIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user absorbs energy and sharply raises its Sp. Atk, Sp. Def, and Speed stats on the next turn."
      },
      {
        name: "Misty Terrain",
        type: "FAIRY",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user covers the ground with mist for five turns. Grounded Pokémon can't gain status conditions."
      },
      {
        name: "Moonlight",
        type: "COSMIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user restores its own HP. The amount of HP regained varies with the weather."
      },
      {
        name: "Sweet Kiss",
        type: "FAIRY",
        cls: "Status",
        pow: "—",
        acc: 75,
        pp: 10,
        desc: "The user kisses the target with a sweet, angelic cuteness that causes confusion."
      },
      {
        name: "Focus Punch",
        type: "FIGHTING",
        cls: "Physical",
        pow: 150,
        acc: 100,
        pp: 20,
        desc: "The user focuses its mind before launching a punch. It will fail if the user is hit before it is used."
      },
      {
        name: "Meteor Assault",
        type: "FIGHTING",
        cls: "Physical",
        pow: 150,
        acc: 100,
        pp: 5,
        desc: "The user attacks wildly with its thick leek. The user can't move on the next turn."
      },
      {
        name: "High Jump Kick",
        type: "FIGHTING",
        cls: "Physical",
        pow: 130,
        acc: 90,
        pp: 10,
        desc: "The target is attacked with a knee kick from a jump. If it misses, the user is hurt instead."
      },
      {
        name: "Close Combat",
        type: "FIGHTING",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 5,
        desc: "The user fights the foe up close without guarding itself. It also cuts the user's Defense and Sp. Def."
      },
      {
        name: "Focus Blast",
        type: "FIGHTING",
        cls: "Special",
        pow: 120,
        acc: 70,
        pp: 5,
        desc: "The user heightens its mental focus and unleashes its power. It may also lower the target's Sp. Def."
      },
      {
        name: "Superpower",
        type: "FIGHTING",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 5,
        desc: "The user attacks the target with great power. However, it also lowers the user's Attack and Defense."
      },
      {
        name: "Cross Chop",
        type: "FIGHTING",
        cls: "Physical",
        pow: 100,
        acc: 80,
        pp: 5,
        desc: "The user delivers a double chop with its forearms crossed. Critical hits land more easily."
      },
      {
        name: "Dynamic Punch",
        type: "FIGHTING",
        cls: "Physical",
        pow: 100,
        acc: 50,
        pp: 5,
        desc: "The user punches the target with full, concentrated power. It confuses the target if it hits."
      },
      {
        name: "Flying Press",
        type: "FIGHTING",
        cls: "Physical",
        pow: 100,
        acc: 95,
        pp: 10,
        desc: "The user dives down onto the target from the sky. This move is Fighting and Flying type simultaneously."
      },
      {
        name: "Hammer Arm",
        type: "FIGHTING",
        cls: "Physical",
        pow: 100,
        acc: 90,
        pp: 10,
        desc: "The user swings and hits with its strong and heavy fist. It lowers the user's Speed, however."
      },
      {
        name: "Jump Kick",
        type: "FIGHTING",
        cls: "Physical",
        pow: 100,
        acc: 95,
        pp: 10,
        desc: "The user jumps up high, then strikes with a kick. If the kick misses, the user hurts itself."
      },
      {
        name: "Sacred Sword",
        type: "FIGHTING",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 15,
        desc: "The user attacks by slicing with its long horns. The target's stat changes don't affect the damage."
      },
      {
        name: "Thunderous Kick",
        type: "FIGHTING",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "Overwhelms the target with lightning-like movement, then kicks. Lowers the target's Defense stat."
      },
      {
        name: "Secret Sword",
        type: "FIGHTING",
        cls: "Special",
        pow: 85,
        acc: 100,
        pp: 10,
        desc: "The user cuts with its long horn. The odd power contained in it does physical damage to the foe."
      },
      {
        name: "Sky Uppercut",
        type: "FIGHTING",
        cls: "Physical",
        pow: 85,
        acc: 90,
        pp: 15,
        desc: "The user attacks the target with an uppercut thrown skyward with force."
      },
      {
        name: "Aura Sphere",
        type: "FIGHTING",
        cls: "Special",
        pow: 80,
        acc: "—",
        pp: 20,
        desc: "The user looses a blast of aura power from deep within its body. This move is certain to hit."
      },
      {
        name: "Body Press",
        type: "FIGHTING",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user attacks by slamming its body into the target. Power increases the higher the user's Defense is."
      },
      {
        name: "Submission",
        type: "FIGHTING",
        cls: "Physical",
        pow: 80,
        acc: 80,
        pp: 20,
        desc: "The user grabs the target and recklessly dives for the ground. It also hurts the user slightly."
      },
      {
        name: "Brick Break",
        type: "FIGHTING",
        cls: "Physical",
        pow: 75,
        acc: 100,
        pp: 15,
        desc: "The user attacks with a swift chop. It can also break any barrier such as Light Screen and Reflect."
      },
      {
        name: "Drain Punch",
        type: "FIGHTING",
        cls: "Physical",
        pow: 75,
        acc: 100,
        pp: 10,
        desc: "An energy-draining punch. The user's HP is restored by half the damage taken by the target."
      },
      {
        name: "Vital Throw",
        type: "FIGHTING",
        cls: "Physical",
        pow: 70,
        acc: "—",
        pp: 10,
        desc: "The user attacks last. In return, this throw move is guaranteed not to miss."
      },
      {
        name: "Wake-Up Slap",
        type: "FIGHTING",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 10,
        desc: "This attack inflicts big damage on a sleeping target. It also wakes the target up, however."
      },
      {
        name: "Low Sweep",
        type: "FIGHTING",
        cls: "Physical",
        pow: 65,
        acc: 100,
        pp: 20,
        desc: "The user attacks the target's legs swiftly, reducing the target's Speed stat."
      },
      {
        name: "Circle Throw",
        type: "FIGHTING",
        cls: "Physical",
        pow: 60,
        acc: 90,
        pp: 10,
        desc: "The user throws the target and drags out another Pokémon in its party. In the wild, the battle ends."
      },
      {
        name: "Force Palm",
        type: "FIGHTING",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 10,
        desc: "The target is attacked with a shock wave. It may also leave the target with paralysis."
      },
      {
        name: "Revenge",
        type: "FIGHTING",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 10,
        desc: "An attack move that inflicts double the damage if the user has been hurt by the foe in the same turn."
      },
      {
        name: "Rolling Kick",
        type: "FIGHTING",
        cls: "Physical",
        pow: 60,
        acc: 85,
        pp: 15,
        desc: "The user lashes out with a quick, spinning kick. It may also make the target flinch."
      },
      {
        name: "Storm Throw",
        type: "FIGHTING",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 10,
        desc: "The user strikes the target with a fierce blow. This attack always results in a critical hit."
      },
      {
        name: "Karate Chop",
        type: "FIGHTING",
        cls: "Physical",
        pow: 50,
        acc: 100,
        pp: 25,
        desc: "The target is attacked with a sharp chop. Critical hits land more easily."
      },
      {
        name: "Mach Punch",
        type: "FIGHTING",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 30,
        desc: "The user throws a punch at blinding speed. It is certain to strike first."
      },
      {
        name: "Power-Up Punch",
        type: "FIGHTING",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 20,
        desc: "Striking opponents repeatedly makes the user's fists harder, raising the user's Attack stat."
      },
      {
        name: "Rock Smash",
        type: "FIGHTING",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 15,
        desc: "The user attacks with a punch that can shatter a rock. It may also lower the foe's Defense stat."
      },
      {
        name: "Vacuum Wave",
        type: "FIGHTING",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 30,
        desc: "The user whirls its fists to send a wave of pure vacuum at the target. This move always goes first."
      },
      {
        name: "Double Kick",
        type: "FIGHTING",
        cls: "Physical",
        pow: 30,
        acc: 100,
        pp: 30,
        desc: "The target is quickly kicked twice in succession using both feet."
      },
      {
        name: "Arm Thrust",
        type: "FIGHTING",
        cls: "Physical",
        pow: 15,
        acc: 100,
        pp: 20,
        desc: "The user looses a flurry of open-palmed arm thrusts that hit two to five times in a row."
      },
      {
        name: "Triple Kick",
        type: "FIGHTING",
        cls: "Physical",
        pow: 10,
        acc: 90,
        pp: 10,
        desc: "A consecutive three-kick attack that becomes more powerful with each successive hit."
      },
      {
        name: "Counter",
        type: "FIGHTING",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 20,
        desc: "A retaliation move that counters any physical attack, inflicting double the damage taken."
      },
      {
        name: "Final Gambit",
        type: "FIGHTING",
        cls: "Special",
        pow: 1,
        acc: 100,
        pp: 5,
        desc: "The user risks all to attack the foe. The user faints but does damage equal to its HP."
      },
      {
        name: "Low Kick",
        type: "FIGHTING",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 20,
        desc: "A powerful low kick that makes the foe fall over. It inflicts greater damage on heavier foes."
      },
      {
        name: "Reversal",
        type: "FIGHTING",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 15,
        desc: "An all-out attack that becomes more powerful the less HP the user has."
      },
      {
        name: "Seismic Toss",
        type: "FIGHTING",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 20,
        desc: "The target is thrown using the power of gravity. It inflicts damage equal to the user's level."
      },
      {
        name: "Bulk Up",
        type: "FIGHTING",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user tenses its muscles to bulk up its body, boosting both its Attack and Defense stats."
      },
      {
        name: "Coaching",
        type: "FIGHTING",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user properly coaches its ally Pokémon, boosting their Attack and Defense stats."
      },
      {
        name: "Detect",
        type: "FIGHTING",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "It enables the user to evade all attacks. Its chance of failing rises if it is used in succession."
      },
      {
        name: "Mat Block",
        type: "FIGHTING",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "Using a pulled-up mat as a shield, the user protects itself and its allies from damaging moves."
      },
      {
        name: "No Retreat",
        type: "FIGHTING",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "This move raises all the user's stats but prevents the user from switching out or fleeing."
      },
      {
        name: "Octolock",
        type: "FIGHTING",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "Locks the target in and prevents it from fleeing. Also lowers the target's Defense and Sp. Def each turn."
      },
      {
        name: "Quick Guard",
        type: "FIGHTING",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user protects itself and its allies from priority moves. If may fail if used in succession."
      },
      {
        name: "V-create",
        type: "FIRE",
        cls: "Physical",
        pow: 180,
        acc: 95,
        pp: 5,
        desc: "With a fiery forehead, the user hurls itself at the foe. It lowers the user's Defense, Sp. Def, and Speed."
      },
      {
        name: "Blast Burn",
        type: "FIRE",
        cls: "Special",
        pow: 150,
        acc: 90,
        pp: 5,
        desc: "The target is razed by a fiery explosion. The user must rest on the next turn, however."
      },
      {
        name: "Eruption",
        type: "FIRE",
        cls: "Special",
        pow: 150,
        acc: 100,
        pp: 5,
        desc: "The user attacks in an explosive fury. The lower the user's HP, the less powerful this attack becomes."
      },
      {
        name: "Mind Blown",
        type: "FIRE",
        cls: "Special",
        pow: 150,
        acc: 100,
        pp: 5,
        desc: "The user attacks everything by causing its own head to explode. This also damages the user."
      },
      {
        name: "Shell Trap",
        type: "FIRE",
        cls: "Special",
        pow: 150,
        acc: 100,
        pp: 5,
        desc: "The user sets a shell trap. If it is hit by a physical move, the trap explodes and hurt the attacker."
      },
      {
        name: "Blue Flare",
        type: "FIRE",
        cls: "Special",
        pow: 130,
        acc: 85,
        pp: 5,
        desc: "The user attacks by engulfing the foe in a beautiful, yet intense, blue flame. It may also burn the foe."
      },
      {
        name: "Burn Up",
        type: "FIRE",
        cls: "Special",
        pow: 130,
        acc: 100,
        pp: 5,
        desc: "To inflict massive damage, the user burns itself out. The user will no longer be Fire type."
      },
      {
        name: "Overheat",
        type: "FIRE",
        cls: "Special",
        pow: 130,
        acc: 90,
        pp: 5,
        desc: "The user attacks the target at full power. The attack's recoil sharply reduces the user's Sp. Atk stat."
      },
      {
        name: "Flare Blitz",
        type: "FIRE",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 15,
        desc: "The user cloaks itself in fire and charges at the foe. The user also takes damage and may burn the target."
      },
      {
        name: "Pyro Ball",
        type: "FIRE",
        cls: "Physical",
        pow: 120,
        acc: 90,
        pp: 5,
        desc: "Attacks by igniting a small stone and launching it as a fiery ball. May also burn the target."
      },
      {
        name: "Fire Blast",
        type: "FIRE",
        cls: "Special",
        pow: 110,
        acc: 85,
        pp: 5,
        desc: "The foe is attacked with an intense blast of all-consuming fire. It may also leave the target with a burn."
      },
      {
        name: "Fusion Flare",
        type: "FIRE",
        cls: "Special",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "The user brings down a giant flame. It does more damage if influenced by an enormous thunderbolt."
      },
      {
        name: "Inferno",
        type: "FIRE",
        cls: "Special",
        pow: 100,
        acc: 50,
        pp: 5,
        desc: "The user attacks by engulfing the target in an intense fire. It leaves the target with a burn."
      },
      {
        name: "Magma Storm",
        type: "FIRE",
        cls: "Special",
        pow: 100,
        acc: 75,
        pp: 5,
        desc: "The target becomes trapped within a maelstrom of fire that rages for four to five turns."
      },
      {
        name: "Sacred Fire",
        type: "FIRE",
        cls: "Physical",
        pow: 100,
        acc: 95,
        pp: 5,
        desc: "The target is razed with a mystical fire of great intensity. It may also leave the target with a burn."
      },
      {
        name: "Searing Shot",
        type: "FIRE",
        cls: "Special",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "An inferno of scarlet flames torches everything around the user. It may leave the foe with a burn."
      },
      {
        name: "Heat Wave",
        type: "FIRE",
        cls: "Special",
        pow: 95,
        acc: 90,
        pp: 10,
        desc: "The user attacks by exhaling hot breath on the opposing team. It may also leave targets with a burn."
      },
      {
        name: "Flamethrower",
        type: "FIRE",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 15,
        desc: "The target is scorched with an intense blast of fire. It may also leave the target with a burn."
      },
      {
        name: "Blaze Kick",
        type: "FIRE",
        cls: "Physical",
        pow: 85,
        acc: 90,
        pp: 10,
        desc: "The user launches a kick with a high critical-hit ratio. It may also leave the target with a burn."
      },
      {
        name: "Fiery Dance",
        type: "FIRE",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "Cloaked in flames, the user dances and flaps its wings. It may also raise the user's Sp. Atk stat."
      },
      {
        name: "Fire Lash",
        type: "FIRE",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user strikes the target with a burning lash. This also lowers the target's Defense stat."
      },
      {
        name: "Fire Pledge",
        type: "FIRE",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "A column of fire hits opposing Pokémon. When used with its Grass equivalent, it makes a sea of fire."
      },
      {
        name: "Lava Plume",
        type: "FIRE",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "An inferno of scarlet flames torches everything around the user. It may leave targets with a burn."
      },
      {
        name: "Fire Punch",
        type: "FIRE",
        cls: "Physical",
        pow: 75,
        acc: 100,
        pp: 15,
        desc: "The target is punched with a fiery fist. It may leave the target with a burn."
      },
      {
        name: "Mystical Fire",
        type: "FIRE",
        cls: "Special",
        pow: 75,
        acc: 100,
        pp: 10,
        desc: "The user attacks by breathing a special, hot fire. This also lowers the target's Sp. Atk stat."
      },
      {
        name: "Burning Jealousy",
        type: "FIRE",
        cls: "Special",
        pow: 70,
        acc: 100,
        pp: 5,
        desc: "The user attacks with energy from jealousy. This burns all foes that had their stats boosted this turn."
      },
      {
        name: "Flame Burst",
        type: "FIRE",
        cls: "Special",
        pow: 70,
        acc: 100,
        pp: 15,
        desc: "The user attacks the foe with a bursting flame. It also damages Pokémon next to the target."
      },
      {
        name: "Fire Fang",
        type: "FIRE",
        cls: "Physical",
        pow: 65,
        acc: 95,
        pp: 15,
        desc: "The user bites with flame-cloaked fangs. It may also make the target flinch or leave it burned."
      },
      {
        name: "Flame Wheel",
        type: "FIRE",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 25,
        desc: "The user cloaks itself in fire and charges at the target. It may also leave the target with a burn."
      },
      {
        name: "Incinerate",
        type: "FIRE",
        cls: "Special",
        pow: 60,
        acc: 100,
        pp: 15,
        desc: "The user attacks the foe with fire. The target's held Berry becomes burnt up and unusable."
      },
      {
        name: "Flame Charge",
        type: "FIRE",
        cls: "Physical",
        pow: 50,
        acc: 100,
        pp: 20,
        desc: "The user cloaks itself in flame and attacks. Building up more power, it raises the user's Speed stat."
      },
      {
        name: "Ember",
        type: "FIRE",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 25,
        desc: "The target is attacked with small flames. It may also leave the target with a burn."
      },
      {
        name: "Fire Spin",
        type: "FIRE",
        cls: "Special",
        pow: 35,
        acc: 85,
        pp: 15,
        desc: "The target becomes trapped within a fierce vortex of fire that rages for four to five turns."
      },
      {
        name: "Heat Crash",
        type: "FIRE",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 10,
        desc: "The user slams the foe with its flaming body. The heavier the user is, the greater the damage."
      },
      {
        name: "Sunny Day",
        type: "FIRE",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user intensifies the sun for five turns, powering up Fire-type moves."
      },
      {
        name: "Will-O-Wisp",
        type: "FIRE",
        cls: "Status",
        pow: "—",
        acc: 85,
        pp: 15,
        desc: "The user shoots a sinister, bluish-white flame at the target to inflict a burn."
      },
      {
        name: "Sky Attack",
        type: "FLYING",
        cls: "Physical",
        pow: 140,
        acc: 90,
        pp: 5,
        desc: "A second-turn attack move where critical hits land more easily. It may also make the target flinch."
      },
      {
        name: "Brave Bird",
        type: "FLYING",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 15,
        desc: "The user tucks in its wings and charges from a low altitude. The user also takes serious damage."
      },
      {
        name: "Dragon Ascent",
        type: "FLYING",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 5,
        desc: "The user soars upward and drops at high speeds. Its Defense and Sp. Def stats are lowered."
      },
      {
        name: "Hurricane",
        type: "FLYING",
        cls: "Special",
        pow: 110,
        acc: 70,
        pp: 10,
        desc: "The user wraps its foe in a fierce wind that flies up into the sky. It may also confuse the foe."
      },
      {
        name: "Aeroblast",
        type: "FLYING",
        cls: "Special",
        pow: 100,
        acc: 95,
        pp: 5,
        desc: "A vortex of air is shot at the target to inflict damage. Critical hits land more easily."
      },
      {
        name: "Beak Blast",
        type: "FLYING",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 15,
        desc: "The user heats up its beak before attacking. Making contact in this time results in a burn."
      },
      {
        name: "Fly",
        type: "FLYING",
        cls: "Physical",
        pow: 90,
        acc: 95,
        pp: 15,
        desc: "The user soars, then strikes on the second turn. It can also be used for flying to any familiar town."
      },
      {
        name: "Bounce",
        type: "FLYING",
        cls: "Physical",
        pow: 85,
        acc: 85,
        pp: 5,
        desc: "The user bounces up high, then drops on the foe on the second turn. It may also paralyze the foe."
      },
      {
        name: "Drill Peck",
        type: "FLYING",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 20,
        desc: "A corkscrewing attack with the sharp beak acting as a drill."
      },
      {
        name: "Oblivion Wing",
        type: "FLYING",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user absorbs its target's HP. The user's HP is restored by over half of the damage dealt."
      },
      {
        name: "Air Slash",
        type: "FLYING",
        cls: "Special",
        pow: 75,
        acc: 95,
        pp: 15,
        desc: "The user attacks with a blade of air that slices even the sky. It may also make the target flinch."
      },
      {
        name: "Chatter",
        type: "FLYING",
        cls: "Special",
        pow: 65,
        acc: 100,
        pp: 20,
        desc: "The user attacks using a sound wave based on words it has learned. It may also confuse the target."
      },
      {
        name: "Aerial Ace",
        type: "FLYING",
        cls: "Physical",
        pow: 60,
        acc: "—",
        pp: 20,
        desc: "The user confounds the foe with speed, then slashes. The attack lands without fail."
      },
      {
        name: "Air Cutter",
        type: "FLYING",
        cls: "Special",
        pow: 60,
        acc: 95,
        pp: 25,
        desc: "The user launches razor-like wind to slash the opposing team. Critical hits land more easily."
      },
      {
        name: "Pluck",
        type: "FLYING",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 20,
        desc: "The user pecks the target. If the target is holding a Berry, the user eats it and gains its effect."
      },
      {
        name: "Sky Drop",
        type: "FLYING",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 10,
        desc: "The user takes the foe into the sky, then drops it on the next turn. The foe cannot attack while airborne."
      },
      {
        name: "Wing Attack",
        type: "FLYING",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 35,
        desc: "The target is struck with large, imposing wings spread wide to inflict damage."
      },
      {
        name: "Acrobatics",
        type: "FLYING",
        cls: "Physical",
        pow: 55,
        acc: 100,
        pp: 15,
        desc: "The user nimbly strikes the foe. This attack does more damage if the user is not holding an item."
      },
      {
        name: "Dual Wingbeat",
        type: "FLYING",
        cls: "Physical",
        pow: 40,
        acc: 90,
        pp: 10,
        desc: "The user slams the target with its wings. The target is hit twice in a row."
      },
      {
        name: "Gust",
        type: "FLYING",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 35,
        desc: "A gust of wind is whipped up by wings and launched at the target to inflict damage."
      },
      {
        name: "Peck",
        type: "FLYING",
        cls: "Physical",
        pow: 35,
        acc: 100,
        pp: 35,
        desc: "The target is jabbed with a sharply pointed beak or horn."
      },
      {
        name: "Defog",
        type: "FLYING",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "A strong wind blows away the foe's obstacles such as Light Screen. It also lowers their evasion."
      },
      {
        name: "Feather Dance",
        type: "FLYING",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "The user covers the target's body with a mass of down that harshly lowers its Attack stat."
      },
      {
        name: "Mirror Move",
        type: "FLYING",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user counters the target by mimicking the target's last move."
      },
      {
        name: "Roost",
        type: "FLYING",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user lands and rests its body. It restores the user's HP by up to half of its max HP."
      },
      {
        name: "Tailwind",
        type: "FLYING",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user whips up a turbulent whirlwind that ups the Speed of all party Pokémon for four turns."
      },
      {
        name: "Astral Barrage",
        type: "GHOST",
        cls: "Special",
        pow: 120,
        acc: 100,
        pp: 5,
        desc: "The user attacks by sending a frightful amount of small ghosts at opposing Pokémon."
      },
      {
        name: "Shadow Force",
        type: "GHOST",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 5,
        desc: "The user disappears, then strikes the foe on the second turn. It hits even if the foe protects itself."
      },
      {
        name: "Poltergeist",
        type: "GHOST",
        cls: "Physical",
        pow: 110,
        acc: 90,
        pp: 5,
        desc: "Attacks the target by controlling its item. The move fails if the target doesn't have an item."
      },
      {
        name: "Moongeist Beam",
        type: "GHOST",
        cls: "Special",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "The user emits a sinister ray. This move can be used on the target regardless of its Abilities."
      },
      {
        name: "Phantom Force",
        type: "GHOST",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user vanishes somewhere, then strikes on the next turn. Hits through protections."
      },
      {
        name: "Spectral Thief",
        type: "GHOST",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user hides in the target's shadow, steals the target's stat boosts, and then attacks."
      },
      {
        name: "Shadow Bone",
        type: "GHOST",
        cls: "Physical",
        pow: 85,
        acc: 100,
        pp: 10,
        desc: "The user beats the target with a bone containing a spirit. May lower the target's Defense stat."
      },
      {
        name: "Shadow Ball",
        type: "GHOST",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user hurls a shadowy blob at the target. It may also lower the target's Sp. Def stat."
      },
      {
        name: "Spirit Shackle",
        type: "GHOST",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user attacks while also stitching the target's shadow to the ground to prevent it fleeing."
      },
      {
        name: "Shadow Claw",
        type: "GHOST",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 15,
        desc: "The user slashes with a sharp claw made from shadows. Critical hits land more easily."
      },
      {
        name: "Hex",
        type: "GHOST",
        cls: "Special",
        pow: 65,
        acc: 100,
        pp: 10,
        desc: "This relentless attack does massive damage to a target affected by status problems."
      },
      {
        name: "Ominous Wind",
        type: "GHOST",
        cls: "Special",
        pow: 60,
        acc: 100,
        pp: 5,
        desc: "The user blasts the target with a gust of repulsive wind. It may also raise all the user's stats at once."
      },
      {
        name: "Shadow Punch",
        type: "GHOST",
        cls: "Physical",
        pow: 60,
        acc: "—",
        pp: 20,
        desc: "The user throws a punch from the shadows. The punch lands without fail."
      },
      {
        name: "Shadow Sneak",
        type: "GHOST",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 30,
        desc: "The user extends its shadow and attacks the target from behind. This move always goes first."
      },
      {
        name: "Astonish",
        type: "GHOST",
        cls: "Physical",
        pow: 30,
        acc: 100,
        pp: 15,
        desc: "The user attacks the target while shouting in a startling fashion. It may also make the target flinch."
      },
      {
        name: "Lick",
        type: "GHOST",
        cls: "Physical",
        pow: 30,
        acc: 100,
        pp: 30,
        desc: "The target is licked with a long tongue, causing damage. It may also leave the target with paralysis."
      },
      {
        name: "Night Shade",
        type: "GHOST",
        cls: "Special",
        pow: 1,
        acc: 100,
        pp: 15,
        desc: "The user makes the foe see a frightening mirage. It inflicts damage matching the user's level."
      },
      {
        name: "Confuse Ray",
        type: "LIGHT",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 10,
        desc: "The target is exposed to a sinister ray that triggers confusion."
      },
      {
        name: "Curse",
        type: "GHOST",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "A move that works differently for the Ghost type than for all the other types."
      },
      {
        name: "Destiny Bond",
        type: "GHOST",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "When this move is used, if the user faints, the foe that landed the knockout hit also faints."
      },
      {
        name: "Grudge",
        type: "GHOST",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "If the user faints, the user's grudge fully depletes the PP of the foe's move that knocked it out."
      },
      {
        name: "Nightmare",
        type: "GHOST",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "A sleeping target sees a nightmare that inflicts some damage every turn."
      },
      {
        name: "Spite",
        type: "GHOST",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 10,
        desc: "The user unleashes its grudge on the move last used by the target by cutting 4 PP from it."
      },
      {
        name: "Trick-or-Treat",
        type: "GHOST",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "The user takes the target trick-or-treating. This adds Ghost type to the target's type."
      },
      {
        name: "Frenzy Plant",
        type: "GRASS",
        cls: "Special",
        pow: 150,
        acc: 90,
        pp: 5,
        desc: "The user slams the target with an enormous tree. The user can't move on the next turn."
      },
      {
        name: "Leaf Storm",
        type: "GRASS",
        cls: "Special",
        pow: 130,
        acc: 90,
        pp: 5,
        desc: "A storm of sharp is whipped up. The attack's recoil harshly reduces the user's Sp. Atk stat."
      },
      {
        name: "Solar Blade",
        type: "LIGHT",
        cls: "Physical",
        pow: 125,
        acc: 100,
        pp: 10,
        desc: "The user gathers light energy into a blade, attacking the target on the next turn."
      },
      {
        name: "Petal Dance",
        type: "GRASS",
        cls: "Special",
        pow: 120,
        acc: 100,
        pp: 10,
        desc: "The user attacks by scattering petals for two to three turns. The user then becomes confused."
      },
      {
        name: "Power Whip",
        type: "GRASS",
        cls: "Physical",
        pow: 120,
        acc: 85,
        pp: 10,
        desc: "The user violently whirls its vines or tentacles to harshly lash the target."
      },
      {
        name: "Seed Flare",
        type: "GRASS",
        cls: "Special",
        pow: 120,
        acc: 85,
        pp: 5,
        desc: "The user generates a shock wave from within its body. It may harshly lower the target's Sp. Def."
      },
      {
        name: "Solar Beam",
        type: "LIGHT",
        cls: "Special",
        pow: 120,
        acc: 100,
        pp: 10,
        desc: "A two-turn attack. The user gathers light, then blasts a bundled beam on the second turn."
      },
      {
        name: "Wood Hammer",
        type: "GRASS",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 15,
        desc: "The user slams its rugged body into the target to attack. The user also sustains serious damage."
      },
      {
        name: "Energy Ball",
        type: "GRASS",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user draws power from nature and fires it at the target. It may also lower the target's Sp. Def."
      },
      {
        name: "Leaf Blade",
        type: "GRASS",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 15,
        desc: "The user handles a sharp leaf like a sword and attacks by slashing. It has a high critical-hit ratio."
      },
      {
        name: "Petal Blizzard",
        type: "GRASS",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 15,
        desc: "The user stirs up a violent petal blizzard and attacks everything around it."
      },
      {
        name: "Apple Acid",
        type: "GRASS",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "Attacks with an acidic liquid created from tart apples. This also lowers the target's Sp. Def."
      },
      {
        name: "Drum Beating",
        type: "GRASS",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user plays its drum, controlling roots to attack. This also lowers the target's Speed stat."
      },
      {
        name: "Grass Pledge",
        type: "GRASS",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "A column of grass hits the foes. When used with its water equivalent, it creates a vast swamp."
      },
      {
        name: "Grav Apple",
        type: "GRASS",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user inflicts damage by dropping an apple from high above. This also lowers the target's Defense."
      },
      {
        name: "Seed Bomb",
        type: "GRASS",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user slams a barrage of hard-shelled seeds down on the target from above."
      },
      {
        name: "Giga Drain",
        type: "GRASS",
        cls: "Special",
        pow: 75,
        acc: 100,
        pp: 10,
        desc: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target."
      },
      {
        name: "Horn Leech",
        type: "GRASS",
        cls: "Physical",
        pow: 75,
        acc: 100,
        pp: 10,
        desc: "The user drains the foe's energy with its horns. The user's HP is restored by half the damage inflicted."
      },
      {
        name: "Grassy Glide",
        type: "GRASS",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 20,
        desc: "Gliding on the ground, the user attacks the target. This move always goes first on Grassy Terrain."
      },
      {
        name: "Trop Kick",
        type: "GRASS",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 15,
        desc: "The user lands an intense tropical kick on the target. This also lowers the target's Attack stat."
      },
      {
        name: "Leaf Tornado",
        type: "GRASS",
        cls: "Special",
        pow: 65,
        acc: 90,
        pp: 10,
        desc: "The user attacks its foe by encircling it in sharp leaves. This attack may also lower the foe's accuracy."
      },
      {
        name: "Magical Leaf",
        type: "GRASS",
        cls: "Special",
        pow: 60,
        acc: "—",
        pp: 20,
        desc: "The user scatters curious leaves that chase the target. This attack will not miss."
      },
      {
        name: "Needle Arm",
        type: "GRASS",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 15,
        desc: "The user attacks by wildly swinging its thorny arms. It may also make the target flinch."
      },
      {
        name: "Razor Leaf",
        type: "GRASS",
        cls: "Physical",
        pow: 55,
        acc: 95,
        pp: 25,
        desc: "Sharp-edged leaves are launched to slash at the opposing team. Critical hits land more easily."
      },
      {
        name: "Vine Whip",
        type: "GRASS",
        cls: "Physical",
        pow: 45,
        acc: 100,
        pp: 25,
        desc: "The target is struck with slender, whiplike vines to inflict damage."
      },
      {
        name: "Branch Poke",
        type: "GRASS",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 40,
        desc: "The user attacks the target by poking it with a sharply pointed branch."
      },
      {
        name: "Leafage",
        type: "GRASS",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 40,
        desc: "The user attacks by pelting the target with leaves."
      },
      {
        name: "Mega Drain",
        type: "GRASS",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 15,
        desc: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target."
      },
      {
        name: "Snap Trap",
        type: "GRASS",
        cls: "Physical",
        pow: 35,
        acc: 100,
        pp: 15,
        desc: "The user snares the target in a snap trap for four to five turns."
      },
      {
        name: "Bullet Seed",
        type: "GRASS",
        cls: "Physical",
        pow: 25,
        acc: 100,
        pp: 30,
        desc: "The user forcefully shoots seeds at the target. Two to five seeds are shot in rapid succession."
      },
      {
        name: "Absorb",
        type: "GRASS",
        cls: "Special",
        pow: 20,
        acc: 100,
        pp: 25,
        desc: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target."
      },
      {
        name: "Grass Knot",
        type: "GRASS",
        cls: "Special",
        pow: 1,
        acc: 100,
        pp: 20,
        desc: "The user snares the target with grass and trips it. The heavier the target, the greater the damage."
      },
      {
        name: "Aromatherapy",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user releases a soothing scent that heals all status problems affecting the user's party."
      },
      {
        name: "Cotton Guard",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user protects itself by wrapping its body in soft cotton, drastically raising its Defense stat."
      },
      {
        name: "Cotton Spore",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 40,
        desc: "The user releases cotton-like spores that cling to the foe, harshly reducing its Speed stat."
      },
      {
        name: "Forest's Curse",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "The user puts a forest curse on the target. The target is now Grass type as well."
      },
      {
        name: "Grass Whistle",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: 55,
        pp: 15,
        desc: "The user plays a pleasant melody that lulls the target into a deep sleep."
      },
      {
        name: "Grassy Terrain",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user turns the ground to grass for five turns. Grounded Pokémon restore a little HP every turn."
      },
      {
        name: "Ingrain",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user lays roots that restore its HP on every turn. Because it is rooted, it can't switch out."
      },
      {
        name: "Jungle Healing",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user becomes one with the jungle, and restores HP and cures status conditions of itself and allies."
      },
      {
        name: "Leech Seed",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: 90,
        pp: 10,
        desc: "A seed is planted on the target. It steals some HP from the target every turn."
      },
      {
        name: "Sleep Powder",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: 75,
        pp: 15,
        desc: "The user scatters a big cloud of sleep-inducing dust around the target."
      },
      {
        name: "Spiky Shield",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "Protects the user from attacks. Also damages attackers that make contact with the user."
      },
      {
        name: "Spore",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "The user scatters bursts of spores that induce sleep."
      },
      {
        name: "Strength Sap",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 10,
        desc: "The user restores its HP by the target's Attack stat amount. Then lowers the target's Attack stat."
      },
      {
        name: "Stun Spore",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: 75,
        pp: 30,
        desc: "The user scatters a cloud of paralyzing powder. It may leave the target with paralysis."
      },
      {
        name: "Synthesis",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user restores its own HP. The amount of HP regained varies with the weather."
      },
      {
        name: "Worry Seed",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 10,
        desc: "A seed that causes worry is planted on the foe. It prevents sleep by making its Ability Insomnia."
      },
      {
        name: "Precipice Blades",
        type: "GROUND",
        cls: "Physical",
        pow: 120,
        acc: 85,
        pp: 10,
        desc: "The user attacks its foes by manifesting the power of the land in fearsome blades of stone."
      },
      {
        name: "Earthquake",
        type: "GROUND",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 10,
        desc: "The user sets off an earthquake that strikes every Pokémon around it."
      },
      {
        name: "High Horsepower",
        type: "GROUND",
        cls: "Physical",
        pow: 95,
        acc: 95,
        pp: 10,
        desc: "The user fiercely attacks the target using its entire body."
      },
      {
        name: "Earth Power",
        type: "GROUND",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user makes the ground under the foe erupt with power. It may also lower the target's Sp. Def."
      },
      {
        name: "Land's Wrath",
        type: "GROUND",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user gathers the energy of the land and focuses that power on foes to damage them."
      },
      {
        name: "Thousand Arrows",
        type: "GROUND",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "This move also hits Pokémon that are in the air. Those Pokémon are knocked down to the ground."
      },
      {
        name: "Thousand Waves",
        type: "GROUND",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user attacks with a wave that crawls along the ground. Those it hits can't flee from battle."
      },
      {
        name: "Dig",
        type: "GROUND",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user burrows, then attacks on the second turn. It can also be used to exit dungeons."
      },
      {
        name: "Drill Run",
        type: "GROUND",
        cls: "Physical",
        pow: 80,
        acc: 95,
        pp: 10,
        desc: "The user crashes into its target while rotating its body like a drill. Critical hits land more easily."
      },
      {
        name: "Stomping Tantrum",
        type: "GROUND",
        cls: "Physical",
        pow: 75,
        acc: 100,
        pp: 10,
        desc: "The user attacks driven by frustration. Power increases if the user's previous move failed."
      },
      {
        name: "Scorching Sands",
        type: "GROUND",
        cls: "Special",
        pow: 70,
        acc: 100,
        pp: 10,
        desc: "The user throws scorching sand at the target to attack. This may also burn the target."
      },
      {
        name: "Bone Club",
        type: "GROUND",
        cls: "Physical",
        pow: 65,
        acc: 85,
        pp: 20,
        desc: "The user clubs the target with a bone. It may also make the target flinch."
      },
      {
        name: "Mud Bomb",
        type: "GROUND",
        cls: "Special",
        pow: 65,
        acc: 85,
        pp: 10,
        desc: "The user launches a hard-packed mud ball to attack. It may also lower the target's accuracy."
      },
      {
        name: "Bulldoze",
        type: "GROUND",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 20,
        desc: "The user strikes everything around it by stomping on the ground. It reduces hit Pokémon's Speed."
      },
      {
        name: "Mud Shot",
        type: "GROUND",
        cls: "Special",
        pow: 55,
        acc: 95,
        pp: 15,
        desc: "The user attacks by hurling a blob of mud at the target. It also reduces the target's Speed."
      },
      {
        name: "Bonemerang",
        type: "GROUND",
        cls: "Physical",
        pow: 50,
        acc: 90,
        pp: 10,
        desc: "The user throws the bone it holds. The bone loops to hit the target twice, coming and going."
      },
      {
        name: "Sand Tomb",
        type: "GROUND",
        cls: "Physical",
        pow: 35,
        acc: 85,
        pp: 15,
        desc: "The user traps the target inside a harshly raging sandstorm for four to five turns."
      },
      {
        name: "Bone Rush",
        type: "GROUND",
        cls: "Physical",
        pow: 25,
        acc: 90,
        pp: 10,
        desc: "The user strikes the target with a hard bone two to five times in a row."
      },
      {
        name: "Mud-Slap",
        type: "GROUND",
        cls: "Special",
        pow: 20,
        acc: 100,
        pp: 10,
        desc: "The user hurls mud in the target's face to inflict damage and lower its accuracy."
      },
      {
        name: "Fissure",
        type: "GROUND",
        cls: "Physical",
        pow: 1,
        acc: 30,
        pp: 5,
        desc: "The user opens up a fissure in the ground and drops the foe in. The target instantly faints if it hits."
      },
      {
        name: "Magnitude",
        type: "GROUND",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 30,
        desc: "The user looses a ground-shaking quake affecting everyone around the user. Its power varies."
      },
      {
        name: "Mud Sport",
        type: "GROUND",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user covers itself with mud. It weakens Electric-type moves while the user is in the battle."
      },
      {
        name: "Rototiller",
        type: "GROUND",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user tills the soil to encourage plant growth. This raises the Attack and Sp. Atk of Grass types."
      },
      {
        name: "Sand Attack",
        type: "GROUND",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "Sand is hurled in the target's face, reducing its accuracy."
      },
      {
        name: "Shore Up",
        type: "GROUND",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user regains up to half of its max HP. It restores more HP in a sandstorm."
      },
      {
        name: "Spikes",
        type: "GROUND",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user lays a trap of spikes at the foe's feet. The trap hurts foes that switch into battle."
      },
      {
        name: "Freeze Shock",
        type: "ICE",
        cls: "Physical",
        pow: 140,
        acc: 90,
        pp: 5,
        desc: "On the second turn, the user hits the foe with electrically charged ice. It may also paralyze the foe."
      },
      {
        name: "Ice Burn",
        type: "ICE",
        cls: "Special",
        pow: 140,
        acc: 90,
        pp: 5,
        desc: "On the second turn, an ultracold, freezing wind surrounds the foe. This may leave it with a burn."
      },
      {
        name: "Glacial Lance",
        type: "ICE",
        cls: "Physical",
        pow: 130,
        acc: 100,
        pp: 5,
        desc: "The user attacks by hurling a blizzard-cloaked icicle lance at opposing Pokémon."
      },
      {
        name: "Blizzard",
        type: "ICE",
        cls: "Special",
        pow: 110,
        acc: 70,
        pp: 5,
        desc: "A howling blizzard is summoned to strike the opposing team. It may also freeze them solid."
      },
      {
        name: "Ice Hammer",
        type: "ICE",
        cls: "Physical",
        pow: 100,
        acc: 90,
        pp: 10,
        desc: "The user swings and hits with its strong, heavy fist. It lowers the user's Speed, however."
      },
      {
        name: "Ice Beam",
        type: "ICE",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The target is struck with an icy-cold beam of energy. It may also freeze the target solid."
      },
      {
        name: "Icicle Crash",
        type: "ICE",
        cls: "Physical",
        pow: 85,
        acc: 90,
        pp: 10,
        desc: "The user attacks by harshly dropping an icicle onto the foe. It may also make the target flinch."
      },
      {
        name: "Ice Punch",
        type: "ICE",
        cls: "Physical",
        pow: 75,
        acc: 100,
        pp: 15,
        desc: "The target is punched with an icy fist. It may also leave the target frozen."
      },
      {
        name: "Freeze-Dry",
        type: "ICE",
        cls: "Special",
        pow: 70,
        acc: 100,
        pp: 20,
        desc: "The user rapidly cools the target. This may freeze the target. Is super-effective on Water types."
      },
      {
        name: "Aurora Beam",
        type: "LIGHT",
        cls: "Special",
        pow: 65,
        acc: 100,
        pp: 20,
        desc: "The target is hit with a rainbow-colored beam. This may also lower the target's Attack stat."
      },
      {
        name: "Glaciate",
        type: "ICE",
        cls: "Special",
        pow: 65,
        acc: 95,
        pp: 10,
        desc: "The user attacks by blowing freezing cold air at the foe. This attack reduces the targets' Speed stat."
      },
      {
        name: "Ice Fang",
        type: "ICE",
        cls: "Physical",
        pow: 65,
        acc: 95,
        pp: 15,
        desc: "The user bites with cold-infused fangs. It may also make the target flinch or leave it frozen."
      },
      {
        name: "Avalanche",
        type: "ICE",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 10,
        desc: "An attack move that inflicts double the damage if the user has been hurt by the foe in the same turn."
      },
      {
        name: "Frost Breath",
        type: "ICE",
        cls: "Special",
        pow: 60,
        acc: 90,
        pp: 10,
        desc: "The user blows a cold breath on the target. This attack always results in a critical hit."
      },
      {
        name: "Icy Wind",
        type: "ICE",
        cls: "Special",
        pow: 55,
        acc: 95,
        pp: 15,
        desc: "The user attacks with a gust of chilled air. It also lowers the targets' Speed stat."
      },
      {
        name: "Ice Shard",
        type: "ICE",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 30,
        desc: "The user flash freezes chunks of ice and hurls them at the target. This move always goes first."
      },
      {
        name: "Powder Snow",
        type: "ICE",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 25,
        desc: "The user attacks with a chilling gust of powdery snow. It may also freeze the targets."
      },
      {
        name: "Ice Ball",
        type: "ICE",
        cls: "Physical",
        pow: 30,
        acc: 90,
        pp: 20,
        desc: "The user continually rolls into the target over five turns. It becomes stronger each time it hits."
      },
      {
        name: "Icicle Spear",
        type: "ICE",
        cls: "Physical",
        pow: 25,
        acc: 100,
        pp: 30,
        desc: "The user launches sharp icicles at the target. It strikes two to five times in a row."
      },
      {
        name: "Triple Axel",
        type: "ICE",
        cls: "Physical",
        pow: 20,
        acc: 90,
        pp: 10,
        desc: "A consecutive three-kick attack that becomes more powerful with each successful hit."
      },
      {
        name: "Sheer Cold",
        type: "ICE",
        cls: "Special",
        pow: 1,
        acc: 30,
        pp: 5,
        desc: "The foe is attacked with a blast of absolute-zero cold. The target instantly faints if it hits."
      },
      {
        name: "Aurora Veil",
        type: "ICE",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "This move reduces damage from attacks for five turns. This can be used only in a hailstorm."
      },
      {
        name: "Hail",
        type: "ICE",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user summons a hail storm lasting five turns. It damages all Pokémon except the Ice type."
      },
      {
        name: "Haze",
        type: "ICE",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "The user creates a haze that eliminates every stat change among all the Pokémon engaged in battle."
      },
      {
        name: "Mist",
        type: "ICE",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "The user cloaks its body with a white mist that prevents any of its stats from being cut for five turns."
      },
      {
        name: "Explosion",
        type: "NORMAL",
        cls: "Physical",
        pow: 250,
        acc: 100,
        pp: 5,
        desc: "The user explodes to inflict damage on those around it. The user faints upon using this move."
      },
      {
        name: "Self-Destruct",
        type: "NORMAL",
        cls: "Physical",
        pow: 200,
        acc: 100,
        pp: 5,
        desc: "The user blows up to inflict damage on all Pokémon in battle. The user faints upon using this move."
      },
      {
        name: "Giga Impact",
        type: "NORMAL",
        cls: "Physical",
        pow: 150,
        acc: 90,
        pp: 5,
        desc: "The user charges at the target using every bit of its power. The user must rest on the next turn."
      },
      {
        name: "Hyper Beam",
        type: "NORMAL",
        cls: "Special",
        pow: 150,
        acc: 90,
        pp: 5,
        desc: "The foe is attacked with a powerful beam. The user must rest on the next turn to regain its energy."
      },
      {
        name: "Boomburst",
        type: "NORMAL",
        cls: "Special",
        pow: 140,
        acc: 100,
        pp: 10,
        desc: "The user attacks everything around it with the destructive power of a terrible, explosive sound."
      },
      {
        name: "Last Resort",
        type: "NORMAL",
        cls: "Physical",
        pow: 140,
        acc: 100,
        pp: 5,
        desc: "This move can be used only after the user has used all the other moves it knows in the battle."
      },
      {
        name: "Skull Bash",
        type: "NORMAL",
        cls: "Physical",
        pow: 130,
        acc: 100,
        pp: 10,
        desc: "The user tucks in its head to raise its Defense in the first turn, then rams the foe on the next turn."
      },
      {
        name: "Double-Edge",
        type: "NORMAL",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 15,
        desc: "A reckless, life-risking tackle. It also damages the user by a fairly large amount, however."
      },
      {
        name: "Head Charge",
        type: "NORMAL",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 15,
        desc: "The user charges its head into the foe, using its powerful guard hair. The user also takes damage."
      },
      {
        name: "Mega Kick",
        type: "NORMAL",
        cls: "Physical",
        pow: 120,
        acc: 75,
        pp: 5,
        desc: "The target is attacked by a kick launched with muscle-packed power."
      },
      {
        name: "Multi-Attack",
        type: "NORMAL",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 10,
        desc: "Cloaking itself in high energy, the user slams into the target. This move's type depends on the held memory."
      },
      {
        name: "Techno Blast",
        type: "NORMAL",
        cls: "Special",
        pow: 120,
        acc: 100,
        pp: 5,
        desc: "The user fires a beam of light at its target. The type changes depending on the Drive the user holds."
      },
      {
        name: "Thrash",
        type: "NORMAL",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 10,
        desc: "The user rampages and attacks for two to three turns. It then becomes confused, however."
      },
      {
        name: "Egg Bomb",
        type: "NORMAL",
        cls: "Physical",
        pow: 100,
        acc: 75,
        pp: 10,
        desc: "A large egg is hurled at the target with maximum force to inflict damage."
      },
      {
        name: "Judgment",
        type: "NORMAL",
        cls: "Special",
        pow: 100,
        acc: 100,
        pp: 10,
        desc: "The user releases countless shots of light. Its type varies with the kind of Plate the user is holding."
      },
      {
        name: "Hyper Voice",
        type: "NORMAL",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user lets loose a horribly echoing shout with the power to inflict damage."
      },
      {
        name: "Revelation Dance",
        type: "NORMAL",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 15,
        desc: "The user attacks the target by dancing very hard. The user's type determines the type of this move."
      },
      {
        name: "Rock Climb",
        type: "NORMAL",
        cls: "Physical",
        pow: 90,
        acc: 85,
        pp: 20,
        desc: "The user attacks the target by smashing into it with incredible force. It may also confuse the target."
      },
      {
        name: "Take Down",
        type: "NORMAL",
        cls: "Physical",
        pow: 90,
        acc: 85,
        pp: 20,
        desc: "A reckless, full-body charge attack for slamming into the foe. It also damages the user a little."
      },
      {
        name: "Uproar",
        type: "NORMAL",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user attacks in an uproar for three turns. Over that time, no one can fall asleep."
      },
      {
        name: "Body Slam",
        type: "NORMAL",
        cls: "Physical",
        pow: 85,
        acc: 100,
        pp: 15,
        desc: "The user drops onto the target with its full body weight. It may leave the target with paralysis."
      },
      {
        name: "Extreme Speed",
        type: "NORMAL",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 5,
        desc: "The user charges the target at blinding speed. This attack always goes before any other move."
      },
      {
        name: "Hyper Fang",
        type: "NORMAL",
        cls: "Physical",
        pow: 80,
        acc: 90,
        pp: 15,
        desc: "The user bites hard on the target with its sharp front fangs. It may also make the target flinch."
      },
      {
        name: "Mega Punch",
        type: "NORMAL",
        cls: "Physical",
        pow: 80,
        acc: 85,
        pp: 20,
        desc: "The target is slugged by a punch thrown with muscle-packed power."
      },
      {
        name: "Razor Wind",
        type: "NORMAL",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "A two-turn attack. Blades of wind hit the foe on the second turn. Critical hits land more easily."
      },
      {
        name: "Slam",
        type: "NORMAL",
        cls: "Physical",
        pow: 80,
        acc: 75,
        pp: 20,
        desc: "The target is slammed with a long tail, vines, etc., to inflict damage."
      },
      {
        name: "Strength",
        type: "NORMAL",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The target is slugged with a punch thrown at maximum power. It can also be used to move heavy boulders."
      },
      {
        name: "Tri Attack",
        type: "NORMAL",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user strikes with a simultaneous three-beam attack. May also paralyze, burn, or freeze the target."
      },
      {
        name: "Crush Claw",
        type: "NORMAL",
        cls: "Physical",
        pow: 75,
        acc: 95,
        pp: 10,
        desc: "The user slashes the target with hard and sharp claws. It may also lower the target's Defense."
      },
      {
        name: "Relic Song",
        type: "NORMAL",
        cls: "Special",
        pow: 75,
        acc: 100,
        pp: 10,
        desc: "An ancient song appeals to the hearts of those listening. It may also induce sleep."
      },
      {
        name: "Chip Away",
        type: "NORMAL",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 20,
        desc: "Seeking an opening, the user strikes continually. The foe's stat changes don't affect the damage."
      },
      {
        name: "Dizzy Punch",
        type: "NORMAL",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 10,
        desc: "The target is hit with rhythmically launched punches that may also leave it confused."
      },
      {
        name: "Facade",
        type: "NORMAL",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 20,
        desc: "An attack move that doubles its power if the user is poisoned, burned, or has paralysis."
      },
      {
        name: "Headbutt",
        type: "NORMAL",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 15,
        desc: "The user sticks out its head and attacks by charging into the foe. It may also make the target flinch."
      },
      {
        name: "Retaliate",
        type: "NORMAL",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 5,
        desc: "Gets revenge for a fainted ally. If an ally fainted in the last turn, this attack's damage increases."
      },
      {
        name: "Secret Power",
        type: "NORMAL",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 20,
        desc: "The user attacks with a secret power. Its added effects vary depending on the user's environment."
      },
      {
        name: "Slash",
        type: "NORMAL",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 20,
        desc: "The target is attacked with a slash of claws or blades. Critical hits land more easily."
      },
      {
        name: "Smelling Salts",
        type: "NORMAL",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 10,
        desc: "This attack inflicts double damage on a paralyzed foe. It also cures the target's paralysis, however."
      },
      {
        name: "Horn Attack",
        type: "NORMAL",
        cls: "Physical",
        pow: 65,
        acc: 100,
        pp: 25,
        desc: "The target is jabbed with a sharply pointed horn to inflict damage."
      },
      {
        name: "Stomp",
        type: "NORMAL",
        cls: "Physical",
        pow: 65,
        acc: 100,
        pp: 20,
        desc: "The target is stomped with a big foot. It may also make the target flinch."
      },
      {
        name: "Covet",
        type: "NORMAL",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 25,
        desc: "The user endearingly approaches the target, then steals the target's held item."
      },
      {
        name: "Hidden Power",
        type: "NORMAL",
        cls: "Special",
        pow: 60,
        acc: 100,
        pp: 15,
        desc: "A unique attack that varies in type and intensity depending on the Pokémon using it."
      },
      {
        name: "Round",
        type: "NORMAL",
        cls: "Special",
        pow: 60,
        acc: 100,
        pp: 15,
        desc: "The user attacks with a song. Others can join in the Round and make the attack do greater damage."
      },
      {
        name: "Vise Grip",
        type: "NORMAL",
        cls: "Physical",
        pow: 55,
        acc: 100,
        pp: 30,
        desc: "The target is gripped and squeezed from both sides to inflict damage."
      },
      {
        name: "Cut",
        type: "NORMAL",
        cls: "Physical",
        pow: 50,
        acc: 95,
        pp: 30,
        desc: "The target is cut with a scythe or a claw. It can also be used to cut down thin trees."
      },
      {
        name: "Rapid Spin",
        type: "NORMAL",
        cls: "Physical",
        pow: 50,
        acc: 100,
        pp: 40,
        desc: "A spin attack that raises the user's Speed and eliminates the effects of Bind, Spikes, etc."
      },
      {
        name: "Snore",
        type: "NORMAL",
        cls: "Special",
        pow: 50,
        acc: 100,
        pp: 15,
        desc: "An attack that can be used only if the user is asleep. The harsh noise may also make the target flinch."
      },
      {
        name: "Terrain Pulse",
        type: "NORMAL",
        cls: "Special",
        pow: 50,
        acc: 100,
        pp: 10,
        desc: "Utilizes the power of the terrain to attack. This move's type and power vary with the terrain."
      },
      {
        name: "Weather Ball",
        type: "NORMAL",
        cls: "Special",
        pow: 50,
        acc: 100,
        pp: 10,
        desc: "An attack move that varies in power and type depending on the weather."
      },
      {
        name: "Echoed Voice",
        type: "NORMAL",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 15,
        desc: "The user attacks the foe with an echoing voice. If this move is used every turn, it does greater damage."
      },
      {
        name: "Fake Out",
        type: "NORMAL",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 10,
        desc: "An attack that hits first and makes the target flinch. It only works the first turn the user is in battle."
      },
      {
        name: "False Swipe",
        type: "NORMAL",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 40,
        desc: "A restrained attack that prevents the target from fainting. The target is left with at least 1 HP."
      },
      {
        name: "Hold Back",
        type: "NORMAL",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 40,
        desc: "The user holds back when it attacks, and the target is left with at least 1 HP."
      },
      {
        name: "Pay Day",
        type: "NORMAL",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 20,
        desc: "Numerous coins are hurled at the target to inflict damage. Money is earned after battle."
      },
      {
        name: "Pound",
        type: "NORMAL",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 35,
        desc: "The target is physically pounded with a long tail or a foreleg, etc."
      },
      {
        name: "Quick Attack",
        type: "NORMAL",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 30,
        desc: "The user lunges at the target at a speed that makes it almost invisible. It is sure to strike first."
      },
      {
        name: "Scratch",
        type: "NORMAL",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 35,
        desc: "Hard, pointed, and sharp claws rake the target to inflict damage."
      },
      {
        name: "Tackle",
        type: "NORMAL",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 35,
        desc: "A physical attack in which the user charges and slams into the target with its whole body."
      },
      {
        name: "Double Hit",
        type: "NORMAL",
        cls: "Physical",
        pow: 35,
        acc: 90,
        pp: 10,
        desc: "The user slams the target with a long tail, vines, or tentacle. The target is hit twice in a row."
      },
      {
        name: "Feint",
        type: "NORMAL",
        cls: "Physical",
        pow: 30,
        acc: 100,
        pp: 10,
        desc: "An attack that hits a target using Protect or Detect. It also lifts the effects of those moves."
      },
      {
        name: "Tail Slap",
        type: "NORMAL",
        cls: "Physical",
        pow: 25,
        acc: 85,
        pp: 10,
        desc: "The user attacks by striking the target with its hard tail. It hits the Pokémon two to five times in a row."
      },
      {
        name: "Rage",
        type: "NORMAL",
        cls: "Physical",
        pow: 20,
        acc: 100,
        pp: 20,
        desc: "As long as this move is in use, the user's Attack rises each time the user is hit in battle."
      },
      {
        name: "Spike Cannon",
        type: "NORMAL",
        cls: "Physical",
        pow: 20,
        acc: 100,
        pp: 15,
        desc: "Sharp spikes are shot at the target in rapid succession. They hit two to five times in a row."
      },
      {
        name: "Comet Punch",
        type: "NORMAL",
        cls: "Physical",
        pow: 18,
        acc: 85,
        pp: 15,
        desc: "The target is hit with a flurry of punches that strike two to five times in a row."
      },
      {
        name: "Fury Swipes",
        type: "NORMAL",
        cls: "Physical",
        pow: 18,
        acc: 80,
        pp: 15,
        desc: "The target is raked with sharp claws or scythes for two to five times in quick succession."
      },
      {
        name: "Barrage",
        type: "NORMAL",
        cls: "Physical",
        pow: 15,
        acc: 85,
        pp: 20,
        desc: "Round objects are hurled at the target to strike two to five times in a row."
      },
      {
        name: "Bind",
        type: "NORMAL",
        cls: "Physical",
        pow: 15,
        acc: 85,
        pp: 20,
        desc: "Things such as long bodies or tentacles are used to bind and squeeze the foe for four to five turns."
      },
      {
        name: "Double Slap",
        type: "NORMAL",
        cls: "Physical",
        pow: 15,
        acc: 85,
        pp: 10,
        desc: "The target is slapped repeatedly, back and forth, two to five times in a row."
      },
      {
        name: "Fury Attack",
        type: "NORMAL",
        cls: "Physical",
        pow: 15,
        acc: 85,
        pp: 20,
        desc: "The target is jabbed repeatedly with a horn or beak two to five times in a row."
      },
      {
        name: "Wrap",
        type: "NORMAL",
        cls: "Physical",
        pow: 15,
        acc: 90,
        pp: 20,
        desc: "A long body or vines are used to wrap and squeeze the target for four to five turns."
      },
      {
        name: "Constrict",
        type: "NORMAL",
        cls: "Physical",
        pow: 10,
        acc: 100,
        pp: 35,
        desc: "The foe is attacked with long, creeping tentacles or vines. It may also lower the target's Speed."
      },
      {
        name: "Bide",
        type: "NORMAL",
        cls: "Physical",
        pow: 1,
        acc: "—",
        pp: 10,
        desc: "The user endures attacks for two turns, then strikes back to cause double the damage taken."
      },
      {
        name: "Crush Grip",
        type: "NORMAL",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 5,
        desc: "The target is crushed with great force. The attack is more powerful the more HP the target has left."
      },
      {
        name: "Endeavor",
        type: "NORMAL",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 5,
        desc: "An attack move that cuts down the target's HP to equal the user's HP."
      },
      {
        name: "Flail",
        type: "NORMAL",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 15,
        desc: "The user flails about aimlessly to attack. It becomes more powerful the less HP the user has."
      },
      {
        name: "Frustration",
        type: "NORMAL",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 20,
        desc: "A full-power attack that grows more powerful the less the user likes its Trainer."
      },
      {
        name: "Guillotine",
        type: "NORMAL",
        cls: "Physical",
        pow: 1,
        acc: 30,
        pp: 5,
        desc: "A vicious, tearing attack with big pincers. The target will faint instantly if this attack hits."
      },
      {
        name: "Horn Drill",
        type: "NORMAL",
        cls: "Physical",
        pow: 1,
        acc: 30,
        pp: 5,
        desc: "The user stabs the foe with a horn that rotates like a drill. If it hits, the target faints instantly."
      },
      {
        name: "Natural Gift",
        type: "NORMAL",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 15,
        desc: "The user draws power to attack by using its held Berry. The Berry determines its type and power."
      },
      {
        name: "Present",
        type: "NORMAL",
        cls: "Physical",
        pow: 1,
        acc: 90,
        pp: 15,
        desc: "The user attacks by giving the target a gift with a hidden trap. It restores HP sometimes, however."
      },
      {
        name: "Return",
        type: "NORMAL",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 20,
        desc: "A full-power attack that grows more powerful the more the user likes its Trainer."
      },
      {
        name: "Sonic Boom",
        type: "NORMAL",
        cls: "Special",
        pow: 1,
        acc: 90,
        pp: 20,
        desc: "The target is hit with a destructive shock wave that always inflicts 20 HP damage."
      },
      {
        name: "Spit Up",
        type: "NORMAL",
        cls: "Special",
        pow: 1,
        acc: 100,
        pp: 10,
        desc: "The power stored using the move Stockpile is released all at once in an attack."
      },
      {
        name: "Super Fang",
        type: "NORMAL",
        cls: "Physical",
        pow: 1,
        acc: 90,
        pp: 10,
        desc: "The user chomps hard on the target with its sharp front fangs. It cuts the target's HP to half."
      },
      {
        name: "Trump Card",
        type: "NORMAL",
        cls: "Special",
        pow: 1,
        acc: "—",
        pp: 5,
        desc: "The fewer PP this move has, the greater its attack power."
      },
      {
        name: "Wring Out",
        type: "NORMAL",
        cls: "Special",
        pow: 1,
        acc: 100,
        pp: 5,
        desc: "The user powerfully wrings the foe. The more HP the foe has, the greater this attack's power."
      },
      {
        name: "Acupressure",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "The user applies pressure to stress points, sharply boosting one of its stats."
      },
      {
        name: "After You",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user helps the target and makes it use its move right after the user."
      },
      {
        name: "Assist",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user hurriedly and randomly uses a move among those known by other Pokémon in the party."
      },
      {
        name: "Attract",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "If it is the opposite gender of the user, the target becomes infatuated and less likely to attack."
      },
      {
        name: "Baton Pass",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 40,
        desc: "The user switches places with a party Pokémon in waiting, passing along any stat changes."
      },
      {
        name: "Belly Drum",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user maximizes its Attack stat in exchange for HP equal to half its max HP."
      },
      {
        name: "Bestow",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user passes its held item to the target when the target isn't holding an item."
      },
      {
        name: "Block",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user blocks the target's way with arms spread wide to prevent escape."
      },
      {
        name: "Camouflage",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user's type is changed depending on its environment, such as at water's edge, in grass, or in a cave."
      },
      {
        name: "Captivate",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "If it is the opposite gender of the user, the target is charmed into harshly lowering its Sp. Atk stat."
      },
      {
        name: "Celebrate",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 40,
        desc: "The Pokémon congratulates you on your special day!"
      },
      {
        name: "Confide",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user tells the target a secret. The target loses focus and its Sp. Atk stat is lowered."
      },
      {
        name: "Conversion",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "The user changes its type to become the same type as one of its moves."
      },
      {
        name: "Conversion 2",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "The user changes its type to make itself resistant to the type of the attack the opponent used last."
      },
      {
        name: "Copycat",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user mimics the move used immediately before it. The move fails if no other move has been used yet."
      },
      {
        name: "Court Change",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "With its mysterious power, the user swaps the effects on either side of the field."
      },
      {
        name: "Defense Curl",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 40,
        desc: "The user curls up to conceal weak spots and raise its Defense stat."
      },
      {
        name: "Disable",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "For four turns, this move prevents the target from using the move it last used."
      },
      {
        name: "Double Team",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "By moving rapidly, the user makes illusory copies of itself to raise its evasiveness."
      },
      {
        name: "Encore",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 5,
        desc: "The user compels the target to keep using only the move it last used for three turns."
      },
      {
        name: "Endure",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user endures any attack with at least 1 HP. Its chance of failing rises if it is used in succession."
      },
      {
        name: "Entrainment",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "The user dances to compel the target to mimic it, making the target's Ability the same as the user's."
      },
      {
        name: "Flash",
        type: "LIGHT",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "The user flashes a light that cuts the target's accuracy. It can also be used to illuminate caves."
      },
      {
        name: "Focus Energy",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "The user takes a deep breath and focuses so that critical hits land more easily."
      },
      {
        name: "Follow Me",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user draws attention to itself, making all targets take aim only at the user."
      },
      {
        name: "Foresight",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 40,
        desc: "Enables the user to hit a Ghost type with any kind of move. It also enables the user to hit an evasive foe."
      },
      {
        name: "Glare",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 30,
        desc: "The user intimidates the target with the pattern on its belly to cause paralysis."
      },
      {
        name: "Growl",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 40,
        desc: "The user growls in an endearing way, making the foe less wary. The foe's Attack stat is lowered."
      },
      {
        name: "Growth",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user's body grows all at once, raising the Atk and Sp. Atk stats."
      },
      {
        name: "Happy Hour",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "Using Happy Hour doubles the amount of prize money received after battle."
      },
      {
        name: "Harden",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "The user stiffens all the muscles in its body to raise its Defense stat."
      },
      {
        name: "Heal Bell",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user makes a soothing bell chime to heal the status problems of all the party Pokémon."
      },
      {
        name: "Helping Hand",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user assists an ally by boosting the power of its attack."
      },
      {
        name: "Hold Hands",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 40,
        desc: "The user and an ally hold hands. This makes them very happy."
      },
      {
        name: "Howl",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 40,
        desc: "The user howls loudly to raise the spirit of itself and allies, boosting their Attack stats."
      },
      {
        name: "Laser Focus",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "The user focuses intensely. The attack on the next turn always results in a critical hit."
      },
      {
        name: "Leer",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 30,
        desc: "The user gains an intimidating leer with sharp eyes. The target's Defense stat is reduced."
      },
      {
        name: "Lock-On",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user takes sure aim at the target. It ensures the next attack does not fail to hit the target."
      },
      {
        name: "Lovely Kiss",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 75,
        pp: 10,
        desc: "With a scary face, the user tries to force a kiss on the target. If it suceeds, the target falls asleep."
      },
      {
        name: "Lucky Chant",
        type: "LIGHT",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "The user chants an incantation toward the sky, preventing the foe from landing critical hits."
      },
      {
        name: "Me First",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user tries to cut ahead of the foe to steal and use the foe's intended move with greater power."
      },
      {
        name: "Mean Look",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user pins the target with a dark, arresting look. The target becomes unable to flee."
      },
      {
        name: "Metronome",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user waggles a finger and stimulates its brain into randomly using nearly any move."
      },
      {
        name: "Milk Drink",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user restores its own HP by up to half of its maximum HP. May also be used in the field to heal HP."
      },
      {
        name: "Mimic",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user copies the move last used by the foe. The move can be used until the user is switched out."
      },
      {
        name: "Mind Reader",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user senses the foe's movements with its mind to ensure its next attack does not miss the foe."
      },
      {
        name: "Minimize",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user compresses its body to make itself look smaller, which sharply raises its evasiveness."
      },
      {
        name: "Morning Sun",
        type: "LIGHT",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user restores its own HP. The amount of HP regained varies with the weather."
      },
      {
        name: "Nature Power",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "An attack that makes use of nature's power. Its effects vary depending on the user's environment."
      },
      {
        name: "Noble Roar",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "Letting out a noble roar, the user intimidates the target and lowers its Attack and Sp. Atk."
      },
      {
        name: "Odor Sleuth",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 40,
        desc: "Enables the user to hit a Ghost type with any type of move. It also enables the user to hit an evasive foe."
      },
      {
        name: "Pain Split",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user adds its HP to the target's HP, then equally shares the combined HP with the target."
      },
      {
        name: "Perish Song",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "Any Pokémon that hears this song faints in three turns, unless it switches out of battle."
      },
      {
        name: "Play Nice",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user and target become friends. The target loses its will to fight, lowering its Attack stat."
      },
      {
        name: "Protect",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "It enables the user to evade all attacks. Its chance of failing rises if it is used in succession."
      },
      {
        name: "Psych Up",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user hypnotizes itself into copying any stat change made by the target."
      },
      {
        name: "Recover",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "Restoring its own cells, the user restores its own HP by half of its max HP."
      },
      {
        name: "Recycle",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user recycles a held item that has been used in battle so it can be used again."
      },
      {
        name: "Reflect Type",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user reflects the target's type, making it the same type as the target."
      },
      {
        name: "Refresh",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user rests to cure itself of a poisoning, burn, or paralysis."
      },
      {
        name: "Roar",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The target is scared off and replaced by another Pokémon in its party. In the wild, the battle ends."
      },
      {
        name: "Safeguard",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 25,
        desc: "The user creates a protective field that prevents status problems for five turns."
      },
      {
        name: "Scary Face",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 10,
        desc: "The user frightens the target with a scary face to harshly reduce its Speed stat."
      },
      {
        name: "Screech",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 85,
        pp: 40,
        desc: "An earsplitting screech harshly reduces the target's Defense stat."
      },
      {
        name: "Sharpen",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "The user reduces its polygon count to make itself more jagged, raising the Attack stat."
      },
      {
        name: "Shell Smash",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user breaks its shell, lowering its defenses but sharply raising attacking and Speed stats."
      },
      {
        name: "Simple Beam",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "The user's mysterious psychic wave changes the target's Ability to Simple."
      },
      {
        name: "Sing",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 55,
        pp: 15,
        desc: "A soothing lullaby is sung in a calming voice that puts the target into a deep slumber."
      },
      {
        name: "Sketch",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 1,
        desc: "It enables the user to permanently learn the move last used by the foe. Once used, Sketch disappears."
      },
      {
        name: "Slack Off",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user slacks off, restoring its own HP by up to half of its maximum HP."
      },
      {
        name: "Sleep Talk",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "While it is asleep, the user randomly uses one of the moves it knows."
      },
      {
        name: "Smokescreen",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "The user releases an obscuring cloud of smoke or ink. It reduces the target's accuracy."
      },
      {
        name: "Soft-Boiled",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user restores its own HP by up to half of its maximum HP. May also be used in the field to heal HP."
      },
      {
        name: "Splash",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 40,
        desc: "The user just flops and splashes around to no effect at all..."
      },
      {
        name: "Spotlight",
        type: "LIGHT",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user shines a spotlight on the target so that only it will be attacked during the turn."
      },
      {
        name: "Stockpile",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user charges up power and raises both its Defense and Sp. Def. The move can be used three times."
      },
      {
        name: "Stuff Cheeks",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user eats its held Berry, then sharply raises its Defense stat."
      },
      {
        name: "Substitute",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user makes a copy of itself using some of its HP. The copy serves as the user's decoy."
      },
      {
        name: "Supersonic",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 55,
        pp: 20,
        desc: "The user generates odd sound waves from its body. It may confuse the target."
      },
      {
        name: "Swagger",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 85,
        pp: 15,
        desc: "The user enrages and confuses the target. However, it also sharply raises the target's Attack stat."
      },
      {
        name: "Swallow",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The power stored using the move Stockpile is absorbed by the user to heal its HP."
      },
      {
        name: "Sweet Scent",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "A sweet scent that lowers the foe's evasiveness. It also lures wild Pokémon if used in grass, etc."
      },
      {
        name: "Swords Dance",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "A frenetic dance to uplift the fighting spirit. It sharply raises the user's Attack stat."
      },
      {
        name: "Tail Whip",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 30,
        desc: "The user wags its tail cutely, making opposing Pokémon less wary and lowering their Defense stat."
      },
      {
        name: "Tearful Look",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "Gets teary eyed to make the target lose its will to fight. Lowers the target's Attack and Sp. Atk."
      },
      {
        name: "Teatime",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user has teatime with all the Pokémon in the battle. Each Pokémon eats its held Berry."
      },
      {
        name: "Teeter Dance",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "The user performs a wobbly dance that confuses the Pokémon around it."
      },
      {
        name: "Tickle",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "The user tickles the target into laughing, reducing its Attack and Defense stats."
      },
      {
        name: "Transform",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user transforms into a copy of the target right down to having the same move set."
      },
      {
        name: "Whirlwind",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The foe is blown away, to be replaced by another Pokémon in its party. In the wild, the battle ends."
      },
      {
        name: "Wish",
        type: "COSMIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "One turn after this move is used, the target's HP is restored by half the user's maximum HP."
      },
      {
        name: "Work Up",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "The user is roused, and its Attack and Sp. Atk stats increase."
      },
      {
        name: "Yawn",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user lets loose a huge yawn that lulls the target into falling asleep on the next turn."
      },
      {
        name: "Belch",
        type: "POISON",
        cls: "Special",
        pow: 120,
        acc: 90,
        pp: 10,
        desc: "The user lets out a damaging belch at the target. The user must eat a held Berry to use this move."
      },
      {
        name: "Gunk Shot",
        type: "POISON",
        cls: "Physical",
        pow: 120,
        acc: 80,
        pp: 5,
        desc: "The user shoots filthy garbage at the target to attack. It may also poison the target."
      },
      {
        name: "Sludge Wave",
        type: "POISON",
        cls: "Special",
        pow: 95,
        acc: 100,
        pp: 10,
        desc: "It swamps the area around the user with a giant sludge wave. It may also poison those hit."
      },
      {
        name: "Shell Side Arm",
        type: "POISON",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "Inflicts physical or special damage, whichever will be more effective. May also poison the target."
      },
      {
        name: "Sludge Bomb",
        type: "POISON",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "Unsanitary sludge is hurled at the target. It may also poison the target."
      },
      {
        name: "Poison Jab",
        type: "POISON",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 20,
        desc: "The target is stabbed with a tentacle or arm seeped with poison. It may also poison the target."
      },
      {
        name: "Cross Poison",
        type: "POISON",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 20,
        desc: "A slashing attack with a poisonous blade that may also poison the foe. Critical hits land more easily."
      },
      {
        name: "Sludge",
        type: "POISON",
        cls: "Special",
        pow: 65,
        acc: 100,
        pp: 20,
        desc: "Unsanitary sludge is hurled at the target. It may also poison the target."
      },
      {
        name: "Venoshock",
        type: "POISON",
        cls: "Special",
        pow: 65,
        acc: 100,
        pp: 10,
        desc: "The user drenches the foe in a special poisonous liquid. Its power doubles if the target is poisoned."
      },
      {
        name: "Clear Smog",
        type: "POISON",
        cls: "Special",
        pow: 50,
        acc: "—",
        pp: 15,
        desc: "The user attacks by throwing a clump of special mud. All status changes are returned to normal."
      },
      {
        name: "Poison Fang",
        type: "POISON",
        cls: "Physical",
        pow: 50,
        acc: 100,
        pp: 15,
        desc: "The user bites the target with toxic fangs. It may also leave the target badly poisoned."
      },
      {
        name: "Poison Tail",
        type: "POISON",
        cls: "Physical",
        pow: 50,
        acc: 100,
        pp: 25,
        desc: "The user hits the target with its tail. It may also poison the target. Critical hits land more easily."
      },
      {
        name: "Acid",
        type: "POISON",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 30,
        desc: "The foe is attacked with a spray of harsh acid. It may also lower the target's Sp. Def stat."
      },
      {
        name: "Acid Spray",
        type: "POISON",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 20,
        desc: "The user spits fluid that works to melt the target. This harshly reduces the target's Sp. Def stat."
      },
      {
        name: "Smog",
        type: "POISON",
        cls: "Special",
        pow: 30,
        acc: 70,
        pp: 20,
        desc: "The target is attacked with a discharge of filthy gases. It may also poison the target."
      },
      {
        name: "Poison Sting",
        type: "POISON",
        cls: "Physical",
        pow: 15,
        acc: 100,
        pp: 35,
        desc: "The user stabs the target with a poisonous stinger. This may also poison the target."
      },
      {
        name: "Acid Armor",
        type: "POISON",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user alters its cellular structure to liquefy itself, sharply raising its Defense stat."
      },
      {
        name: "Baneful Bunker",
        type: "POISON",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "Protects the user from attacks. Also poisons any attacker that makes contact with the user."
      },
      {
        name: "Coil",
        type: "POISON",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user coils up and concentrates. This raises its Attack and Defense stats as well as its accuracy."
      },
      {
        name: "Corrosive Gas",
        type: "POISON",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 40,
        desc: "The user surrounds everything around it with highly acidic gas and melts away items they hold."
      },
      {
        name: "Gastro Acid",
        type: "POISON",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 10,
        desc: "The user hurls up its stomach acids on the foe. The fluid negates the effect of the target's Ability."
      },
      {
        name: "Poison Gas",
        type: "POISON",
        cls: "Status",
        pow: "—",
        acc: 90,
        pp: 40,
        desc: "A cloud of poison gas is sprayed in the face of opposing Pokémon. It may poison those hit."
      },
      {
        name: "Poison Powder",
        type: "POISON",
        cls: "Status",
        pow: "—",
        acc: 75,
        pp: 35,
        desc: "The user scatters a cloud of poisonous dust on the target. It may poison the target."
      },
      {
        name: "Purify",
        type: "POISON",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user heals the target's status condition. If so, it also restores the user's own HP."
      },
      {
        name: "Toxic",
        type: "POISON",
        cls: "Status",
        pow: "—",
        acc: 90,
        pp: 10,
        desc: "A move that leaves the target badly poisoned. Its poison damage worsens every turn."
      },
      {
        name: "Toxic Spikes",
        type: "POISON",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user lays a trap of poison spikes at the foe's feet. They poison foes that switch into battle."
      },
      {
        name: "Toxic Thread",
        type: "POISON",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "The user shoots poisonous threads to poison the target and lower the target's Speed stat."
      },
      {
        name: "Venom Drench",
        type: "POISON",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "Foes are drenched in an odd liquid that lowers the Attack, Sp. Atk, and Speed of poisoned Pokémon."
      },
      {
        name: "Prismatic Laser",
        type: "LIGHT",
        cls: "Special",
        pow: 160,
        acc: 100,
        pp: 10,
        desc: "The user shoots powerful lasers using the power of a prism. The user can't move on the next turn."
      },
      {
        name: "Psycho Boost",
        type: "PSYCHIC",
        cls: "Special",
        pow: 140,
        acc: 90,
        pp: 5,
        desc: "The user attacks the target at full power. The attack's recoil harshly reduces the user's Sp. Atk stat."
      },
      {
        name: "Future Sight",
        type: "PSYCHIC",
        cls: "Special",
        pow: 120,
        acc: 100,
        pp: 10,
        desc: "Two turns after this move is used, a hunk of psychic energy attacks the target."
      },
      {
        name: "Synchronoise",
        type: "PSYCHIC",
        cls: "Special",
        pow: 120,
        acc: 100,
        pp: 10,
        desc: "Using an odd shock wave, the user damages any Pokémon of the same type as the user."
      },
      {
        name: "Dream Eater",
        type: "PSYCHIC",
        cls: "Special",
        pow: 100,
        acc: 100,
        pp: 15,
        desc: "The user eats the dreams of a sleeping foe. It absorbs half the damage caused to heal the user's HP."
      },
      {
        name: "Photon Geyser",
        type: "PSYCHIC",
        cls: "Special",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "The user attacks with a pillar of light. This move the higher of the user's Attack or Sp. Atk stat."
      },
      {
        name: "Psystrike",
        type: "PSYCHIC",
        cls: "Special",
        pow: 100,
        acc: 100,
        pp: 10,
        desc: "The user materializes an odd psychic wave to attack the target. This attack does physical damage."
      },
      {
        name: "Freezing Glare",
        type: "PSYCHIC",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user shoots its psychic power from its eyes to attack. This may also leave the target frozen."
      },
      {
        name: "Psychic",
        type: "PSYCHIC",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The target is hit by a strong telekinetic force. It may also reduce the target's Sp. Def stat."
      },
      {
        name: "Psychic Fangs",
        type: "PSYCHIC",
        cls: "Physical",
        pow: 85,
        acc: 100,
        pp: 10,
        desc: "The user bites the target using psychic capabilities. This can also destroy Light Screen and Reflect."
      },
      {
        name: "Eerie Spell",
        type: "PSYCHIC",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 5,
        desc: "The user attacks with tremendous psychic power. This also removes 3 PP from the target's last move."
      },
      {
        name: "Expanding Force",
        type: "PSYCHIC",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user attacks the target with psychic power. Powers up and hits all foes on Psychic Terrain."
      },
      {
        name: "Extrasensory",
        type: "PSYCHIC",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 20,
        desc: "The user attacks with an odd, unseeable power. It may also make the target flinch."
      },
      {
        name: "Hyperspace Hole",
        type: "COSMIC",
        cls: "Special",
        pow: 80,
        acc: "—",
        pp: 5,
        desc: "Using a hyperspace hole, the user appears right next to the target and strikes. Skips protections."
      },
      {
        name: "Psyshock",
        type: "PSYCHIC",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user materializes an odd psychic wave to attack the target. This attack does physical damage."
      },
      {
        name: "Zen Headbutt",
        type: "PSYCHIC",
        cls: "Physical",
        pow: 80,
        acc: 90,
        pp: 15,
        desc: "The user focuses its willpower to its head and attacks the foe. It may also make the target flinch."
      },
      {
        name: "Luster Purge",
        type: "LIGHT",
        cls: "Special",
        pow: 70,
        acc: 100,
        pp: 5,
        desc: "The user lets loose a damaging burst of light. It may also reduce the target's Sp. Def stat."
      },
      {
        name: "Mist Ball",
        type: "PSYCHIC",
        cls: "Special",
        pow: 70,
        acc: 100,
        pp: 5,
        desc: "A mistlike flurry of down envelops and damages the target. It may also lower the target's Sp. Atk."
      },
      {
        name: "Psycho Cut",
        type: "PSYCHIC",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 20,
        desc: "The user tears at the target with blades formed by psychic power. Critical hits land more easily."
      },
      {
        name: "Psybeam",
        type: "PSYCHIC",
        cls: "Special",
        pow: 65,
        acc: 100,
        pp: 20,
        desc: "The target is attacked with a peculiar ray. It may also cause confusion."
      },
      {
        name: "Heart Stamp",
        type: "PSYCHIC",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 25,
        desc: "The user unleashes a vicious blow after its cute act makes the foe less wary. It may also cause flinching."
      },
      {
        name: "Confusion",
        type: "PSYCHIC",
        cls: "Special",
        pow: 50,
        acc: 100,
        pp: 25,
        desc: "The target is hit by a weak telekinetic force. It may also leave the target confused."
      },
      {
        name: "Stored Power",
        type: "PSYCHIC",
        cls: "Special",
        pow: 20,
        acc: 100,
        pp: 10,
        desc: "The user attacks with stored power. The more the user's stats are raised, the greater the damage."
      },
      {
        name: "Mirror Coat",
        type: "PSYCHIC",
        cls: "Special",
        pow: 1,
        acc: 100,
        pp: 20,
        desc: "A retaliation move that counters any special attack, inflicting double the damage taken."
      },
      {
        name: "Psywave",
        type: "PSYCHIC",
        cls: "Special",
        pow: 1,
        acc: 100,
        pp: 15,
        desc: "The target is attacked with an odd psychic wave. The attack varies in intensity."
      },
      {
        name: "Agility",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "The user relaxes and lightens its body to move faster. It sharply boosts the Speed stat."
      },
      {
        name: "Ally Switch",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user teleports using a strange power and switches its place with one of its allies."
      },
      {
        name: "Amnesia",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user temporarily empties its mind to forget its concerns. It sharply raises the user's Sp. Def stat."
      },
      {
        name: "Barrier",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user throws up a sturdy wall that sharply raises its Defense stat."
      },
      {
        name: "Calm Mind",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user quietly focuses its mind and calms its spirit to raise its Sp. Atk and Sp. Def stats."
      },
      {
        name: "Cosmic Power",
        type: "COSMIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user absorbs a mystical power from space to raise its Defense and Sp. Def stats."
      },
      {
        name: "Gravity",
        type: "COSMIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "Gravity is intensified for five turns, making moves involving flying unusable and negating Levitation."
      },
      {
        name: "Guard Split",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user employs its psychic power to average its Defense and Sp. Def stats with those of its target."
      },
      {
        name: "Guard Swap",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user employs its psychic power to switch changes to its Defense and Sp. Def with the target."
      },
      {
        name: "Heal Block",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "For five turns, the foe is prevented from using any moves, Abilities, or held items that recover HP."
      },
      {
        name: "Heal Pulse",
        type: "LIGHT",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user emits a healing pulse which restores the target's HP by up to half of its max HP."
      },
      {
        name: "Healing Wish",
        type: "LIGHT",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user faints. In return, the Pokémon taking its place will have its HP restored and status cured."
      },
      {
        name: "Heart Swap",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user employs its psychic power to switch stat changes with the target."
      },
      {
        name: "Hypnosis",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: 60,
        pp: 20,
        desc: "The user employs hypnotic suggestion to make the target fall into a deep sleep."
      },
      {
        name: "Imprison",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "If the foe knows any move also known by the user, the foe is prevented from using it."
      },
      {
        name: "Instruct",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user instructs the target to use the target's last move again."
      },
      {
        name: "Kinesis",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: 80,
        pp: 15,
        desc: "The user distracts the target by bending a spoon. It lowers the target's accuracy."
      },
      {
        name: "Light Screen",
        type: "LIGHT",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "A wondrous wall of light is put up to suppress damage from special attacks for five turns."
      },
      {
        name: "Lunar Dance",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user faints. In return, the Pokémon taking its place will have its status and HP fully restored."
      },
      {
        name: "Magic Coat",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "A barrier reflects back to the target moves like Leech Seed and moves that damage status."
      },
      {
        name: "Magic Powder",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "The user scatters a cloud of magic powder that changes the target to Psychic type."
      },
      {
        name: "Magic Room",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user creates a bizarre area in which Pokémon's held items lose their effects for five turns."
      },
      {
        name: "Meditate",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 40,
        desc: "The user meditates to awaken the power deep within its body and raise its Attack stat."
      },
      {
        name: "Miracle Eye",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 40,
        desc: "Enables the user to hit a Dark type with any type of move. It also enables the user to hit an evasive foe."
      },
      {
        name: "Power Split",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user employs its psychic power to average its Attack and Sp. Atk stats with those of the target."
      },
      {
        name: "Power Swap",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user employs its psychic power to switch changes to its Attack and Sp. Atk with the target."
      },
      {
        name: "Power Trick",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user employs its psychic power to switch its Attack with its Defense stat."
      },
      {
        name: "Psychic Terrain",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "Protects grounded Pokémon from priority moves and powers up Psychic-type moves for five turns."
      },
      {
        name: "Psycho Shift",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 10,
        desc: "Using its psychic power of suggestion, the user transfers its status problems to the target."
      },
      {
        name: "Reflect",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "A wondrous wall of light is put up to suppress damage from physical attacks for five turns."
      },
      {
        name: "Rest",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user goes to sleep for two turns. It fully restores the user's HP and heals any status problem."
      },
      {
        name: "Role Play",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user mimics the target completely, copying the target's natural Ability."
      },
      {
        name: "Skill Swap",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user employs its psychic power to exchange Abilities with the target."
      },
      {
        name: "Speed Swap",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user exchanges Speed stats with the target."
      },
      {
        name: "Telekinesis",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user makes the target float with its psychic power. The target is easier to hit for three turns."
      },
      {
        name: "Teleport",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user switches place with a party Pokémon. Also warps to the last Pokémon Center visited."
      },
      {
        name: "Trick",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 10,
        desc: "The user catches the target off guard and swaps its held item with its own."
      },
      {
        name: "Trick Room",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user creates a bizarre area in which slower Pokémon get to move first for five turns."
      },
      {
        name: "Wonder Room",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user creates a bizarre area in which Pokémon's Defense and Sp. Def stats are swapped for 5 turns."
      },
      {
        name: "Head Smash",
        type: "ROCK",
        cls: "Physical",
        pow: 150,
        acc: 80,
        pp: 5,
        desc: "The user attacks the foe with a hazardous, full-power headbutt. The user also takes terrible damage."
      },
      {
        name: "Rock Wrecker",
        type: "ROCK",
        cls: "Physical",
        pow: 150,
        acc: 90,
        pp: 5,
        desc: "The user launches a huge boulder at the target to attack. It must rest on the next turn, however."
      },
      {
        name: "Meteor Beam",
        type: "COSMIC",
        cls: "Special",
        pow: 120,
        acc: 90,
        pp: 10,
        desc: "Gathers space power and boosts its Sp. Atk stat on the first turn, attacks on the next turn."
      },
      {
        name: "Diamond Storm",
        type: "ROCK",
        cls: "Physical",
        pow: 100,
        acc: 95,
        pp: 5,
        desc: "The user whips up a storm of diamonds to damage foes. This may also sharply raise the user's Defense stat."
      },
      {
        name: "Stone Edge",
        type: "ROCK",
        cls: "Physical",
        pow: 100,
        acc: 80,
        pp: 5,
        desc: "The user stabs the foe with sharpened stones from below. It has a high critical-hit ratio."
      },
      {
        name: "Power Gem",
        type: "ROCK",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 20,
        desc: "The user attacks with a ray of light that sparkles as if it were made of gemstones."
      },
      {
        name: "Rock Slide",
        type: "ROCK",
        cls: "Physical",
        pow: 75,
        acc: 90,
        pp: 10,
        desc: "Large boulders are hurled at the foes to inflict damage. It may also make the targets flinch."
      },
      {
        name: "Ancient Power",
        type: "ROCK",
        cls: "Special",
        pow: 60,
        acc: 100,
        pp: 5,
        desc: "The user attacks with a prehistoric power. It may also raise all the user's stats at once."
      },
      {
        name: "Rock Tomb",
        type: "ROCK",
        cls: "Physical",
        pow: 60,
        acc: 95,
        pp: 15,
        desc: "Boulders are hurled at the target. It also lowers the target's Speed by preventing its movement."
      },
      {
        name: "Rock Throw",
        type: "ROCK",
        cls: "Physical",
        pow: 50,
        acc: 90,
        pp: 15,
        desc: "The user picks up and throws a small rock at the target to attack."
      },
      {
        name: "Smack Down",
        type: "ROCK",
        cls: "Physical",
        pow: 50,
        acc: 100,
        pp: 15,
        desc: "The user throws a stone or projectile to attack. A flying Pokémon will fall to the ground when hit."
      },
      {
        name: "Accelerock",
        type: "ROCK",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 20,
        desc: "The user smashes into the target at high speed. This move always goes first."
      },
      {
        name: "Rollout",
        type: "ROCK",
        cls: "Physical",
        pow: 30,
        acc: 90,
        pp: 20,
        desc: "The user continually rolls into the target over five turns. It becomes stronger each time it hits."
      },
      {
        name: "Rock Blast",
        type: "ROCK",
        cls: "Physical",
        pow: 25,
        acc: 90,
        pp: 10,
        desc: "The user hurls hard rocks at the target. Two to five rocks are launched in quick succession."
      },
      {
        name: "Rock Polish",
        type: "ROCK",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user polishes its body to reduce drag. It can sharply raise the Speed stat."
      },
      {
        name: "Sandstorm",
        type: "ROCK",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "Summons a five-turn sandstorm to hurt all combatants except the Rock, Ground, and Steel types."
      },
      {
        name: "Stealth Rock",
        type: "ROCK",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user lays a trap of levitating stones around the foe. The trap hurts foes that switch into battle."
      },
      {
        name: "Tar Shot",
        type: "ROCK",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 15,
        desc: "Pours sticky tar over the target, lowering its Speed and making it weaker to Fire-type moves."
      },
      {
        name: "Wide Guard",
        type: "ROCK",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user and its allies are protected from wide-ranging attacks for a turn. May fail if used in succession."
      },
      {
        name: "Doom Desire",
        type: "STEEL",
        cls: "Special",
        pow: 140,
        acc: 100,
        pp: 5,
        desc: "Two turns after this move is used, the user blasts the target with a concentrated bundle of light."
      },
      {
        name: "Steel Beam",
        type: "STEEL",
        cls: "Special",
        pow: 140,
        acc: 95,
        pp: 5,
        desc: "The user fires a beam of steel that it collected from its entire body. This also damages the user."
      },
      {
        name: "Steel Roller",
        type: "STEEL",
        cls: "Physical",
        pow: 130,
        acc: 100,
        pp: 5,
        desc: "The user attacks while destroying the terrain. This move fails when the ground isn't a terrain."
      },
      {
        name: "Behemoth Bash",
        type: "STEEL",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "The user becomes a gigantic shield and slams into the target."
      },
      {
        name: "Behemoth Blade",
        type: "STEEL",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "The user becomes a gigantic sword and cuts the target."
      },
      {
        name: "Iron Tail",
        type: "STEEL",
        cls: "Physical",
        pow: 100,
        acc: 75,
        pp: 15,
        desc: "The target is slammed with a steel-hard tail. It may also lower the target's Defense stat."
      },
      {
        name: "Sunsteel Strike",
        type: "STEEL",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "The user slams into the target with the force of a meteor. Can't be stopped by the target's Ability."
      },
      {
        name: "Meteor Mash",
        type: "COSMIC",
        cls: "Physical",
        pow: 90,
        acc: 90,
        pp: 10,
        desc: "The target is hit with a hard punch fired like a meteor. It may also raise the user's Attack."
      },
      {
        name: "Anchor Shot",
        type: "STEEL",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 20,
        desc: "The user entangles the target with its anchor chain. The target becomes unable to flee."
      },
      {
        name: "Flash Cannon",
        type: "LIGHT",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user gathers all its light energy and releases it at once. It may also lower the target's Sp. Def stat."
      },
      {
        name: "Iron Head",
        type: "STEEL",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The foe slams the target with its steel-hard head. It may also make the target flinch."
      },
      {
        name: "Smart Strike",
        type: "STEEL",
        cls: "Physical",
        pow: 70,
        acc: "—",
        pp: 10,
        desc: "The user stabs the target with a sharp horn. This attack never misses."
      },
      {
        name: "Steel Wing",
        type: "STEEL",
        cls: "Physical",
        pow: 70,
        acc: 90,
        pp: 25,
        desc: "The target is hit with wings of steel. It may also raise the user's Defense stat."
      },
      {
        name: "Double Iron Bash",
        type: "STEEL",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 5,
        desc: "The user rotates, centering the hex nut in its chest, and then strikes twice. May cause flinching."
      },
      {
        name: "Mirror Shot",
        type: "LIGHT",
        cls: "Special",
        pow: 65,
        acc: 85,
        pp: 10,
        desc: "The user looses a flash of energy from its polished body. It may also lower the target's accuracy."
      },
      {
        name: "Magnet Bomb",
        type: "STEEL",
        cls: "Physical",
        pow: 60,
        acc: "—",
        pp: 20,
        desc: "The user launches steel bombs that stick to the target. This attack will not miss."
      },
      {
        name: "Gear Grind",
        type: "STEEL",
        cls: "Physical",
        pow: 50,
        acc: 85,
        pp: 15,
        desc: "The user attacks by throwing two steel gears at its target."
      },
      {
        name: "Metal Claw",
        type: "STEEL",
        cls: "Physical",
        pow: 50,
        acc: 95,
        pp: 35,
        desc: "The target is raked with steel claws. It may also raise the user's Attack stat."
      },
      {
        name: "Bullet Punch",
        type: "STEEL",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 30,
        desc: "The user strikes the target with tough punches as fast as bullets. This move always goes first."
      },
      {
        name: "Gyro Ball",
        type: "STEEL",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 5,
        desc: "The user tackles the target with a high-speed spin. The slower the user, the greater the damage."
      },
      {
        name: "Heavy Slam",
        type: "STEEL",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 10,
        desc: "The user slams into the foe with its heavy body. The heavier the user, the greater the damage."
      },
      {
        name: "Metal Burst",
        type: "STEEL",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 10,
        desc: "The user retaliates with much greater power against the target that last inflicted damage on it."
      },
      {
        name: "Autotomize",
        type: "STEEL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user sheds part of its body to make itself lighter and sharply raise its Speed stat."
      },
      {
        name: "Gear Up",
        type: "STEEL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user engages its gears to raise the Attack and Sp. Atk of allies with the Plus or Minus Ability."
      },
      {
        name: "Iron Defense",
        type: "STEEL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user hardens its body's surface like iron, sharply raising its Defense stat."
      },
      {
        name: "King's Shield",
        type: "STEEL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "Protects itself from damage. It also harshly lowers the Attack of attackers that make contact."
      },
      {
        name: "Metal Sound",
        type: "STEEL",
        cls: "Status",
        pow: "—",
        acc: 85,
        pp: 40,
        desc: "A horrible sound like scraping metal harshly reduces the target's Sp. Def stat."
      },
      {
        name: "Shift Gear",
        type: "STEEL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user rotates its gears, raising its Attack and sharply raising its Speed."
      },
      {
        name: "Hydro Cannon",
        type: "WATER",
        cls: "Special",
        pow: 150,
        acc: 90,
        pp: 5,
        desc: "The target is hit with a watery blast. The user must rest on the next turn, however."
      },
      {
        name: "Water Spout",
        type: "WATER",
        cls: "Special",
        pow: 150,
        acc: 100,
        pp: 5,
        desc: "The user spouts water to damage the foe. The lower the user's HP, the less powerful it becomes."
      },
      {
        name: "Hydro Pump",
        type: "WATER",
        cls: "Special",
        pow: 110,
        acc: 80,
        pp: 5,
        desc: "The target is blasted by a huge volume of water launched under great pressure."
      },
      {
        name: "Origin Pulse",
        type: "WATER",
        cls: "Special",
        pow: 110,
        acc: 85,
        pp: 10,
        desc: "The user attacks opposing Pokémon with countless beams of light that glow a deep and brilliant blue."
      },
      {
        name: "Steam Eruption",
        type: "WATER",
        cls: "Special",
        pow: 110,
        acc: 95,
        pp: 5,
        desc: "The user immerses the target in superheated steam. This may also leave the target with a burn."
      },
      {
        name: "Crabhammer",
        type: "WATER",
        cls: "Physical",
        pow: 100,
        acc: 90,
        pp: 10,
        desc: "The target is hammered with a large pincer. Critical hits land more easily."
      },
      {
        name: "Aqua Tail",
        type: "WATER",
        cls: "Physical",
        pow: 90,
        acc: 90,
        pp: 10,
        desc: "The user attacks by swinging its tail as if it were a vicious wave in a raging storm."
      },
      {
        name: "Muddy Water",
        type: "WATER",
        cls: "Special",
        pow: 90,
        acc: 85,
        pp: 10,
        desc: "The user attacks by shooting muddy water at the opposing team. It may also lower the target's accuracy."
      },
      {
        name: "Sparkling Aria",
        type: "WATER",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user bursts into song, emitting many bubbles. Any burnt Pokémon will be healed by these bubbles."
      },
      {
        name: "Surf",
        type: "WATER",
        cls: "Special",
        pow: 90,
        acc: 100,
        pp: 15,
        desc: "It swamps the area around the user with a giant wave. It can also be used for crossing water."
      },
      {
        name: "Fishious Rend",
        type: "WATER",
        cls: "Physical",
        pow: 85,
        acc: 100,
        pp: 10,
        desc: "The user rends the target with its hard gills. Power doubles if the user moves first."
      },
      {
        name: "Liquidation",
        type: "WATER",
        cls: "Physical",
        pow: 85,
        acc: 100,
        pp: 10,
        desc: "The user slams into the target using a full-force blast of water. May lower the target's Defense."
      },
      {
        name: "Dive",
        type: "WATER",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "Diving on the first turn, the user rises and hits on the next turn. It can be used to dive in the ocean."
      },
      {
        name: "Scald",
        type: "WATER",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user shoots boiling hot water at its target. It may also leave the target with a burn."
      },
      {
        name: "Snipe Shot",
        type: "WATER",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user ignores any effects that redirect moves, allowing this move to hit the chosen target."
      },
      {
        name: "Water Pledge",
        type: "WATER",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "A column of water strikes the target. When combined with its fire equivalent, it makes a rainbow."
      },
      {
        name: "Waterfall",
        type: "WATER",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user charges at the target and may make it flinch. It can also be used to climb a waterfall."
      },
      {
        name: "Razor Shell",
        type: "WATER",
        cls: "Physical",
        pow: 75,
        acc: 95,
        pp: 10,
        desc: "The user cuts the foe with sharp shells. It may also lower the target's Defense stat."
      },
      {
        name: "Brine",
        type: "WATER",
        cls: "Special",
        pow: 65,
        acc: 100,
        pp: 10,
        desc: "If the target's HP is down to about half, this attack will hit with double the power."
      },
      {
        name: "Bubble Beam",
        type: "WATER",
        cls: "Special",
        pow: 65,
        acc: 100,
        pp: 20,
        desc: "A spray of bubbles is forcefully ejected at the target. It may also lower its Speed stat."
      },
      {
        name: "Octazooka",
        type: "WATER",
        cls: "Special",
        pow: 65,
        acc: 85,
        pp: 10,
        desc: "The user attacks by spraying ink in the foe's face or eyes. It may also lower the target's accuracy."
      },
      {
        name: "Flip Turn",
        type: "WATER",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 20,
        desc: "After making its attack, the user rushes back to switch places with a party Pokémon in waiting."
      },
      {
        name: "Water Pulse",
        type: "WATER",
        cls: "Special",
        pow: 60,
        acc: 100,
        pp: 20,
        desc: "The user attacks the target with a pulsing blast of water. It may also confuse the target."
      },
      {
        name: "Aqua Jet",
        type: "WATER",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 20,
        desc: "The user lunges at the target at a speed that makes it almost invisible. It is sure to strike first."
      },
      {
        name: "Bubble",
        type: "WATER",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 30,
        desc: "A spray of countless bubbles is jetted at the opposing team. It may also lower the targets' Speed stats."
      },
      {
        name: "Water Gun",
        type: "WATER",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 25,
        desc: "The target is blasted with a forceful shot of water."
      },
      {
        name: "Clamp",
        type: "WATER",
        cls: "Physical",
        pow: 35,
        acc: 85,
        pp: 15,
        desc: "The target is clamped and squeezed by the user's very thick and sturdy shell for four to five turns."
      },
      {
        name: "Whirlpool",
        type: "WATER",
        cls: "Special",
        pow: 35,
        acc: 85,
        pp: 15,
        desc: "Traps foes in a violent swirling whirlpool for four to five turns."
      },
      {
        name: "Surging Strikes",
        type: "WATER",
        cls: "Physical",
        pow: 25,
        acc: 100,
        pp: 5,
        desc: "Hits three times in a row with mastery of the Water style. This attack always deals critical hits."
      },
      {
        name: "Water Shuriken",
        type: "WATER",
        cls: "Special",
        pow: 15,
        acc: 100,
        pp: 20,
        desc: "The user hits the target with throwing stars 2-5 times in a row. This move always goes first."
      },
      {
        name: "Aqua Ring",
        type: "WATER",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 20,
        desc: "The user envelops itself in a veil made of water. It regains some HP on every turn."
      },
      {
        name: "Life Dew",
        type: "WATER",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user scatters mysterious water around and restores the HP of itself and its allies."
      },
      {
        name: "Rain Dance",
        type: "WATER",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user summons a heavy rain that falls for five turns, powering up Water-type moves."
      },
      {
        name: "Soak",
        type: "WATER",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 20,
        desc: "The user shoots a torrent of water at the target and changes the target's type to Water."
      },
      {
        name: "Water Sport",
        type: "WATER",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user soaks itself with water. The move weakens Fire-type moves while the user is in the battle."
      },
      {
        name: "Withdraw",
        type: "WATER",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 40,
        desc: "The user withdraws its body into its hard shell, raising its Defense stat."
      },
      {
        name: "Swift",
        type: "NORMAL",
        cls: "Special",
        pow: 60,
        acc: "—",
        pp: 20,
        desc: "Star-shaped rays are shot at the opposing team. This attack never misses."
      },
      {
        name: "Star Shot",
        type: "COSMIC",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 30,
        desc: "Charges up cosmic energy to release a shooting star."
      },
      {
        name: "Orbital Laser",
        type: "COSMIC",
        cls: "Special",
        pow: 90,
        acc: 95,
        pp: 20,
        desc: "Summons an intergalactic orbital laser, a large beam comes from the sky."
      },
      {
        name: "Twilight Pulse",
        type: "LIGHT",
        cls: "Special",
        pow: 70,
        acc: 95,
        pp: 20,
        desc: "Pulses a Bright Light that quickly turns dark. Has a 20% Chance to Flinch"
      },
      {
        name: "Content Farm",
        type: "ELECTRIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 7,
        desc: "You revitalize your strength by making a new Video once a day."
      },
      {
        name: "FOR YOU!!",
        type: "PSYCHIC",
        cls: "Special",
        pow: 100,
        acc: 100,
        pp: 10,
        desc: "The target is attacked with a peculiar ray. It may also cause confusion."
      },
      {
        name: "Astral Sign",
        type: "COSMIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 30,
        desc: "Raises attack or defense if self is targeted. Lowers attack or defense targeted another."
      },
      {
        name: "Shell Burst",
        type: "COSMIC",
        cls: "Special",
        pow: 130,
        acc: 100,
        pp: 5,
        desc: "Can only be used when Cosmic type. User loses Cosmic typing after use."
      },
      {
        name: "Revaling Light",
        type: "LIGHT",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 30,
        desc: "After dealing damage, reveal the target's held item."
      },
      {
        name: "Poizap Dart",
        type: "POISON",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 10,
        desc: "If they move faster it has a chance of poisioning or paralysis, if it's slower it's a priority move with half the damage."
      },
      {
        name: "Dire Claw",
        type: "POISON",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user may critically hit with its ruinous claws. May also leave the target poisoned, paralyzed, or asleep."
      },
      {
        name: "Springtide Storm",
        type: "FAIRY",
        cls: "Special",
        pow: 100,
        acc: 80,
        pp: 5,
        desc: "The user wraps winds of fierce emotion around opponents. This may lower their Attack stats."
      },
      {
        name: "Raging Fury",
        type: "FIRE",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 10,
        desc: "The user rampages around spewing flames for two to three turns. The user then becomes confused."
      },
      {
        name: "Wave Crash",
        type: "WATER",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 10,
        desc: "The user shrouds itself in water and slams into the target. This also damages the user."
      },
      {
        name: "Chloroblast",
        type: "GRASS",
        cls: "Special",
        pow: 150,
        acc: 95,
        pp: 5,
        desc: "The user launches its amassed chlorophyll to inflict damage on the target. This also damages the user."
      },
      {
        name: "Mountain Gale",
        type: "ICE",
        cls: "Physical",
        pow: 100,
        acc: 85,
        pp: 10,
        desc: "The user hurls giant chunks of ice at the target. This may also make the target flinch."
      },
      {
        name: "Headlong Rush",
        type: "GROUND",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 5,
        desc: "The user rams into the target in a full-body tackle. This lowers the user’s Defense and Sp. Def stats."
      },
      {
        name: "Barb Barrage",
        type: "POISON",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 10,
        desc: "Fires toxic barbs which may poison the target. Power is doubled if the target is poisoned."
      },
      {
        name: "Esper Wing",
        type: "PSYCHIC",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user slashes with aura-enriched wings which boosts its Speed stat. Critical hits land more easily."
      },
      {
        name: "Bitter Malice",
        type: "GHOST",
        cls: "Special",
        pow: 75,
        acc: 100,
        pp: 10,
        desc: "The user attacks the target with spine-chilling resentment. This also lowers the target’s Attack stat."
      },
      {
        name: "Triple Arrows",
        type: "FIGHTING",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user fires arrows which may lower the target’s Defense or make it flinch. Critical hits land more easily."
      },
      {
        name: "Bleakwind Storm",
        type: "FLYING",
        cls: "Special",
        pow: 100,
        acc: 80,
        pp: 10,
        desc: "The user attacks with cold winds that cause opposing Pokémon to tremble. This may lower their Speed stats."
      },
      {
        name: "Wildbolt Storm",
        type: "ELECTRIC",
        cls: "Special",
        pow: 100,
        acc: 80,
        pp: 10,
        desc: "The user attacks opposing Pokémon with a thunderous tempest. This may also leave them paralyzed."
      },
      {
        name: "Sandsear Storm",
        type: "GROUND",
        cls: "Special",
        pow: 100,
        acc: 80,
        pp: 10,
        desc: "The user wraps fierce winds and hot sand around opponents. This may leave them with a burn."
      },
      {
        name: "Lunar Blessing",
        type: "COSMIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 5,
        desc: "The user is blessed by the moon, restoring HP and curing status conditions of itself and allies."
      },
      {
        name: "Psyshield Bash",
        type: "PSYCHIC",
        cls: "Physical",
        pow: 70,
        acc: 90,
        pp: 10,
        desc: "Cloaking itself in psychic energy, the user slams into the target. This raises the user’s Defense."
      },
      {
        name: "Power Shift",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user swaps its Attack and Defense stats."
      },
      {
        name: "Stone Axe",
        type: "ROCK",
        cls: "Physical",
        pow: 65,
        acc: 90,
        pp: 15,
        desc: "The user swings at the opponent with its stone axes. May leave floating rocks around the target."
      },
      {
        name: "Mystical Power",
        type: "PSYCHIC",
        cls: "Special",
        pow: 70,
        acc: 90,
        pp: 10,
        desc: "The user attacks by emitting a mysterious power. This also boosts the user’s Sp. Atk stat."
      },
      {
        name: "Victory Dance",
        type: "FIGHTING",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user performs an intense dance to usher in victory, raising its Attack, Defense, and Speed."
      },
      {
        name: "Shelter",
        type: "STEEL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user makes its skin as hard as an iron shield, sharply boosting its Defense stat."
      },
      {
        name: "Infernal Parade",
        type: "GHOST",
        cls: "Special",
        pow: 60,
        acc: 100,
        pp: 15,
        desc: "Hurls fireballs which may cause burns. Power is doubled if the target has a status condition."
      },
      {
        name: "Ceaseless Edge",
        type: "DARK",
        cls: "Physical",
        pow: 65,
        acc: 90,
        pp: 15,
        desc: "The user slashes the opponent with its shell blade. May leave spikes around the target."
      },
      {
        name: "Take Heart",
        type: "PSYCHIC",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user lifts its spirits, curing its own status conditions and boosting its Sp. Atk and Sp. Def stats."
      },
      {
        name: "Aqua Cutter",
        type: "WATER",
        cls: "Physical",
        pow: 70,
        acc: 100,
        pp: 20,
        desc: "The user expels pressurized water to cut at the target like a blade. Critical hits land more easily."
      },
      {
        name: "Aqua Step",
        type: "WATER",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user attacks the target using light and fluid dance steps. This also boosts the user’s Speed stat."
      },
      {
        name: "Armor Cannon",
        type: "FIRE",
        cls: "Special",
        pow: 120,
        acc: 100,
        pp: 5,
        desc: "The user shoots its own armor out as blazing projectiles. This lowers the user’s Defense and Sp. Def."
      },
      {
        name: "Axe Kick",
        type: "FIGHTING",
        cls: "Physical",
        pow: 120,
        acc: 90,
        pp: 10,
        desc: "Performs a downward kick which may confuse the target. The user takes damage if it misses."
      },
      {
        name: "Bitter Blade",
        type: "FIRE",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "A spiteful slashing attack. The user’s HP is restored by up to half the damage taken by the target."
      },
      {
        name: "Blazing Torque",
        type: "FIRE",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "This move is only used by a Starmobile. It may leave the target with a burn."
      },
      {
        name: "Chilling Water",
        type: "WATER",
        cls: "Special",
        pow: 50,
        acc: 100,
        pp: 20,
        desc: "The user showers the target with frigid water. This also lowers the target's Attack stat."
      },
      {
        name: "Chilly Reception",
        type: "ICE",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user tells a chillingly bad joke and switches out. This summons a snowstorm lasting five turns."
      },
      {
        name: "Collision Course",
        type: "FIGHTING",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "A massive prehistoric explosion. This move’s power is boosted more than usual if it’s a supereffective hit."
      },
      {
        name: "Combat Torque",
        type: "FIGHTING",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 10,
        desc: "This move is only used by a Starmobile. It may paralyze the target."
      },
      {
        name: "Comeuppance",
        type: "DARK",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 10,
        desc: "The user retaliates with much greater force against the opponent that last inflicted damage on it."
      },
      {
        name: "Doodle",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: 100,
        pp: 10,
        desc: "The user captures a quick sketch, changing the Abilities of the user and its allies to the target's."
      },
      {
        name: "Double Shock",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 5,
        desc: "The user attacks by discharging all of its electricity. The user will no longer be Electric type."
      },
      {
        name: "Electro Drift",
        type: "ELECTRIC",
        cls: "Special",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "A futuristic electric strike. This move’s power is boosted more than usual if it’s a supereffective hit."
      },
      {
        name: "Fillet Away",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user sharply boosts its Attack, Sp. Atk, and Speed stats by using its own HP."
      },
      {
        name: "Flower Trick",
        type: "GRASS",
        cls: "Physical",
        pow: 70,
        acc: "—",
        pp: 10,
        desc: "The user throws a rigged bouquet of flowers at the target, which always hits and lands a critical hit."
      },
      {
        name: "Gigaton Hammer",
        type: "STEEL",
        cls: "Physical",
        pow: 160,
        acc: 100,
        pp: 5,
        desc: "The user attacks with its huge hammer. This move can’t be used twice in a row."
      },
      {
        name: "Glaive Rush",
        type: "DRAGON",
        cls: "Physical",
        pow: 120,
        acc: 100,
        pp: 5,
        desc: "The user becomes highly vulnerable to attacks until its next turn after using this move."
      },
      {
        name: "Hyper Drill",
        type: "NORMAL",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "The user spins the pointed part of its body at high speed to pierce the target, ignoring protections."
      },
      {
        name: "Ice Spinner",
        type: "ICE",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user spins into the target with feet covered in thin ice. This also destroys the terrain."
      },
      {
        name: "Jet Punch",
        type: "WATER",
        cls: "Physical",
        pow: 60,
        acc: 100,
        pp: 15,
        desc: "The user summons a torrent around its fist and punches at blinding speed. Always goes first."
      },
      {
        name: "Kowtow Cleave",
        type: "DARK",
        cls: "Physical",
        pow: 85,
        acc: "—",
        pp: 10,
        desc: "The user kowtows to make the target lower its guard, then slashes. This attack never misses."
      },
      {
        name: "Last Respects",
        type: "GHOST",
        cls: "Physical",
        pow: 50,
        acc: 100,
        pp: 10,
        desc: "The user attacks to avenge its allies. The move’s power increases for each defeated ally."
      },
      {
        name: "Lumina Crash",
        type: "LIGHT",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user attacks by unleashing a peculiar, mind-bending light that harshly lowers the target’s Sp. Def."
      },
      {
        name: "Magical Torque",
        type: "FAIRY",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 10,
        desc: "This move is only used by a Starmobile. It may confuse the target."
      },
      {
        name: "Make It Rain",
        type: "STEEL",
        cls: "Special",
        pow: 120,
        acc: 100,
        pp: 5,
        desc: "The user throws out a huge mass of coins, lowering its Sp. Atk stat. Money is earned after the battle."
      },
      {
        name: "Mortal Spin",
        type: "POISON",
        cls: "Physical",
        pow: 30,
        acc: 100,
        pp: 15,
        desc: "Performs a spin that eliminates certain traps and hazards. This also poisons opposing Pokémon."
      },
      {
        name: "Noxious Torque",
        type: "POISON",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 10,
        desc: "This move is only used by a Starmobile. It may poison the target."
      },
      {
        name: "Order Up",
        type: "DRAGON",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "If used when the user has a Tatsugiri in its mouth, a boost occurs based on its form."
      },
      {
        name: "Population Bomb",
        type: "NORMAL",
        cls: "Physical",
        pow: 20,
        acc: 90,
        pp: 10,
        desc: "The user’s fellows gather in droves to perform a combo attack that hits one to ten times in a row."
      },
      {
        name: "Pounce",
        type: "BUG",
        cls: "Physical",
        pow: 50,
        acc: 100,
        pp: 20,
        desc: "The user attacks by pouncing on the target. This also lowers the target’s Speed stat."
      },
      {
        name: "Rage Fist",
        type: "GHOST",
        cls: "Physical",
        pow: 50,
        acc: 100,
        pp: 10,
        desc: "The user converts its rage into energy to attack. The move’s power increases every time the user is hit."
      },
      {
        name: "Raging Bull",
        type: "NORMAL",
        cls: "Physical",
        pow: 90,
        acc: 100,
        pp: 10,
        desc: "The user charges and destroys enemy barriers. This move’s type depends on the user’s form."
      },
      {
        name: "Revival Blessing",
        type: "LIGHT",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 1,
        desc: "The user revives a party Pokémon that has fainted and restores half their max HP."
      },
      {
        name: "Ruination",
        type: "DARK",
        cls: "Special",
        pow: 1,
        acc: 90,
        pp: 10,
        desc: "The user summons a ruinous disaster. This cuts the target’s HP in half."
      },
      {
        name: "Salt Cure",
        type: "ROCK",
        cls: "Physical",
        pow: 40,
        acc: 100,
        pp: 15,
        desc: "The user salt cures the target, inflicting damage every turn. Steel and Water types take more damage."
      },
      {
        name: "Shed Tail",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "The user creates a substitute and switches places with a party Pokémon in waiting."
      },
      {
        name: "Silk Trap",
        type: "BUG",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "User spins a silken trap to protect itself. Lowers the Speed of any that make direct contact."
      },
      {
        name: "Snowscape",
        type: "ICE",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "Summons a five-turn snowstorm that boosts the Defense of Ice-type Pokémon."
      },
      {
        name: "Spicy Extract",
        type: "GRASS",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "Emits a spicy extract which raises the target’s Attack and lowers Defense by two stages each."
      },
      {
        name: "Spin Out",
        type: "STEEL",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "The user inflicts damage on the target with a furious spin. This harshly lowers the user’s Speed."
      },
      {
        name: "Tidy Up",
        type: "NORMAL",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "Clears hazards and substitutes from the field. This also boosts the user’s Attack and Speed."
      },
      {
        name: "Torch Song",
        type: "FIRE",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "The user blows out raging flames as if singing a song. This also boosts the user’s Sp. Atk stat."
      },
      {
        name: "Trailblaze",
        type: "GRASS",
        cls: "Physical",
        pow: 50,
        acc: 100,
        pp: 20,
        desc: "The user attacks suddenly as if leaping out from tall grass. This boosts the user's Speed stat."
      },
      {
        name: "Triple Dive",
        type: "WATER",
        cls: "Physical",
        pow: 30,
        acc: 95,
        pp: 10,
        desc: "The user performs a perfectly timed triple dive, hitting the target three times in a row."
      },
      {
        name: "Twin Beam",
        type: "PSYCHIC",
        cls: "Special",
        pow: 40,
        acc: 100,
        pp: 10,
        desc: "The user shoots mystical beams from its eyes to inflict damage. The target is hit twice in a row."
      },
      {
        name: "Wicked Torque",
        type: "DARK",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "This move is only used by a Starmobile. It may put the target to sleep."
      },
      {
        name: "Hydro Steam",
        type: "WATER",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user blasts the target with boiling-hot water whose power is boosted in harsh sunlight."
      },
      {
        name: "Psyblade",
        type: "PSYCHIC",
        cls: "Physical",
        pow: 80,
        acc: 100,
        pp: 15,
        desc: "The user rends the target with an ethereal blade whose power is boosted on Electric Terrain."
      },
      {
        name: "Blood Moon",
        type: "NORMAL",
        cls: "Special",
        pow: 140,
        acc: 100,
        pp: 5,
        desc: "The user unleashes the full brunt of its spirit from a blood moon. This move can't be used twice in a row."
      },
      {
        name: "Matcha Gotcha",
        type: "GRASS",
        cls: "Special",
        pow: 80,
        acc: 90,
        pp: 15,
        desc: "Blasts opponents with hot tea. Heals the user by half the damage dealt and may also burn targets."
      },
      {
        name: "Syrup Bomb",
        type: "GRASS",
        cls: "Special",
        pow: 60,
        acc: 85,
        pp: 10,
        desc: "An explosion of sticky candy syrup, which drop the target's Speed stat each turn for three turns."
      },
      {
        name: "Ivy Cudgel",
        type: "GRASS",
        cls: "Physical",
        pow: 100,
        acc: 100,
        pp: 10,
        desc: "An ivy-wrapped cudgel strike with a high critical-hit ratio. Type changes based on the user's Mask."
      },
      {
        name: "Electro Shot",
        type: "ELECTRIC",
        cls: "Special",
        pow: 130,
        acc: 100,
        pp: 10,
        desc: "A two-turn attack. The user boosts its Sp. Atk and then fires a high-voltage shot."
      },
      {
        name: "Tera Starstorm",
        type: "NORMAL",
        cls: "Special",
        pow: 120,
        acc: 100,
        pp: 5,
        desc: "When used by Terapagos in its Stellar Form, this move damages all opposing Pokémon."
      },
      {
        name: "Fickle Beam",
        type: "DRAGON",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 5,
        desc: "Sometimes all of the user's heads shoot beams in unison, doubling this move's power."
      },
      {
        name: "Burning Bulwark",
        type: "FIRE",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 10,
        desc: "Protects the user from attacks. Also burns any attacker that makes contact with the user."
      },
      {
        name: "Thunderclap",
        type: "ELECTRIC",
        cls: "Special",
        pow: 70,
        acc: 100,
        pp: 5,
        desc: "This move enables the user to attack first. It fails if the target is not readying an attack, however."
      },
      {
        name: "Mighty Cleave",
        type: "ROCK",
        cls: "Physical",
        pow: 95,
        acc: 100,
        pp: 5,
        desc: "The user cleaves the target. This move hits even if the target protects itself."
      },
      {
        name: "Tachyon Cutter",
        type: "STEEL",
        cls: "Special",
        pow: 50,
        acc: "—",
        pp: 10,
        desc: "The user attacks by launching particle blades at the target twice in a row. This attack never misses."
      },
      {
        name: "Hard Press",
        type: "STEEL",
        cls: "Physical",
        pow: 1,
        acc: 100,
        pp: 10,
        desc: "The target is crushed with great force. The attack is more powerful the more HP the target has left."
      },
      {
        name: "Dragon Cheer",
        type: "DRAGON",
        cls: "Status",
        pow: "—",
        acc: "—",
        pp: 15,
        desc: "The user raises its allies’ critical hit ratio with a draconic cry. This rouses Dragon types more."
      },
      {
        name: "Alluring Voice",
        type: "FAIRY",
        cls: "Special",
        pow: 80,
        acc: 100,
        pp: 10,
        desc: "Attacks using an angelic voice. This confuses the target if its stats have been raised this turn."
      },
      {
        name: "Temper Flare",
        type: "FIRE",
        cls: "Physical",
        pow: 75,
        acc: 100,
        pp: 10,
        desc: "The user attacks driven by frustration. Power increases if the user's previous move failed."
      },
      {
        name: "Supercell Slam",
        type: "ELECTRIC",
        cls: "Physical",
        pow: 100,
        acc: 95,
        pp: 15,
        desc: "The user drops onto the target with its electrified body. If it misses, the user is hurt instead."
      },
      {
        name: "Psychic Noise",
        type: "PSYCHIC",
        cls: "Special",
        pow: 75,
        acc: 100,
        pp: 10,
        desc: "Attacks the target with unpleasant sound waves. Prevents the target from healing for two turns."
      },
      {
        name: "Upper Hand",
        type: "FIGHTING",
        cls: "Physical",
        pow: 65,
        acc: 100,
        pp: 15,
        desc: "An attack that hits first and makes the target flinch. Fails if the target isn't using a high priority move."
      },
      {
        name: "Malignant Chain",
        type: "POISON",
        cls: "Special",
        pow: 100,
        acc: 100,
        pp: 5,
        desc: "Wraps the target in a toxic, corrosive chain. This may also leave the target badly poisoned."
      },
      {
        name: "Nihil Light",
        type: "DRAGON",
        cls: "Special",
        pow: 200,
        acc: 100,
        pp: 10,
        desc: "A powerful light that defies nature, striking Fairy types and ignoring target stat changes."
      },
    { name: 'Fullmoonbind', type: 'COSMIC', cls: 'Physical', pow: 15, acc: 90, pp: 15, desc: 'Damages and binds the enemy each turn for 5 turns. Heal The Damage Dealt' },
    { name: 'Starseeker', type: 'COSMIC', cls: 'Special', pow: 60, acc: 100, pp: 5, desc: 'Deals Damage, and half to the next switch in.' },
    { name: 'Space Dust', type: 'COSMIC', cls: 'Physical', pow: 55, acc: 95, pp: 15, desc: 'Damages and 30% chance to lower accuracy' },
    { name: 'Phaser', type: 'COSMIC', cls: 'Special', pow: 15, acc: 100, pp: 25, desc: '30% to Paralyze Target.' },
    { name: 'Eclipsestrike', type: 'COSMIC', cls: 'Physical', pow: 75, acc: 100, pp: 10, desc: 'Deals double Damage if the user missed last turn.' },
    { name: 'Gammacharge', type: 'COSMIC', cls: 'Status', pow: '—', acc: '—', pp: 5, desc: 'increase SP Atk & Def by one stage' },
    { name: 'Starstorm', type: 'COSMIC', cls: 'Special', pow: 25, acc: 100, pp: 30, desc: 'Ignores Barriers and Screens + multi hit move' },
    { name: 'Zerogravity', type: 'COSMIC', cls: 'Status', pow: '—', acc: '—', pp: 5, desc: 'Pokemon inside will have their speed messed up (134 becomes 431 and 241 becomes 142)' },
    { name: 'Galacticnebula', type: 'COSMIC', cls: 'Special', pow: 110, acc: 80, pp: 5, desc: 'Deals damage ' },
    { name: 'Tractorbeam', type: 'COSMIC', cls: 'Status', pow: '—', acc: '—', pp: 5, desc: 'Prevent the target from fleeing (optional: next move is a guaranteed hit)' },
    { name: 'Revealing Light', type: 'LIGHT', cls: 'Special', pow: 40, acc: 100, pp: 5, desc: 'Deals Damage, and Reveals Held Item' },
    { name: 'Rgbeam', type: 'LIGHT', cls: 'Special', pow: 85, acc: 100, pp: 5, desc: '10% Chance to Blind Target' },
    { name: 'Shiningburst', type: 'LIGHT', cls: 'Special', pow: 80, acc: 95, pp: 5, desc: 'Uses Special Defense Stat' },
    { name: 'Rainbowbolt', type: 'LIGHT', cls: 'Special', pow: 120, acc: 70, pp: 5, desc: 'Can\'t Miss in Rain, 10% Blind Chance' },
    { name: 'Chi Blast', type: 'LIGHT', cls: 'Special', pow: 30, acc: 100, pp: 5, desc: 'Each consecutive use adds 1 Hit, every hit 10% chance to lower spAtk.' },
    { name: 'Brightcannon', type: 'LIGHT', cls: 'Special', pow: 100, acc: 90, pp: 5, desc: 'deals damage, but the user receives 1⁄4 of the damage it inflicted in recoil.' },
    { name: 'Warminglight', type: 'LIGHT', cls: 'Status', pow: '—', acc: '—', pp: 5, desc: 'Restore 1/16% Health, heals both target and teammate' },
    { name: 'Cleansinglight', type: 'LIGHT', cls: 'Status', pow: '—', acc: '—', pp: 5, desc: 'Removes Poison, Paralysis, Burn, Blind, Confusion, Taunt, Sleep from Target' },
    { name: 'Radiantblessing', type: 'LIGHT', cls: 'Status', pow: '—', acc: '—', pp: 5, desc: 'Reduce HP by 50%, on faint raises all stats of next pokemon by 1 stage.' },
    { name: 'Eternalaura', type: 'LIGHT', cls: 'Status', pow: '—', acc: '—', pp: 1, desc: 'No moves will be super effective next 3 turns.' },
    { name: 'Prismpunch', type: 'LIGHT', cls: 'Physical', pow: 40, acc: 100, pp: 5, desc: 'Deals Damage' },
    { name: 'Divineslash', type: 'LIGHT', cls: 'Physical', pow: 60, acc: 100, pp: 5, desc: 'Ignores Defense Boost' },
    { name: 'Shinefang', type: 'LIGHT', cls: 'Physical', pow: 80, acc: 100, pp: 5, desc: '10% chance to Blind Target' },
    { name: 'Flashstep', type: 'LIGHT', cls: 'Physical', pow: 50, acc: 100, pp: 5, desc: 'If attacks first, hits twice' },
    { name: 'Duality', type: 'LIGHT', cls: 'Physical', pow: 100, acc: 100, pp: 10, desc: 'Every turn this move type changes to dark and vice versa. Light -> Dark ->' },
    { name: 'Crystalize', type: 'ROCK', cls: 'Special', pow: 70, acc: 100, pp: 20, desc: 'Super effective against Rock-types' },
    { name: 'Fantasiablast', type: 'FAIRY', cls: 'Special', pow: 95, acc: 100, pp: 15, desc: 'Deals damage and has a 30% chance of lowering the target\'s Special Attack by one stage.' },
    { name: 'Happilyeverafter', type: 'FAIRY', cls: 'Special', pow: 55, acc: 95, pp: 15, desc: 'Damage Doubles if you weren\'t attacked. Priority -1' },
    { name: 'Cupidsbow', type: 'FAIRY', cls: 'Physical', pow: 50, acc: 90, pp: 10, desc: '20% to infatuate target, regardless of gender' },
    { name: 'Moodswing', type: 'PSYCHIC', cls: 'Special', pow: 85, acc: 100, pp: 10, desc: 'Effect based on form. Unhappy: Taunt; Normal: Torment ; Happy: Embargo' },
    { name: 'Cleansing Flames', type: 'FIRE', cls: 'Special', pow: 90, acc: 100, pp: 10, desc: 'Heals the target\'s status condition except Burn. (in doubles: hits both)' },
    { name: 'Sonar Ping', type: 'WATER', cls: 'Special', pow: 50, acc: '—', pp: 10, desc: 'Grows stronger through repeated use. Second time: 100; Third time (cap): 200' },
    { name: 'Divine Gift', type: 'LIGHT', cls: 'Special', pow: 80, acc: 100, pp: 10, desc: 'A Grass/Light technique that raises a random stat of the user.' },
    { name: 'Supernova', type: 'COSMIC', cls: 'Physical', pow: 120, acc: 95, pp: 5, desc: 'Sharply lowers the user\'s Attack after striking. Can hit both targets.' },
    { name: 'Light Speed Dash', type: 'COSMIC', cls: 'Special', pow: 70, acc: 100, pp: 20, desc: 'The user blitzes at lightspeed. Raises the user\'s Speed by one stage.' }
  ];

  // ---- Abilities ---------------------------------------------------------
  const ABILITIES = [
    {
      name: 'Gaia Guardian',
      desc: 'When Grassy Terrain is activated, terraform into its Guardian Form.'
    },
    {
      name: "Stench",
      desc: "The stench may cause the target to flinch.",
      
    },
    {
      name: "Drizzle",
      desc: "The Pokémon makes it rain if it appears in battle."
    },
    {
      name: "Speed Boost",
      desc: "Its Speed stat is gradually boosted."
    },
    {
      name: "Battle Armor",
      desc: "The Pokémon is protected against critical hits."
    },
    {
      name: "Sturdy",
      desc: "It cannot be knocked out with one hit."
    },
    {
      name: "Damp",
      desc: "Prevents the use of self-destructing moves."
    },
    {
      name: "Limber",
      desc: "The Pokémon is protected from paralysis."
    },
    {
      name: "Sand Veil",
      desc: "Boosts the Pokémon's evasion in a sandstorm."
    },
    {
      name: "Static",
      desc: "Contact with the Pokémon may cause paralysis."
    },
    {
      name: "Volt Absorb",
      desc: "Restores HP if hit by an Electric-type move."
    },
    {
      name: "Water Absorb",
      desc: "Restores HP if hit by a Water-type move."
    },
    {
      name: "Oblivious",
      desc: "Prevents it from becoming infatuated."
    },
    {
      name: "Cloud Nine",
      desc: "Eliminates the effects of weather."
    },
    {
      name: "Compound Eyes",
      desc: "The Pokémon's accuracy is boosted."
    },
    {
      name: "Insomnia",
      desc: "Prevents the Pokémon from falling asleep."
    },
    {
      name: "Color Change",
      desc: "Changes the Pokémon's type to the foe's move."
    },
    {
      name: "Immunity",
      desc: "Prevents the Pokémon from getting poisoned."
    },
    {
      name: "Flash Fire",
      desc: "It powers up Fire-type moves if it's hit by one."
    },
    {
      name: "Shield Dust",
      desc: "Blocks the added effects of attacks taken."
    },
    {
      name: "Own Tempo",
      desc: "Prevents the Pokémon from becoming confused."
    },
    {
      name: "Suction Cups",
      desc: "Negates all moves that force switching out."
    },
    {
      name: "Intimidate",
      desc: "Lowers the foe's Attack stat."
    },
    {
      name: "Shadow Tag",
      desc: "Prevents the foe from escaping."
    },
    {
      name: "Rough Skin",
      desc: "Inflicts damage to the foe on contact."
    },
    {
      name: "Wonder Guard",
      desc: "Only super-effective moves will hit."
    },
    {
      name: "Levitate",
      desc: "Gives full immunity to all Ground-type moves."
    },
    {
      name: "Effect Spore",
      desc: "Contact may poison or cause paralysis or sleep."
    },
    {
      name: "Synchronize",
      desc: "Passes a burn, poison, or paralysis to the foe."
    },
    {
      name: "Clear Body",
      desc: "Prevents other Pokémon from lowering its stats."
    },
    {
      name: "Natural Cure",
      desc: "All status problems heal when it switches out."
    },
    {
      name: "Lightning Rod",
      desc: "Draws in all Electric-type moves to up Sp. Attack."
    },
    {
      name: "Serene Grace",
      desc: "Boosts the likelihood of added effects appearing."
    },
    {
      name: "Swift Swim",
      desc: "Boosts the Pokémon's Speed in rain."
    },
    {
      name: "Chlorophyll",
      desc: "Boosts the Pokémon's Speed in sunshine."
    },
    {
      name: "Illuminate",
      desc: "Raises the likelihood of meeting wild Pokémon."
    },
    {
      name: "Trace",
      desc: "The Pokémon copies a foe's Ability."
    },
    {
      name: "Huge Power",
      desc: "Raises the Pokémon's Attack stat."
    },
    {
      name: "Poison Point",
      desc: "Contact with the Pokémon may poison the attacker."
    },
    {
      name: "Inner Focus",
      desc: "The Pokémon is protected from flinching."
    },
    {
      name: "Magma Armor",
      desc: "Prevents the Pokémon from becoming frozen."
    },
    {
      name: "Water Veil",
      desc: "Prevents the Pokémon from getting a burn."
    },
    {
      name: "Magnet Pull",
      desc: "Prevents Steel-type Pokémon from escaping."
    },
    {
      name: "Soundproof",
      desc: "Gives full immunity to all sound-based moves."
    },
    {
      name: "Rain Dish",
      desc: "The Pokémon gradually regains HP in rain."
    },
    {
      name: "Sand Stream",
      desc: "The Pokémon summons a sandstorm in battle."
    },
    {
      name: "Pressure",
      desc: "The Pokémon raises the foe's PP usage."
    },
    {
      name: "Thick Fat",
      desc: "Ups resistance to Fire- and Ice-type moves."
    },
    {
      name: "Early Bird",
      desc: "The Pokémon awakens quickly from sleep."
    },
    {
      name: "Flame Body",
      desc: "Contact with the Pokémon may burn the attacker."
    },
    {
      name: "Run Away",
      desc: "Enables a sure getaway from wild Pokémon."
    },
    {
      name: "Keen Eye",
      desc: "Prevents other Pokémon from lowering accuracy."
    },
    {
      name: "Hyper Cutter",
      desc: "Prevents other Pokémon from lowering Attack stat."
    },
    {
      name: "Pickup",
      desc: "The Pokémon may pick up items."
    },
    {
      name: "Truant",
      desc: "Pokémon can't attack on consecutive turns."
    },
    {
      name: "Hustle",
      desc: "Boosts the Attack stat, but lowers accuracy."
    },
    {
      name: "Cute Charm",
      desc: "Contact with the Pokémon may cause infatuation."
    },
    {
      name: "Plus",
      desc: "Ups Sp. Atk if another Pokémon has Plus or Minus."
    },
    {
      name: "Minus",
      desc: "Ups Sp. Atk if another Pokémon has Plus or Minus."
    },
    {
      name: "Forecast",
      desc: "Castform transforms with the weather."
    },
    {
      name: "Sticky Hold",
      desc: "Protects the Pokémon from item theft."
    },
    {
      name: "Shed Skin",
      desc: "The Pokémon may heal its own status problems."
    },
    {
      name: "Guts",
      desc: "Boosts Attack if there is a status problem."
    },
    {
      name: "Marvel Scale",
      desc: "Ups Defense if there is a status problem."
    },
    {
      name: "Liquid Ooze",
      desc: "Damages attackers using any draining move."
    },
    {
      name: "Overgrow",
      desc: "Powers up Grass-type moves in a pinch.",
      mons: ['001', '002', '003'],
    },
    {
      name: "Blaze",
      desc: "Powers up Fire-type moves in a pinch."
    },
    {
      name: "Torrent",
      desc: "Powers up Water-type moves in a pinch."
    },
    {
      name: "Swarm",
      desc: "Powers up Bug-type moves in a pinch."
    },
    {
      name: "Rock Head",
      desc: "Protects the Pokémon from recoil damage."
    },
    {
      name: "Drought",
      desc: "Turns the sunlight harsh if it is in battle."
    },
    {
      name: "Arena Trap",
      desc: "Prevents the foe from fleeing."
    },
    {
      name: "Vital Spirit",
      desc: "Prevents the Pokémon from falling asleep."
    },
    {
      name: "White Smoke",
      desc: "Prevents other Pokémon from lowering its stats."
    },
    {
      name: "Pure Power",
      desc: "Raises the Pokémon's Attack stat."
    },
    {
      name: "Shell Armor",
      desc: "The Pokémon is protected against critical hits."
    },
    {
      name: "Air Lock",
      desc: "Eliminates the effects of weather."
    },
    {
      name: "Tangled Feet",
      desc: "Raises evasion if the Pokémon is confused."
    },
    {
      name: "Motor Drive",
      desc: "Raises Speed if hit by an Electric-type move."
    },
    {
      name: "Rivalry",
      desc: "Deals more damage to a foe of the same gender."
    },
    {
      name: "Steadfast",
      desc: "Raises Speed each time the Pokémon flinches."
    },
    {
      name: "Snow Cloak",
      desc: "Raises evasion in a hailstorm."
    },
    {
      name: "Gluttony",
      desc: "Encourages the early use of a held Berry."
    },
    {
      name: "Anger Point",
      desc: "Maxes Attack after taking a critical hit."
    },
    {
      name: "Unburden",
      desc: "Raises Speed if a held item is used."
    },
    {
      name: "Heatproof",
      desc: "Weakens the power of Fire-type moves."
    },
    {
      name: "Simple",
      desc: "The Pokémon is prone to wild stat changes."
    },
    {
      name: "Dry Skin",
      desc: "Reduces HP if it is hot. Water restores HP."
    },
    {
      name: "Download",
      desc: "Adjusts power according to a foe's defenses."
    },
    {
      name: "Iron Fist",
      desc: "Boosts the power of punching moves."
    },
    {
      name: "Poison Heal",
      desc: "Restores HP if the Pokémon is poisoned."
    },
    {
      name: "Adaptability",
      desc: "Powers up moves of the same type."
    },
    {
      name: "Skill Link",
      desc: "Increases the frequency of multi-strike moves."
    },
    {
      name: "Hydration",
      desc: "Heals status problems if it is raining."
    },
    {
      name: "Solar Power",
      desc: "In sunshine, Sp. Atk is boosted but HP decreases."
    },
    {
      name: "Quick Feet",
      desc: "Boosts Speed if there is a status problem."
    },
    {
      name: "Normalize",
      desc: "All the Pokémon's moves become the Normal type."
    },
    {
      name: "Sniper",
      desc: "Powers up moves if they become critical hits."
    },
    {
      name: "Magic Guard",
      desc: "The Pokémon only takes damage from attacks."
    },
    {
      name: "No Guard",
      desc: "Ensures attacks by or against the Pokémon land."
    },
    {
      name: "Stall",
      desc: "The Pokémon moves after all other Pokémon do."
    },
    {
      name: "Technician",
      desc: "Powers up the Pokémon's weaker moves."
    },
    {
      name: "Leaf Guard",
      desc: "Prevents problems with status in sunny weather."
    },
    {
      name: "Klutz",
      desc: "The Pokémon can't use any held items."
    },
    {
      name: "Mold Breaker",
      desc: "Moves can be used regardless of Abilities."
    },
    {
      name: "Super Luck",
      desc: "Heightens the critical-hit ratios of moves."
    },
    {
      name: "Aftermath",
      desc: "Damages the attacker landing the finishing hit."
    },
    {
      name: "Anticipation",
      desc: "Senses a foe's dangerous moves."
    },
    {
      name: "Forewarn",
      desc: "Determines what moves a foe has."
    },
    {
      name: "Unaware",
      desc: "Ignores any stat changes in the Pokémon."
    },
    {
      name: "Tinted Lens",
      desc: "Powers up \"not very effective\" moves."
    },
    {
      name: "Filter",
      desc: "Reduces damage from super-effective attacks."
    },
    {
      name: "Slow Start",
      desc: "Temporarily halves Attack and Speed."
    },
    {
      name: "Scrappy",
      desc: "Enables moves to hit Ghost-type Pokémon."
    },
    {
      name: "Storm Drain",
      desc: "Draws in all Water-type moves to up Sp. Attack."
    },
    {
      name: "Ice Body",
      desc: "The Pokémon gradually regains HP in a hailstorm."
    },
    {
      name: "Solid Rock",
      desc: "Reduces damage from super-effective attacks."
    },
    {
      name: "Snow Warning",
      desc: "The Pokémon summons a hailstorm in battle."
    },
    {
      name: "Honey Gather",
      desc: "The Pokémon may gather Honey from somewhere."
    },
    {
      name: "Frisk",
      desc: "The Pokémon can check a foe's held item."
    },
    {
      name: "Reckless",
      desc: "Powers up moves that have recoil damage."
    },
    {
      name: "Multitype",
      desc: "Changes type to match the held Plate."
    },
    {
      name: "Flower Gift",
      desc: "Powers up party Pokémon when it is sunny."
    },
    {
      name: "Bad Dreams",
      desc: "Reduces a sleeping foe's HP."
    },
    {
      name: "Pickpocket",
      desc: "Steals an item when hit by another Pokémon."
    },
    {
      name: "Sheer Force",
      desc: "Removes added effects to increase move damage."
    },
    {
      name: "Contrary",
      desc: "Makes stat changes have an opposite effect."
    },
    {
      name: "Unnerve",
      desc: "Makes the foe nervous and unable to eat Berries."
    },
    {
      name: "Defiant",
      desc: "When its stats are lowered its Attack increases."
    },
    {
      name: "Defeatist",
      desc: "Lowers stats when HP becomes half or less."
    },
    {
      name: "Cursed Body",
      desc: "May disable a move used on the Pokémon."
    },
    {
      name: "Healer",
      desc: "May heal an ally's status conditions."
    },
    {
      name: "Friend Guard",
      desc: "Reduces damage done to allies."
    },
    {
      name: "Weak Armor",
      desc: "Physical attacks lower Defense and raise Speed."
    },
    {
      name: "Heavy Metal",
      desc: "Doubles the Pokémon's weight."
    },
    {
      name: "Light Metal",
      desc: "Halves the Pokémon's weight."
    },
    {
      name: "Multiscale",
      desc: "Reduces damage when HP is full."
    },
    {
      name: "Toxic Boost",
      desc: "Powers up physical attacks when poisoned."
    },
    {
      name: "Flare Boost",
      desc: "Powers up special attacks when burned."
    },
    {
      name: "Harvest",
      desc: "May create another Berry after one is used."
    },
    {
      name: "Telepathy",
      desc: "Anticipates an ally's attack and dodges it."
    },
    {
      name: "Moody",
      desc: "Raises one stat and lowers another."
    },
    {
      name: "Overcoat",
      desc: "Protects the Pokémon from damage from weather."
    },
    {
      name: "Poison Touch",
      desc: "May poison targets when a Pokémon makes contact."
    },
    {
      name: "Regenerator",
      desc: "Restores a little HP when withdrawn from battle."
    },
    {
      name: "Big Pecks",
      desc: "Protects from Defense-lowering attacks."
    },
    {
      name: "Sand Rush",
      desc: "Boosts the Pokémon's Speed in a sandstorm."
    },
    {
      name: "Wonder Skin",
      desc: "Makes status-changing moves more likely to miss."
    },
    {
      name: "Analytic",
      desc: "Boosts move power when the Pokémon moves last."
    },
    {
      name: "Illusion",
      desc: "Comes out disguised as the Pokémon in back."
    },
    {
      name: "Imposter",
      desc: "It transforms itself into the Pokémon it is facing."
    },
    {
      name: "Infiltrator",
      desc: "Passes through the foe's barrier and strikes."
    },
    {
      name: "Mummy",
      desc: "Contact with this Pokémon spreads this Ability."
    },
    {
      name: "Moxie",
      desc: "Boosts Attack after knocking out any Pokémon."
    },
    {
      name: "Justified",
      desc: "Raises Attack when hit by a Dark-type move."
    },
    {
      name: "Rattled",
      desc: "Some move types scare it and boost its Speed."
    },
    {
      name: "Magic Bounce",
      desc: "Reflects status-changing moves."
    },
    {
      name: "Sap Sipper",
      desc: "Boosts Attack when hit by a Grass-type move."
    },
    {
      name: "Prankster",
      desc: "Gives priority to a status move."
    },
    {
      name: "Sand Force",
      desc: "Boosts certain moves' power in a sandstorm."
    },
    {
      name: "Iron Barbs",
      desc: "Inflicts damage to the Pokémon on contact."
    },
    {
      name: "Zen Mode",
      desc: "Changes the Pokémon's shape when HP is halved."
    },
    {
      name: "Victory Star",
      desc: "Boosts the accuracy of its allies and itself."
    },
    {
      name: "Turboblaze",
      desc: "Moves can be used regardless of Abilities."
    },
    {
      name: "Teravolt",
      desc: "Moves can be used regardless of Abilities."
    },
    {
      name: "Aroma Veil",
      desc: "Protects against attacks that limit move choices."
    },
    {
      name: "Flower Veil",
      desc: "Protects Grass-type allies from stat/status effects."
    },
    {
      name: "Cheek Pouch",
      desc: "Restores HP as well when the Pokémon eats a Berry."
    },
    {
      name: "Protean",
      desc: "It changes type to that of the move it's about to use."
    },
    {
      name: "Fur Coat",
      desc: "Halves the damage from physical moves."
    },
    {
      name: "Magician",
      desc: "Steals the held item of a Pokémon it hits."
    },
    {
      name: "Bulletproof",
      desc: "Protects the Pokémon from some ball and bomb moves."
    },
    {
      name: "Competitive",
      desc: "Sharply boosts Sp. Atk when a stat is lowered."
    },
    {
      name: "Strong Jaw",
      desc: "Boosts the power of biting moves."
    },
    {
      name: "Refrigerate",
      desc: "Normal-type moves become Ice-type and powered up."
    },
    {
      name: "Sweet Veil",
      desc: "Prevents itself and allies from falling asleep."
    },
    {
      name: "Stance Change",
      desc: "Changes between Blade and Shield Forme with attacks."
    },
    {
      name: "Gale Wings",
      desc: "Flying-type moves gain priority when its HP is full."
    },
    {
      name: "Mega Launcher",
      desc: "Powers up aura and pulse moves."
    },
    {
      name: "Grass Pelt",
      desc: "Boosts the Defense stat on Grassy Terrain."
    },
    {
      name: "Symbiosis",
      desc: "Passes its held item to an ally that has used theirs."
    },
    {
      name: "Tough Claws",
      desc: "Powers up moves that make direct contact."
    },
    {
      name: "Pixilate",
      desc: "Normal-type moves become Fairy-type and powered up."
    },
    {
      name: "Gooey",
      desc: "Contact with it lowers the attacker's Speed stat."
    },
    {
      name: "Aerilate",
      desc: "Normal-type moves become Flying-type and power up."
    },
    {
      name: "Parental Bond",
      desc: "Parent and child each attacks."
    },
    {
      name: "Dark Aura",
      desc: "Powers up each Pokémon's Dark-type moves."
    },
    {
      name: "Fairy Aura",
      desc: "Powers up each Pokémon's Fairy-type moves."
    },
    {
      name: "Aura Break",
      desc: "Reverses \"Aura\" Abilities to weaken affected moves."
    },
    {
      name: "Primordial Sea",
      desc: "Changes the weather to nullify Fire-type moves."
    },
    {
      name: "Desolate Land",
      desc: "Changes the weather to nullify Water-type moves."
    },
    {
      name: "Delta Stream",
      desc: "Alters weather to remove Flying-type's weaknesses."
    },
    {
      name: "Stamina",
      desc: "Boosts Defense when hit by an attack.",
      mons: ['001', '002', '003'],
      rare: false
    },
    {
      name: "Wimp Out",
      desc: "Cowardly switches out if its HP becomes half or less."
    },
    {
      name: "Emergency Exit",
      desc: "Switches out if its HP becomes half or less."
    },
    {
      name: "Water Compaction",
      desc: "Sharply ups Defense when hit by a Water-type move."
    },
    {
      name: "Merciless",
      desc: "Its attacks are critical hits when it is poisoned."
    },
    {
      name: "Shields Down",
      desc: "Its shell breaks if its HP becomes half or less."
    },
    {
      name: "Stakeout",
      desc: "Deals doubles damage to a target's replacement."
    },
    {
      name: "Water Bubble",
      desc: "Weakens incoming Fire-type moves and prevents burns."
    },
    {
      name: "Steelworker",
      desc: "Powers up Steel-type moves."
    },
    {
      name: "Berserk",
      desc: "Ups Sp. Atk if a hit makes its HP half or less."
    },
    {
      name: "Slush Rush",
      desc: "Boosts the Pokémon's Speed stat in a hailstorm."
    },
    {
      name: "Long Reach",
      desc: "Uses moves without making contact with the target."
    },
    {
      name: "Liquid Voice",
      desc: "Its sound-based moves become Water-type."
    },
    {
      name: "Triage",
      desc: "Gives priority to a healing move."
    },
    {
      name: "Galvanize",
      desc: "Normal-type moves become Electric-type and powered."
    },
    {
      name: "Surge Surfer",
      desc: "Doubles Speed on Electric Terrain."
    },
    {
      name: "Schooling",
      desc: "Forms a powerful school while it has a lot of HP."
    },
    {
      name: "Disguise",
      desc: "Its shroud protects it from an attack just once."
    },
    {
      name: "Battle Bond",
      desc: "Defeating a foe lets it become Ash-Greninja."
    },
    {
      name: "Power Construct",
      desc: "Changes with other Cells if HP becomes half or less."
    },
    {
      name: "Corrosion",
      desc: "It can poison Steel- and Poison-type targets."
    },
    {
      name: "Comatose",
      desc: "It's always drowsing, and attacks without waking."
    },
    {
      name: "Queenly Majesty",
      desc: "Makes foes unable to use priority attacks."
    },
    {
      name: "Innards Out",
      desc: "Damages an attacker that lands the finishing hit."
    },
    {
      name: "Dancer",
      desc: "Repeats another Pokémon's dance move immediately."
    },
    {
      name: "Battery",
      desc: "Powers up ally Pokémon's special moves."
    },
    {
      name: "Fluffy",
      desc: "Resists contact damage but weaker to Fire-type."
    },
    {
      name: "Dazzling",
      desc: "Makes foes unable to use priority attacks."
    },
    {
      name: "Soul-Heart",
      desc: "Boosts Sp. Atk each time a Pokémon faints."
    },
    {
      name: "Tangling Hair",
      desc: "Contact with it lowers the attacker's Speed."
    },
    {
      name: "Receiver",
      desc: "Copies the Ability of a defeated ally."
    },
    {
      name: "Power of Alchemy",
      desc: "Copies the Ability of a defeated ally."
    },
    {
      name: "Beast Boost",
      desc: "Boosts its best stat each time it deals a KO."
    },
    {
      name: "RKS System",
      desc: "Its type matches the memory disc it holds."
    },
    {
      name: "Electric Surge",
      desc: "Turns the ground into Electric Terrain."
    },
    {
      name: "Psychic Surge",
      desc: "Turns the ground into Psychic Terrain."
    },
    {
      name: "Misty Surge",
      desc: "Turns the ground into Misty Terrain."
    },
    {
      name: "Grassy Surge",
      desc: "Turns the ground into Grassy Terrain."
    },
    {
      name: "Full Metal Body",
      desc: "Prevents other Pokémon from lowering its stats."
    },
    {
      name: "Shadow Shield",
      desc: "Resists damage while its HP is full."
    },
    {
      name: "Prism Armor",
      desc: "Reduces damage from super-effective attacks."
    },
    {
      name: "Neuroforce",
      desc: "Powers up moves that are super-effective."
    },
    {
      name: "Intrepid Sword",
      desc: "Boosts Attack when entering a battle."
    },
    {
      name: "Dauntless Shield",
      desc: "Boosts Defense when entering a battle."
    },
    {
      name: "Libero",
      desc: "It changes type to that of the move it's about to use."
    },
    {
      name: "Ball Fetch",
      desc: "Retrieves the first thrown Poké Ball if it failed."
    },
    {
      name: "Cotton Down",
      desc: "Scatters Speed-lowering cotton fluff when hit."
    },
    {
      name: "Propeller Tail",
      desc: "This Pokémon's moves cannot be redirected."
    },
    {
      name: "Mirror Armor",
      desc: "Bounces back stat-lowering effects."
    },
    {
      name: "Gulp Missile",
      desc: "Catches prey via Surf or Dive, spits it out when hit."
    },
    {
      name: "Stalwart",
      desc: "This Pokémon's moves cannot be redirected."
    },
    {
      name: "Steam Engine",
      desc: "Boosts Speed drastically if hit by a Fire or Water move."
    },
    {
      name: "Punk Rock",
      desc: "Powers up own sound moves. Resists other sound moves."
    },
    {
      name: "Sand Spit",
      desc: "Creates a sandstorm when hit by an attack."
    },
    {
      name: "Ice Scales",
      desc: "Halves the damage taken from special moves."
    },
    {
      name: "Ripen",
      desc: "Ripens Berries and doubles their effect."
    },
    {
      name: "Ice Face",
      desc: "Blocks a physical hit, but the ice head breaks."
    },
    {
      name: "Power Spot",
      desc: "Just being next to the Pokémon powers up moves."
    },
    {
      name: "Mimicry",
      desc: "Changes type depending on the terrain."
    },
    {
      name: "Screen Cleaner",
      desc: "On entering battle, clears effects of Reflect, etc."
    },
    {
      name: "Steely Spirit",
      desc: "Powers up ally Pokémon's Steel-type moves."
    },
    {
      name: "Perish Body",
      desc: "Both Pokémon faint 3 turns after taking a contact hit."
    },
    {
      name: "Wandering Spirit",
      desc: "Swaps Abilities with contact-making Pokémon."
    },
    {
      name: "Gorilla Tactics",
      desc: "Boosts Attack, but allows only one move to be used."
    },
    {
      name: "Neutralizing Gas",
      desc: "Nullifies the effects of all other Abilities."
    },
    {
      name: "Pastel Veil",
      desc: "Protects the Pokémon and its allies from poisoning."
    },
    {
      name: "Hunger Switch",
      desc: "Changes between Full Belly and Hangry Mode each turn."
    },
    {
      name: "Quick Draw",
      desc: "Enables the Pokémon to move first occasionally."
    },
    {
      name: "Unseen Fist",
      desc: "The Pokémon's contact moves ignore protections."
    },
    {
      name: "Curious Medicine",
      desc: "Removes all allies' stat changes on joining battle."
    },
    {
      name: "Transistor",
      desc: "Powers up Electric-type moves."
    },
    {
      name: "Dragon's Maw",
      desc: "Powers up Dragon-type moves."
    },
    {
      name: "Chilling Neigh",
      desc: "When knocking out a target, raises Attack."
    },
    {
      name: "Grim Neigh",
      desc: "When knocking out a target, raises Sp. Atk."
    },
    {
      name: "As One",
      desc: "Combines Unnerve and Chilling Neigh Abilities."
    },
    {
      name: "As One",
      desc: "Combines Unnerve and Grim Neigh Abilities."
    },
    {
      name: "Sickness",
      desc: "All Other Pokemon are poisoned after 2 turns."
    },
    {
      name: "Stampede",
      desc: "Gives one recoil move +4 priority and halves recoil damage."
    },
    {
      name: "Short Fuse",
      desc: "Allows charging moves to be used instantly."
    },
    {
      name: "Knit Trap",
      desc: "Starts knitting, then lays Sticky Web after 3 turns."
    },
    {
      name: "Food Coma",
      desc: "Contact heals the attacker but lowers two random stats."
    },
    {
      name: "Family Warmth",
      desc: "Raises Sp. Def after using a Fairy-type move."
    },
    {
      name: "Family Hold",
      desc: "Raises Sp. Atk after using a Ghost-type move."
    },
    {
      name: "Ninja Swap",
      desc: "Makes a free substitute when the foe switches out."
    },
    {
      name: "Cold-Blooded",
      desc: "Boosts Speed in sun and critical-hit rate, but lowers Speed in snow."
    },
    {
      name: "Surprise!",
      desc: "Lowers opposing Pokemon's Defense on entry."
    },
    {
      name: "Beam Me Up",
      desc: "Powers up beam moves by 50%."
    },
    {
      name: "Staggering",
      desc: "Takes only 20% damage from the first hit, then sharply lowers Defense."
    },
    {
      name: "Star Collapse",
      desc: "Raises Attack and starts sunny weather after taking down a foe."
    },
    {
      name: "Dark Abyss",
      desc: "Absorbs the Void, preventing Water-type weaknesses."
    },

    {
      name: "Anger Shell",
      desc: "Gets a powerful boost if a hit makes its HP half or less."
    },
    {
      name: "Armor Tail",
      desc: "Prevents opposing Pokémon from using priority moves."
    },
    {
      name: "Beads of Ruin",
      desc: "Lowers the Sp. Def of all Pokémon except the user."
    },
    {
      name: "Commander",
      desc: "Pairs up and commands with an active Dondozo."
    },
    {
      name: "Costar",
      desc: "Copies an ally's stat changes upon entry to battle."
    },
    {
      name: "Cud Chew",
      desc: "Reuses an eaten Berry at the end of the next turn."
    },
    {
      name: "Earth Eater",
      desc: "Restores HP if hit by a Ground-type move."
    },
    {
      name: "Electromorphosis",
      desc: "The Pokémon becomes charged upon taking damage."
    },
    {
      name: "Good as Gold",
      desc: "The Pokémon becomes immune to status moves."
    },
    {
      name: "Guard Dog",
      desc: "Boosts Atk if intimidated and immune to being forced out."
    },
    {
      name: "Hadron Engine",
      desc: "Turns the ground into Electric Terrain and boosts Sp. Atk."
    },
    {
      name: "Lingering Aroma",
      desc: "Contact with this Pokémon spreads this Ability."
    },
    {
      name: "Mycelium Might",
      desc: "Status moves are unimpeded by this Ability but slower to use."
    },
    {
      name: "Opportunist",
      desc: "Copies an opponent's stat boost during a turn."
    },
    {
      name: "Orichalcum Pulse",
      desc: "Turns the sunlight harsh while boosing Attack."
    },
    {
      name: "Protosynthesis",
      desc: "Boosts its best stat in harsh sunlight."
    },
    {
      name: "Purifying Salt",
      desc: "Gains protection from status effects and Ghost-type moves."
    },
    {
      name: "Quark Drive",
      desc: "Boosts its best stat in Electric Terrain."
    },
    {
      name: "Rocky Payload",
      desc: "Powers up Rock-type moves."
    },
    {
      name: "Seed Sower",
      desc: "Turns the ground into Grassy Terrain upon taking damage."
    },
    {
      name: "Sharpness",
      desc: "Powers up slicing moves."
    },
    {
      name: "Supreme Overlord",
      desc: "Boosts the power of its moves with every fainted ally."
    },
    {
      name: "Sword of Ruin",
      desc: "Lowers the Defense of all Pokémon except the user."
    },
    {
      name: "Tablets of Ruin",
      desc: "Lowers the Attack of all Pokémon except the user."
    },
    {
      name: "Thermal Exchange",
      desc: "Boosts Atk when hit by a Fire-type move and prevents burns."
    },
    {
      name: "Toxic Debris",
      desc: "Scatters poison spikes when hit by physical moves."
    },
    {
      name: "Vessel of Ruin",
      desc: "Lowers the Sp. Atk of all Pokémon except the user."
    },
    {
      name: "Well-Baked Body",
      desc: "Fire-type moves deal no damage and sharply boost Defense."
    },
    {
      name: "Wind Power",
      desc: "The Pokémon becomes charged from taking wind damage."
    },
    {
      name: "Wind Rider",
      desc: "Boosts Attack in Tailwind or when attacked by wind moves."
    },
    {
      name: "Zero to Hero",
      desc: "Transforms into its Hero Form when it switches out."
    },
    {
      name: "Supersweet Syrup",
      desc: "Lowers the foe's evasion once per battle."
    },
    {
      name: "Hospitality",
      desc: "Restores ally's HP a little when entering battle."
    },
    {
      name: "Toxic Chain",
      desc: "May badly poison targets when the user attacks."
    },
    {
      name: "Mind's Eye",
      desc: "Prevents accuracy loss. Ignores Ghost immunities."
    },
    {
      name: "Embody Aspect",
      desc: "The user's shining mask raises its Speed stat."
    },
    {
      name: "Embody Aspect",
      desc: "The user's shining mask raises its Sp. Def stat."
    },
    {
      name: "Embody Aspect",
      desc: "The user's shining mask raises its Attack stat."
    },
    {
      name: "Embody Aspect",
      desc: "The user's shining mask raises its Defense stat."
    },
    {
      name: "Poison Puppeteer",
      desc: "Moves that inflict poison also cause confusion."
    },
    {
      name: "Tera Shift",
      desc: "Enters Terastal Form when sent out."
    },
    {
      name: "Tera Shell",
      desc: "Resists all types when HP is full."
    },
    {
      name: "Teraform Zero",
      desc: "Eliminates all weather and terrain."
    },
    {
      name: "Mega Sol",
      desc: "Uses its moves as if in sunny weather."
    },
    {
      name: "Dragonize",
      desc: "Normal-type moves become Dragon-type and powered."
    },
    {
      name: "Piercing Drill",
      desc: "Contact moves deals a quarter of damage against protections."
    },
    {
      name: "Spicy Spray",
      desc: "Burns the attacker when hit by a damaging move."
    }
  ];

  // ---- Items -------------------------------------------------------------
  // Optional item art: add icon: 'items/example.png' to any item.
  // categories (you can add): Evolution, Valuable, Battle Items, Key Item, Medicine, Poké Ball, Berries
  const ITEMS = [
    // Poké Balls — ascending catch quality
    { name: 'Poké Ball', cat: 'Poké Ball', icon: 'items/POKEBALL.png', desc: 'A device for catching wild Pokémon. A basic capture rate.', find: 'Poké Marts, Route 1' },
    { name: 'Great Ball', cat: 'Poké Ball', icon: 'items/GREATBALL.png', desc: 'A good-quality Poké Ball with a higher catch rate than a standard Poké Ball.', find: 'Poké Marts' },
    { name: 'Ultra Ball', cat: 'Poké Ball', icon: 'items/ULTRABALL.png', desc: 'An ultra-high-performance Poké Ball with an even higher catch rate.', find: 'Poké Marts' },
    { name: 'Quick Ball', cat: 'Poké Ball', icon: 'items/QUICKBALL.png', desc: 'A Poké Ball with a very high catch rate if used at the start of a battle.', find: 'Poké Marts; routes' },
    { name: 'Net Ball', cat: 'Poké Ball', icon: 'items/NETBALL.png', desc: 'A Poké Ball that works especially well on Water- and Bug-type Pokémon.', find: 'Poké Marts; routes' },
    { name: 'Premier Ball', cat: 'Poké Ball', icon: 'items/PREMIERBALL.png', desc: 'A somewhat rare Poké Ball made to commemorate an event. Same catch rate as a Poké Ball.', find: 'Free with bulk Poké Ball purchases' },
    // Medicine — HP potions by tier, then revives, then status, then PP
    { name: 'Potion', cat: 'Medicine', icon: 'items/POTION.png', desc: 'Restores 20 HP to a single Pokémon.', find: 'Poké Marts, found on routes' },
    { name: 'Super Potion', cat: 'Medicine', icon: 'items/SUPERPOTION.png', desc: 'Restores 60 HP to a single Pokémon.', find: 'Poké Marts' },
    { name: 'Hyper Potion', cat: 'Medicine', icon: 'items/HYPERPOTION.png', desc: 'Restores 120 HP to a single Pokémon.', find: 'Poké Marts' },
    { name: 'Full Restore', cat: 'Medicine', icon: 'items/FULLRESTORE.png', desc: 'Fully restores HP and cures all status conditions of one Pokémon.', find: 'Poké Marts (late game)' },
    { name: 'Revive', cat: 'Medicine', icon: 'items/REVIVE.png', desc: 'Revives a fainted Pokémon, restoring half of its maximum HP.', find: 'Poké Marts' },
    { name: 'Max Revive', cat: 'Medicine', icon: 'items/MAXREVIVE.png', desc: 'Revives a fainted Pokémon and fully restores its HP.', find: 'Pickup; hidden items' },
    { name: 'Paralyze Heal', cat: 'Medicine', icon: 'items/PARALYZEHEAL.png', desc: 'Cures a single Pokémon of paralysis.', find: 'Poké Marts' },
    { name: 'Antidote', cat: 'Medicine', icon: 'items/ANTIDOTE.png', desc: 'Cures a single Pokémon of poisoning.', find: 'Poké Marts' },
    { name: 'Fresh Water', cat: 'Medicine', icon: 'items/FRESHWATER.png', desc: 'Water with a high mineral content. Restores 30 HP to a single Pokémon.', find: 'Vending machines' },
    { name: 'Soda Pop', cat: 'Medicine', icon: 'items/SODAPOP.png', desc: 'A fizzy soda drink. Restores 50 HP to a single Pokémon.', find: 'Vending machines' },
    { name: 'Lemonade', cat: 'Medicine', icon: 'items/LEMONADE.png', desc: 'A sweet, refreshing drink. Restores 70 HP to a single Pokémon.', find: 'Vending machines' },
    { name: 'Elixir', cat: 'Medicine', icon: 'items/ELIXIR.png', desc: 'Restores 10 PP to each move of a single Pokémon.', find: 'Hidden items, Pickup' },
    { name: 'Max Elixir', cat: 'Medicine', icon: 'items/MAXELIXIR.png', desc: 'Fully restores the PP of all of a Pokémon\'s moves.', find: 'Hidden items, Pickup' },
    // Evolution — elemental stones grouped first, then the special stones
    { name: 'Fire Stone', cat: 'Evolution', icon: 'items/FIRESTONE.png', desc: 'A peculiar stone that radiates heat. Evolves certain Pokémon — including Sedimite into Sedimage.', find: 'Stone vendors; routes' },
    { name: 'Water Stone', cat: 'Evolution', icon: 'items/WATERSTONE.png', desc: 'A blue stone with a watery sheen. Evolves Sedimite into Sedimonk, among others.', find: 'Stone vendors; routes' },
    { name: 'Thunder Stone', cat: 'Evolution', icon: 'items/THUNDERSTONE.png', desc: 'A stone crackling with energy. Evolves Sedimite into Sedificer, among others.', find: 'Stone vendors; routes' },
    { name: 'Leaf Stone', cat: 'Evolution', icon: 'items/LEAFSTONE.png', desc: 'A stone with a leaf pattern. Evolves Sedimite into Sedruid, among others.', find: 'Stone vendors; routes' },
    { name: 'Ice Stone', cat: 'Evolution', icon: '', desc: 'A stone with snowflakes frozen inside. Evolves Sedimite into Sediserker, among others.', find: 'Stone vendors; routes' },
    { name: 'Sun Stone', cat: 'Evolution', icon: 'items/SUNSTONE.png', desc: 'A stone that glows like the sun. Evolves Sedimite into Sedivout, among others.', find: 'Stone vendors; routes' },
    { name: 'Moon Stone', cat: 'Evolution', icon: 'items/MOONSTONE.png', desc: 'A stone that glows faintly in the dark. Evolves Sedimite into Sedirogue, among others.', find: 'Caves; stone vendors' },
    { name: 'Dawn Stone', cat: 'Evolution', icon: 'items/DAWNSTONE.png', desc: 'A stone that sparkles like the morning sky. Evolves Sedimite into Sediranger, among others.', find: 'Stone vendors; routes' },
    { name: 'Dusk Stone', cat: 'Evolution', icon: 'items/DUSKSTONE.png', desc: 'A dark stone that is ominous to look at. Evolves Sedimite into Sedimancer, among others.', find: 'Stone vendors; routes' },
    { name: 'Shiny Stone', cat: 'Evolution', icon: 'items/SHINYSTONE.png', desc: 'A stone that sparkles brightly. Evolves Sedimite into Sediric, among others.', find: 'Stone vendors; routes' },
    // Battle Items — held items first, then field utility
    { name: 'Leftovers', cat: 'Battle Items', icon: 'items/LEFTOVERS.png', desc: 'A held item that gradually restores the holder\'s HP each turn. Hidden in the Limerico Poké Mart\'s trash can.', find: 'Limerico Town (Poké Mart trash can)' },
    { name: 'Big Root', cat: 'Battle Items', icon: 'items/BIGROOT.png', desc: 'A held item that boosts the HP restored by draining moves and Leech Seed.', find: 'Held by wild Pokémon; vendors' },
    { name: 'EXP. Share', cat: 'Battle Items', icon: 'items/EXPSHARE.png', desc: 'Shares Experience Points with the Pokémon in the party that did not battle.', find: 'Key item; given during the story' },
    { name: 'King\'s Rock', cat: 'Battle Items', icon: 'items/KINGSROCK.png', desc: 'A held item that may cause the foe to flinch when the holder lands a damaging hit.', find: 'Held by wild Pokémon; vendors' },
    { name: 'Iron Ball', cat: 'Battle Items', icon: 'items/IRONBALL.png', desc: 'A held item that cuts Speed and grounds Flying-types and levitators.', find: 'Held by wild Pokémon; vendors' },
    { name: 'Destiny Knot', cat: 'Battle Items', icon: 'items/DESTINYKNOT.png', desc: 'A held item that, if the holder becomes infatuated, infatuates the foe as well. Used in breeding.', find: 'Held items; Daycare' },
    { name: 'Repel', cat: 'Battle Items', icon: 'items/REPEL.png', desc: 'Prevents weak wild Pokémon from appearing for 100 steps.', find: 'Poké Marts' },
    { name: 'Escape Rope', cat: 'Battle Items', icon: 'items/ESCAPEROPE.png', desc: 'A long, durable rope that lets you escape instantly from a cave or dungeon.', find: 'Poké Marts' },
    // Valuable — progression items first, then collectible
    { name: 'Rare Candy', cat: 'Valuable', icon: 'items/RARECANDY.png', desc: 'A candy packed with energy. Raises a single Pokémon\'s level by one.', find: 'Hidden across routes; Saudade Town' },
    { name: 'PP Up', cat: 'Valuable', icon: 'items/PPUP.png', desc: 'Slightly raises the maximum PP of a selected move.', find: 'Hidden items' },
    { name: 'Zinc', cat: 'Valuable', icon: 'items/ZINC.png', desc: 'A nutritious drink for Pokémon. Raises base Sp. Def, but only so far.', find: 'Poké Marts; hidden items' },
    { name: 'Nugget', cat: 'Valuable', icon: 'items/NUGGET.png', desc: 'A nugget of pure gold that earns a high price when sold to shops.', find: 'Hidden items; Pickup' },
    { name: 'Heart Scale', cat: 'Valuable', icon: 'items/HEARTSCALE.png', desc: 'A pretty, heart-shaped scale. Prized by the Move Re-Learner in Aphora Town.', find: 'Pickup; cave floors' },
  ];


  const PICKUP = [{"band":"1-10","cells":[{"name":"Potion","pct":30,"icon":"POTION.png"},{"name":"Antidote","pct":10,"icon":"ANTIDOTE.png"},{"name":"Super Potion","pct":10,"icon":"SUPERPOTION.png"},{"name":"Great Ball","pct":10,"icon":"GREATBALL.png"},{"name":"Repel","pct":10,"icon":"REPEL.png"},{"name":"Escape Rope","pct":10,"icon":"ESCAPEROPE.png"},{"name":"Full Heal","pct":10,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":4,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":4,"icon":"ULTRABALL.png"},{"name":"Hyper Potion","pct":1,"icon":"HYPERPOTION.png"},{"name":"Nugget","pct":1,"icon":"NUGGET.png"}]},{"band":"11-20","cells":[{"name":"Antidote","pct":30,"icon":"ANTIDOTE.png"},{"name":"Super Potion","pct":10,"icon":"SUPERPOTION.png"},{"name":"Great Ball","pct":10,"icon":"GREATBALL.png"},{"name":"Repel","pct":10,"icon":"REPEL.png"},{"name":"Escape Rope","pct":10,"icon":"ESCAPEROPE.png"},{"name":"Full Heal","pct":10,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":10,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":4,"icon":"ULTRABALL.png"},{"name":"Revive","pct":4,"icon":"REVIVE.png"},{"name":"Nugget","pct":1,"icon":"NUGGET.png"},{"name":"King's Rock","pct":1,"icon":"KINGSROCK.png"}]},{"band":"21-30","cells":[{"name":"Super Potion","pct":30,"icon":"SUPERPOTION.png"},{"name":"Great Ball","pct":10,"icon":"GREATBALL.png"},{"name":"Repel","pct":10,"icon":"REPEL.png"},{"name":"Escape Rope","pct":10,"icon":"ESCAPEROPE.png"},{"name":"Full Heal","pct":10,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":10,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":10,"icon":"ULTRABALL.png"},{"name":"Revive","pct":4,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":4,"icon":"RARECANDY.png"},{"name":"King's Rock","pct":1,"icon":"KINGSROCK.png"},{"name":"Full Restore","pct":1,"icon":"FULLRESTORE.png"}]},{"band":"31-40","cells":[{"name":"Great Ball","pct":30,"icon":"GREATBALL.png"},{"name":"Repel","pct":10,"icon":"REPEL.png"},{"name":"Escape Rope","pct":10,"icon":"ESCAPEROPE.png"},{"name":"Full Heal","pct":10,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":10,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":10,"icon":"ULTRABALL.png"},{"name":"Revive","pct":10,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":4,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":4,"icon":"SUNSTONE.png"},{"name":"Full Restore","pct":1,"icon":"FULLRESTORE.png"},{"name":"Ether","pct":1,"icon":"ETHER.png"}]},{"band":"41-50","cells":[{"name":"Repel","pct":30,"icon":"REPEL.png"},{"name":"Escape Rope","pct":10,"icon":"ESCAPEROPE.png"},{"name":"Full Heal","pct":10,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":10,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":10,"icon":"ULTRABALL.png"},{"name":"Revive","pct":10,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":10,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":4,"icon":"SUNSTONE.png"},{"name":"Moon Stone","pct":4,"icon":"MOONSTONE.png"},{"name":"Ether","pct":1,"icon":"ETHER.png"},{"name":"Iron Ball","pct":1,"icon":"IRONBALL.png"}]},{"band":"51-60","cells":[{"name":"Escape Rope","pct":30,"icon":"ESCAPEROPE.png"},{"name":"Full Heal","pct":10,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":10,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":10,"icon":"ULTRABALL.png"},{"name":"Revive","pct":10,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":10,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":10,"icon":"SUNSTONE.png"},{"name":"Moon Stone","pct":4,"icon":"MOONSTONE.png"},{"name":"Heart Scale","pct":4,"icon":"HEARTSCALE.png"},{"name":"Iron Ball","pct":1,"icon":"IRONBALL.png"},{"name":"Destiny Knot","pct":1,"icon":"DESTINYKNOT.png"}]},{"band":"61-70","cells":[{"name":"Full Heal","pct":30,"icon":"FULLHEAL.png"},{"name":"Hyper Potion","pct":10,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":10,"icon":"ULTRABALL.png"},{"name":"Revive","pct":10,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":10,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":10,"icon":"SUNSTONE.png"},{"name":"Moon Stone","pct":10,"icon":"MOONSTONE.png"},{"name":"Heart Scale","pct":4,"icon":"HEARTSCALE.png"},{"name":"Full Restore","pct":4,"icon":"FULLRESTORE.png"},{"name":"Destiny Knot","pct":1,"icon":"DESTINYKNOT.png"},{"name":"Elixir","pct":1,"icon":"ELIXIR.png"}]},{"band":"71-80","cells":[{"name":"Hyper Potion","pct":30,"icon":"HYPERPOTION.png"},{"name":"Ultra Ball","pct":10,"icon":"ULTRABALL.png"},{"name":"Revive","pct":10,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":10,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":10,"icon":"SUNSTONE.png"},{"name":"Moon Stone","pct":10,"icon":"MOONSTONE.png"},{"name":"Heart Scale","pct":10,"icon":"HEARTSCALE.png"},{"name":"Full Restore","pct":4,"icon":"FULLRESTORE.png"},{"name":"Max Revive","pct":4,"icon":"MAXREVIVE.png"},{"name":"Elixir","pct":1,"icon":"ELIXIR.png"},{"name":"Destiny Knot","pct":1,"icon":"DESTINYKNOT.png"}]},{"band":"81-90","cells":[{"name":"Ultra Ball","pct":30,"icon":"ULTRABALL.png"},{"name":"Revive","pct":10,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":10,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":10,"icon":"SUNSTONE.png"},{"name":"Moon Stone","pct":10,"icon":"MOONSTONE.png"},{"name":"Heart Scale","pct":10,"icon":"HEARTSCALE.png"},{"name":"Full Restore","pct":10,"icon":"FULLRESTORE.png"},{"name":"Max Revive","pct":4,"icon":"MAXREVIVE.png"},{"name":"PP Up","pct":4,"icon":"PPUP.png"},{"name":"Destiny Knot","pct":1,"icon":"DESTINYKNOT.png"},{"name":"Leftovers","pct":1,"icon":"LEFTOVERS.png"}]},{"band":"91-100","cells":[{"name":"Revive","pct":30,"icon":"REVIVE.png"},{"name":"Rare Candy","pct":10,"icon":"RARECANDY.png"},{"name":"Sun Stone","pct":10,"icon":"SUNSTONE.png"},{"name":"Moon Stone","pct":10,"icon":"MOONSTONE.png"},{"name":"Heart Scale","pct":10,"icon":"HEARTSCALE.png"},{"name":"Full Restore","pct":10,"icon":"FULLRESTORE.png"},{"name":"Max Revive","pct":10,"icon":"MAXREVIVE.png"},{"name":"PP Up","pct":4,"icon":"PPUP.png"},{"name":"Max Elixir","pct":4,"icon":"MAXELIXIR.png"},{"name":"Leftovers","pct":1,"icon":"LEFTOVERS.png"},{"name":"Destiny Knot","pct":1,"icon":"DESTINYKNOT.png"}]}];


  // ---- Locations ---------------------------------------------------------
  const ROUTES = [
    {
      slug: 'saudade-town', name: 'Saudade Town', kind: 'Town', tag: '',
      desc: 'The starting town, home to the player and their mother. Known for its bustling market, golden wheat fields, and cozy, nostalgic atmosphere. Here you meet rivals Nya, Seren, and Kayden, and receive your Starter from Pecan along with your Running Shoes.',
      exits: 'South — Route 3 | East — Route 1 | West — Route 2',
      encounter: 'Starters', map: 'saudade-town.png',
      mons: [],
      encounters: [],
      items: ['Running Shoes', 'Rare Candy x2', 'Potion'],
      quests: ['Visit the Professor', 'Strange Stone (Sadie)'],
      npcs: [{ name: 'Kayden', role: 'Rival', sprite: 'POKEMONTRAINER_KAYDEN.png', line: 'A talented boy who wants to be the very best.', team: '' }],
    },
    {
      slug: 'route-1', name: 'Route 1', kind: 'Route', tag: '',
      desc: 'The first route east of Saudade Town, winding north toward Eventide Forest through wheat fields and tall grass.',
      exits: 'Northeast — Eventide Forest | Southeast — Route 5 | West — Saudade Town',
      encounter: 'Grass', map: 'route-1.png',
      mons: ['010', '013', '017', '044', '041'],
      encounters: [{ dex: '010', pct: 30, lv: '2-5', method: 'Land' }, { dex: '013', pct: 30, lv: '2-5', method: 'Land' }, { dex: '017', pct: 25, lv: '2-4', method: 'Land' }, { dex: '044', pct: 10, lv: '3-4', method: 'Land' }, { dex: '041', pct: 5, lv: '3-4', method: 'Land' }],
      items: ['Pokéball x3', 'Potion x2', 'Oran Berry'],
      quests: [],
      npcs: [{ name: 'Bartholomew', role: 'Youngster', sprite: 'YOUNGSTER.png', starterDependent: false, team: [{ dex: '013', name: 'Rarcraft', lv: 2, ability: 'Pickup / Frisk', moves: ['Scratch', 'Tail Whip'], note: '' }, { dex: '013', name: 'Rarcraft', lv: 3, ability: 'Pickup / Frisk', moves: ['Scratch', 'Tail Whip', 'Thief'], note: '' }] }, { name: 'Amanda', role: 'Lass', sprite: 'LASS.png', starterDependent: false, team: [{ dex: '010', name: 'Sicklet', lv: 4, ability: 'Keen Eye / Poison Touch', moves: ['Tackle', 'Growl'], note: '' }] }],
    },
    {
      slug: 'eventide-forest', name: 'Eventide Forest', kind: 'Forest', tag: '',
      desc: 'A dense forest north of Route 1. Reetle\'s Grotto is hidden here and contains the Strange Stone — look for the path between a small brown tree and a green tree. Leads north to Professor Hickory\'s Lab.',
      exits: 'North — Professor Hickory\'s Lab | South — Route 1 | East — Route 5 (Acciome)',
      encounter: 'Grass', map: 'eventide-forest.png',
      mons: ['010', '017', '025', '027', '023', '052', '034'],
      encounters: [{ dex: '010', pct: 25, lv: '3-6', method: 'Land' }, { dex: '017', pct: 22, lv: '3-6', method: 'Land' }, { dex: '025', pct: 16, lv: '3-6', method: 'Land' }, { dex: '027', pct: 16, lv: '3-6', method: 'Land' }, { dex: '023', pct: 15, lv: '3-6', method: 'Land' }, { dex: '052', pct: 5, lv: '3-6', method: 'Land' }, { dex: '034', pct: 1, lv: '7', method: 'Land' }],
      items: ['Great Ball', 'Potion'],
      quests: ['Strange Stone (Reetle\'s Grotto)'],
      npcs: [{ name: 'Lorenzo', role: 'Bug Catcher', sprite: 'BUGCATCHER.png', starterDependent: false, team: [{ dex: '017', name: 'Reetle', lv: 4, ability: 'Rattled / Compound Eyes', moves: ['Astonish', 'Growl', 'Flail'], note: '' }] }, { name: 'Dustin', role: 'Student', sprite: 'STUDENT_M.png', starterDependent: false, team: [{ dex: '020', name: 'Dustalon', lv: 4, ability: 'Tangled Feet / Big Pecks', moves: ['Tackle', 'Sand Attack'], note: '' }, { dex: '029', name: 'Capikid', lv: 3, ability: 'Fluffy / Volt Absorb', moves: ['Thunder Shock', 'Baby-Doll Eyes'], note: '' }] }, { name: 'Jenny', role: 'Student', sprite: 'STUDENT_F.png', starterDependent: false, team: [{ dex: '025', name: 'Yarnsect', lv: 3, ability: 'Cute Charm / Swarm', moves: ['Fairy Wind', 'String Shot'], note: '' }, { dex: '027', name: 'Pawnut', lv: 4, ability: 'Inner Focus / Weak Armor', moves: ['Tackle', 'Harden', 'Leech Seed'], note: '' }] }],
    },
    {
      slug: 'professor-hickorys-lab', name: 'Professor Hickory\'s Lab', kind: 'Lab', tag: '',
      desc: 'The research laboratory north of Eventide Forest, home to Professor Hickory\'s study of the Drapalla region\'s Pokémon and the anomalies of the Nullspace Rift.',
      exits: 'South — Eventide Forest',
      encounter: '', map: '',
      mons: [],
      encounters: [],
      items: [],
      quests: [],
      npcs: [{ name: 'Professor Hickory', role: 'Professor', sprite: 'PROFESSOR_HICKORY.png', starterDependent: false, line: 'The region\'s leading researcher, devoted to the Pokémon of Drapalla and the mysteries of the Void.', team: '' }],
    },
    {
      slug: 'route-5', name: 'Route 5', kind: 'Route', tag: '',
      desc: 'Connects Eventide Forest to Acciome City. A grassy route patrolled by students and a returning rival.',
      exits: 'West — Eventide Forest | East — Acciome | Southwest — Route 1',
      encounter: 'Grass', map: 'route-5.png',
      mons: ['013', '029', '041', '061', '081', '084', '091'],
      encounters: [{ dex: '013', pct: 25, lv: '6-8', method: 'Land' }, { dex: '029', pct: 25, lv: '6-8', method: 'Land' }, { dex: '041', pct: 15, lv: '6-8', method: 'Land' }, { dex: '061', pct: 10, lv: '6-8', method: 'Land' }, { dex: '081', pct: 10, lv: '6-8', method: 'Land' }, { dex: '084', pct: 10, lv: '6-8', method: 'Land' }, { dex: '091', pct: 5, lv: '8', method: 'Land' }],
      items: ['Potion'],
      quests: [],
      npcs: [{ name: 'Nikola', role: 'Pokékid', sprite: 'POKEKID.png', starterDependent: false, team: [{ dex: '047', name: 'Pebpup', lv: 4, ability: 'Sturdy / Solid Rock', moves: ['Bide', 'Rollout'], note: '' }, { dex: '036', name: 'Scraqua', lv: 4, ability: 'Hydration / Ball Fetch', moves: ['Tackle', 'Water Sport'], note: '' }] }, { name: 'Tina', role: 'Florist', sprite: 'FLORIST.png', starterDependent: false, team: [{ dex: '025', name: 'Yarnsect', lv: 3, ability: 'Cute Charm / Swarm', moves: ['Fairy Wind', 'String Shot'], note: '' }, { dex: '041', name: 'Shrubcub', lv: 7, ability: 'Chlorophyll / Regenerator', moves: ['Scratch', 'Leer', 'Fury Swipes'], note: '' }] }, { name: 'Kimmi', role: 'Perfume Girl', sprite: 'PERFUME_GIRL.png', starterDependent: false, team: [{ dex: '034', name: 'Tartort', lv: 10, ability: 'Sweet Veil / Ripen', moves: ['Sweet Scent', 'Natural Gift', 'Growth', 'Breaking Swipe'], note: '' }] }, { name: 'Rival Seren', role: 'Rival', sprite: 'RIVAL_SEREN.png', starterDependent: true, team: [ { dex: '056', name: 'Purssume', lv: 9, ability: '', moves: ['Astonish', 'Quick Attack', 'Tail Whip'], note: '' } ], starterNote: 'Seren always brings Purssume, plus the starter strong against the one you chose:', starterOptions: [ { ifYouPicked: 'Tamatoo (Grass)', dex: '004', name: 'Flaret', lv: 9, moves: ['Ember', 'Tackle'] }, { ifYouPicked: 'Flaret (Fire)', dex: '007', name: 'Cubble', lv: 9, moves: ['Bubble', 'Growl', 'Pound'] }, { ifYouPicked: 'Cubble (Water)', dex: '001', name: 'Tamatoo', lv: 9, moves: ['Leafage', 'Tackle', 'Defense Curl'] } ] }],
    },
    {
      slug: 'acciome-city', name: 'Acciome City', kind: 'City', tag: '',
      desc: 'A highly developed city known for its prestigious university and tight-knit community, filled with apartments and parks dedicated to its founder, Arun. Acciome University nurtures aspiring trainers, researchers, and educators. The player attends classes and has their first rival battle against Kayden here.',
      exits: 'West — Route 5 | North — Acciome University',
      encounter: '', map: 'acciome-city.png',
      mons: [],
      encounters: [],
      items: ['Potion x2'],
      quests: [],
      npcs: [{ name: 'Kayden', role: 'Rival', sprite: 'POKEMONTRAINER_KAYDEN.png', starterDependent: false, team: [{ dex: '049', name: 'Twilawoof', lv: 7, ability: 'Intimidate / Pickup', moves: ['Scratch', 'Growl', 'Quick Attack'], note: '' }, { dex: '010', name: 'Sicklet', lv: 5, ability: 'Keen Eye / Poison Touch', moves: ['Tackle', 'Growl', 'Gust'], note: '' }] }],
    },
    {
      slug: 'route-2', name: 'Route 2', kind: 'Route', tag: '',
      desc: 'Home to a fishing hut where you can obtain the Old Rod by speaking to the fisherman inside. Connects Saudade Town to Limerico Town, with a path northwest to Pebpup Cavern.',
      exits: 'East — Saudade Town | West — Limerico Town | Northwest — Pebpup Cavern',
      encounter: 'Grass', map: 'route-2.png',
      mons: ['063', '010', '013', '097', '047', '038', '044', '056', '036'],
      encounters: [{ dex: '063', pct: 75, lv: '5-8', method: 'Fishing' }, { dex: '010', pct: 25, lv: '5-8', method: 'Land' }, { dex: '013', pct: 25, lv: '5-8', method: 'Land' }, { dex: '097', pct: 25, lv: '5-8', method: 'Fishing' }, { dex: '047', pct: 15, lv: '5-8', method: 'Land' }, { dex: '038', pct: 10, lv: '5-8', method: 'Land' }, { dex: '044', pct: 10, lv: '5-8', method: 'Land' }, { dex: '056', pct: 10, lv: '5-8', method: 'Land' }, { dex: '036', pct: 5, lv: '5-8', method: 'Land' }],
      items: ['Potion', 'Big Root'],
      quests: ['Saving Maumau'],
      npcs: [{ name: 'Jay M.', role: 'Fisherman', sprite: 'FISHERMAN.png', starterDependent: false, team: [{ dex: '063', name: 'Rhythfin', lv: 5, ability: 'Swift Swim', moves: ['Bubble', 'Growl'], note: '' }, { dex: '097', name: 'Broocling', lv: 6, ability: 'Windrider / Own Tempo', moves: ['Tackle', 'Tail Whip', 'Pursuit', 'Water Gun'], note: '' }] }, { name: 'Fran', role: 'Student', sprite: 'STUDENT_F.png', starterDependent: false, team: [{ dex: '052', name: 'Karmold', lv: 10, ability: 'Color Change / Protean', moves: ['Camouflage', 'Hypnosis', 'Lick', 'Return'], note: '' }] }],
    },
    {
      slug: 'pebpup-cavern', name: 'Pebpup Cavern', kind: 'Cave', tag: '',
      desc: 'Known for its large Pebpup population and mysterious distortion-like properties. Site of the player\'s first encounter with Gym Leader Clara and first clash with Team Pokémon Void, alongside Seren and Pecan. The Exp. Share is found in the western entrance, between two steps.',
      exits: 'West — Limerico Town | (connects to Route 2)',
      encounter: 'Cave', map: 'pebpup-cavern.png',
      mons: ['063', '047', '025', '093'],
      encounters: [{ dex: '063', pct: 90, lv: '7-9', method: 'Fishing' }, { dex: '047', pct: 84, lv: '6-10', method: 'Cave' }, { dex: '025', pct: 14, lv: '7-9', method: 'Cave' }, { dex: '093', pct: 10, lv: '6-8', method: 'Fishing' }, { dex: '093', pct: 2, lv: '9', method: 'Cave' }],
      items: ['Exp. Share'],
      quests: [],
      npcs: [{ name: 'Vivian', role: 'Scientist', sprite: 'SCIENTIST_F.png', starterDependent: false, team: [{ dex: '010', name: 'Sicklet', lv: 4, ability: 'Keen Eye / Poison Touch', moves: ['Tackle', 'Growl'], note: '' }, { dex: '013', name: 'Rarcraft', lv: 6, ability: 'Pickup / Frisk', moves: ['Scratch', 'Tail Whip', 'Thief', 'Recycle'], note: '' }] }],
    },
    {
      slug: 'limerico-town', name: 'Limerico Town', kind: 'Town', tag: '',
      desc: 'Home to the Limerico Siblings, known for its abundance of livestock and farm life. Hosts the first Gym, led by Gym Leader Clara, as well as the first Pokémon Void Daycare Center. The Pokémart\'s trash can secretly holds a Leftovers — well worth grabbing early.',
      exits: 'North — Pebpup Cavern (Western Entrance) | East — Route 2 | West — Route 4',
      encounter: '', map: 'limerico-town.png',
      mons: [],
      encounters: [],
      items: ['Leftovers', 'Everstone', 'Exp. Share'],
      quests: [],
      npcs: [{ name: 'Forest', role: 'Farmer', sprite: 'FARMER.png', starterDependent: false, team: [{ dex: '038', name: 'Scalfling', lv: 9, ability: 'Cud Chew / Poison Point', moves: ['Poison Sting', 'Tail Whip', 'Rage'], note: '' }, { dex: '027', name: 'Pawnut', lv: 11, ability: 'Inner Focus / Weak Armor', moves: ['Harden', 'Leech Seed', 'Growth', 'Protect'], note: '' }] }, { name: 'Siesta', role: 'Harvester', sprite: 'HARVESTER.png', starterDependent: false, team: [{ dex: '044', name: 'Cruspud', lv: 13, ability: 'Stench', moves: ['Rollout', 'Sand Attack', 'Infestation', 'Mud Shot'], note: '' }] }, { name: 'Clara', role: 'Gym Leader', sprite: 'LEADER_CLARA.png', starterDependent: false, team: [{ dex: '044', name: 'Cruspud', lv: 12, ability: 'Harvest', moves: ['Rollout', 'Sand Attack', 'Infestation', 'Work Up'], note: '' }, { dex: '036', name: 'Scraqua', lv: 14, ability: 'Hydration / Ball Fetch', moves: ['Tackle', 'Water Sport', 'Work Up', 'Bite'], note: '' }, { dex: '039', name: 'Bision', lv: 16, ability: 'Intimidate', moves: ['Work Up', 'Poison Tail', 'Rage', 'Bulldoze'], note: '' }] }],
    },
    {
      slug: 'route-4', name: 'Route 4', kind: 'Route', tag: '',
      desc: 'A route west of Limerico Town leading north toward Apocrypha Town.',
      exits: 'North — Apocrypha Town | Southeast — Limerico Town',
      encounter: 'Grass', map: 'route-4.png',
      mons: ['032', '018', '086', '108', '100', '049', '104'],
      encounters: [{ dex: '032', pct: 25, lv: '7-12', method: 'Land' }, { dex: '018', pct: 20, lv: '7-12', method: 'Land' }, { dex: '086', pct: 20, lv: '7-12', method: 'Land' }, { dex: '108', pct: 15, lv: '7-12', method: 'Land' }, { dex: '100', pct: 10, lv: '10-12', method: 'Land' }, { dex: '049', pct: 5, lv: '7-12', method: 'Land' }, { dex: '104', pct: 5, lv: '7-12', method: 'Land' }],
      items: ['PP Up', 'Zinc', 'Quick Ball', 'Rare Candy'],
      quests: [],
      npcs: [{ name: 'Felix', role: 'Student', sprite: 'STUDENT_M.png', starterDependent: false, team: [{ dex: '111', name: 'SC0R-910', lv: 20, ability: '', moves: ['Harden', 'Vise Grip', 'Disable', 'Wonder Room'], note: '' }] }, { name: 'Natty', role: 'Lass', sprite: 'LASS.png', starterDependent: false, team: [{ dex: '034', name: 'Tartort', lv: 18, ability: '', moves: ['Natural Gift', 'Growth', 'Breaking Swipe', 'Leaf Tornado'], note: '' }, { dex: '087', name: 'Flarflock', lv: 19, ability: '', moves: ['Ember', 'Sing', 'Round', 'Sunny Day'], note: '' }] }, { name: 'Huebert', role: 'Pokékid', sprite: 'POKEKID.png', starterDependent: false, team: [{ dex: '091', name: 'Mangmo', lv: 18, ability: '', moves: ['Twister', 'Defog', 'Wing Attack', 'Focus Energy'], note: '' }, { dex: '036', name: 'Scraqua', lv: 18, ability: '', moves: ['Water Sport', 'Howl', 'Bite', 'Aqua Jet'], note: '' }] }],
    },
    {
      slug: 'route-3', name: 'Route 3', kind: 'Route', tag: '',
      desc: 'A grassy route home to a variety of early-game Pokémon.',
      exits: 'North — Saudade Town | South — Aphora Town',
      encounter: 'Grass', map: 'route-3.png',
      mons: ['063', '013', '020', '029', '097', '059', '056', '089'],
      encounters: [{ dex: '063', pct: 70, lv: '4-7', method: 'Fishing' }, { dex: '013', pct: 25, lv: '4-7', method: 'Land' }, { dex: '020', pct: 25, lv: '4-7', method: 'Land' }, { dex: '029', pct: 25, lv: '4-7', method: 'Land' }, { dex: '097', pct: 25, lv: '4-7', method: 'Fishing' }, { dex: '059', pct: 15, lv: '4-7', method: 'Land' }, { dex: '056', pct: 10, lv: '6', method: 'Land' }, { dex: '089', pct: 5, lv: '6', method: 'Fishing' }],
      items: [],
      quests: [],
      npcs: [{ name: 'Teddy', role: 'Student', sprite: 'STUDENT_M.png', starterDependent: false, team: [{ dex: '017', name: 'Reetle', lv: 6, ability: 'Rattled / Compound Eyes', moves: ['Astonish', 'Growl', 'Flail'], note: '' }, { dex: '032', name: 'Powse', lv: 6, ability: 'Cheek Pouch', moves: ['Pound', 'Tail Whip', 'Work Up'], note: '' }] }],
    },
    {
      slug: 'aphora-town', name: 'Aphora Town', kind: 'Town', tag: '',
      desc: 'A place steeped in history, filled with clues about Primordial Pokémon and the origins of Cosmic and Light types. Known for its beautiful crystal-blue flowers. Here you can find the Pokédoll (from a ghostly child in one of the houses) and the Move Re-Learner (inside one of the homes).',
      exits: 'North — Route 3',
      encounter: '', map: 'aphora-town.png',
      mons: [],
      encounters: [],
      items: ['Pokédoll'],
      quests: [],
      npcs: [{ name: 'Student Teddy', role: 'Student', sprite: 'STUDENT_M.png', line: '', team: '' }],
    },
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
  // Stable alphabetical move-id map: name <-> 2-char base36 id.
  // Sorted by name so adding NEW moves later never shifts existing ids (old codes stay valid).
  let _moveIds = null, _idMoves = null;
  const _mvNorm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  function _buildMoveIds() {
    const names = Array.from(new Set(MOVES.flat().map(m => m.name))).sort((a, b) => a.localeCompare(b));
    _moveIds = new Map(); _idMoves = new Map();
    names.forEach((n, i) => { const id = i.toString(36).padStart(2, '0'); _moveIds.set(_mvNorm(n), id); _idMoves.set(id, n); });
  }
  const moveToId = (name) => { if (!_moveIds) _buildMoveIds(); return _moveIds.get(_mvNorm(name)) || null; };
  const idToMove = (id) => { if (!_idMoves) _buildMoveIds(); return _idMoves.get(id) || null; };



  return { MOVES, ABILITIES, ITEMS, PICKUP, ROUTES, TRAINERS, CHART, eff, TYPE_ORDER, byMove, computeMatchups, computeMatchupsDetailed, moveToId, idToMove };
})();
