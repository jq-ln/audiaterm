import { Note } from './domain/notes.js';

export interface FluidSynthApi {
	connect(): Promise<void>
	disconnect(): void
	sendLine(line: string): void
	sendLines(lines: string[]): void
	playNote(note: Note): Promise<void>
	playNotes(notes: Note[]): Promise<void>
}

