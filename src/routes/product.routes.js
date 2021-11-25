////imports
import { Router } from "express";
import * as productController from '../controllers/productsController';
////constants
const router = Router();

router.post('/', productController.createProduct); // now here, depending of the verb http the function is called
router.get('/', productController.getProducts); // go to controllers/products
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProducts);

////export to app.js
export default router;