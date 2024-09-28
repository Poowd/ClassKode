import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { LinkButton } from "../../../component/button/LinkButton";
import { ListCard } from "../../../component/card/ListCard";
import useConfiguration from "../../../hook/useConfiguration";
import useHandleChange from "../../../hook/useHandleChange";

export function Curriculum() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [info] = useConfiguration();
  const [get, post, data_get, data_post] = useDatabase();
  const [search, setSearch] = useState({
    search: "",
  });
  const [dataChange] = useHandleChange(setSearch);

  const [curriculum, setCurriculum] = useState([]);
  const [currentcurriculum, setCurrentCurriculum] = useState([]);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    data_get("curriculum-list", setCurriculum);
    data_get("current-curriculum", setCurrentCurriculum);
  }, []);

  useEffect(() => {
    currentcurriculum.map((curr, i) => setCurrent(curr));
  }, [currentcurriculum]);

  return (
    <>
      <FileMaintainanceTemplate
        sidepanel={
          <main>
            <header className="mb-3">
              <h5 className="p-0 m-0">Curriculum Details</h5>
              <p>Entries: {curriculum.length} row/s</p>
              <LinkButton
                class="btn-primary py-2"
                textclass="text-white"
                to={`/curriculum/view/${current.CRRID}`}
                state={{
                  data: current,
                }}
                text={`Current Curriculum`}
                icon={info.icons.forms.view}
              />
            </header>
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
                  class=""
                  icon={info.icons.navigation.back}
                  function={() => navigate(-1)}
                />{" "}
                <DefaultInput
                  placeholder="Search"
                  id="search"
                  trigger={dataChange}
                />
                <LinkButton
                  class="btn-primary px-2"
                  textclass="text-white"
                  to={"/curriculum/create/0"}
                  state={{
                    curriculum: current,
                  }}
                  icon={info.icons.forms.add}
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
              {curriculum.length > 0
                ? curriculum.map((item, i) =>
                    item.Curriculum.toLowerCase().includes(
                      search.search.toLowerCase()
                    ) || search.search === "" ? (
                      <ListCard
                        key={i}
                        slot1={item.Code}
                        slot2={item.Curriculum}
                        slot3={item.Created}
                        slot4={item.Status}
                        slot5={"n/a"}
                        view={info.icons.others.package}
                        link={
                          current.Code === item.Code
                            ? `/utilities/curriculum/setup/${item.Code}`
                            : null
                        }
                        state={null}
                      />
                    ) : null
                  )
                : "none"}
            </section>
          </main>
        }
      />
    </>
  );
}
