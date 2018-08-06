import mongoose from 'mongoose'
const Schema = mongoose.Schema

let addressSchema = new Schema({
    address: { type: String, required: true, unique: true },
    formattedAddress: String,
    city:mongoose.Schema.Types.Mixed,
    state: mongoose.Schema.Types.Mixed,
    postalCode: mongoose.Schema.Types.Mixed,
    geo: mongoose.Schema.Types.Mixed,
    placeId: String,
    date: { type: Date, default: Date.now },
});

export default mongoose.model('Address', addressSchema)