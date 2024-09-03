import { useState } from "react";
import * as XLSX from "xlsx";

export default function useSheetImport(trigger) {
  const [sheets, setSheets] = useState(null);
  const [file, setFile] = useState(null);

  const FileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    try {
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);

        setSheets(sheetData);
        setFile(file.name);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {}
  };

  return [file, sheets, FileUpload];
}
