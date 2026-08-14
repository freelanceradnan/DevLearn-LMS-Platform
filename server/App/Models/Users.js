import mongoose, { version } from "mongoose";

const userSchema=mongoose.Schema({
    name:{type:String,required:[true,"Please enter a name"]},
    email:{type:String,unique:true,required:[true,"Please enter a email"]},
    password:{type:String,minlength:[6,"please enter password long 6 digit"]},
    avatar:{
        public_id:String,
        url:String
    },
    role:{type:String,default:'user'},
    Courses:[
        {course_id:String}
    ],
    googleId: {
      type: String,
      default: null,
    },
    githubId: {
      type: String,
      default: null,
    },
    isVerified:{type:Boolean,default:false}
},{timestamps:true,versionKey:false})
export const User=mongoose.model('Users',userSchema)