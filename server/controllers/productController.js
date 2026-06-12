import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createProduct = async (req, res, next) => {
  try {
    const {
      name, type, quantityStock, mrp, sellingPrice,
      brandName, exchangeEligibility, userEmail,
    } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Please enter product name" });
    }

    // Upload images to Cloudinary
    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "productr",
        });
        images.push(result.secure_url);
      }
    }

    const product = await Product.create({
      name, type, quantityStock, mrp, sellingPrice,
      brandName, exchangeEligibility, images, userEmail,
    });

    res.status(201).json({ success: true, message: "Product added Successfully", product });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { status, userEmail } = req.query;
    let filter = {};
    if (userEmail) filter.userEmail = userEmail;
    if (status === "published") filter.isPublished = true;
    if (status === "unpublished") filter.isPublished = false;
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      let images = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "productr",
        });
        images.push(result.secure_url);
      }
      updateData.images = images;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true, runValidators: true,
    });

    res.status(200).json({ success: true, message: "Product updated Successfully", product: updated });
  } catch (error) {
    next(error);
  }
};

export const togglePublish = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    product.isPublished = !product.isPublished;
    await product.save();
    res.status(200).json({
      success: true,
      message: product.isPublished ? "Product Published" : "Product Unpublished",
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};