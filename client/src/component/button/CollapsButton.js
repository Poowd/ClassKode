import React from "react";

export class CollapseButton extends React.Component {
  render() {
    return (
      <main>
        <button
          className="btn border border-0 w-100 text-start mb-2 p-3"
          data-bs-toggle="collapse"
          data-bs-target={`#${this.props.id}`}
          aria-expanded="false"
        >
          <span className="d-flex justify-content-center align-items-center">
            <span className="fw-semibold text-secondary">
              {this.props.title}
            </span>
          </span>
        </button>
        <div class="row m-0 p-0">
          <div class="col m-0 p-0">
            <div
              class="collapse"
              id={this.props.id}
              data-bs-parent={this.props.parent}
            >
              <div class="card card-body">{this.props.content}</div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
