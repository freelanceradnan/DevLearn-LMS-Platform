import dotenv from "dotenv";
dotenv.config({ path: "../../../server/.env" });

import { User } from "../Models/Users.js";
import ejs from "ejs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import sendMail from "../Utils/EmailSent.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    data
  );
console.log(html)
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
    }
  );
  return { activationCode, token };
};