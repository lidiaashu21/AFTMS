"use strict";
// src/db/seed.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("./client");
const user_1 = require("./schema/user");
async function main() {
    const hashed = await bcrypt_1.default.hash("admin123", 10);
    await client_1.db.insert(user_1.users).values({
        name: "Admin",
        email: "admin@email.com",
        password: hashed,
        role: "ADMIN",
    });
    console.log("Admin created");
}
main();
