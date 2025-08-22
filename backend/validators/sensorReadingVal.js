
const sensorReadingValidationSchema = {
  buildingId: {
    in: ["body"],
    isIn: {
      options: [["B1", "B2", "B3"]],
      errorMessage: "Building must be one of B1, B2, or B3",
    },
    notEmpty: {
      errorMessage: "Building ID is required",
    },
  },

  "sensors.Lighting": {
    in: ["body"],
    isFloat: {
      options: { min: 0, max: 50 },
      errorMessage: "Lighting must be between 0 and 50",
    },
  },

  "sensors.HVAC": {
    in: ["body"],
    isFloat: {
      options: { min: 0, max: 100 },
      errorMessage: "HVAC must be between 0 and 100",
    },
  },

  "sensors.Equipment": {
    in: ["body"],
    isFloat: {
      options: { min: 0, max: 80 },
      errorMessage: "Equipment must be between 0 and 80",
    },
  },
};

export default  sensorReadingValidationSchema ;
