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
    setbySubjectArea: "",
    search: "",
  });
  const [dataChange] = useHandleChange(setSearch);

  const [course, setCourse] = useState([]);
  const [department, setDepartment] = useState([]);

  const subjectArea = ["CITE", "COSC", "GEDC", "NSTP", "PE Tertiary"];

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
              {subjectArea &&
                subjectArea.map((item, i) => (
                  <li key={i} className="list-group-item">
                    <TextFormat1
                      header={<span>{item}</span>}
                      data={course.filter((x) => x.SubjectArea === item).length}
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
                  <h6>SubjectArea</h6>
                  {subjectArea &&
                    subjectArea.map((item, i) => (
                      <DefaultDropdownItem
                        key={i}
                        title={item}
                        trigger={() =>
                          setSearch((prev) => ({
                            ...prev,
                            setbySubjectArea: item,
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
                  search.setbySubjectArea === "" ? "visually-hidden" : ""
                }
              >
                <DefaultButton
                  class="btn-outline-primary px-2"
                  text={
                    subjectArea &&
                    subjectArea.map((item) =>
                      item === search.setbySubjectArea ? item : null
                    )
                  }
                  function={() =>
                    setSearch((prev) => ({
                      ...prev,
                      setbySubjectArea: "",
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
                search.setbySubjectArea === "" ||
                item.SubjectArea === search.setbySubjectArea ? (
                  <ListCard
                    key={i}
                    slot1={item.CourseID}
                    slot2={item.Course}
                    slot3={`${item.SubjectArea}-${item.CatalogNo}`}
                    slot4={item.Status}
                    slot5={""}
                    view={info.icons.forms.view}
                    link={`/course/view/${item.CRSID}`}
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
