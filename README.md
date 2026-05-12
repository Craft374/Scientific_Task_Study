# Pyojeol-cheaker(음원 멜로디 유사도 검사기)
과학 과제 연구용으로 만든 음원 멜로디 비교 프로그램

두 음악 파일의 멜로디를 분석한 뒤  
얼마나 비슷한지 퍼센트로 보여주는 프로그램

## 폴더 설명
- `new_pyojeol-cheaker` : 지금 실제로 실행해서 쓰는 최신 버전
- `old` : 예전 코드, 예전 빌드 파일, page-1, 실험 파일 보관 폴더

## 이전 버전은 어떻게 했었는지
- 예전 버전은 Electron에서 Python 파일 `test-copy.py`를 따로 실행하는 방식.
- `melody2midi`로 오디오를 MIDI로 바꾸고, Python의 `mido`, `music21`으로 키를 맞춘 뒤 멜로디를 비교함.
- 따라서 Python 가상환경이 필요했고, 빌드된 앱에서는 `python` 경로 문제나 `app.asar` 내부 파일 실행 문제 때문에 오류가 날 수 있었음.

## 최신 버전은 언제 어떻게 업데이트 했는지
- 업데이트 날짜: 2026년 5월 12일
- Python 분석 로직을 JS 파일 `test-copy.js`로 옮김.
- 기존 로직의 흐름과 변수명은 최대한 유지함.
- 최신 Electron에서 없어진 `File.path` 대신 `webUtils.getPathForFile(...)`를 사용하도록 수정함.
- 예전 `electron-forge`, `electron-builder`는 제거하고 실행 중심 구조로 다시 정리함.
- `npm audit` 기준으로 보안 취약점 0개 상태로 맞춤.

## 실행 환경
- 사용한 Electron 버전: 42.0.1
- 사용한 midi-file 버전: 1.2.4
- 요구사항: Node.js, npm, Windows 또는 맥OS

## 사용법
1. 터미널 실행
2. 아래 폴더로 이동
3. 처음 1회는 `npm install` 실행
4. 그 다음 `npm start` 실행

```bash
npm install
npm start
```

## 프로그램 사용 순서
1. 프로그램 실행
2. 비교할 오디오 파일 2개 선택
3. `검사` 버튼 클릭
4. 유사도 퍼센트 확인

## 팁
- `npm install`은 보통 처음 1번 해두면 됩니다.
- 첫 `npm start`는 Electron 다운로드 때문에 느릴 수 있습니다.
- 예전 자료는 지우지 않고 `old` 폴더에 따로 남겨 두었습니다.
