/** @format */

"use strict";
import mongoose from 'mongoose';
import locationDbConnnection from '../api/dbConnection';

let locationSchema = new mongoose.Schema({
  latlng: {
    lat: Number,
    lng: Number
  },
  color: String
});

export const locationCollection = locationDbConnnection.model("location", locationSchema, "location");
