import API from '../api';

const getMenu = () => API.get('/menu');
const getMenuByDate = (date) => API.get(`/menu/${date}`);
const addMenuItem = (item) => API.post('/menu', item);
const deleteMenuItem = (id) => API.delete(`/menu/${id}`);
const getTodayMenu = () => {
  const today = new Date().toISOString().split('T')[0];
  return API.get(`/menu/${today}`);
};

export default {
  getMenu,
  getMenuByDate,
  addMenuItem,
  deleteMenuItem,
  getTodayMenu
};

