import { Router } from "express"
import registerUser from "../controller/user.controller.js"
import {upload} from "../middlewares/multer_basic.js"
const router = Router()

router.route("/register").post(
    upload.fields([ //fields taken because array takes multiple files in only one field
        {
            name: "avatar",
            maxCount:1 //files accepted 
        },{
            name: "coverImage",
            maxCount: 1
        }
    ])
    ,registerUser) // we are using post method for registration because
//  we are sending data to the server 
// and also for security reasons as get method will expose the data in the url 
// and also for caching issues
// router.route("/login").post() // we will implement login functionality later
export default router