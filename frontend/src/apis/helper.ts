import axios from 'axios';

export const mapRequest = axios.create({
  baseURL: process.env.REACT_APP_GOOGLE_MAPS_BASE_URL
})

export const apiRequest = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
})