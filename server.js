const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Configurazione Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Gestione del form per l'email
app.post('/submit-email', (req, res) => {
    const email = req.body.email;
    if (email) {
        fs.appendFile('emails.txt', email + '\n', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Server Error');
            } else {
                res.send('Email received!');
            }
        });
    } else {
        res.status(400).send('Email is required');
    }
});

// Imposta la porta dinamica di Heroku o 3000 in locale
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
