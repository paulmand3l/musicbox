import React from 'react'
import styles from './App.module.css'
import WAVTrigger from 'lib/WAVTrigger';
import SongPlayer from 'lib/SongPlayer';
import laVieEnRose from 'songs/la vie en rose.json';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.songPlayer = new SongPlayer(laVieEnRose, new WAVTrigger());
    console.log(laVieEnRose);
  }

  handleStart = e => {
    this.songPlayer.start();
  }

  handlePlay = e => {
    this.songPlayer.play();
  }

  handleStop = e => {
    this.songPlayer.stop();
  }

  render() {
    return (
      <div className={styles.App}>
        <button onClick={this.handleStart}>
          Start
        </button>
        <button onClick={this.handlePlay}>
          Play
        </button>
        <button onClick={this.handleStop}>
          Stop
        </button>
      </div>
    )
  }
}

export default App
