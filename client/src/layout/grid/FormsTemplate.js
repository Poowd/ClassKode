import React from "react";
import { DefaultDropdown } from "../../component/dropdown/default/DefaultDropdown";
import { NoDisplay } from "../../component/placeholder/NoDisplay";
import { DefaultButton } from "../../component/button/DefaultButton";
import { DefaultText } from "../../component/input/DefaultInput";
import { FaFilter } from "react-icons/fa6";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";

export class FormsTemplate extends React.Component {
  render() {
    return (
      <main className="h-100 overflow-y-auto">
        <main className="h-100">
          <main className="row h-100 m-0">
            <section className="col-lg-3 h-100 p-2">
              <main className="h-100 bg-white rounded shadow-sm p-2">
                <NoDisplay />
              </main>
            </section>
            <section className="col-lg-9 p-2 h-100">
              <main className="h-100 position-relative">
                <section className="">{this.props.content}</section>
              </main>
            </section>
          </main>
        </main>
      </main>
    );
  }
}
