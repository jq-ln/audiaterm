import net, { Socket } from 'net';

const LOCALHOST = '127.0.0.1';
const DEFAULT_PORT = 9988;

export interface Note {
	midi: number
	duration: number
	velocity?: number
}

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
				this.sendLine('prog 0 0'); // set the instrument to piano
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

	async playNote(note: Note): Promise<void> {
		this.sendLine(`noteon ${this.channel} ${note.midi} ${note.velocity}`)
		console.log('Noteon')
		await new Promise(resolve => setTimeout(resolve, note.duration));
		this.sendLine(`noteoff ${this.channel} ${note.midi}`);
		console.log('Noteoff')
	}
};
