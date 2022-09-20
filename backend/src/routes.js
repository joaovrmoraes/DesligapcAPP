import { Router } from "express";
import { selectPC, insertPc, alterarPc, createTable, alterarHorario, selectHorario, selectDominio, selectDesliga } from "./controllers/computadores.js";
import { listarArquivos, selecionarArquivo } from "./controllers/arquivos.js";
const routes = new Router();
import { executador } from './controllers/executador.js'

createTable();
executador();

routes.get('/', (req, res) => {
    res.json({
        "statusCode": 200,
        "msg": "Server Status - Online"
    })
})

routes.get('/lista', selectPC)
routes.post('/addpc', insertPc)
routes.put('/alterar', alterarPc)
routes.put('/horario', alterarHorario)
routes.get('/horario', selectHorario)
routes.get('/diretorio', listarArquivos)
routes.get('/arquivo', selecionarArquivo)
routes.get('/filtroDominio', selectDominio)
routes.get('/filtroDesliga', selectDesliga)

export default routes   