import express from 'express';
import search from "../controllers/weather.js";
import index from '../controllers/index.js'
import { checkForCityName } from "../middleware/paramInterceptor.js";

const router = express.Router();

router.get(["/", "/index"], index);
router.post("/weather", checkForCityName, search);

export default router;