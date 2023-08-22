import { Router } from "express";
import { getAll, loginuser, register } from "../Controller/UserController";

const route = Router()

route.route("/signup").post(register)
route.route("/login").post(loginuser)
route.route("/getAll").get(getAll)


export default route
