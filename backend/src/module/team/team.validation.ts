import { z } from "zod";

export const createTeamSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Team name is required"),
    coachName: z.string().min(2, "Coach name is required"),
    contactEmail: z.string().email("Valid email is required"),
  }),
});
