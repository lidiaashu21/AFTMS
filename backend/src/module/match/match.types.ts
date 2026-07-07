export interface UpdateMatchInput {
  homeScore: number;
  awayScore: number;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
}
