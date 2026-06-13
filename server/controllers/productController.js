import Product from "../models/Product.js";
import fs from "fs";
import FormData from "form-data";
import fetch from "node-fetch";

const uploadToImgBB = async (filePath) => {
  const formData = new FormData();
  formData.append("image", fs.readFileSync(filePath).toString("base64"));
  
  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    { method: "POST", body: formData }
  );
  
  const data = await response.json();
  if (!data.success) throw new Error("ImgBB upload failed");
  return data.data.url;
};

export const createProduct = async (req, res, next) => {
  try {
    const {
      name, type, quantityStock, mrp, sellingPrice,
      brandName, exchangeEligibility, userEmail,
    } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Please enter product name" });
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await uploadToImgBB(file.path);
        images.push(url);
        fs.unlinkSync(file.path);
      }
    }

    const product = await Product.create({
      name, type, quantityStock, mrp, sellingPrice,
      brandName, exchangeEligibility, images, userEmail,
    });

    res.status(201).json({ success: true, message: "Product added Successfully", product });
  } catch (error) {
    console.log("ERROR:", error.message);
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
        const url = await uploadToImgBB(file.path);
        images.push(url);
        fs.unlinkSync(file.path);
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