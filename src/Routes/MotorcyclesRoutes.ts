import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

routes.get(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).getAll(),
);
routes.get(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).getById(),
);

routes.post(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

routes.put(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).update(),
);

export default routes;