const fs = require('fs')
const midiParser  = require('midi-parser-js');

// fs.readFile('./la vie en rose.mid', 'base64', function (err,data) {
//   const midiData = midiParser.parse(data);
//   console.log(midiData.timeDivision)
//   const events = midiData.track[0];
//   console.log(events);
// });

const songData = fs.readFileSync('./la vie en rose.json');
const songJSON = JSON.parse(songData);

const wavMap = {}
const notesMap = {}
const notesList = []

songJSON.tracks[0].notes.forEach(note => {
  notesList.push([note.ticks, note.midi])
});

songJSON.tracks[0].notes.sort((note1, note2) => {
  return note2.midi - note1.midi;
}).forEach(note => {
  wavMap[note.midi] = note.name
  notesMap[note.name] = note.midi;
});

console.log(JSON.stringify(notesList), notesList.length)
const notesSet = Object.keys(notesMap);

// notesSet.forEach(note => console.log(note, notesMap[note]));
