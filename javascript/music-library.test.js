// The tests for your three functions. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.
import assert from "node:assert/strict";
import { test } from "node:test";
import { builtInSort, compareSongs, mergeSort } from "./music-library.js";

const SAMPLE = [{ artist: "Night Bus Trio", album: "City Lights", track: 2, title: "Blue Hour" }, { artist: "Marigold Avenue", album: "Sunday Static", track: 1, title: "Amber Road" }, { artist: "Night Bus Trio", album: "City Lights", track: 1, title: "Desert Lights" }, { artist: "Copper Kettle Band", album: "Kettle Songs", track: 3, title: "Falling Up" }, { artist: "Marigold Avenue", album: "Lantern Season", track: 2, title: "Lemon Skies" }, { artist: "Copper Kettle Band", album: "Kettle Songs", track: 1, title: "Echo Park" }, { artist: "Marigold Avenue", album: "Sunday Static", track: 2, title: "Copper Moon" }, { artist: "Night Bus Trio", album: "Afterglow", track: 4, title: "Velvet Train" }];
const SORTED = [{ artist: "Copper Kettle Band", album: "Kettle Songs", track: 1, title: "Echo Park" }, { artist: "Copper Kettle Band", album: "Kettle Songs", track: 3, title: "Falling Up" }, { artist: "Marigold Avenue", album: "Lantern Season", track: 2, title: "Lemon Skies" }, { artist: "Marigold Avenue", album: "Sunday Static", track: 1, title: "Amber Road" }, { artist: "Marigold Avenue", album: "Sunday Static", track: 2, title: "Copper Moon" }, { artist: "Night Bus Trio", album: "Afterglow", track: 4, title: "Velvet Train" }, { artist: "Night Bus Trio", album: "City Lights", track: 1, title: "Desert Lights" }, { artist: "Night Bus Trio", album: "City Lights", track: 2, title: "Blue Hour" }];

function bigLibrary() {
  const songs = [];
  for (let i = 0; i < 1000; i++) {
    const n = i * 7919 % 1000;
    songs.push({ artist: `Artist ${Math.floor(n / 100)}`, album: `Album ${Math.floor(n / 20) % 5}`, track: n % 20 + 1, title: `Song ${n}` });
  }
  return songs;
}

test("compare songs goes by artist first", () => {
  assert.ok(compareSongs({ artist: "Copper Kettle Band", album: "Kettle Songs", track: 1, title: "Echo Park" }, { artist: "Night Bus Trio", album: "Afterglow", track: 4, title: "Velvet Train" }) < 0, "Not yet: Copper Kettle Band comes before Night Bus Trio.");
  assert.ok(compareSongs({ artist: "Night Bus Trio", album: "Afterglow", track: 4, title: "Velvet Train" }, { artist: "Copper Kettle Band", album: "Kettle Songs", track: 1, title: "Echo Park" }) > 0, "Not yet: Night Bus Trio comes after Copper Kettle Band.");
});

test("compare songs goes by album, then track, when the artist ties", () => {
  assert.ok(compareSongs({ artist: "Marigold Avenue", album: "Lantern Season", track: 2, title: "Lemon Skies" }, { artist: "Marigold Avenue", album: "Sunday Static", track: 1, title: "Amber Road" }) < 0, "Not yet: for Marigold Avenue, the album Lantern Season comes before Sunday Static.");
  assert.ok(compareSongs({ artist: "Night Bus Trio", album: "City Lights", track: 2, title: "Blue Hour" }, { artist: "Night Bus Trio", album: "City Lights", track: 1, title: "Desert Lights" }) > 0, "Not yet: on City Lights, track 2 comes after track 1.");
  assert.ok(compareSongs({ artist: "Night Bus Trio", album: "City Lights", track: 1, title: "Desert Lights" }, { artist: "Night Bus Trio", album: "City Lights", track: 2, title: "Blue Hour" }) < 0, "Not yet: on City Lights, track 1 comes before track 2.");
  assert.equal(compareSongs({ artist: "Night Bus Trio", album: "City Lights", track: 2, title: "Blue Hour" }, { artist: "Night Bus Trio", album: "City Lights", track: 2, title: "Blue Hour" }), 0, "Not yet: a song ties with itself, so the answer is 0.");
});

test("merge sort lists the library in order", () => {
  assert.deepEqual(mergeSort(SAMPLE), SORTED, "Not yet: Copper Kettle Band's Echo Park comes first and Night Bus Trio's Blue Hour last.");
});

test("merge sort leaves the library as it was", () => {
  const library = [...SAMPLE];
  assert.deepEqual(mergeSort(library), SORTED, "Not yet: Copper Kettle Band's Echo Park comes first and Night Bus Trio's Blue Hour last.");
  assert.deepEqual(library, SAMPLE, "Not yet: give back a new list, and leave the library in its own order.");
});

test("merge sort handles short lists", () => {
  assert.deepEqual(mergeSort([{ artist: "Copper Kettle Band", album: "Kettle Songs", track: 1, title: "Echo Park" }]), [{ artist: "Copper Kettle Band", album: "Kettle Songs", track: 1, title: "Echo Park" }], "Not yet: a one-song list is already sorted.");
  assert.deepEqual(mergeSort([]), [], "Not yet: an empty list stays empty.");
});

test("merge sort keeps ties in their order", () => {
  assert.deepEqual(mergeSort([{ artist: "Marigold Avenue", album: "Sunday Static", track: 3, title: "Slow Rain (Live)" }, { artist: "Copper Kettle Band", album: "Kettle Songs", track: 2, title: "Paper Boats" }, { artist: "Marigold Avenue", album: "Sunday Static", track: 3, title: "Slow Rain" }]), [{ artist: "Copper Kettle Band", album: "Kettle Songs", track: 2, title: "Paper Boats" }, { artist: "Marigold Avenue", album: "Sunday Static", track: 3, title: "Slow Rain (Live)" }, { artist: "Marigold Avenue", album: "Sunday Static", track: 3, title: "Slow Rain" }],
    "Not yet: Slow Rain (Live) and Slow Rain tie on artist, album and track, so a stable sort keeps the live version first, as it was given.");
});

test("built-in sort lists the library in order", () => {
  const library = [...SAMPLE];
  assert.deepEqual(builtInSort(library), SORTED, "Not yet: Copper Kettle Band's Echo Park comes first and Night Bus Trio's Blue Hour last.");
  assert.deepEqual(library, SAMPLE, "Not yet: give back a new list, and leave the library in its own order.");
});

test("built-in sort keeps ties in their order", () => {
  const takes = [];
  for (let take = 1; take <= 10; take++) {
    for (let artist = 19; artist >= 0; artist--) {
      takes.push({ artist: `Artist ${String(artist).padStart(2, "0")}`, album: "Live at the Depot", track: 1, title: `Take ${take}` });
    }
  }
  const expected = [];
  for (let artist = 0; artist <= 19; artist++) {
    for (let take = 1; take <= 10; take++) {
      expected.push({ artist: `Artist ${String(artist).padStart(2, "0")}`, album: "Live at the Depot", track: 1, title: `Take ${take}` });
    }
  }
  assert.deepEqual(builtInSort(takes), expected,
    "Not yet: each artist's ten takes tie on artist, album and track, so a stable sort keeps them in the order they were given, Take 1 to Take 10.");
});

test("both sorts agree on a thousand songs", () => {
  const byMergeSort = mergeSort(bigLibrary());
  assert.equal(byMergeSort.length, 1000, "Not yet: all 1,000 songs should be in the sorted list.");
  assert.equal(byMergeSort[0]?.title, "Song 0", "Not yet: Artist 0's Album 0, track 1, is Song 0, and it comes first.");
  assert.equal(byMergeSort[999]?.title, "Song 999", "Not yet: Artist 9's Album 4, track 20, is Song 999, and it comes last.");
  assert.deepEqual(builtInSort(bigLibrary()), byMergeSort, "Not yet: your merge sort and the built-in sort should give the same order.");
});

test("fifty thousand songs sort in under two seconds", () => {
  const library = [];
  for (let i = 0; i < 50000; i++) {
    const k = (i * 7919) % 50000;
    library.push({ artist: `Artist ${String(Math.floor(k / 1000)).padStart(3, "0")}`, album: `Album ${String(Math.floor(k / 20) % 50).padStart(2, "0")}`, track: (k % 20) + 1, title: `Song ${k}` });
  }
  const started = performance.now();
  const sorted = mergeSort(library);
  const seconds = (performance.now() - started) / 1000;
  assert.equal(sorted.length, 50000, "Not yet: all 50,000 songs should be in the sorted list.");
  assert.ok(seconds < 2, `Not yet: sorting 50,000 songs took ${seconds.toFixed(1)} seconds, and the ticket allows 2. A sort that splits and merges makes about 800,000 comparisons here; one that compares song by song makes hundreds of millions.`);
  for (let position = 0; position < sorted.length; position++) {
    if (sorted[position].title !== `Song ${position}`) {
      assert.fail(`Not yet: position ${position} should be Song ${position}: Artist, then album, then track.`);
    }
  }
});
