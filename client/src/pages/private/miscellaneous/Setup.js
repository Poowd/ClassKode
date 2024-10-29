import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { DefaultInput } from "../../../component/input/DefaultInput";

export function Setup() {
  const [get, post, data_get, data_post] = useDatabase();

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
      <section className="col-lg-6 p-2 h-100 height-auto">
        <main className="h-100 bg-white rounded shadow-sm p-2 height-auto">
          <section className="h-50 p-2">
            <main className="h-100 bg-white rounded shadow-sm p-2 overflow-y-auto"></main>
          </section>
          <section className="h-50 p-2">
            <main className="h-100 bg-white rounded shadow-sm p-2">
              <section className="h-50 p-2"></section>
              <section className="h-50 p-2">
                <main className="h-100 bg-white rounded shadow-sm p-2">
                  <section className="h-25 d-flex gap-2">
                    <DefaultInput
                      placeholder="Code"
                      id="search"
                      trigger={() => {}}
                    />
                    <DefaultButton
                      class="btn-warning px-2"
                      reversed={true}
                      text="Proceed"
                      function={() => {}}
                    />
                  </section>
                  <section className="h-75 pt-2">
                    <div
                      class="h-100 alert alert-warning d-flex align-items-center"
                      role="alert"
                    >
                      A simple warning alert—check it out!
                    </div>
                  </section>
                </main>
              </section>
            </main>
          </section>
        </main>
      </section>
      <section className="col-lg-6 p-2 h-100">
        <main className="h-100 bg-white rounded shadow-sm p-3 overflow-y-auto height-auto">
          {/* Settings 1 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="row m-0 p-0">
              <section className="col-lg-4 p-2">
                <main className="bg-white rounded shadow-sm p-2">
                  <p className="m-0 fw-semibold">Academic Level</p>
                </main>
                <main className="d-flex justify-content-end">
                  <DefaultButton
                    class=""
                    reversed={true}
                    text="Add"
                    function={() => {}}
                  />
                </main>
              </section>
              <section className="col-lg-8 p-2">
                <main className="bg-white rounded shadow-sm p-3">
                  <ul class="list-group list-group-flush">
                    {academicLevel &&
                      academicLevel.map((acadLevel, i) => (
                        <li key={i} class="list-group-item">
                          <main className="row m-0 p-0">
                            <section className="col-8 p-0">
                              {acadLevel.AcademicLevel}
                            </section>
                            <section className="col-4 p-0">
                              <main className="d-flex gap-1 justify-content-end">
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Edit"
                                  function={() => {}}
                                />
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Archive"
                                  function={() => {}}
                                />
                              </main>
                            </section>
                          </main>
                        </li>
                      ))}
                  </ul>
                </main>
              </section>
            </main>
          </section>
          {/* Settings 2 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="row m-0 p-0">
              <section className="col-lg-4 p-2">
                <main className="bg-white rounded shadow-sm p-2">
                  <p className="m-0 fw-semibold">Semester</p>
                </main>
                <main className="d-flex justify-content-end">
                  <DefaultButton
                    class=""
                    reversed={true}
                    text="Add"
                    function={() => {}}
                  />
                </main>
              </section>
              <section className="col-lg-8 p-2">
                <main className="bg-white rounded shadow-sm p-3">
                  <ul class="list-group list-group-flush">
                    {semester &&
                      semester.map((semester, i) => (
                        <li key={i} class="list-group-item">
                          <main className="row m-0 p-0">
                            <section className="col-8 p-0">
                              {semester.Semester}
                            </section>
                            <section className="col-4 p-0">
                              <main className="d-flex gap-1 justify-content-end">
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Edit"
                                  function={() => {}}
                                />
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Archive"
                                  function={() => {}}
                                />
                              </main>
                            </section>
                          </main>
                        </li>
                      ))}
                  </ul>
                </main>
              </section>
            </main>
          </section>
          {/* Settings 3 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="row m-0 p-0">
              <section className="col-lg-4 p-2">
                <main className="bg-white rounded shadow-sm p-2">
                  <p className="m-0 fw-semibold">Year Level</p>
                </main>
                <main className="d-flex justify-content-end">
                  <DefaultButton
                    class=""
                    reversed={true}
                    text="Add"
                    function={() => {}}
                  />
                </main>
              </section>
              <section className="col-lg-8 p-2">
                <main className="bg-white rounded shadow-sm p-3">
                  <ul class="list-group list-group-flush">
                    {yearLevel &&
                      yearLevel.map((yearLevel, i) => (
                        <li key={i} class="list-group-item">
                          <main className="row m-0 p-0">
                            <section className="col-8 p-0">
                              {yearLevel.YearLevel}
                            </section>
                            <section className="col-4 p-0">
                              <main className="d-flex gap-1 justify-content-end">
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Edit"
                                  function={() => {}}
                                />
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Archive"
                                  function={() => {}}
                                />
                              </main>
                            </section>
                          </main>
                        </li>
                      ))}
                  </ul>
                </main>
              </section>
            </main>
          </section>
          {/* Settings 4 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="row m-0 p-0">
              <section className="col-lg-4 p-2">
                <main className="bg-white rounded shadow-sm p-2">
                  <p className="m-0 fw-semibold">Coach Type</p>
                </main>
                <main className="d-flex justify-content-end">
                  <DefaultButton
                    class=""
                    reversed={true}
                    text="Add"
                    function={() => {}}
                  />
                </main>
              </section>
              <section className="col-lg-8 p-2">
                <main className="bg-white rounded shadow-sm p-3">
                  <ul class="list-group list-group-flush">
                    {coachType &&
                      coachType.map((coachType, i) => (
                        <li key={i} class="list-group-item">
                          <main className="row m-0 p-0">
                            <section className="col-8 p-0">
                              {coachType.Type}
                            </section>
                            <section className="col-4 p-0">
                              <main className="d-flex gap-1 justify-content-end">
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Edit"
                                  function={() => {}}
                                />
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Archive"
                                  function={() => {}}
                                />
                              </main>
                            </section>
                          </main>
                        </li>
                      ))}
                  </ul>
                </main>
              </section>
            </main>
          </section>
          {/* Settings 5 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="row m-0 p-0">
              <section className="col-lg-4 p-2">
                <main className="bg-white rounded shadow-sm p-2">
                  <p className="m-0 fw-semibold">Building</p>
                </main>
                <main className="d-flex justify-content-end">
                  <DefaultButton
                    class=""
                    reversed={true}
                    text="Add"
                    function={() => {}}
                  />
                </main>
              </section>
              <section className="col-lg-8 p-2">
                <main className="bg-white rounded shadow-sm p-3">
                  <ul class="list-group list-group-flush">
                    {building &&
                      building.map((building, i) => (
                        <li key={i} class="list-group-item">
                          <main className="row m-0 p-0">
                            <section className="col-8 p-0">
                              {building.Building}
                            </section>
                            <section className="col-4 p-0">
                              <main className="d-flex gap-1 justify-content-end">
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Edit"
                                  function={() => {}}
                                />
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Archive"
                                  function={() => {}}
                                />
                              </main>
                            </section>
                          </main>
                        </li>
                      ))}
                  </ul>
                </main>
              </section>
            </main>
          </section>
          {/* Settings 6 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="row m-0 p-0">
              <section className="col-lg-4 p-2">
                <main className="bg-white rounded shadow-sm p-2">
                  <p className="m-0 fw-semibold">Floor</p>
                </main>
                <main className="d-flex justify-content-end">
                  <DefaultButton
                    class=""
                    reversed={true}
                    text="Add"
                    function={() => {}}
                  />
                </main>
              </section>
              <section className="col-lg-8 p-2">
                <main className="bg-white rounded shadow-sm p-3">
                  <ul class="list-group list-group-flush">
                    {floor &&
                      floor.map((floor, i) => (
                        <li key={i} class="list-group-item">
                          <main className="row m-0 p-0">
                            <section className="col-8 p-0">
                              {floor.Floor}
                            </section>
                            <section className="col-4 p-0">
                              <main className="d-flex gap-1 justify-content-end">
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Edit"
                                  function={() => {}}
                                />
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Archive"
                                  function={() => {}}
                                />
                              </main>
                            </section>
                          </main>
                        </li>
                      ))}
                  </ul>
                </main>
              </section>
            </main>
          </section>
          {/* Settings 7 */}
          <section className="bg-white rounded shadow-sm p-2 mb-2">
            <main className="row m-0 p-0">
              <section className="col-lg-4 p-2">
                <main className="bg-white rounded shadow-sm p-2">
                  <p className="m-0 fw-semibold">Facility</p>
                </main>
                <main className="d-flex justify-content-end">
                  <DefaultButton
                    class=""
                    reversed={true}
                    text="Add"
                    function={() => {}}
                  />
                </main>
              </section>
              <section className="col-lg-8 p-2">
                <main className="bg-white rounded shadow-sm p-3">
                  <ul class="list-group list-group-flush">
                    {facility &&
                      facility.map((facility, i) => (
                        <li key={i} class="list-group-item">
                          <main className="row m-0 p-0">
                            <section className="col-8 p-0">
                              {facility.Facility}
                            </section>
                            <section className="col-4 p-0">
                              <main className="d-flex gap-1 justify-content-end">
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Edit"
                                  function={() => {}}
                                />
                                <DefaultButton
                                  class=""
                                  reversed={true}
                                  text="Archive"
                                  function={() => {}}
                                />
                              </main>
                            </section>
                          </main>
                        </li>
                      ))}
                  </ul>
                </main>
              </section>
            </main>
          </section>
          {/* Settings 8 */}
        </main>
      </section>
    </main>
  );
}
