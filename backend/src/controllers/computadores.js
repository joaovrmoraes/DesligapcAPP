import { openDb } from "./configDB.js";

export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS computadores ( id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, tag VARCHAR(25), desliga INTEGER NOT NULL DEFAULT 0, dominio TEXT)');
    });
}

export async function selectPC(req, res) {
    openDb()
        .then(db => {
            if (req.query.id || req.query.nome) {
                db.all('SELECT * FROM computadores WHERE id=? or nome LIKE ? or tag LIKE ?', [req.query.id, '%' + req.query.nome + '%', '%' + req.query.nome + '%'])
                    .then(computadores => res.json(computadores))
            }
            else {
                db.all('SELECT * FROM computadores')
                    .then(computadores => res.json(computadores))
            }
        });
}

export async function selectDominio(req, res) {
    openDb()
        .then(db => {
            if (req.query.dominio) {
                db.all('SELECT * FROM computadores WHERE dominio = ?', [req.query.dominio])
                    .then(computadores => res.json(computadores))
            }
            else {
                db.all('SELECT * FROM computadores')
                    .then(computadores => res.json(computadores))
            }
        });
}

export async function selectDesliga(req, res) {
    openDb()
        .then(db => {
            if (req.query.desliga) {
                db.all('SELECT * FROM computadores WHERE desliga =?', [req.query.desliga])
                    .then(computadores => res.json(computadores))
            }
            else {
                db.all('SELECT * FROM computadores')
                    .then(computadores => res.json(computadores))
            }
        });
}

export async function insertPc(req, res) {
    let pc = req.body
    openDb()
        .then(db => {
            db.run('INSERT INTO computadores (nome, tag, desliga, dominio) VALUES (?, ?, ?, ?)', [pc.nome, pc.tag, pc.desliga, pc.dominio]);
        });
    res.json({
        "statusCode": 200
    })
}

export async function alterarPc(req, res) {
    let pc = req.body

    openDb()
        .then(db => {
            db.run('UPDATE computadores SET nome=?,tag=?,desliga= ?, dominio=? WHERE id=?', [pc.nome, pc.tag, pc.desliga, pc.dominio, pc.id]);
        });
    res.json({
        "statusCode": 200
    })
}

export async function alterarHorario(req, res) {
    let horario = req.body

    openDb()
        .then(db => {
            db.run('UPDATE hora SET horas=?,minutos=? WHERE id=1', [horario.horas, horario.minutos]);
        });
    res.json({
        "statusCode": 200
    })
}

export async function selectHorario(req, res) {
    openDb()
        .then(db => {
            db.all('SELECT * FROM hora')
                .then(computadores => res.json(computadores))

        });
}