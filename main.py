from mido import MidiFile
from music21 import converter, pitch, note
import os

# 미디 파일 지정
x = input("1번 미디파일 이름")
y = input("2번 미디파일 이름")
WTF1 = converter.parse(x+'.mid')
WTF2_path = y+'.mid'
WTF2 = converter.parse(WTF2_path)

# 왓더뻑1 분석
WTF1_key = WTF1.analyze('key')
print(WTF1_key)

# 왓더뻑2 분석
WTF2_key = WTF2.analyze('key')
print(WTF2_key)

# 왓더뻑 1의 키를 왓더뻑2에 적용
interval = pitch.Pitch(WTF1_key.tonic).ps - pitch.Pitch(WTF2_key.tonic).ps

for n in WTF2.recurse().getElementsByClass(note.Note):
    n.pitch.ps += interval  # 각 노트를 해당 간격만큼 위로 전치한다는데 난 모르겠음

#변환된 왓더뻑2 출력
base_filename_without_extention = os.path.splitext(WTF2_path)[0]
filename_to_save = "{}_{}.mid".format(WTF1_key.tonic.name, base_filename_without_extention)
WTF2.write('midi', fp=filename_to_save)  # 전치된 곡을 새로운 이름으로 저장함ㅋ

out = converter.parse(filename_to_save)
out_key = out.analyze('key')
print(out_key)

midi_file = x +'.mid'  # 여기에 MIDI 파일 경로를 입력하세요.

def jaccard_similarity(list1, list2):
    set1 = set(list1)
    set2 = set(list2)
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return intersection / float(union)

mid = MidiFile(midi_file)
melody_list_1 = []
melody_list_2 = []

for track in mid.tracks:
    for msg in track:
        if msg.type == 'note_on':
            #print('Melody:', msg.note)
            melody_list_1.append(msg.note)

midi_file = filename_to_save
mid = MidiFile(midi_file)

for track in mid.tracks:
    for msg in track:
        if msg.type == 'note_on':
            #print('Melody:', msg.note)
            melody_list_2.append(msg.note)

if len(melody_list_1) < len(melody_list_2):
    P = len(melody_list_1)
else:
    P = len(melody_list_2)

Yes = 0
for i in range(0, P):
    for e in range(-10, 11):
        if 12*e+melody_list_1[i] == melody_list_2[i]:
            Yes += 1
print(Yes/P*100)