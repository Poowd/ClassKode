import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { Link, useNavigate } from "react-router-dom";
import useDatabase from "../../../hook/useDatabase";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { ListCard } from "../../../component/card/ListCard";
import useConfiguration from "../../../hook/useConfiguration";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { LinkButton } from "../../../component/button/LinkButton";
import useHandleChange from "../../../hook/useHandleChange";
import { TextFormat1 } from "../../../component/textformat/TextFormat1";

export function Program() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState({
    setbyDepartment: "",
    search: "",
  });
  const [dataChange] = useHandleChange(setSearch);

  const [program, setProgram] = useState([]);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    data_get("program-list", setProgram);
    data_get("department-list", setDepartment);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <FileMaintainanceTemplate
      loader={isLoading}
      sidepanel={
        <main>
          <header className="">
            <h5 className="p-0 m-0">Program Details</h5>
            <p>Entries: {program.length} row/s</p>
          </header>
          <section>
            <section>
              <h6>Department</h6>
              <ul className="list-group list-group-flush">
                {department &&
                  department.map((item, i) => (
                    <li key={i} className="list-group-item">
                      <TextFormat1
                        header={<span>{item.Department}</span>}
                        data={
                          program.filter((x) => x.DPTCode === item.Code).length
                        }
                      />
                    </li>
                  ))}
              </ul>
            </section>
          </section>
        </main>
      }
      control={
        <>
          <DefaultButton
            class="px-2"
            icon={info.icons.navigation.back}
            text="Back"
            function={() => navigate(-1)}
          />
          <DefaultInput placeholder="Search" id="search" trigger={dataChange} />
          <DefaultDropdown
            class="border p-2"
            reversed={true}
            icon={info.icons.forms.filter}
            dropdownitems={
              <main className="d-flex gap-2 p-3">
                <section>
                  <h6>Department</h6>
                  {department &&
                    department.map((item, i) => (
                      <DefaultDropdownItem
                        key={i}
                        title={item.Department}
                        trigger={() =>
                          setSearch((prev) => ({
                            ...prev,
                            setbyDepartment: item.Code,
                          }))
                        }
                      />
                    ))}
                </section>
              </main>
            }
          />
          <LinkButton
            to={"/program/create/0"}
            class="btn-primary px-2"
            text="Create"
            icon={info.icons.forms.add}
          />
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
              <li
                className={
                  search.setbyDepartment === "" ? "visually-hidden" : ""
                }
              >
                <DefaultButton
                  class="btn-outline-primary px-2"
                  text={
                    department &&
                    department.map((item) =>
                      item.Code === search.setbyDepartment
                        ? item.Department
                        : null
                    )
                  }
                  function={() =>
                    setSearch((prev) => ({
                      ...prev,
                      setbyDepartment: "",
                    }))
                  }
                />
              </li>
            </ul>
          </section>
          <section>
            {program.map((item, i) =>
              item.Program.toLowerCase().includes(
                search.search.toLowerCase()
              ) || search.search === "" ? (
                item.DPTCode.includes(search.setbyDepartment) ||
                search.setbyDepartment === "" ? (
                  <ListCard
                    key={i}
                    slot1={item.Code}
                    slot2={item.Program}
                    slot3={item.Abbrev}
                    slot4={item.DPTCode}
                    slot5={item.AcademicLevel}
                    view={info.icons.forms.view}
                    link={`/program/view/${item.PRGID}`}
                    state={{ data: item }}
                  />
                ) : null
              ) : null
            )}
          </section>
        </main>
      }
    />
  );
}
