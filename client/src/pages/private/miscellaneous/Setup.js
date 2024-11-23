import React, { useRef, useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { DefaultInput } from "../../../component/input/DefaultInput";
import useModal from "../../../hook/useModal";
import useHandleChange from "../../../hook/useHandleChange";
import useConfiguration from "../../../hook/useConfiguration";
import { useToasty } from "../../../hook/useToasty";
import { useNavigate } from "react-router-dom";
import owlie from "../../../assets/imgs/misc/owie.png";
import * as XLSX from "xlsx";
import { createFileName, useScreenshot } from "use-react-screenshot";
import { useLogs } from "../../../hook/useLogs";

export function Setup() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration([]);
  const [toasty, showToast] = useToasty();
  const [modalcontent, showModal, hideModal, getModal] = useModal();
  const [recordLog] = useLogs();

  const [academicLevel, setAcademicLevel] = useState([]);
  const [yearLevel, setYearLevel] = useState([]);
  const [semester, setSemester] = useState([]);
  const [coachType, setCoachType] = useState([]);
  const [building, setBuilding] = useState([]);
  const [floor, setFloor] = useState([]);
  const [facility, setFacility] = useState([]);

  const [everyData, setEveryData] = useState([]);

  const [code, setCode] = useState({
    ActionCode: "",
  });
  const [dataChange] = useHandleChange(setCode);

  useEffect(() => {
    data_get("academic-level-list", setAcademicLevel);
    data_get("year-level-list", setYearLevel);
    data_get("semester-list", setSemester);
    data_get("coach-type-list", setCoachType);

    data_get("building-list", setBuilding);
    data_get("floor-list", setFloor);
    data_get("facility-list", setFacility);
  }, []);

  const ref = useRef(null);
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpg",
    quality: 1.0,
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const getImage = () => {
    takeScreenshot(ref.current).then(download);
  };

  function getFunctionCode(input) {
    if (input === "-SCREENSHOT -OWLIE") {
      getImage();
      recordLog(
        "Took a Screenshot",
        "Setup Module",
        "A user took a screenshot of owlie"
      );
      return;
    }
    if (document.getElementById(`search`) !== null) {
      return (document.getElementById(`search`).value = "");
    }
    if (input === "-GT -ALL -DT") {
      getAllData();
      recordLog(
        "Requested All Data",
        "Setup Module",
        "A user requested the current set of data"
      );
      return;
    }
    if (input === "-GT -ALL -STP") {
      getAllSetups();
      recordLog(
        "Requested All Setup Data",
        "Setup Module",
        "A user requested the current set of setup data"
      );
      return;
    }
    return;
  }

  const getAllData = () => {
    function getSheet(data, sheetName) {
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(data),
        sheetName
      );
    }
    const workbook = XLSX.utils.book_new();
    getSheet(everyData.department, "department");
    getSheet(everyData.program, "program");
    getSheet(everyData.course, "course");
    getSheet(everyData.coach, "coach");
    getSheet(everyData.section, "section");
    getSheet(everyData.room, "room");
    getSheet(everyData.setup, "setup");
    getSheet(everyData.assignment, "assignment");
    getSheet(everyData.projection, "projection");
    XLSX.writeFile(workbook, "CK_STI_Data.xlsx");
  };

  const getAllSetups = () => {
    function getSheet(data, sheetName) {
      XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(data),
        sheetName
      );
    }
    const workbook = XLSX.utils.book_new();
    getSheet(academicLevel, "academicLevel");
    getSheet(yearLevel, "yearLevel");
    getSheet(semester, "semester");
    getSheet(coachType, "coachType");
    getSheet(building, "building");
    getSheet(floor, "floor");
    getSheet(facility, "facility");
    XLSX.writeFile(workbook, "CK_STI_Setups.xlsx");
  };

  useEffect(() => {
    data_get("get-all-data", setEveryData);
  }, [getAllData]);

  return (
    <main className="h-100 row m-0 p-0">
      <section className="col-lg-9 p-1 h-100 height-auto">
        <main className="h-100 bg-white rounded shadow-sm p-2 height-auto py-4 py-lg-0">
          <section className="h-100 w-100 row m-0 p-0" ref={ref}>
            <figure className="h-100 col-lg-6 p-0 m-0">
              <main className="d-flex h-100 align-items-center justify-content-center">
                <img src={owlie} className="w-100 ratio ratio-1x1"></img>
              </main>
            </figure>
            <main className="h-100 col-lg-6 p-0 m-0">
              <main className="d-flex h-100 w-100 align-items-center justify-content-center">
                <section className="w-75">
                  <section className="d-flex gap-2">
                    <DefaultInput
                      class="p-2"
                      placeholder="Code"
                      id="ActionCode"
                      name="ActionCode"
                      trigger={dataChange}
                    />
                    <DefaultButton
                      class="primary-gradient px-3"
                      reversed={true}
                      text="Proceed"
                      function={() =>
                        code.ActionCode && getFunctionCode(code.ActionCode)
                      }
                    />
                  </section>
                  <section className="pt-2">
                    <div className="h-100 alert alert-primary m-0" role="alert">
                      <p className="m-0 fw-semibold">
                        {info.text.instructionText.Setup1}
                      </p>
                      <section className="px-5 py-2">
                        <p className="m-0">
                          Download CSV / JSON / XLXS file for data tables
                        </p>
                      </section>
                    </div>
                  </section>
                </section>
              </main>
            </main>
          </section>
        </main>
      </section>
      <section className="col-lg-3 p-1 h-100">
        <main className="h-100 bg-white rounded shadow-sm p-3 overflow-y-auto height-auto">
          {/* Settings 1 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="p-3">
              <p className="m-0 fw-semibold">Academic Level</p>
              <main>
                <ul className="list-group list-group-flush">
                  {academicLevel &&
                    academicLevel.map((acadLevel, i) => (
                      <li key={i} className="list-group-item">
                        <main className="row m-0 p-0">
                          <section className="col-8 p-0">
                            {acadLevel.AcademicLevel}
                          </section>
                          <section className="col-4 p-0"></section>
                        </main>
                      </li>
                    ))}
                </ul>
              </main>
            </main>
          </section>
          {/* Settings 2 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="p-3">
              <p className="m-0 fw-semibold">Semester</p>
              <main>
                <ul className="list-group list-group-flush">
                  {semester &&
                    semester.map((semester, i) => (
                      <li key={i} className="list-group-item">
                        <main className="row m-0 p-0">
                          <section className="col-8 p-0">
                            {semester.Semester}
                          </section>
                          <section className="col-4 p-0"></section>
                        </main>
                      </li>
                    ))}
                </ul>
              </main>
            </main>
          </section>
          {/* Settings 3 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="p-3">
              <p className="m-0 fw-semibold">Year Level</p>
              <main>
                <ul className="list-group list-group-flush">
                  {yearLevel &&
                    yearLevel.map((yearLevel, i) => (
                      <li key={i} className="list-group-item">
                        <main className="row m-0 p-0">
                          <section className="col-8 p-0">
                            {yearLevel.YearLevel}
                          </section>
                          <section className="col-4 p-0"></section>
                        </main>
                      </li>
                    ))}
                </ul>
              </main>
            </main>
          </section>
          {/* Settings 4 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="p-3">
              <p className="m-0 fw-semibold">Coach Type</p>
              <main>
                <ul className="list-group list-group-flush">
                  {coachType &&
                    coachType.map((coachType, i) => (
                      <li key={i} className="list-group-item">
                        <main className="row m-0 p-0">
                          <section className="col-8 p-0">
                            {coachType.Type}
                          </section>
                          <section className="col-4 p-0"></section>
                        </main>
                      </li>
                    ))}
                </ul>
              </main>
            </main>
          </section>
          {/* Settings 5 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="p-3">
              <p className="m-0 fw-semibold">Building</p>
              <main>
                <ul className="list-group list-group-flush">
                  {building &&
                    building.map((building, i) => (
                      <li key={i} className="list-group-item">
                        <main className="row m-0 p-0">
                          <section className="col-8 p-0">
                            {building.Building}
                          </section>
                          <section className="col-4 p-0"></section>
                        </main>
                      </li>
                    ))}
                </ul>
              </main>
            </main>
          </section>
          {/* Settings 6 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="p-3">
              <p className="m-0 fw-semibold">Floor</p>
              <main>
                <ul className="list-group list-group-flush">
                  {floor &&
                    floor.map((floor, i) => (
                      <li key={i} className="list-group-item">
                        <main className="row m-0 p-0">
                          <section className="col-8 p-0">{floor.Floor}</section>
                          <section className="col-4 p-0"></section>
                        </main>
                      </li>
                    ))}
                </ul>
              </main>
            </main>
          </section>
          {/* Settings 7 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="p-3">
              <p className="m-0 fw-semibold">Facility</p>
              <main>
                <ul className="list-group list-group-flush">
                  {facility &&
                    facility.map((facility, i) => (
                      <li key={i} className="list-group-item">
                        <main className="row m-0 p-0">
                          <section className="col-8 p-0">
                            {facility.Facility}
                          </section>
                          <section className="col-4 p-0"></section>
                        </main>
                      </li>
                    ))}
                </ul>
              </main>
            </main>
          </section>
          {/* Settings 8 */}
        </main>
      </section>
    </main>
  );
}
