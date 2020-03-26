import axios from 'axios';

export const apiCovid = axios.create({
  baseURL: 'https://pomber.github.io/covid19/timeseries.json',
});

export const apiIpInfo = axios.create({
  baseURL: 'http://ip-api.com/json/',
});
