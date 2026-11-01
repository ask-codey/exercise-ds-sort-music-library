# Tries your functions on a small music library. Run it with: python demo.py
from music_library import Song, built_in_sort, merge_sort

library = [Song("Night Bus Trio", "City Lights", 2, "Blue Hour"), Song("Marigold Avenue", "Sunday Static", 1, "Amber Road"), Song("Night Bus Trio", "City Lights", 1, "Desert Lights"), Song("Copper Kettle Band", "Kettle Songs", 3, "Falling Up"), Song("Marigold Avenue", "Lantern Season", 2, "Lemon Skies"), Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park"), Song("Marigold Avenue", "Sunday Static", 2, "Copper Moon"), Song("Night Bus Trio", "Afterglow", 4, "Velvet Train")]

by_merge_sort = merge_sort(library)
print("Merge sort:")
for song in by_merge_sort:
    print(f"{song.artist} / {song.album} / {song.track}: {song.title}")
print("Built-in sort gives the same order: " + ("yes" if by_merge_sort == built_in_sort(library) else "no"))
