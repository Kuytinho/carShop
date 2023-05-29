import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.createCar(car);
    return new Car({
      id: newCar.id,
      model: newCar.model,
      year: newCar.year,
      color: newCar.color,
      status: newCar.status,
      buyValue: newCar.buyValue,
      doorsQty: newCar.doorsQty,
      seatsQty: newCar.seatsQty,
    });
  }

  public async getAllCars() {
    const carODM = new CarODM();
    const carsList = await carODM.getAllCars();
    return carsList.map((car) => ({ id: car._id,
      model: car.model,
      year: car.year,
      color: car.color,
      status: car.status,
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty }));
  }

  public async getCarById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.getCarById(id);
    if (!car) return null;
    return {
      id: car._id,
      model: car.model,
      year: car.year,
      color: car.color,
      status: car.status,
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty };
  }

  public async updateCar(id: string, newCar: ICar) {
    const carODM = new CarODM();
    const car = await carODM.updateCar(id, newCar);
    if (!car) return null;
    return { ...newCar, id };
  }
}

export default CarService;