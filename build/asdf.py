import os
import tkinter as tk
from tkinter import *
from tkinterdnd2 import DND_FILES, TkinterDnD
import ctypes

ctypes.windll.shcore.SetProcessDpiAwareness(1)

def drop(event):
    filepaths = event.data.split('\n')
    for filepath in filepaths:
        # Remove surrounding braces and quotes if present.
        filepath = filepath.strip('{}"')
        filename = os.path.basename(filepath)
        directory = os.path.dirname(filepath)
        print("파일 경로:", filepath)
        print("디렉토리 경로:", directory)
        print("파일 이름:", filename)

root = TkinterDnD.Tk()
root.drop_target_register(DND_FILES)
root.dnd_bind('<<Drop>>', drop)
root.geometry("960x540")
root.resizable(0, 0)
#root.iconbitmap("icon.ico")

canvas = Canvas(root)
canvas.pack()

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

my_rectangle = round_rectangle(0, 0, 150, 150, radius=20, fill="lightblue")

label = tk.Label(root, text='Drag and Drop Files Here')
label.pack()

root.mainloop()
