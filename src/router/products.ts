import { Router } from "express";
import { ensureAutheticate } from "../middleware/ensureAuthenticate"
import { ListProductController } from "../useCases/Product/listProdcut/ListProductController"
import { DeleteProductController } from "../useCases/Product/deleteProduct/deleteProductController"
import { RegisterProductController } from "../useCases/Product/registerProduct/registerProductController"
import { SelectProductByIdController } from "../useCases/Product/selectProductById/productUserByIdController"
import { UpdateProductNameDataController } from "../useCases/Product/updateProductName/updateProductNameController";

const productsRoutes = Router()

const  listProductController            = new ListProductController()
const  deleteProductController          = new DeleteProductController()
const  registerProductController        = new RegisterProductController()
const  selectProductByIdController      = new SelectProductByIdController()
const  updateProductNameDataController  = new UpdateProductNameDataController()

// Register product
    productsRoutes.post("/register",ensureAutheticate,registerProductController.handle)
//

// List products
    productsRoutes.get("/list",listProductController.handle)
//

// Get product by Id
    productsRoutes.route('/:productId')
    .get(selectProductByIdController.handle)
//

// Update product name
    productsRoutes.route('/updateProductName/:productId')
    .put(ensureAutheticate,updateProductNameDataController.handle)
//

// Update product name
    productsRoutes.route('/delete/:productId')
    .delete(ensureAutheticate,deleteProductController.handle)
//

export {productsRoutes}