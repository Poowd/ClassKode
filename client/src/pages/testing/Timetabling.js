import React, { useRef, useState } from "react";
import { createFileName, useScreenshot } from "use-react-screenshot";

export function Timetabling() {
  return (
    <main className="p-2 h-100 w-100">
      <section className="primary-gradient w-100 p-2">
        <section>
          <h3 className="user-text m-0 fw-bold">Class Kode</h3>
          <h3 className="admin-text m-0 fw-bold">Class Kode</h3>
          <h3 className="manager-text m-0 fw-bold">Class Kode</h3>
          <h3 className="gold-text m-0 fw-bold">Class Kode</h3>
          <h3 className="m-0 fw-bold">Class Kode</h3>
        </section>
      </section>
      <section className="d-flex gap-2 p-2">
        <main
          className="primary-gradient ratio ratio-1x1"
          style={{ width: "10em" }}
        ></main>
        <main
          className="primary-gradient ratio ratio-1x1"
          style={{ width: "10em" }}
        ></main>
      </section>
      <section className="d-flex gap-2">
        <button className="btn primary-gradient"> asd</button>
        <button className="btn primary-outline-gradient"> asd</button>
        <button className="btn danger-color">asda</button>
        <button className="btn safe-color">asda</button>
        <button className="btn warning-color">asda</button>
      </section>
    </main>
  );
}
