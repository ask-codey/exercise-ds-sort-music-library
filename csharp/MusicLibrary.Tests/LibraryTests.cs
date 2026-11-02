using System.Diagnostics;
using MusicLibrary;

namespace MusicLibrary.Tests;

// The tests for your three methods. You don't need to change this file.
// Each message says what was expected, so a failing test tells you what to look at.

[TestClass]
public class LibraryTests
{
    private static List<Song> Sample() => new List<Song> { new Song("Night Bus Trio", "City Lights", 2, "Blue Hour"), new Song("Marigold Avenue", "Sunday Static", 1, "Amber Road"), new Song("Night Bus Trio", "City Lights", 1, "Desert Lights"), new Song("Copper Kettle Band", "Kettle Songs", 3, "Falling Up"), new Song("Marigold Avenue", "Lantern Season", 2, "Lemon Skies"), new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park"), new Song("Marigold Avenue", "Sunday Static", 2, "Copper Moon"), new Song("Night Bus Trio", "Afterglow", 4, "Velvet Train") };
    private static List<Song> Sorted() => new List<Song> { new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park"), new Song("Copper Kettle Band", "Kettle Songs", 3, "Falling Up"), new Song("Marigold Avenue", "Lantern Season", 2, "Lemon Skies"), new Song("Marigold Avenue", "Sunday Static", 1, "Amber Road"), new Song("Marigold Avenue", "Sunday Static", 2, "Copper Moon"), new Song("Night Bus Trio", "Afterglow", 4, "Velvet Train"), new Song("Night Bus Trio", "City Lights", 1, "Desert Lights"), new Song("Night Bus Trio", "City Lights", 2, "Blue Hour") };

    private static List<Song> BigLibrary()
    {
        List<Song> songs = new List<Song>();
        for (int i = 0; i < 1000; i++)
        {
            int n = i * 7919 % 1000;
            songs.Add(new Song("Artist " + n / 100, "Album " + n / 20 % 5, n % 20 + 1, "Song " + n));
        }
        return songs;
    }

    [TestMethod]
    public void CompareSongsGoesByArtistFirst()
    {
        Assert.IsTrue(Library.CompareSongs(new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park"), new Song("Night Bus Trio", "Afterglow", 4, "Velvet Train")) < 0, "Not yet: Copper Kettle Band comes before Night Bus Trio.");
        Assert.IsTrue(Library.CompareSongs(new Song("Night Bus Trio", "Afterglow", 4, "Velvet Train"), new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park")) > 0, "Not yet: Night Bus Trio comes after Copper Kettle Band.");
    }

    [TestMethod]
    public void CompareSongsGoesByAlbumThenTrackWhenTheArtistTies()
    {
        Assert.IsTrue(Library.CompareSongs(new Song("Marigold Avenue", "Lantern Season", 2, "Lemon Skies"), new Song("Marigold Avenue", "Sunday Static", 1, "Amber Road")) < 0, "Not yet: for Marigold Avenue, the album Lantern Season comes before Sunday Static.");
        Assert.IsTrue(Library.CompareSongs(new Song("Night Bus Trio", "City Lights", 2, "Blue Hour"), new Song("Night Bus Trio", "City Lights", 1, "Desert Lights")) > 0, "Not yet: on City Lights, track 2 comes after track 1.");
        Assert.IsTrue(Library.CompareSongs(new Song("Night Bus Trio", "City Lights", 1, "Desert Lights"), new Song("Night Bus Trio", "City Lights", 2, "Blue Hour")) < 0, "Not yet: on City Lights, track 1 comes before track 2.");
        Assert.AreEqual(0, Library.CompareSongs(new Song("Night Bus Trio", "City Lights", 2, "Blue Hour"), new Song("Night Bus Trio", "City Lights", 2, "Blue Hour")), "Not yet: a song ties with itself, so the answer is 0.");
    }

    [TestMethod]
    public void MergeSortListsTheLibraryInOrder()
    {
        CollectionAssert.AreEqual(Sorted(), Library.MergeSort(Sample()), "Not yet: Copper Kettle Band's Echo Park comes first and Night Bus Trio's Blue Hour last.");
    }

    [TestMethod]
    public void MergeSortLeavesTheLibraryAsItWas()
    {
        List<Song> library = Sample();
        CollectionAssert.AreEqual(Sorted(), Library.MergeSort(library), "Not yet: Copper Kettle Band's Echo Park comes first and Night Bus Trio's Blue Hour last.");
        CollectionAssert.AreEqual(Sample(), library, "Not yet: give back a new list, and leave the library in its own order.");
    }

    [TestMethod]
    public void MergeSortHandlesShortLists()
    {
        CollectionAssert.AreEqual(new List<Song> { new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park") }, Library.MergeSort(new List<Song> { new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park") }), "Not yet: a one-song list is already sorted.");
        CollectionAssert.AreEqual(new List<Song>(), Library.MergeSort(new List<Song>()), "Not yet: an empty list stays empty.");
    }

    [TestMethod]
    public void MergeSortKeepsTiesInTheirOrder()
    {
        CollectionAssert.AreEqual(new List<Song> { new Song("Copper Kettle Band", "Kettle Songs", 2, "Paper Boats"), new Song("Marigold Avenue", "Sunday Static", 3, "Slow Rain (Live)"), new Song("Marigold Avenue", "Sunday Static", 3, "Slow Rain") }, Library.MergeSort(new List<Song> { new Song("Marigold Avenue", "Sunday Static", 3, "Slow Rain (Live)"), new Song("Copper Kettle Band", "Kettle Songs", 2, "Paper Boats"), new Song("Marigold Avenue", "Sunday Static", 3, "Slow Rain") }),
            "Not yet: Slow Rain (Live) and Slow Rain tie on artist, album and track, so a stable sort keeps the live version first, as it was given.");
    }

    [TestMethod]
    public void BuiltInSortListsTheLibraryInOrder()
    {
        List<Song> library = Sample();
        CollectionAssert.AreEqual(Sorted(), Library.BuiltInSort(library), "Not yet: Copper Kettle Band's Echo Park comes first and Night Bus Trio's Blue Hour last.");
        CollectionAssert.AreEqual(Sample(), library, "Not yet: give back a new list, and leave the library in its own order.");
    }

    [TestMethod]
    public void BuiltInSortKeepsTiesInTheirOrder()
    {
        List<Song> takes = new List<Song>();
        for (int take = 1; take <= 10; take++)
        {
            for (int artist = 19; artist >= 0; artist--)
            {
                takes.Add(new Song($"Artist {artist:D2}", "Live at the Depot", 1, $"Take {take}"));
            }
        }
        List<Song> expected = new List<Song>();
        for (int artist = 0; artist <= 19; artist++)
        {
            for (int take = 1; take <= 10; take++)
            {
                expected.Add(new Song($"Artist {artist:D2}", "Live at the Depot", 1, $"Take {take}"));
            }
        }
        CollectionAssert.AreEqual(expected, Library.BuiltInSort(takes), "Not yet: each artist's ten takes tie on artist, album and track, so a stable sort keeps them in the order they were given, Take 1 to Take 10.");
    }

    [TestMethod]
    public void BothSortsAgreeOnAThousandSongs()
    {
        List<Song> byMergeSort = Library.MergeSort(BigLibrary());
        Assert.AreEqual(1000, byMergeSort.Count, "Not yet: all 1,000 songs should be in the sorted list.");
        Assert.AreEqual("Song 0", byMergeSort[0].Title, "Not yet: Artist 0's Album 0, track 1, is Song 0, and it comes first.");
        Assert.AreEqual("Song 999", byMergeSort[999].Title, "Not yet: Artist 9's Album 4, track 20, is Song 999, and it comes last.");
        CollectionAssert.AreEqual(byMergeSort, Library.BuiltInSort(BigLibrary()), "Not yet: your merge sort and the built-in sort should give the same order.");
    }

    [TestMethod]
    public void FiftyThousandSongsSortInUnderTwoSeconds()
    {
        List<Song> library = new List<Song>();
        for (int i = 0; i < 50000; i++)
        {
            int k = (int)((long)i * 7919 % 50000);
            library.Add(new Song("Artist " + (k / 1000).ToString("D3"), "Album " + (k / 20 % 50).ToString("D2"), k % 20 + 1, "Song " + k));
        }
        Stopwatch watch = Stopwatch.StartNew();
        List<Song> sorted = Library.MergeSort(library);
        watch.Stop();
        Assert.AreEqual(50000, sorted.Count, "Not yet: all 50,000 songs should be in the sorted list.");
        Assert.IsTrue(watch.Elapsed.TotalSeconds < 2, "Not yet: sorting 50,000 songs took " + watch.Elapsed.TotalSeconds.ToString("0.0") + " seconds, and the ticket allows 2. A sort that splits and merges makes about 800,000 comparisons here; one that compares song by song makes hundreds of millions.");
        for (int position = 0; position < sorted.Count; position++)
        {
            if (sorted[position].Title != "Song " + position)
            {
                Assert.Fail("Not yet: position " + position + " should be Song " + position + ": Artist, then album, then track.");
            }
        }
    }
}
