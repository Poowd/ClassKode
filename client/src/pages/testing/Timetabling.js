import React, { useRef, useState } from "react";
import { createFileName, useScreenshot } from "use-react-screenshot";

export function Timetabling() {
  const ref = useRef(null);
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpg",
    quality: 1.0,
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const getImage = () => {
    takeScreenshot(ref.current).then(download);
  };
  return (
    <main className="p-2 h-100 w-100">
      <div>
        <div>
          <button style={{ marginBottom: "10px" }} onClick={getImage}>
            Take screenshot
          </button>
        </div>
        <img src={image} alt={"Screenshot"} />
        <div ref={ref}>
          <h1>use-react-screenshot</h1>
          <p>
            <strong>hook by @vre2h which allows to create screenshots</strong>
          </p>
        </div>
      </div>
    </main>
  );
}
