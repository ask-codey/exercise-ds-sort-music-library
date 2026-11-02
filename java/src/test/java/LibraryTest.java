import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

// The tests for your three methods. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.
class LibraryTest {
    private static final List<Song> SAMPLE = List.of(new Song("Night Bus Trio", "City Lights", 2, "Blue Hour"), new Song("Marigold Avenue", "Sunday Static", 1, "Amber Road"), new Song("Night Bus Trio", "City Lights", 1, "Desert Lights"), new Song("Copper Kettle Band", "Kettle Songs", 3, "Falling Up"), new Song("Marigold Avenue", "Lantern Season", 2, "Lemon Skies"), new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park"), new Song("Marigold Avenue", "Sunday Static", 2, "Copper Moon"), new Song("Night Bus Trio", "Afterglow", 4, "Velvet Train"));
    private static final List<Song> SORTED = List.of(new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park"), new Song("Copper Kettle Band", "Kettle Songs", 3, "Falling Up"), new Song("Marigold Avenue", "Lantern Season", 2, "Lemon Skies"), new Song("Marigold Avenue", "Sunday Static", 1, "Amber Road"), new Song("Marigold Avenue", "Sunday Static", 2, "Copper Moon"), new Song("Night Bus Trio", "Afterglow", 4, "Velvet Train"), new Song("Night Bus Trio", "City Lights", 1, "Desert Lights"), new Song("Night Bus Trio", "City Lights", 2, "Blue Hour"));

    private static List<Song> bigLibrary() {
        List<Song> songs = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            int n = i * 7919 % 1000;
            songs.add(new Song("Artist " + n / 100, "Album " + n / 20 % 5, n % 20 + 1, "Song " + n));
        }
        return songs;
    }

    @Test
    void compareSongsGoesByArtistFirst() {
        assertTrue(Library.compareSongs(new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park"), new Song("Night Bus Trio", "Afterglow", 4, "Velvet Train")) < 0, "Not yet: Copper Kettle Band comes before Night Bus Trio.");
        assertTrue(Library.compareSongs(new Song("Night Bus Trio", "Afterglow", 4, "Velvet Train"), new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park")) > 0, "Not yet: Night Bus Trio comes after Copper Kettle Band.");
    }

    @Test
    void compareSongsGoesByAlbumThenTrackWhenTheArtistTies() {
        assertTrue(Library.compareSongs(new Song("Marigold Avenue", "Lantern Season", 2, "Lemon Skies"), new Song("Marigold Avenue", "Sunday Static", 1, "Amber Road")) < 0, "Not yet: for Marigold Avenue, the album Lantern Season comes before Sunday Static.");
        assertTrue(Library.compareSongs(new Song("Night Bus Trio", "City Lights", 2, "Blue Hour"), new Song("Night Bus Trio", "City Lights", 1, "Desert Lights")) > 0, "Not yet: on City Lights, track 2 comes after track 1.");
        assertTrue(Library.compareSongs(new Song("Night Bus Trio", "City Lights", 1, "Desert Lights"), new Song("Night Bus Trio", "City Lights", 2, "Blue Hour")) < 0, "Not yet: on City Lights, track 1 comes before track 2.");
        assertEquals(0, Library.compareSongs(new Song("Night Bus Trio", "City Lights", 2, "Blue Hour"), new Song("Night Bus Trio", "City Lights", 2, "Blue Hour")), "Not yet: a song ties with itself, so the answer is 0.");
    }

    @Test
    void mergeSortListsTheLibraryInOrder() {
        assertEquals(SORTED, Library.mergeSort(SAMPLE), "Not yet: Copper Kettle Band's Echo Park comes first and Night Bus Trio's Blue Hour last.");
    }

    @Test
    void mergeSortLeavesTheLibraryAsItWas() {
        List<Song> library = new ArrayList<>(SAMPLE);
        assertEquals(SORTED, Library.mergeSort(library), "Not yet: Copper Kettle Band's Echo Park comes first and Night Bus Trio's Blue Hour last.");
        assertEquals(SAMPLE, library, "Not yet: give back a new list, and leave the library in its own order.");
    }

    @Test
    void mergeSortHandlesShortLists() {
        assertEquals(List.of(new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park")), Library.mergeSort(List.of(new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park"))), "Not yet: a one-song list is already sorted.");
        assertEquals(List.of(), Library.mergeSort(List.of()), "Not yet: an empty list stays empty.");
    }

    @Test
    void mergeSortKeepsTiesInTheirOrder() {
        assertEquals(List.of(new Song("Copper Kettle Band", "Kettle Songs", 2, "Paper Boats"), new Song("Marigold Avenue", "Sunday Static", 3, "Slow Rain (Live)"), new Song("Marigold Avenue", "Sunday Static", 3, "Slow Rain")), Library.mergeSort(List.of(new Song("Marigold Avenue", "Sunday Static", 3, "Slow Rain (Live)"), new Song("Copper Kettle Band", "Kettle Songs", 2, "Paper Boats"), new Song("Marigold Avenue", "Sunday Static", 3, "Slow Rain"))),
            "Not yet: Slow Rain (Live) and Slow Rain tie on artist, album and track, so a stable sort keeps the live version first, as it was given.");
    }

    @Test
    void builtInSortListsTheLibraryInOrder() {
        List<Song> library = new ArrayList<>(SAMPLE);
        assertEquals(SORTED, Library.builtInSort(library), "Not yet: Copper Kettle Band's Echo Park comes first and Night Bus Trio's Blue Hour last.");
        assertEquals(SAMPLE, library, "Not yet: give back a new list, and leave the library in its own order.");
    }

    @Test
    void builtInSortKeepsTiesInTheirOrder() {
        List<Song> takes = new ArrayList<>();
        for (int take = 1; take <= 10; take++) {
            for (int artist = 19; artist >= 0; artist--) {
                takes.add(new Song("Artist %02d".formatted(artist), "Live at the Depot", 1, "Take " + take));
            }
        }
        List<Song> expected = new ArrayList<>();
        for (int artist = 0; artist <= 19; artist++) {
            for (int take = 1; take <= 10; take++) {
                expected.add(new Song("Artist %02d".formatted(artist), "Live at the Depot", 1, "Take " + take));
            }
        }
        assertEquals(expected, Library.builtInSort(takes), "Not yet: each artist's ten takes tie on artist, album and track, so a stable sort keeps them in the order they were given, Take 1 to Take 10.");
    }

    @Test
    void bothSortsAgreeOnAThousandSongs() {
        List<Song> byMergeSort = Library.mergeSort(bigLibrary());
        assertEquals(1000, byMergeSort.size(), "Not yet: all 1,000 songs should be in the sorted list.");
        assertEquals("Song 0", byMergeSort.get(0).title(), "Not yet: Artist 0's Album 0, track 1, is Song 0, and it comes first.");
        assertEquals("Song 999", byMergeSort.get(999).title(), "Not yet: Artist 9's Album 4, track 20, is Song 999, and it comes last.");
        assertEquals(byMergeSort, Library.builtInSort(bigLibrary()), "Not yet: your merge sort and the built-in sort should give the same order.");
    }

    @Test
    void fiftyThousandSongsSortInUnderTwoSeconds() {
        List<Song> library = new ArrayList<>();
        for (int i = 0; i < 50000; i++) {
            int k = (int) ((long) i * 7919 % 50000);
            library.add(new Song(String.format("Artist %03d", k / 1000), String.format("Album %02d", k / 20 % 50), k % 20 + 1, "Song " + k));
        }
        long started = System.nanoTime();
        List<Song> sorted = Library.mergeSort(library);
        double seconds = (System.nanoTime() - started) / 1e9;
        assertEquals(50000, sorted.size(), "Not yet: all 50,000 songs should be in the sorted list.");
        assertTrue(seconds < 2, "Not yet: sorting 50,000 songs took " + String.format("%.1f", seconds) + " seconds, and the ticket allows 2. A sort that splits and merges makes about 800,000 comparisons here; one that compares song by song makes hundreds of millions.");
        for (int position = 0; position < sorted.size(); position++) {
            if (!sorted.get(position).title().equals("Song " + position)) {
                fail("Not yet: position " + position + " should be Song " + position + ": Artist, then album, then track.");
            }
        }
    }
}
