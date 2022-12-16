import mongoose from "mongoose";
const { Schema } = mongoose;

const storeSchema = new Schema({
  products: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    unique: true,
  },
});

export const Store = mongoose.model("Store", storeSchema);
