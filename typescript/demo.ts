// Tries your functions on a small music library. Run it with: node demo.ts
import { builtInSort, mergeSort } from "./music-library.ts";
import type { Song } from "./music-library.ts";

const library: Song[] = [{ artist: "Night Bus Trio", album: "City Lights", track: 2, title: "Blue Hour" }, { artist: "Marigold Avenue", album: "Sunday Static", track: 1, title: "Amber Road" }, { artist: "Night Bus Trio", album: "City Lights", track: 1, title: "Desert Lights" }, { artist: "Copper Kettle Band", album: "Kettle Songs", track: 3, title: "Falling Up" }, { artist: "Marigold Avenue", album: "Lantern Season", track: 2, title: "Lemon Skies" }, { artist: "Copper Kettle Band", album: "Kettle Songs", track: 1, title: "Echo Park" }, { artist: "Marigold Avenue", album: "Sunday Static", track: 2, title: "Copper Moon" }, { artist: "Night Bus Trio", album: "Afterglow", track: 4, title: "Velvet Train" }];

const byMergeSort = mergeSort(library);
console.log("Merge sort:");
for (const song of byMergeSort) {
  console.log(`${song.artist} / ${song.album} / ${song.track}: ${song.title}`);
}
const same = JSON.stringify(byMergeSort) === JSON.stringify(builtInSort(library));
console.log(`Built-in sort gives the same order: ${same ? "yes" : "no"}`);
