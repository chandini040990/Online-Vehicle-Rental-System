import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 150,
    },

    ratings: {
        required: false,
        type: Number
    },

    reviews: {
        required: false,
        type: String
    }
}, { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema)