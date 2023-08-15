import { Router } from "express";
import { register } from "../Controller/UserController";

const route = Router()

route.route("/signup").post(register)


export default route
