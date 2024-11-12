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
  const [isLoading, setIsLoading] = useState(true);
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
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <FileMaintainanceTemplate
        loader={isLoading}
        sidepanel={
          <main className="p-2">
            <header className="mb-3">
              <h5 className="p-0 m-0">Curriculum Details</h5>
              <p>Entries: {curriculum.length} row/s</p>
              <h5>{currentcurriculum.Curriculum}</h5>
              <DefaultButton
                class="w-100 border py-2"
                icon={info.icons.forms.view}
                text={`Current Curriculum`}
                function={() =>
                  navigate(`/curriculum/view/${currentcurriculum.CRRID}`)
                }
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
                  to={"/curriculum/create/0"}
                  state={{
                    curriculum: currentcurriculum[0],
                  }}
                  class="btn-primary px-2"
                  text="Create"
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
                        slot3={"..."}
                        slot4={
                          item.Code === currentcurriculum.Code
                            ? "Active"
                            : "Inactive"
                        }
                        slot5={null}
                        view={info.icons.others.package}
                        link={`/utilities/curriculum/setup/${item.Code}`}
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
