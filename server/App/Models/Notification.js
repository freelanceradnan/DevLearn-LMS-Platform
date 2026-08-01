import mongoose from "mongoose";
const NoficationSchema = mongoose.Schema({
  title: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  status: { type: String, default: "unread", required: true },
},{timestamps:true});
const Notification = mongoose.model("Notification", NoficationSchema);
export default Notification;
