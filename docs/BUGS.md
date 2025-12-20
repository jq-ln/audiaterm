  - [Medium] playNotes uses forEach with async, so the method resolves immediately and errors/order are lost; if you expect sequential playback or a returned promise that
    completes after all notes, this is a logic bug. src/audio/fluidsynthClient.ts:56
  - [Low] Empty modules look like dead code or half‑implemented features. src/state/store.ts, src/utils/shutdown.ts
  - [Low] Hard‑coded soundfont path and audio driver reduce portability and make config/testing harder. src/audio/fluidsynth.ts:6, src/audio/fluidsynth.ts:38
