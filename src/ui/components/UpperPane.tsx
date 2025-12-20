import { Box, Text } from "ink";
import { MenuComponent, PanePropsWithSynth, Item } from "../types.js";
import { Note } from "../../types.js";
import SelectInput from "ink-select-input";

export type MenuValue = keyof typeof menuMap;

export interface UpperPaneProps extends PanePropsWithSynth {
	menuLabel: MenuValue
}

const menuMap = {
	'none': DefaultMenu,
	'synth': SynthMenu,
} as const;

function DefaultMenu() {
	return (
		<Text>No Selection</Text>
	)
}

const synthMenuItems: Item[] = [
	{ value: 'playNote', label: 'Play Note' },
	{ value: 'playInterval', label: 'PlayInterval' },
	{ value: 'playChord', label: 'Play Chord' },
	{ value: 'back', label: 'Back' }
]

function SynthMenu({ synth, isFocused, onUnfocus }: PanePropsWithSynth) {
	const rootNote: Note = { name: 'C', octave: 4 };
	const intervalNote: Note = { name: 'E', octave: 4 };
	const chordNote: Note = { name: 'G', octave: 4 };

	const handleSelect = (item: Item): void => {
		switch (item.value) {
			case 'playNote':
				synth.playNote(rootNote);
				break;
			case 'playInterval':
				synth.playNotes([rootNote, intervalNote]);
				break;
			case 'playChord':
				synth.playNotes([rootNote, intervalNote, chordNote]);
				break;
			case 'back':
				onUnfocus();
				break;
		}
	}

	return (
		<>
			<SelectInput items={synthMenuItems} isFocused={isFocused} onSelect={handleSelect} />
		</>
	);
}

export function UpperPane({ synth, menuLabel, isFocused, onUnfocus }: UpperPaneProps) {
	const Menu: MenuComponent = menuMap[menuLabel] as MenuComponent;

	return (
		<Box flexDirection='row' width={'100%'} height={'100%'} borderStyle={'double'} borderColor={'blue'} paddingLeft={3} paddingRight={3} paddingTop={1} justifyContent='center' >
			<Menu synth={synth} isFocused={isFocused} onUnfocus={onUnfocus} />
		</Box>
	)
}

