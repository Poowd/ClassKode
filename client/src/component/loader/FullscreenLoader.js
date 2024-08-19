import React from "react";
import "./Loader.css";
import logo from "../../assets/logo/ClassKode Logo (1).png";

export class FullscreenLoader extends React.Component {
  render() {
    return (
      <main
        className={`d-flex justify-content-center align-items-center gradient-bg-blue flex-column ${this.props.class}`}
        style={{ width: "100%", height: "100vh" }}
      >
        <main className="row m-0 p-0">
          <figure
            className="d-flex justify-content-center m-0 p-0 tada"
            style={{ height: "20em", width: "20em" }}
          >
            <img src={logo} className="w-100 h-100 m-0 p-0"></img>
          </figure>
          <div className="continuous w-100"></div>
        </main>
      </main>
    );
  }
}
