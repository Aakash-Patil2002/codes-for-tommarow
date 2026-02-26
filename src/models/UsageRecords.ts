import { DataTypes, Model,Optional } from "sequelize";
import { sequelize } from "../../db";

interface UsageRecordsInterFace{
    id:number;
    userId:number;
    action:string;
    usedUnits:number;
    createdAt:Date;
}

interface UsageRecordsCreateionAttribute extends Optional<UsageRecordsInterFace,"id" | "createdAt">{}
const UsageRecords = sequelize.define<Model<UsageRecordsInterFace,UsageRecordsCreateionAttribute>>(
    'UsageRecords',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        action:{
            type:DataTypes.STRING,
            allowNull:false
        },
        usedUnits:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:DataTypes.NOW
        }
    },{
        tableName:'UsageRecordss',
        timestamps:false
    }
);

export default UsageRecords;