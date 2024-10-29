import { useState } from "react";

export function useRoomUsage() {
  function getRoomUsage(roomUsage) {
    return ((roomUsage / 14) * 100).toFixed(2);
  }
  function getRoomUsageWeek(roomUsage) {
    return ((roomUsage / (14 * 5)) * 100).toFixed(2);
  }

  return [getRoomUsage, getRoomUsageWeek];
}
