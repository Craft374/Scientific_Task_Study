import tkinter as tk
import ctypes
import tkinter
import tkinter.font

ctypes.windll.shcore.SetProcessDpiAwareness(1)

root = tk.Tk()
root.geometry("960x540")

font=tkinter.font.Font(family="맑은 고딕", size="60")

label=tkinter.Label(root, text="파이썬 3.6", font=font)
label.pack()

root.mainloop()