import { Request, Response } from "express";
import { UsageRecords } from "../models";

export const recordUsage = async (req:Request,res:Response)=>{
    try {
        const {userId, action,usedUnits}=req.body;
        if(!userId || !action || !usedUnits){
            return res.status(400).json({error:"All fields are required"})
        }
        const record = await UsageRecords.create({userId,action,usedUnits});
        res.status(201).json({ data: record });

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'failed to record usage'});
    }
}