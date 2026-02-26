import  express  from "express";
import { recordUsage } from "../controllers/usageController";

const usageRoutes=express.Router();

usageRoutes.post("/usage", recordUsage);

export default usageRoutes;