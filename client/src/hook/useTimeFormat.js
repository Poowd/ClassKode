import axios from "axios";
import { useState } from "react";

export default function useTimeFormat() {
  function convertMinutes(min) {
    var Hour = Math.floor(min / 60); //convert minutes to hours
    const Minute = min / 60 - Hour; //convert minutes to hours minus the hour to get the remainder
    const Cycle = Hour >= 12 ? "PM" : "AM";
    Hour = Hour % 12 || 12;
    const tempMinute = Minute > 0 ? "30" : "00";
    const Format = Hour + ":" + tempMinute.toString() + " " + Cycle;
    return Format;
  }

  return [convertMinutes];
}
