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
import { FaUserTimes } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";

export default function useConfiguration() {
  const [info, setInfo] = useState({
    details: {},
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
  });
  return [info];
}
