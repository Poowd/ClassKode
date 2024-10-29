import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { Link, useNavigate } from "react-router-dom";
import useDatabase from "../../../hook/useDatabase";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { ListCard } from "../../../component/card/ListCard";
import { LinkButton } from "../../../component/button/LinkButton";
import useConfiguration from "../../../hook/useConfiguration";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import useHandleChange from "../../../hook/useHandleChange";
import { TextFormat1 } from "../../../component/textformat/TextFormat1";

export function Section() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [search, setSearch] = useState({
    setbyProgram: "",
    search: "",
  });
  const [dataChange] = useHandleChange(setSearch);

  const [section, setSection] = useState([]);
  const [program, setProgram] = useState([]);

  useEffect(() => {
    data_get("section-list", setSection);
    data_get("program-list", setProgram);
  }, [section]);

  return (
    <FileMaintainanceTemplate
      sidepanel={
        <main>
          <header className="">
            <h5 className="p-0 m-0">Department Details</h5>
            <p>Entries: {section.length} row/s</p>
          </header>
          <section>
            <section>
              <h6>Academic Level</h6>
              <ul className="list-group list-group-flush">
                {program &&
                  program.map((item, i) => (
                    <li key={i} className="list-group-item">
                      <TextFormat1
                        header={<span>{item.Program}</span>}
                        data={
                          section.filter((x) => x.Program === item.Code).length
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
                  <h6>Program</h6>
                  {program &&
                    program.map((item, i) => (
                      <DefaultDropdownItem
                        key={i}
                        title={item.Program}
                        trigger={() =>
                          setSearch((prev) => ({
                            ...prev,
                            setbyProgram: item.Code,
                          }))
                        }
                      />
                    ))}
                </section>
              </main>
            }
          />
          <LinkButton
            class="btn-outline-primary"
            textclass="text-primary"
            to={"/section/generate/0"}
            icon={info.icons.forms.generate}
          />
          <LinkButton
            class="btn-primary"
            textclass="text-white"
            to={"/section/create/0"}
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
                className={search.setbyProgram === "" ? "visually-hidden" : ""}
              >
                <DefaultButton
                  class="btn-outline-primary px-2"
                  text={
                    program &&
                    program.map((item) =>
                      item.Code === search.setbyProgram ? item.Program : null
                    )
                  }
                  function={() =>
                    setSearch((prev) => ({
                      ...prev,
                      setbyProgram: "",
                    }))
                  }
                />
              </li>
            </ul>
          </section>
          <section>
            {section &&
              section.map((item, i) =>
                item.Section.toLowerCase().includes(
                  search.search.toLowerCase()
                ) || search.search === "" ? (
                  item.Program.includes(search.setbyProgram) ||
                  search.setbyProgram === "" ? (
                    <ListCard
                      key={i}
                      slot1={item.SCTID}
                      slot2={item.Section}
                      slot3={item.YearLevel}
                      slot4={
                        program &&
                        program.map((prg) =>
                          prg.Code === item.Program ? prg.Program : null
                        )
                      }
                      slot5={null}
                      view={info.icons.forms.view}
                      link={`/section/view/${item.SCTID}`}
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
