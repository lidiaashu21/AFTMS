import { Request, Response } from "express";
import {
  createAnnouncementService,
  getAnnouncementsService,
  deleteAnnouncementService,
} from "./announcement.service";

export const createAnnouncementController = async (
  req: Request,
  res: Response,
) => {
  const data = await createAnnouncementService(req.body);

  return res.status(201).json({
    success: true,
    data,
  });
};

export const getAnnouncementsController = async (
  req: Request,
  res: Response,
) => {
  const data = await getAnnouncementsService();

  return res.status(200).json({
    success: true,
    data,
  });
};

export const deleteAnnouncementController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  await deleteAnnouncementService(id);

  return res.status(200).json({
    success: true,
    message: "Announcement deleted successfully",
  });
};
