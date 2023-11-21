from mido import MidiFile
from music21 import converter, pitch, note
import os
import sys

def main():
    # 명령행 인수가 있는지 확인
    if len(sys.argv) > 1:
        pass
    else:
        print("명령행 인수가 제공되지 않았습니다.")
        quit()

if __name__ == "__main__":
    main()

print(sys.argv[1])
print(sys.argv[2])
print(sys.argv[3])
print(sys.argv[4])


WTF1 = sys.argv[1] # 미디 파일 지정
WTF2 = sys.argv[2]  # 미디 파일 지정
WTF1_key = sys.argv[3] # 미디 키
WTF2_key = sys.argv[4] # 미디 키

# 왓더뻑 1의 키를 왓더뻑2에 적용
interval = pitch.Pitch(WTF1_key).ps - pitch.Pitch(WTF2_key).ps

for n in converter.parse(WTF2).recurse().getElementsByClass(note.Note):
    n.pitch.ps += interval  # 각 노트를 해당 간격만큼 위로 전치한다는데 난 모르겠음

#변환된 왓더뻑2 출력
base_filename_without_extention = os.path.splitext(WTF2)[0]
filename_to_save = "{}_{}.mid".format(WTF1_key, base_filename_without_extention)
converter.parse(WTF2).write('midi', fp=filename_to_save)  # 전치된 곡을 새로운 이름으로 저장함ㅋ

out = converter.parse(filename_to_save)
out_key = out.analyze('key')
print(out_key)