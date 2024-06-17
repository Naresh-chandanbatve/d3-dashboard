import mongoose from "mongoose";

const { Schema } = mongoose;

const dataSchema = new mongoose.Schema({
    end_year: { type: Number, default: "" },
intensity: { type: Number, default: 0 },
sector: { type: String, default: "" },
topic: { type: String, default: "" },
insight: { type: String, default: "" },
url: { type: String, default: "" },
region: { type: String, default: "" },
start_year: { type: Number, default: "" },
impact: { type: Number, default: "" },
added: { type: String, default: "" },
published: { type: String, default: "" },
country: { type: String, default: "" },
relevance: { type: Number, default: 0 },
pestle: { type: String, default: "" },
source: { type: String, default: "" },
title: { type: String, default: "" },
likelihood: { type: Number, default: 0 }
});

export default mongoose.model('data', dataSchema);
