import fs from 'fs';
import { readFile } from "fs";

export async function listarArquivos(req, res) {
    const filenames = fs.readdirSync('E:\\Joao\\Projeto de Teste\\delisgapcbanco\\python\\logs')
    res
        .set({ 'Content-Type': 'application/json' })
        .send(filenames);
}

export async function selecionarArquivo(req, res) {
    const caminhoArquivo = 'E:\\Joao\\Projeto de Teste\\delisgapcbanco\\python\\logs\\' + req.query.nome

    // res.download(caminhoArquivo)
    readFile(caminhoArquivo, "utf8", (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        const json = JSON.parse(data);

        res.json(json)
    })
}