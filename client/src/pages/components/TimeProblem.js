import React, { useEffect, useState } from "react";

export function TimeProblem() {
  const [x, setX] = useState({
    A: {
      ST: 500,
      ET: 600,
    },
    B: {
      ST: 600,
      ET: 700,
    },
  });

  // Example usage
  console.log(checkForConflicts(x.A, x.B)); // Should return true because they overlap

  return (
    <main className="px-5">
      <main></main>
    </main>
  );
}

function checkForConflicts(scheduleA, scheduleB) {
  // Convert start and end times to minutes past midnight
  const convertToMinutes = (time) => {
    return time * 60;
  };

  // Extract start and end times for comparison
  const startTimeA = convertToMinutes(scheduleA.ST);
  const endTimeA = convertToMinutes(scheduleA.ET);
  const startTimeB = convertToMinutes(scheduleB.ST);
  const endTimeB = convertToMinutes(scheduleB.ET);

  // Check for conflicts
  if (
    (startTimeA < endTimeB && startTimeB < endTimeA) ||
    (startTimeA > endTimeB && startTimeB > endTimeA) ||
    (startTimeA === startTimeB && endTimeA === endTimeB)
  ) {
    return true; // Overlap exists
  }

  return false; // No overlap
}
