import  express  from "express";
import { createUser, getCurrentUsage } from "../controllers/userController";

const userRoutes=express.Router();

userRoutes.post("/user/create", createUser);
userRoutes.get("/users:id/current-usage", getCurrentUsage);
userRoutes.get('/users:id/billing-summary',()=>{});

export default userRoutes;