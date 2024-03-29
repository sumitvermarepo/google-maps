import { Router } from "express";
import {
  addLocationController,
  getSearchedLocationsController,
  searchLocationsController,
  updateLocationStatusController
} from "../controller";
import { withErrorHandler } from "../helper"

const router = Router();

router.get("/ping", (req, res) => res.send("server is running"));
router.post("/location", (req, res) => withErrorHandler(req, res, addLocationController));
router.get("/searched-locations", (req, res) => withErrorHandler(req, res, getSearchedLocationsController));
router.put("/location/:id", (req, res) => withErrorHandler(req, res, updateLocationStatusController));
router.get("/search", (req, res) => withErrorHandler(req, res, searchLocationsController));

export default router;