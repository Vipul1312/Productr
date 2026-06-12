import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  togglePublish,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.patch("/:id/publish", togglePublish);
router.delete("/:id", deleteProduct);

export default router;