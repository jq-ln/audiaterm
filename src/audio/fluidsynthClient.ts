import net, { Socket } from 'net';
import { notes, Note } from '../domain/notes.js';

const LOCALHOST = '127.0.0.1';
const DEFAULT_PORT = 9988;

const DEFAULT_VELOCITY = 100;
const DEFAULT_DURATION = 1000;

export class FluidSynthClient {
	private socket: Socket | null = null;
	private host: string;
	private port: number;
	private channel: number;

	constructor(
		host: string = LOCALHOST,
		port: number = DEFAULT_PORT,
		channel: number = 0
	) {
		this.host = host;
		this.port = port;
		this.channel = channel;
	}

	connect(): Promise<void> {
		return new Promise((resolve: () => void, reject: (err: Error) => void) => {
			this.socket = net.createConnection({ host: this.host, port: this.port }, () => {
				this.sendLine('prog 0 0'); // set the instrument to piano
				resolve();
			});
			this.socket.once("error", (err) => {
				reject(err);
			});
		});
	}

	disconnect(): void {
		this.socket?.end();
		this.socket = null;
	}

	sendLine(line: string): void {
		if (!this.socket) throw new Error('[FluidSynthClient]: Not Connected to FluidSynth');
		this.socket.write(line + '\n');
	}

	sendLines(lines: string[]): void {
		const singleLine = lines.join('\n');
		this.sendLine(singleLine);
	}

	async playNote(note: Note): Promise<void> {
		const onLine = this.formatNoteLine(note, true);
		const offLine = this.formatNoteLine(note, false);

		this.sendLine(onLine);
		await new Promise(resolve => setTimeout(resolve, DEFAULT_DURATION));
		this.sendLine(offLine);
	}

	async playNotes(notes: Note[]): Promise<void> {
		const onLines = notes.map((note: Note) => this.formatNoteLine(note, true));
		const offLines = notes.map((note: Note) => this.formatNoteLine(note, false));

		this.sendLines(onLines);
		await new Promise(resolve => setTimeout(resolve, DEFAULT_DURATION));
		this.sendLines(offLines);
	}

	private formatNoteLine(note: Note, on: boolean): string {
		const command = on ? 'noteon' : 'noteoff';
		const noteNumber = this.getNoteNumber(note);
		return `${command} ${this.channel} ${noteNumber} ${DEFAULT_VELOCITY}`;
	}

	private getNoteNumber(note: Note): number {
		const baseNumber: number = notes[note.name];
		const octaveAddition = note.octave * 12;
		return baseNumber + octaveAddition;
	}
};
