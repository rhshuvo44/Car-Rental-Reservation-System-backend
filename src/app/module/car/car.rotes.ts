import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { carController } from './car.controller'
import {
  CarReturnSchemaZod,
  CarSchemaZod,
  CarUpdateSchemaZod,
} from './car.validation'
const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CarSchemaZod),
  carController.createCar,
)
router.get('/', carController.getAllCar)
router.get('/:id', carController.getACar)
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(CarUpdateSchemaZod),
  carController.updateCar,
)
router.delete('/:id', auth(USER_ROLE.admin), carController.deletedCar) //soft deleted from
router.put(
  '/return',
  auth(USER_ROLE.admin),
  validateRequest(CarReturnSchemaZod),
  carController.returnCar,
)

export const carRouter = router
