
import { Request, Response } from "express";
import { Plan } from "../models";

export const createPlan = async (req: Request, res: Response) => {
  try {
    const { name, monthlyQuota, extraChargePerUnit } = req.body;
    if (!name || !monthlyQuota || !extraChargePerUnit) {
      return res.status(400).json({ error: "All Fields are required" });
    }
    const record = await Plan.create({
      name,
      monthlyQuota,
      extraChargePerUnit,
    });
    res.status(201).json({ data: record });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to user" });
  }
};
