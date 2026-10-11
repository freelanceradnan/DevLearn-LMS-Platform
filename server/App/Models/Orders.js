import mongoose from "mongoose";
const orderSchema = mongoose.Schema({
  courseId: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  payment_info: { type: Object },
  email:{type:String,required:true},
  price:{type:Number,required:true},
  name:{type:String,required:true}
},{timestamps:true});
const Orders = mongoose.model("Orders", orderSchema);
export default Orders;
