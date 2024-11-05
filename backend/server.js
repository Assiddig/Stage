const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.config');
const app = express();
connectDB();

app.use(express.json());
app.use(cors());

const port = 8000;
app.use('/api/suivie-entreprise', require('./src/controller/suivientreprise.controller'));
//ajouter pour les autres a chaque fois que je crée un controller 
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
