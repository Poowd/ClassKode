import React, { useEffect, useState } from "react";
import useDatabase from "../../../../hook/useDatabase";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FileMaintainanceTemplate } from "../../../../layout/grid/FileMaintainanceTemplate";
import { DefaultInput } from "../../../../component/input/DefaultInput";
import { LinkButton } from "../../../../component/button/LinkButton";
import { ListCard } from "../../../../component/card/ListCard";
import { DefaultDropdown } from "../../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../../component/dropdown/default/DefaultDropdownItem";
import useConfiguration from "../../../../hook/useConfiguration";
import useHandleChange from "../../../../hook/useHandleChange";

export function CourseSetup() {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [search, setSearch] = useState({
    search: "",
  });
  const [dataChange] = useHandleChange(setSearch);

  const SessionStorage = [
    JSON.parse(sessionStorage.getItem("department_program_selection")),
  ];

  const [curriculum, setCurriculum] = useState([]);
  const [currentcurriculum, setCurrentCurriculum] = useState([]);
  const [current, setCurrent] = useState([]);
  const [dept, setDept] = useState([]);
  const [prg, setPrg] = useState([]);
  const [setup, setSetup] = useState([]);
  const [data, setData] = useState({
    Curriculum: "",
    Department: "",
    Program: "",
  });

  useEffect(() => {
    data_get("curriculum-list", setCurriculum);
    data_get("current-curriculum", setCurrentCurriculum);
    data_get("department-list", setDept);
    data_get("program-list", setPrg);
    //data_post("setup-target", { data: params.id }, setSetup);
  }, []);

  useEffect(() => {
    if (
      !(data.Curriculum === "" && data.Department === "" && data.Program === "")
    ) {
      sessionStorage.setItem(
        "department_program_selection",
        JSON.stringify(data)
      );
      data_post(
        "curriculum-setup-target",
        {
          Curriculum: params.id,
          Program: data.Program,
        },
        setSetup
      );
    }
  }, [data]);

  useEffect(() => {
    if (SessionStorage[0] === null) {
    } else {
      setData(SessionStorage[0]);
    }
  }, []);
  return (
    <FileMaintainanceTemplate
      sidepanel={
        <main>
          <header className="mb-3">
            <h5 className="p-0 m-0">Curriculum Details</h5>
            <p>Entries: {curriculum.length} row/s</p>
            <DefaultButton
              class="w-100 border py-2"
              icon={info.icons.forms.view}
              text={`Current Curriculum`}
              function={() =>
                navigate(`/curriculum/view/${currentcurriculum.CRRID}`)
              }
            />
          </header>
          <main className="w-100">
            <section className="w-100 bg-white rounded">
              <main className="mb-2 text-center">
                <small>
                  <p className="m-0 text-secondary">
                    Please Select Department and Program here.
                  </p>
                </small>
              </main>
              <DefaultDropdown
                topclass="w-100 mb-2"
                class="w-100 border py-2"
                icon={info.icons.forms.view}
                text={
                  data.Department !== ""
                    ? dept.map((item, i) =>
                        item.Code === data.Department ? item.Department : null
                      )
                    : "Department"
                }
                dropdownitems={dept.map((option, i) =>
                  option.Code !== data.Department ? (
                    <DefaultDropdownItem
                      title={option.Department}
                      trigger={() => {
                        if (data.Program !== "") {
                          setData((prev) => ({
                            ...prev,
                            Program: "",
                          }));
                        }
                        setData((prev) => ({
                          ...prev,
                          Department: option.Code,
                        }));
                      }}
                    />
                  ) : null
                )}
              />
              <DefaultDropdown
                topclass="w-100"
                class="w-100 border py-2"
                icon={info.icons.forms.view}
                text={
                  data.Program !== ""
                    ? prg.map((item, i) =>
                        item.Code === data.Program ? item.Program : null
                      )
                    : "Program"
                }
                dropdownitems={prg.map((option, i) =>
                  option.DPTCode === data.Department &&
                  option.Code !== data.Program ? (
                    <DefaultDropdownItem
                      title={option.Program}
                      trigger={() =>
                        setData((prev) => ({
                          ...prev,
                          Program: option.Code,
                        }))
                      }
                    />
                  ) : null
                )}
              />
            </section>
          </main>
          <section>
            <section>
              <h6></h6>
              <ul className="list-group list-group-flush"></ul>
            </section>
          </section>
        </main>
      }
      control={
        <>
          <div className="w-100">
            <div className="d-flex gap-2 justify-content-end">
              <DefaultButton
                class="px-2"
                icon={info.icons.navigation.back}
                text="Back"
                function={() => navigate(-1)}
              />{" "}
              <DefaultInput
                placeholder="Search"
                id="search"
                trigger={dataChange}
              />
              <LinkButton
                to={data.Program !== "" ? "/setup/create/0" : ""}
                state={{
                  program: data.Program,
                  department: data.Department,
                  curriculum: currentcurriculum.Code,
                }}
                class="btn-outline-primary px-2"
                icon={info.icons.forms.add}
              />
              <LinkButton
                to={data.Program !== "" ? "/setup/generate/0" : ""}
                state={{
                  program: data.Program,
                  department: data.Department,
                  curriculum: currentcurriculum.Code,
                }}
                class="btn-primary px-2"
                text="Generate"
                icon={info.icons.forms.generate}
              />
            </div>
          </div>
        </>
      }
      list={
        <main>
          <section>
            <ul className="p-0 m-0 mb-2 d-flex gap-2 flex-wrap">
              <li className={search.search === "" ? "visually-hidden" : ""}>
                <DefaultButton
                  class="btn-outline-primary px-2"
                  text={search.search}
                  function={() => {
                    document.getElementById(`search`).value = "";
                    setSearch((prev) => ({
                      ...prev,
                      search: "",
                    }));
                  }}
                />
              </li>
            </ul>
          </section>
          <section>
            {data.Program !== "" ? (
              setup.map((item, i) =>
                true ? (
                  item.Course.toLowerCase().includes(
                    search.search.toLowerCase()
                  ) || search.search === "" ? (
                    <ListCard
                      slot1={
                        <main>
                          <section className="mb-2">{item.Component}</section>
                          <section>
                            <small>
                              <p className="p-0 m-0 text-secondary fw-normal">
                                <span>{`${item.Units} units`}</span>
                              </p>
                            </small>
                          </section>
                        </main>
                      }
                      slot2={`${item.Course}`}
                      slot3={`${item.Program} : ${item.YearLevel}`}
                      slot4={item.Curriculum}
                      slot5={`${item.SubjectArea}-${item.CatalogNo} `}
                      view={info.icons.forms.view}
                      link={`/course/view/${item.CourseID}`}
                      state={{ data: item }}
                    />
                  ) : null
                ) : null
              )
            ) : (
              <p className="fw-semibold text-center p-3 text-secondary">
                Select Department & Program
              </p>
            )}
          </section>
        </main>
      }
    />
  );
}
