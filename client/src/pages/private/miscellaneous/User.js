import React, { useEffect, useState } from "react";
import useDatabase from "../../../hook/useDatabase";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { DefaultDropdownItem } from "../../../component/dropdown/default/DefaultDropdownItem";
import { DefaultDropdown } from "../../../component/dropdown/default/DefaultDropdown";
import { DefaultInput } from "../../../component/input/DefaultInput";
import { NoDisplay } from "../../../component/placeholder/NoDisplay";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import { useNavigate } from "react-router-dom";
import { ListCard } from "../../../component/card/ListCard";
import useConfiguration from "../../../hook/useConfiguration";

export function User() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [users, setUsers] = useState([]);
  const [info] = useConfiguration();

  useEffect(() => {
    data_get("user-list", setUsers);
  }, []);

  return (
    <FileMaintainanceTemplate
      sidepanel={<NoDisplay />}
      control={
        <>
          <DefaultButton
            class=""
            icon={info.icons.navigation.back}
            function={() => navigate(-1)}
          />
          <DefaultInput placeholder="Search" />
          <DefaultDropdown
            class="border p-2"
            reversed={true}
            icon={info.icons.forms.filter}
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
            icon={info.icons.forms.generate}
            function={() => {
              navigate("/user/generate/0");
            }}
          />
          <DefaultButton
            class="btn-primary"
            icon={info.icons.forms.add}
            function={() => {
              navigate("");
            }}
          />
        </>
      }
      list={
        users &&
        users.map((item) => (
          <ListCard
            slot1={item.SCHLID}
            slot2={`${item.FirstName} ${item.LastName}`}
            slot3={item.Email}
            slot4={`${item.UserType} ${item.PermissionLevel}`}
            slot5={
              item.AcademicCode !== null ? item.AcademicCode : "Not Registered"
            }
            view={info.icons.details}
            link={null}
            state={null}
          />
        ))
      }
    />
  );
}
