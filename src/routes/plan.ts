import  express  from "express";
import { createUser, getCurrentUsage } from "../controllers/userController";
import { createPlan } from "../controllers/planController";

const planRoutes=express.Router();

planRoutes.post("/plan/create", createPlan);


export default planRoutes;