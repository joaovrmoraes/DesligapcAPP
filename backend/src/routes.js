import { Router } from "express";
import { selectPC, insertPc, alterarPc } from "./controllers/computadores.js";
const routes = new Router();

routes.get('/', (req, res) => {
    res.json({
        "statusCode": 200,
        "msg": "Server Status - Online"
    })
})

routes.get('/lista', selectPC)
routes.post('/addpc', insertPc)
routes.put('/alterar', alterarPc)

export default routes