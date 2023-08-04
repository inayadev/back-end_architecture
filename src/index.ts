import express,{Application} from "express"
import appconfig from "./app";
import DBCONNECTION from "../config/database";

const port:number = 2040;

const app:Application = express()

appconfig(app)
DBCONNECTION()

const server = app.listen(port,()=>{
    console.log("")
    console.log("server is up and running")
})

