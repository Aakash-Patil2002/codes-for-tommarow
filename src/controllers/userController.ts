import { Request, Response } from "express";
import { Plan, Subscription, UsageRecords, User } from "../models";
import { Op } from "sequelize";

function getMonthRange(date: Date): { start: Date; end: Date } {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return { start, end };
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "NAME IS required" });
    }
    const record = await User.create({name});
    res.status(201).json({ data: record });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to user" });
  }
};

export const getCurrentUsage = async (req: Request, res: Response) => {
  try {
    const userId: number = +req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: "User Not Found" });
    }

    const subscription = await Subscription.findOne({
      where: { userId, isActive: true },
      include: [Plan],
    });

    if (!subscription) {
      res.status(404).json({ error: "subscription Not Found" });
    }

    const { start, end } = getMonthRange(new Date());
    const total = await UsageRecords.sum("usedUnits", {
      where: {
        userId,
        createdAt: { [Op.gte]: start, [Op.lt]: end },
      },
    });

    const totalUsed = total || 0;

    const plan: any = subscription?.get("Plan");
    const remaining = plan.monthlyQuota - totalUsed;
    res.status(200).json({
      totalUnitsUsed: totalUsed,
      remainingUnits: remaining < 0 ? 0 : remaining,
      activePlan: {
        id: plan.id,
        name: plan.name,
        monthlyQuota: plan.monthlyQuota,
        extraChargePerUnit: parseFloat(plan.extraChargePerUnit.toString()),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch usage" });
  }
};

export const getBillingSummury = async (req: Request, res: Response) => {
  try {
    const userId: number = +req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: "User Not Found" });
    }

    const subscription = await Subscription.findOne({
      where: { userId, isActive: true },
      include: [Plan],
    });

    if (!subscription) {
      res.status(404).json({ error: "subscription Not Found" });
    }

    const { start, end } = getMonthRange(new Date());
    const total = await UsageRecords.sum("usedUnits", {
      where: {
        userId,
        createdAt: { [Op.gte]: start, [Op.lt]: end },
      },
    });

    const totalUsed = total || 0;
    const plan: any = subscription?.get("Plan");
    const quota = plan.monthlyQuota;
    const extraUnits = totalUsed > quota ? totalUsed- quota:0;
    const extraCharges=extraUnits * parseFloat(plan.extraChargePerUnit.toString());
    

    res.status(200).json({
      totalUnitsUsed: totalUsed,
      planQuota:quota,
      extraUnits,
      extraCharges:parseFloat(extraCharges.toFixed(2)),
      activePlan: {
        id: plan.id,
        name: plan.name,
        monthlyQuota: plan.monthlyQuota,
        extraChargePerUnit: parseFloat(plan.extraChargePerUnit.toString()),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch billing Summary" });
  }
};