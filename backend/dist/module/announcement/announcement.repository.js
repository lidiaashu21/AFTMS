"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncementInDB = exports.getAnnouncementsFromDB = exports.createAnnouncementInDB = void 0;
const prisma_1 = require("../../config/prisma");
const createAnnouncementInDB = async (data) => {
    return await prisma_1.prisma.announcement.create({
        data,
    });
};
exports.createAnnouncementInDB = createAnnouncementInDB;
const getAnnouncementsFromDB = async () => {
    return await prisma_1.prisma.announcement.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getAnnouncementsFromDB = getAnnouncementsFromDB;
const deleteAnnouncementInDB = async (id) => {
    return await prisma_1.prisma.announcement.delete({
        where: {
            id,
        },
    });
};
exports.deleteAnnouncementInDB = deleteAnnouncementInDB;
