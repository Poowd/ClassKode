import React, { useState } from "react";
import useSheetImport from "../../hook/useSheetImport";

export default function FileInput() {
  const [data, handleFileUpload] = useSheetImport();
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {data && (
        <div>
          <h2>Imported Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <main>
            {data.map((item, i) => (
              <section>
                <h1>{item.SchoolID}</h1>
                <h2>{`${item.Firstname} ${item.Lastname}`}</h2>
                <h3>{item.Email}</h3>
                <h4>{item.Type}</h4>
              </section>
            ))}
          </main>
        </div>
      )}
    </div>
  );
}
