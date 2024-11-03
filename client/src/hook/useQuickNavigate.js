import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useQuickNavigate() {
  const navigate = useNavigate();
  async function QuickNavigate(input) {
    try {
      //=>
      if (/list department/g.test(input)) {
        return navigate(`/institution/department`);
      }
      if (/list program/g.test(input)) {
        return navigate(`/institution/program`);
      }
      if (/list course/g.test(input)) {
        return navigate(`/institution/course`);
      }
      if (/list coach/g.test(input)) {
        return navigate(`/institution/coach`);
      }
      if (/list section/g.test(input)) {
        return navigate(`/institution/section`);
      }
      if (/list room/g.test(input)) {
        return navigate(`/institution/room`);
      }
      //=>
      if (/coach [0-9]{11}/g.test(input)) {
        return navigate(`/coach/view/${input.slice(6)}`);
      }
      if (/department [A-Z0-9]{1,15}/g.test(input)) {
        return navigate(`/department/view/${input.slice(11)}`);
      }
      // Navigation for Course (using CRS_Code)
      if (/course [A-Z0-9]{1,15}/g.test(input)) {
        return navigate(`course/view/${input.slice(7)}`);
      }

      // Navigation for Section (using Section name)
      if (/section [A-Za-z0-9]{1,15}/g.test(input)) {
        return navigate(`section/view/${input.slice(8)}`);
      }

      // Navigation for Room (using Room name)
      if (/room [A-Za-z0-9]{1,15}/g.test(input)) {
        return navigate(`room/view/${input.slice(5)}`);
      }

      // Navigation for Program (using PRG_Code)
      if (/program [A-Z0-9]{1,15}/g.test(input)) {
        return navigate(`program/view/${input.slice(8)}`);
      }

      return alert("Can't");
    } catch (err) {
      alert(err);
    }
  }
  return [QuickNavigate];
}
