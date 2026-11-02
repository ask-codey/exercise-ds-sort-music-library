# Exercise: Sort the Music Library

Exercise code for the lesson **Exercise: Sort the Music Library** in the course *Data Structures and Big-O, Demystified* on [ask-codey.com](https://www.ask-codey.com).

## The ticket

> **From:** the library team, a music app
>
> The library view lists songs by artist, then album, then track number. People import 50,000 songs at once, and today's sort, which compares the songs one by one, leaves them staring at a spinner for a minute or more. And when two copies of a song tie on all three, such as a live *Slow Rain* and the album one, they swap places between refreshes.
>
> 1. **The library's order:** by artist, then album, then track number, with names compared letter by letter, capitals first.
> 2. **50,000 songs are sorted in under 2 seconds.**
> 3. **Songs that tie on all three keep the order they were imported in,** every time.
> 4. **We're moving to the language's built-in sort,** and we want a hand-written sort to check it against. Both have to give the same order, ties included.

Three functions are yours to finish:

- `compareSongs` (`CompareSongs` in C#, `compare_songs` in Python): which of two songs comes first, by artist, then album, then track
- `mergeSort` (`MergeSort`, `merge_sort`): the hand-written sort, using `compareSongs`
- `builtInSort` (`BuiltInSort`, `built_in_sort`): the same order, ties included, with your language's built-in sort and `compareSongs`

Ten tests check them, ending with the ticket's import: 50,000 songs in under 2 seconds.

## Pick your language

The same exercise is here in five languages. Work in the folder for the language you set up; you only need one.

| Folder | Your code | The tests |
|---|---|---|
| `csharp/` | `MusicLibrary/Library.cs` (a song is `MusicLibrary/Song.cs`) | `MusicLibrary.Tests/LibraryTests.cs` |
| `java/` | `src/main/java/Library.java` (a song is `src/main/java/Song.java`) | `src/test/java/LibraryTest.java` |
| `python/` | `music_library.py` | `test_music_library.py` |
| `javascript/` | `music-library.js` | `music-library.test.js` |
| `typescript/` | `music-library.ts` | `music-library.test.ts` |

A song has an artist, an album, a track number and a title: a `Song` record in C# and Java, a `Song` dataclass in Python, and an object such as `{ artist: "Night Bus Trio", album: "City Lights", track: 2, title: "Blue Hour" }` in JavaScript and TypeScript.

Each function returns `0` or an empty list for now. The comment above it says what it should return. Replace the `return` line with your own code, and write each sort's growth rate on its **Growth rate:** line.

Every folder also has a small demo program that sorts an eight-song library both ways. You don't need to change the tests or the demo.

## Run it and check your work

Open your language's folder in VS Code (**File > Open Folder**), then open its terminal (**Terminal > New Terminal**) and run these commands there.

**C#**

```bash
dotnet run --project MusicLibrary
dotnet test
```

**Java** (the Maven Wrapper downloads Maven the first time, so the first run takes a minute)

```bash
java src/main/java/Demo.java
./mvnw test
```

On Windows in PowerShell, write `.\mvnw test` instead of `./mvnw test`.

**Python** (once: make a virtual environment and install pytest into it)

```bash
python -m venv .venv
```

Then turn it on: `.venv\Scripts\Activate.ps1` in PowerShell on Windows, or `source .venv/bin/activate` on macOS (where the command is `python3`, not `python`). Then:

```bash
pip install -r requirements.txt
python demo.py
python -m pytest
```

**JavaScript**

```bash
node demo.js
npm test
```

**TypeScript** (once: `npm install`, which installs TypeScript)

```bash
node demo.ts
npm test
```

At first every test fails: that is expected. Each function you finish turns its tests green. A failing test's message starts with **Not yet:** and says what it expected.


<details>
<summary>Stuck?</summary>

- **Where to look:** the hand-written sort is the one from *A Million Songs to Sort Before Bedtime: Merge Sort*, a **merge sort**, and keeping ties in order is *Most Played, Then A to Z: Stable and Built-In Sorts*.
- **Start with `compareSongs`.** Compare the artists; only when they're the same, compare the albums; only when those are the same too, compare the track numbers. Names compare letter by letter, capitals first: `string.CompareOrdinal` in C#, `compareTo` in Java, `<` in Python, JavaScript and TypeScript.
- **`mergeSort` is the lesson's merge sort** with `compareSongs(left, right) <= 0` where the lesson had `left <= right`. Taking from the left half on a tie (`<=`, not `<`) is what keeps it stable.
- **The built-in sort takes your comparison:** `songs.OrderBy(song => song, Comparer<Song>.Create(CompareSongs)).ToList()` in C# (not `List<T>.Sort`, which can shuffle ties), `list.sort(Library::compareSongs)` in Java, `[...songs].sort(compareSongs)` in JavaScript and TypeScript. Python's `sorted` wants a key, so wrap it: `sorted(songs, key=cmp_to_key(compare_songs))`.
- **Give back new lists.** The tests check that the library keeps its own order.

</details>

<details>
<summary>Why Should I Choose This?</summary>

Open this once your tests are green. The ticket's import is 50,000 songs.

- **Comparing song by song, like today's sort** (insertion or selection sort): hundreds of millions of comparisons, O(n²). Measured with this test as an insertion sort, it took 8.8 seconds in TypeScript, 10.9 in JavaScript, 14.9 in C#, 28.5 in Java and over 2 minutes in Python, against a limit of 2.
- **Quicksort:** fast, O(n log n) on most inputs, but the in-place version can swap a song past its twin, which breaks the ticket's third line, and a predictable pivot has a bad day on a library that's already sorted.
- **Merge sort:** about 800,000 comparisons, O(n log n) on any order, a fraction of a second in every language (0.15 seconds in Python), and stable, because it takes from the left pile on a tie. The two *Slow Rain*s keep their import order.
- **The built-in sort:** the one to ship, once your merge sort has checked it, as long as it's stable. Java's, Python's and JavaScript's are; in C#, `OrderBy` is and `List<T>.Sort` isn't, which is exactly the refresh bug in the ticket.
- **What merge sort gives up:** memory, a second copy of the list while it merges. For 50,000 songs on a computer, that's nothing.

</details>

## Hand it in

When it works, push your solution to a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. The lesson page shows the Git commands, step by step.
