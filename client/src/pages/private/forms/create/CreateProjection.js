import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormInput } from "../../../../component/input/FormInput";
import { GrView } from "react-icons/gr";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { RadioGroup } from "../../../../component/radiogroup/RadioGroup";
import { RadioButton } from "../../../../component/radiogroup/RadioButton";
import { MultipleFormInput } from "../../../../component/input/MultipleFormInput";
import { MultipleFormInputItem } from "../../../../component/input/MultipleFormInputItem";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import useValidate from "../../../../hook/useValidate";
import useDatabase from "../../../../hook/useDatabase";
import { DefaultInput } from "../../../../component/input/DefaultInput";

export function CreateProjection() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [get, post] = useDatabase();
  const [
    Base,
    ValidateID,
    ValidateName,
    ValidateEmail,
    ValidatePhone,
    ValidateLink,
    ValidateCode,
    ValidateEmpty,
    ValidateCodeID,
    ValidateTitle,
  ] = useValidation();

  const [yearlevel, setYearLevel] = useState([]);
  const [program, setProgram] = useState([]);
  const [section, setSection] = useState([]);
  const [semester, setSemester] = useState([]);
  const [data, setData] = useState({
    ACY_Code: state.academicyear.ACY_Code,
  });
  const [selectedValues, setSelectedValues] = useState([]);

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    post("program", program, setProgram);
    post("section", section, setSection);
    post("yearlevel", yearlevel, setYearLevel);
    post("semester", semester, setSemester);
  }, []);

  useEffect(() => {
    console.log(selectedValues);
  }, [selectedValues, data]);

  const removeItem = (item) => {
    setSelectedValues((prevState) =>
      prevState.filter((prevItem) => {
        return prevItem.Section !== item;
      })
    );
  };

  return (
    <main>
      <header>
        <h3 className="m-0 p-0">Section Projection</h3>
        <p className="m-0 p-0 text-secondary">Setup section projection</p>
        <hr className="p-0 mx-0 my-2" />
      </header>
      <main className="">
        <div className="d-flex gap-2 my-2">
          <DefaultButton
            class="btn-outline-secondary"
            type="button"
            icon={<IoMdArrowRoundBack />}
            function={() => navigate(-1)}
          />
          <DefaultButton
            class="btn-success px-2"
            type="button"
            text="Submit"
            function={() => {
              if (true) {
                selectedValues.map((item, i) => {
                  post("add-new-projection", item, setSelectedValues);
                });
                navigate(-1);
              }
            }}
          />
        </div>
      </main>
      {program.map((prg, i) => (
        <div className="px-3 py-2 my-2 mx-1 rounded shadow-sm">
          <label className="d-flex align-items-center  my-2 mx-0">
            <div className="d-flex align-items-center justify-content-between w-100">
              <span className="">{prg.Program}</span>
              <div className="d-flex align-items-center gap-3">
                <span className="">{prg.AcademicLevel}</span>
              </div>
            </div>
          </label>
          <hr />
          <main>
            {yearlevel.map((yrl, o) =>
              yrl.AcademicLevel === prg.AcademicLevel ? (
                <div className="d-block mb-2">
                  <div>
                    <span className="fw-semibold text-secondary">
                      {yrl.YearLevel}
                    </span>
                  </div>
                  <div>
                    {semester.map((sms, k) => (
                      <>
                        <span className="mb-2 fst-italic text-secondary">
                          {sms.Semester}
                        </span>
                        <div className="mb-3">
                          {section.map((sct, j) =>
                            yrl.YearLevel === sct.YearLevel ? (
                              sms.Semester === sct.Semester ? (
                                sct.PRG_Code === prg.PRG_Code ? (
                                  <label
                                    htmlFor={j}
                                    className="d-flex flex-wrap gap-2 align-items-center justify-content-between py-2 px-5 rounded shadow-sm"
                                  >
                                    <div className="d-flex gap-2">
                                      <span className="fw-semibold">
                                        {sct.Section}
                                      </span>
                                    </div>
                                    <div className="d-flex gap-2 align-items-center">
                                      <form
                                        className="d-flex gap-2 align-items-center"
                                        onSubmit={(e) => {
                                          e.preventDefault();
                                          setSelectedValues((prev) => [
                                            ...prev,
                                            {
                                              id: "SCT" + j,
                                              Section: sct.Section,
                                              Population:
                                                document.getElementById(
                                                  "SCT" + j
                                                ).value,
                                              ACY_Code: data.ACY_Code,
                                            },
                                          ]);
                                        }}
                                      >
                                        <FormInput
                                          label={null}
                                          id={"SCT" + j}
                                          class={"text-end form-control-sm"}
                                          required={false}
                                        />

                                        <DefaultButton
                                          class="btn-outline-success"
                                          type="submit"
                                          icon={<IoMdArrowRoundBack />}
                                        />
                                      </form>

                                      <DefaultButton
                                        class="btn-outline-danger"
                                        type="button"
                                        icon={<IoMdArrowRoundBack />}
                                        function={() => {
                                          removeItem(sct.Section);
                                        }}
                                      />
                                    </div>
                                  </label>
                                ) : null
                              ) : null
                            ) : null
                          )}
                        </div>
                      </>
                    ))}
                    <hr />
                  </div>
                </div>
              ) : null
            )}
          </main>
        </div>
      ))}
    </main>
    // <form
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     if (true) {
    //       post("add-new-room", data, setData);
    //       navigate(-1);
    //     }
    //   }}
    // >
    //   <DataControllerTemplate
    //     title={"Create A Room"}
    //     description={"This module creates a room"}
    //     control={
    //       <>
    //         <DefaultButton
    //           class="btn-outline-secondary"
    //           type="button"
    //           icon={<IoMdArrowRoundBack />}
    //           function={() => navigate(-1)}
    //         />
    //         <DefaultButton
    //           class="btn-success px-2"
    //           type="submit"
    //           text="Submit"
    //         />
    //       </>
    //     }
    //     content={
    //       <>
    //         <SelectButton
    //           label="Building"
    //           id="Building"
    //           trigger={dataChange}
    //           required={true}
    //           option={
    //             <>
    //               <SelectButtonItemSelected
    //                 content={building.map((option, i) => (
    //                   <>
    //                     {option.Building === data.Building
    //                       ? option.Building
    //                       : ""}
    //                   </>
    //                 ))}
    //               />
    //               {building.map((option, i) => (
    //                 <>
    //                   {data.Building !== option.Building ? (
    //                     <SelectButtonItem
    //                       value={option.Building}
    //                       content={option.Building}
    //                     />
    //                   ) : (
    //                     ""
    //                   )}
    //                 </>
    //               ))}
    //             </>
    //           }
    //         />

    //         <SelectButton
    //           label="Floor"
    //           id="Floor"
    //           trigger={dataChange}
    //           required={true}
    //           option={
    //             <>
    //               <SelectButtonItemSelected
    //                 content={floor.map((option, i) => (
    //                   <>{option.Floor === data.Floor ? option.Floor : ""}</>
    //                 ))}
    //               />
    //               {floor.map((option, i) => (
    //                 <>
    //                   {data.Floor !== option.Floor ? (
    //                     <SelectButtonItem
    //                       value={option.Floor}
    //                       content={option.Floor}
    //                     />
    //                   ) : (
    //                     ""
    //                   )}
    //                 </>
    //               ))}
    //             </>
    //           }
    //         />

    //         <SelectButton
    //           label="Facility"
    //           id="Facility"
    //           trigger={dataChange}
    //           required={true}
    //           option={
    //             <>
    //               <SelectButtonItemSelected
    //                 content={facility.map((option, i) => (
    //                   <>
    //                     {option.Facility === data.Facility
    //                       ? option.Facility
    //                       : ""}
    //                   </>
    //                 ))}
    //               />
    //               {facility.map((option, i) => (
    //                 <>
    //                   {data.Facility !== option.Facility ? (
    //                     <SelectButtonItem
    //                       value={option.Facility}
    //                       content={option.Facility}
    //                     />
    //                   ) : (
    //                     ""
    //                   )}
    //                 </>
    //               ))}
    //             </>
    //           }
    //         />

    //         <FormInput
    //           label="Capacity"
    //           id="Capacity"
    //           trigger={dataChange}
    //           value={data.Capacity}
    //           required={true}
    //         />

    //         <FormInput
    //           label="Room"
    //           id="Room"
    //           trigger={dataChange}
    //           value={data.Room}
    //           required={false}
    //         />
    //       </>
    //     }
    //     additional={<></>}
    //   />
    // </form>
  );
}
