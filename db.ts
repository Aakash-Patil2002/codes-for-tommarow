import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";


export const sequelize :Sequelize = new Sequelize(process.env.DB_CONNECTION as string,{
    dialect:'postgres',
    logging:false
});

