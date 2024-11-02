import React from "react";
import "./Loader.css";

export class CoffeeLoader extends React.Component {
  render() {
    return (
      // slide-out-bck-center
      <main
        className="d-flex justify-content-center align-items-center flex-column "
        style={{ width: "100%", height: "100vh" }}
      >
        <div class="d-flex align-items-center gap-3">
          <div class="spinner-border ms-auto" aria-hidden="true"></div>
          <strong role="status">Loading...</strong>
        </div>
      </main>
    );
  }
}
