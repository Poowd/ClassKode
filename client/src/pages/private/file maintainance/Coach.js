import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import useGet from "../../../hook/useGet";
import usePost from "../../../hook/usePost";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { GrView } from "react-icons/gr";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { PiGearSixFill } from "react-icons/pi";
import { FaFilter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";

import useDatabase from "../../../hook/useDatabase";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { ViewCard } from "../../../component/card/ViewCard";
import { ListCard } from "../../../component/card/ListCard";

export function Coach() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();

  const [data, setData] = useState([]);
  const [code, setCode] = useState("");

  useEffect(() => {
    post("coach", data, setData);
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
          <DefaultDropdown
            class="border p-2"
            reversed={true}
            icon={<FaFilter />}
            dropdownitems={
              <>
                <DefaultDropdownItem title={"Profile"} />
                <DefaultDropdownItem title={"Contact"} />
                <DefaultDropdownItem title={"Visit us"} />
                <hr />
                <DefaultDropdownItem title={"Logout"} />
              </>
            }
          />
          <DefaultButton class="btn-outline-primary" icon={<PiGearSixFill />} />
          <DefaultButton
            class="btn-primary"
            icon={<RiStickyNoteAddLine />}
            function={() => {
              navigate("/institution/coach/create/0");
            }}
          />
        </>
      }
      list={data.map((item, i) => (
        <ListCard
          slot1={item.SCHLID}
          slot2={
            <>
              {item.FirstName + " "}
              {item.MiddleInitial !== (null || "")
                ? " " + item.MiddleInitial + ". "
                : " "}
              {item.LastName + " "}
            </>
          }
          slot3={item.CCH_Created}
          slot4={item.DPT_Abbreviation}
          slot5={<>{item.Email}</>}
          link={"/institution/coach/view/" + item.CCHID}
          state={{ data: item }}
        />
      ))}
    />
  );
}
