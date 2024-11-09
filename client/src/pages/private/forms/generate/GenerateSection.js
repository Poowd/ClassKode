import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../component/button/DefaultButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DataControllerTemplate } from "../../../../layout/grid/DataControllerTemplate";
import { SelectButtonItemSelected } from "../../../../component/dropdown/select/SelectButtonItemSelected";
import { SelectButtonItem } from "../../../../component/dropdown/select/SelectButtonItem";
import { SelectButton } from "../../../../component/dropdown/select/SelectButton";
import useHandleChange from "../../../../hook/useHandleChange";
import useDatabase from "../../../../hook/useDatabase";
import useConfiguration from "../../../../hook/useConfiguration";
import { useToasty } from "../../../../hook/useToasty";
import { DefaultToast } from "../../../../component/toast/DefaultToast";

export function GenerateSection() {
  const navigate = useNavigate();
  const [get, post, data_get, data_post] = useDatabase();
  const [info] = useConfiguration();
  const [toasty, showToast] = useToasty();

  const [sectionlist, setSectionList] = useState([]);
  const [semester, setSemester] = useState([]);
  const [section, setSection] = useState([]);
  const [program, setProgram] = useState([]);
  const [yearlevel, setYearLevel] = useState([]);
  const [data, setData] = useState({
    Code: "",
  });

  const [dataChange] = useHandleChange(setData);

  useEffect(() => {
    data_get("section-list", setSection);
    data_get("program-list", setProgram);
    data_get("year-level-list", setYearLevel);
    data_get("semester-list", setSemester);
  }, [section]);

  var counter = 0;
  const generated_phase1 = [];

  const getSectionDuplicates = (template) => {
    var len = 0;
    section.forEach((sect) => {
      if (sect.Program === data.Code) {
        if (sect.Section.includes(template)) {
          ++len;
        }
      }
    });

    if (len < 10) {
      return `0${++len}`;
    } else {
      return ++len;
    }
  };

  useEffect(() => {
    program.forEach((prg) => {
      yearlevel.forEach((yrl) => {
        semester.forEach((sem) => {
          if (prg.Code === data.Code) {
            if (prg.AcademicLevel === yrl.AcademicLevel) {
              counter++;
              generated_phase1.push({
                Section: `${prg.Abbrev}${counter}${getSectionDuplicates(
                  `${prg.Abbrev}${counter}`
                )}`,
                YearLevel: yrl.YearLevel,
                Program: prg.Code,
                Semester: sem.Semester,
              });
            }
          }
        });
      });
    });

    setSectionList(generated_phase1);
  }, [data.Code]);

  function sleep(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time || 1000);
    });
  }

  async function TestData(data) {
    setTimeout(() => {
      data_post("section-generate", data, setData);
    }, 1000); // 2 second delay
  }

  const submitForm = async (e) => {
    e.preventDefault();
    if (true) {
      for (var i in sectionlist) {
        do {
          try {
            const response = await fetch(
              `${info.conn.server}section-generate`,
              {
                method: "POST",
                body: JSON.stringify(sectionlist[i]),
              }
            );
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        } while (data.Status === "Success");
      }
      showToast(info.icons.others.info, "Sections", `Sections are saved!`);
      setTimeout(() => {
        navigate(-1);
      }, 2500); // 2 second delay
    }
  };

  return (
    <form className="h-100" onSubmit={submitForm}>
      <DataControllerTemplate
        title={"Generates a set of Section"}
        description={"This module creates a generate"}
        control={
          <>
            <DefaultButton
              class="btn-outline-secondary"
              type="button"
              icon={info.icons.navigation.back}
              function={() => navigate(-1)}
            />
            <DefaultButton
              class="btn-success px-2"
              type="submit"
              text="Submit"
            />
          </>
        }
        entryform={
          <>
            <SelectButton
              label="Program"
              id="Code"
              trigger={dataChange}
              required={true}
              option={
                <>
                  <SelectButtonItemSelected
                    content={program.map((option, i) => (
                      <>{option.Code === data.Program ? option.Program : ""}</>
                    ))}
                  />
                  {program.map((option, i) => (
                    <>
                      {data.Program !== option.Code ? (
                        <SelectButtonItem
                          value={option.Code}
                          content={option.Program}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  ))}
                </>
              }
            />
          </>
        }
        entry={
          <main className="py-3">
            <section className="d-flex flex-column gap-2">
              {sectionlist.map((section, i) => (
                <div className="border rounded p-2">
                  {section.Section} - {section.YearLevel}
                </div>
              ))}
            </section>
          </main>
        }
        additional={<></>}
      />
      <DefaultToast
        icon={toasty.icon}
        title={toasty.title}
        content={toasty.content}
      />
    </form>
  );
}
