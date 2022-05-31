import axios from 'axios';
import { config } from '../config';
import { addNewLocationApi, getSearchedLocationsApi, updateLocationStatusApi } from "../api/locationApi";

export const apiRequest = axios.create({ baseURL: config.mapsbaseUrl });

export const addLocationController = async (req, res) => {
  const response = await addNewLocationApi(req.body);
  return res.send(response);
};

export const getSearchedLocationsController = async (req, res) => {
  const response = await getSearchedLocationsApi();
  return res.send(response);
}

export const updateLocationStatusController = async (req, res) => {
  const { id } = req.params;
  const response = await updateLocationStatusApi(id);
  return res.send(response);
}

export const searchLocationsController = async (req, res) => {
  const { key } = req.query;
  const URL = `maps/api/place/autocomplete/json?input=${key}&types=establishment&location=37.76999%2C-122.44696&radius=500&key=${config.mapApiKey}`
  apiRequest.get(URL).then((response) => {
    res.send(response.data);
  }).catch(error => {
    res.status(500).send();
  })
}