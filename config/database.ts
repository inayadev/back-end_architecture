import mongoose from "mongoose"

const Dburl = "mongodb://0.0.0.0:/AUTH2"

const clouddburl = ""

const DBCONNECTION =async ():Promise<void>=> {
    try {
        const db = await mongoose.connect(Dburl)
        console.log(`database is connected to ${db.connection.host}`)
    } catch (error) {
        console.log("error occur in database",error)
    }
}

export default DBCONNECTION
