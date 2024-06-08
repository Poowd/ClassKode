import express from "express";
const app = express();

app.post("/generate-class-schedule", (req, res) => {
  createSchedule();

  function createSchedule() {
    const CurrentSemester = req.body.semester;
    const DayStart = 480; //8:00 am
    const DayEnd = 960; //8:00 pm
    const WeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const WeekDaysScheduled = {
      Monday: DayStart,
      Tuesday: DayStart,
      Wednesday: DayStart,
      Thursday: DayStart,
      Friday: DayStart,
    };

    var EmptryArray = [];
    var SetOfScheduled = [];
    var TempRoom = [];
    var TempCoach = [];

    const ListofCoach = [];
    req.body.coach.map((coach) => {
      ListofCoach.push(coach);
    });

    const ListofCourse = [];
    req.body.course.map((course) => {
      ListofCourse.push(course);
    });

    const ListofRoom = [];
    req.body.room.map((room) => {
      ListofRoom.push(room);
    });

    shuffleArray(ListofRoom);

    //DaysWeekDaysScheduled
    for (let i = 0; i < WeekDays.length; i++) {
      var TempDayStart = DayStart;
      shuffleArray(ListofCourse);
      //Room
      for (let j = 0; j < ListofRoom.length; j++) {
        var RoomUnits = 0;
        //Course
        for (let k = 0; k < ListofCourse.length; k++) {
          //shuffleArray(WeekDays);

          ListofCoach.map((coach) => {
            coach.CourseName === ListofCourse[k].CourseName
              ? TempCoach.push(coach)
              : "";
          });

          if (checkCoachExisting(TempCoach.length) === false) {
            var data = EmptryArray;
            return res.json({ data: data, Status: "Failed" });
          }

          shuffleArray(TempCoach);

          if (
            ListofRoom[j].Type === assignCoursesToRoom(ListofCourse[k].Type) &&
            ListofRoom[j].Capacity >= ListofCourse[k].SCT_Population
          ) {
            if (checkRoomUnits(TempRoom, ListofRoom[j].RoomName) < 600) {
              if (ListofCourse[k].Semester === CurrentSemester) {
                if (checkCoachAvailability(TempCoach[0].LastName)) {
                  var st =
                    DayStart + checkRoomUnits(TempRoom, ListofRoom[j].RoomName);
                  var et =
                    DayStart + checkRoomUnits(TempRoom, ListofRoom[j].RoomName);
                  et += convertUnitsTime(ListofCourse[k].AssignedUnits);

                  var sectionNoConflict = true;
                  for (var p in SetOfScheduled) {
                    if (
                      SetOfScheduled[p].Section === ListofCourse[k].SectionName
                    ) {
                      if (SetOfScheduled[p].Day === WeekDays[i]) {
                        if (SetOfScheduled[p].RawEndTime > st) {
                          sectionNoConflict = false;
                          console.log("Conflicted");
                        }
                      }
                    }
                  }
                  switch (WeekDays[i]) {
                    case "Wednesday":
                      if (setTimeFormat(st) === "1:00 PM") {
                        st += 180;
                      } else if (setTimeFormat(st) === "2:00 PM") {
                        st += 60;
                      } else if (setTimeFormat(et) === "2:00 PM") {
                        break;
                      }
                    default:
                      if (sectionNoConflict === true) {
                        SetOfScheduled.push({
                          CRRID: ListofCourse[k].CRRID,
                          CRSID: ListofCourse[k].CRSID,
                          SCTID: ListofCourse[k].SCTID,
                          RMID: ListofRoom[j].RMID,
                          CCHID: TempCoach[0].CCHID,
                          AYID: ListofCourse[k].AYID,
                          Semester: req.body.semester,
                          CourseCode: ListofCourse[k].CourseCode,
                          CourseName: ListofCourse[k].CourseName,
                          Section: ListofCourse[k].SectionName,
                          CourseLevel: ListofCourse[k].CourseLevel,
                          Day: WeekDays[i],
                          RawStartTime: st,
                          RawEndTime: et,
                          StartTime: setTimeFormat(st),
                          EndTime: setTimeFormat(et),
                          Time: setTimeFormat(st).concat(
                            " - ",
                            setTimeFormat(et)
                          ),
                          Room: ListofRoom[j].RoomName,
                          LessonType: ListofCourse[k].Type,
                          Coach: TempCoach[0].LastName,
                          Capacity: ListofRoom[j].Capacity,
                          Population: ListofCourse[k].SCT_Population,
                        });
                        TempRoom.push({
                          Room: ListofRoom[j].RoomName,
                          TimeSlot: convertUnitsTime(
                            ListofCourse[k].AssignedUnits
                          ),
                        });
                        WeekDaysScheduled[WeekDays[i]] += convertUnitsTime(
                          ListofCourse[k].AssignedUnits
                        );
                        ListofCourse.splice(k, 1);
                        k--;
                      }
                  }
                }
              } else {
                shuffleArray(TempCoach);
              }
            }
          }
          while (TempCoach.length > 0) {
            TempCoach.pop();
          }
        }
      }
      TempDayStart = 0;
    }

    console.log(TempRoom);

    var counter = 0;
    var tempCourses = [];

    req.body.course.map((course) => {
      tempCourses.push(course);
    });

    for (var q in tempCourses) {
      if (tempCourses[q].Semester === req.body.semester) {
        counter++;
      }
    }

    if (SetOfScheduled.length === counter) {
      var data = SetOfScheduled;
      return res.json({ data: data, Status: "Success" });
    } else if (SetOfScheduled.length !== counter) {
      createSchedule();
      console.log("re-enter");
    }
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function setTimeFormat(time) {
    var Hour = Math.floor(time / 60); //convert minutes to hours
    const Minute = time / 60 - Hour; //convert minutes to hours minus the hour to get the remainder
    const Cycle = Hour >= 12 ? "PM" : "AM";
    Hour = Hour % 12 || 12;
    const tempMinute = Minute > 0 ? "30" : "00";
    const Format = Hour + ":" + tempMinute.toString() + " " + Cycle;
    return Format;
  }

  function convertUnitsTime(units) {
    const ConvertedUnits = units * 60;
    return ConvertedUnits;
  }

  function checkRoomUnits(Rooms, CurrentRoom) {
    var TempRoomUnits = 0;
    for (let j in Rooms) {
      if (CurrentRoom === Rooms[j].Room) {
        TempRoomUnits += Rooms[j].TimeSlot;
      }
    }
    return TempRoomUnits;
  }

  function assignCoursesToRoom(ClassType) {
    const RoomType1 = "Regular Room";
    const RoomType2 = "Laboratory";
    switch (ClassType) {
      case "Tutorial":
        return RoomType1;
      case "Lecture":
        return RoomType1;
      case "Laboratory":
        return RoomType2;
    }
  }

  function checkCoachExisting(Coach) {
    if (Coach > 0) {
      return true;
    }
    return false;
  }

  function checkCoachAvailability(Coach) {
    SetOfScheduled.map((schedule) => {
      if (schedule.Coach === Coach) {
        return false;
      }
    });
    return true;
  }
});

export default app;
