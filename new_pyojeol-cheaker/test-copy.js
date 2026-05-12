const fs = require('fs');
const path = require('path');
const { parseMidi, writeMidi } = require('midi-file');

function Pitch(keyName) {
  const normalizedKeyName = keyName.replace('-', 'b');
  const pitchMap = {
    C: 0,
    'B#': 0,
    'C#': 1,
    Db: 1,
    D: 2,
    'D#': 3,
    Eb: 3,
    E: 4,
    Fb: 4,
    F: 5,
    'E#': 5,
    'F#': 6,
    Gb: 6,
    G: 7,
    'G#': 8,
    Ab: 8,
    A: 9,
    'A#': 10,
    Bb: 10,
    B: 11,
    Cb: 11,
  };

  if (!(normalizedKeyName in pitchMap)) {
    throw new Error(`지원하지 않는 key 형식입니다: ${keyName}`);
  }

  return { ps: pitchMap[normalizedKeyName] };
}

function converterParse(filePath) {
  return parseMidi(fs.readFileSync(filePath));
}

function writeConvertedMidi(filePath, midiData) {
  fs.writeFileSync(filePath, Buffer.from(writeMidi(midiData)));
}

function collectNotes(mid) {
  const melodyList = [];

  for (const track of mid.tracks) {
    for (const msg of track) {
      if (msg.type === 'noteOn') {
        melodyList.push(msg.noteNumber);
      }
    }
  }

  return melodyList;
}

function jaccard_similarity(list1, list2) {
  const set1 = new Set(list1);
  const set2 = new Set(list2);
  const intersection = [...set1].filter((value) => set2.has(value)).length;
  const union = new Set([...set1, ...set2]).size;
  return intersection / union;
}

function analyzeMidi(sysArgv1, sysArgv2, sysArgv3, sysArgv4) {
  const WTF1 = converterParse(sysArgv1);
  const WTF2 = converterParse(sysArgv2);

  const WTF1_key = sysArgv3;
  const WTF2_key = sysArgv4;

  const interval = Pitch(WTF1_key).ps - Pitch(WTF2_key).ps;

  for (const track of WTF2.tracks) {
    for (const n of track) {
      if (n.type === 'noteOn' || n.type === 'noteOff') {
        n.noteNumber += interval;
      }
    }
  }

  const base_filename_without_extention = path.parse(sysArgv2).name;
  const filename_to_save = `${sysArgv1}_${base_filename_without_extention}.mid`;
  writeConvertedMidi(filename_to_save, WTF2);

  const out = converterParse(filename_to_save);
  const out_key = sysArgv3;
  void out;
  void out_key;
  void jaccard_similarity;

  let midi_file = sysArgv1;
  let mid = converterParse(midi_file);
  const melody_list_1 = collectNotes(mid);

  midi_file = filename_to_save;
  mid = converterParse(midi_file);
  const melody_list_2 = collectNotes(mid);

  let P;
  if (melody_list_1.length < melody_list_2.length) {
    P = melody_list_1.length;
  } else {
    P = melody_list_2.length;
  }

  let Yes = 0;
  for (let i = 0; i < P; i += 1) {
    for (let e = -10; e < 11; e += 1) {
      if (12 * e + melody_list_1[i] === melody_list_2[i]) {
        Yes += 1;
      }
    }
  }

  return {
    result: (Yes / P) * 100,
    filename_to_save,
  };
}

function main() {
  if (process.argv.length <= 5) {
    console.log('명령행 인수가 제공되지 않았습니다.');
    process.exit(1);
  }

  const { result } = analyzeMidi(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
  console.log(result);
}

if (require.main === module) {
  main();
}

module.exports = {
  analyzeMidi,
};
