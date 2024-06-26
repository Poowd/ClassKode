import React from "react";

export class DefaultDropdownItem extends React.Component {
  render() {
    return (
      <li>
        <button className="dropdown-item" onClick={this.props.trigger}>
          {this.props.title}
        </button>
      </li>
    );
  }
}
