import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

class CarsODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Cars');
  }

  public async createCar(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async getAllCars() {
    return this.model.find();
  }

  public async getCarById(id: string) {
    return this.model.findById(id);
  }

  public async updateCar(id: string, newCar: ICar) {
    return this.model.updateOne({ _id: id }, { ...newCar });
  }  

  public async deleteCar(id: string) {
    return this.model.deleteOne({ _id: id });
  }
}

export default CarsODM;