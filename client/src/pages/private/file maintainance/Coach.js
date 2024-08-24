import React, { useEffect, useState } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { Link, useNavigate } from "react-router-dom";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import useDatabase from "../../../hook/useDatabase";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { ListCard } from "../../../component/card/ListCard";
import useConfiguration from "../../../hook/useConfiguration";
import { LinkButton } from "../../../component/button/LinkButton";

export function Coach() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const [info] = useConfiguration();

  const [data, setData] = useState([]);

  useEffect(() => {
    post("sel-coach", data, setData);
  }, [data]);

  return (
    <FileMaintainanceTemplate
      sidepanel={<NoDisplay />}
      control={
        <>
          <DefaultButton
            class=""
            icon={info.icons.back}
            function={() => navigate(-1)}
          />
          <DefaultInput placeholder="Search" />
          <DefaultDropdown
            class="border p-2"
            reversed={true}
            icon={info.icons.filter}
            dropdownitems={
              <>
                <DefaultDropdownItem title={"Profile"} />
                <hr />
                <DefaultDropdownItem title={"Logout"} />
              </>
            }
          />
          <LinkButton
            to={"/coach/create/0"}
            class="btn-primary"
            textclass="text-white"
            icon={info.icons.add}
          />
        </>
      }
      list={data.map((item, i) => (
        <ListCard
          slot1={item.SCHLID}
          slot2={`${item.FirstName} ${
            item.MiddleInitial !== null ? " " + item.MiddleInitial + ". " : " "
          } ${item.LastName}`}
          slot3={item.CCH_Created}
          slot4={item.Department}
          slot5={item.Email}
          view={info.icons.view}
          link={`/coach/view/${item.CCHID}`}
          state={{ data: item }}
        />
      ))}
    />
  );
}
