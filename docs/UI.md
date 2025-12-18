# UI

## MVP

The UI should include three panels:
- Sidebar containing settings
	- reference tone: the tone played before other tones/intervals/chords, i.e. "C", "Eb", etc.
	- root notes: legal notes to choose as the root for intervals/chords
	- octave range: legal octaves to choose, i.e. 2, 4, 5, etc.
	- interval types: intervals to include in training, i.e. "P5", "M3", "m3", etc.
	- chord types: chord types to include in training, i.e. "major", "minor", "aug", "dim", etc.
- Bottom panel:
	- user input to identify intervals/chords
	- required inputs:
		- root, i.e. "C", "A#", "Bb", etc.
		- type (includes intervals and chords), i.e. "M3", "P4", "m7", "aug", "dim", etc.
		- octave, i.e. 4, 6, etc.
- Upper panel:
	- displays current settings and trainer output, i.e. in/correct

## Later
- Sidebar:
	- instrument: list of instruments in soundbank, include *at least* acoustic piano (default), strings, guitar, pad
