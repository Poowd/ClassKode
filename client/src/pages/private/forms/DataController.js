import React, { useEffect } from "react";
import { FileMaintainanceTemplate } from "../../../layout/grid/FileMaintainanceTemplate";
import useGet from "../../../hook/useGet";
import usePost from "../../../hook/usePost";
import { DefaultButton } from "../../../component/button/DefaultButton";
import { GrView } from "react-icons/gr";
import { FormsTemplate } from "../../../layout/grid/FormsTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { DefaultText } from "../../../component/input/DefaultInput";
import { CreateCoach } from "./create/CreateCoach";
import { ViewCoach } from "./view/ViewCoach";
import { EditCoach } from "./edit/EditCoach";
import { CreateDepartment } from "./create/CreateDepartment";
import { ViewDepartment } from "./view/ViewDepartment";
import { ViewProgram } from "./view/ViewProgram";
import { ViewCourse } from "./view/ViewCourse";
import { ViewSection } from "./view/ViewSection";
import { ViewRoom } from "./view/ViewRoom";
import { CreateProgram } from "./create/CreateProgram";
import { CreateCourse } from "./create/CreateCourse";
import { CreateSection } from "./create/CreateSection";
import { CreateRoom } from "./create/CreateRoom";
import { GenerateSection } from "./create/GenerateSection";
import { EditCourse } from "./edit/EditCourse";
import { EditDepartment } from "./edit/EditDepartment";
import { EditProgram } from "./edit/EditProgram";
import { EditRoom } from "./edit/EditRoom";
import { EditSection } from "./edit/EditSection";

export function DataController() {
  const navigate = useNavigate();
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
        <main className="h-100">
          {params.module === "coach" ? (
            params.form === "create" ? (
              <CreateCoach />
            ) : params.form === "view" ? (
              <ViewCoach />
            ) : params.form === "edit" ? (
              <EditCoach />
            ) : (
              () => navigate(-1)
            )
          ) : (
            () => navigate(-1)
          )}
          {params.module === "course" ? (
            params.form === "create" ? (
              <CreateCourse />
            ) : params.form === "view" ? (
              <ViewCourse />
            ) : params.form === "edit" ? (
              <EditCourse />
            ) : (
              () => navigate(-1)
            )
          ) : (
            () => navigate(-1)
          )}
          {params.module === "department" ? (
            params.form === "create" ? (
              <CreateDepartment />
            ) : params.form === "view" ? (
              <ViewDepartment />
            ) : params.form === "edit" ? (
              <EditDepartment />
            ) : (
              () => navigate(-1)
            )
          ) : (
            () => navigate(-1)
          )}
          {params.module === "program" ? (
            params.form === "create" ? (
              <CreateProgram />
            ) : params.form === "view" ? (
              <ViewProgram />
            ) : params.form === "edit" ? (
              <EditProgram />
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : (
              () => navigate(-1)
            )
          ) : (
            () => navigate(-1)
          )}
          {params.module === "room" ? (
            params.form === "create" ? (
              <CreateRoom />
            ) : params.form === "view" ? (
              <ViewRoom />
            ) : params.form === "edit" ? (
              <EditRoom />
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : (
              () => navigate(-1)
            )
          ) : (
            () => navigate(-1)
          )}
          {params.module === "section" ? (
            params.form === "create" ? (
              <CreateSection />
            ) : params.form === "view" ? (
              <ViewSection />
            ) : params.form === "edit" ? (
              <EditSection />
            ) : params.form === "generate" ? (
              <GenerateSection />
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : (
              () => navigate(-1)
            )
          ) : (
            () => navigate(-1)
          )}
        </main>
      }
    />
  );
}
