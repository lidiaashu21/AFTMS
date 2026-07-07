import dotenv from "dotenv";
import { SignOptions } from "jsonwebtoken";
dotenv.config();

const requiredEnv = ["PORT", "DATABASE_URL", "JWT_SECRET", "JWT_EXPIRES_IN"];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

export const env = {
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
};
