# Audiaterm

A configurable ear-training TUI with a focus on audiation.
Uses ink for the frontend and runs a fluidsynth server for in-terminal audio.

To set up `fluidsynth` must be installed along with the `FluidR3_GM` soundfont.
Other soundfonts should theoretically work, but only `FluidR3_GM` has been tested.
On Arch: `sudo pacman -Sy fluidsynth soundfont-fluid`

The constant `SOUNDFONT_PATH` in `./source/audio/fluidsynth.ts` can be updated with the device-specific path to the soundfont (this will be improved later).
