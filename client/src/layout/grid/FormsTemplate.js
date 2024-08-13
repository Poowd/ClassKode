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
          <section className="h-100">{this.props.content}</section>
        </main>
      </main>
    );
  }
}
