"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncementInDB = exports.getAnnouncementsFromDB = exports.createAnnouncementInDB = void 0;
const drizzle_1 = __importDefault(require("../../config/drizzle"));
const announcement_1 = require("../../db/schema/announcement");
const drizzle_orm_1 = require("drizzle-orm");
const createAnnouncementInDB = async (data) => {
    const result = await drizzle_1.default.insert(announcement_1.announcements).values(data).returning();
    return result[0];
};
exports.createAnnouncementInDB = createAnnouncementInDB;
const getAnnouncementsFromDB = async () => {
    return await drizzle_1.default
        .select()
        .from(announcement_1.announcements)
        .orderBy((0, drizzle_orm_1.desc)(announcement_1.announcements.createdAt));
};
exports.getAnnouncementsFromDB = getAnnouncementsFromDB;
const deleteAnnouncementInDB = async (id) => {
    const result = await drizzle_1.default
        .delete(announcement_1.announcements)
        .where((0, drizzle_orm_1.eq)(announcement_1.announcements.id, id))
        .returning();
    return result[0];
};
exports.deleteAnnouncementInDB = deleteAnnouncementInDB;
