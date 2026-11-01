import java.util.List;

// Tries your methods on a small music library. Run it with: java src/main/java/Demo.java
public class Demo {
    public static void main(String[] args) {
        List<Song> library = List.of(new Song("Night Bus Trio", "City Lights", 2, "Blue Hour"), new Song("Marigold Avenue", "Sunday Static", 1, "Amber Road"), new Song("Night Bus Trio", "City Lights", 1, "Desert Lights"), new Song("Copper Kettle Band", "Kettle Songs", 3, "Falling Up"), new Song("Marigold Avenue", "Lantern Season", 2, "Lemon Skies"), new Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park"), new Song("Marigold Avenue", "Sunday Static", 2, "Copper Moon"), new Song("Night Bus Trio", "Afterglow", 4, "Velvet Train"));

        List<Song> byMergeSort = Library.mergeSort(library);
        System.out.println("Merge sort:");
        for (Song song : byMergeSort) {
            System.out.println(song.artist() + " / " + song.album() + " / " + song.track() + ": " + song.title());
        }
        System.out.println("Built-in sort gives the same order: " + (byMergeSort.equals(Library.builtInSort(library)) ? "yes" : "no"));
    }
}
