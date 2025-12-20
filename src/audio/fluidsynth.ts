import { spawn, ChildProcess } from "node:child_process";
import net, { Socket } from 'net';

const HOST = "127.0.0.1";
const PORT = 9988
const SOUNDFONT_PATH = "/usr/share/soundfonts/FluidR3_GM.sf2";

let process: ChildProcess | null = null;
let socket: Socket | null = null;

function waitForFluidSynth(timeout = 5000): Promise<Socket> {
	return new Promise<Socket>((resolve, reject) => {
		const start = Date.now();

		function tryConnect() {
			const sock = new net.Socket();
			sock.once("connect", () => {
				sock.destroy();
				resolve(sock);
			});
			sock.once("error", () => {
				sock.destroy();
				if (Date.now() - start > timeout) {
					reject(new Error("Timeout waiting for FluidSynth"));
				} else {
					setTimeout(tryConnect, 50); // retry every 50ms
				}
			});
			sock.connect(PORT, HOST);
		}

		tryConnect();
	});
}

export async function startFluidSynth() {
	process = spawn("fluidsynth", [
		"--audio-driver=pipewire",
		"--server",
		"--no-shell",
		"-o", "shell.port=9988",
		SOUNDFONT_PATH
	]);

	socket = await waitForFluidSynth()

	socket.once("error", (err) => {
		console.error("[FluidSynth]: connection failed", err);
	})

}

export function stopFluidSynth() {
	socket?.end()
	process?.kill('SIGTERM')

	socket = null;
	process = null;
	console.log("[FluidSynth]: disconnected");
}

