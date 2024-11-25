import React, { useState } from "react";
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
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaUserSecret } from "react-icons/fa6";
import { MdRestore } from "react-icons/md";
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
import { FaListUl } from "react-icons/fa";
import { PiCheckFatFill } from "react-icons/pi";
import { RiAlarmWarningFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { FaGear } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";
import { FaCameraRetro } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";

import m1 from "./../assets/imgs/stimap/m1.png";
import m2 from "./../assets/imgs/stimap/m2.png";
import m3 from "./../assets/imgs/stimap/m3.png";
import a1 from "./../assets/imgs/stimap/a1.png";
import a2 from "./../assets/imgs/stimap/a2.png";
import a3 from "./../assets/imgs/stimap/a3.png";
import b1 from "./../assets/imgs/stimap/b1.png";
import b2 from "./../assets/imgs/stimap/b2.png";
import b3 from "./../assets/imgs/stimap/b3.png";

import cl1 from "./../assets/imgs/stimap/roommap/cl1.png";
import cl2 from "./../assets/imgs/stimap/roommap/cl2.png";
import cl3 from "./../assets/imgs/stimap/roommap/cl3.png";
import cl4 from "./../assets/imgs/stimap/roommap/cl4.png";
import m301 from "./../assets/imgs/stimap/roommap/301m.png";
import m302 from "./../assets/imgs/stimap/roommap/302m.png";
import m303 from "./../assets/imgs/stimap/roommap/303m.png";
import m304 from "./../assets/imgs/stimap/roommap/304m.png";
import thesisr from "./../assets/imgs/stimap/roommap/thesisr.png";
import englab from "./../assets/imgs/stimap/roommap/englab.png";
import confe from "./../assets/imgs/stimap/roommap/confe.png";
import hr1 from "./../assets/imgs/stimap/roommap/hr1.png";
import scilab from "./../assets/imgs/stimap/roommap/scilab.png";
import kitlab1 from "./../assets/imgs/stimap/roommap/kitlab1.png";
import kitlab2 from "./../assets/imgs/stimap/roommap/kitlab2.png";
import kitlab3 from "./../assets/imgs/stimap/roommap/kitlab3.png";
import dinelab from "./../assets/imgs/stimap/roommap/dinelab.png";
import bar from "./../assets/imgs/stimap/roommap/bar.png";
import court from "./../assets/imgs/stimap/roommap/court.png";
import drawlab from "./../assets/imgs/stimap/roommap/drawlab.png";
import b101 from "./../assets/imgs/stimap/roommap/101b.png";
import b102 from "./../assets/imgs/stimap/roommap/102b.png";
import b103 from "./../assets/imgs/stimap/roommap/103b.png";
import b104 from "./../assets/imgs/stimap/roommap/104b.png";
import b105 from "./../assets/imgs/stimap/roommap/105b.png";
import b106 from "./../assets/imgs/stimap/roommap/106b.png";
import b107 from "./../assets/imgs/stimap/roommap/107b.png";
import b201 from "./../assets/imgs/stimap/roommap/201b.png";
import b202 from "./../assets/imgs/stimap/roommap/202b.png";
import b203 from "./../assets/imgs/stimap/roommap/203b.png";
import b204 from "./../assets/imgs/stimap/roommap/204b.png";
import b205 from "./../assets/imgs/stimap/roommap/205b.png";
import b206 from "./../assets/imgs/stimap/roommap/206b.png";
import avr1 from "./../assets/imgs/stimap/roommap/avr1.png";
import avr2 from "./../assets/imgs/stimap/roommap/avr2.png";
import avr3 from "./../assets/imgs/stimap/roommap/avr3.png";

import lape from "./../assets/imgs/misc/lape.jpg";
import gerena from "./../assets/imgs/misc/gerena.jpg";
import repil from "./../assets/imgs/misc/repil.jpg";
import maddara from "./../assets/imgs/misc/maddara.jpg";
import pagaoa from "./../assets/imgs/misc/pagaoa.png";
import esporsado from "./../assets/imgs/misc/esporsado.JPG";
import silverio from "./../assets/imgs/misc/silverio.JPG";
import oliveros from "./../assets/imgs/misc/oliveros.JPG";
import vinarao from "./../assets/imgs/misc/vinarao.JPG";

import scheduler from "./../assets/imgs/misc/Scheduler.png";
import locator from "./../assets/imgs/misc/Locator.png";
import team from "./../assets/imgs/misc/Team.png";
import host from "./../assets/imgs/misc/Host.png";
import { Link, useNavigate } from "react-router-dom";
import { HiLightningBolt } from "react-icons/hi";

export default function useConfiguration() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    conn: {
      server: "http://localhost:8081/",
      client: "http://localhost:3000/",
    },
    details: {
      app_name: "Class Kode",
      sub_name: "Scheduling and Faculty Locator",
      introduction:
        "Class Kode: Web-Based Scheduling System and Faculty Locator for STI College Muñoz-EDSA will enhance the current process of plotting and managing the schedules and enable users to locate faculty members using a locator.",
      details:
        "A web-based system designed to enhance the plotting and managing of the schedules. The system can detect and resolve the conflicts of plotting the schedules such as overlapping time, day, sections, coaches, and room assignments. It will make sure to maximize and utilize the use of school facilities by ensuring the allocation of rooms and providing exact details of the school facility. Aside from that, the system has a faculty locator for users to know the specific location of coaches.",
      about: [
        {
          title: "Class Kode",
          subtitle: "Class Scheduling and Faculty Locator System",
          description: (
            <article className="px-5">
              <h6>Scheduling System</h6>
              <p>
                A scheduling system is a software application designed to manage
                and organize the allocation of time slots for classes, exams,
                and other events within an educational institution. It automates
                the process of creating, modifying, and optimizing schedules,
                ensuring that resources such as classrooms and instructors are
                effectively utilized. By employing algorithms, such as genetic
                algorithms, these systems can handle complex scheduling
                scenarios, detect conflicts, and provide flexible options for
                users.
              </p>
              <h6>Faculty Locator</h6>
              <p>
                A faculty locator is a tool that helps students and staff
                identify the locations and availability of faculty members
                within an institution. This system typically includes a database
                of faculty profiles, which may contain information such as
                names, departments, images, and current status (e.g., available,
                in a meeting). The faculty locator enhances communication and
                accessibility, allowing students to easily find and connect with
                their instructors.
              </p>
            </article>
          ),
        },
        {
          title: "Class Schedules and Faculty Locator",
          subtitle:
            "Significance of Scheduling in Areas with Limited Resources",
          description: (
            <article className="px-5">
              <ul>
                <li>
                  <p className="m-0 fw-semibold">
                    Maximizing Resource Efficiency
                  </p>
                  <p>
                    Educational institutions often face constraints in terms of
                    available classrooms, faculty, and time. A scheduling system
                    helps optimize the use of these limited resources, ensuring
                    that classes and exams are scheduled in a way that minimizes
                    conflicts and maximizes occupancy.
                  </p>
                </li>
                <li>
                  <p className="m-0 fw-semibold">Improving Accessibility</p>
                  <p>
                    In areas where faculty members may be spread across multiple
                    locations or campuses, a faculty locator provides essential
                    information that helps students find their instructors
                    quickly. This is particularly important in resource-limited
                    settings where personal interactions may be less frequent.
                  </p>
                </li>
                <li>
                  <p className="m-0 fw-semibold">Enhancing Learning Outcomes</p>
                  <p>
                    By streamlining the scheduling process and improving faculty
                    accessibility, these systems contribute to a more organized
                    and supportive learning environment. This can lead to better
                    academic performance and student satisfaction, which is
                    vital in areas striving for educational improvement.
                  </p>
                </li>
              </ul>
            </article>
          ),
        },
        {
          title: "STI College Muñoz-EDSA",
          subtitle: "Educational Institution",
          description: (
            <article className="px-5">
              <p>
                STI College is one of the largest networks of educational
                institutions in the Philippines, with over 63 campuses
                nationwide. Established in 1983, STI has built a reputation for
                providing quality education and training that prepares students
                for the demands of the modern workforce. The college offers a
                wide array of programs across various fields, including
                Information Technology, Hospitality and Tourism, Multimedia
                Arts, and Business and Accountancy.
              </p>
              <p>
                STI College is committed to delivering superior learning systems
                that equip students with the skills and knowledge necessary to
                be future-ready. The institution emphasizes practical training
                and real-world applications, ensuring that graduates are
                well-prepared to enter the job market or pursue further
                education. With its focus on quality and innovation, STI College
                continues to play a significant role in shaping the educational
                landscape in the Philippines.
              </p>
            </article>
          ),
        },
      ],
      features: [
        {
          title: "Flexible Schedules",
          subtitle: "",
          description: (
            <article className="px-5">
              <h6>Purpose</h6>
              <p>
                The flexible schedule feature is designed to improve the
                adaptability of class and exam timetables within educational
                institutions. By utilizing a genetic algorithm, the system
                automates the scheduling process, enabling the creation of
                schedules that can be easily modified and reused.
              </p>
              <h6>Advantages</h6>
              <ul>
                <li>
                  <p className="m-0 fw-semibold">Efficiency</p>
                  <p>
                    Automating the scheduling process significantly reduces the
                    time and effort required for manual scheduling, which can
                    often be cumbersome and prone to errors.
                  </p>
                </li>
                <li>
                  <p className="m-0 fw-semibold">Customization</p>
                  <p>
                    Flexible schedules accommodate diverse student needs and
                    preferences, taking into account various learning styles and
                    commitments.
                  </p>
                </li>
                <li>
                  <p className="m-0 fw-semibold">Resource Optimization</p>
                  <p>
                    By reusing schedules, schools can maximize resource use,
                    ensuring classes and exams are held at optimal times.
                  </p>
                </li>
              </ul>
              <h6>Expansions</h6>
              <p className="m-0">
                This feature can include real-time adjustments based on
                unforeseen circumstances, such as instructor availability or
                changes in student enrollment. Additionally, integrating machine
                learning could enhance the algorithm's ability to predict and
                adapt to scheduling conflicts proactively.
              </p>
            </article>
          ),
        },
        {
          title: "Conflict Detection",
          subtitle: "",
          description: (
            <article className="px-5">
              <h6>Purpose</h6>
              <p>
                Conflict detection is essential for maintaining a smooth
                scheduling process. This feature identifies and resolves
                potential conflicts arising from overlapping classes, exams, or
                resource allocations.
              </p>
              <h6>Advantages</h6>
              <ul>
                <li>
                  <p className="m-0 fw-semibold">Improved Coordination</p>
                  <p>
                    The system automatically detects conflicts, ensuring all
                    stakeholders are aware of scheduling issues before they
                    escalate.
                  </p>
                </li>
                <li>
                  <p className="m-0 fw-semibold">Enhanced User Experience</p>
                  <p>
                    Students and faculty can rely on the system for clear and
                    conflict-free schedules, reducing frustration and confusion.
                  </p>
                </li>
                <li>
                  <p className="m-0 fw-semibold">Time Savings</p>
                  <p>
                    Resolving conflicts early in the scheduling process saves
                    time for administrators who would otherwise need to address
                    these issues manually.
                  </p>
                </li>
              </ul>
              <h6>Expansions</h6>

              <p className="m-0">
                Future enhancements could include predictive analytics that
                forecast potential conflicts based on historical data, allowing
                for preemptive adjustments. Additionally, integrating user
                feedback mechanisms could refine conflict resolution strategies.
              </p>
            </article>
          ),
        },
        {
          title: "Room Utilization",
          subtitle: "",
          description: (
            <article className="px-5">
              <h6>Purpose</h6>
              <p>
                This feature optimizes the use of school facilities by tracking
                and analyzing room occupancy and specifications, providing
                insights into space utilization throughout the academic year.
              </p>
              <h6>Advantages</h6>
              <ul>
                <li>
                  <p className="m-0 fw-semibold">Maximized Resource Use</p>
                  <p>
                    Understanding room usage patterns allows schools to allocate
                    spaces more effectively, preventing underutilization of
                    facilities.
                  </p>
                </li>
                <li>
                  <p className="m-0 fw-semibold">Data-Driven Decisions</p>
                  <p>
                    Detailed occupancy statistics enable administrators to make
                    informed decisions regarding facility management and future
                    expansions.
                  </p>
                </li>
                <li>
                  <p className="m-0 fw-semibold">Cost Efficiency</p>
                  <p>
                    Improved room utilization can lead to cost savings by
                    reducing the need for additional facilities or renovations.
                  </p>
                </li>
              </ul>
              <h6>Expansions</h6>

              <p className="m-0">
                The system could be enhanced with real-time occupancy tracking
                through IoT devices, offering live data on room usage. Moreover,
                integrating this feature with scheduling could enable dynamic
                room assignments based on current needs.
              </p>
            </article>
          ),
        },
        {
          title: "Faculty Locator",
          subtitle: "",
          description: (
            <article className="px-5">
              <h6>Purpose</h6>
              <p>
                The faculty locator feature is designed to help students and
                staff easily find the locations of instructors and coaches
                within the institution. It provides important details about each
                faculty member, enhancing communication and accessibility.
              </p>
              <h6>Advantages</h6>
              <ul>
                <li>
                  <p className="m-0 fw-semibold">Increased Accessibility</p>
                  <p>
                    Students can quickly locate their instructors, fostering
                    better communication and support.
                  </p>
                </li>
                <li>
                  <p className="m-0 fw-semibold">Enhanced Engagement</p>
                  <p>
                    Knowing where faculty members are located encourages
                    students to seek help or engage in discussions.
                  </p>
                </li>
                <li>
                  <p className="m-0 fw-semibold">Streamlined Operations</p>
                  <p>
                    This feature helps administrative staff manage faculty
                    assignments and availability more effectively.
                  </p>
                </li>
              </ul>
              <h6>Expansions</h6>

              <p className="m-0">
                Future developments could include a mobile application that
                allows users to access the faculty locator on the go.
                Additionally, integrating a messaging feature could facilitate
                direct communication between students and faculty.
              </p>
            </article>
          ),
        },
        {
          title: "Schedule Related Reports",
          subtitle: "",
          description: (
            <article className="px-5">
              <h6>Purpose</h6>
              <p>
                This feature generates detailed reports related to class and
                exam schedules, providing valuable insights for both students
                and administrators.
              </p>
              <h6>Advantages</h6>
              <ul>
                <li>
                  <p className="m-0 fw-semibold">Data Exporting</p>
                  <p>
                    Users can export reports in various formats (JPEG, CSV,
                    XLSX), making data sharing and analysis easy.
                  </p>
                </li>
                <li>
                  <p className="m-0 fw-semibold">Enhanced Transparency</p>
                  <p>
                    Access to schedule-related reports promotes transparency and
                    accountability within the institution.
                  </p>
                </li>
                <li>
                  <p className="m-0 fw-semibold">Informed Decision-Making</p>
                  <p>
                    Administrators can assess scheduling effectiveness and make
                    necessary adjustments using these reports.
                  </p>
                </li>
              </ul>
              <h6>Expansions</h6>
              <p className="m-0">
                The reporting feature could be expanded to include customizable
                report templates, allowing users to tailor reports to their
                specific needs. Furthermore, integrating analytics tools could
                provide deeper insights into scheduling trends and patterns over
                time
              </p>
            </article>
          ),
        },
      ],
      dev_team: [
        {
          Name: "Mark Lape",
          Role: "Leader / Project Manager",
          Image: lape,
          Quote:
            "If things go South, learn that you are alone. Hi! I am Mark Lape, a student of STI College Muñoz-EDSA taking Bachelor of Science in Computer Science. My career path would be focused around Application Development which includes Fullstack Development. With the help of the current technologies, I optd to find as much resources as I could, making sure me and my team will have the best of offers while still maintaining the performance and quality of Class Kode. We are thrilled to introduce to you our System, Class Kode!",
        },
        {
          Name: "Yranimez Repil",
          Role: "Backend / Manager Assistant",
          Image: repil,
          Quote: "Hello World.",
        },
        {
          Name: "James Gereña",
          Role: "Backend / Assistant",
          Image: gerena,
          Quote: "Be Wise.",
        },
        {
          Name: "Mia Maddara",
          Role: "Documentation",
          Image: maddara,
          Quote: "Jeremiah 29:11.",
        },
        {
          Name: "Aeron Pagaoa",
          Role: "Documentation",
          Image: pagaoa,
          Quote: "Anticipate, Prepare, Project or Speculate, Rinse and Repeat.",
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
          Name: "Chary Vinarao",
          Role: "English Adviser",
          Image: vinarao,
        },
        {
          Name: "Cristelyn Esporsado",
          Role: "Thesis Coordinator",
          Image: esporsado,
        },
      ],
      content: {
        content1: {
          Title: "Effortless Class Scheduling",
          SubTitle: "Streamline Your Academic Journey",
          Content:
            "Say goodbye to scheduling conflicts! Our intuitive platform allows you to easily book classes, manage your timetable, and stay organized throughout the semester.",
          Additionals: (
            <button
              className="rounded-pill btn primary-gradient px-3 py-2"
              onClick={() => {
                navigate("/about");
              }}
            >
              See Details
            </button>
          ),
          Image: scheduler,
        },
        content2: {
          Title: "Connect with Faculty",
          SubTitle: "Your Professors, Just a Click Away",
          Content:
            "Locate your faculty members with ease. Access their office hours, contact information, and more to ensure you get the guidance you need for your studies.",
          Additionals: (
            <button
              className="rounded-pill btn warning-color px-3 py-2"
              onClick={() => {
                navigate("/features");
              }}
            >
              See Details
            </button>
          ),
          Image: locator,
        },
        content3: {
          Title: "Team of Developers",
          SubTitle: "Computer Science Students ( BS2125 )",
          Content: "",
          Additionals: (
            <button
              className="rounded-pill btn primary-gradient px-3 py-2"
              onClick={() => {
                navigate("/team");
              }}
            >
              See Details
            </button>
          ),
          Image: team,
        },
        content4: {
          Title: "STI College Muñoz-EDSA",
          SubTitle: "Quezon City, Philippines",
          Content: "",
          Additionals: (
            <Link
              className="rounded-pill btn warning-color px-3 py-2"
              to={"https://www.stimunoz.edu.ph"}
              target="_blank"
            >
              See Details
            </Link>
          ),
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
        add: <RiStickyNoteAddFill />,
        edit: <MdEditSquare />,
        archive: <MdFolderDelete />,
        generate: <FaGear />,
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
        quicknav: <HiLightningBolt />,
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
        help: <IoMdHelpCircle />,
        info: <IoAlertCircle />,
        list: <FaListUl />,
        camera: <FaCameraRetro />,
        link: <FaLink />,
      },
      status: {
        success: <PiCheckFatFill />,
        warning: <RiAlarmWarningFill />,
        danger: <ImCross />,
      },
    },
    text: {
      statusText: {
        active: "Active",
        inactive: "Inactive",
        empty: "Empty List",
      },
      instructionText: {
        Curriculum1: "Please select a Department and Program First.",
        FacultyLocator1: "Please select an Active Coach.",
        Setup1: "Type the code below to run the Command.",
        Archive1: "Type the generated code -",
        Archive2: "to archive the entry -",
      },
      moduleText: {
        department: {
          title: "Department",
          create: "New Entry for Departments",
          createDescrition: "...",
          edit: "Modify Entry for Departments",
          editDescrition: "...",
        },
        program: {
          title: "Program",
          create: "New Entry for Programs",
          createDescrition: "...",
          edit: "Modify Entry for Programs",
          editDescrition: "...",
        },
        course: {
          title: "Course",
          create: "New Entry for Courses",
          createDescrition: "...",
          edit: "Modify Entry for Courses",
          editDescrition: "...",
        },
        coach: {
          title: "Coach",
          create: "New Entry for Coaches",
          createDescrition: "...",
          edit: "Modify Entry for Coaches",
          editDescrition: "...",
        },
        room: {
          title: "Room",
          create: "New Entry for Rooms",
          createDescrition: "...",
          edit: "Modify Entry for Rooms",
          editDescrition: "...",
        },
        section: {
          title: "Section",
          create: "New Entry for Sections",
          createDescrition: "...",
          edit: "Modify Entry for Sections",
          editDescrition: "...",
          generate: "Generate Entries for Sections",
          generateDescrition: "...",
        },
        curriculum: {
          title: "Curriculum Course",
          create: "New Entry for Curriculum",
          createDescrition: "...",
          edit: "Modify Entry for Curriculum",
          editDescrition: "...",
          upload: "Upload Entries for Curriculum",
          uploadDescrition: "...",
        },
        assignment: {
          title: "Assignment",
          create: "New Entry for Coach's Assignments",
          createDescrition: "...",
          edit: "Modify Entry for Coach's Assignments",
          editDescrition: "...",
        },
        projection: {
          title: "Projection",
          create: "New Entry for Projections",
          createDescrition: "...",
          edit: "Modify Entry for Projections",
          editDescrition: "...",
          upload: "Upload Entries for Projections",
          uploadDescrition: "...",
        },
        classSchedule: {
          title: "Class Schedule",
          create: "New Entry for Classes",
          createDescrition: "...",
          edit: "Modify Entry for Classes",
          editDescrition: "...",
          generate: "Generate Entries for Classes",
          generateDescrition: "...",
        },
        examSchedule: {
          title: "Exam Schedule",
          create: "New Entry for Exams",
          createDescrition: "...",
          edit: "Modify Entry for Exams",
          editDescrition: "...",
          generate: "Generate Entries for Exams",
          generateDescrition: "...",
        },
        user: {
          title: "User",
          create: "New Entry for Users",
          createDescrition: "...",
          edit: "Modify Entry for Users",
          editDescrition: "...",
          upload: "Upload Entries for Users",
          uploadDescrition: "...",
        },
      },
      actionText: {
        generate: {
          schedule: "Generated a set of Schedules",
          user: "",
          projection: "",
          curriculum: "",
          section: "",
        },
      },
    },
    maps: {
      roommaps: {
        main: {
          comlab1: cl1,
          comlab2: cl2,
          comlab3: cl3,
          comlab4: cl4,
          room301m: m301,
          room302m: m302,
          room303m: m303,
          room304m: m304,
        },
        annexa: {
          scilab: scilab,
          thesisroom: thesisr,
          engilab: englab,
          conferoom: confe,
          hr1: hr1,
          kitlab1: kitlab1,
          kitlab2: kitlab2,
          kitlab3: kitlab3,
          bar: bar,
          dinelab: dinelab,
        },
        annexb: {
          room101b: b101,
          room102b: b102,
          room103b: b103,
          room104b: b104,
          room105b: b105,
          room106b: b106,
          room107b: b107,
          room201b: b201,
          room202b: b202,
          room203b: b203,
          room204b: b204,
          room205b: b205,
          room206b: b206,
          court: court,
          drawlab: drawlab,
          avr1: avr1,
          avr2: avr2,
          avr3: avr3,
        },
      },
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
          <img src={b1} alt="b1" className="h-75"></img>
        </figure>
      ),
      b2: (
        <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
          <img src={b2} alt="b2" className="h-75"></img>
        </figure>
      ),
      b3: (
        <figure className="w-100 h-100 d-flex justify-content-center align-items-center">
          <img src={b3} alt="b3" className="h-75"></img>
        </figure>
      ),
    },
  });
  return [info];
}
