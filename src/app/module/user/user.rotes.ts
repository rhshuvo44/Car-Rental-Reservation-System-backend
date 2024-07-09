import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
const router = express.Router();

router.post('/signup', validateRequest(userValidation.UserSignupSchemaZod));
router.post('/signin', validateRequest(userValidation.UserLoginSchemaZod));

export const userRouter = router;