import { NextFunction, Request, Response } from 'express';
import IMoto from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const car: IMoto = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
      status: this.req.body.status ? this.req.body.status : false,
    };

    try {
      const newMoto = await this.service.create(car);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const motos = await this.service.getAll();
    return this.res.status(200).json(motos);
  }

  public async getById() {
    const { id } = this.req.params;
    const idRegex = /^[a-f\d]{24}$/i;
    if (!idRegex.test(id)) return this.res.status(422).json({ message: 'Invalid mongo id' });
    const moto = await this.service.getById(id);
    if (!moto) return this.res.status(404).json({ message: 'Motorcycle not found' });
    return this.res.status(200).json(moto);
  }

  public async update() {
    const { id } = this.req.params;
    const newMoto = this.req.body;

    const idRegex = /^[a-f\d]{24}$/i;
    if (!idRegex.test(id)) return this.res.status(422).json({ message: 'Invalid mongo id' });

    const motoExists = await this.service.getById(id);
    if (!motoExists) return this.res.status(404).json({ message: 'Motorcycle not found' });

    const moto = await this.service.update(id, newMoto);
    return this.res.status(200).json(moto);
  }
}

export default MotorcycleController;