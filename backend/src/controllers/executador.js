import { CronJob } from "cron";
import * as fs from 'fs'
import { PythonShell } from "python-shell";
import { openDb } from "./configDB.js";

export async function executador(req, res) {
    const job2 = new CronJob(`*/3 * * * *`, () => {
        openDb()
            .then(db => {
                db.all('SELECT * FROM hora  ')
                    .then(computadores => {
                        const hora = computadores;
                        let data = `${new Date()} : Executado\n`;
                        fs.appendFile("verificacaoLog.txt", data, function (err) {
                            if (err) throw err;
                            console.log("verificação do horario");
                        });
                        const job = new CronJob(`20 ${hora[0].minutos} ${hora[0].horas} * * 0-6`, () => {
                            let data = `${new Date()} : Executado\n`;
                            console.log(`tarefa agendada`)
                            PythonShell.run('E:\\Joao\\Projeto de Teste\\delisgapcbanco\\python\\teste.py', null, function (err) {
                                if (err) throw err;
                                console.log('finished');
                            });
                            // Appending data to logs.txt file
                            fs.appendFile("logs.txt", data, function (err) {
                                if (err) throw err;
                                console.log("Status Logged!");
                            });

                        }, null, true, 'America/Sao_Paulo')
                    })
            });
    }, null, true, 'America/Sao_Paulo')
}