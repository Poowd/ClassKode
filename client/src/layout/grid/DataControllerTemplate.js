import React from "react";
import { DefaultDropdown } from "../../component/dropdown/default/DefaultDropdown";
import { NoDisplay } from "../../component/placeholder/NoDisplay";
import { DefaultButton } from "../../component/button/DefaultButton";
import { DefaultText } from "../../component/input/DefaultInput";
import { FaFilter } from "react-icons/fa6";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";

export class DataControllerTemplate extends React.Component {
  render() {
    return (
      <main className="h-100">
        <header>
          <h3 className="m-0 p-0">{this.props.title}</h3>
          <p className="m-0 p-0 text-secondary">{this.props.description}</p>
          <hr className="p-0 mx-0 my-2" />
        </header>
        <main className="">
          <div className="d-flex gap-2 my-2">{this.props.control}</div>
          <section className="">
            <main className="row m-0">
              <section className="col-8 p-0">{this.props.content}</section>
              <section className="col-4 p-0">
                <main className="">{this.props.additional}</main>
              </section>
            </main>
          </section>
        </main>
      </main>
    );
  }
}
