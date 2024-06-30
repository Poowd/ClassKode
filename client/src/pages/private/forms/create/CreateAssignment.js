import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { DefaultInput } from "../../../../component/input/DefaultInput";

export function CreateAssignment() {
  const navigate = useNavigate();
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

  const [coach, setCoach] = useState([]);
  const [course, setCourse] = useState([]);
  const [coachtype, setCoachType] = useState([]);
  const [data, setData] = useState({
    CoachType: "Fulltime",
  });

  const [dataChange] = useHandleChange(setData);
  const [
    ValidateCoach,
    ValidateDepartment,
    ValidateProgram,
    ValidateCourse,
    ValidateRoom,
    ValidateCurriculum,
    ValidateAcademicYear,
  ] = useValidate();

  useEffect(() => {
    post("coach", coach, setCoach);
    post("course", course, setCourse);
    post("coachtype", coachtype, setCoachType);
  }, []);

  return (
    <main>
      {coach.map((item, i) => (
        <section className=" py-2 px-5 border my-2 mx-0">
          <div className="d-flex align-items-center justify-content-between w-100">
            <span className="">{item.FirstName}</span>
            <div className="d-flex align-items-center gap-3">
              <span className="">{item.DPT_Abbreviation}</span>
            </div>
          </div>
          <hr className="mb-2" />
          <SelectButton
            id={"CoachType " + i}
            label={null}
            width="w-100 mb-3"
            class="form-select-sm shadow-none"
            trigger={dataChange}
            option={
              <>
                <SelectButtonItemSelected
                  content={coachtype.map((option, i) => (
                    <>
                      {option.CoachType === data.CoachType
                        ? option.CoachType
                        : ""}
                    </>
                  ))}
                />
                {coachtype.map((option, i) =>
                  option.CoachType !== data.CoachType ? (
                    <SelectButtonItem
                      value={option.CoachType}
                      content={option.CoachType}
                    />
                  ) : null
                )}
              </>
            }
          />
          {course.map((crs, j) =>
            crs.DPT_Code === item.DPT_Code ? (
              <label
                htmlFor={"crs" + i + j}
                className="d-flex gap-2 p-2 shadow-sm mb-2"
              >
                <input type="checkbox" id={"crs" + i + j}></input>
                <span className="d-block">{crs.Course}</span>
              </label>
            ) : null
          )}
        </section>
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
