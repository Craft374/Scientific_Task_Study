from music21 import converter, pitch, note
import os

# 미디 파일 지정
WTF1 = converter.parse('Traffic light.mid')
WTF2_path = 'solme.mid'
WTF2 = converter.parse(WTF2_path)


# 왓더뻑1 분석
WTF1_key = WTF1.analyze('key')
print(WTF1_key)

# 왓더뻑2 분석
WTF2_key = WTF2.analyze('key')
print(WTF2_key)

# 왓더뻑 1의 키를 왓더뻑2에 적용
interval = pitch.Pitch(WTF1_key.tonic).ps - pitch.Pitch(WTF2_key .tonic).ps

for n in WTF2.recurse().getElementsByClass(note.Note):
    n.pitch.ps += interval  # 각 노트를 해당 간격만큼 위로 전치한다는데 난 모르겠음

#변환된 왓더뻑2 출력
base_filename_without_extention = os.path.splitext(WTF2_path)[0]
filename_to_save = "{}_{}.mid".format(WTF1_key.tonic.name, base_filename_without_extention)
WTF2.write('midi', fp=filename_to_save)  # 전치된 곡을 새로운 이름으로 저장함ㅋ
