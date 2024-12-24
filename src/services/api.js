import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  get(endpoint) {
    return apiClient.get(endpoint);
  },
  post(endpoint, data) {
    return apiClient.post(endpoint, data);
  },
  put(endpoint, data) {
    return apiClient.put(endpoint, data);
  },
  delete(endpoint) {
    return apiClient.delete(endpoint);
  },
};