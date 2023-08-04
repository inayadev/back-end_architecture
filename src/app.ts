import express, { Application } from "express"

export default function appconfig(app:Application){
    app.use(express.json())
    
}