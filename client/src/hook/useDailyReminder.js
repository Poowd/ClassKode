import { useState } from "react";

export function useDailyReminder() {
  async function CopyClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error(err.name, err.message);
    }
  }
  return [useDailyReminder];
}
