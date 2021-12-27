class SongPlayer {
  constructor(song, wavTrigger) {
    this.wavTrigger = wavTrigger;

    this.ts = null;
    this.ticks = 0;
    this.notes = song.tracks[0].notes;
    this.latestNoteIndex = 0;
    this.endOfTrackTicks = this.notes.at(-1).ticks;
    this.tempo = 1;
  }

  reset() {
    this.prevTs = null;
    this.ticks = 0;
    this.latestNoteIndex = 0;
  }

  async start() {
    await this.stop();
    this.reset();
    window.addEventListener('wheel', this._handleWheel);
  }

  async play() {
    await this.stop();
    this.reset();
    this.currentAnimationFrameIndex = window.requestAnimationFrame(this._loop);
  }

  stop() {
    window.removeEventListener('wheel', this._handleWheel);
    window.cancelAnimationFrame(this.currentAnimationFrameIndex);
    return new Promise(r => setTimeout(r, 1000));
  }

  _loop = (nextTs) => {
    if (this.shouldStop) return;
    this.currentAnimationFrameIndex = window.requestAnimationFrame(this._loop);

    const prevTs = this.ts || nextTs;
    this.ts = nextTs;
    const dt = this.ts - prevTs;

    this.addTicks(dt / 1.76 * this.tempo);
  }

  _handleWheel = e => {
    e.preventDefault();
    console.log(e.deltaY);
    this.addTicks(Math.max(0, e.deltaY / 2));
  }

  addTicks(ticks) {
    this.ticks += ticks;
    if (this.ticks > this.endOfTrackTicks) return this.reset();

    for (
      let nextNote = this.notes[this.latestNoteIndex];
      nextNote.ticks < this.ticks;
      nextNote = this.notes[++this.latestNoteIndex]
    ) {
      this.wavTrigger.play(nextNote.midi);
    }
  }
}

export default SongPlayer
