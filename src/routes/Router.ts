import express, { Router } from 'express';
import { SupplierController } from '../controllers/SupplierController';
import path from 'path';
import multer from 'multer';

const router = Router();
const supplierController = new SupplierController();

const coveragePath = path.resolve(__dirname, '../../coverage/lcov-report');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/suppliers', supplierController.getAllSuppliers);
router.get('/suppliers/:id', supplierController.getSupplierById);
router.post('/suppliers', upload.single('image'), supplierController.createSupplier);
router.put('/suppliers/:id', supplierController.updateSupplier);
router.delete('/suppliers/:id', supplierController.deleteSupplier);

router.use('/test-coverage', express.static(coveragePath));
router.get('/test-coverage', (req, res) => {
  res.sendFile(path.join(coveragePath, 'index.html'));
});

export default router;