import express from "express";
import { getCveDetails, getCvesList, getCveByYear, getCveByScore, getCveByDays } from "../controllers/cvesController.js";

const router = express.Router();

router.get("/", getCvesList);
router.get("/:cveId", getCveDetails);
router.get("/year/:year", getCveByYear);
router.get("/score/:score", getCveByScore);
router.get("/days/:days", getCveByDays);

export default router;