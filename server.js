const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
