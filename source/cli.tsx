#!/usr/bin/env node
import { withFullScreen } from 'fullscreen-ink';
import App from './ui/app.js';
import { startFluidSynth, stopFluidSynth } from './audio/fluidsynth.js';
import { FluidSynthClient } from './audio/fluidsynthClient.js';

async function main() {
	await startFluidSynth()

	const synth = new FluidSynthClient();
	await synth.connect();

	const shutdown = () => {
		synth.disconnect();
		stopFluidSynth();
		process.exit(0);
	}

	withFullScreen(<App synth={synth} onExit={shutdown} />).start();

	// force a resize so fullscreen-ink renders properly
	setTimeout(() => {
		process.stdout.emit('resize');
	}, 50);

	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);
}

main();

