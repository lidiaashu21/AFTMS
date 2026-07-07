import { getReportsFromDB } from "../report/report.repository";

export const getReportsService = async () => {
  return await getReportsFromDB();
};
