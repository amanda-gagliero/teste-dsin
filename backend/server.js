const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./database.sqlite');

app.use(express.json());
app.use(cors());

// Criar tabelas no banco de dados (se não existirem) //
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY, user_id INTEGER, service TEXT, date TEXT, status TEXT, FOREIGN KEY(user_id) REFERENCES users(id))");
});

// Rota para adicionar um usuário //
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function(err) {
        if (err) return res.status(500).send(err.message);
        res.json({ id: this.lastID, name, email });
    });
});

// Rota para listar os usuários //
app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// Rota para adicionar um agendamento //
app.post('/appointments', (req, res) => {
    const { user_id, service, date } = req.body;
    const status = "Pendente";
    db.run("INSERT INTO appointments (user_id, service, date, status) VALUES (?, ?, ?, ?)", [user_id, service, date, status], function(err) {
        if (err) return res.status(500).send(err.message);
        res.json({ id: this.lastID, user_id, service, date, status });
    });
});

// Rota para editar um agendamento (com validação de 2 dias de antecedência) //
app.put('/appointments/:id', (req, res) => {
    const { id } = req.params;
    const { service, date } = req.body;
    
    db.get("SELECT date FROM appointments WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).send(err.message);
        if (!row) return res.status(404).send("Agendamento não encontrado");

        const appointmentDate = new Date(row.date);
        const today = new Date();
        const diffDays = Math.ceil((appointmentDate - today) / (1000 * 60 * 60 * 24));

        if (diffDays < 2) {
            return res.status(400).send("Alteração só pode ser feita até 2 dias antes da data agendada. Entre em contato por telefone.");
        }

        db.run("UPDATE appointments SET service = ?, date = ? WHERE id = ?", [service, date, id], function(err) {
            if (err) return res.status(500).send(err.message);
            res.send("Agendamento atualizado com sucesso");
        });
    });
});

// Rota para cancelar um agendamento //
app.delete('/appointments/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM appointments WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).send(err.message);
        res.send("Agendamento cancelado com sucesso");
    });
});

// Rota para listar os agendamentos //
app.get('/appointments', (req, res) => {
    db.all("SELECT appointments.id, users.name, appointments.service, appointments.date, appointments.status FROM appointments JOIN users ON users.id = appointments.user_id", [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
