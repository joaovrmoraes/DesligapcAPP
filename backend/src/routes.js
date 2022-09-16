import { Router } from "express";
import { selectPC, insertPc, alterarPc, createTable, alterarHorario, selectHorario } from "./controllers/computadores.js";
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

export default routes