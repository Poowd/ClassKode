import "../../App.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../src/assets/imgs/logo/ClassKode Logo (3).png";
import mainlogo from "../../../src/assets/imgs/logo/ClassKode Logo (1).png";
import useConfiguration from "../../hook/useConfiguration";
import { DefaultButton } from "../../component/button/DefaultButton";
import reader from "../../assets/imgs/misc/owie.png";
import { LandingPageTopbar } from "../../component/topbar/LandingPageTopbar";

export function Features() {
  const navigate = useNavigate();
  const [info] = useConfiguration();
  return (
    <main className="vh-100 overflow-hidden">
      <main className="h-100 overflow-y-auto my-0 py-0 position-relative">
        <LandingPageTopbar />
      </main>
    </main>
  );
}
