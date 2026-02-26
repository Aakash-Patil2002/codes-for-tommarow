import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from '../db';
import userRoutes from './routes/userRoutes';
import usageRoutes from './routes/usageRoutes';
import planRoutes from './routes/plan';

dotenv.config();
const app=express();

app.use(express.json());

app.use("/api/v1", usageRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", planRoutes);

sequelize.authenticate().then((success)=>{
    console.log("database Connected")
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log("Error while connecting database");
    process.exit();
})