import { useState } from "react";

export function useCoachUnits() {
  function getCoachUnits(coachUnits, maxUnits) {
    return ((coachUnits / maxUnits) * 100).toFixed(2);
  }
  function getCoachUnitsPercentage(coachUnits) {
    return ((coachUnits / (14 * 5)) * 100).toFixed(2);
  }

  return [getCoachUnits];
}
