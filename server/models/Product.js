import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Foods", "Electronics", "Clothes", "Beauty Products", "Others"],
      required: true,
    },
    quantityStock: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String,
      },
    ],
    exchangeEligibility: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);