import React, { useEffect } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import useGet from "../../../hook/useGet";
import usePost from "../../../hook/usePost";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { GrView } from "react-icons/gr";
import { FormsTemplate } from "../../../layout/grid/FormsTemplate";
import { useParams } from "react-router-dom";
import { DefaultText } from "../../../component/input/DefaultInput";
import { CreateCoach } from "./create/CreateCoach";
import { ViewCoach } from "./view/ViewCoach";

export function DataController() {
  const params = useParams();
  const [getdata, setGetData, getServer] = useGet();
  const [postdata, setPostData, postServer] = usePost();

  useEffect(() => {
    postServer("coach");
    getServer("random-code-generator");
  }, [postdata]);

  return (
    <FormsTemplate
      content={
        <main>
          {params.module === "coach" ? (
            params.form === "create" ? (
              <CreateCoach />
            ) : params.form === "view" ? (
              <ViewCoach />
            ) : params.form === "edit" ? (
              <h1>Edit</h1>
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {params.module === "course" ? (
            params.form === "create" ? (
              <h1>Create</h1>
            ) : params.form === "view" ? (
              <h1>View</h1>
            ) : params.form === "edit" ? (
              <h1>Edit</h1>
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {params.module === "department" ? (
            params.form === "create" ? (
              <h1>Create</h1>
            ) : params.form === "view" ? (
              <h1>View</h1>
            ) : params.form === "edit" ? (
              <h1>Edit</h1>
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {params.module === "program" ? (
            params.form === "create" ? (
              <h1>Create</h1>
            ) : params.form === "view" ? (
              <h1>View</h1>
            ) : params.form === "edit" ? (
              <h1>Edit</h1>
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {params.module === "room" ? (
            params.form === "create" ? (
              <h1>Create</h1>
            ) : params.form === "view" ? (
              <h1>View</h1>
            ) : params.form === "edit" ? (
              <h1>Edit</h1>
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {params.module === "section" ? (
            params.form === "create" ? (
              <h1>Create</h1>
            ) : params.form === "view" ? (
              <h1>View</h1>
            ) : params.form === "edit" ? (
              <h1>Edit</h1>
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </main>
      }
    />
  );
}
