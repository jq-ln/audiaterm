import { spawn, ChildProcess } from "node:child_process";
import net from 'net';

const HOST = "127.0.0.1";
const PORT = 9988
const SOUNDFONT_PATH = "/usr/share/soundfonts/FluidR3_GM.sf2";

let fluidSynthProcess: ChildProcess | null = null;

function waitForFluidSynth(timeout = 5000): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		const start = Date.now();

		function tryConnect() {
			const sock = new net.Socket();
			sock.once("connect", () => {
				sock.destroy();
				resolve();
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
	fluidSynthProcess = spawn("fluidsynth", [
		"--audio-driver=pipewire",
		"--server",
		"--no-shell",
		"-o", "shell.port=9988",
		SOUNDFONT_PATH
	]);

	fluidSynthProcess.stderr?.on("data", (data: Buffer) => {
		console.error(`[FluidSynth]: ${data.toString().trim()}`);
	});

	const exitPromise = new Promise<void>((_resolve, reject) => {
		fluidSynthProcess?.once("error", (err) => reject(err));
		fluidSynthProcess?.once("exit", (code, signal) => {
			reject(new Error(`[FluidSynth]: exited before ready (code=${code ?? "null"}, signal=${signal ?? "null"})`));
		});
	});

	await Promise.race([waitForFluidSynth(), exitPromise]);

}

export async function stopFluidSynth(): Promise<void> {
	const currentProcess = fluidSynthProcess;
	fluidSynthProcess = null;
	if (!currentProcess) return;

	const exitPromise = new Promise<void>((resolve) => {
		currentProcess.once("exit", () => resolve());
	});

	currentProcess.kill('SIGTERM');
	const killTimeout = setTimeout(() => {
		currentProcess.kill('SIGKILL');
	}, 2000);

	await exitPromise;
	clearTimeout(killTimeout);
	console.log("[FluidSynth]: disconnected");
}
