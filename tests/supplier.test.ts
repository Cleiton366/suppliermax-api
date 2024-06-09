import { app } from "../src/App";
import fs from 'fs';
import supertest from 'supertest';
import { Supplier } from '../src/interfaces/Supplier';
import path from "path";

describe('SupplierController', () => {
  var supplierId: string;

  it('should create a new supplier', async () => {
    const newSupplier = {
      name: 'Test Supplier',
      email: 'test@example.com',
      phone: '1234567890',
      address: '123 Test St',
      urlImage: '',
      id: '0'
    };
    const imagePath = path.resolve(__dirname, 'mock', 'test.jpg');

    const response = await supertest(app)
      .post('/suppliers')
      .field('name', newSupplier.name)
      .field('email', newSupplier.email)
      .field('phone', newSupplier.phone)
      .field('address', newSupplier.address)
      .field('urlImage', '')
      .attach('image', fs.readFileSync(imagePath), 'test.jpg');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.image.fileName).toBe(response.body.id);
    expect(response.body.name).toBe(newSupplier.name);

    supplierId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newSupplier.name);

    supplierId = response.body.id;
  }, 10000);

  it('should get all suppliers', async () => {
    const response = await supertest(app).get('/suppliers');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a supplier by ID', async () => {
    const response = await supertest(app).get('/suppliers/' + supplierId);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Supplier');
  });

  it('should not get a supplier by not existing ID', async () => {
    const response = await supertest(app).get('/suppliers/7a5b54d2-8a59-4df3-985f-0de6da3d84a9');
    expect(response.status).toBe(404);
  });

  it('should update an existing supplier', async () => {
    const updatedSupplier: Supplier = {
      name: 'Updated Supplier',
      email: 'updated@example.com',
      phone: '0987654321',
      address: '456 Updated St',
      isActive: false,
      urlImage: 'https://example.com/updated.jpg',
      id: '0'
    };
    const response = await supertest(app)
      .put('/suppliers/' + supplierId)
      .send(updatedSupplier);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(updatedSupplier.name);
    expect(response.body.email).toBe(updatedSupplier.email);
  });

  it('should delete a supplier', async () => {
    const response = await supertest(app).delete('/suppliers/' + supplierId);
    expect(response.status).toBe(204);
  });
});
