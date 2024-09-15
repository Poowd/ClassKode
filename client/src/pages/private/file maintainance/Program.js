import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { Link, useNavigate } from "react-router-dom";
import useDatabase from "../../../hook/useDatabase";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { ListCard } from "../../../component/card/ListCard";
import useConfiguration from "../../../hook/useConfiguration";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { LinkButton } from "../../../component/button/LinkButton";
import useHandleChange from "../../../hook/useHandleChange";
import { TextFormat1 } from "../../../component/textformat/TextFormat1";

export function Program() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const [info] = useConfiguration();
  const [search, setSearch] = useState({
    setbyDepartment: "",
    search: "",
  });
  const [dataChange] = useHandleChange(setSearch);

  const [program, setProgram] = useState([]);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    get("program/list", setProgram);
    get("department/list", setDepartment);
  }, [program]);

  return (
    <FileMaintainanceTemplate
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
                    <li className="list-group-item">
                      <TextFormat1
                        header={<span>{item.Department}</span>}
                        data={
                          program.filter((x) => x.Department === item.Code)
                            .length
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
            class=""
            icon={info.icons.back}
            function={() => navigate(-1)}
          />
          <DefaultInput placeholder="Search" id="search" trigger={dataChange} />
          <DefaultDropdown
            class="border p-2"
            reversed={true}
            icon={info.icons.filter}
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
            class="btn-primary"
            textclass="text-white"
            icon={info.icons.add}
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
                item.Department.includes(search.setbyDepartment) ||
                search.setbyDepartment === "" ? (
                  <ListCard
                    slot1={item.Code}
                    slot2={item.Program}
                    slot3={item.Created}
                    slot4={item.Abbrev}
                    slot5={
                      department &&
                      department.map((dept) =>
                        dept.Code === item.Department ? dept.Department : null
                      )
                    }
                    view={info.icons.view}
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
