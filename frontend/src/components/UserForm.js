import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ onUserAdded, editingUser, onUpdate }) => {
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    password: '',
    image: null,
  });

  // Utilise le useEffect pour remplir le formulaire en mode édition
  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setUser({
      ...user,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', user.nom);
    formData.append('prenom', user.prenom);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('password', user.password);
    if (user.image) {
      formData.append('image', user.image);
    }

    try {
      if (editingUser) {
        // Si en mode édition, on met à jour l'utilisateur
        await onUpdate(user);
      } else {
        // Sinon, on ajoute un nouvel utilisateur
        await axios.post('http://localhost:5000/users', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        onUserAdded();
      }

      // Réinitialiser le formulaire après soumission
      setUser({
        nom: '',
        prenom: '',
        email: '',
        phone: '',
        password: '',
        image: null,
      });
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
       <h2 className="text-2xl font-bold mb-4">Formulaire d'Ajout et de Modification des Utilisateurs</h2>
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={user.nom}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="text"
        name="prenom"
        placeholder="Prénom"
        value={user.prenom}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Téléphone"
        value={user.phone}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={user.password}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        className="border p-2 w-full mb-2"
        accept="image/*"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 w-full"
      >
       {editingUser ? 'Mettre à jour' : 'Ajouter'}
      </button>
    </form>
    </div>
  );
};

export default UserForm;
