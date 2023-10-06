
# This file was generated by the Tkinter Designer by Parth Jadhav
# https://github.com/ParthJadhav/Tkinter-Designer


from pathlib import Path
import ctypes

ctypes.windll.shcore.SetProcessDpiAwareness(1)
# from tkinter import *
# Explicit imports to satisfy Flake8
from tkinter import Tk, Canvas, Entry, Text, Button, PhotoImage


OUTPUT_PATH = Path(__file__).parent
ASSETS_PATH = OUTPUT_PATH / Path(r"C:\Users\Jeongwoo\Documents\GitHub\Scientific_Task_Study\build\build\assets\frame1")


def relative_to_assets(path: str) -> Path:
    return ASSETS_PATH / Path(path)


window = Tk()

window.geometry("1920x1080")
window.configure(bg = "#222222")


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
canvas.create_rectangle(
    24.0,
    1056.0,
    48.0,
    1080.0,
    fill="#000000",
    outline="")

canvas.create_rectangle(
    1130.0,
    1617.0,
    1154.0,
    1641.0,
    fill="#000000",
    outline="")

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
    fill="#000000",
    outline="")

canvas.create_rectangle(
    1000.0,
    395.0,
    1830.0,
    725.0,
    fill="#000000",
    outline="")

canvas.create_text(
    80.0,
    309.0,
    anchor="nw",
    text="음원 파일 #1",
    fill="#A6A6A6",
    font=("Noto Sans KR", 40 * -1)
)

canvas.create_text(
    1000.0,
    309.0,
    anchor="nw",
    text="음원 파일 #2",
    fill="#A6A6A6",
    font=("Noto Sans KR", 40 * -1)
)

canvas.create_rectangle(
    804.0,
    876.0,
    1116.0,
    1016.0,
    fill="#000000",
    outline="")

canvas.create_rectangle(
    315.0,
    338.0,
    910.0,
    338.0,
    fill="#000000",
    outline="")

canvas.create_rectangle(
    1235.0,
    338.0,
    1830.0,
    338.0,
    fill="#000000",
    outline="")

canvas.create_rectangle(
    492.0,
    725.0,
    1425.0,
    806.0,
    fill="#000000",
    outline="")

canvas.create_rectangle(
    964.0,
    806.0,
    964.0,
    876.0,
    fill="#000000",
    outline="")

canvas.create_rectangle(
    870.0,
    355.0,
    950.0,
    435.0,
    fill="#000000",
    outline="")
window.resizable(False, False)
window.mainloop()