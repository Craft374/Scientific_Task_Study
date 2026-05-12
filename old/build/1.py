from pathlib import Path
import os
import tkinter as tk
from tkinter import *
from tkinterdnd2 import DND_FILES, TkinterDnD
from tkinter import Tk, Canvas, Entry, Text, Button, PhotoImage
import ctypes

ctypes.windll.shcore.SetProcessDpiAwareness(1)

def round_rectangle(x1, y1, x2, y2, radius=25, **kwargs):
    points = [x1+radius, y1,
              x1+radius, y1,
              x2-radius, y1,
              x2-radius, y1,
              x2, y1,
              x2, y1+radius,
              x2, y1+radius,
              x2, y2-radius,
              x2, y2-radius,
              x2, y2,
              x2-radius, y2,
              x2-radius, y2,
              x1+radius, y2,
              x1+radius, y2,
              x1, y2,
              x1, y2-radius,
              x1, y2-radius,
              x1, y1+radius,
              x1, y1+radius,
              x1, y1]

    return canvas.create_polygon(points, **kwargs, smooth=True)

OUTPUT_PATH = Path(__file__).parent
ASSETS_PATH = OUTPUT_PATH / Path(r"C:\Users\Jeongwoo\Documents\GitHub\Scientific_Task_Study\build\assets\frame2")


def relative_to_assets(path: str) -> Path:
    return ASSETS_PATH / Path(path)


window = Tk()

window.geometry("960x540")
window.configure(bg = "#222222")
window.tk.call('tk', 'scaling', 50.0)
window.title("pyojeol checker")
window.iconbitmap("icon.ico")


canvas = Canvas(
    window,
    bg = "#222222",
    height = 540,
    width = 960,
    bd = 0,
    highlightthickness = 0,
    relief = "ridge"
)

canvas.place(x = 0, y = 0)
canvas.create_text(
    310.5,
    21.0,
    anchor="nw",
    text="pyojeol checker",
    fill="#FFFFFF",
    font=("MontserratRoman ExtraBold", 40 * -1)
)

canvas.create_text(
    247.0,
    73.0,
    anchor="nw",
    text="두 음악 속 멜로디의 표절률을 검사해줍니다.",
    fill="#CACACA",
    font=("Noto Sans KR", 24 * -1)
)

# canvas.create_rectangle(
#     40.0,
#     197.5,
#     455.0,
#     362.5,
#     fill="#8E51F2",
#     outline="")
my_rectangle = round_rectangle(40, 197.5, 455, 362.5, radius=50, fill="#8E51F2")

canvas.create_rectangle(
    500.0,
    197.5,
    915.0,
    362.5,
    fill="#555555",
    outline="")

canvas.create_text(
    59.0,
    249.0,
    anchor="nw",
    text="클릭하여 파일을 선택하거나\n드래그&드롭 하세요.",
    fill="#FFFFFF",
    font=("Noto Sans KR", 24 * -1)
)

canvas.create_text(
    39.5,
    152.5,
    anchor="nw",
    text="음원 파일 #1",
    fill="#FFFFFF",
    font=("Noto Sans KR", 24 * -1)
)

canvas.create_text(
    500.0,
    152.5,
    anchor="nw",
    text="음원 파일 #2",
    fill="#FFFFFF",
    font=("Noto Sans KR", 24 * -1)
)
window.resizable(False, False)
window.mainloop()
