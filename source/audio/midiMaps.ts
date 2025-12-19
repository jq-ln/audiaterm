export const noteMap = {
	"C": 12, "C#": 13, "Db": 13, "D": 14, "D#": 15,
	"Eb": 15, "E": 16, "F": 17, "F#": 18, "Gb": 18,
	"G": 19, "G#": 20, "Ab": 20, "A": 21, "A#": 22,
	"Bb": 22, "B": 23,
}

export const intervalMap = {
	"m2": 1, "M2": 2, "m3": 3, "M3": 4, "P4": 5,
	"aug4": 6, "dim5": 6, "P5": 7, "m6": 8, "M6": 9,
	"m7": 10, "M7": 11, "8va": 12
}

export type NoteName = keyof typeof noteMap;
