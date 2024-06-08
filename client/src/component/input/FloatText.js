import React from "react";

export class FloatText extends React.Component {
  render() {
    return (
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control form-sm-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Email address</label>
      </div>
    );
  }
}
