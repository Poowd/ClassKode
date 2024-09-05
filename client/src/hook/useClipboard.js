import { useState } from "react";

export function useClipboard() {
  async function CopyClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error(err.name, err.message);
    }
  }
  return [CopyClipboard];
}
