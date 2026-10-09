"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncementController = exports.getAnnouncementsController = exports.createAnnouncementController = void 0;
const announcement_service_1 = require("./announcement.service");
const createAnnouncementController = async (req, res) => {
    const data = await (0, announcement_service_1.createAnnouncementService)(req.body);
    return res.status(201).json({
        success: true,
        data,
    });
};
exports.createAnnouncementController = createAnnouncementController;
const getAnnouncementsController = async (req, res) => {
    const data = await (0, announcement_service_1.getAnnouncementsService)();
    return res.status(200).json({
        success: true,
        data,
    });
};
exports.getAnnouncementsController = getAnnouncementsController;
const deleteAnnouncementController = async (req, res) => {
    const { id } = req.params;
    await (0, announcement_service_1.deleteAnnouncementService)(id);
    return res.status(200).json({
        success: true,
        message: "Announcement deleted successfully",
    });
};
exports.deleteAnnouncementController = deleteAnnouncementController;
