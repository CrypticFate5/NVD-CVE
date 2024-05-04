import express from "express";
import {getCveDetails,getCvesList} from "../controllers/cvesController.js";

const router=express.Router();

router.get("/",getCvesList);
router.get("/:cveId",getCveDetails);

export default router;