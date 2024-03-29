
# This file was generated by the Tkinter Designer by Parth Jadhav
# https://github.com/ParthJadhav/Tkinter-Designer


from pathlib import Path
import ctypes

ctypes.windll.shcore.SetProcessDpiAwareness(1)
# from tkinter import *
# Explicit imports to satisfy Flake8
from tkinter import Tk, Canvas, Entry, Text, Button, PhotoImage


OUTPUT_PATH = Path(__file__).parent
ASSETS_PATH = OUTPUT_PATH / Path(r"C:\Users\Jeongwoo\Documents\GitHub\Scientific_Task_Study\build\build\assets\frame2")


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
    85.0,
    296.0,
    1835.0,
    1004.0,
    fill="#000000",
    outline="")

canvas.create_rectangle(
    85.0,
    42.0,
    1835.0,
    246.0,
    fill="#000000",
    outline="")
window.resizable(False, False)
window.mainloop()
