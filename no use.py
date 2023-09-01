from music21 import *

# 'C major.mid' 파일을 불러오고 스트림(Score 객체)으로 변환합니다.
midi = converter.parse('C major.mid')

# 음악의 키를 분석합니다.
key = midi.analyze('key')
print(key)

# 전치할 간격을 구합니다. (D#는 C에서 반음계 단위로 3단계 위에 있습니다.)
interval = pitch.Pitch('key').ps - pitch.Pitch('C').ps

for n in midi.recurse().getElementsByClass(note.Note):
    n.pitch.ps += interval  # 각 노트를 해당 간격만큼 위로 전치합니다.

new_key = midi.analyze('key')
print(new_key)

midi.write('midi', fp='transposed_D#.mid')  # 전치된 곡을 'transposed_D#.mid'라는 이름으로 저장합니다.
