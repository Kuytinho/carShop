import { Router } from 'express';
import CarController from '../Controllers/CarController';

const routes = Router();

routes.get(
  '/',
  (req, res, next) => new CarController(req, res, next).getAllCars(),
);
  
routes.get(
  '/:id',
  (req, res, next) => new CarController(req, res, next).getCarById(),
);

routes.post(
  '/',
  (req, res, next) => new CarController(req, res, next).createCar(),
);
  
routes.put(
  '/:id',
  (req, res, next) => new CarController(req, res, next).updateCar(),
);

export default routes;