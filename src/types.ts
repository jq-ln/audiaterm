import { ComponentType } from 'react';
import { NoteName } from './audio/midiMaps.js';

export interface Item {
	label: string
	value: string
}

export interface IFluidSynthClient {
	connect(): Promise<void>
	disconnect(): void
	sendLine(line: string): void
	playNote(note: Note): void
	playNotes(notes: Note[]): void
}


export interface PaneProps {
	isFocused: boolean
	onUnfocus(): void
}

export interface PanePropsWithSynth extends PaneProps {
	synth: IFluidSynthClient
}

export interface SidebarProps extends PaneProps {
	onSelect(item: Item): void
}

export interface Note {
	name: NoteName,
	octave: number
}


export type MenuComponent = ComponentType<PanePropsWithSynth>
export type Pane = 'sidebar' | 'upper'
