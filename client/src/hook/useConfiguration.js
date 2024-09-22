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
import carou_item2 from "./../assets/imgs/background/sti-wallpaper-1.png";
import carou_item3 from "./../assets/imgs/background/sti-wallpaper-2.jpg";

import lape from "./../assets/imgs/misc/lape.jpg";
import esporsado from "./../assets/imgs/misc/esporsado.JPG";
import silverio from "./../assets/imgs/misc/silverio.JPG";
import oliveros from "./../assets/imgs/misc/oliveros.JPG";

import scheduler from "./../assets/imgs/misc/Scheduler.png";
import locator from "./../assets/imgs/misc/Locator.png";
import team from "./../assets/imgs/misc/Team.png";
import host from "./../assets/imgs/misc/Host.png";

export default function useConfiguration() {
  const [info, setInfo] = useState({
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
          Name: "Joshua Oliveros",
          Role: "Thesis Adviser",
          Image: oliveros,
        },
        {
          Name: "Jerome Silverio",
          Role: "Thesis Coordinator",
          Image: silverio,
        },
        {
          Name: "Cristelyn Esporsado",
          Role: "Thesis Coordinator",
          Image: esporsado,
        },
      ],
      carousel: {
        item1: {
          Title: "",
          Subtitle: "",
          Image: carou_item1,
        },
        item2: {
          Title: "",
          Subtitle: "",
          Image: carou_item2,
        },
        item3: {
          Title: "",
          Subtitle: "",
          Image: carou_item3,
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
          department: null,
          program: null,
          course: null,
          section: null,
          coach: null,
          room: null,
        },
        utilities: {
          curriculum: null,
          academicyear: null,
          schedule: null,
          locator: null,
        },
        misc: {
          archive: null,
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
      },
      navigation: {
        menu: <BsMenuButtonWideFill />,
        back: <IoArrowBackOutline />,
        next: <GrNext />,
        previous: <GrPrevious />,
      },
      add: <GrChapterAdd />,
      generate: <VscSettingsGear />,
      edit: <TbEdit />,
      archive: <MdFolderDelete />,
      view: <TbListDetails />,
      search: <FaSearch />,
      filter: <FaFilter />,
      users: <HiOutlineUserGroup />,
      user: <HiOutlineUser />,
      calendar: <FaRegCalendarAlt />,
      curriculum: <LuNewspaper />,
      schedule: <RiCalendarScheduleLine />,
      events: <MdOutlineEmojiEvents />,
      package: <LuPackageOpen />,
      program: <FaBook />,
      course: <FaBookOpen />,
      department: <FaRegBuilding />,
      menu: <BsMenuButtonWideFill />,
      back: <IoArrowBackOutline />,
      hiddenuser: <FaUserSecret />,
      help: <LuHelpCircle />,
      restore: <MdRestore />,
      quicknav: <MdOutlineQuickreply />,
      close: <IoIosClose />,
      reset: <GrPowerReset />,
      set: <VscSettings />,
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
