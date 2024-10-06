import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  "https://pgcztzkowuxixfyiqera.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnY3p0emtvd3V4aXhmeWlxZXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0ODQ0MTUsImV4cCI6MjA0MTA2MDQxNX0.ryLXhP4sBBhO5_JVgQ4YJ9BlpdlD2NQM2mjDRbkc3NY"
);

const CDNURL =
  "https://pgcztzkowuxixfyiqera.supabase.co/storage/v1/object/public/images/";

export function FileInput() {
  const [images, setImages] = useState([]);

  async function getImages() {
    const { data, error } = await supabase.storage.from("images").list("");

    if (data !== null) {
      setImages(data);
    } else {
      console.log(error);
      alert("Error");
    }
  }

  async function uploadFile(e) {
    const imageFile = e.target.files[0];
    console.log("Upload");
    const { error } = await supabase.storage
      .from("images")
      .upload(uuidv4() + ".jpg", imageFile);
    if (error) {
      console.log(error);
      alert("Error");
    }
    getImages();
  }

  return (
    <main className="container py-5">
      <section>
        <h1>Image Feed</h1>
        <main className="w-100 row mb-2 ms-0">
          <section className="col-2 p-0 m-0 ">
            <label htmlFor="what">
              <span className="fw-semibold">Image</span>
            </label>
          </section>
          <section className="col-10 p-0 m-0">
            <input
              type="file"
              className="form-control"
              id="what"
              onChange={(e) => {
                uploadFile(e);
              }}
              accept="image/png, image/jpeg"
            />
          </section>
        </main>
      </section>
      <section>
        {images.map((image, i) => (
          <figure key={i}>
            <img
              src={`${CDNURL}${image.name}`}
              alt="..."
              className="w-25 ratio ratio-1x1"
            ></img>
          </figure>
        ))}
      </section>
    </main>
  );
}
