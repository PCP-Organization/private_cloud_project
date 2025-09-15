const fs = require('fs');

const data = JSON.parse(fs.readFileSync('/docker-entrypoint-initdb.d/data.json', 'utf8'));

db = db.getSiblingDB('pcp_db');
db.createCollection('data');
db.data.insertMany(data);

