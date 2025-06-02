const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-url.vercel.app/api'
  : 'http://localhost:3000/api';

export const ENDPOINTS = {
  STUDENT: {
    LIST: `${API_BASE_URL}/student`,
    DETAIL: (id: string) => `${API_BASE_URL}/student/${id}`,
  },
  QNA: {
    LIST: `${API_BASE_URL}/qna`,
    DETAIL: (id: string) => `${API_BASE_URL}/qna/${id}`,
  },
  REPAIR: {
    LIST: `${API_BASE_URL}/repair`,
    DETAIL: (id: string) => `${API_BASE_URL}/repair/${id}`,
  },
  ROOM: {
    LIST: `${API_BASE_URL}/room`,
    DETAIL: (id: string) => `${API_BASE_URL}/room/${id}`,
  },
  MEAL: {
    LIST: `${API_BASE_URL}/meal`,
    DETAIL: (date: string) => `${API_BASE_URL}/meal/${date}`,
  },
}; 