import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState(() => {
    const savedMenu = localStorage.getItem('menuItems');
    return savedMenu ? JSON.parse(savedMenu) : [];
  });
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    type: 'breakfast',
    price: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (!token || role !== 'admin') {
      navigate('/admin-login');
    }
  }, [navigate]);

  // Save menu items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.description || !newItem.price) {
      setError('All fields are required');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const price = parseFloat(newItem.price);
    if (isNaN(price) || price <= 0) {
      setError('Price must be a positive number');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const newMenuItem = {
      id: Date.now(),
      ...newItem,
      price: price
    };

    setMenuItems(prev => [...prev, newMenuItem]);
    setNewItem({
      name: '',
      description: '',
      type: 'breakfast',
      price: '',
      date: new Date().toISOString().split('T')[0]
    });
    setSuccess('Meal added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDeleteItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    setSuccess('Meal deleted successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Meal</h2>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div>
              <label className="block mb-1">Meal Name</label>
              <input
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Type</label>
              <select
                name="type"
                value={newItem.type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={newItem.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={newItem.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Meal
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
          {menuItems.length === 0 ? (
            <p className="text-gray-500">No meals added yet.</p>
          ) : (
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.id} className="border p-4 rounded shadow">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-sm">Type: <span className="capitalize">{item.type}</span></p>
                  <p className="text-sm">Price: ₹{item.price}</p>
                  <p className="text-sm">Date: {new Date(item.date).toLocaleDateString()}</p>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;