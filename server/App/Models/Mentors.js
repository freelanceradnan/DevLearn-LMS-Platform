import mongoose, { Schema } from "mongoose";

const mentorSchema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Mentor name is required'], 
      trim: true 
    },
    avatar: {
      url: { type: String, trim: true },
      public_id: { type: String, trim: true }
    },
    description: { 
      type: String, 
      required: [true, 'Description is required'] 
    },
    category: { 
      type: String, 
      required: [true, 'category is required'] 
    }
    ,
    students: { 
      type: Number, 
      default: 0, 
      min: [0, 'Students count cannot be negative'] 
    },
    courses: { 
      type: Number, 
      default: 0, 
      min: [0, 'Courses count cannot be negative'] 
    },
    socialLinks: {
      fb: { type: String, trim: true, default: '' },
      github: { type: String, trim: true, default: '' },
      linkedin: { type: String, trim: true, default: '' }
    }
  },
  { 
    timestamps: true,
    versionKey:false
  }
);
export const Mentors = mongoose.model('Mentor', mentorSchema);