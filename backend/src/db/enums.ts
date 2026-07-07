import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["ADMIN", "TEAM_MANAGER"]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

export const matchStatusEnum = pgEnum("match_status", [
  "UPCOMING",
  "ONGOING",
  "COMPLETED",
]);
