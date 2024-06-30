import React, { useEffect, useState } from "react";
import useDatabase from "../../../../hook/useDatabase";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import useHandleChange from "../../../../hook/useHandleChange";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { FileMaintainanceTemplate } from "../../../../layout/grid/FileMaintainanceTemplate";
import { GrView } from "react-icons/gr";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import { LinkButton } from "../../../../component/button/LinkButton";
import { ListCard } from "../../../../component/card/ListCard";
import { PassiveModal } from "../../../../component/modal/PassiveModal";
import useModal from "../../../../hook/useModal";

export function CurriculumSelector() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [get, post] = useDatabase();
  const [modalcontent, showModal, hideModal, getModal] = useModal();

  const [data, setData] = useState({
    Curriculum: "",
    Department: "",
    Program: "",
  });
  const [department, setDepartment] = useState([]);
  const [program, setProgram] = useState([]);
  const [currentcrr, setCurrentCRR] = useState([]);

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("department", department, setDepartment);
    post("program", program, setProgram);
    post("curriculum-current", currentcrr, setCurrentCRR);
  }, []);

  useEffect(() => {
    setData((prev) => ({ ...prev, Program: "" }));
  }, [data.Department]);

  useEffect(() => {
    currentcrr.map((crr, i) =>
      setData((prev) => ({ ...prev, Curriculum: crr }))
    );
  }, [currentcrr]);

  return (
    <>
      <SelectButton
        id="Department"
        label="Department"
        width="w-100"
        class="form-select-sm"
        trigger={dataChange}
        option={
          <>
            <SelectButtonItemSelected
              content={department.map((option, i) => (
                <>
                  {option.DPT_Code === data.Department ? option.Department : ""}
                </>
              ))}
            />
            {department.map((option, i) =>
              option.DPT_Code !== data.Department ? (
                <SelectButtonItem
                  value={option.DPT_Code}
                  content={option.Department}
                />
              ) : null
            )}
          </>
        }
      />
      <SelectButton
        id="Program"
        label="Program"
        width="w-100"
        class="form-select-sm"
        trigger={dataChange}
        option={
          <>
            <SelectButtonItemSelected
              content={program.map((option, i) => (
                <>{option.PRG_Code === data.Program ? option.Program : ""}</>
              ))}
            />
            {program.map((option, i) =>
              option.DPT_Code === data.Department &&
              option.PRG_Code !== data.Program ? (
                <SelectButtonItem
                  value={option.PRG_Code}
                  content={option.Program}
                />
              ) : null
            )}
          </>
        }
      />
    </>
  );
}
