import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userValidation } from './user.validation';
const router = express.Router();

router.post('/signup', validateRequest(userValidation.UserSignupSchemaZod), userController.signup);
router.post('/signin', validateRequest(userValidation.UserLoginSchemaZod), userController.signin);

export const userRouter = router;