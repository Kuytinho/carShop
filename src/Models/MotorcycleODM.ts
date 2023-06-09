import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import IMoto from '../Interfaces/IMotorcycle';
  
class MotorcycleODM {
  private schema: Schema;
  private model: Model<IMoto>;
  
  constructor() {
    this.schema = new Schema<IMoto>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    this.model = models.Motorcycle || model('Motorcycle', this.schema);
  }
  
  public async create(car: IMoto): Promise<IMoto> {
    return this.model.create({ ...car });
  }

  public async getAll() {
    return this.model.find();
  }

  public async getById(id: string) {
    return this.model.findById(id);
  }

  public async update(id: string, newMoto: IMoto) {
    return this.model.updateOne({ _id: id }, { ...newMoto });
  }
}
  
export default MotorcycleODM;