import React from "react";
import { DefaultButton } from "../button/DefaultButton";
import { IoClose } from "react-icons/io5";
import { FaSchoolFlag } from "react-icons/fa6";
import { Link } from "react-router-dom";

export class ProgressBar extends React.Component {
  render() {
    return (
      <div className="progress" role="progressbar">
        <div
          className={`progress-bar bg-${this.props.state}`}
          style={{ width: `${this.props.progress}%` }}
        >
          {this.props.progress}
        </div>
      </div>
    );
  }
}
