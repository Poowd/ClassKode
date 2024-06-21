-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2024 at 02:46 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_classkode`
--

-- --------------------------------------------------------

--
-- Table structure for table `academiclevel`
--

CREATE TABLE `academiclevel` (
  `ADLID` varchar(25) NOT NULL,
  `AcademicLevel` varchar(255) NOT NULL,
  `ADL_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `ADL_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `academiclevel`
--

INSERT INTO `academiclevel` (`ADLID`, `AcademicLevel`, `ADL_Created`, `ADL_Status`) VALUES
('0000000002', 'Senior High School', '2024-06-21 12:34:05', 'ACTIVE'),
('0000000001', 'Tertiary', '2024-06-21 12:33:53', 'ACTIVE');

--
-- Triggers `academiclevel`
--
DELIMITER $$
CREATE TRIGGER `ADLID` BEFORE INSERT ON `academiclevel` FOR EACH ROW BEGIN
	SET New.ADLID = LPAD((SELECT COUNT(*) FROM academiclevel) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `academicyear`
--

CREATE TABLE `academicyear` (
  `ACYID` varchar(25) NOT NULL,
  `ACY_Code` varchar(25) NOT NULL,
  `AcademicYear` varchar(255) NOT NULL,
  `StartDate` varchar(50) DEFAULT NULL,
  `EndDate` varchar(50) DEFAULT NULL,
  `CRR_Code` varchar(25) NOT NULL,
  `ACY_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `ACY_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `academicyear`
--

INSERT INTO `academicyear` (`ACYID`, `ACY_Code`, `AcademicYear`, `StartDate`, `EndDate`, `CRR_Code`, `ACY_Created`, `ACY_Status`) VALUES
('0000000001', 'AY-2425', 'Academic Year 2024-2025', '2024', '2025', 'CRR2020', '2024-06-20 15:15:09', 'ACTIVE'),
('0000000002', 'AY2526', 'Academic Year 2025-2026', '2025', '2026', 'CRR2020', '2024-06-21 10:26:10', 'ARCHIVE');

--
-- Triggers `academicyear`
--
DELIMITER $$
CREATE TRIGGER `ACYID` BEFORE INSERT ON `academicyear` FOR EACH ROW BEGIN
	SET New.ACYID = LPAD((SELECT COUNT(*) FROM academicyear) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE `assignment` (
  `ASGID` varchar(25) NOT NULL,
  `SCHLID` varchar(25) NOT NULL,
  `CoachType` varchar(25) NOT NULL,
  `ACY_Code` varchar(25) NOT NULL,
  `ASG_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `ASG_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assignment`
--

INSERT INTO `assignment` (`ASGID`, `SCHLID`, `CoachType`, `ACY_Code`, `ASG_Created`, `ASG_Status`) VALUES
('0000000001', '02000000001', 'Fulltime', 'AY-2425', '2024-06-21 07:14:50', 'ACTIVE');

--
-- Triggers `assignment`
--
DELIMITER $$
CREATE TRIGGER `ASGID` BEFORE INSERT ON `assignment` FOR EACH ROW BEGIN
	SET New.ASGID = LPAD((SELECT COUNT(*) FROM assignment) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `coach`
--

CREATE TABLE `coach` (
  `CCHID` varchar(25) NOT NULL,
  `SCHLID` varchar(25) NOT NULL,
  `FirstName` varchar(75) NOT NULL,
  `MiddleInitial` varchar(5) DEFAULT NULL,
  `LastName` varchar(75) NOT NULL,
  `Gender` enum('Male','Female','None') NOT NULL DEFAULT 'None',
  `DPT_Code` varchar(25) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(11) NOT NULL,
  `Facebook` varchar(255) NOT NULL,
  `CCH_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CCH_Status` enum('ACTIVE','ARCHIVE','PENDING') DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coach`
--

INSERT INTO `coach` (`CCHID`, `SCHLID`, `FirstName`, `MiddleInitial`, `LastName`, `Gender`, `DPT_Code`, `Email`, `Phone`, `Facebook`, `CCH_Created`, `CCH_Status`) VALUES
('0000000001', '02000000001', 'Joshua Rhey', 'N', 'Oliveros', 'Male', 'DPT_ICT', 'oliveros.000001@munoz.sti.edu.ph', '09123456789', 'https://www.facebook.com', '2024-06-20 16:41:22', 'ACTIVE');

--
-- Triggers `coach`
--
DELIMITER $$
CREATE TRIGGER `CCHID` BEFORE INSERT ON `coach` FOR EACH ROW BEGIN
	SET New.CCHID = LPAD((SELECT COUNT(*) FROM coach) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `coach_type`
--

CREATE TABLE `coach_type` (
  `CTPID` varchar(25) NOT NULL,
  `CoachType` varchar(255) NOT NULL,
  `MinUnits` int(2) NOT NULL DEFAULT 0,
  `MaxUnits` int(2) NOT NULL DEFAULT 0,
  `CTP_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CTP_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coach_type`
--

INSERT INTO `coach_type` (`CTPID`, `CoachType`, `MinUnits`, `MaxUnits`, `CTP_Created`, `CTP_Status`) VALUES
('0000000001', 'Fulltime', 25, 30, '2024-06-21 07:06:19', 'ACTIVE'),
('0000000002', 'Parttime', 15, 20, '2024-06-21 08:45:43', 'ACTIVE');

--
-- Triggers `coach_type`
--
DELIMITER $$
CREATE TRIGGER `CTPID` BEFORE INSERT ON `coach_type` FOR EACH ROW BEGIN
	SET New.CTPID = LPAD((SELECT COUNT(*) FROM coach_type) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `CRSID` varchar(25) NOT NULL,
  `CRS_Code` varchar(25) NOT NULL,
  `Course` varchar(255) NOT NULL,
  `AcademicLevel` varchar(255) NOT NULL,
  `CRS_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CRS_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`CRSID`, `CRS_Code`, `Course`, `AcademicLevel`, `CRS_Created`, `CRS_Status`) VALUES
('0000000001', 'COSC001', 'Methods of Research', 'Tertiary', '2024-06-21 09:57:53', 'ACTIVE');

--
-- Triggers `course`
--
DELIMITER $$
CREATE TRIGGER `CRSID` BEFORE INSERT ON `course` FOR EACH ROW BEGIN
	SET New.CRSID = LPAD((SELECT COUNT(*) FROM course) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `course_component`
--

CREATE TABLE `course_component` (
  `CCPID` varchar(25) NOT NULL,
  `Component` varchar(255) NOT NULL,
  `MaxUnits` double NOT NULL DEFAULT 1,
  `CCP_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CCP_Status` enum('ACTIVE','ARCHIVE','PENDING') DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_component`
--

INSERT INTO `course_component` (`CCPID`, `Component`, `MaxUnits`, `CCP_Created`, `CCP_Status`) VALUES
('0000000003', 'Computer Laboratory', 3, '2024-06-21 08:48:54', 'ACTIVE'),
('0000000002', 'General Lecture', 1.5, '2024-06-21 08:48:20', 'ACTIVE'),
('0000000001', 'Major Lecture', 2, '2024-06-21 08:48:05', 'ACTIVE'),
('0000000005', 'NSTP', 3, '2024-06-21 08:49:29', 'ACTIVE'),
('0000000004', 'PE ( Tertiary )', 2, '2024-06-21 08:49:13', 'ACTIVE');

--
-- Triggers `course_component`
--
DELIMITER $$
CREATE TRIGGER `CCPID` BEFORE INSERT ON `course_component` FOR EACH ROW BEGIN
	SET New.CCPID = LPAD((SELECT COUNT(*) FROM course_component) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `curriculum`
--

CREATE TABLE `curriculum` (
  `CRRID` varchar(25) NOT NULL,
  `CRR_Code` varchar(25) NOT NULL,
  `Curriculum` varchar(255) NOT NULL,
  `CRR_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CRR_Status` enum('ACTIVE','ARCHIVE','PENDING') DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `curriculum`
--

INSERT INTO `curriculum` (`CRRID`, `CRR_Code`, `Curriculum`, `CRR_Created`, `CRR_Status`) VALUES
('0000000001', 'CRR2020', 'Curriculum Year 2020', '2024-06-20 15:14:39', 'ACTIVE');

--
-- Triggers `curriculum`
--
DELIMITER $$
CREATE TRIGGER `CRRID` BEFORE INSERT ON `curriculum` FOR EACH ROW BEGIN
	SET New.CRRID = LPAD((SELECT COUNT(*) FROM curriculum) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `DPTID` varchar(25) NOT NULL,
  `DPT_Code` varchar(25) NOT NULL,
  `Department` varchar(255) NOT NULL,
  `DPT_Abbreviation` varchar(10) NOT NULL,
  `DPT_Description` varchar(255) DEFAULT 'None',
  `DPT_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `DPT_Status` enum('ACTIVE','ARCHIVED','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`DPTID`, `DPT_Code`, `Department`, `DPT_Abbreviation`, `DPT_Description`, `DPT_Created`, `DPT_Status`) VALUES
('0000000001', 'DPT_ICT', 'Information Communication Technology', 'ICT', '', '2024-06-20 16:17:56', 'ACTIVE'),
('0000000002', 'DPT_TRM', 'Tourism and Management', 'TM', '', '2024-06-20 17:17:51', 'ACTIVE');

--
-- Triggers `department`
--
DELIMITER $$
CREATE TRIGGER `DPTID` BEFORE INSERT ON `department` FOR EACH ROW BEGIN
	SET New.DPTID = LPAD((SELECT COUNT(*) FROM department) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `PRGID` varchar(25) NOT NULL,
  `PRG_Code` varchar(25) NOT NULL,
  `Program` varchar(255) NOT NULL,
  `PRG_Abbreviation` varchar(10) NOT NULL,
  `ACDLID` varchar(25) NOT NULL,
  `DPT_Code` varchar(25) NOT NULL,
  `PRG_Description` varchar(255) NOT NULL DEFAULT 'None',
  `PRG_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `PRG_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`PRGID`, `PRG_Code`, `Program`, `PRG_Abbreviation`, `ACDLID`, `DPT_Code`, `PRG_Description`, `PRG_Created`, `PRG_Status`) VALUES
('0000000001', 'COSC', 'Bachelor of Science in Computer Science', 'BSCS', 'n/a', 'DPT_ICT', '', '2024-06-21 09:56:28', 'ACTIVE');

--
-- Triggers `program`
--
DELIMITER $$
CREATE TRIGGER `PRGID` BEFORE INSERT ON `program` FOR EACH ROW BEGIN
	SET New.PRGID = LPAD((SELECT COUNT(*) FROM program) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `projection`
--

CREATE TABLE `projection` (
  `PRJID` varchar(25) NOT NULL,
  `SCT_Code` varchar(25) NOT NULL,
  `Population` int(3) NOT NULL DEFAULT 0,
  `ACY_Code` varchar(25) NOT NULL,
  `PRJ_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `PRJ_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rom_building`
--

CREATE TABLE `rom_building` (
  `BLGID` varchar(25) NOT NULL,
  `Building` varchar(255) NOT NULL,
  `BLG_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `BLG_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `rom_building`
--
DELIMITER $$
CREATE TRIGGER `BLDGID` BEFORE INSERT ON `rom_building` FOR EACH ROW BEGIN
	SET New.BLGID = LPAD((SELECT COUNT(*) FROM rom_building) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `rom_facility`
--

CREATE TABLE `rom_facility` (
  `FLTID` varchar(25) NOT NULL,
  `Facility` varchar(255) NOT NULL,
  `FLT_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `FLT_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `rom_facility`
--
DELIMITER $$
CREATE TRIGGER `FLTID` BEFORE INSERT ON `rom_facility` FOR EACH ROW BEGIN
	SET New.FLTID = LPAD((SELECT COUNT(*) FROM rom_facility) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `rom_floor`
--

CREATE TABLE `rom_floor` (
  `FLRID` varchar(25) NOT NULL,
  `Floor` varchar(255) NOT NULL,
  `FLR_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `FLR_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `rom_floor`
--
DELIMITER $$
CREATE TRIGGER `FLRID` BEFORE INSERT ON `rom_floor` FOR EACH ROW BEGIN
	SET New.FLRID = LPAD((SELECT COUNT(*) FROM rom_floor) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `ROMID` varchar(25) NOT NULL,
  `Room` varchar(255) NOT NULL,
  `Capacity` int(2) NOT NULL,
  `Facility` varchar(25) NOT NULL,
  `Building` varchar(25) NOT NULL,
  `Floor` varchar(25) NOT NULL,
  `ROM_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `ROM_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `room`
--
DELIMITER $$
CREATE TRIGGER `ROM` BEFORE INSERT ON `room` FOR EACH ROW BEGIN
	SET New.ROMID = LPAD((SELECT COUNT(*) FROM room) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `SCTID` varchar(25) NOT NULL,
  `SCT_Code` varchar(25) NOT NULL,
  `Section` varchar(255) NOT NULL,
  `YRLID` varchar(25) NOT NULL,
  `SMSTID` varchar(25) NOT NULL,
  `PRG_Code` varchar(25) NOT NULL,
  `SCT_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `SCT_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `section`
--
DELIMITER $$
CREATE TRIGGER `SCTID` BEFORE INSERT ON `section` FOR EACH ROW BEGIN
	SET New.SCTID = LPAD((SELECT COUNT(*) FROM section) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `setup`
--

CREATE TABLE `setup` (
  `STPID` varchar(25) NOT NULL,
  `CRS_Code` varchar(25) NOT NULL,
  `CRR_Code` varchar(25) NOT NULL,
  `Component` varchar(255) NOT NULL,
  `STP_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `STP_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `setup`
--

INSERT INTO `setup` (`STPID`, `CRS_Code`, `CRR_Code`, `Component`, `STP_Created`, `STP_Status`) VALUES
('0000000001', 'COSC001', 'CRR2020', 'Major Lecture', '2024-06-21 10:01:53', 'ACTIVE');

--
-- Triggers `setup`
--
DELIMITER $$
CREATE TRIGGER `STPID` BEFORE INSERT ON `setup` FOR EACH ROW BEGIN
	SET New.STPID = LPAD((SELECT COUNT(*) FROM setup) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `specialization`
--

CREATE TABLE `specialization` (
  `SPLID` varchar(25) NOT NULL,
  `SCHLID` varchar(25) NOT NULL,
  `CRS_Code` varchar(25) NOT NULL,
  `ACY_Code` varchar(25) NOT NULL,
  `SPL_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `SPL_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `specialization`
--

INSERT INTO `specialization` (`SPLID`, `SCHLID`, `CRS_Code`, `ACY_Code`, `SPL_Created`, `SPL_Status`) VALUES
('0000000001', '02000000001', 'COSC001', 'AY-2425', '2024-06-21 10:04:50', 'ACTIVE');

--
-- Triggers `specialization`
--
DELIMITER $$
CREATE TRIGGER `SPLID` BEFORE INSERT ON `specialization` FOR EACH ROW BEGIN
	SET New.SPLID = LPAD((SELECT COUNT(*) FROM specialization) + 1, 10, "0");
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academiclevel`
--
ALTER TABLE `academiclevel`
  ADD PRIMARY KEY (`AcademicLevel`),
  ADD UNIQUE KEY `YRLID` (`ADLID`);

--
-- Indexes for table `academicyear`
--
ALTER TABLE `academicyear`
  ADD PRIMARY KEY (`ACY_Code`),
  ADD UNIQUE KEY `AcademicYear` (`AcademicYear`),
  ADD UNIQUE KEY `ACYID` (`ACYID`),
  ADD UNIQUE KEY `StartDate` (`StartDate`),
  ADD UNIQUE KEY `EndDate` (`EndDate`),
  ADD KEY `CRR_Code` (`CRR_Code`);

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`ASGID`),
  ADD KEY `CCHID` (`SCHLID`),
  ADD KEY `CTPID` (`CoachType`),
  ADD KEY `ACY_Code` (`ACY_Code`);

--
-- Indexes for table `coach`
--
ALTER TABLE `coach`
  ADD PRIMARY KEY (`SCHLID`),
  ADD UNIQUE KEY `CCH_Contact` (`Phone`),
  ADD UNIQUE KEY `CCH_Email` (`Email`),
  ADD UNIQUE KEY `CCH_Facebook` (`Facebook`),
  ADD UNIQUE KEY `CCHID` (`CCHID`),
  ADD KEY `DPTID` (`DPT_Code`);

--
-- Indexes for table `coach_type`
--
ALTER TABLE `coach_type`
  ADD PRIMARY KEY (`CoachType`),
  ADD UNIQUE KEY `CTPID` (`CTPID`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`CRSID`),
  ADD UNIQUE KEY `CRS_Code` (`CRS_Code`),
  ADD KEY `LVLID` (`AcademicLevel`),
  ADD KEY `YRLID` (`AcademicLevel`);

--
-- Indexes for table `course_component`
--
ALTER TABLE `course_component`
  ADD PRIMARY KEY (`Component`),
  ADD UNIQUE KEY `CCPID` (`CCPID`);

--
-- Indexes for table `curriculum`
--
ALTER TABLE `curriculum`
  ADD PRIMARY KEY (`CRR_Code`),
  ADD UNIQUE KEY `CRRID` (`CRRID`),
  ADD UNIQUE KEY `Curriculum` (`Curriculum`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`DPT_Code`),
  ADD UNIQUE KEY `DPT_Abbreviation` (`DPT_Abbreviation`),
  ADD UNIQUE KEY `DPTID` (`DPTID`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`PRG_Code`),
  ADD UNIQUE KEY `PRGID` (`PRGID`),
  ADD KEY `YRLID` (`ACDLID`),
  ADD KEY `DPTID` (`DPT_Code`);

--
-- Indexes for table `projection`
--
ALTER TABLE `projection`
  ADD PRIMARY KEY (`PRJID`),
  ADD KEY `SCTID` (`SCT_Code`),
  ADD KEY `ACYID` (`ACY_Code`);

--
-- Indexes for table `rom_building`
--
ALTER TABLE `rom_building`
  ADD PRIMARY KEY (`Building`),
  ADD UNIQUE KEY `BLGID` (`BLGID`);

--
-- Indexes for table `rom_facility`
--
ALTER TABLE `rom_facility`
  ADD PRIMARY KEY (`Facility`),
  ADD UNIQUE KEY `FLTID` (`FLTID`);

--
-- Indexes for table `rom_floor`
--
ALTER TABLE `rom_floor`
  ADD PRIMARY KEY (`Floor`),
  ADD UNIQUE KEY `FLRID` (`FLRID`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`Room`),
  ADD UNIQUE KEY `RMID` (`ROMID`),
  ADD KEY `FCLTID` (`Facility`),
  ADD KEY `BLDGID` (`Building`),
  ADD KEY `FLRID` (`Floor`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`SCT_Code`),
  ADD UNIQUE KEY `SCTID` (`SCTID`),
  ADD UNIQUE KEY `SCT_Section` (`Section`),
  ADD KEY `YRLID` (`YRLID`),
  ADD KEY `SMSTID` (`SMSTID`),
  ADD KEY `PRGID` (`PRG_Code`);

--
-- Indexes for table `setup`
--
ALTER TABLE `setup`
  ADD PRIMARY KEY (`STPID`),
  ADD KEY `CRRID` (`CRR_Code`),
  ADD KEY `Component` (`Component`),
  ADD KEY `CRS_Code` (`CRS_Code`);

--
-- Indexes for table `specialization`
--
ALTER TABLE `specialization`
  ADD PRIMARY KEY (`SPLID`),
  ADD KEY `CCHID` (`SCHLID`),
  ADD KEY `CRSID` (`CRS_Code`),
  ADD KEY `ACY_Code` (`ACY_Code`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `academicyear`
--
ALTER TABLE `academicyear`
  ADD CONSTRAINT `academicyear_ibfk_1` FOREIGN KEY (`CRR_Code`) REFERENCES `curriculum` (`CRR_Code`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `assignment`
--
ALTER TABLE `assignment`
  ADD CONSTRAINT `assignment_ibfk_2` FOREIGN KEY (`CoachType`) REFERENCES `coach_type` (`CoachType`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `assignment_ibfk_3` FOREIGN KEY (`SCHLID`) REFERENCES `coach` (`SCHLID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `assignment_ibfk_4` FOREIGN KEY (`ACY_Code`) REFERENCES `academicyear` (`ACY_Code`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `coach`
--
ALTER TABLE `coach`
  ADD CONSTRAINT `coach_ibfk_1` FOREIGN KEY (`DPT_Code`) REFERENCES `department` (`DPT_Code`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`AcademicLevel`) REFERENCES `academiclevel` (`AcademicLevel`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `program`
--
ALTER TABLE `program`
  ADD CONSTRAINT `program_ibfk_1` FOREIGN KEY (`DPT_Code`) REFERENCES `department` (`DPT_Code`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `projection`
--
ALTER TABLE `projection`
  ADD CONSTRAINT `projection_ibfk_1` FOREIGN KEY (`SCT_Code`) REFERENCES `section` (`SCT_Code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `projection_ibfk_2` FOREIGN KEY (`ACY_Code`) REFERENCES `academicyear` (`ACY_Code`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`Facility`) REFERENCES `rom_facility` (`Facility`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `room_ibfk_2` FOREIGN KEY (`Building`) REFERENCES `rom_building` (`Building`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `room_ibfk_3` FOREIGN KEY (`Floor`) REFERENCES `rom_floor` (`Floor`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`PRG_Code`) REFERENCES `program` (`PRG_Code`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `setup`
--
ALTER TABLE `setup`
  ADD CONSTRAINT `setup_ibfk_1` FOREIGN KEY (`CRS_Code`) REFERENCES `course` (`CRS_Code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `setup_ibfk_2` FOREIGN KEY (`CRR_Code`) REFERENCES `curriculum` (`CRR_Code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `setup_ibfk_3` FOREIGN KEY (`Component`) REFERENCES `course_component` (`Component`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `specialization`
--
ALTER TABLE `specialization`
  ADD CONSTRAINT `specialization_ibfk_2` FOREIGN KEY (`CRS_Code`) REFERENCES `setup` (`CRS_Code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `specialization_ibfk_3` FOREIGN KEY (`SCHLID`) REFERENCES `assignment` (`SCHLID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `specialization_ibfk_4` FOREIGN KEY (`ACY_Code`) REFERENCES `assignment` (`ACY_Code`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
