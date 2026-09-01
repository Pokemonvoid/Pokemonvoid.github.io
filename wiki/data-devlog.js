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
      version: 'v0.1.5',
      date: '',
      title: 'Patch v0.1.5',
      summary: '',
      download: {
        label: 'Download v0.1.5',
        url: 'https://www.mediafire.com/file/qiirj25m8s2fu78/Pokemon+Void+0.1.5+(encryptionfix).zip/file',
      },
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
