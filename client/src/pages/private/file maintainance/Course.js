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
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import useHandleChange from "../../../hook/useHandleChange";
import { TextFormat1 } from "../../../component/textformat/TextFormat1";
import { CoffeeLoader } from "../../../component/loader/CoffeeLoader";

export function Course() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState({
    setbyDepartment: "",
    search: "",
  });
  const [dataChange] = useHandleChange(setSearch);

  const [course, setCourse] = useState([]);
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    data_get("course-list", setCourse);
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
            <h5 className="p-0 m-0">Course Details</h5>
            <p>Entries: {course.length} row/s</p>
          </header>
          <section>
            <h6>Department</h6>
            <ul className="list-group list-group-flush">
              {department &&
                department.map((item, i) => (
                  <li key={i} className="list-group-item">
                    <TextFormat1
                      header={<span>{item.Department}</span>}
                      data={
                        course.filter((x) => x.Department === item.Code).length
                      }
                    />
                  </li>
                ))}
            </ul>
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
            to={"/course/create/0"}
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
            {course.map((item, i) =>
              item.Course.toLowerCase().includes(search.search.toLowerCase()) ||
              search.search === "" ? (
                <ListCard
                  key={i}
                  slot1={item.CourseID}
                  slot2={item.Course}
                  slot3={item.SubjectArea}
                  slot4={item.CatalogNo}
                  slot5={item.Status}
                  view={info.icons.forms.view}
                  link={`/course/view/${item.CRSID}`}
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
