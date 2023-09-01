from mido import MidiFile

midi_file = 'B-_Dragon Night.mid'  # 여기에 MIDI 파일 경로를 입력하세요.

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

midi_file = 'Traffic light.mid' 
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
            #print("C",end='')
            Yes += 1
        # else:
        #     print("X",end='')
    #print("")
print(Yes/P*100)