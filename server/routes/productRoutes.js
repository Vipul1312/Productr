import express from "express";
import multer from "multer";
import path from "path";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  togglePublish,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.array("images", 10), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.array("images", 10), updateProduct);
router.patch("/:id/publish", togglePublish);
router.delete("/:id", deleteProduct);

export default router;
