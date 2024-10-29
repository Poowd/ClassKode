import React from "react";
import { FormsTemplate } from "../../../layout/grid/FormsTemplate";
import { useNavigate, useParams } from "react-router-dom";

import { CreateCoach } from "./file maintainance/create/CreateCoach";
import { CreateDepartment } from "./file maintainance/create/CreateDepartment";
import { CreateProgram } from "./file maintainance/create/CreateProgram";
import { CreateCourse } from "./file maintainance/create/CreateCourse";
import { CreateSection } from "./file maintainance/create/CreateSection";
import { CreateRoom } from "./file maintainance/create/CreateRoom";

import { ViewCoach } from "./file maintainance/view/ViewCoach";
import { ViewDepartment } from "./file maintainance/view/ViewDepartment";
import { ViewProgram } from "./file maintainance/view/ViewProgram";
import { ViewCourse } from "./file maintainance/view/ViewCourse";
import { ViewSection } from "./file maintainance/view/ViewSection";
import { ViewRoom } from "./file maintainance/view/ViewRoom";

import { EditCoach } from "./file maintainance/edit/EditCoach";
import { EditCourse } from "./file maintainance/edit/EditCourse";
import { EditDepartment } from "./file maintainance/edit/EditDepartment";
import { EditProgram } from "./file maintainance/edit/EditProgram";
import { EditRoom } from "./file maintainance/edit/EditRoom";
import { EditSection } from "./file maintainance/edit/EditSection";

import { CreateSchedule } from "./utilities/create/CreateSchedule";
import { CreateCurriculum } from "./utilities/create/CreateCurriculum";
import { CreateAcademicYear } from "./utilities/create/CreateAcademicYear";

import { ViewCurriculum } from "./utilities/view/ViewCurriculum";
import { ViewAcademicYear } from "./utilities/view/ViewAcademicYear";
import { CreateSetup } from "./utilities/create/CreateSetup";
import { CreateAssignment } from "./utilities/create/CreateAssignment";
import { CreateProjection } from "./utilities/create/CreateProjection";
import { EditCurriculum } from "./utilities/edit/EditCurriculum";

import { GenerateSection } from "./generate/GenerateSection";
import { GenerateSchedule } from "./generate/GenerateSchedule";
import { GenerateUsers } from "./generate/GenerateUsers";

import { ViewSetup } from "./view/ViewSetup";
import { ViewAssignment } from "./view/ViewAssignment";
import { ViewProjection } from "./view/ViewProjection";
import { GenerateExaminations } from "./generate/GenerateExaminations";
import { EditSchedule } from "./utilities/edit/EditSchedule";
import { CreateUser } from "./misc/create/CreateUser";
import { EditUser } from "./misc/edit/EditUser";
export function DataController() {
  const params = useParams();

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
            ) : null
          ) : null}
          {params.module === "course" ? (
            params.form === "create" ? (
              <CreateCourse />
            ) : params.form === "view" ? (
              <ViewCourse />
            ) : params.form === "edit" ? (
              <EditCourse />
            ) : null
          ) : null}
          {params.module === "department" ? (
            params.form === "create" ? (
              <CreateDepartment />
            ) : params.form === "view" ? (
              <ViewDepartment />
            ) : params.form === "edit" ? (
              <EditDepartment />
            ) : null
          ) : null}
          {params.module === "program" ? (
            params.form === "create" ? (
              <CreateProgram />
            ) : params.form === "view" ? (
              <ViewProgram />
            ) : params.form === "edit" ? (
              <EditProgram />
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : null
          ) : null}
          {params.module === "room" ? (
            params.form === "create" ? (
              <CreateRoom />
            ) : params.form === "view" ? (
              <ViewRoom />
            ) : params.form === "edit" ? (
              <EditRoom />
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : null
          ) : null}
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
            ) : null
          ) : null}
          {params.module === "curriculum" ? (
            params.form === "create" ? (
              <CreateCurriculum />
            ) : params.form === "view" ? (
              <ViewCurriculum />
            ) : params.form === "edit" ? (
              <EditCurriculum />
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : null
          ) : null}
          {params.module === "academic-year" ? (
            params.form === "create" ? (
              <CreateAcademicYear />
            ) : params.form === "view" ? (
              <ViewAcademicYear />
            ) : params.form === "edit" ? (
              <h1>temp edit</h1>
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : null
          ) : null}
          {params.module === "assignment" ? (
            params.form === "create" ? (
              <CreateAssignment />
            ) : params.form === "view" ? (
              <ViewAssignment />
            ) : params.form === "edit" ? (
              <h1>temp edit</h1>
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : null
          ) : null}
          {params.module === "projection" ? (
            params.form === "create" ? (
              <CreateProjection />
            ) : params.form === "view" ? (
              <ViewProjection />
            ) : params.form === "edit" ? (
              <h1>temp edit</h1>
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : null
          ) : null}
          {params.module === "setup" ? (
            params.form === "create" ? (
              <CreateSetup />
            ) : params.form === "view" ? (
              <ViewSetup />
            ) : params.form === "edit" ? (
              <h1>temp edit</h1>
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : null
          ) : null}
          {params.module === "schedule" ? (
            params.form === "create" ? (
              <CreateSchedule />
            ) : params.form === "view" ? (
              <h1>temp view</h1>
            ) : params.form === "generate" ? (
              <GenerateSchedule />
            ) : params.form === "edit" ? (
              <EditSchedule />
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : null
          ) : null}
          {params.module === "examinations" ? (
            params.form === "create" ? (
              <CreateSchedule />
            ) : params.form === "view" ? (
              <h1>temp view</h1>
            ) : params.form === "generate" ? (
              <GenerateExaminations />
            ) : params.form === "edit" ? (
              <h1>temp edit</h1>
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : null
          ) : null}
          {params.module === "user" ? (
            params.form === "create" ? (
              <CreateUser />
            ) : params.form === "view" ? (
              <h1>temp view</h1>
            ) : params.form === "generate" ? (
              <GenerateUsers />
            ) : params.form === "edit" ? (
              <EditUser />
            ) : params.form === "archive" ? (
              <h1>Archive</h1>
            ) : null
          ) : null}
        </main>
      }
    />
  );
}
