import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true  })

const City = mongoose.model('City', CitySchema)

export { City }

