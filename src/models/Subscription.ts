import { DataTypes, Model,Optional } from "sequelize";
import { sequelize } from "../../db";

interface SubscriptionInterFace {
  id: number;
  userId: number;
  planId: number;
  startDate: Date;
  isActive: boolean;
}

interface SubscriptionCreateionAttribute extends Optional<SubscriptionInterFace,"id">{}
const Subscription = sequelize.define<
  Model<SubscriptionInterFace, SubscriptionCreateionAttribute>
>(
  "Subscription",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    planId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
  },
  {
    tableName: "Subscriptions",
    timestamps: true,
  },
);

export default Subscription;