# Roadmap

## MVP

Application flow:
- User can choose a subset of root notes, intervals, chords, and octave range as well as reference tone
- App triggers reference tone followed by a random interval/chord from the chosen subset
- User inputs guess (structured format i.e. "C 3 M" or "C 3 P5", guided input)
- App displays correct/incorrect
- User input requests next interval/chord

## Next

- App keeps track of correct/incorrect guesses per session (i.e. "2/3 correct")

## Later

- Store session data in database:
- Use session data to drill difficult intervals/chords
- Address fluidsynth & soundfont dependencies:
	- guided install?
	- auto-install?
	- bundle?
