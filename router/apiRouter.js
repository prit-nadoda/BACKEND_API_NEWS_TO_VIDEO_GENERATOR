import express from "express";
import { newVideoRequest } from "../controllers/ApiController.js";

const router = express.Router();

router.post("/request/getVideo", newVideoRequest);

export default router;
