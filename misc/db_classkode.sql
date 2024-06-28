-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2024 at 07:56 AM
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
  `CRR_Code` varchar(25) NOT NULL,
  `AcademicYear` varchar(255) NOT NULL,
  `StartDate` varchar(50) DEFAULT NULL,
  `EndDate` varchar(50) DEFAULT NULL,
  `ACY_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `ACY_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `academicyear`
--

INSERT INTO `academicyear` (`ACYID`, `ACY_Code`, `CRR_Code`, `AcademicYear`, `StartDate`, `EndDate`, `ACY_Created`, `ACY_Status`) VALUES
('0000000001', 'AY-2425', 'CRR2020', 'Academic Year 2024-2025', '2024', '2025', '2024-06-20 15:15:09', 'ACTIVE'),
('0000000002', 'AY2526', 'CRR2020', 'Academic Year 2025-2026', '2025', '2026', '2024-06-21 10:26:10', 'ARCHIVE');

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
  `ACY_Code` varchar(25) NOT NULL,
  `CoachType` varchar(25) NOT NULL,
  `ASG_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `ASG_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assignment`
--

INSERT INTO `assignment` (`ASGID`, `SCHLID`, `ACY_Code`, `CoachType`, `ASG_Created`, `ASG_Status`) VALUES
('0000000001', '02000000001', 'AY-2425', 'Fulltime', '2024-06-21 07:14:50', 'ACTIVE'),
('0000000002', '02000000002', 'AY-2425', 'Fulltime', '2024-06-27 06:03:26', 'ACTIVE');

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
  `DPT_Code` varchar(25) NOT NULL,
  `FirstName` varchar(75) NOT NULL,
  `MiddleInitial` varchar(5) DEFAULT NULL,
  `LastName` varchar(75) NOT NULL,
  `Gender` enum('Male','Female','None') NOT NULL DEFAULT 'None',
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(11) NOT NULL,
  `Facebook` varchar(255) NOT NULL,
  `CCH_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CCH_Status` enum('ACTIVE','ARCHIVE','PENDING') DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coach`
--

INSERT INTO `coach` (`CCHID`, `SCHLID`, `DPT_Code`, `FirstName`, `MiddleInitial`, `LastName`, `Gender`, `Email`, `Phone`, `Facebook`, `CCH_Created`, `CCH_Status`) VALUES
('0000000001', '02000000001', 'DPT_ICT', 'Joshua Rhey', 'N', 'Oliveros', 'Male', 'oliveros.000001@munoz.sti.edu.ph', '09123456789', 'https://www.facebook.com', '2024-06-20 16:41:22', 'ACTIVE'),
('0000000002', '02000000002', 'DPT_ICT', 'Cristelyn', 'Q', 'Esporsado', 'Female', 'esporsado.000002@munoz.sti.edu.ph', '09123123123', 'https://www.facebook.com/RinkashimeTakanoku', '2024-06-21 19:08:36', 'ACTIVE'),
('0000000003', '02000000003', 'DPT_TRM', 'Mark', 'L', 'Lopez', 'Male', 'dasd', '09323232323', 'eq', '2024-06-21 19:41:01', 'ARCHIVE');

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
  `PRG_Code` varchar(255) NOT NULL,
  `Course` varchar(255) NOT NULL,
  `CRS_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CRS_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`CRSID`, `CRS_Code`, `PRG_Code`, `Course`, `CRS_Created`, `CRS_Status`) VALUES
('0000000001', 'COSC001', 'COSC', 'Methods of Research', '2024-06-21 09:57:53', 'ACTIVE'),
('0000000002', 'dsa', 'COSC', 'dasdad', '2024-06-22 18:46:18', 'ARCHIVE'),
('0000000003', 'COSC002', 'COSC', 'Thesis 1', '2024-06-22 18:51:09', 'ACTIVE'),
('0000000004', 'COSC003', 'COSC', 'Thesis 2', '2024-06-22 18:51:35', 'ACTIVE'),
('0000000005', 'COSC004', 'COSC', 'Computer Programming 5', '2024-06-26 18:20:16', 'ACTIVE');

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
-- Table structure for table `course_mapping`
--

CREATE TABLE `course_mapping` (
  `CMPID` varchar(25) NOT NULL,
  `STPID` varchar(25) NOT NULL,
  `Semester` varchar(255) NOT NULL,
  `YearLevel` varchar(255) NOT NULL,
  `CMP_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CMP_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_mapping`
--

INSERT INTO `course_mapping` (`CMPID`, `STPID`, `Semester`, `YearLevel`, `CMP_Created`, `CMP_Status`) VALUES
('0000000001', '0000000001', 'First Semester', 'First Year', '2024-06-27 18:43:06', 'ACTIVE'),
('0000000002', '0000000005', 'First Semester', 'First Year', '2024-06-27 18:55:10', 'ACTIVE');

--
-- Triggers `course_mapping`
--
DELIMITER $$
CREATE TRIGGER `CMPID` BEFORE INSERT ON `course_mapping` FOR EACH ROW BEGIN
	SET New.CMPID = LPAD((SELECT COUNT(*) FROM course_mapping) + 1, 10, "0");
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
('0000000001', 'CRR2020', 'Curriculum 2020', '2024-06-20 15:14:39', 'ACTIVE'),
('0000000003', 'CRR@#$@', 'eqweqeq', '2024-06-27 18:27:12', 'ARCHIVE'),
('0000000002', 'dsada', 'dsadasda', '2024-06-27 17:24:04', 'ARCHIVE');

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
('0000000005', 'das', 'dasds', 'das', 'dasdas', '2024-06-22 08:20:09', ''),
('0000000006', 'DPT_ENG', 'Engineering', 'ENG', 'test', '2024-06-22 18:00:14', 'ACTIVE'),
('0000000003', 'DPT_GEPSYCH', 'General Education and Psychology', 'GEPsych', '', '2024-06-21 20:14:19', ''),
('0000000004', 'DPT_HM', 'Hospitality and Management', 'HM', '', '2024-06-21 20:16:07', 'ACTIVE'),
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
-- Table structure for table `placement`
--

CREATE TABLE `placement` (
  `PLCID` varchar(25) NOT NULL,
  `PLC_Code` varchar(25) NOT NULL,
  `Room` varchar(255) DEFAULT NULL,
  `Building` varchar(255) NOT NULL,
  `Floor` varchar(255) NOT NULL,
  `PLC_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `PLC_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `placement`
--

INSERT INTO `placement` (`PLCID`, `PLC_Code`, `Room`, `Building`, `Floor`, `PLC_Created`, `PLC_Status`) VALUES
('0000000001', 'a-1-1', NULL, 'Annex-A', 'First Floor', '2024-06-26 08:12:51', 'ACTIVE'),
('0000000002', 'a-1-2', NULL, 'Annex-A', 'First Floor', '2024-06-26 08:19:18', 'ACTIVE'),
('0000000003', 'b-1-1', NULL, 'Annex-B', 'First Floor', '2024-06-26 08:32:37', 'ACTIVE'),
('0000000004', 'b-1-2', NULL, 'Annex-B', 'First Floor', '2024-06-26 08:33:30', 'ACTIVE'),
('0000000005', 'b-1-3', NULL, 'Annex-B', 'First Floor', '2024-06-26 08:33:30', 'ACTIVE'),
('0000000006', 'b-1-4', NULL, 'Annex-B', 'First Floor', '2024-06-26 08:33:30', 'ACTIVE'),
('0000000007', 'b-1-5', NULL, 'Annex-B', 'First Floor', '2024-06-26 08:33:30', 'ACTIVE'),
('0000000008', 'b-1-6', NULL, 'Annex-B', 'First Floor', '2024-06-26 08:33:30', 'ACTIVE'),
('0000000009', 'b-1-7', NULL, 'Annex-B', 'First Floor', '2024-06-26 08:33:30', 'ACTIVE'),
('0000000010', 'b-1-8', NULL, 'Annex-B', 'First Floor', '2024-06-26 08:33:30', 'ACTIVE');

--
-- Triggers `placement`
--
DELIMITER $$
CREATE TRIGGER `PLCID` BEFORE INSERT ON `placement` FOR EACH ROW BEGIN
	SET New.PLCID = LPAD((SELECT COUNT(*) FROM placement) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `prerequisite`
--

CREATE TABLE `prerequisite` (
  `PRQID` varchar(25) NOT NULL,
  `CRS_Code` varchar(25) NOT NULL,
  `CRR_Code` varchar(25) NOT NULL,
  `PreRequisite` varchar(255) NOT NULL,
  `PRQ_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `PRQ_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prerequisite`
--

INSERT INTO `prerequisite` (`PRQID`, `CRS_Code`, `CRR_Code`, `PreRequisite`, `PRQ_Created`, `PRQ_Status`) VALUES
('0000000001', 'COSC002', 'CRR2020', 'COSC001', '2024-06-22 19:08:51', 'ACTIVE');

--
-- Triggers `prerequisite`
--
DELIMITER $$
CREATE TRIGGER `PRQID` BEFORE INSERT ON `prerequisite` FOR EACH ROW BEGIN
	SET New.PRQID = LPAD((SELECT COUNT(*) FROM prerequisite) + 1, 10, "0");
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
  `DPT_Code` varchar(25) NOT NULL,
  `Program` varchar(255) NOT NULL,
  `PRG_Abbreviation` varchar(10) NOT NULL,
  `AcademicLevel` varchar(25) NOT NULL,
  `PRG_Description` varchar(255) NOT NULL DEFAULT 'None',
  `PRG_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `PRG_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`PRGID`, `PRG_Code`, `DPT_Code`, `Program`, `PRG_Abbreviation`, `AcademicLevel`, `PRG_Description`, `PRG_Created`, `PRG_Status`) VALUES
('0000000002', 'COE', 'DPT_ENG', 'Bachelor of Science in Computer Engineering', 'COE', 'Tertiary', '', '2024-06-22 17:55:04', 'ACTIVE'),
('0000000001', 'COSC', 'DPT_ICT', 'Bachelor of Science in Computer Science', 'CS', 'Tertiary', '', '2024-06-21 09:56:28', 'ACTIVE'),
('0000000003', 'INTE', 'DPT_ICT', 'Bachelor of Science in Information Technology', 'IT', 'Tertiary', 'test', '2024-06-23 18:25:49', 'ACTIVE');

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
  `Section` varchar(25) NOT NULL,
  `ACY_Code` varchar(25) NOT NULL,
  `Population` int(3) NOT NULL DEFAULT 0,
  `PRJ_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `PRJ_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projection`
--

INSERT INTO `projection` (`PRJID`, `Section`, `ACY_Code`, `Population`, `PRJ_Created`, `PRJ_Status`) VALUES
('0000000001', 'CS101', 'AY-2425', 35, '2024-06-23 20:00:31', 'ACTIVE'),
('0000000002', 'CS102', 'AY2526', 43, '2024-06-25 09:26:18', 'ACTIVE'),
('0000000003', 'CS101', 'AY2526', 0, '2024-06-27 19:12:16', 'ACTIVE'),
('0000000004', 'CS201', 'AY-2425', 0, '2024-06-27 19:12:37', 'ACTIVE');

--
-- Triggers `projection`
--
DELIMITER $$
CREATE TRIGGER `PRJID` BEFORE INSERT ON `projection` FOR EACH ROW BEGIN
	SET New.PRJID = LPAD((SELECT COUNT(*) FROM projection) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `rom_building`
--

CREATE TABLE `rom_building` (
  `BLGID` varchar(25) NOT NULL,
  `Building` varchar(255) NOT NULL,
  `BLG_Short` varchar(1) NOT NULL,
  `BLG_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `BLG_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rom_building`
--

INSERT INTO `rom_building` (`BLGID`, `Building`, `BLG_Short`, `BLG_Created`, `BLG_Status`) VALUES
('0000000002', 'Annex-A', 'A', '2024-06-21 17:07:43', 'ACTIVE'),
('0000000003', 'Annex-B', 'B', '2024-06-21 17:07:49', 'ACTIVE'),
('0000000001', 'Main', 'M', '2024-06-21 17:07:43', 'ACTIVE');

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
-- Dumping data for table `rom_facility`
--

INSERT INTO `rom_facility` (`FLTID`, `Facility`, `FLT_Created`, `FLT_Status`) VALUES
('0000000003', 'Audio Visual Room', '2024-06-21 17:08:43', 'ACTIVE'),
('0000000002', 'Computer Laboratory', '2024-06-21 17:08:13', 'ACTIVE'),
('0000000001', 'Lecture Room', '2024-06-21 17:08:13', 'ACTIVE');

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
-- Dumping data for table `rom_floor`
--

INSERT INTO `rom_floor` (`FLRID`, `Floor`, `FLR_Created`, `FLR_Status`) VALUES
('0000000001', 'First Floor', '2024-06-21 17:09:17', 'ACTIVE'),
('0000000002', 'Second Floor', '2024-06-21 17:09:17', 'ACTIVE'),
('0000000003', 'Third Floor', '2024-06-21 17:09:22', 'ACTIVE');

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
-- Dumping data for table `room`
--

INSERT INTO `room` (`ROMID`, `Room`, `Capacity`, `Facility`, `Building`, `Floor`, `ROM_Created`, `ROM_Status`) VALUES
('0000000005', '101Masda', 45, 'Lecture Room', 'Main', 'First Floor', '2024-06-25 05:30:24', 'ACTIVE'),
('0000000006', '102Masda', 45, 'Computer Laboratory', 'Main', 'First Floor', '2024-06-25 05:30:46', 'ACTIVE'),
('0000000007', '103M', 25, 'Lecture Room', 'Main', 'First Floor', '2024-06-26 09:17:58', 'ACTIVE'),
('0000000001', '301M', 45, 'Lecture Room', 'Main', 'Third Floor', '2024-06-21 17:09:46', 'ACTIVE'),
('0000000002', '302M', 45, 'Lecture Room', 'Main', 'Third Floor', '2024-06-23 19:08:23', 'ACTIVE'),
('0000000003', '303M', 45, 'Lecture Room', 'Main', 'Third Floor', '2024-06-23 19:08:38', 'ACTIVE'),
('0000000004', '304M', 45, 'Computer Laboratory', 'Main', 'Third Floor', '2024-06-23 19:08:58', 'ACTIVE'),
('0000000008', 'Computer Laboratory Four', 45, 'Computer Laboratory', 'Main', 'Second Floor', '2024-06-26 09:18:15', 'ACTIVE');

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
  `Section` varchar(255) NOT NULL,
  `PRG_Code` varchar(25) NOT NULL,
  `Semester` varchar(255) NOT NULL,
  `YearLevel` varchar(255) NOT NULL,
  `SCT_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `SCT_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`SCTID`, `Section`, `PRG_Code`, `Semester`, `YearLevel`, `SCT_Created`, `SCT_Status`) VALUES
('0000000001', 'CS101', 'COSC', 'First Semester', 'First Year', '2024-06-25 10:35:27', 'ACTIVE'),
('0000000017', 'CS102', 'COSC', 'First Semester', 'First Year', '2024-06-26 09:16:36', 'ACTIVE'),
('0000000018', 'CS103', 'COSC', 'First Semester', 'First Year', '2024-06-26 09:16:44', 'ACTIVE'),
('0000000002', 'CS201', 'COSC', 'Second Semester', 'First Year', '2024-06-25 10:35:27', 'ACTIVE'),
('0000000019', 'CS202', 'COSC', 'Second Semester', 'First Year', '2024-06-26 09:16:44', 'ACTIVE'),
('0000000003', 'CS301', 'COSC', 'First Semester', 'Second Year', '2024-06-25 10:35:27', 'ACTIVE'),
('0000000020', 'CS302', 'COSC', 'First Semester', 'Second Year', '2024-06-26 09:16:44', 'ACTIVE'),
('0000000004', 'CS401', 'COSC', 'Second Semester', 'Second Year', '2024-06-25 10:35:27', 'ACTIVE'),
('0000000021', 'CS402', 'COSC', 'Second Semester', 'Second Year', '2024-06-26 09:16:44', 'ACTIVE'),
('0000000005', 'CS501', 'COSC', 'First Semester', 'Third Year', '2024-06-25 10:35:27', 'ACTIVE'),
('0000000022', 'CS502', 'COSC', 'First Semester', 'Third Year', '2024-06-26 09:16:44', 'ACTIVE'),
('0000000006', 'CS601', 'COSC', 'Second Semester', 'Third Year', '2024-06-25 10:35:27', 'ACTIVE'),
('0000000023', 'CS602', 'COSC', 'Second Semester', 'Third Year', '2024-06-26 09:16:44', 'ACTIVE'),
('0000000007', 'CS701', 'COSC', 'First Semester', 'Fourth Year', '2024-06-25 10:35:27', 'ACTIVE'),
('0000000024', 'CS702', 'COSC', 'First Semester', 'Fourth Year', '2024-06-26 09:16:44', 'ACTIVE'),
('0000000008', 'CS801', 'COSC', 'Second Semester', 'Fourth Year', '2024-06-25 10:35:27', 'ACTIVE'),
('0000000025', 'CS803', 'COSC', 'Second Semester', 'Fourth Year', '2024-06-26 09:16:44', 'ACTIVE'),
('0000000009', 'IT101', 'INTE', 'First Semester', 'First Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000010', 'IT201', 'INTE', 'Second Semester', 'First Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000011', 'IT301', 'INTE', 'First Semester', 'Second Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000012', 'IT401', 'INTE', 'Second Semester', 'Second Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000013', 'IT501', 'INTE', 'First Semester', 'Third Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000014', 'IT601', 'INTE', 'Second Semester', 'Third Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000015', 'IT701', 'INTE', 'First Semester', 'Fourth Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000016', 'IT801', 'INTE', 'Second Semester', 'Fourth Year', '2024-06-26 06:38:52', 'ACTIVE');

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
-- Table structure for table `semester`
--

CREATE TABLE `semester` (
  `SMSID` varchar(25) NOT NULL,
  `Semester` varchar(255) NOT NULL,
  `SMS_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `SMS_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `semester`
--

INSERT INTO `semester` (`SMSID`, `Semester`, `SMS_Created`, `SMS_Status`) VALUES
('0000000001', 'First Semester', '2024-06-21 16:42:46', 'ACTIVE'),
('0000000002', 'Second Semester', '2024-06-21 16:42:52', 'ACTIVE');

--
-- Triggers `semester`
--
DELIMITER $$
CREATE TRIGGER `SMSID` BEFORE INSERT ON `semester` FOR EACH ROW BEGIN
	SET New.SMSID = LPAD((SELECT COUNT(*) FROM semester) + 1, 10, "0");
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
  `PRG_Code` varchar(25) NOT NULL,
  `Component` varchar(255) NOT NULL,
  `STP_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `STP_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `setup`
--

INSERT INTO `setup` (`STPID`, `CRS_Code`, `CRR_Code`, `PRG_Code`, `Component`, `STP_Created`, `STP_Status`) VALUES
('0000000001', 'COSC001', 'CRR2020', 'COSC', 'Major Lecture', '2024-06-21 10:01:53', 'ACTIVE'),
('0000000002', 'COSC002', 'CRR2020', 'COSC', 'Major Lecture', '2024-06-22 19:08:28', 'ACTIVE'),
('0000000003', 'COSC003', 'CRR2020', 'COSC', 'General Lecture', '2024-06-27 17:57:21', 'ACTIVE'),
('0000000004', 'COSC004', 'CRR2020', 'COSC', 'Computer Laboratory', '2024-06-27 18:18:27', 'ACTIVE'),
('0000000005', 'COSC001', 'CRR2020', 'COE', 'Major Lecture', '2024-06-27 18:22:20', 'ACTIVE');

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
('0000000001', '02000000002', 'COSC001', 'AY-2425', '2024-06-21 10:04:50', 'ACTIVE');

--
-- Triggers `specialization`
--
DELIMITER $$
CREATE TRIGGER `SPLID` BEFORE INSERT ON `specialization` FOR EACH ROW BEGIN
	SET New.SPLID = LPAD((SELECT COUNT(*) FROM specialization) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `yearlevel`
--

CREATE TABLE `yearlevel` (
  `YRLID` varchar(25) NOT NULL,
  `YearLevel` varchar(255) NOT NULL,
  `YRL_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `YRL_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `yearlevel`
--

INSERT INTO `yearlevel` (`YRLID`, `YearLevel`, `YRL_Created`, `YRL_Status`) VALUES
('0000000003', 'First Year', '2024-06-21 17:03:30', 'ACTIVE'),
('0000000006', 'Fourth Year', '2024-06-21 17:03:41', 'ACTIVE'),
('00000000001', 'Grade 11', '2024-06-21 17:03:55', 'ACTIVE'),
('00000000002', 'Grade 12', '2024-06-21 17:03:55', 'ACTIVE'),
('0000000004', 'Second Year', '2024-06-21 17:03:30', 'ACTIVE'),
('0000000005', 'Third Year', '2024-06-21 17:03:41', 'ACTIVE');

--
-- Triggers `yearlevel`
--
DELIMITER $$
CREATE TRIGGER `YRLID` BEFORE INSERT ON `yearlevel` FOR EACH ROW BEGIN
	SET New.YRLID = LPAD((SELECT COUNT(*) FROM yearlevel) + 1, 10, "0");
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
  ADD UNIQUE KEY `SCHLID` (`SCHLID`,`ACY_Code`),
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
  ADD KEY `PRG_Code` (`PRG_Code`);

--
-- Indexes for table `course_component`
--
ALTER TABLE `course_component`
  ADD PRIMARY KEY (`Component`),
  ADD UNIQUE KEY `CCPID` (`CCPID`);

--
-- Indexes for table `course_mapping`
--
ALTER TABLE `course_mapping`
  ADD PRIMARY KEY (`CMPID`),
  ADD KEY `STPID` (`STPID`),
  ADD KEY `YearLevel` (`YearLevel`),
  ADD KEY `Semester` (`Semester`);

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
-- Indexes for table `placement`
--
ALTER TABLE `placement`
  ADD PRIMARY KEY (`PLC_Code`),
  ADD UNIQUE KEY `PLCID` (`PLCID`),
  ADD KEY `Building` (`Building`),
  ADD KEY `Floor` (`Floor`),
  ADD KEY `Room` (`Room`);

--
-- Indexes for table `prerequisite`
--
ALTER TABLE `prerequisite`
  ADD PRIMARY KEY (`PRQID`),
  ADD KEY `CRS_Code` (`CRS_Code`),
  ADD KEY `PreRequisite` (`PreRequisite`),
  ADD KEY `CRR_Code` (`CRR_Code`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`PRG_Code`),
  ADD UNIQUE KEY `PRGID` (`PRGID`),
  ADD KEY `YRLID` (`AcademicLevel`),
  ADD KEY `DPTID` (`DPT_Code`),
  ADD KEY `ADLID` (`AcademicLevel`);

--
-- Indexes for table `projection`
--
ALTER TABLE `projection`
  ADD PRIMARY KEY (`PRJID`),
  ADD UNIQUE KEY `Section_2` (`Section`,`ACY_Code`),
  ADD KEY `ACYID` (`ACY_Code`),
  ADD KEY `Section` (`Section`);

--
-- Indexes for table `rom_building`
--
ALTER TABLE `rom_building`
  ADD PRIMARY KEY (`Building`),
  ADD UNIQUE KEY `BLGID` (`BLGID`),
  ADD UNIQUE KEY `BLG_Short` (`BLG_Short`);

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
  ADD PRIMARY KEY (`Section`),
  ADD UNIQUE KEY `SCTID` (`SCTID`),
  ADD KEY `PRGID` (`PRG_Code`),
  ADD KEY `Semester` (`Semester`),
  ADD KEY `YearLevel` (`YearLevel`);

--
-- Indexes for table `semester`
--
ALTER TABLE `semester`
  ADD PRIMARY KEY (`Semester`),
  ADD UNIQUE KEY `SMSID` (`SMSID`);

--
-- Indexes for table `setup`
--
ALTER TABLE `setup`
  ADD PRIMARY KEY (`STPID`),
  ADD KEY `CRRID` (`CRR_Code`),
  ADD KEY `Component` (`Component`),
  ADD KEY `CRS_Code` (`CRS_Code`),
  ADD KEY `PRG_Code` (`PRG_Code`);

--
-- Indexes for table `specialization`
--
ALTER TABLE `specialization`
  ADD PRIMARY KEY (`SPLID`),
  ADD KEY `CCHID` (`SCHLID`),
  ADD KEY `CRSID` (`CRS_Code`),
  ADD KEY `ACY_Code` (`ACY_Code`);

--
-- Indexes for table `yearlevel`
--
ALTER TABLE `yearlevel`
  ADD PRIMARY KEY (`YearLevel`),
  ADD UNIQUE KEY `YRLID` (`YRLID`);

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
  ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`PRG_Code`) REFERENCES `program` (`PRG_Code`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `course_mapping`
--
ALTER TABLE `course_mapping`
  ADD CONSTRAINT `course_mapping_ibfk_1` FOREIGN KEY (`STPID`) REFERENCES `setup` (`STPID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `course_mapping_ibfk_3` FOREIGN KEY (`Semester`) REFERENCES `semester` (`Semester`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `course_mapping_ibfk_4` FOREIGN KEY (`YearLevel`) REFERENCES `yearlevel` (`YearLevel`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `placement`
--
ALTER TABLE `placement`
  ADD CONSTRAINT `placement_ibfk_1` FOREIGN KEY (`Room`) REFERENCES `room` (`Room`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `placement_ibfk_2` FOREIGN KEY (`Building`) REFERENCES `rom_building` (`Building`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `placement_ibfk_3` FOREIGN KEY (`Floor`) REFERENCES `rom_floor` (`Floor`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `prerequisite`
--
ALTER TABLE `prerequisite`
  ADD CONSTRAINT `prerequisite_ibfk_3` FOREIGN KEY (`CRR_Code`) REFERENCES `curriculum` (`CRR_Code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `prerequisite_ibfk_4` FOREIGN KEY (`PreRequisite`) REFERENCES `course` (`CRS_Code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `prerequisite_ibfk_5` FOREIGN KEY (`CRS_Code`) REFERENCES `course` (`CRS_Code`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `program`
--
ALTER TABLE `program`
  ADD CONSTRAINT `program_ibfk_1` FOREIGN KEY (`DPT_Code`) REFERENCES `department` (`DPT_Code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `program_ibfk_2` FOREIGN KEY (`AcademicLevel`) REFERENCES `academiclevel` (`AcademicLevel`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `projection`
--
ALTER TABLE `projection`
  ADD CONSTRAINT `projection_ibfk_2` FOREIGN KEY (`ACY_Code`) REFERENCES `academicyear` (`ACY_Code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `projection_ibfk_3` FOREIGN KEY (`Section`) REFERENCES `section` (`Section`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`Facility`) REFERENCES `rom_facility` (`Facility`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `room_ibfk_3` FOREIGN KEY (`Floor`) REFERENCES `rom_floor` (`Floor`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `room_ibfk_4` FOREIGN KEY (`Building`) REFERENCES `rom_building` (`Building`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`PRG_Code`) REFERENCES `program` (`PRG_Code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `section_ibfk_3` FOREIGN KEY (`Semester`) REFERENCES `semester` (`Semester`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `section_ibfk_4` FOREIGN KEY (`YearLevel`) REFERENCES `yearlevel` (`YearLevel`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `setup`
--
ALTER TABLE `setup`
  ADD CONSTRAINT `setup_ibfk_1` FOREIGN KEY (`CRS_Code`) REFERENCES `course` (`CRS_Code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `setup_ibfk_2` FOREIGN KEY (`CRR_Code`) REFERENCES `curriculum` (`CRR_Code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `setup_ibfk_3` FOREIGN KEY (`Component`) REFERENCES `course_component` (`Component`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `setup_ibfk_4` FOREIGN KEY (`PRG_Code`) REFERENCES `program` (`PRG_Code`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `specialization`
--
ALTER TABLE `specialization`
  ADD CONSTRAINT `specialization_ibfk_4` FOREIGN KEY (`ACY_Code`) REFERENCES `academicyear` (`ACY_Code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `specialization_ibfk_5` FOREIGN KEY (`SCHLID`) REFERENCES `coach` (`SCHLID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `specialization_ibfk_6` FOREIGN KEY (`CRS_Code`) REFERENCES `course` (`CRS_Code`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
