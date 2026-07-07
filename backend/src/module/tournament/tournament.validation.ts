import { z } from "zod";

// helper to validate date
const dateSchema = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: "Invalid date format",
});

// CREATE
export const createTournamentSchema = z.object({
  body: z
    .object({
      name: z.string().min(2),
      location: z.string().min(2),
      fee: z.coerce.number().min(0),
      maxTeams: z.coerce.number().min(2),
      startDate: dateSchema,
      endDate: dateSchema,
    })
    .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
      message: "End date cannot be earlier than start date",
      path: ["endDate"],
    }),
});

// UPDATE
export const updateTournamentSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      location: z.string().optional(),
      fee: z.coerce.number().optional(),
      maxTeams: z.coerce.number().optional(),
      startDate: dateSchema.optional(),
      endDate: dateSchema.optional(),
      isActive: z.boolean().optional(),
    })
    .refine(
      (data) => {
        if (data.startDate && data.endDate) {
          return new Date(data.endDate) >= new Date(data.startDate);
        }
        return true;
      },
      {
        message: "End date cannot be earlier than start date",
        path: ["endDate"],
      },
    ),
});
