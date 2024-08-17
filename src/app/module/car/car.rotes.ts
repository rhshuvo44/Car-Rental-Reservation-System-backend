import express from 'express';
import { carController } from './car.controller';
const router = express.Router();

router.post('/', carController.createCar);
router.get('/',);
router.get('/:id',);
router.put('/:id',);
router.put('/return',);
router.put('/:id',);//soft deleted from

export const carRouter = router;