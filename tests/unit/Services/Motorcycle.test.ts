import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMoto from '../../../src/Interfaces/IMotorcycle';
import MotoService from '../../../src/Services/MotorcycleService';

const modelOutput = [
  {
    _id: '634852326b35b59438fbea2f',
    model: 'Honda Cb 600f Hornet',
    year: 2004,
    color: 'Black',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    _id: '634852326b35b59438fbea31',
    model: 'Honda Cbr 1000rr',
    year: 2011,
    color: 'Orange',
    status: true,
    buyValue: 59.900,
    category: 'Street',
    engineCapacity: 1000,
  },
];
const serviceOutput = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Honda Cb 600f Hornet',
    year: 2004,
    color: 'Black',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Honda Cbr 1000rr',
    year: 2011,
    color: 'Orange',
    status: true,
    buyValue: 59.900,
    category: 'Street',
    engineCapacity: 1000,
  },
];

const motoInput: IMoto = {
  model: 'Bis',
  year: 2001,
  color: 'Pink',
  status: true,
  buyValue: 15.999,
  category: 'Street',
  engineCapacity: 600,
};

const motoOutput = {
  id: 1234,
  model: 'Bis',
  year: 2001,
  color: 'Pink',
  status: true,
  buyValue: 15.999,
  category: 'Street',
  engineCapacity: 600,
};

describe('Verifica a rota de motos', function () {
  describe('Deve criar um motos', function () {
    it('com SUCESSOO', async function () {
      sinon.stub(Model, 'create').resolves(motoOutput);

      const service = new MotoService();
      const result = await service.create(motoInput);

      expect(result).to.be.deep.equal(motoOutput);
    });
  });

  it('Deve listar todos as motos', async function () {
    sinon.stub(Model, 'find').resolves(modelOutput);

    const service = new MotoService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(serviceOutput);
  });

  it('Deve listar um carro por id', async function () {
    const model = {
      _id: '634852326b35b59438fbea31',
      model: 'HB20',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    };
    const serviceReturn = {
      id: '634852326b35b59438fbea31',
      model: 'HB20',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    };

    sinon.stub(Model, 'findById').resolves(model);

    const service = new MotoService();
    const result = await service.getById('634852326b35b59438fbea31');

    expect(result).to.be.deep.equal(serviceReturn);
  });
  it('com id inexistente', async function () {  
    sinon.stub(Model, 'findById').resolves([]);

    const service = new MotoService();
    const result = await service.getById('12345634852326b35b59438f');

    expect(result?.id).to.be.deep.equal(undefined);
  });

  it('Deve atualizar uma moto', async function () {
    const input = {
      model: 'Motocross',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    };

    sinon.stub(Model, 'updateOne').resolves();

    const service = new MotoService();
    const result = await service.update('634852326b35b59438fbea31', input);

    expect(result).to.be.deep.equal(null);
  });

  afterEach(function () {
    sinon.restore();
  });
});