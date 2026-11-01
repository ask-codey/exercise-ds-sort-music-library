# Your three functions. The comment inside each one says what it should
# return. Replace each return line with your own code, and write the
# sorts' growth rates in their comments.
from dataclasses import dataclass
from functools import cmp_to_key


@dataclass(frozen=True)
class Song:
    """One song in the library."""
    artist: str
    album: str
    track: int
    title: str


def compare_songs(a, b):
    """
    Compare two songs the way a music library lists them: by artist,
    then by album when the artists are the same, then by track number
    when the albums are the same too. Give back a negative number when a
    comes first, a positive number when b comes first, and 0 when they
    tie on all three. Compare names letter by letter, capitals first.

    compare_songs(Copper Kettle Band / Kettle Songs / 1, Night Bus Trio / Afterglow / 4) -> negative
    compare_songs(Night Bus Trio / City Lights / 2, Night Bus Trio / City Lights / 1) -> positive
    compare_songs(Night Bus Trio / City Lights / 2, Night Bus Trio / City Lights / 2) -> 0
    """
    return 0


def merge_sort(songs):
    """
    Sort the songs with your own merge sort, using compare_songs to
    decide which song comes first: split the list in half, sort each half
    the same way, then merge the two sorted halves. On a tie, take the
    song from the left half first, so songs that tie keep their order
    (a stable sort). Give back a new list; leave the one you were given
    as it was.

    Growth rate: (write it here)
    """
    return []


def built_in_sort(songs):
    """
    The same order as merge_sort, with your language's built-in
    sort and compare_songs. Give back a new list; leave the one you were
    given as it was.
    Python's sorted() takes a key, so turn compare_songs into one
    with cmp_to_key (imported above).

    Growth rate: (write it here)
    """
    return []
