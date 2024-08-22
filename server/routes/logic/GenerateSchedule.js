import express from "express";
const app = express();

app.post("/gen-class", (req, res) => {
  try {
    var semester = req.body.semester;

    var classes = [];
    var rooms = [];
    var coaches = [];
    var schedules = [];
    var class_schedules = [];

    var coachtype = [];
    var specialize = [];
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    var rom_classes = [];
    var sct_classes = [];

    req.body.classes.map((data, i) => {
      classes.push({
        CRS_Code: data.CRS_Code,
        Course: data.Course,
        Component: data.Component,
        Section: data.Section,
        Population: data.Population,
        Semester: data.Semester,
        Units: data.MaxUnits,
        YearLevel: data.YearLevel,
      });
    });
    req.body.coachtype.map((data, i) => {
      coachtype.push(data);
    });
    req.body.specialize.map((data, i) => {
      specialize.push(data);
    });
    req.body.coaches.map((data, i) => {
      coaches.push({
        SCHLID: data.SCHLID,
        LastName: data.LastName,
        Department: data.DPT_Code,
        CoachType: data.CoachType,
        MaxUnits: data.MaxUnits,
        Units: 0,
      });
    });
    req.body.rooms.map((data, i) => {
      rooms.push({
        Room: data.Room,
        Facility: data.Facility,
        Capacity: data.Capacity,
        Units: 0,
      });
      rom_classes.push({
        room: data.Room,
        units: 0,
        classes: [],
      });
    });
    req.body.sections.map((data, i) => {
      sct_classes.push({
        section: data.Section,
        units: 0,
        classes: [],
      });
    });

    const GenerateSchedule = {
      Phases: {
        coach: function () {
          for (var i = 0; i < classes.length; i++) {
            if (classes[i].Semester === semester) {
              if (!IS_LAB(classes[i].Component)) {
                var coach = ADD_COACH(classes[i].Course);
                schedules.push({
                  ACY: "AY-2425",
                  SCT: classes[i].Section,
                  CRS_CODE: classes[i].CRS_Code,
                  CRS: classes[i].Course,
                  SCHLID: coach.SCHLID,
                  CCH: coach.LastName,
                  CPT: classes[i].Component,
                  UNT: classes[i].Units,
                  SMS: classes[i].Semester,
                  YRLVL: classes[i].YearLevel,
                  ROM: "None",
                  DAY: "None",
                  STR_TME: "None",
                  END_TME: "None",
                  CPC: "None",
                  ROM_UNT: "None",
                  PPL: classes[i].Population,
                  CCH_UNT:
                    ADD_COACH(classes[i].Course).Units + classes[i].Units,
                });
                ADD_UNITS_TO_COACH(coach, classes[i].Units);
                for (var j = 0; j < classes.length; j++) {
                  if (classes[i].Semester === semester) {
                    if (IS_LAB(classes[j].Component)) {
                      if (
                        classes[j].Section === classes[i].Section &&
                        classes[j].Course === classes[i].Course
                      ) {
                        schedules.push({
                          ACY: "AY-2425",
                          SCT: classes[j].Section,
                          CRS_CODE: classes[j].CRS_Code,
                          CRS: classes[j].Course,
                          SCHLID: coach.SCHLID,
                          CCH: coach.LastName,
                          CPT: classes[j].Component,
                          UNT: classes[j].Units,
                          SMS: classes[j].Semester,
                          YRLVL: classes[j].YearLevel,
                          ROM: "None",
                          DAY: "None",
                          STR_TME: "None",
                          END_TME: "None",
                          CPC: "None",
                          ROM_UNT: "None",
                          PPL: classes[j].Population,
                          CCH_UNT:
                            ADD_COACH(classes[j].Course).Units +
                            classes[j].Units,
                        });
                        ADD_UNITS_TO_COACH(coach, classes[j].Units);
                      }
                    }
                  }
                }
              }
            }
          }
        },
        room: function () {
          for (var i = 0; i < days.length; i++) {
            for (var j = 0; j < rooms.length; j++) {
              for (var k = 0; k < schedules.length; k++) {
                if (
                  schedules[k].CPT.includes(rooms[j].Facility) &&
                  schedules[k].PPL <= rooms[j].Capacity &&
                  rooms[j].Units <= 13
                ) {
                  if (
                    conflictSection(
                      rooms[j].Units * 60 + 480,
                      (rooms[j].Units + schedules[k].UNT) * 60 + 480,
                      schedules[k].SCT,
                      days[i]
                    )
                  ) {
                    class_schedules.push({
                      ACY: schedules[k].ACY,
                      CRR: schedules[k].CRR,
                      SCT: schedules[k].SCT,
                      CRS_CODE: schedules[k].CRS_CODE,
                      CRS: schedules[k].CRS,
                      SCHLID: schedules[k].SCHLID,
                      CCH: schedules[k].CCH,
                      CPT: schedules[k].CPT,
                      UNT: schedules[k].UNT,
                      SMS: schedules[k].SMS,
                      YRLVL: schedules[k].YRLVL,
                      ROM: rooms[j].Room,
                      DAY: days[i],
                      STR_TME: rooms[j].Units * 60 + 480,
                      END_TME: (rooms[j].Units + schedules[k].UNT) * 60 + 480,
                      CPC: rooms[j].Capacity,
                      ROM_UNT: rooms[j].Units + schedules[k].UNT,
                      PPL: schedules[k].PPL,
                      CCH_UNT: schedules[k].CCH_UNT,
                      CONFLICT: !conflictSection(
                        rooms[j].Units * 60 + 480,
                        (rooms[j].Units + schedules[k].UNT) * 60 + 480,
                        schedules[k].SCT,
                        days[i]
                      ),
                    });
                    ADD_UNITS_TO_ROOM(rooms[j].Room, schedules[k].UNT);
                    schedules.splice(k, 1);
                    k--;
                  }
                }
              }
            }
          }
        },
      },
    };

    function conflictSection(start_time, end_time, target_section, target_day) {
      for (var i = 0; i < class_schedules.length; i++) {
        if (
          class_schedules[i].SCT === target_section &&
          class_schedules[i].DAY === target_day
        ) {
          if (
            !(
              (start_time < class_schedules[i].st &&
                end_time <= class_schedules[i].st) ||
              (start_time > class_schedules[i].st &&
                end_time >= class_schedules[i].st &&
                class_schedules[i].et <= start_time)
            )
          ) {
            return false;
          }
        }
      }
      return true;
    }

    function ADD_UNITS_TO_ROOM(target_room, course_units) {
      for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].Room === target_room) {
          return (rooms[i].Units += course_units);
        }
      }
    }

    function ADD_UNITS_TO_COACH(target_coach, course_units) {
      for (var i = 0; i < coaches.length; i++) {
        if (coaches[i].LastName === target_coach) {
          return (coaches[i].Units += course_units);
        }
      }
    }

    function ADD_COACH(target_course) {
      for (var i = 0; i < coachtype.length; i++) {
        for (var j = 0; j < coaches.length; j++) {
          if (IS_SPECIALIZED(coaches[j].LastName, target_course)) {
            if (coachtype[i].CoachType === coaches[j].CoachType) {
              if (coaches[j].Units < coachtype[i].MaxUnits - 3) {
                return coaches[j];
              }
            }
          }
        }
      }
    }

    function IS_SPECIALIZED(target_coach, target_course) {
      for (var i = 0; i < specialize.length; i++) {
        if (specialize[i].LastName === target_coach) {
          if (specialize[i].Course === target_course) {
            return true;
          }
        }
      }
      return false;
    }

    function SHUFFLE(target_array) {
      for (let i = target_array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [target_array[i], target_array[j]] = [target_array[j], target_array[i]];
      }
      return target_array;
    }

    function IS_LAB(target_component) {
      if (target_component.includes("Laboratory")) {
        return true;
      }
      return false;
    }

    GenerateSchedule.Phases.coach();
    GenerateSchedule.Phases.room();

    return res.json(class_schedules);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
