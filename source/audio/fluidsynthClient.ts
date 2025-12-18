import net, { Socket } from 'net';

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
				console.log('[FluidSynthClient]: Connected');
				this.sendLine('prog 0 40'); // set the instrument to violin
				resolve();
			});
			this.socket.once("error", (err) => {
				console.error('[FluidSynthClient]: Connection Failed', err);
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

	async playNote(note: number): Promise<void> {
		this.sendLine(`noteon ${this.channel} ${note} ${DEFAULT_VELOCITY}`)
		console.log('Noteon')
		await new Promise(resolve => setTimeout(resolve, DEFAULT_DURATION));
		this.sendLine(`noteoff ${this.channel} ${note}`);
		console.log('Noteoff')
	}

	async playNotes(notes: number[]): Promise<void> {
		notes.forEach(async (note) => await this.playNote(note));
	}
};
