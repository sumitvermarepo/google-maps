import { addNewLocationApi, getSearchedLocationsApi, updateLocationStatusApi } from "../api/locationApi";

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