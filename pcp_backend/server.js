const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const fs = require('fs');

const app = express();



app.use(cors());
app.use(express.json());

const client = new MongoClient('mongodb://admin:secret@pcp_db:27017');
const dbName = 'pcp_db';

app.get('/data', async (req, res) => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const data = await db.collection('data').find().toArray();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.listen(80, () => {
    console.log(`🔐 Express HTTPS-Server läuft auf http://localhost:80`);
  });
