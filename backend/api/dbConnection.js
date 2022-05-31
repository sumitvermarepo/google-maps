/** @format */

"use strict";
import mongoose from 'mongoose';
import { config } from '../config';

const locationDbconnection = mongoose.createConnection(
  config.mongo.url + "/" + config.mapsDb.dbname,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

locationDbconnection
  .then(() => {
    console.log("Connected----- to " + config.mapsDb.dbname);
  })
  .catch((err) => {
    console.log("err", err);
  });

export default locationDbconnection;