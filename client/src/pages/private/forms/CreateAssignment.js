import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useValidation from "../../../../hook/useValidation";
import useValidate from "../../../../hook/useValidate";
import useDatabase from "../../../../hook/useDatabase";

export function CreateAssignment() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const coursecheckbox = document.querySelectorAll(".course-checkbox");
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
    CoachType0: "",
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
    post("sel-coach", coach, setCoach);
    post("sel-crs", course, setCourse);
    post("sel-coach-type", coachtype, setCoachType);
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    console.log(selectedValues);
    console.log(selectedOption);
  }, [selectedValues]);

  const removeItem = (item) => {
    setSelectedValues((prevState) =>
      prevState.filter((prevItem) => {
        return prevItem.id !== item;
      })
    );
  };

  const removeOption = (item) => {
    setSelectedOption((prevState) =>
      prevState.filter((prevItem) => {
        return prevItem.coach !== item;
      })
    );
  };

  return (
    <main>
      {coach.map((item, i) => (
        <section className=" py-2 px-3 my-2 mx-1 shadow-sm rounded">
          <div className="d-flex align-items-center justify-content-between w-100">
            <span className="">
              <span>{item.Gender === "Male" ? "Mr. " : "Ms. "}</span>
              <span>{item.FirstName}</span>
              <span>
                {item.MiddleInitial !== (null || "")
                  ? " " + item.MiddleInitial + ". "
                  : " "}
              </span>
              <span>{item.LastName}</span>
            </span>
            <div className="d-flex align-items-center gap-3">
              <span className="">{item.DPT_Abbreviation}</span>
              <SelectButton
                id={"CoachType" + i}
                label={null}
                width="w-100"
                class="form-select-sm shadow-none"
                trigger={dataChange}
                option={
                  <>
                    <SelectButtonItemSelected
                      content={coachtype.map((option, i) => (
                        <>
                          {option.CoachType === data.CoachType0
                            ? option.CoachType
                            : ""}
                        </>
                      ))}
                    />
                    {coachtype.map((option, i) =>
                      option.CoachType !== data.CoachType0 ? (
                        <SelectButtonItem
                          value={option.CoachType}
                          content={option.CoachType}
                        />
                      ) : null
                    )}
                  </>
                }
              />
            </div>
          </div>
          <hr className="m-2" />
          <div className="overflow-y-auto px-1" style={{ height: "25vh" }}>
            {course.map((crs, j) =>
              crs.DPT_Code === item.DPT_Code ? (
                <div className={"form-check p-0"}>
                  <label
                    className="form-check-label px-5 py-2 w-100 rounded border border-dark-subtle"
                    htmlFor={"sel" + i + "" + j}
                  >
                    {crs.Course}
                    <input
                      className="form-check-input course-checkbox"
                      type="checkbox"
                      id={"sel" + i + "" + j}
                      onChange={(e) => {
                        {
                          if (e.target.checked) {
                            setSelectedValues((prev) => [
                              ...prev,
                              {
                                id: "sel" + i + "" + j,
                                coach: item.LastName,
                                course: crs.CRS_Code,
                              },
                            ]);
                          } else {
                            removeItem("sel" + i + "" + j);
                          }
                        }
                      }}
                    />
                  </label>
                </div>
              ) : // <label
              //   htmlFor={"crs" + i + j}
              //   className="d-flex gap-2 py-2 px-3 shadow-sm mb-2"
              // >
              //   <div className="d-flex gap-2">
              //     <input type="checkbox" id={"crs" + i + j}></input>
              //     <span className="d-block">{crs.Course}</span>
              //   </div>
              //   <div>
              //     <span className="d-block">( {crs.PRG_Code} )</span>
              //   </div>
              // </label>
              null
            )}
          </div>
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
