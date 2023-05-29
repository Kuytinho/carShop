import {
  isValidObjectId,
  Model,
  models,
  Schema,
  UpdateQuery,
  model,
} from 'mongoose';
  
abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;
  
  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }
  
  public async createVehicle(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }
  
  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('Invalid Mongo id');
  
    return this.model.findByIdAndUpdate( // https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }
}
  
export default AbstractODM;