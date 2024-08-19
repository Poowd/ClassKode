import React, { useEffect, useState } from "react";
import { UtilitiesTemplate } from "../../../layout/grid/UtilitiesTemplate";
import useDatabase from "../../../hook/useDatabase";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { useNavigate } from "react-router-dom";
import { ListCard } from "../../../component/card/ListCard";

export function User() {
  const navigate = useNavigate();
  const [get, post] = useDatabase();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    post("sel-users", users, setUsers);
  }, [users]);

  return (
    <FileMaintainanceTemplate
      sidepanel={<NoDisplay />}
      control={
        <>
          <DefaultButton class="" icon={``} function={() => navigate(-1)} />
          <DefaultInput placeholder="Search" />
          <DefaultDropdown
            class="border p-2"
            reversed={true}
            icon={``}
            dropdownitems={
              <>
                <DefaultDropdownItem title={"Profile"} />
                <hr />
                <DefaultDropdownItem title={"Logout"} />
              </>
            }
          />
          <DefaultButton
            class="btn-primary"
            icon={``}
            function={() => {
              navigate("/institution/coach/create/0");
            }}
          />
        </>
      }
      list={users.map((item, i) => (
        <ListCard
          slot1={item.SCHLID}
          slot2={`${item.FirstName} ${item.LastName}`}
          slot3={item.UUID_Created}
          slot4={item.UserType}
          slot5={item.UUID_Status}
          link={null}
          state={null}
        />
      ))}
    />
  );
}
