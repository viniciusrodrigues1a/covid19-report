import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pomber.github.io/covid19/timeseries.json',
});

export default api;
