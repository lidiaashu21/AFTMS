import api from "./api";

export interface Announcement {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export interface CreateAnnouncementInput {
  title: string;
  message: string;
}

export const getAnnouncements = async (): Promise<Announcement[]> => {
  const res = await api.get("/announcements");
  return res.data;
};

export const createAnnouncement = async (
  data: CreateAnnouncementInput,
): Promise<Announcement> => {
  const res = await api.post("/announcements", data);
  return res.data;
};
