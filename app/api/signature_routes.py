from tkinter import *
from PIL import Image, ImageDraw
from flask import Blueprint
from app.models import db

signature_routes = Blueprint('signature', __name__)



tk = Tk()
tk.title("Signature Please")
cvs = Canvas(tk, width=800, height=200)
cvs.pack()

#Define internal PIL image
img = Image.new('RGB', (800,200), (255,255,255))
draw = ImageDraw.Draw(img)

#Define boolean value for mouse button pressed
mousePressed = False
last = None

#Called upon left clicking
def press(evt):
    global mousePressed
    mousePressed = True

#Called upon release of left click
def release(evt):
    #save image
    img.save('./img.png')
    tk.destroy()

#Event binding
cvs.bind_all('<ButtonPress-1>', press)
cvs.bind_all('<ButtonRelease-1>', release)

#Drawing
def move(evt):
    global mousePressed, last
    x,y = evt.x, evt.y

    if mousePressed:
        if last is None:
            last = (x,y)
            return
    draw.line(((x,y),last),(0,0,0))

    #Draw line on canvas
    cvs.create_line(x,y,last[0], last[1])
    last = (x,y)

#Calls drawing fxn on mouse movement
cvs.bind_all('<Motion>', move)
tk.mainloop()
