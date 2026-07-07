import db from "../../config/drizzle";
import { announcements } from "../../db/schema/announcement";
import { eq, desc } from "drizzle-orm";
import { CreateAnnouncementInput } from "./announcement.types";

export const createAnnouncementInDB = async (data: CreateAnnouncementInput) => {
  const result = await db.insert(announcements).values(data).returning();

  return result[0];
};

export const getAnnouncementsFromDB = async () => {
  return await db
    .select()
    .from(announcements)
    .orderBy(desc(announcements.createdAt));
};

export const deleteAnnouncementInDB = async (id: string) => {
  const result = await db
    .delete(announcements)
    .where(eq(announcements.id, id))
    .returning();

  return result[0];
};
