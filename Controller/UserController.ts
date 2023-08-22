import { NextFunction, Request, Response } from "express"
import usermModel from "../Models/UserModel"
import bcrypt from "bcrypt"
import { AsyncHandler } from "../utils/AsyncHandler"
import { loginvalidation, userdatavalidation } from "../Validator/validator"
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
);


export const loginuser = AsyncHandler(
    async(
        req:Request<{}, {}, userdata>,
        res:Response, 
        next:NextFunction):Promise<Response> => {
try {
    const {email, password} = req.body;
    const loginvalidate = loginvalidation({email, password});
    const user = await usermModel.findOne({email});

   if (loginvalidate) {
    next(
        new appError({
            message: "Not Created",
            httpcode: httpCode.Uauthorized,
            isoperational: true
        })
    )

   }

   const checkpassword = await bcrypt.compare(password, user!.password)

   if (!email && !password) {
    next(
        new appError({
            message: "USer not found",
            httpcode: httpCode.Not_found,
            isoperational: true
        })
    )
   }

   if (!user) {
    next(
        new appError({
            message: "Email or password not found",
            httpcode: httpCode.Uauthorized,
            isoperational: true
        })
    )
   }
   if (!checkpassword) {
    next(
        new appError({
            message: "Email or password not found",
            httpcode: httpCode.Uauthorized,
            isoperational: true
        })
    )
   }

   return res.status(200).json({
    message: "Successful",
    data: user
   })

} catch (error) {
    return res.status(400).json({
        message: "An error occured in login",
        error: error
    })
}
    }
)


export const getAll = async (req:Request,res:Response):Promise<Response>=>{
try {
    const get = await usermModel.find()
    return res.status(200).json({
        message: `${get.length} users`,
        data: get,
        
    })
    
} catch (error) {
    return res.status(400).json({
        message: "an error occured", error: error
    })
    
}
}