import {
  createAnnouncementInDB,
  getAnnouncementsFromDB,
  deleteAnnouncementInDB,
} from "./announcement.repository";

import { CreateAnnouncementInput } from "./announcement.types";

export const createAnnouncementService = async (
  data: CreateAnnouncementInput,
) => {
  return await createAnnouncementInDB(data);
};

export const getAnnouncementsService = async () => {
  return await getAnnouncementsFromDB();
};

export const deleteAnnouncementService = async (id: string) => {
  return await deleteAnnouncementInDB(id);
};
