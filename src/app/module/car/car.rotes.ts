import express from 'express';
import { carController } from './car.controller';
const router = express.Router();

router.post('/', carController.createCar);
router.get('/', carController.getAllCar);
router.get('/:id', carController.getACar);
router.put('/:id',);
router.put('/return',);
router.put('/:id',);//soft deleted from

export const carRouter = router;