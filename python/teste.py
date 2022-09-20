from doctest import testfile
import sqlite3
import os
import time
from datetime import datetime

data_e_hora_atuais = datetime.now()
data_e_hora_em = data_e_hora_atuais.strftime("%d%m%Y%H%M")

conn = sqlite3.connect('../database/PCdesligar.db')

cursor = conn.cursor()

cursor.execute("""
SELECT tag, dominio FROM computadores WHERE desliga=1;
""")

with open("E:\Joao\Projeto de Teste\delisgapcbanco\python\config\msg.txt", "r") as tf:
    msg = tf.read()

arquivo = open(
    'E:\Joao\Projeto de Teste\delisgapcbanco\python\logs\log['+data_e_hora_em+'].txt', 'a+')
arquivo.write('[')

for linha in cursor.fetchall():
    teste = ''.join(linha)
    Computer_List = [teste]

    for Computer in Computer_List:
        print(Computer)
        a = os.system("shutdown /m "+Computer+" /r /c"+msg+"/t 60"+msg)

        arquivo.write('{"Computador": "'+Computer)
        if a > 2:
            arquivo.write('", "Status": "Desligado", "Tempo":"' +
                          time.ctime()+'"}\n,\n ')
        else:
            arquivo.write('", "Status": "Ok" ,"Tempo":"' +
                          time.ctime()+'"}\n,\n')


arquivo.write(']')

arquivo.close()

with open('E:\Joao\Projeto de Teste\delisgapcbanco\python\logs\log['+data_e_hora_em+'].txt') as myfile:
    total_lines = sum(1 for line in myfile)

with open('E:\Joao\Projeto de Teste\delisgapcbanco\python\logs\log['+data_e_hora_em+'].txt', 'r') as fr:
    # reading line by line
    lines = fr.readlines()
    linha = total_lines - 1
    print(total_lines)
    # pointer for position
    ptr = 1

    # opening in writing mode
    with open('E:\Joao\Projeto de Teste\delisgapcbanco\python\logs\log['+data_e_hora_em+'].txt', 'w') as fw:
        for line in lines:
            # we want to remove 5th line
            if ptr != linha:
                fw.write(line)
            ptr += 1

conn.close()
