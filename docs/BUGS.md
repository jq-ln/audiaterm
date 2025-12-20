  - [Medium] playNotes uses forEach with async, so the method resolves immediately and errors/order are lost; if you expect sequential playback or a returned promise that
    completes after all notes, this is a logic bug. src/audio/fluidsynthClient.ts:56
  - [Medium] startFluidSynth opens a socket (socket = net.createConnection) that is never used and lacks child process error/exit handling; this can leak a connection and obscure
    startup failures when fluidsynth isn’t present or exits early. src/audio/fluidsynth.ts:36, src/audio/fluidsynth.ts:47
  - [Medium] IFluidSynthClient.playNote/playNotes are typed as void but implementations are Promise<void>; this hides the async contract at call sites and encourages unawaited
    usage. src/types.ts:7, src/audio/fluidsynthClient.ts:49
  - [Low] Local variable process shadows Node’s global process, which is easy to confuse and makes stack traces harder to read. src/audio/fluidsynth.ts:8
  - [Low] Empty modules look like dead code or half‑implemented features. src/state/store.ts, src/utils/shutdown.ts
  - [Low] Hard‑coded soundfont path and audio driver reduce portability and make config/testing harder. src/audio/fluidsynth.ts:6, src/audio/fluidsynth.ts:38
