import express from 'express';
import MotorcyclesRoutes from './Routes/MotorcyclesRoutes';
import CarsRoutes from './Routes/CarRoutes';

const app = express();
app.use(express.json());
app.use('/motorcycles', MotorcyclesRoutes);
app.use('/cars', CarsRoutes);

export default app;