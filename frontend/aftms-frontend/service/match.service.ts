import api from "./api";

/* =====================================================
   TYPES
===================================================== */

export type MatchStatus = "UPCOMING" | "ONGOING" | "COMPLETED";

export interface Match {
  id: string;

  fixtureId: string;

  homeTeamId: string;
  awayTeamId: string;

  homeTeam: string;
  awayTeam: string;

  venue: string;

  matchDate: string;

  status: MatchStatus;

  homeScore: number;
  awayScore: number;

  winner: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface CreateMatchDto {
  fixtureId: string;
  venue: string;
  matchDate: string;
}

export interface UpdateMatchDto {
  venue?: string;
  matchDate?: string;
  status?: MatchStatus;
}

export interface UpdateScoreDto {
  homeScore: number;
  awayScore: number;
}

/* =====================================================
   GET ALL MATCHES
===================================================== */

export const getMatches = async (): Promise<Match[]> => {
  const response = await api.get("/matches");

  return response.data.data;
};

/* =====================================================
   GET MATCH BY ID
===================================================== */

export const getMatchById = async (id: string): Promise<Match> => {
  const response = await api.get(`/matches/${id}`);

  return response.data.data;
};

/* =====================================================
   CREATE MATCH
===================================================== */

export const createMatch = async (data: CreateMatchDto): Promise<Match> => {
  const response = await api.post("/matches", data);

  return response.data.data;
};

/* =====================================================
   UPDATE MATCH
===================================================== */

export const updateMatch = async (
  id: string,
  data: UpdateMatchDto,
): Promise<Match> => {
  const response = await api.patch(`/matches/${id}`, data);

  return response.data.data;
};

/* =====================================================
   UPDATE SCORE
===================================================== */

export const updateMatchScore = async (
  id: string,
  data: UpdateScoreDto,
): Promise<Match> => {
  const response = await api.patch(`/matches/${id}/score`, data);

  return response.data.data;
};

/* =====================================================
   START MATCH
===================================================== */

export const startMatch = async (id: string): Promise<Match> => {
  const response = await api.patch(`/matches/${id}/start`);

  return response.data.data;
};

/* =====================================================
   COMPLETE MATCH
===================================================== */

export const completeMatch = async (id: string): Promise<Match> => {
  const response = await api.patch(`/matches/${id}/complete`);

  return response.data.data;
};

/* =====================================================
   DELETE MATCH
===================================================== */

export const deleteMatch = async (id: string): Promise<void> => {
  await api.delete(`/matches/${id}`);
};
