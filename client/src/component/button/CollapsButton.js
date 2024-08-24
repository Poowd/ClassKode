import React from "react";

export class CollapseButton extends React.Component {
  render() {
    return (
      <main className="mb-2">
        <button
          class="btn border w-100 text-start mb-2 p-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${this.props.id}`}
          aria-expanded="false"
        >
          <span className="d-flex justify-content-between align-items-center">
            <span className="fw-semibold text-secondary">
              {this.props.title}
            </span>
            <small>
              <span className="fst-italic text-secondary">
                Click for Details
              </span>
            </small>
          </span>
        </button>
        <div class="row">
          <div class="col">
            <div class="collapse" id={this.props.id}>
              <div class="card card-body">{this.props.content}</div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
