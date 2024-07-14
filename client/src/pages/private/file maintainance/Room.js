import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { GrView } from "react-icons/gr";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import useDatabase from "../../../hook/useDatabase";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { ListCard } from "../../../component/card/ListCard";

export function Room() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [data, setData] = useState([]);
  const [code, setCode] = useState("");

  useEffect(() => {
    post("room", data, setData);
  }, [data]);

  useEffect(() => {
    get("random-code-generator", setCode);
  }, []);

  return (
    <FileMaintainanceTemplate
      sidepanel={<NoDisplay />}
      control={
        <>
          <DefaultInput placeholder="Search" />
          <DefaultButton class="btn-outline-primary" icon={<PiGearSixFill />} />
          <Link to={"/institution/room/create/0"}>
            <DefaultButton class="btn-primary" icon={<RiStickyNoteAddLine />} />
          </Link>
        </>
      }
      list={data.map((item, i) => (
        <ListCard
          slot1={item.ROMID}
          slot2={item.Room}
          slot3={item.ROM_Created}
          slot4={item.Facility}
          slot5={
            <span>
              {item.Building} - {item.Floor}
            </span>
          }
          link={"/institution/room/view/" + item.ROMID}
          state={{ data: item }}
        />
      ))}
    />
  );
}
