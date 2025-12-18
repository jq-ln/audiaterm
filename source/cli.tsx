#!/usr/bin/env node
import { render } from 'ink';
import App from './ui/app.js';
import { startFluidSynth, stopFluidSynth } from './audio/fluidsynth.js';
import { FluidSynthClient } from './audio/fluidsynthClient.js';

async function main() {
	await startFluidSynth()
	const synthClient = new FluidSynthClient();
	await synthClient.connect();

	const ink = render(<App />);

	await synthClient.playNotes([60, 64, 67]);

	const shutdown = () => {
		ink.unmount();
		synthClient.disconnect();
		stopFluidSynth();
		process.exit(0);
	}

	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);
}

main();
