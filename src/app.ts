import express, { Application, NextFunction, Request, Response } from "express"
import route from "../Router/router"
import { appError, httpCode } from "../utils/AppError"
import { errorhandler } from "../Middleware/ErrorHandler"

export default function appconfig(app:Application){

    app.use(express.json())
    .use("/api", route)

    .all("", (req:Request, res:Response, next:NextFunction) =>{
        next(
            new appError({
                message: `This route ${req.originalUrl} does not exist`,
                httpcode: httpCode.Not_found,
                isoperational: true,
            })
        )
    })
   .use(errorhandler)
}