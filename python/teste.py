from doctest import testfile
import sqlite3
import os
import time
from datetime import datetime

data_e_hora_atuais = datetime.now()
data_e_hora_em = data_e_hora_atuais.strftime("%d%m%Y%H%M")

conn = sqlite3.connect('database/teste.db')

cursor = conn.cursor()

cursor.execute("""
SELECT tag FROM computadores;
""")

with open("python/config/msg.txt", "r") as tf:
    msg = tf.read()

for linha in cursor.fetchall():
    teste = ''.join(linha)
    Computer_List = [teste]

    for Computer in Computer_List:
        a = os.system("shutdown /m "+Computer+" /r /c"+msg+"/t 60"+msg)
        print(Computer)
        arquivo = open('python/logs/log['+data_e_hora_em+'].txt', 'a')
        arquivo.write(Computer + ' : ')
        if a > 2:
            arquivo.write("Desligado  ["+time.ctime()+"]\n")
        else:
            arquivo.write("Ok  ["+time.ctime()+"]\n")
            arquivo.close()

conn.close()
