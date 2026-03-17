import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Auth
export const register = (data) => axios.post(`${API_URL}/auth/register`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

// Topics
export const getTopics = () => axios.get(`${API_URL}/topics`);
export const createTopic = (data) => axios.post(`${API_URL}/topics`, data);
export const updateTopic = (id, data) => axios.put(`${API_URL}/topics/${id}`, data);
export const deleteTopic = (id) => axios.delete(`${API_URL}/topics/${id}`);

// Notes
export const getNotes = () => axios.get(`${API_URL}/notes`);
export const createNote = (data) => axios.post(`${API_URL}/notes`, data);
export const updateNote = (id, data) => axios.put(`${API_URL}/notes/${id}`, data);
export const deleteNote = (id) => axios.delete(`${API_URL}/notes/${id}`);

// Snippets
export const getSnippets = () => axios.get(`${API_URL}/snippets`);
export const createSnippet = (data) => axios.post(`${API_URL}/snippets`, data);
export const updateSnippet = (id, data) => axios.put(`${API_URL}/snippets/${id}`, data);
export const deleteSnippet = (id) => axios.delete(`${API_URL}/snippets/${id}`);

// Study Sessions
export const startSession = (data) => axios.post(`${API_URL}/study-sessions/start`, data);
export const endSession = (data) => axios.post(`${API_URL}/study-sessions/end`, data);
export const getSessions = () => axios.get(`${API_URL}/study-sessions`);

// Progress
export const getDashboardStats = () => axios.get(`${API_URL}/progress/dashboard`);
export const getWeeklyStudy = () => axios.get(`${API_URL}/progress/weekly-study`);
export const getAnalytics = () => axios.get(`${API_URL}/progress/analytics`);
