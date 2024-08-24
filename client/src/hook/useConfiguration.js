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

export default function useConfiguration() {
  const [info, setInfo] = useState({
    icons: {
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
    },
  });

  return [info];
}
