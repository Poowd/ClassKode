import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useConfiguration from "../../../hook/useConfiguration";
import registrar from "../../../assets/imgs/stifacilities/registrar.jpg";
import finance from "../../../assets/imgs/stifacilities/finance.jpg";
import osa from "../../../assets/imgs/stifacilities/osa.jpg";
import library from "../../../assets/imgs/stifacilities/library.jpg";
import fbpage from "../../../assets/imgs/stifacilities/fbpage.png";
import webpage from "../../../assets/imgs/stifacilities/webpage.png";
import sticampus from "../../../assets/imgs/stifacilities/sti-bg-campus-2.jpg";
import { DefaultButton } from "../../../component/button/DefaultButton";

export function DepartmentList() {
  const navigate = useNavigate();
  const [info] = useConfiguration();
  const [selection, setSelection] = useState({
    Image: "",
    DepartmentName: "",
    Description: "",
    Email: "",
    Link: "",
  });

  const [schoolFacilities, setSchoolFacilities] = useState([
    {
      Image: registrar,
      DepartmentName: "Registration Unit",
      Link: "https://www.facebook.com/stimunozregistrar",
      Description: (
        <section>
          <p className="m-0">
            Hello, Click the button to redirect to the link.
          </p>
        </section>
      ),
    },
    {
      Image: finance,
      DepartmentName: "Finance Office",
      Link: "https://www.facebook.com/munoz.sti.finance.office",
      Description: (
        <section>
          <p className="m-0">
            Hello, Click the button to redirect to the link.
          </p>
        </section>
      ),
    },
    {
      Image: osa,
      DepartmentName: "Office of Student Affairs",
      Link: "https://www.facebook.com/STIStudentAffairs",
      Description: (
        <section>
          <p className="m-0">
            Hello, Click the button to redirect to the link.
          </p>
        </section>
      ),
    },
    {
      Image: fbpage,
      DepartmentName: "Facebook",
      Link: "https://www.facebook.com/munoz.sti.edu",
      Description: (
        <section>
          <p className="m-0">
            Hello, Click the button to redirect to the link.
          </p>
        </section>
      ),
    },
    {
      Image: webpage,
      DepartmentName: "Website",
      Link: "https://www.stimunoz.edu.ph",
      Description: (
        <section>
          <p className="m-0">
            Hello, Click the button to redirect to the link.
          </p>
        </section>
      ),
    },
    {
      Image: library,
      DepartmentName: "Library",
      Link: "https://www.facebook.com/stimunoz.library",
      Description: (
        <section>
          <p className="m-0">
            Hello, Click the button to redirect to the link.
          </p>
        </section>
      ),
    },
  ]);

  return (
    <main className="h-100 overflow-y-auto">
      <main className="h-100 row m-0 p-0">
        <section className="col-lg-8 h-100 p-2">
          <main className="bg-white rounded shadow-sm p-3 h-100">
            <main className="h-100 d-flex justify-content-equal align-content-start flex-wrap gap-3">
              {schoolFacilities &&
                schoolFacilities.map((item, item_index) => (
                  <button
                    className="btn border-0 p-0 text-wrap"
                    style={{ width: "12em" }}
                    onClick={() =>
                      setSelection({
                        Image: item.Image,
                        DepartmentName: item.DepartmentName,
                        Link: item.Link,
                        Description: item.Description,
                      })
                    }
                  >
                    <section className="bg-white rounded shadow-sm p-5 d-flex flex-column gap-2 hover-darken">
                      <h2>{info.icons.others.link}</h2>
                      <span className="text-truncate">
                        {item.DepartmentName}
                      </span>
                    </section>
                  </button>
                ))}
            </main>
          </main>
        </section>
        <section className="col-lg-4 p-2">
          <main className="bg-white rounded shadow-sm p-3 h-100 overflow-y-auto">
            <header className="h-50">
              <figure className="w-100 h-100 bg-secondary-subtle rounded shadow-sm">
                <img
                  src={selection.Image !== "" ? selection.Image : sticampus}
                  alt="..."
                  className="w-100 h-100 object-fit-cover border rounded"
                ></img>
              </figure>
            </header>
            <hr />
            <main>
              <section>
                <main className="mb-5">
                  <h5>{selection.DepartmentName}</h5>
                  <p>{selection.Email}</p>
                  <main>{selection.Description}</main>
                </main>
                <Link
                  to={selection.Link}
                  target="_blank"
                  className="primary-gradient btn fw-bold text-dark py-2 px-4"
                >
                  Visit Now!
                </Link>
              </section>
            </main>
          </main>
        </section>
      </main>
    </main>
  );
}
