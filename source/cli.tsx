#!/usr/bin/env node
import { render } from 'ink';
import App from './ui/app.js';
import { startFluidSynth, stopFluidSynth } from './audio/fluidsynth.js';

async function main() {
	await startFluidSynth()
	const ink = render(<App />);

	const shutdown = () => {
		ink.unmount();
		stopFluidSynth();
		process.exit(0);
	}

	process.on('SIGINT', shutdown);
	process.on('SIGTERM', shutdown);
}

main();
