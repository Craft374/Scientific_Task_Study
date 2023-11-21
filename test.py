import sys

def main():
    # 명령행 인수가 있는지 확인
    if len(sys.argv) > 1:
        # 두 번째부터 마지막까지의 명령행 인수를 출력
        for arg in sys.argv[1:]:
            print(arg)
    else:
        print("명령행 인수가 제공되지 않았습니다.")

if __name__ == "__main__":
    main()