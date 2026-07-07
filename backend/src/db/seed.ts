// src/db/seed.ts

import bcrypt from "bcrypt";

import { db } from "./client";
import { users } from "./schema/user";

async function main() {
  const hashed = await bcrypt.hash("admin123", 10);

  await db.insert(users).values({
    name: "Admin",

    email: "admin@email.com",

    password: hashed,

    role: "ADMIN",
  });

  console.log("Admin created");
}

main();
