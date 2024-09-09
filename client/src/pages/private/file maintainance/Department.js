import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { Link, useNavigate } from "react-router-dom";
import useDatabase from "../../../hook/useDatabase";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { ListCard } from "../../../component/card/ListCard";
import useConfiguration from "../../../hook/useConfiguration";
import { LinkButton } from "../../../component/button/LinkButton";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import useHandleChange from "../../../hook/useHandleChange";
import { TextFormat1 } from "../../../component/textformat/TextFormat1";
import useItemCounter from "../../../hook/useItemCounter";

export function Department() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const [info] = useConfiguration();
  const [search, setSearch] = useState({
    setbyAcadLevel: "",
    search: "",
  });
  const [dataChange] = useHandleChange(setSearch);

  const [department, setDepartment] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);

  useEffect(() => {
    get("department/list", setDepartment);
    get("academic-level/list", setAcademicLevel);
  }, [department]);

  return (
    <FileMaintainanceTemplate
      sidepanel={
        <main>
          <header className="">
            <h5 className="p-0 m-0">Department Details</h5>
            <p>Entries: {department.length} row/s</p>
          </header>
          <section>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <TextFormat1
                  header={<span>{info.icons.pages.users.ter} Tertiary</span>}
                  data={
                    department.filter((x) => x.AcademicLevel === "Tertiary")
                      .length
                  }
                />
              </li>
              <li className="list-group-item">
                <TextFormat1
                  header={<span>{info.icons.pages.users.shs} SHS</span>}
                  data={
                    department.filter(
                      (x) => x.AcademicLevel === "Senior High School"
                    ).length
                  }
                />
              </li>
            </ul>
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
              <>
                {academiclevel &&
                  academiclevel.map((item, i) => (
                    <DefaultDropdownItem
                      key={i}
                      title={item.AcademicLevel}
                      trigger={() =>
                        setSearch((prev) => ({
                          ...prev,
                          setbyAcadLevel: item.AcademicLevel,
                        }))
                      }
                    />
                  ))}
              </>
            }
          />
          <LinkButton
            to={"/department/create/0"}
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
                  search.setbyAcadLevel === "" ? "visually-hidden" : ""
                }
              >
                <DefaultButton
                  class="btn-outline-primary px-2"
                  text={search.setbyAcadLevel}
                  function={() =>
                    setSearch((prev) => ({
                      ...prev,
                      setbyAcadLevel: "",
                    }))
                  }
                />
              </li>
            </ul>
          </section>
          <section>
            {department.map((item, i) =>
              item.Department.toLowerCase().includes(
                search.search.toLowerCase()
              ) || search.search === "" ? (
                item.AcademicLevel.includes(search.setbyAcadLevel) ||
                search.setbyAcadLevel === "" ? (
                  <ListCard
                    slot1={item.Code}
                    slot2={item.Department}
                    slot3={item.Created}
                    slot4={item.Abbrev}
                    slot5={item.AcademicLevel}
                    view={info.icons.view}
                    link={`/department/view/${item.DPTID}`}
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
