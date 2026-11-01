# The tests for your three functions. You don't need to change this file.
# Each message says what was expected, so a failing test tells you what to look at.
from music_library import Song, built_in_sort, compare_songs, merge_sort

SAMPLE = [Song("Night Bus Trio", "City Lights", 2, "Blue Hour"), Song("Marigold Avenue", "Sunday Static", 1, "Amber Road"), Song("Night Bus Trio", "City Lights", 1, "Desert Lights"), Song("Copper Kettle Band", "Kettle Songs", 3, "Falling Up"), Song("Marigold Avenue", "Lantern Season", 2, "Lemon Skies"), Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park"), Song("Marigold Avenue", "Sunday Static", 2, "Copper Moon"), Song("Night Bus Trio", "Afterglow", 4, "Velvet Train")]
SORTED = [Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park"), Song("Copper Kettle Band", "Kettle Songs", 3, "Falling Up"), Song("Marigold Avenue", "Lantern Season", 2, "Lemon Skies"), Song("Marigold Avenue", "Sunday Static", 1, "Amber Road"), Song("Marigold Avenue", "Sunday Static", 2, "Copper Moon"), Song("Night Bus Trio", "Afterglow", 4, "Velvet Train"), Song("Night Bus Trio", "City Lights", 1, "Desert Lights"), Song("Night Bus Trio", "City Lights", 2, "Blue Hour")]


def big_library():
    songs = []
    for i in range(1000):
        n = i * 7919 % 1000
        songs.append(Song(f"Artist {n // 100}", f"Album {n // 20 % 5}", n % 20 + 1, f"Song {n}"))
    return songs


def test_compare_songs_goes_by_artist_first():
    assert compare_songs(Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park"), Song("Night Bus Trio", "Afterglow", 4, "Velvet Train")) < 0, "Not yet: Copper Kettle Band comes before Night Bus Trio."
    assert compare_songs(Song("Night Bus Trio", "Afterglow", 4, "Velvet Train"), Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park")) > 0, "Not yet: Night Bus Trio comes after Copper Kettle Band."


def test_compare_songs_goes_by_album_then_track_when_the_artist_ties():
    assert compare_songs(Song("Marigold Avenue", "Lantern Season", 2, "Lemon Skies"), Song("Marigold Avenue", "Sunday Static", 1, "Amber Road")) < 0, "Not yet: for Marigold Avenue, the album Lantern Season comes before Sunday Static."
    assert compare_songs(Song("Night Bus Trio", "City Lights", 2, "Blue Hour"), Song("Night Bus Trio", "City Lights", 1, "Desert Lights")) > 0, "Not yet: on City Lights, track 2 comes after track 1."
    assert compare_songs(Song("Night Bus Trio", "City Lights", 1, "Desert Lights"), Song("Night Bus Trio", "City Lights", 2, "Blue Hour")) < 0, "Not yet: on City Lights, track 1 comes before track 2."
    assert compare_songs(Song("Night Bus Trio", "City Lights", 2, "Blue Hour"), Song("Night Bus Trio", "City Lights", 2, "Blue Hour")) == 0, "Not yet: a song ties with itself, so the answer is 0."


def test_merge_sort_lists_the_library_in_order():
    assert merge_sort(SAMPLE) == SORTED, "Not yet: Copper Kettle Band's Echo Park comes first and Night Bus Trio's Blue Hour last."


def test_merge_sort_leaves_the_library_as_it_was():
    library = list(SAMPLE)
    assert merge_sort(library) == SORTED, "Not yet: Copper Kettle Band's Echo Park comes first and Night Bus Trio's Blue Hour last."
    assert library == SAMPLE, "Not yet: give back a new list, and leave the library in its own order."


def test_merge_sort_handles_short_lists():
    assert merge_sort([Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park")]) == [Song("Copper Kettle Band", "Kettle Songs", 1, "Echo Park")], "Not yet: a one-song list is already sorted."
    assert merge_sort([]) == [], "Not yet: an empty list stays empty."


def test_merge_sort_keeps_ties_in_their_order():
    assert merge_sort([Song("Marigold Avenue", "Sunday Static", 3, "Slow Rain (Live)"), Song("Copper Kettle Band", "Kettle Songs", 2, "Paper Boats"), Song("Marigold Avenue", "Sunday Static", 3, "Slow Rain")]) == [Song("Copper Kettle Band", "Kettle Songs", 2, "Paper Boats"), Song("Marigold Avenue", "Sunday Static", 3, "Slow Rain (Live)"), Song("Marigold Avenue", "Sunday Static", 3, "Slow Rain")], \
        "Not yet: Slow Rain (Live) and Slow Rain tie on artist, album and track, so a stable sort keeps the live version first, as it was given."


def test_built_in_sort_lists_the_library_in_order():
    library = list(SAMPLE)
    assert built_in_sort(library) == SORTED, "Not yet: Copper Kettle Band's Echo Park comes first and Night Bus Trio's Blue Hour last."
    assert library == SAMPLE, "Not yet: give back a new list, and leave the library in its own order."


def test_both_sorts_agree_on_a_thousand_songs():
    by_merge_sort = merge_sort(big_library())
    assert len(by_merge_sort) == 1000, "Not yet: all 1,000 songs should be in the sorted list."
    assert by_merge_sort[0].title == "Song 0", "Not yet: Artist 0's Album 0, track 1, is Song 0, and it comes first."
    assert by_merge_sort[999].title == "Song 999", "Not yet: Artist 9's Album 4, track 20, is Song 999, and it comes last."
    assert built_in_sort(big_library()) == by_merge_sort, "Not yet: your merge sort and the built-in sort should give the same order."
