import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Fonction pour récupérer les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      console.log(response.data); // Vérifie ici ce que l'API renvoie
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
    }
  };
  
  // Récupérer les utilisateurs au chargement du composant
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async (updatedUser) => {
    const formData = new FormData();
    formData.append('nom', updatedUser.nom);
    formData.append('prenom', updatedUser.prenom);
    formData.append('email', updatedUser.email);
    formData.append('phone', updatedUser.phone);
    formData.append('password', updatedUser.password);
  
    if (updatedUser.image) {
      formData.append('image', updatedUser.image);
    }
  
    try {
      await axios.put(`http://localhost:5000/users/${updatedUser._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchUsers(); // Rafraîchir la liste des utilisateurs après modification
      setEditingUser(null); // Réinitialiser l'utilisateur en cours d'édition
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
    }
  };
 
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    if (confirmDelete) {
      try {
        console.log(`Suppression de l'utilisateur avec l'ID : ${userId}`);
        await axios.delete(`http://localhost:5000/users/${userId}`);
        fetchUsers(); // Rafraîchir la liste après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression de l’utilisateur', error);
      }
    }
  };
  
  const handleUserAdded = () => {
    fetchUsers(); // Recharge la liste après ajout
  };

  return (
    <div className="App">
       <h1 className="text-2xl font-bold text-center">Gestion des utilisateurs</h1>
      <UserForm onUserAdded={handleUserAdded} editingUser={editingUser} onUpdate={handleUpdate} />
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
