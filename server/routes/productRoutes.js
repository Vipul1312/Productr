import express from "express";
import multer from "multer";
import {
  createProduct, getProducts, getProductById,
  updateProduct, togglePublish, deleteProduct,
} from "../controllers/productController.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/", upload.array("images", 10), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.array("images", 10), updateProduct);
router.patch("/:id/publish", togglePublish);
router.delete("/:id", deleteProduct);

export default router;