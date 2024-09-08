const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint per inviare email
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

// Aggiungi un handler per la root (/)
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

// Utilizza la porta fornita da Heroku tramite process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
