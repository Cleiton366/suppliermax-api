import { PrismaClient } from '@prisma/client';
import { Supplier } from '../interfaces/Supplier';
import { MongoClient } from "../mongoDB/MongooseClient";
import { SupplierDTO } from '../interfaces/SupplierDTO';

const prisma = new PrismaClient();
const mongoClient = MongoClient.getInstance();
const uploadScheme = mongoClient.uploadScheme();

export default class SupplierRepository {
  async getAllSuppliers(): Promise<Supplier[]> {
    return await prisma.supplier.findMany();
  }

  async getSupplierById(id: string): Promise<any | null> {
    const img = await uploadScheme.findOne({ fileName: id });
    const data = await prisma.supplier.findUnique({ where: { id } }) || null;
    const supplier = data ? {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      isActive: data.isActive,
      image: img
    } : null;

    return supplier;
  }

  async createSupplier(data: Supplier, file: any): Promise<SupplierDTO> {
    const supplier = await prisma.supplier.create({ data });
    const image = {
      file: {
        buffer: file.buffer,
        mimetype: file.mimetype,
      },
      fileName: supplier.id,
    };
    const upload = new uploadScheme(image);
    const result = await upload.save();

    const supplierDTO = {
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      isActive: supplier.isActive,
      image: image
    };

    return supplierDTO;
  }

  async updateSupplier(id: string, data: Supplier): Promise<Supplier> {
    return await prisma.supplier.update({ where: { id }, data });
  }

  async deleteSupplier(id: string): Promise<void> {
    await prisma.supplier.delete({ where: { id } });
    await uploadScheme.deleteOne({ fileName: id });
  }
};