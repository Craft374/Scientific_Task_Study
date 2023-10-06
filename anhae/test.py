# 파일을 읽기 모드로 열고 첫번째와 두번째 줄을 가져옵니다.
with open('test.txt', 'r') as file:
    lines = file.readlines()

# 첫번째와 두번째 줄의 내용을 변수에 저장합니다.
asd = lines[0].strip()
fsd = lines[1].strip()

# asd와 fsd를 합칩니다.
combined = asd + fsd

# combined를 세 번째 행으로 추가합니다. 
lines.insert(2, '\n' +combined)

# 변경된 내용으로 파일을 다시 쓰기 모드로 열어 저장합니다.
with open('test.txt', 'w') as file:
    for line in lines:
        file.write(line)
