import dotenv from "dotenv";
import path from 'path'
dotenv.config({path:path.resolve(process.cwd(),'../../../server/.env')});

import { User } from "../Models/Users.js";
import ejs from "ejs";
import jwt from "jsonwebtoken";

import { fileURLToPath } from "url";
import sendMail from "../Utils/EmailSent.js";
import bcrypt from "bcryptjs";
import { SendToken } from "../Utils/Jwt_auth.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { OAuth2Client } from 'google-auth-library';
export async function MyRegister(name, email, password) {
  const normalizedEmail = email.toLowerCase();

  const isExists = await User.findOne({ email: normalizedEmail });
  if (isExists) {
    throw new Error("User already exists!");
  }

  const user = { name, email, password };
  const ActivationFunc = createActivation(user);
  const ActiveCode = ActivationFunc.activationCode;

  const data = {
    user: { name: user.name },
    ActiveCode,
  };

  // Render HTML template using EJS
  const html = await ejs.renderFile(
    path.join(__dirname, "../Utils/Activation-Mail.ejs"),
    data,
  );

  try {
    const mailInfo = await sendMail({
      email: user.email,
      subject: "Activate your account",
      html,
    });

    if (mailInfo) {
      return {
        success: true,
        message: `Please check your email (${user.email}) for activation code!`,
        activationToken: ActivationFunc.token,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to send email",
    };
  }
}

export const createActivation = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000);
  const token = jwt.sign(
    { user, activationCode },
    process.env.Activation_Secret,
    {
      expiresIn: "5m",
    },
  );
  return { activationCode, token };
};

export async function ActiveMyUser(activation_code, activation_token) {
  const newUser = await jwt.verify(
    activation_token,
    process.env.Activation_Secret,
  );

  if (String(newUser.activationCode) !== String(activation_code)) {
    throw new Error("Activation code is wrong!");
  }
  const { name, email, password } = newUser.user;
  const normalizedEmail = email.toLowerCase();
  const isExisting = await User.findOne({ email: normalizedEmail });
  if (isExisting) {
    throw new Error("User already exists!");
  }
  const passHash = await bcrypt.hash(password, 10);
  const newUserCreate = await User.create({
    name,
    email,
    password: passHash,
  });
  return { success: true };
}

export async function MyLogin(email, password, res) {
  const normalizedEmail = email.toLowerCase();
  const isExistingUser = await User.findOne({ email: normalizedEmail }).select(
    "+password",
  );
  if (!isExistingUser) {
    throw new Error("User not found!");
  }
  const isMatch = await bcrypt.compare(password, isExistingUser.password);
  if (!isMatch) {
    throw new Error("user and pass not match!");
  }
  const userObject = isExistingUser.toObject();
  delete userObject.password;

  const result = SendToken(userObject, 200, res);
  return { success: true, user: userObject, AccessToken: result.AccessToken };
}
export async function socialMyAuth(credential,res) {
  const clientId=process.env.GOOGLE_CLIENT
  const client = new OAuth2Client(clientId);
  const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });
  const userInfo=ticket.payload
  const user = await User.findOne({ email: userInfo.email });
  if (!user) {
   const newUser= await User.create({ email: userInfo.email, name:userInfo.name, avatar:userInfo.picture });
    return SendToken(newUser, 200, res);
 
  } else {
    return SendToken(user, 200, res);
  }
  return { success: true,user:SendToken.user};
}
