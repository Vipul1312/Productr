import Product from "../models/Product.js";

export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      type,
      quantityStock,
      mrp,
      sellingPrice,
      brandName,
      exchangeEligibility,
      images,
      userEmail,
    } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Please enter product name" });
    }

    const product = await Product.create({
      name,
      type,
      quantityStock,
      mrp,
      sellingPrice,
      brandName,
      exchangeEligibility,
      images: images || [],
      userEmail,
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
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const updateData = { ...req.body };

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: "Product updated Successfully", product: updated });
  } catch (error) {
    next(error);
  }
};

export const togglePublish = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

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
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};