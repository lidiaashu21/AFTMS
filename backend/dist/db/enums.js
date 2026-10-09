"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchStatusEnum = exports.paymentStatusEnum = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["ADMIN", "TEAM_MANAGER"]);
exports.paymentStatusEnum = (0, pg_core_1.pgEnum)("payment_status", [
    "PENDING",
    "APPROVED",
    "REJECTED",
]);
exports.matchStatusEnum = (0, pg_core_1.pgEnum)("match_status", [
    "UPCOMING",
    "ONGOING",
    "COMPLETED",
]);
