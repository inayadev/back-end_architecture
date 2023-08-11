import joi from "joi"
import { userdata } from "../interface/UserInterface"


export const userdatavalidation = (user:userdata)=>{
const userschema = joi.object({
    name:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().min(6).max(12).required()
})
return userschema.validate(user)


}

