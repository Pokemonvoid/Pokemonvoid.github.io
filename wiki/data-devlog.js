/* Pokémon Void — Dev Log / Patch Notes data.  window.VDEVLOG = { ENTRIES }
   Newest entry first. Add new entries by copying the shape below.

   Entry shape:
     version:  short version/tag shown as a badge (e.g. "v0.1.5") — optional
     date:     display date string — optional
     title:    headline for the entry
     summary:  one or two sentence blurb shown under the title — optional
     download: { label: 'Download v0.1.5', url: 'https://...' } — optional
     sections: [{ label: 'Added' | 'Changed' | 'Fixed' | 'Removed' | any string,
                  items: ['line 1', 'line 2', ...] }]
       Any section with an empty items array is skipped.
     known:    ['line describing a known issue', ...] — optional, rendered as a warning callout
     upcoming: ['line describing what is being worked on', ...] — optional */
window.VDEVLOG = (function () {
  const ENTRIES = [
    {
      "version": "v1.0.0",
      "date": "",
      "title": "Chapter 1 — Pokémon Void Redux",
      "download": { "label": "Download v1.0.0", "url": "https://github.com/Pokemonvoid/Pokemonvoid.github.io/releases/download/v1.0.0/Pokemon.Void.Part.1.REDUX.-.1.0.0.zip" },
      "summary": "Chapter 1 rebuilds the demo into a complete adventure through the second Gym, with new areas, side quests and a postgame. Create your trainer, explore more of Drapalla and carry your demo Pokémon into a fresh story.",
      "sections": [
        {
          "label": "New Content",
          "items": [
            "Chapter 1 is complete, with 13 main quests, two full Gyms, a new finale, an ending screen and credits.",
            "Explore Routes 8 and 9, including farmland, a cliffside beach, new trainers, wild Pokémon and item pickups.",
            "Take on Clara’s ranch trial in Limerico and Seiya’s three-course cooking trial in Consilia.",
            "22 side quests bring races, fishing challenges, ranch jobs, deliveries, trash diving and more to Drapalla.",
            "Quest boards appear across towns and routes, with location pictures and completion stamps. Track your objectives in the quest log.",
            "After finishing the chapter, visit the Saudade portal and challenge Self Gym across six difficulties: Easy, Medium, Hard, Champion, Unfair and Corrupted.",
            "Return to the lab after the story for new conversations and Hickory’s Chapter Pokédex progress check."
          ]
        },
        {
          "label": "Pokémon, Moves & Battle",
          "items": [
            "Cosmic and Light types arrive alongside around 60 new or retyped moves, including new signature moves.",
            "17 new TMs replace the previous TM list. HM01–06 remain available.",
            "Pokédex descriptions have been rewritten for 107 species, with spelling corrections throughout.",
            "Radbit, Thortane and Kraboil can be found in the new areas.",
            "Pymood evolves at level 25 into Gleeruption or Scorow depending on friendship. Karmold’s friendship at level 32 determines its Kamoleon form.",
            "Rarcraft can evolve by investigating a trash can from the first party slot at level 20 or above. Its stats or a held comic determine the evolution.",
            "Aqua Jet is now learned at level 13 and Odor Sleuth at level 16 for Scraqua and Hydrena.",
            "The Anomaly Charm improves the chance of finding an anomalous Pokémon to approximately 1 in 100.",
            "Hard Mode can be chosen at the start: opposing trainers receive perfect IVs, 252 EVs in every stat and two extra levels. Wild Pokémon and allied trainers are unchanged. You can lower the difficulty to Normal later, but cannot raise it again.",
            "The level curve after Gym 1 has been rebalanced, including rival battles, wild encounters, Gym 2 and the chapter’s final battles."
          ]
        },
        {
          "label": "Items & Training",
          "items": [
            "Training Balls give caught Pokémon three base EVs per defeated Pokémon, distributed across the defeated species’ usual EV yield.",
            "An upgraded Exp. Share is available from Maple at the lab debrief.",
            "Poké Mart second clerks offer additional Balls, vitamins, battle items and type-resist berries.",
            "A produce cart on Route 8 sells Fresh Water, Soda Pop, Lemonade and Moomoo Milk.",
            "New key items and quest items support the expanded adventure, and around 120 additional items now have their own artwork."
          ]
        },
        {
          "label": "Character Creation & Presentation",
          "items": [
            "Choose Ronan, Nya or Seren and customize skin tone, hairstyle, hair colour and battle pose. The other two characters become your rivals.",
            "Choose from 42 hair-colour ramps, with optional two-tone hair and Normal, Clumsy or Sporadic poses.",
            "Use the mirror in your room to change your appearance later. Skin tone remains locked.",
            "A new fishing minigame lets you hook, reel and land Pokémon before battling them.",
            "The rebuilt pause menu spans two pages and includes Quests, Story Recap and Credits.",
            "Cutscenes use smoother camera movement and improved framing. Map edges and screen shake have also been corrected.",
            "New evolution and level-up animations, Pokémon intro animations, animated water and interiors, weather overlays and shadows improve the look of the adventure.",
            "New and updated music accompanies routes, Gym trials, leaders, rivals and major battles. Fonts and accented characters are clearer."
          ]
        },
        {
          "label": "Saves & Demo Carry-over",
          "items": [
            "Three save files are supported, with a file picker showing names, badges and play time.",
            "Loading a demo save lets you begin the rebuilt story with your party, boxed Pokémon and Day Care Pokémon. Pokédex seen and caught records also carry over.",
            "Carried-over Pokémon are healed and obey from the start. Box names and wallpapers are retained, with an extra Demo box added if needed.",
            "Story progress, Bag items, money, badges, quests and appearance start fresh. Held items and Mail are removed during carry-over.",
            "Your demo file is not overwritten until you first save in the new game."
          ]
        },
        {
          "label": "Fixes & Improvements",
          "items": [
            "Fixed crashes involving the Sedimite boss, Mystery Gift Man, Mom, rival idle behaviour and the pause menu.",
            "Fixed invisible Pokémon and NPCs, missing door sounds and quests that failed to start or finish.",
            "Corrected story triggers, rival positioning and dialogue, duplicate quest jingles and several event conflicts.",
            "Improved collisions around walls, water, doors, kitchen counters and decorations, including Routes 8 and 9.",
            "Quest boards no longer trigger from the tile underneath them. Heimskur’s Fields lets you choose the requested Pokémon and will not take your last partner.",
            "Fixed missing music in Pokémon Centers and Gym battles, restored battle shadows and corrected numerous spelling and wording issues."
          ]
        }
      ]
    },
    {
      version: 'v0.1.5',
      date: '',
      title: 'Patch v0.1.5',
      summary: '',
      sections: [
        {
          label: 'New Content',
          items: [
            'Added 2 new explorable areas: Route 4 (accessible after clearing Gym 1) and Aphora Town (located below Route 3)',
            'Move Re-learner now available in Aphora Town',
            'Route 1 / Route 5 Gate now accessible after learning about Sync Bands',
          ],
        },
        {
          label: 'Fixes & Improvements',
          items: [
            'Rebalanced various elements of the game',
            'Collision fixes',
            'Softlocks resolved',
            'General bug fixes',
          ],
        },
      ],
      known: [
        'The Sedimite line currently has a known issue with Sync Bands — this has been temporarily disabled for them while their abilities undergo rebalancing. A fix is in the works!',
      ],
      upcoming: [
        'Re-encryption and compression',
        'Anomalies will be viewable — coming in the next update!',
      ],
    },
  ];
  return { ENTRIES };
})();
