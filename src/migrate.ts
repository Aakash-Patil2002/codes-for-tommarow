import { error } from "node:console";
import { sequelize } from "../db";
import './models/index'
async function migrate() {
    await sequelize.sync({alter:true});
    console.log("Database Sunked");
    process.exit(0)
}

migrate().then((success)=>{
}).catch((error)=>{
    console.log('database synk error : ',error)
    process.exit(1);
})