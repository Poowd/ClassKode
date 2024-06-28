import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { GrView } from "react-icons/gr";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { RadioGroup } from "../../../../component/radiogroup/RadioGroup";
import { RadioButton } from "../../../../component/radiogroup/RadioButton";
import { MultipleFormInput } from "../../../../component/input/MultipleFormInput";
import { MultipleFormInputItem } from "../../../../component/input/MultipleFormInputItem";
import usePost from "../../../../hook/usePost";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import useValidate from "../../../../hook/useValidate";
import useDatabase from "../../../../hook/useDatabase";
import useGetSection from "../../../../hook/useGetSection";
import axios from "axios";
import { ListCard } from "../../../../component/card/ListCard";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { DefaultInput } from "../../../../component/input/DefaultInput";

export function GenerateSchedule() {
  const navigate = useNavigate();
  return (
    <main>
      <main className="h-100 position-relative overflow-y-auto px-1">
        <section className="sticky-top w-100 bg-white rounded shadow-sm p-2 mb-2">
          <div className="d-flex justify-content-end gap-2">
            <div className="w-100 d-flex justify-content-between">
              <div className="d-flex gap-2 ">
                <DefaultButton
                  class="btn-outline-primary px-2"
                  icon={<PiGearSixFill />}
                  text="Back"
                />
                <DefaultButton
                  class="btn-outline-primary px-2"
                  icon={<PiGearSixFill />}
                  text="Details"
                />
                <DefaultButton
                  class="btn-outline-primary px-2"
                  icon={<PiGearSixFill />}
                  text="Generate"
                />
                <DefaultButton
                  class="btn-outline-primary px-2"
                  icon={<PiGearSixFill />}
                  text="Save"
                />
              </div>
              <div className="d-flex gap-2 ">
                <DefaultButton
                  class="btn-outline-primary px-2"
                  icon={<PiGearSixFill />}
                  text="Filter"
                />
              </div>
            </div>
          </div>
        </section>
        <section>
          <ListCard
            slot1={"Section"}
            slot2={"Code - Course "}
            slot3={"Room ( Population / Capacity ) - Day - Time"}
            slot4={"Coach"}
            slot5={"Component"}
            link={null}
            state={""}
          />
        </section>
      </main>
    </main>
  );
}
