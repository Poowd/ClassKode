const express = require("express");
const router = express.Router();

router.post("/gen-class", (req, res) => {
  const clientData = JSON.parse(req.body);

  const startofday = 420;

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

  var academicyear = clientData.academicyear;

  clientData.classes.map((data, i) => {
    classes.push({
      CRS_Code: data.coursecode,
      Course: data.Course,
      Component: data.Component,
      Section: data.Section,
      Population: data.Population,
      Units: parseInt(data.MaxUnits), //converting text.json to float
      YearLevel: data.YearLevel,
    });
  });
  clientData.coachtype.map((data, i) => {
    coachtype.push(data);
  });
  clientData.specialize.map((data, i) => {
    specialize.push(data);
  });
  clientData.coaches.map((data, i) => {
    coaches.push({
      SCHLID: data.SCHLID,
      LastName: data.LastName,
      Department: data.Department,
      CoachType: data.CoachType,
      MaxUnits: data.MAX,
      Units: 0,
    });
  });
  clientData.rooms.map((data, i) => {
    for (var j in days) {
      rooms.push({
        Day: days[j],
        Room: data.Room,
        Facility: data.Facility,
        Capacity: data.Capacity,
        Units: 0,
      });
    }
    rom_classes.push({
      room: data.Room,
      units: 0,
      classes: [],
    });
  });
  clientData.sections.map((data, i) => {
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
          if (!IS_LAB(classes[i].Component)) {
            var coach = ADD_COACH(classes[i].CRS_Code);
            schedules.push({
              ACY: academicyear.Code,
              SCT: classes[i].Section,
              CRS_CODE: classes[i].CRS_Code,
              CRS: classes[i].Course,
              SCHLID: coach.SCHLID,
              CCH: coach.LastName,
              CPT: classes[i].Component,
              UNT: classes[i].Units,
              YRLVL: classes[i].YearLevel,
              ROM: "None",
              DAY: "None",
              STR_TME: "None",
              END_TME: "None",
              CPC: "None",
              ROM_UNT: "None",
              PPL: classes[i].Population,
              CCH_UNT: coach.Units + classes[i].Units,
            });
            for (var p = 0; p < sct_classes.length; p++) {
              if (sct_classes[p].section === classes[i].Section) {
                sct_classes[p].units += classes[i].Units;
                sct_classes[p].classes.push(classes[i].CRS_Code);
              }
            }
            ADD_UNITS_TO_COACH(coach, classes[i].Units);
            for (var j = 0; j < classes.length; j++) {
              if (IS_LAB(classes[j].Component)) {
                if (
                  classes[j].Section === classes[i].Section &&
                  classes[j].Course === classes[i].Course
                ) {
                  schedules.push({
                    ACY: academicyear.Code,
                    SCT: classes[j].Section,
                    CRS_CODE: classes[j].CRS_Code,
                    CRS: classes[j].Course,
                    SCHLID: coach.SCHLID,
                    CCH: coach.LastName,
                    CPT: classes[j].Component,
                    UNT: classes[j].Units,
                    YRLVL: classes[j].YearLevel,
                    ROM: "None",
                    DAY: "None",
                    STR_TME: "None",
                    END_TME: "None",
                    CPC: "None",
                    ROM_UNT: "None",
                    PPL: classes[j].Population,
                    CCH_UNT:
                      ADD_COACH(classes[j].CRS_Code).Units + classes[j].Units,
                  });
                  ADD_UNITS_TO_COACH(coach, classes[j].Units);
                }
              }
            }
          }
        }
      },
      room: function () {
        for (var j = 0; j < rooms.length; j++) {
          for (var k = 0; k < schedules.length; k++) {
            if (
              (!IS_LAB(schedules[k].CPT) &&
                schedules[k].CPT.includes(rooms[j].Facility)) ||
              (IS_LAB(schedules[k].CPT) &&
                schedules[k].CPT === rooms[j].Facility)
            ) {
              if (
                schedules[k].PPL <= rooms[j].Capacity &&
                rooms[j].Units <= 14 - 3
              ) {
                if (
                  conflictSection(
                    rooms[j].Units * 60 + startofday,
                    (rooms[j].Units + schedules[k].UNT) * 60 + startofday,
                    schedules[k].SCT,
                    rooms[j].Day,
                    schedules[k].CCH
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
                    YRLVL: schedules[k].YRLVL,
                    ROM: rooms[j].Room,
                    DAY: rooms[j].Day,
                    STR_TME: rooms[j].Units * 60 + startofday,
                    END_TME:
                      rooms[j].Units * 60 + startofday + schedules[k].UNT * 60,
                    CPC: rooms[j].Capacity,
                    ROM_UNT: rooms[j].Units + schedules[k].UNT,
                    PPL: schedules[k].PPL,
                    CCH_UNT: schedules[k].CCH_UNT,
                    CONFLICT: !conflictSection(
                      rooms[j].Units * 60 + startofday,
                      (rooms[j].Units + schedules[k].UNT) * 60 + startofday,
                      schedules[k].SCT,
                      rooms[j].Day,
                      schedules[k].CCH
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

  function conflictSection(
    start_time,
    end_time,
    target_section,
    target_day,
    target_coach
  ) {
    for (var i = 0; i < class_schedules.length; i++) {
      if (class_schedules[i].SCT === target_section) {
        if (class_schedules[i].DAY === target_day) {
          if (
            !(
              (+start_time < +class_schedules[i].STR_TME &&
                +end_time <= +class_schedules[i].STR_TME) ||
              (+start_time > +class_schedules[i].STR_TME &&
                +end_time >= +class_schedules[i].STR_TME &&
                +class_schedules[i].END_TME <= +start_time)
            )
          ) {
            //if (class_schedules[i].CCH === target_coach) {
            console.log("conflict");
            return false;
            //}
          }
        }
      }
    }
    return true;
  }

  function ADD_UNITS_TO_ROOM(target_room, course_units) {
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].Room === target_room) {
        rooms[i].Units += course_units;
      }
    }
  }

  function ADD_UNITS_TO_COACH(target_coach, course_units) {
    for (var i = 0; i < coaches.length; i++) {
      if (coaches[i].LastName === target_coach) {
        coaches[i].Units += course_units;
      }
    }
  }

  function ADD_COACH(target_course) {
    for (var i = 0; i < coachtype.length; i++) {
      for (var j = 0; j < coaches.length; j++) {
        if (IS_SPECIALIZED(coaches[j].SCHLID, target_course)) {
          if (coachtype[i].Type === coaches[j].CoachType) {
            if (coaches[j].Units < coachtype[i].MAX - 3) {
              return coaches[j];
            }
          }
        }
      }
    }
    return {
      SCHLID: "0",
      LastName: "n/a",
      Department: "n/a",
      CoachType: "n/a",
      MaxUnits: "0",
      Units: 0,
    };
  }

  function IS_SPECIALIZED(target_coach, target_course) {
    for (var i = 0; i < specialize.length; i++) {
      if (specialize[i].Coach === target_coach) {
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

  SHUFFLE(classes);
  GenerateSchedule.Phases.coach();
  GenerateSchedule.Phases.room();
  console.log(sct_classes);
  //console.log(rooms);

  return res.json(class_schedules);
});

module.exports = router;
