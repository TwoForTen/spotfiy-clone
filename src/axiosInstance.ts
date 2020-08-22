import axios, { AxiosInstance } from 'axios';

const axiosInstance = (access_token: string): AxiosInstance =>
  axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

export default axiosInstance;
