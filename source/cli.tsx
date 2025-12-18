#!/usr/bin/env node
import { withFullScreen } from 'fullscreen-ink';
import App from './ui/app.js';
import { startFluidSynth, stopFluidSynth } from './audio/fluidsynth.js';
import { FluidSynthClient } from './audio/fluidsynthClient.js';

async function main() {
	await startFluidSynth()
	const synthClient = new FluidSynthClient();
	await synthClient.connect();

	withFullScreen(<App />).start();

	await synthClient.playNotes([12]);

	const shutdown = () => {
		synthClient.disconnect();
		stopFluidSynth();
		process.exit(0);
	}

	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);
}

main();
