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

export function Room() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState({
    setbyFloor: "",
    setbyBuilding: "",
    setbyFacility: "",
    search: "",
  });
  const [dataChange] = useHandleChange(setSearch);

  const [room, setRoom] = useState([]);
  const [facility, setFacility] = useState([]);
  const [building, setBuilding] = useState([]);
  const [floor, setFloor] = useState([]);

  useEffect(() => {
    data_get("room-list", setRoom);
    data_get("facility-list", setFacility);
    data_get("building-list", setBuilding);
    data_get("floor-list", setFloor);
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
            <h5 className="p-0 m-0">Room Details</h5>
            <p>Entries: {room.length} row/s</p>
          </header>
          <section>
            <section className="mb-3">
              <h6>Facilty</h6>
              <ul className="list-group list-group-flush">
                {facility &&
                  facility.map((item, i) => (
                    <li key={i} className="list-group-item">
                      <TextFormat1
                        header={<span>{item.Facility}</span>}
                        data={
                          room.filter((x) => x.Facility === item.Facility)
                            .length
                        }
                      />
                    </li>
                  ))}
              </ul>
            </section>
            <section className="mb-3">
              <h6>Building</h6>
              <ul className="list-group list-group-flush">
                {building &&
                  building.map((item, i) => (
                    <li key={i} className="list-group-item">
                      <TextFormat1
                        header={<span>{item.Building}</span>}
                        data={
                          room.filter((x) => x.Building === item.Building)
                            .length
                        }
                      />
                    </li>
                  ))}
              </ul>
            </section>
            <section className="mb-3">
              <h6>Floor</h6>
              <ul className="list-group list-group-flush">
                {floor &&
                  floor.map((item, i) => (
                    <li key={i} className="list-group-item">
                      <TextFormat1
                        header={<span>{item.Floor}</span>}
                        data={room.filter((x) => x.Floor === item.Floor).length}
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
                  <h6>Facilty</h6>
                  {facility &&
                    facility.map((item, i) => (
                      <DefaultDropdownItem
                        key={i}
                        title={item.Facility}
                        trigger={() =>
                          setSearch((prev) => ({
                            ...prev,
                            setbyFacility: item.Facility,
                          }))
                        }
                      />
                    ))}
                </section>
                <section>
                  <h6>Building</h6>
                  {building &&
                    building.map((item, i) => (
                      <DefaultDropdownItem
                        key={i}
                        title={item.Building}
                        trigger={() =>
                          setSearch((prev) => ({
                            ...prev,
                            setbyBuilding: item.Building,
                          }))
                        }
                      />
                    ))}
                </section>
                <section>
                  <h6>Floor</h6>
                  {floor &&
                    floor.map((item, i) => (
                      <DefaultDropdownItem
                        key={i}
                        title={item.Floor}
                        trigger={() =>
                          setSearch((prev) => ({
                            ...prev,
                            setbyFloor: item.Floor,
                          }))
                        }
                      />
                    ))}
                </section>
              </main>
            }
          />
          <LinkButton
            to={"/room/create/0"}
            class="primary-gradient px-2"
            text="Create"
            icon={info.icons.forms.add}
          />
        </>
      }
      list={
        <main>
          <section>
            <ul className="p-0 m-0 mb-2 d-flex gap-2">
              <li className={search.search === "" ? "visually-hidden" : ""}>
                <DefaultButton
                  class="primary-outline-gradient px-2"
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
                className={search.setbyFacility === "" ? "visually-hidden" : ""}
              >
                <DefaultButton
                  class="primary-outline-gradient px-2"
                  text={search.setbyFacility}
                  function={() =>
                    setSearch((prev) => ({
                      ...prev,
                      setbyFacility: "",
                    }))
                  }
                />
              </li>
              <li
                className={search.setbyBuilding === "" ? "visually-hidden" : ""}
              >
                <DefaultButton
                  class="primary-outline-gradient px-2"
                  text={search.setbyBuilding}
                  function={() =>
                    setSearch((prev) => ({
                      ...prev,
                      setbyBuilding: "",
                    }))
                  }
                />
              </li>
              <li className={search.setbyFloor === "" ? "visually-hidden" : ""}>
                <DefaultButton
                  class="primary-outline-gradient px-2"
                  text={search.setbyFloor}
                  function={() =>
                    setSearch((prev) => ({
                      ...prev,
                      setbyFloor: "",
                    }))
                  }
                />
              </li>
            </ul>
          </section>
          <section>
            {room.map((item, i) =>
              item.Room.toLowerCase().includes(search.search.toLowerCase()) ||
              search.search === "" ? (
                item.Facility.includes(search.setbyFacility) ||
                search.setbyFacility === "" ? (
                  item.Building.includes(search.setbyBuilding) ||
                  search.setbyBuilding === "" ? (
                    item.Floor.includes(search.setbyFloor) ||
                    search.setbyFloor === "" ? (
                      <ListCard
                        slot1={item.Building}
                        slot2={`${
                          !item.Room.includes("Laboratory") ? "Room" : ""
                        } ${item.Room}`}
                        slot3={`${item.Facility}`}
                        slot4={`${item.Floor}`}
                        slot5={null}
                        view={info.icons.forms.view}
                        link={`/room/view/${item.ROMID}`}
                        state={{ data: item }}
                      />
                    ) : null
                  ) : null
                ) : null
              ) : null
            )}
          </section>
        </main>
      }
    />
  );
}
