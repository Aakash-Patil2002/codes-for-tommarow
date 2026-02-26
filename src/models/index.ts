import Plan from "./Plan";
import Subscription from "./Subscription";
import UsageRecords from "./usageRecords";
import User from "./User";

User.hasMany(Subscription,{foreignKey:'userId'});
Subscription.belongsTo(User,{foreignKey:'userId'});

Plan.hasMany(Subscription,{foreignKey:'planId'});
Subscription.belongsTo(Plan, { foreignKey: "planId" });

User.hasMany(UsageRecords,{foreignKey:'userId'});
UsageRecords.belongsTo(User, { foreignKey: "userId" });


export {User,Plan,Subscription,UsageRecords};