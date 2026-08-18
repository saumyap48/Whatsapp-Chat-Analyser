import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
  timeout: 45000,
});

export const api = {
  // Health
  checkHealth: async () => {
    const response = await client.get('/api/health');
    return response.data;
  },

  // Upload
  uploadChat: async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await client.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return response.data;
  },

  // Full Analytics
  getFullAnalytics: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/full/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  // Overview
  getOverview: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/overview/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  // Users
  getUsers: async (analysisId) => {
    const response = await client.get(`/api/analytics/users/${analysisId}`);
    return response.data;
  },

  // Timelines
  getMonthlyTimeline: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/timeline/monthly/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  getDailyTimeline: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/timeline/daily/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  // Activity & Heatmap
  getActivity: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/activity/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  getHeatmap: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/heatmap/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  // Words & Emojis
  getWords: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/words/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  getEmojis: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/emojis/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },
};

export default api;
