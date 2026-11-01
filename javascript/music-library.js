// Your three functions. The comment above each one says what it should
// return. Replace each return line with your own code, and write the
// sorts' growth rates in their comments.

// A song is an object with an artist, an album, a track number and a title:
// { artist: "Night Bus Trio", album: "City Lights", track: 2, title: "Blue Hour" }

/*
 * Compare two songs the way a music library lists them: by artist,
 * then by album when the artists are the same, then by track number
 * when the albums are the same too. Give back a negative number when a
 * comes first, a positive number when b comes first, and 0 when they
 * tie on all three. Compare names letter by letter, capitals first.
 *
 * compareSongs(Copper Kettle Band / Kettle Songs / 1, Night Bus Trio / Afterglow / 4) -> negative
 * compareSongs(Night Bus Trio / City Lights / 2, Night Bus Trio / City Lights / 1) -> positive
 * compareSongs(Night Bus Trio / City Lights / 2, Night Bus Trio / City Lights / 2) -> 0
 */
export function compareSongs(a, b) {
  return 0;
}

/*
 * Sort the songs with your own merge sort, using compareSongs to
 * decide which song comes first: split the list in half, sort each half
 * the same way, then merge the two sorted halves. On a tie, take the
 * song from the left half first, so songs that tie keep their order
 * (a stable sort). Give back a new list; leave the one you were given
 * as it was.
 *
 * Growth rate: (write it here)
 */
export function mergeSort(songs) {
  return [];
}

/*
 * The same order as mergeSort, with your language's built-in
 * sort and compareSongs. Give back a new list; leave the one you were
 * given as it was.
 *
 * Growth rate: (write it here)
 */
export function builtInSort(songs) {
  return [];
}
