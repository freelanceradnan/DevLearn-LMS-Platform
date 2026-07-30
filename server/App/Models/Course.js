import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },

  rating: { type: Number, default: "0", min: 0, max: 5 },
  comment: { type: String },
});
const linkSchema = new mongoose.Schema({
  title: { type: String },
  url: { type: String },
});
const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    question: { type: String, required: true },
  },
  { timestamps: true }
);

commentSchema.add({
  commentReplies: [commentSchema],
});
const CourseDataSchema =new mongoose.Schema({
  videoUrl: { type: String },
//   videoThumbnail: {
//     public_id: { type: String },
//     url: { type: String },
//   },
  title: { type: String, required: true },
  videoSection: { type: String },
  description: { type: String },
  videoLength: { type: String },
  videoPlayer: { type: String },
  links: [linkSchema],
  suggestion: {type:String},
  questions: [commentSchema],
});
const courseSchema =new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  estimatedPrice: { type: Number },
  thumbnail: {
    public_id: {  type: String },
    url: { type: String },
  },
  tags: { type: String, required: true },
  level: { type: String, required: true },
  demourl: { type: String, required: true },
  benefits: [{ title: { type: String } }],
 prerequisites: [{ title: { type: String } }],
  reviews: [reviewSchema],
  courseData: [CourseDataSchema],
  ratings: { type: Number, default: 0 },
  purchased: { type: Number, default: 0 },
},{timestamps:true});
const course = mongoose.model("course", courseSchema);
export default course