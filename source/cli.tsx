#!/usr/bin/env node
import { render } from 'ink';
import meow from 'meow';
import App from './ui/app.js';

const cli = meow(
	`
	Usage
	  $ ink-demo

	Options
		--name  Your name

	Examples
	  $ ink-demo --name=Jane
	  Hello, Jane
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
		},
	},
);

render(<App name={cli.flags.name} />);
