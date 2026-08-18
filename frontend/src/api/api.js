import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Response interceptor for unified, user-friendly error formatting
client.interceptors.response.use(
  (response) => response,
  (error) => {
    let friendlyMessage = 'An unexpected error occurred while communicating with the server.';

    if (error.code === 'ECONNABORTED') {
      friendlyMessage = 'The request timed out. Please check your network connection and try again.';
    } else if (!error.response) {
      friendlyMessage = 'Unable to connect to the backend server. Please verify the API is running at ' + API_BASE_URL;
    } else if (error.response.data && error.response.data.detail) {
      friendlyMessage = typeof error.response.data.detail === 'string'
        ? error.response.data.detail
        : JSON.stringify(error.response.data.detail);
    } else if (error.response.status === 413) {
      friendlyMessage = 'File size exceeds the maximum limit (50MB).';
    } else if (error.response.status === 422) {
      friendlyMessage = 'Unable to parse WhatsApp chat. Please ensure the file is an unedited export .txt file.';
    } else if (error.response.status === 404) {
      friendlyMessage = 'The requested analysis session was not found.';
    }

    const enhancedError = new Error(friendlyMessage);
    enhancedError.status = error.response ? error.response.status : 0;
    enhancedError.originalError = error;
    return Promise.reject(enhancedError);
  }
);

export const api = {
  // Health check
  checkHealth: async () => {
    const response = await client.get('/api/health');
    return response.data;
  },

  // Upload WhatsApp chat file (.txt)
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

  // Complete analytics bundle
  getFullAnalytics: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/full/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  // Overview metrics
  getOverview: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/overview/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  // Participant list & contributions
  getUsers: async (analysisId) => {
    const response = await client.get(`/api/analytics/users/${analysisId}`);
    return response.data;
  },

  // Monthly timeline
  getMonthlyTimeline: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/timeline/monthly/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  // Daily timeline
  getDailyTimeline: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/timeline/daily/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  // Activity peak stats
  getActivity: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/activity/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  // Weekly heatmap matrix
  getHeatmap: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/heatmap/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  // Word statistics & Word Cloud points
  getWords: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/words/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },

  // Emoji frequency & ranking
  getEmojis: async (analysisId, user = 'Overall') => {
    const response = await client.get(`/api/analytics/emojis/${analysisId}`, {
      params: { user },
    });
    return response.data;
  },
};

export default api;
