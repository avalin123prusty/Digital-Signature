import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const documentAPI = {
  uploadDocument: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getDocuments: () => api.get('/documents'),
  getDocument: (id) => api.get(`/documents/${id}`),
  generateSignedPdf: (id) => api.post(`/documents/${id}/generate`),
  downloadDocument: (id) => api.get(`/documents/${id}/download`),
};

export const signatureAPI = {
  saveSignature: (data) => api.post('/signatures', data),
  getSignatures: (documentId) => api.get(`/signatures/${documentId}`),
  updateSignatureStatus: (signatureId, data) => api.patch(`/signatures/${signatureId}`, data),
};

export const auditAPI = {
  getAuditTrail: (documentId) => api.get(`/audit/${documentId}`),
  getUserAuditTrail: () => api.get('/audit/user/trail'),
};

export default api;
