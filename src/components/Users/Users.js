import React, { useEffect, useState } from 'react';
import './Users.css';

const API_GATEWAY = "http://localhost:1025"; // 🔥 URL del API Gateway

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', lastname: '', email: '', phone: '', role: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('No estás autenticado.');
        return;
      }

      try {
        const response = await fetch(`${API_GATEWAY}/api/users`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: "query { users { id name lastname email phone role } }" })
        });

        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        const result = await response.json();
        setUsers(result.data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_GATEWAY}/api/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Error al eliminar usuario');
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreate = async () => {
    const token = sessionStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_GATEWAY}/api/users/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      if (!response.ok) throw new Error('Error al crear usuario');
      const newUserResponse = await response.json();
      setUsers([...users, newUserResponse]);
      setNewUser({ name: '', lastname: '', email: '', phone: '', role: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async () => {
    const token = sessionStorage.getItem('authToken');
    try {
      const response = await fetch(`${API_GATEWAY}/api/users/update/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingUser)
      });
      if (!response.ok) throw new Error('Error al actualizar usuario');
      setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
      setEditingUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="users-container">
      <h1>Gestión de Usuarios</h1>
      {error && <p className="error-text">{error}</p>}
      
      <button className="create-btn" onClick={() => setEditingUser({})}>➕ Crear Usuario</button>
      
      {editingUser && (
        <div className="modal">
          <h2>{editingUser.id ? 'Editar Usuario' : 'Crear Usuario'}</h2>
          <input type="text" placeholder="Nombre" value={editingUser.name || ''} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} />
          <input type="text" placeholder="Apellido" value={editingUser.lastname || ''} onChange={(e) => setEditingUser({ ...editingUser, lastname: e.target.value })} />
          <input type="email" placeholder="Email" value={editingUser.email || ''} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
          <input type="text" placeholder="Teléfono" value={editingUser.phone || ''} onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })} />
          <input type="text" placeholder="Rol" value={editingUser.role || ''} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })} />
          <button onClick={editingUser.id ? handleUpdate : handleCreate}>{editingUser.id ? 'Actualizar' : 'Crear'}</button>
          <button onClick={() => setEditingUser(null)}>Cancelar</button>
        </div>
      )}
      
      {loading ? <p>Cargando usuarios...</p> : (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>✏️ Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>🗑 Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
