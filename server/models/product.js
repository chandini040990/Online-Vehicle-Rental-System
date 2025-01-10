import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 150,
    },
    slug: {
        type: String,
        lowercase: true,
    },

    brand: {
        type: String,
        required: true,
        maxLength: 50,
    },

    plateNumber: {
        type: String,
        required: true,
        maxLength: 10
    },

    owner: {},

    ownerName: {
        type: String,
        required: true,
        maxLength: 50,
    },

    ownerEmail: {
        type: String,
        required: true,
        maxLength: 50,
    },

    engine: {
        type: String,
        default: "Petrol",
        enum: [
            "Petrol",
            "Diesal"
        ],
    },

    transmission: {
        type: String,
        default: "Manual",
        enum: [
            "Manual",
            "Automatic"
        ],
    },

    description: {
        type: String,
        required: true,
        maxLength: 150,
    },

    price: {
        type: Number,
        trim: true,
        required: true
    },

    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },

    quantity: {
        type: Number,
        default: 1,
    },

    booked: {
        type: Number,
        default: 0,
    },

    photo: {
        data: Buffer,
        contenType: String
    },

    booking_from: {
        required: false,
        type: Date
    },

    booking_to: {
        required: false,
        type: Date
    },

    from_location: {
        required: false,
        type: String
    },

    to_location: {
        required: false,
        type: String
    },

}, { timestamps: true }
);

export default mongoose.model("Product", productSchema)