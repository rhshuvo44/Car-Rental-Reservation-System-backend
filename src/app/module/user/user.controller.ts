import catchAsync from "../../utils/catchAsync";
import { userService } from "./user.service";

const signup = catchAsync(async (req, res) => {

await userService.singup(req?.body,res)




})

export const userController = {
    signup
}