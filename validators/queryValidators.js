
import { BUILDINGS } from "../utils/constants.js";

export const listReadingsQuerySchema = {
  buildingId: {
    in: ["query"],
    optional: true,
    isIn: { options: [BUILDINGS], errorMessage: "Invalid buildingId" }
  },
  from: {
    in: ["query"],
    optional: true,
    isISO8601: { errorMessage: "from must be an ISO date (YYYY-MM-DD or ISO datetime)" }
  },
  to: {
    in: ["query"],
    optional: true,
    isISO8601: { errorMessage: "to must be an ISO date (YYYY-MM-DD or ISO datetime)" }
  },
  page: {
    in: ["query"],
    optional: true,
    isInt: { options: { min: 1 }, errorMessage: "page must be >= 1" }
  },
  limit: {
    in: ["query"],
    optional: true,
    isInt: { options: { min: 1, max: 200 }, errorMessage: "limit must be 1..200" }
  }
};

export const dailyByHourParamsSchema ={
  id: {
    in: ["params"],
    isIn: { options: [BUILDINGS], errorMessage: "Invalid building id" }
  }
};

export const dailyByHourQuerySchema = {
  date: {
    in: ["query"],
    optional: true,
    isISO8601: { errorMessage: "date must be YYYY-MM-DD" }
  }
};

export const summaryParamsSchema = {
  id: {
    in: ["params"],
    isIn: { options: [BUILDINGS], errorMessage: "Invalid building id" }
  }
};

export const summaryQuerySchema = {
  days: {
    in: ["query"],
    optional: true,
    isInt: { options: { min: 1, max: 60 }, errorMessage: "days must be 1..60" }
  }
};
