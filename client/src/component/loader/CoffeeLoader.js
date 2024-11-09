import React from "react";
import "./Loader.css";

export class CoffeeLoader extends React.Component {
  render() {
    return (
      // slide-out-bck-center
      <main
        className="d-flex justify-content-center mt-5 p-5"
        style={{ width: "100%", height: "100vh" }}
      >
        <div class="bookloader"></div>
      </main>
    );
  }
}
