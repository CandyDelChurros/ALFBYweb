import tkinter as tk
import pyautogui
import google.generativeai as genai
import PIL.Image


def paint(event):
    global last_x, last_y
    if last_x and last_y:
        canvas.create_line(last_x, last_y, event.x, event.y, width=2, fill='black', capstyle=tk.ROUND, smooth=True)
    last_x, last_y = event.x, event.y

def reset(event):
    global last_x, last_y
    last_x, last_y = None, None

def conference():
    x1 = root.winfo_rootx() + canvas.winfo_x()
    y1 = root.winfo_rooty() + canvas.winfo_y()
    x2 = x1 + canvas.winfo_width()
    y2 = y1 + canvas.winfo_height()

    cartoon = pyautogui.screenshot(region=(x1, y1, x2 - x1, y2 - y1))

    cartoon.save("letra.png")

    genai.configure(api_key="AIzaSyBq2nc05mUMNpuyQMsW-j69L7Qtl-Chf0A")
    model = genai.GenerativeModel("gemini-1.5-flash")
    letra = PIL.Image.open("letra.png")
    response = model.generate_content(["é uma letra A ? se for diga 'SIM É UMA LETRA A', se não for diga 'ESTÁ ERRADO!' ", letra])
    print(response.text)

root = tk.Tk()
root.title("desenhe a letra A")

canvas = tk.Canvas(root, width=1920, height=520, bg='white')
canvas.pack()

last_x, last_y = None, None

canvas.bind("<B1-Motion>", paint)
canvas.bind("<ButtonRelease-1>", reset)

capture_button = tk.Button(root, text="Conferir", command=conference)
capture_button.pack()

root.mainloop()

