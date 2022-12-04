import socket
from tkinter import *
import time
import random

s = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)

def sensor():
    dato=(random.randrange(0,10))
    dato1=str(dato)
    dato2=dato1.encode()
    s.sendto(dato2,('192.168.8.103',4001))
    print(dato1)
    time.sleep(0.5)
    v.after(250,sensor())


v=Tk()
v.geometry("100x100")

l=Label(v,text="sensor01")
l.place(x=30,y=10)

b=Button(v,text="activar",command=sensor)
b.place(x=30,y=50)

v.mainloop()
