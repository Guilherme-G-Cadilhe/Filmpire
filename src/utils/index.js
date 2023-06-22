import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get('/authentication/token/new');
    console.log('data TOKEN :>> ', data);
    const token = data?.request_token;

    if (data?.success && token) {
      localStorage.setItem('request_token', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log('error creating token :>> ', error);
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');

  if (token) {
    try {
      const { data } = await moviesApi.post('/authentication/session/new', {
        request_token: token,
      });
      console.log('data SESSION :>> ', data);
      localStorage.setItem('session_id', data.session_id);
      return data.session_id;
    } catch (error) {
      console.log('error creating session :>> ', error);
    }
  }
  return null;
};
