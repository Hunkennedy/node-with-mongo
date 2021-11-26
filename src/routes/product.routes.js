////imports
import { Router } from "express";
import * as productController from '../controllers/productsController';
import { authJwt } from '../middlewares';
////constants
const router = Router();
//routes
router.get('/', productController.getProducts); // go to controllers/products
router.get('/:id', productController.getProductById);
router.post('/', [authJwt.verifyToken, authJwt.isModerator], productController.createProduct); // now here, depending of the verb http the function is called
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], productController.updateProduct);
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], productController.deleteProducts);

////export to app.js
export default router;