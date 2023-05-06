const { Schema, model } = require("mongoose");

const adsSchema = new Schema({
    primaryText: String,
    headline: String,
    description: String,
    CTA: String,
    imageUrl: String,
    company: String,
    url: String
})

const adsModel = model("ads", adsSchema);

module.exports = adsModel;