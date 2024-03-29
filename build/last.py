
# This file was generated by the Tkinter Designer by Parth Jadhav
# https://github.com/ParthJadhav/Tkinter-Designer


from pathlib import Path

# from tkinter import *
# Explicit imports to satisfy Flake8
from tkinter import Tk, Canvas, Entry, Text, Button, PhotoImage

import ctypes

ctypes.windll.shcore.SetProcessDpiAwareness(1)
OUTPUT_PATH = Path(__file__).parent
ASSETS_PATH = OUTPUT_PATH / Path(r"C:\Users\Jeongwoo\Documents\GitHub\Scientific_Task_Study\build\assets\frame0")


def relative_to_assets(path: str) -> Path:
    return ASSETS_PATH / Path(path)


window = Tk()

window.geometry("1920x1080")
window.configure(bg = "#222222")
window.resizable(True, True)

canvas = Canvas(
    window,
    bg = "#222222",
    height = 1080,
    width = 1920,
    bd = 0,
    highlightthickness = 0,
    relief = "ridge"
)

canvas.place(x = 0, y = 0)
canvas.create_text(
    621.0,
    42.0,
    anchor="nw",
    text="pyojeol checker",
    fill="#FFFFFF",
    font=("MontserratRoman ExtraBold", 80 * -1)
)

canvas.create_text(
    494.0,
    146.0,
    anchor="nw",
    text="두 음악 속 멜로디의 표절률을 검사해줍니다.",
    fill="#CACACA",
    font=("Noto Sans KR", 48 * -1)
)

canvas.create_rectangle(
    80.0,
    395.0,
    910.0,
    725.0,
    fill="#8E51F2",
    outline="")

canvas.create_rectangle(
    1000.0,
    395.0,
    1830.0,
    725.0,
    fill="#583A8A",
    outline="")

canvas.create_text(
    118.0,
    498.0,
    anchor="nw",
    text="music.wav",
    fill="#FFFFFF",
    font=("Noto Sans KR", 48 * -1)
)

canvas.create_text(
    1052.0,
    498.0,
    anchor="nw",
    text="클릭하여 파일을 선택하거나\n드래그&드롭 하세요.",
    fill="#D4D4D4",
    font=("Noto Sans KR", 48 * -1)
)

canvas.create_text(
    79.0,
    305.0,
    anchor="nw",
    text="음원 파일 #1",
    fill="#FFFFFF",
    font=("Noto Sans KR", 48 * -1)
)

canvas.create_text(
    1000.0,
    305.0,
    anchor="nw",
    text="음원 파일 #2",
    fill="#FFFFFF",
    font=("Noto Sans KR", 48 * -1)
)

canvas.create_rectangle(
    804.0,
    786.0,
    1116.0,
    926.0,
    fill="#3F6940",
    outline="")

canvas.create_text(
    900.0,
    810.0,
    anchor="nw",
    text="검사",
    fill="#57CA5C",
    font=("Noto Sans KR", 64 * -1)
)
window.resizable(False, False)
window.mainloop()
