const express = require('express');
const { create } = require('express-handlebars');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const https = require('https');
const fs = require('fs');
// HTTPS Server Konfiguration
const app = express();
const port = 443;



const certPath = path.join(__dirname, 'certs', 'selfsigned.crt');
const keyPath = path.join(__dirname, 'certs', 'selfsigned.key');

const server = https.createServer({
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath)
}, app);



const apiBase = 'http://pcp_backend';

// Static Middleware für CSS und Bilder
app.use(express.static(path.join(__dirname, 'views', 'layouts')));

const hbs = create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
    try {
        const response = await fetch(`${apiBase}/data`);


        console.log('Status:', response.status);
        console.log('Content-Type:', response.headers.get('content-type'));

    

        if (!response.ok) {
            console.error('API antwortet nicht OK:', response.status, response.statusText);
            return res.status(500).send('Fehler beim Abrufen der Daten von der API!!');
        }

        const daten = await response.json();
        res.render('home', {daten: daten});


    

    } catch (error) {
        console.error('Fehler im Fetch oder JSON:', error.message);
    }
});


server.listen(port, () => {
    console.log(`🔐 Express HTTPS-Server läuft auf https://localhost`);
  });