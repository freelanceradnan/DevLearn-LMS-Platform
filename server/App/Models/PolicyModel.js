import mongoose, { Schema, Types } from "mongoose";


const PolicyItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
}); 


const PolicySectionSchema = new mongoose.Schema({
  policySection: [PolicyItemSchema],
},{
  versionKey:false,
  timestamps: true
});

const Policy=mongoose.model('Policy',PolicySectionSchema)
export default Policy