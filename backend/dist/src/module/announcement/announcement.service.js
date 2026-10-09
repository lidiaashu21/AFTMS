"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncementService = exports.getAnnouncementsService = exports.createAnnouncementService = void 0;
const announcement_repository_1 = require("./announcement.repository");
const createAnnouncementService = async (data) => {
    return await (0, announcement_repository_1.createAnnouncementInDB)(data);
};
exports.createAnnouncementService = createAnnouncementService;
const getAnnouncementsService = async () => {
    return await (0, announcement_repository_1.getAnnouncementsFromDB)();
};
exports.getAnnouncementsService = getAnnouncementsService;
const deleteAnnouncementService = async (id) => {
    return await (0, announcement_repository_1.deleteAnnouncementInDB)(id);
};
exports.deleteAnnouncementService = deleteAnnouncementService;
