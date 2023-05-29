import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Verifica a rota de carros', function () {
  it('com Sucesso', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carReturn = {
      id: 1234,
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    sinon.stub(Model, 'create').resolves(carReturn);

    const service = new CarService();
    const result = await service.createCar(carInput);

    expect(result.getId()).to.equal(carReturn.id);
    expect(result.getModel()).to.equal(carReturn.model);
    expect(result.getYear()).to.equal(carReturn.year);
  });

  it('Deve listar todos os carros de forma correta', async function () {
    const model = [
      {
        _id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        _id: '634852326b35b59438fbea31',
        model: 'Palio',
        year: 1995,
        color: 'Blue',
        status: false,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];
    const serviceReturn = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Palio',
        year: 1995,
        color: 'Blue',
        status: false,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];
    sinon.stub(Model, 'find').resolves(model);

    const service = new CarService();
    const result = await service.getAllCars();

    expect(result).to.be.deep.equal(serviceReturn);
  });

  it('Deve listar um carro por id corretamente', async function () {
    const model = {
      _id: '634852326b35b59438fbea2f',
      model: 'Palio',
      year: 2002,
      color: 'Blue',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    const serviceReturn = {
      id: '634852326b35b59438fbea2f',
      model: 'Palio',
      year: 2002,
      color: 'Blue',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findById').resolves(model);

    const service = new CarService();
    const result = await service.getCarById('634852326b35b59438fbea2f');

    expect(result).to.be.deep.equal(serviceReturn);
  });
  it('com id inexistente', async function () {  
    sinon.stub(Model, 'findById').resolves([]);

    const service = new CarService();
    const result = await service.getCarById('12345634852326b35b59438f');

    expect(result?.id).to.be.deep.equal(undefined);
  });

  it('Funcionando', async function () {
    const input = {
      model: 'Palio',
      year: 2002,
      color: 'Pink',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'updateOne').resolves();

    const service = new CarService();
    const result = await service.updateCar('634852326b35b59438fbea2f', input);

    expect(result).to.be.deep.equal(null);
  });

  afterEach(function () {
    sinon.restore();
  });
});