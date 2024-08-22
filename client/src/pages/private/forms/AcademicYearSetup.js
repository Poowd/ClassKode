import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PassiveModal } from "../../../components/modals/PassiveModal";
import { OneLineInput } from "../../../components/input/OneLineInput";
import { MainButton } from "../../../components/button/MainButton";
import { GeneralModal } from "../../../components/modals/GeneralModal";
import { DropdownButton } from "../../../components/button/DropdownButton";
import { DropdownItem } from "../../../components/button/DropdownItem";
import success from "../../../assets/icon/success.png";
import warning from "../../../assets/icon/warning.png";
import { SelectedAcademicYearLayout } from "../../../layout/SelectedAcademicYearLayout";
import ic_add from "../../../assets/icon/default-icons/add.png";
import ic_archive from "../../../assets/icon/default-icons/archive.png";
import ic_edit from "../../../assets/icon/default-icons/edit.png";
import { ButtonIcons } from "../../../components/images/ButtonIcons";
import { Select } from "../../../modules/components/Select";

export function AcademicYearSetup() {
  const bootstrap = require("bootstrap");
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const coursecheckbox = document.querySelectorAll(".course-checkbox");

  //Data Bank
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedValues1, setSelectedValues1] = useState([]);
  const [selectedValues2, setSelectedValues2] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sections, setSections] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [ayCoaches, setAYCoaches] = useState([]);
  const [ayCoachesCourses, setAYCoachesCourses] = useState([]);
  const [ayProgram, setAYProgram] = useState([]);
  const [ayProgramSection, setAYProgramSection] = useState([]);
  const [tempcourses, setTempCourses] = useState([]);
  const [sectionwcourse, setSectionWCourse] = useState([]);
  const [pageconfig, setPageConfig] = useState({
    lhs_title: "",
    rhs_title: "",
    CCH_Type: ["Fulltime", "Parttime"],
    filterByDepartment: "",
    filterByProgram: "",
  });
  const [current, setCurrent] = useState("none");
  const [modalcontent, setModalContent] = useState({
    Title: "",
    SubTitle: "",
  });
  const [addCoach, setAddCoach] = useState({
    AYID: params.id,
    CCHID: "",
    CCH_Type: "",
    CCH_Units: "",
  });
  const [addSection, setAddSection] = useState({
    AYID: params.id,
    PRGID: "",
    SCTID: "",
    SCT_Population: 0,
  });
  const [addProgram, setAddProgram] = useState({
    AYID: params.id,
    PRGID: "",
  });
  const [addCourse, setAddCourse] = useState({
    AYID: params.id,
    CCHID: "",
    DPTID: "",
  });
  const [updateSCTPopulation, setUpdateSCTPopulation] = useState({
    AYID: params.id,
    PRGID: "",
    SCTID: "",
    SCT_Population: 0,
  });
  const [addSectionCourse, setAddSectionCourse] = useState({
    AYID: params.id,
    PRGID: "",
    SCTID: "",
  });
  const [selectedSectionCourse, setSelectedSectionCourse] = useState({});
  const [search, setSearch] = useState({
    Search: "",
  });

  //Data Request
  useEffect(() => {
    axios.post("http://localhost:8081/display-temp-course").then((res) => {
      try {
        setTempCourses(res.data);
      } catch (err) {
        console.log(err);
      }
    });
  }, [tempcourses]);

  useEffect(() => {
    axios.post("http://localhost:8081/coach-selection").then((res) => {
      try {
        setCoaches(res.data);
      } catch (err) {
        console.log(err);
      }
    });
  }, [coaches]);

  useEffect(() => {
    axios.post("http://localhost:8081/course-2").then((res) => {
      try {
        setCourses(res.data);
      } catch (err) {
        console.log(err);
      }
    });
  }, [courses]);

  useEffect(() => {
    axios.post("http://localhost:8081/department-selection").then((res) => {
      try {
        setDepartments(res.data);
      } catch (err) {
        console.log(err);
      }
    });
  }, [departments]);

  useEffect(() => {
    axios.post("http://localhost:8081/section-selection").then((res) => {
      try {
        setSections(res.data);
      } catch (err) {
        console.log(err);
      }
    });
  }, [sections]);

  useEffect(() => {
    axios.post("http://localhost:8081/program-selection").then((res) => {
      try {
        setPrograms(res.data);
      } catch (err) {
        console.log(err);
      }
    });
  }, [programs]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/display-ay-coach", {
        AYID: params.id,
      })
      .then((res) => {
        try {
          setAYCoaches(res.data);
        } catch (err) {
          console.log(err);
        }
      });
  }, [ayCoaches]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/display-ay-coach-course", {
        AYID: params.id,
      })
      .then((res) => {
        try {
          setAYCoachesCourses(res.data);
        } catch (err) {
          console.log(err);
        }
      });
  }, [ayCoachesCourses]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/display-ay-program", {
        AYID: params.id,
      })
      .then((res) => {
        try {
          setAYProgram(res.data);
        } catch (err) {
          console.log(err);
        }
      });
  }, [ayProgram]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/display-ay-program-section", {
        AYID: params.id,
      })
      .then((res) => {
        try {
          setAYProgramSection(res.data);
        } catch (err) {
          console.log(err);
        }
      });
  }, [ayProgramSection]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/display-section-w-course", {
        AYID: params.id,
        CRRID: state.Curriculum,
      })
      .then((res) => {
        try {
          setSectionWCourse(res.data);
        } catch (err) {
          console.log(err);
        }
      });
  }, [sectionwcourse]);

  //Functionalities
  const callAddCoach = (e) => {
    e.preventDefault();
    setModalContent({
      Title: "Added",
      SubTitle: "Added",
    });
    axios
      .post("http://localhost:8081/set-ay-coach", addCoach)
      .then((res) => {
        try {
          getSuccess().show();
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  };

  const callAddProgram = (e) => {
    e.preventDefault();
    setModalContent({
      Title: "Added",
      SubTitle: "Added",
    });
    axios
      .post("http://localhost:8081/set-ay-program", addProgram)
      .then((res) => {
        try {
          getSuccess().show();
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  };

  const callSetCourses = (e) => {
    e.preventDefault();
    setModalContent({
      Title: "Added",
      SubTitle: "Added",
    });

    for (let i = 0; i <= selectedValues.length - 1; i++) {
      axios
        .post("http://localhost:8081/set-ay-coach-course", {
          AYID: addCourse.AYID,
          CCHID: addCourse.CCHID,
          Courses: selectedValues[i],
        })
        .then((res) => {
          try {
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => console.log(err));
    }
    setSelectedValues([]);

    coursecheckbox.forEach((c) => {
      c.checked = false;
    });
    getSuccess().show();
  };

  const callSetSections = (e) => {
    e.preventDefault();
    setModalContent({
      Title: "Added",
      SubTitle: "Added",
    });

    for (let i = 0; i <= selectedValues1.length - 1; i++) {
      axios
        .post("http://localhost:8081/set-ay-program-section", {
          AYID: addSection.AYID,
          Sections: selectedValues1[i],
          SCT_Population: addSection.SCT_Population,
        })
        .then((res) => {
          try {
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => console.log(err));
    }
    setSelectedValues1([]);

    coursecheckbox.forEach((c) => {
      c.checked = false;
    });
    getSuccess().show();
  };

  const callSCTPopulationUpdate = (e) => {
    e.preventDefault();
    setModalContent({
      Title: "Added",
      SubTitle: "Added",
    });
    axios
      .post(
        "http://localhost:8081/update-ay-program-section",
        updateSCTPopulation
      )
      .then((res) => {
        try {
          getSuccess().show();
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAddCoach = (e) => {
    setAddCoach((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const CourseSection = (e) => {
    e.preventDefault();
    setModalContent({
      Title: "Added",
      SubTitle: "Added",
    });

    for (let i = 0; i <= selectedValues2.length - 1; i++) {
      axios
        .post("http://localhost:8081/set-program-section-courses", {
          AYID: addSectionCourse.AYID,
          CRRID: state.Curriculum,
          PRGID: addSectionCourse.PRGID,
          SCTID: addSectionCourse.SCTID,
          CRSID: selectedValues2[i],
        })
        .then((res) => {
          try {
            console.log(res.data.Error);
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => console.log(err));
    }
    coursecheckbox.forEach((c) => {
      c.checked = false;
    });
    setSelectedValues2([]);
    getSuccess().show();
  };

  const handleAddProgram = (e) => {
    setAddProgram((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateSCTPopulation = (e) => {
    setUpdateSCTPopulation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const removeItem = (item) => {
    setSelectedValues((prevState) =>
      prevState.filter((prevItem) => prevItem !== item)
    );
  };

  const removeItem1 = (item) => {
    setSelectedValues1((prevState) =>
      prevState.filter((prevItem) => prevItem !== item)
    );
  };

  const removeItem2 = (item) => {
    setSelectedValues2((prevState) =>
      prevState.filter((prevItem) => prevItem !== item)
    );
  };

  //Modals
  let Alert = null;
  function getAlert() {
    if (!Alert) {
      Alert = new bootstrap.Modal(document.getElementById("Alert"));
    }
    return Alert;
  }

  let Success = null;
  function getSuccess() {
    if (!Success) {
      Success = new bootstrap.Modal(document.getElementById("Success"));
    }
    return Success;
  }

  return (
    <>
      <SelectedAcademicYearLayout
        lhs_control={
          <>
            <MainButton
              class={"btn btn-success"}
              text={
                <ButtonIcons image={ic_add} opacity={"1"} filter={"invert()"} />
              }
              onClick={() => {
                console.log("Clicked!");
              }}
              disabled={false}
              databstarget={"#addCoach-"}
              databstoggle={"modal"}
            />
            <PassiveModal
              id={"addCoach-"}
              title={"Add Coach"}
              content={
                <form onSubmit={callAddCoach} className="px-1">
                  <Select
                    title={"Coach"}
                    class={""}
                    name={"CCHID"}
                    trigger={handleAddCoach}
                    options={
                      <>
                        <option defaultValue={""}>{"None"}</option>
                        {coaches.map((option, i) => (
                          <option key={"cch" + i} value={option.CCHID}>
                            {option.LastName}
                          </option>
                        ))}
                      </>
                    }
                    required
                  />
                  <Select
                    title={"Type"}
                    class={""}
                    name={"CCH_Type"}
                    trigger={handleAddCoach}
                    options={
                      <>
                        <option defaultValuevalue={""}>{"None"}</option>
                        {pageconfig.CCH_Type.map((option, i) => (
                          <option key={"cch" + i} value={option}>
                            {option}
                          </option>
                        ))}
                      </>
                    }
                    required
                  />
                  <OneLineInput
                    title={"Units"}
                    class={""}
                    type={"number"}
                    placeholder={"None"}
                    trigger={handleAddCoach}
                    name={"CCH_Units"}
                    required
                  />
                  <div className="w-100 text-end mt-3">
                    <MainButton
                      class={"btn btn-primary"}
                      type={"submit"}
                      text={"Submit"}
                      onClick={() => {}}
                      disabled={false}
                      databstarget={"#addCoach-"}
                      databsdismiss={"modal"}
                    />
                  </div>
                </form>
              }
            />
          </>
        }
        lhs_title={"Coaches"}
        lhs_content={
          <>
            {ayCoaches.map((item, i) => (
              <>
                <button
                  class="btn w-100 p-0 my-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#cch" + i}
                  aria-expanded="false"
                  aria-controls={"cch" + i}
                  onClick={() => {
                    console.log("das");
                  }}
                >
                  <div className="bg-white rounded shadow-sm p-3">
                    <div className="d-flex justify-content-between">
                      <p className="m-0 p-0">
                        <span>
                          {item.DepartmentAbbrev} -{" "}
                          {item.LastName.concat(", ", item.FirstName)}
                        </span>
                      </p>
                    </div>
                  </div>
                </button>
                <div class="col">
                  <div class="collapse multi-collapse" id={"cch" + i}>
                    <div class="card border p-3">
                      <div className="row m-0 p-0">
                        <div className="col">
                          <p className="m-0">
                            <span className="d-block mb-2">
                              Type:{" "}
                              <span className="fst-italic">
                                {item.CCH_Type}
                              </span>
                            </span>
                            <span className="d-block">
                              Units:{" "}
                              <span className="fst-italic">
                                {item.CCH_Units}
                              </span>
                            </span>
                          </p>
                        </div>
                        <div className="col">
                          <div className="d-flex justify-content-end">
                            <MainButton
                              class={"btn shadow-sm"}
                              text={
                                <ButtonIcons
                                  image={ic_edit}
                                  opacity={"1"}
                                  filter={""}
                                />
                              }
                              onClick={() => {
                                console.log("Clicked!");
                              }}
                              disabled={false}
                              databstarget={"#editCoach-"}
                              databstoggle={"modal"}
                            />
                          </div>
                        </div>
                      </div>
                      <hr />

                      <div className="d-flex justify-content-end">
                        <MainButton
                          class={"btn btn-success"}
                          type={"button"}
                          text={
                            <ButtonIcons
                              image={ic_add}
                              opacity={"1"}
                              filter={"invert()"}
                            />
                          }
                          onClick={() => {
                            setAddCourse((prev) => ({
                              ...prev,
                              CCHID: item.CCHID,
                              DPTID: item.DPTID,
                            }));
                          }}
                          disabled={false}
                          databstarget={"#setCourses-"}
                          databstoggle={"modal"}
                        />
                      </div>

                      {ayCoachesCourses.map((item1, i) =>
                        item1.CCHID === item.CCHID ? (
                          <button className="btn p-0  my-2 ">
                            <div className="p-3 shadow-sm rounded">
                              <main className="w-100">
                                <div className="d-flex justify-content-between">
                                  <p className="p-0 m-0">
                                    {item1.CourseCode} - {item1.CourseName}
                                  </p>
                                  <p className="p-0 m-0">&times;</p>
                                </div>
                              </main>
                            </div>
                          </button>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))}
            <PassiveModal
              id={"setCourses-"}
              title={"Set Courses"}
              content={
                <>
                  <form onSubmit={callSetCourses}>
                    <div className="d-flex justify-content-end px-2 gap-2">
                      <DropdownButton
                        class={"dropbottom"}
                        class2={"w-100 btn-sm"}
                        title={"Filter"}
                        item={
                          <>
                            <DropdownItem
                              title={"All"}
                              clicked={() =>
                                setPageConfig((prev) => ({
                                  ...prev,
                                  filterByDepartment: "",
                                }))
                              }
                            />
                            <hr />
                            {departments.map((item, i) => (
                              <DropdownItem
                                key={i}
                                title={item.DepartmentName}
                                clicked={() =>
                                  setPageConfig((prev) => ({
                                    ...prev,
                                    filterByDepartment: item.DepartmentName,
                                  }))
                                }
                              />
                            ))}
                          </>
                        }
                      />
                      <MainButton
                        class={"btn btn-sm btn-primary mb-3"}
                        type={"submit"}
                        text={"Submit"}
                        onClick={() => {
                          console.log("Button Clicked!");
                        }}
                        databstarget={"#setCourses-"}
                        databsdismiss={"modal"}
                      />
                    </div>
                    <div className="mb-3 text-end px-2">
                      {pageconfig.filterByDepartment !== "" ? (
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() =>
                            setPageConfig((prev) => ({
                              ...prev,
                              filterByDepartment: "",
                            }))
                          }
                        >
                          {pageconfig.filterByDepartment} &times;
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="px-2" style={{ height: "50vh" }}>
                      {courses.map((item, i) =>
                        item.DepartmentName === pageconfig.filterByDepartment ||
                        pageconfig.filterByDepartment === "" ? (
                          <div className={"form-check p-0"}>
                            <label
                              className="form-check-label px-5 py-2 w-100 rounded border border-dark-subtle"
                              htmlFor={item.CRSID + i}
                            >
                              {item.CourseName}
                              <input
                                className="form-check-input course-checkbox"
                                type="checkbox"
                                id={item.CRSID + i}
                                onChange={() => {
                                  {
                                    if (
                                      selectedValues.includes(item.CRSID) ===
                                      false
                                    ) {
                                      setSelectedValues((prev) => [
                                        ...prev,
                                        item.CRSID,
                                      ]);
                                    } else {
                                      removeItem(item.CRSID);
                                    }
                                  }
                                }}
                              />
                            </label>
                          </div>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                  </form>
                </>
              }
            />
          </>
        }
        rhs_control={
          <>
            <MainButton
              class={"btn btn-success"}
              text={
                <ButtonIcons image={ic_add} opacity={"1"} filter={"invert()"} />
              }
              onClick={() => {
                console.log("Clicked!");
              }}
              disabled={false}
              databstarget={"#addProgram-"}
              databstoggle={"modal"}
            />
            <PassiveModal
              id={"addProgram-"}
              title={"Add Program"}
              content={
                <form onSubmit={callAddProgram} className="px-1">
                  <Select
                    title={"Program"}
                    class={""}
                    name={"PRGID"}
                    trigger={handleAddProgram}
                    options={
                      <>
                        <option defaultValue={""}>{"None"}</option>
                        {programs.map((option, i) => (
                          <option key={"prg" + i} value={option.PRGID}>
                            {option.ProgramName}
                          </option>
                        ))}
                      </>
                    }
                    required
                  />
                  <div className="w-100 text-end mt-3">
                    <MainButton
                      class={"btn btn-primary"}
                      type={"submit"}
                      text={"Submit"}
                      onClick={() => {}}
                      disabled={false}
                      databstarget={"#addProgram-"}
                      databsdismiss={"modal"}
                    />
                  </div>
                </form>
              }
            />
          </>
        }
        rhs_title={"Sections"}
        rhs_content={
          <>
            {ayProgram.map((item, i) => (
              <>
                <button
                  class="btn w-100 p-0 my-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#sct" + i}
                  aria-expanded="false"
                  aria-controls={"sct" + i}
                >
                  <div className="bg-white rounded shadow-sm p-3">
                    <p className="m-0 p-0 d-flex justify-content-between">
                      <span>
                        {item.ProgramAbbrev} - {item.ProgramName}
                      </span>
                    </p>
                  </div>
                </button>
                <div class="col">
                  <div class="collapse multi-collapse" id={"sct" + i}>
                    <div class="card border p-3">
                      <main className="d-flex justify-content-end">
                        <MainButton
                          class={"btn btn-success mb-2"}
                          type={"button"}
                          text={<span>Section</span>}
                          onClick={() => {
                            setAddSection((prev) => ({
                              ...prev,
                              PRGID: item.PRGID,
                            }));
                          }}
                          disabled={false}
                          databstarget={"#setSection-"}
                          databstoggle={"modal"}
                        />
                      </main>

                      {ayProgramSection.map((item1, i) =>
                        item1.PRGID === item.PRGID ? (
                          <>
                            <div className="mb-2 shadow-sm p-3 rounded">
                              <div className="d-flex gap-2 mb-2 align-items-center">
                                <main className="w-100">
                                  <div className="d-flex justify-content-between">
                                    <h6 className="p-0 m-0">
                                      {item1.SectionName}
                                    </h6>
                                  </div>
                                </main>

                                <MainButton
                                  class={"btn shadow-sm"}
                                  type={"button"}
                                  text={
                                    <>
                                      <ButtonIcons
                                        image={ic_edit}
                                        opacity={"1"}
                                        filter={""}
                                      />
                                    </>
                                  }
                                  onClick={() => {
                                    setUpdateSCTPopulation((prev) => ({
                                      ...prev,
                                      PRGID: item1.PRGID,
                                      SCTID: item1.SCTID,
                                      SCT_Population: item1.SCT_Population,
                                    }));
                                  }}
                                  disabled={false}
                                  databstarget={"#setPopulation-"}
                                  databstoggle={"modal"}
                                />

                                <MainButton
                                  class={"btn btn-success"}
                                  type={"button"}
                                  text={
                                    <>
                                      <ButtonIcons
                                        image={ic_add}
                                        opacity={"1"}
                                        filter={"invert()"}
                                      />
                                    </>
                                  }
                                  onClick={() => {
                                    setAddSectionCourse((prev) => ({
                                      ...prev,
                                      PRGID: item1.PRGID,
                                      SCTID: item1.SCTID,
                                    }));
                                  }}
                                  disabled={false}
                                  databstarget={"#setSectionCourse-"}
                                  databstoggle={"modal"}
                                />

                                <MainButton
                                  class={"btn btn-danger"}
                                  type={"button"}
                                  text={
                                    <ButtonIcons
                                      image={ic_archive}
                                      opacity={"1"}
                                      filter={"invert()"}
                                    />
                                  }
                                  onClick={() => {}}
                                  disabled={false}
                                />
                              </div>
                              <div className="mb-3">
                                <div className="shadow-sm p-3 rounded">
                                  <div>
                                    <p>
                                      Population:{" "}
                                      <span className="fst-italic">
                                        {item1.SCT_Population} students
                                      </span>
                                    </p>
                                  </div>
                                  <hr />
                                  {sectionwcourse.map((swc, i) =>
                                    swc.SCTID === item1.SCTID ? (
                                      <button
                                        key={i}
                                        className="btn w-100 text-start shadow-sm rounded p-3 mb-2 d-flex justify-content-between"
                                      >
                                        <p className="p-0 m-0">
                                          {swc.CourseName}
                                        </p>
                                        <p className="p-0 m-0">&times;</p>
                                      </button>
                                    ) : (
                                      ""
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))}
            <PassiveModal
              id={"-"}
              title={""}
              content={
                <>
                  <form onSubmit={""}>
                    <div className="d-flex justify-content-end px-2 gap-2 mb-0 py-0">
                      <MainButton
                        class={"btn btn-sm btn-primary mb-3"}
                        type={"submit"}
                        text={"Submit"}
                        onClick={() => {
                          console.log("Button Clicked!");
                        }}
                        databstarget={"#-"}
                        databsdismiss={"modal"}
                      />
                    </div>
                  </form>
                </>
              }
            />
            <PassiveModal
              id={"setSectionCourse-"}
              title={"Set Section Courses"}
              content={
                <>
                  <form onSubmit={CourseSection} className="px-1">
                    <div className="overflow-y-auto" style={{ height: "60vh" }}>
                      {tempcourses.map((data, i) =>
                        data.PRGID === addSectionCourse.PRGID ? (
                          <div className="form-check p-0 mx-1" key={i}>
                            <label
                              className="form-check-label w-100 py-3 px-5 rounded border border-dark-subtle"
                              htmlFor={i}
                            >
                              {data.CourseName}
                              <input
                                className="form-check-input course-checkbox"
                                type="checkbox"
                                id={i}
                                onChange={() => {
                                  {
                                    if (
                                      selectedValues2.includes(data.CRSID) ===
                                      false
                                    ) {
                                      setSelectedValues2((prev) => [
                                        ...prev,
                                        data.CRSID,
                                      ]);
                                    } else {
                                      removeItem2(data.CRSID);
                                    }
                                  }
                                }}
                              />
                            </label>
                          </div>
                        ) : (
                          ""
                        )
                      )}
                    </div>

                    <div className="bg-white w-100">
                      <div className="w-100 text-end mt-3">
                        <MainButton
                          class={"btn btn-primary"}
                          type={"submit"}
                          onClick={() => {}}
                          databstoggle={"modal"}
                          databstarget={"#setSectionCourse-"}
                          databsdismiss={"modal"}
                          // disabled={
                          //   phase2.tempCourse !== ""
                          //     ? false
                          //     : true
                          // }
                          text={"Submit"}
                        />
                      </div>
                    </div>
                  </form>
                </>
              }
            />
            <PassiveModal
              id={"setPopulation-"}
              title={"Set Population"}
              content={
                <>
                  <form onSubmit={callSCTPopulationUpdate}>
                    <div className="mb-3">
                      <OneLineInput
                        title={"Population"}
                        type={"text"}
                        placeholder={""}
                        name={"SCT_Population"}
                        value={updateSCTPopulation.SCT_Population}
                        trigger={handleUpdateSCTPopulation}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-end px-2 gap-2 mb-0 py-0">
                      <MainButton
                        class={"btn btn-sm btn-primary mb-3"}
                        type={"submit"}
                        text={"Submit"}
                        onClick={() => {
                          console.log("Button Clicked!");
                        }}
                        databstarget={"#setPopulation-"}
                        databsdismiss={"modal"}
                      />
                    </div>
                  </form>
                </>
              }
            />
            <PassiveModal
              id={"editCoach-"}
              title={"Edit Coach"}
              content={
                <>
                  <form onSubmit={callSCTPopulationUpdate}>
                    <div className="mb-3">
                      <OneLineInput
                        title={"Population"}
                        type={"text"}
                        placeholder={""}
                        name={"SCT_Population"}
                        value={updateSCTPopulation.SCT_Population}
                        trigger={handleUpdateSCTPopulation}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-end px-2 gap-2 mb-0 py-0">
                      <MainButton
                        class={"btn btn-sm btn-primary mb-3"}
                        type={"submit"}
                        text={"Submit"}
                        onClick={() => {
                          console.log("Button Clicked!");
                        }}
                        databstarget={"#setPopulation-"}
                        databsdismiss={"modal"}
                      />
                    </div>
                  </form>
                </>
              }
            />
            <PassiveModal
              id={"setSection-"}
              title={"Set Section"}
              content={
                <>
                  <form onSubmit={callSetSections}>
                    <div className="d-flex justify-content-end px-2 gap-2">
                      <DropdownButton
                        class={"dropbottom"}
                        class2={"w-100 btn-sm"}
                        title={"Filter"}
                        item={
                          <>
                            <DropdownItem
                              title={"All"}
                              clicked={() =>
                                setPageConfig((prev) => ({
                                  ...prev,
                                  filterByProgram: "",
                                }))
                              }
                            />
                            <hr />
                            {programs.map((item, i) => (
                              <DropdownItem
                                key={i}
                                title={item.ProgramName}
                                clicked={() =>
                                  setPageConfig((prev) => ({
                                    ...prev,
                                    filterByProgram: item.ProgramName,
                                  }))
                                }
                              />
                            ))}
                          </>
                        }
                      />
                      <MainButton
                        class={"btn btn-sm btn-primary mb-3"}
                        type={"submit"}
                        text={"Submit"}
                        onClick={() => {
                          console.log("Button Clicked!");
                        }}
                        databstarget={"#setSection-"}
                        databsdismiss={"modal"}
                      />
                    </div>
                    <div className="mb-3 text-end px-2">
                      {pageconfig.filterByProgram !== "" ? (
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() =>
                            setPageConfig((prev) => ({
                              ...prev,
                              filterByProgram: "",
                            }))
                          }
                        >
                          {pageconfig.filterByProgram} &times;
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="px-2" style={{ height: "50vh" }}>
                      {sections.map((item1, i) =>
                        item1.PRGID === addSection.PRGID ? (
                          <div className={"form-check p-0"}>
                            <label
                              className="form-check-label px-5 py-2 w-100 rounded border border-dark-subtle"
                              htmlFor={"sct-sel" + i}
                            >
                              {item1.SectionName}
                              <input
                                className="form-check-input course-checkbox"
                                type="checkbox"
                                id={"sct-sel" + i}
                                onChange={() => {
                                  {
                                    if (
                                      selectedValues1.includes(item1.SCTID) ===
                                      false
                                    ) {
                                      setSelectedValues1((prev) => [
                                        ...prev,
                                        item1.SCTID,
                                      ]);
                                    } else {
                                      removeItem1(item1.SCTID);
                                    }
                                  }
                                }}
                              />
                            </label>
                          </div>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                  </form>
                </>
              }
            />
          </>
        }
      />

      <>
        <GeneralModal
          id={"Success"}
          icon={success}
          title={modalcontent.Title}
          subtitle={modalcontent.SubTitle}
          class={"success"}
        />
        <GeneralModal
          id={"Alert"}
          icon={warning}
          title={modalcontent.Title}
          subtitle={modalcontent.SubTitle}
          class={"warning"}
        />
      </>
    </>
  );
}
