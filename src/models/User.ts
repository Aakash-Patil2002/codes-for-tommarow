import { DataTypes, Model,Optional } from "sequelize";
import { sequelize } from "../../db";

interface UserInterFace{
    id:number;
    name:string;
}

interface UserCreateionAttribute extends Optional<UserInterFace,"id">{}
const User = sequelize.define<Model<UserInterFace,UserCreateionAttribute>>(
    'User',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        tableName:'Users',
        timestamps:true
    }
);

export default User;