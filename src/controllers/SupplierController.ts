import { Request, Response } from 'express';
import  SupplierRepository  from '../repositories/SupplierRepository';
import { Supplier } from '../interfaces/Supplier';
import { SupplierDTO } from '../interfaces/SupplierDTO';

const supplierRepository = new SupplierRepository();

export class SupplierController {
  async getAllSuppliers(req: Request, res: Response) {
    try {
      const suppliers = await supplierRepository.getAllSuppliers();
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getSupplierById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const supplier = await supplierRepository.getSupplierById(id);
      if (!supplier) {
        return res.status(404).json({ error: 'Supplier not found' });
      }
      res.json(supplier);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createSupplier(req: Request, res: Response) {
    const { name, email, phone, address, isActive, urlImage } = req.body;
    
    const file = { 
      buffer: req.file ? req.file.buffer : null, 
      mimetype: req.file ? req.file.mimetype : null,
      originalname : req.file ? req.file.originalname : null
    };
    try {
			const data = { 
        name, 
        email, 
        phone, 
        address, 
        isActive, 
        urlImage 
      } as Supplier;
      const newSupplier : SupplierDTO = await supplierRepository.createSupplier(data, file);
      res.status(201).json(newSupplier);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateSupplier(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, phone, address, isActive, urlImage } = req.body;
    try {
			const data = { name, email, phone, address, isActive, urlImage } as Supplier;
      const updatedSupplier = await supplierRepository.updateSupplier(id, data);
      res.status(200).json(updatedSupplier);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteSupplier(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await supplierRepository.deleteSupplier(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}