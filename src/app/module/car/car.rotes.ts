import express from 'express'
import { carController } from './car.controller'
const router = express.Router()

router.post('/', carController.createCar)
router.get('/', carController.getAllCar)
router.get('/:id', carController.getACar)
router.put('/:id', carController.updateCar)
router.delete('/:id', carController.deletedCar) //soft deleted from
router.put('/return', carController.returnCar)

export const carRouter = router
