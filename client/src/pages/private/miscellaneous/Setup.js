import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { DefaultInput } from "../../../component/input/DefaultInput";
import useModal from "../../../hook/useModal";
import useHandleChange from "../../../hook/useHandleChange";
import useConfiguration from "../../../hook/useConfiguration";
import { useToasty } from "../../../hook/useToasty";
import { useNavigate } from "react-router-dom";
import owlie from "../../../assets/imgs/misc/owie.png";

export function Setup() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration([]);
  const [toasty, showToast] = useToasty();
  const [modalcontent, showModal, hideModal, getModal] = useModal();

  const [academicLevel, setAcademicLevel] = useState([]);
  const [yearLevel, setYearLevel] = useState([]);
  const [semester, setSemester] = useState([]);
  const [coachType, setCoachType] = useState([]);
  const [building, setBuilding] = useState([]);
  const [floor, setFloor] = useState([]);
  const [facility, setFacility] = useState([]);

  useEffect(() => {
    data_get("academic-level-list", setAcademicLevel);
    data_get("year-level-list", setYearLevel);
    data_get("semester-list", setSemester);
    data_get("coach-type-list", setCoachType);

    data_get("building-list", setBuilding);
    data_get("floor-list", setFloor);
    data_get("facility-list", setFacility);
  }, []);

  return (
    <main className="h-100 row m-0 p-0">
      <section className="col-lg-9 p-1 h-100 height-auto">
        <main className="h-100 bg-white rounded shadow-sm p-2 height-auto py-4 py-lg-0">
          <section className="h-100 w-100 row m-0 p-0">
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
                      id="search"
                      trigger={() => {}}
                    />
                    <DefaultButton
                      class="btn-primary px-3"
                      reversed={true}
                      text="Proceed"
                      function={() => {}}
                    />
                  </section>
                  <section className="pt-2">
                    <div className="h-100 alert alert-primary m-0" role="alert">
                      <p className="m-0 fw-semibold">
                        Code for each Action are the following:
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
                <ul class="list-group list-group-flush">
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
                <ul class="list-group list-group-flush">
                  {semester &&
                    semester.map((semester, i) => (
                      <li key={i} class="list-group-item">
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
                <ul class="list-group list-group-flush">
                  {yearLevel &&
                    yearLevel.map((yearLevel, i) => (
                      <li key={i} class="list-group-item">
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
                <ul class="list-group list-group-flush">
                  {coachType &&
                    coachType.map((coachType, i) => (
                      <li key={i} class="list-group-item">
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
                <ul class="list-group list-group-flush">
                  {building &&
                    building.map((building, i) => (
                      <li key={i} class="list-group-item">
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
                <ul class="list-group list-group-flush">
                  {floor &&
                    floor.map((floor, i) => (
                      <li key={i} class="list-group-item">
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
                <ul class="list-group list-group-flush">
                  {facility &&
                    facility.map((facility, i) => (
                      <li key={i} class="list-group-item">
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
