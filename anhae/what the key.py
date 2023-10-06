from music21 import *

# 멜로디 파일 불러오기
file_path = 'transposed_D#.mid'
score = converter.parse(file_path)

key = score.analyze('key')
print(key.tonic.name, key.mode)
