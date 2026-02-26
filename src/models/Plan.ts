import { DataTypes, Model,Optional } from "sequelize";
import { sequelize } from "../../db";

interface PlanInterFace {
  id: number;
  name: string;
  monthlyQuota: number;
  extraChargePerUnit: number;
}

interface PlanCreateionAttribute extends Optional<PlanInterFace,"id">{}
const Plan = sequelize.define<Model<PlanInterFace, PlanCreateionAttribute>>(
  "Plan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monthlyQuota: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    extraChargePerUnit: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
  },
  {
    tableName: "Plans",
    timestamps: false,
  },
);

export default Plan;