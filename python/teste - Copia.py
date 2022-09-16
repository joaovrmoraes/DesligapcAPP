from doctest import testfile
import sqlite3
import os
import time
from datetime import datetime
import json

data_e_hora_atuais = datetime.now()
data_e_hora_em = data_e_hora_atuais.strftime("%d%m%Y%H%M")

conn = sqlite3.connect('../database/PCdesligar.db')

cursor = conn.cursor()

cursor.execute("""
SELECT tag, dominio FROM computadores WHERE desliga=1;
""")

with open("E:\Joao\Projeto de Teste\delisgapcbanco\python\config\msg.txt", "r") as tf:
    msg = tf.read()

for linha in cursor.fetchall():
    teste = ''.join(linha)
    Computer_List = [teste]

    for Computer in Computer_List:        
        print(Computer)
        a = os.system("shutdown /m "+Computer+" /r /c"+msg+"/t 60"+msg)
        arquivo = open('E:\Joao\Projeto de Teste\delisgapcbanco\python\logs\log['+data_e_hora_em+'].json', 'a')
        arquivo.write(Computer + ' : ')
        if a > 2:
            arquivo.write("Desligado  ["+time.ctime()+"]\n")
        else:
            arquivo.write("Ok  ["+time.ctime()+"]\n")
            arquivo.close()

conn.close()
