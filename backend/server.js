const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const path = require('path');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// Servir les fichiers statiques du dossier 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes utilisateurs
app.use('/users', userRoutes);

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/usersDB', {})
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.log(err));

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
