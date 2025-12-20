import { NoteName } from './audio/midiMaps.js';

export interface IFluidSynthClient {
	connect(): Promise<void>
	disconnect(): void
	sendLine(line: string): void
	playNote(note: Note): void
	playNotes(notes: Note[]): void
}

export interface Note {
	name: NoteName,
	octave: number
}

