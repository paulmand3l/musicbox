import { Howl } from 'howler';
import wavs from './wavs';


class WAVTrigger {
  constructor() {
    this.tracks = {};

    for (let midi in wavs) {
      this.tracks[midi] = new Howl({
        src: [wavs[midi]],
        preload: true,
        onloaderror: (id, msg) => console.log("load error", midi, msg),
        onplayerror: (id, msg) => console.log("play error", midi, msg),
      });
    }
  }

  play(trackNumber) {
    if (!this.tracks[trackNumber]) {
      console.error('Missing track', trackNumber);
      return;
    }

    console.log("Playing", trackNumber);
    this.tracks[trackNumber].play();
  }
}


export default WAVTrigger
