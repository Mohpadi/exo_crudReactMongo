const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const router = express.Router();
const path = require('path');

// Configuration de multer pour stocker les images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route pour ajouter un utilisateur avec image
router.post('/', upload.single('image'), async (req, res) => {
  const { nom, prenom, email, phone, password } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newUser = new User({ nom, prenom, email, phone, password, image });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de l’enregistrement de l’utilisateur', error });
  }
});

// Autres routes pour les utilisateurs (PUT, GET, DELETE)
router.put('/:id', upload.single('image'), async (req, res) => {
  const { nom, prenom, email, phone, password } = req.body;
  const image = req.file ? req.file.filename : req.body.image;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { nom, prenom, email, phone, password, image },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de l’utilisateur', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la suppression de l’utilisateur', error });
  }
});

// Exporter le router
module.exports = router;
