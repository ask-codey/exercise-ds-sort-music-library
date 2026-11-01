using MusicLibrary;

// Tries your methods on a small music library. Run it with: dotnet run --project MusicLibrary
List<Song> library = new List<Song> { new Song("Night Bus Trio", "City Lights", 2, "Blue Hour"), new Song("Marigold Avenue", "Sunday Static", 1, "Amber Road"), new Song("Night Bus Trio", "City Lights", 1, "Desert Lights"), new Song("Copper Kettle Band", "Kettle Songs", 3, "Falling Up"), new Song("Marigold Avenue", "Lantern Season", 2, "Lemon Skies"), new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park"), new Song("Marigold Avenue", "Sunday Static", 2, "Copper Moon"), new Song("Night Bus Trio", "Afterglow", 4, "Velvet Train") };

List<Song> byMergeSort = Library.MergeSort(library);
Console.WriteLine("Merge sort:");
foreach (Song song in byMergeSort)
{
    Console.WriteLine(song.Artist + " / " + song.Album + " / " + song.Track + ": " + song.Title);
}
Console.WriteLine("Built-in sort gives the same order: " + (byMergeSort.SequenceEqual(Library.BuiltInSort(library)) ? "yes" : "no"));
