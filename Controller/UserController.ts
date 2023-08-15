import { NextFunction, Request, Response } from "express"
import usermModel from "../Models/UserModel"
import bcrypt from "bcrypt"
import { AsyncHandler } from "../utils/AsyncHandler"
import { userdatavalidation } from "../Validator/validator"
import { appError, httpCode } from "../utils/AppError"
import { userdata } from "../interface/UserInterface"

export const register = AsyncHandler(
    async(req:Request<{},{}, userdata>
        ,res:Response, next:NextFunction):Promise<Response>=>{
        const validateuser = userdatavalidation(req.body)
        console.log(validateuser)
if (validateuser.error) {
next(
    new appError({
        message:"invalid input", 
        httpcode: httpCode.bad_request
    })
); 
}
   const {name,password,email} = req.body;
   const lowercasedemail = email.toLowerCase()
   const salt: string = await bcrypt.genSalt(8);
 const encript = await bcrypt.hash(password,salt)
 const create = await usermModel.create({
    name,
    password: encript,
    email:lowercasedemail
 })

 if (!create) {
    next(
        new appError({
            message: "account not created", 
            httpcode:httpCode.bad_request, 
            isoperational:true
        })
    )
 }

 return res.status(201).json({
    message: "successfully created user",
    data: create
 })

}
)



