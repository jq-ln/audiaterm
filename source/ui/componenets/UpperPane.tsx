import { Box, Text } from "ink";
import { MenuComponent, PanePropsWithSynth, Item, Note } from "../../types.js";
import SelectInput from "ink-select-input";

export type MenuMapKey = keyof typeof menuMap;

export interface UpperPaneProps extends PanePropsWithSynth {
	menuLabel: MenuMapKey
}

function DefaultMenu() {
	return (
		<Text>No Selection</Text>
	)
}

const synthMenuItems: Item[] = [
	{ label: 'playNote', value: 'Play Note' },
	{ label: 'playInterval', value: 'PlayInterval' },
	{ label: 'back', value: 'Back' }
]

function SynthMenu({ synth, isFocused, onUnfocus }: PanePropsWithSynth) {
	const rootNote: Note = { name: 'C', octave: 4 }
	const handleSelect = (item: Item): void => {
		switch (item.label) {
			case 'playNote':
				synth.playNote(rootNote);
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
	)
}

const menuMap: Record<string, MenuComponent> = {
	'none': DefaultMenu,
	'synth': SynthMenu,
}

export function UpperPane({ synth, menuLabel, isFocused, onUnfocus }: UpperPaneProps) {
	const Menu: MenuComponent = menuMap[menuLabel] as MenuComponent;

	return (
		<Box flexDirection='row' width={'100%'} height={'100%'} borderStyle={'double'} borderColor={'blue'} paddingLeft={3} paddingRight={3} paddingTop={1} justifyContent='center' >
			<Menu synth={synth} isFocused={isFocused} onUnfocus={onUnfocus} />
		</Box>
	)
}

