import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { MdFolderDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { LuPackageOpen } from "react-icons/lu";
import { FaBook } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { GrChapterAdd } from "react-icons/gr";
import { VscSettingsGear } from "react-icons/vsc";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaUserSecret } from "react-icons/fa6";
import { LuHelpCircle } from "react-icons/lu";
import { MdRestore } from "react-icons/md";
import { MdOutlineQuickreply } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { VscSettings } from "react-icons/vsc";
import { FaUserGear } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FaHighlighter } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa";
import { FcComboChart } from "react-icons/fc";
import { FcPrint } from "react-icons/fc";
import { IoAlertCircle } from "react-icons/io5";
import { FcOrganization } from "react-icons/fc";
import { FcOvertime } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcBriefcase } from "react-icons/fc";
import { FcDepartment } from "react-icons/fc";
import { FcSearch } from "react-icons/fc";
import { FcGraduationCap } from "react-icons/fc";
import { FcFolder } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import { FcPodiumWithoutSpeaker } from "react-icons/fc";
import { FcPlanner } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";
import { FcClock } from "react-icons/fc";
import { FcPackage } from "react-icons/fc";
import { FcList } from "react-icons/fc";
import { FcReadingEbook } from "react-icons/fc";
import { FcServices } from "react-icons/fc";

import m1 from "./../assets/imgs/stimap/m1.png";
import m2 from "./../assets/imgs/stimap/m2.png";
import m3 from "./../assets/imgs/stimap/m3.png";
import a1 from "./../assets/imgs/stimap/a1.png";
import a2 from "./../assets/imgs/stimap/a2.png";
import a3 from "./../assets/imgs/stimap/a3.png";
import b1 from "./../assets/imgs/stimap/b1.png";
import b2 from "./../assets/imgs/stimap/b2.png";
import b3 from "./../assets/imgs/stimap/b3.png";
import temp_dp from "./../assets/imgs/misc/char.png";

import carou_item1 from "./../assets/imgs/background/sti-bg-campus.jpg";
import carou_item2 from "./../assets/imgs/background/sti-bg-campus-2.jpg";
import carou_item3 from "./../assets/imgs/background/sti-wallpaper-2.jpg";

import lape from "./../assets/imgs/misc/lape.jpg";
import esporsado from "./../assets/imgs/misc/esporsado.JPG";
import silverio from "./../assets/imgs/misc/silverio.JPG";
import oliveros from "./../assets/imgs/misc/oliveros.JPG";

import scheduler from "./../assets/imgs/misc/Scheduler.png";
import locator from "./../assets/imgs/misc/Locator.png";
import team from "./../assets/imgs/misc/Team.png";
import host from "./../assets/imgs/misc/Host.png";
import { useNavigate } from "react-router-dom";

export default function useConfiguration() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    conn: {
      server: "http://localhost:8081/",
      client: "",
    },
    details: {
      app_name: "Class Kode",
      sub_name: "Scheduling and Faculty Locator",
      dev_team: [
        {
          Name: "Mark Lape",
          Role: "Leader / Project Manager",
          Image: lape,
        },
        {
          Name: "Yranimez Repil",
          Role: "Backend Developer",
          Image: temp_dp,
        },
        {
          Name: "James Gereña",
          Role: "Backend / Manager Assistant",
          Image: temp_dp,
        },
        {
          Name: "Mia Maddara",
          Role: "Documentation",
          Image: temp_dp,
        },
        {
          Name: "Aeron Pagaoa",
          Role: "Documentation Support",
          Image: temp_dp,
        },
      ],
      special_thanks: [
        {
          Name: "Jerome Silverio",
          Role: "Thesis Coordinator",
          Image: silverio,
        },
        {
          Name: "Joshua Oliveros",
          Role: "Thesis Adviser",
          Image: oliveros,
        },
        {
          Name: "Cristelyn Esporsado",
          Role: "Thesis Coordinator",
          Image: esporsado,
        },
      ],
      carousel: {
        item1: {
          Title: "Effortless Class Scheduling",
          Subtitle: "Streamline Your Academic Journey",
          Description:
            "Say goodbye to scheduling conflicts! Our intuitive platform allows you to easily book classes, manage your timetable, and stay organized throughout the semester.",
          Image: carou_item1,
          Button: (
            <button
              className="ms-3 rounded-pill btn btn-danger px-5 py-2"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login Now
            </button>
          ),
        },
        item2: {
          Title: "Connect with Faculty",
          Subtitle: "Your Professors, Just a Click Away",
          Description:
            "Locate your faculty members with ease. Access their office hours, contact information, and more to ensure you get the guidance you need for your studies.",
          Image: carou_item2,
          Button: (
            <button
              className="ms-3 rounded-pill btn btn-danger px-5 py-2"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login Now
            </button>
          ),
        },
        item3: {
          Title: "Stay Updated",
          Subtitle: "Real-Time Notifications",
          Description:
            "Never miss an update again! Receive instant notifications about class changes, events, and important announcements directly to your device.",
          Image: carou_item3,
          Button: (
            <button
              className="ms-3 rounded-pill btn btn-danger px-5 py-2"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login Now
            </button>
          ),
        },
      },
      content: {
        content1: {
          Title: "",
          SubTitle: "",
          Content: "",
          Image: scheduler,
        },
        content2: {
          Title: "",
          SubTitle: "",
          Content: "",
          Image: locator,
        },
        content3: {
          Title: "",
          SubTitle: "",
          Content: "",
          Image: team,
        },
        content4: {
          Title: "",
          SubTitle: "",
          Content: "",
          Image: host,
        },
      },
    },
    icons: {
      pages: {
        institution: {
          department: <FaRegBuilding />,
          program: <FaBook />,
          course: <FaBookOpen />,
          section: <HiOutlineUserGroup />,
          coach: <HiOutlineUser />,
          room: null,
          curriculum: <LuNewspaper />,
          academicyear: null,
        },
        utilities: {
          schedule: <RiCalendarScheduleLine />,
          locator: null,
        },
        misc: {
          archive: <MdFolderDelete />,
          user: null,
          setup: null,
          log: null,
        },
        users: {
          shs: <FaHighlighter />,
          ter: <FaUserGraduate />,
        },
      },
      usertypes: {
        developer: <FaUserEdit />,
        manager: <FaUserTie />,
        admin: <FaUserGear />,
        user: <FaUserFriends />,
        invalid: <FaUserSecret />,
      },
      forms: {
        view: <TbListDetails />,
        add: <GrChapterAdd />,
        edit: <TbEdit />,
        archive: <MdFolderDelete />,
        generate: <VscSettingsGear />,
        reset: <GrPowerReset />,
        set: <VscSettings />,
        filter: <FaFilter />,
        search: <FaSearch />,
        restore: <MdRestore />,
        reset: <GrPowerReset />,
        set: <VscSettings />,
      },
      navigation: {
        menu: <BsMenuButtonWideFill />,
        back: <IoArrowBackOutline />,
        next: <GrNext />,
        previous: <GrPrevious />,
        quicknav: <MdOutlineQuickreply />,
        close: <IoIosClose />,
      },
      modules: {
        dashboard: <FcComboChart />,
        institution: <FcOrganization />,
        scheduler: <FcOvertime />,
        locator: <FcSearch />,
        misc: <FcBriefcase />,

        department: <FcDepartment />,
        program: <FcGraduationCap />,
        course: <FcFolder />,
        coach: <FcManager />,
        section: <FcConferenceCall />,
        room: <FcPodiumWithoutSpeaker />,

        curriculum: <FcViewDetails />,
        academicyear: <FcPlanner />,

        schedules: <FcClock />,

        facultylocator: <FcBusinessman />,

        archives: <FcPackage />,
        logs: <FcList />,
        users: <FcReadingEbook />,
        settings: <FcServices />,
        reports: <FcPrint />,
      },
      others: {
        calendar: <FaRegCalendarAlt />,
        package: <LuPackageOpen />,
        events: <MdOutlineEmojiEvents />,
        menu: <BsMenuButtonWideFill />,
        hiddenuser: <FaUserSecret />,
        help: <LuHelpCircle />,
        info: <IoAlertCircle />,
      },
    },
    maps: {
      m1: (
        <figure className="w-100 h-100 d-flex justify-content-center">
          <img src={m1} alt="m1" className="h-100"></img>
        </figure>
      ),
      m2: (
        <figure className="w-100 h-100 d-flex justify-content-center">
          <img src={m2} alt="m2" className="h-100"></img>
        </figure>
      ),
      m3: (
        <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
          <img src={m3} alt="m3" className="h-100"></img>
        </figure>
      ),
      a1: (
        <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
          <img src={a1} alt="a1" className="h-50"></img>
        </figure>
      ),
      a2: (
        <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
          <img src={a2} alt="a2" className="h-50"></img>
        </figure>
      ),
      a3: (
        <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
          <img src={a3} alt="a3" className="h-50"></img>
        </figure>
      ),
      b1: (
        <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
          <img src={b1} alt="b1" className="h-100"></img>
        </figure>
      ),
      b2: (
        <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
          <img src={b2} alt="b2" className="h-100"></img>
        </figure>
      ),
      b3: (
        <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
          <img src={b3} alt="b3" className="h-100"></img>
        </figure>
      ),
    },
  });
  return [info];
}
