import { openDb } from "./configDB.js";

export async function selectPC(req, res) {
    openDb().then(db => {
        db.all('select * from computadores')
            .then(computadores => res.json(computadores))
    })
}

export async function insertPc(req, res) {
    let pc = req.body
    openDb()
        .then(db => {
            db.run('INSERT INTO computadores (nome, tag, desliga) VALUES (?, ?, ?)', [pc.nome, pc.tag, pc.desliga]);
        });
    res.json({
        "statusCode": 200
    })
}

export async function alterarPc(req, res) {
    let pc = req.body

    openDb()
        .then(db => {
            db.run('UPDATE computadores SET desliga= ? WHERE id=?', [pc.desliga, pc.id]);
        });
    res.json({
        "statusCode": 200
    })
}
