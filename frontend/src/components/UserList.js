import React, { useEffect, useState } from 'react';
import axios from 'axios';
const UserList = ({onEdit, onDelete }) => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
    }
  };
console.log(fetchUsers());
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
            <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Image de Profil</th>
              <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Nom</th>
              <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Prénom</th>
              <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Telephone</th>
              <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Email</th>
              <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-center">
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td>
                <img
  src={`http://localhost:5000/uploads/${user.image}`} // Chemin de l'image
  alt="User"
  className="mt-2 h-32 w-32 object-cover rounded-full" // Ajout de rounded-full
/>
</td>
                <td className="w-1/4 py-3 px-4">{user.nom}</td>
                <td className="py-3 px-4">{user.prenom}</td>
                <td className="py-3 px-4">{user.phone}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
