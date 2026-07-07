import { getMatchesFromDB, updateMatchInDB } from "./match.repository";

import { UpdateMatchInput } from "./match.validation";

/* =========================
   GET ALL MATCHES
========================= */

export const getMatchesService = async () => {
  return await getMatchesFromDB();
};

/* =========================
   UPDATE MATCH
========================= */

export const updateMatchService = async (
  id: string,

  data: UpdateMatchInput,
) => {
  if (!id) {
    throw new Error("Match ID is required");
  }

  return await updateMatchInDB(id, data);
};
