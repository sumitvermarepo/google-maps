import { locationCollection } from "../schema/locationSchema";

const colors = ['grey', 'red', 'blue', 'green'];

export const addNewLocationApi = async (opts) => {
  const locationObj = new locationCollection({
    latlng: opts,
    color: 'grey'
  });

  return await locationObj.save();
};

export const getSearchedLocationsApi = async () => {
  return await locationCollection.find({});
}

export const updateLocationStatusApi = async (id) => {
  const location = await locationCollection.findOne({ _id: id });
  const index = colors.indexOf(location.color);
  if ((colors.length - 1) >= (index + 1)) {
    location.color = colors[index + 1]
  } else {
    location.color = colors[0];
  }
  return await location.save();
}