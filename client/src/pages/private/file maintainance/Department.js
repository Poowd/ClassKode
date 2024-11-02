import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { Link, useNavigate } from "react-router-dom";
import useDatabase from "../../../hook/useDatabase";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { ListCard } from "../../../component/card/ListCard";
import useConfiguration from "../../../hook/useConfiguration";
import { LinkButton } from "../../../component/button/LinkButton";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import useHandleChange from "../../../hook/useHandleChange";
import { TextFormat1 } from "../../../component/textformat/TextFormat1";
import { FullscreenLoader } from "../../../component/loader/FullscreenLoader";
import { Loader } from "../../../component/loader/Loader";
import { CoffeeLoader } from "../../../component/loader/CoffeeLoader";

export function Department() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState({
    setbyAcadLevel: "",
    search: "",
  });
  const [dataChange] = useHandleChange(setSearch);

  const [department, setDepartment] = useState([]);
  const [academiclevel, setAcademicLevel] = useState([]);

  useEffect(() => {
    data_get("department-list", setDepartment);
    data_get("academic-level-list", setAcademicLevel);
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
            <h5 className="p-0 m-0">Department Details</h5>
            <p>Entries: {department.length} row/s</p>
          </header>
          <section>
            <section>
              {/*<h6>Details</h6>
              <ul className="list-group list-group-flush">
                 {academiclevel &&
                  academiclevel.map((item, i) => (
                    <li key={i} className="list-group-item">
                      <TextFormat1
                        header={<span>{item.AcademicLevel}</span>}
                        data={
                          department.filter(
                            (x) => x.AcademicLevel === item.AcademicLevel
                          ).length
                        }
                      />
                    </li>
                  ))} 
              </ul>*/}
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
                  {/* <h6>Academic Level</h6>
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
                    ))} */}
                </section>
              </main>
            }
          />
          <LinkButton
            to={"/department/create/0"}
            class="btn-primary"
            textclass="text-white"
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
            {department &&
              department.map((item, i) =>
                item.Department.toLowerCase().includes(
                  search.search.toLowerCase()
                ) || search.search === "" ? (
                  <ListCard
                    key={i}
                    slot1={item.Code}
                    slot2={item.Department}
                    slot3={item.Abbrev}
                    slot4={null}
                    slot5={item.AcademicLevel}
                    view={info.icons.forms.view}
                    link={`/department/view/${item.DPTID}`}
                    state={{ data: item }}
                  />
                ) : null
              )}
          </section>
        </main>
      }
    />
  );
}
