import { Request,Response, NextFunction, response } from "express";
import { appError } from "../utils/AppError";



export const DevErrorHandler = (err:appError,res:Response)=>{
    res.status(err.httpcode).json({
        name: err.name,
        message: err.message
    })
}

export const errorhandler = (err:appError, req:Request,res:Response,next:NextFunction)=>{
      DevErrorHandler(err,res)
}
