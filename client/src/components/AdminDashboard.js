import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import menuService from '../services/menuService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    type: 'lunch',
    price: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (!token || role !== 'admin') {
      navigate('/admin-login');
      return;
    }

    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        const response = await menuService.getMenu();
        setMenuItems(response.data);
      } catch (err) {
        setError('Failed to load menu items. Please try again.');
        console.error('Error fetching menu items:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await menuService.addMenuItem(newItem);
      setMenuItems(prev => [...prev, response.data]);
      setNewItem({
        name: '',
        description: '',
        type: 'lunch',
        price: '',
        date: new Date().toISOString().split('T')[0]
      });
      setSuccess('Menu item added successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add menu item. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await menuService.deleteMenuItem(id);
      setMenuItems(prev => prev.filter(item => item.id !== id));
      setSuccess('Menu item deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete menu item. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Manage Menu</h2>
        
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
            <h2 className="text-2xl font-bold mb-4">Add New Menu Item</h2>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
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
                Add Menu Item
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Current Menu Items</h2>
            {isLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : menuItems.length === 0 ? (
              <p className="text-gray-500">No menu items yet.</p>
            ) : (
              <div className="space-y-4">
                {menuItems.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-gray-600">{item.description}</p>
                        <p>Type: {item.type}</p>
                        <p>Price: ₹{item.price}</p>
                        <p>Date: {item.date}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
