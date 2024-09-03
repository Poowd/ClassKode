-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2024 at 05:49 AM
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
('0000000001', 'Senior High School', '2024-06-21 12:34:05', 'ACTIVE'),
('0000000002', 'Tertiary', '2024-06-21 12:33:53', 'ACTIVE');

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
  `Semester` enum('First Semester','Second Semester') DEFAULT NULL,
  `StartDate` varchar(50) DEFAULT NULL,
  `EndDate` varchar(50) DEFAULT NULL,
  `ACY_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `ACY_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `academicyear`
--

INSERT INTO `academicyear` (`ACYID`, `ACY_Code`, `CRR_Code`, `AcademicYear`, `Semester`, `StartDate`, `EndDate`, `ACY_Created`, `ACY_Status`) VALUES
('0000000001', 'AY-2425-1', 'CRR2020', 'Academic Year 2024-2025', 'First Semester', '2024', '2025', '2024-08-09 07:27:23', 'ACTIVE');

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
('0000000001', '02000000001', 'AY-2425-1', 'Fulltime', '2024-06-20 23:14:50', 'ACTIVE'),
('0000000002', '02000000002', 'AY-2425-1', 'Fulltime', '2024-06-26 22:03:26', 'ACTIVE'),
('0000000003', '02000000003', 'AY-2425-1', 'Parttime', '2024-07-01 02:36:38', 'ACTIVE'),
('0000000004', 'dsadas', 'AY-2425-1', 'Fulltime', '2024-08-07 03:46:23', 'ACTIVE'),
('0000000005', '02000000004', 'AY-2425-1', 'Parttime', '2024-08-07 03:46:41', 'ACTIVE'),
('0000000006', '02000257902', 'AY-2425-1', 'Parttime', '2024-08-07 03:47:40', 'ACTIVE'),
('0000000007', '02000257907', 'AY-2425-1', 'Parttime', '2024-08-09 07:32:02', 'ACTIVE');

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
  `Photo` varchar(255) NOT NULL,
  `CCH_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `CCH_Status` enum('ACTIVE','ARCHIVE','PENDING') DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coach`
--

INSERT INTO `coach` (`CCHID`, `SCHLID`, `DPT_Code`, `FirstName`, `MiddleInitial`, `LastName`, `Gender`, `Email`, `Phone`, `Facebook`, `Photo`, `CCH_Created`, `CCH_Status`) VALUES
('0000000001', '02000000001', 'DPT_ICT', 'Joshua Rhey', 'N', 'Oliveros', 'Male', 'oliveros.000001@munoz.sti.edu.ph', '09123456789', 'https://www.facebook.com', 'IMG_9115.jpg', '2024-06-20 08:41:22', 'ACTIVE'),
('0000000002', '02000000002', 'DPT_ICT', 'Cristelyn', 'Q', 'Esporsado', 'Female', 'esporsado.000002@munoz.sti.edu.ph', '09123123123', 'https://www.facebook.com/RinkashimeTakanoku', 'IMG_9105.JPG', '2024-06-21 11:08:36', 'ACTIVE'),
('0000000003', '02000000003', 'DPT_ENG', 'Miguel Jerome', 'N', 'Silverio', 'Male', 'dasd', '09323232323', 'eq', 'IMG_9119.JPG', '2024-06-21 11:41:01', 'ACTIVE'),
('0000000004', '02000000004', 'DPT_ICT', 'Yranimez', 'R', 'Repil', 'Male', 'yra@mez.com', '09249438539', 'https://www.facebook.comewqeqwqweq', '_avatar.png', '2024-08-04 22:14:37', 'ACTIVE'),
('0000000005', '02000257902', 'DPT_ICT', 'Joshua Rhey', 'N', 'Lape', 'Male', 'admin231@munoz.sti.edu.ph', '09562342123', 'test313123123', '_avatar.png', '2024-08-01 00:21:47', 'ACTIVE'),
('0000000006', '02000257905', 'BUS-MNG-001', 'Mark Limuel \'Maku\'', 'L', 'Lape', 'Male', 'lape@email.com', '03483569842', 'https://www.youtube.com/watch?v=dLXSJdTK9QI&t=1148s', 'cute.jfif', '2024-08-04 23:05:10', 'ACTIVE'),
('0000000007', '02000257907', 'DPT_ICT', 'Mark', 'L', 'Lape', 'Male', 'lape.257907@munoz.sti.edu.ph', '09682348413', 'Facebook', '_avatar.png', '2024-07-15 00:15:18', 'ACTIVE'),
('0000000008', 'dsad', 'DPT_ICT', 'ada', 'das', 'dasdas', 'Male', 'dsa', 'dasdasd', 'dsada', '_avatar.png', '2024-08-05 00:00:11', 'ARCHIVE'),
('0000000009', 'dsadac', 'DPT_TRM', 'sadca', 'dcsac', 'ascdascdas', 'Male', 'acsdsa', 'dcsacdasc', 'dsacdascdasc', '_avatar.png', '2024-08-09 08:35:42', 'ACTIVE'),
('0000000010', 'dsadas', 'DPT_ICT', 'dasdas', 'dasds', 'adsada', 'Male', 'dsad', 'asdsada', 'dasd', '_avatar.png', '2024-08-04 22:12:45', 'ARCHIVE'),
('0000000011', 'fwver', 'DPT_ICT', 'wervwe', 'rvwer', 'vwervwerv', 'Male', 'rwverw', 'vrvwervwer', 'vrwevrwevwrev', '_avatar.png', '2024-08-05 09:25:50', 'ARCHIVE'),
('0000000012', 'wqceqwe', 'DPT_TRM', 'cqwce', 'qwec', 'wqecwqec', 'Male', 'cqwe', 'cwqecqwec', 'wqcewqc', '_avatar.png', '2024-08-04 22:27:40', 'ARCHIVE');

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
-- Table structure for table `coach_images`
--

CREATE TABLE `coach_images` (
  `CMGID` int(11) NOT NULL,
  `SCHLID` varchar(255) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `Date_Created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coach_images`
--

INSERT INTO `coach_images` (`CMGID`, `SCHLID`, `Image`, `Date_Created`) VALUES
(2, '[object Object]', 'image_1722499464579.png', '2024-08-01 08:04:58'),
(3, '[object Object]', 'image_1722500612379.png', '2024-08-01 08:23:52'),
(4, '[object Object]', 'image_1722500632144.png', '2024-08-01 08:23:52'),
(5, 'dasdasd', 'image_1722500632671.png', '2024-08-01 08:24:35'),
(6, 'dasdsadas', 'image_1722836871128.png', '2024-08-05 05:48:40'),
(7, 'hi', '[object Object]', '2024-08-05 05:48:52'),
(8, 'Whatsup', 'image_1722836954784.png', '2024-08-05 05:49:22'),
(9, 'WhatsUPPPPPPP', 'image_1722836985184.png', '2024-08-05 05:49:48'),
(10, 'dasdasd', 'image_1722837196145.png', '2024-08-05 05:53:16'),
(11, 'tedasdasd', 'image_1722837784435.png', '2024-08-05 06:03:04'),
(12, 'ges', 'image_1722838099570.png', '2024-08-05 06:08:23'),
(13, 'dsadadsa', 'image_1722838211941.png', '2024-08-05 06:10:19');

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
('0000000001', 'COSC001', 'COSC', 'Methods of Research', '2024-06-21 01:57:53', 'ACTIVE'),
('0000000002', 'ENGI001', 'COE', 'Computer Architecture', '2024-06-22 10:46:18', 'ACTIVE'),
('0000000003', 'COSC002', 'COSC', 'Thesis 1', '2024-06-22 10:51:09', 'ACTIVE'),
('0000000004', 'COSC003', 'COSC', 'Thesis 2', '2024-06-22 10:51:35', 'ACTIVE'),
('0000000005', 'COSC004', 'COSC', 'Computer Programming 5', '2024-06-26 10:20:16', 'ACTIVE');

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
('0000000001', 'Computer Laboratory', 3, '2024-06-21 08:48:54', 'ACTIVE'),
('0000000002', 'General Lecture', 1.5, '2024-06-21 08:48:20', 'ACTIVE'),
('0000000003', 'Major Lecture', 2, '2024-06-21 08:48:05', 'ACTIVE'),
('0000000004', 'NSTP', 3, '2024-06-21 08:49:29', 'ACTIVE'),
('0000000005', 'PE ( Tertiary )', 2, '2024-06-21 08:49:13', 'ACTIVE'),
('0000000006', 'Weekly Event', 1.5, '2024-07-14 06:40:15', 'ACTIVE');

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
('0000000001', '321cedwq', 'wqecwqe21c312c', '2024-08-07 19:57:55', 'ARCHIVE'),
('0000000002', 'CRR2020', 'Curriculum 2020', '2024-06-20 15:14:39', 'ACTIVE'),
('0000000003', 'CRR@#$@', 'eqweqeq', '2024-06-27 18:27:12', 'ARCHIVE'),
('0000000004', 'dsada', 'dsadasda', '2024-06-27 17:24:04', 'ARCHIVE'),
('0000000005', 'ewrfweff', 'efwfwfw', '2024-06-29 10:11:07', 'ARCHIVE');

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
  `DPT_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`DPTID`, `DPT_Code`, `Department`, `DPT_Abbreviation`, `DPT_Description`, `DPT_Created`, `DPT_Status`) VALUES
('0000000001', 'asd', 'sad', 'asdasd', 'asd', '2024-08-04 06:47:36', 'ARCHIVE'),
('0000000002', 'BUS-MNG-001', 'Business & Management', 'BAM', 'Focuses on business thinking and problem solving skills that makes successful entrepreneurs.', '2024-08-04 06:45:24', 'ACTIVE'),
('0000000003', 'das', 'dasds', 'das', 'dasdas', '2024-06-22 08:20:09', 'ARCHIVE'),
('0000000004', 'dasd', 'ddqweq', 'ew', '', '2024-08-04 04:43:20', 'ARCHIVE'),
('0000000005', 'DPT_ENG', 'Engineering', 'ENG', 'test', '2024-06-22 18:00:14', 'ACTIVE'),
('0000000006', 'DPT_GEPSYCH', 'General Education and Psychology', 'GEPsych', '', '2024-06-21 20:14:19', 'ACTIVE'),
('0000000007', 'DPT_HM', 'Hospitality and Management', 'HM', '', '2024-06-21 20:16:07', 'ACTIVE'),
('0000000008', 'DPT_ICT', 'Information Communication Technology', 'ICT', '', '2024-06-20 16:17:56', 'ACTIVE'),
('0000000009', 'DPT_TRM', 'Tourism and Management', 'TM', '', '2024-06-20 17:17:51', 'ACTIVE'),
('0000000010', 'fsdf', 'sdfsd', 'fdsf', 'sdfs', '2024-08-04 04:48:37', 'ARCHIVE');

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
('0000000001', 'COSC002', 'CRR2020', 'COSC001', '2024-06-22 19:08:51', 'ACTIVE'),
('0000000002', 'COSC003', 'CRR2020', 'COSC002', '2024-08-04 17:57:33', 'ACTIVE');

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
('0000000001', 'COE', 'DPT_ENG', 'Bachelor of Science in Computer Engineering', 'COE', 'Tertiary', '', '2024-06-22 17:55:04', 'ACTIVE'),
('0000000002', 'COSC', 'DPT_ICT', 'Bachelor of Science in Computer Science', 'CS', 'Tertiary', 'Add new Description', '2024-06-21 09:56:28', 'ACTIVE'),
('0000000003', 'dsad', 'DPT_ICT', 'asd', 'adasd', 'Senior High School', 'test', '2024-08-04 16:52:41', 'ARCHIVE'),
('0000000004', 'ICT-COSC-001', 'DPT_ICT', 'Bachelor of Science in Not Computer Science', 'BS', 'Tertiary', 'Program that offers computer science lessons that will focus on building and developing of software applications.', '2024-08-04 16:23:35', 'ACTIVE'),
('0000000005', 'INTE', 'DPT_ICT', 'Bachelor of Science in Information Technology', 'IT', 'Tertiary', 'This is not Test description, Please indicate what you want and is this thing working?', '2024-06-23 18:25:49', 'ACTIVE');

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
('0000000001', 'COE101', 'AY-2425-1', 35, '2024-06-23 20:00:31', 'ACTIVE'),
('0000000002', 'CS102', 'AY-2425-1', 25, '2024-06-25 09:26:18', 'ACTIVE'),
('0000000003', 'CS101', 'AY2526', 0, '2024-06-27 19:12:16', 'ACTIVE'),
('0000000004', 'CS201', 'AY-2425-1', 25, '2024-06-27 19:12:37', 'ACTIVE'),
('0000000005', 'CS103', 'AY-2425-1', 24, '2024-07-02 18:45:45', 'ACTIVE'),
('0000000006', 'IT301', 'AY-2425-1', 25, '2024-07-02 18:46:03', 'ACTIVE'),
('0000000007', 'IT401', 'AY-2425-1', 45, '2024-07-02 18:46:03', 'ACTIVE'),
('0000000008', 'CS701', 'AY-2425-1', 42, '2024-07-02 19:07:32', 'ACTIVE'),
('0000000009', 'CS101', 'r34223re', 24, '2024-07-03 06:56:25', 'ACTIVE'),
('0000000010', 'CS102', 'r34223re', 25, '2024-07-03 06:56:25', 'ACTIVE'),
('0000000011', 'CS103', 'r34223re', 23, '2024-07-03 06:56:25', 'ACTIVE'),
('0000000012', 'CS702', 'AY-2425-1', 25, '2024-08-07 20:16:45', 'ACTIVE'),
('0000000013', 'BS801', 'AY-2425-1', 10, '2024-08-09 16:22:16', 'ACTIVE'),
('0000000014', 'BS802', 'AY-2425-1', 25, '2024-08-09 16:22:16', 'ACTIVE');

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
('0000000001', 'Annex-A', 'A', '2024-06-21 09:07:43', 'ACTIVE'),
('0000000002', 'Annex-B', 'B', '2024-06-21 09:07:49', 'ACTIVE'),
('0000000003', 'Main', 'M', '2024-06-21 09:07:43', 'ACTIVE');

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
('0000000001', 'Audio Visual Room', '2024-06-21 09:08:43', 'ACTIVE'),
('0000000002', 'Computer Laboratory', '2024-06-21 09:08:13', 'ACTIVE'),
('0000000003', 'Lecture', '2024-06-21 09:08:13', 'ACTIVE');

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
('0000000001', 'First Floor', '2024-06-21 09:09:17', 'ACTIVE'),
('0000000002', 'Second Floor', '2024-06-21 09:09:17', 'ACTIVE'),
('0000000003', 'Third Floor', '2024-06-21 09:09:22', 'ACTIVE');

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
('0000000001', '101M', 45, 'Lecture', 'Main', 'First Floor', '2024-06-24 21:30:24', 'ACTIVE'),
('0000000002', '102M', 45, 'Lecture', 'Main', 'First Floor', '2024-06-24 21:30:46', 'ACTIVE'),
('0000000003', '103M', 25, 'Lecture', 'Main', 'First Floor', '2024-06-26 01:17:58', 'ACTIVE'),
('0000000004', '203M', 32, 'Computer Laboratory', 'Main', 'Second Floor', '2024-08-07 11:33:02', 'ARCHIVE'),
('0000000005', '301M', 45, 'Lecture', 'Main', 'Third Floor', '2024-06-21 09:09:46', 'ACTIVE'),
('0000000006', '302M', 45, 'Lecture', 'Main', 'Third Floor', '2024-06-23 11:08:23', 'ACTIVE'),
('0000000007', '303M', 45, 'Lecture', 'Main', 'Third Floor', '2024-06-23 11:08:38', 'ACTIVE'),
('0000000008', '304M', 45, 'Lecture', 'Main', 'Third Floor', '2024-06-23 11:08:58', 'ACTIVE'),
('0000000009', 'ComLab3', 45, 'Computer Laboratory', 'Main', 'Second Floor', '2024-07-10 07:58:56', 'ACTIVE'),
('0000000010', 'ComLab4', 45, 'Computer Laboratory', 'Main', 'Second Floor', '2024-06-26 01:18:15', 'ACTIVE'),
('0000000011', 'Court', 100, 'Lecture', 'Annex-B', 'First Floor', '2024-07-12 00:32:14', 'ACTIVE'),
('0000000012', 'ThWahat?', 24, 'Lecture', 'Main', 'First Floor', '2024-08-05 09:51:36', 'ARCHIVE');

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
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `SCDID` varchar(25) NOT NULL,
  `Section` varchar(255) NOT NULL,
  `CRS_Code` varchar(25) NOT NULL,
  `Room` varchar(255) NOT NULL,
  `Component` varchar(255) NOT NULL,
  `Units` double NOT NULL,
  `Day` varchar(255) NOT NULL,
  `StartTime` int(11) NOT NULL,
  `EndTime` int(11) NOT NULL,
  `SCHLID` varchar(255) NOT NULL,
  `ACY_Code` varchar(25) NOT NULL,
  `SCD_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `SCD_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`SCDID`, `Section`, `CRS_Code`, `Room`, `Component`, `Units`, `Day`, `StartTime`, `EndTime`, `SCHLID`, `ACY_Code`, `SCD_Created`, `SCD_Status`) VALUES
('0000000001', 'CS701', 'COSC003', '101M', 'Major Lecture', 2, 'Monday', 480, 600, 'dsadas', 'AY-2425-1', '2024-09-02 14:16:19', 'ACTIVE'),
('0000000002', 'CS702', 'COSC003', '101M', 'Major Lecture', 2, 'Monday', 840, 960, 'dsadas', 'AY-2425-1', '2024-09-02 14:16:19', 'ACTIVE'),
('0000000003', 'CS103', 'COSC004', '101M', 'Major Lecture', 2, 'Monday', 960, 1080, 'dsadas', 'AY-2425-1', '2024-09-02 14:16:19', 'ACTIVE'),
('0000000004', 'CS102', 'COSC004', 'ComLab3', 'Computer Laboratory', 3, 'Tuesday', 480, 660, 'dsadas', 'AY-2425-1', '2024-09-02 14:16:19', 'ACTIVE'),
('0000000005', 'CS103', 'COSC004', 'ComLab3', 'Computer Laboratory', 3, 'Tuesday', 660, 840, 'dsadas', 'AY-2425-1', '2024-09-02 14:16:19', 'ACTIVE'),
('0000000006', 'CS201', 'ENGI001', '101M', 'Major Lecture', 2, 'Monday', 600, 720, '02000000003', 'AY-2425-1', '2024-09-02 14:16:19', 'ACTIVE'),
('0000000007', 'CS102', 'COSC004', '101M', 'Major Lecture', 2, 'Monday', 720, 840, 'dsadas', 'AY-2425-1', '2024-09-02 14:16:19', 'ACTIVE');

--
-- Triggers `schedule`
--
DELIMITER $$
CREATE TRIGGER `SCDID` BEFORE INSERT ON `schedule` FOR EACH ROW BEGIN
	SET New.SCDID = LPAD((SELECT COUNT(*) FROM schedule) + 1, 10, "0");
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
('0000000001', 'BS101', 'ICT-COSC-001', 'First Semester', 'First Year', '2024-08-06 20:50:27', 'ACTIVE'),
('0000000002', 'BS102', 'ICT-COSC-001', 'First Semester', 'First Year', '2024-08-06 21:11:30', 'ACTIVE'),
('0000000003', 'BS103', 'ICT-COSC-001', 'First Semester', 'First Year', '2024-08-06 21:13:32', 'ACTIVE'),
('0000000004', 'BS104', 'ICT-COSC-001', 'First Semester', 'First Year', '2024-08-06 21:15:16', 'ACTIVE'),
('0000000005', 'BS105', 'ICT-COSC-001', 'First Semester', 'First Year', '2024-08-07 07:20:44', 'ACTIVE'),
('0000000006', 'BS201', 'ICT-COSC-001', 'Second Semester', 'First Year', '2024-08-06 20:50:27', 'ACTIVE'),
('0000000007', 'BS202', 'ICT-COSC-001', 'Second Semester', 'First Year', '2024-08-06 21:11:30', 'ACTIVE'),
('0000000008', 'BS203', 'ICT-COSC-001', 'Second Semester', 'First Year', '2024-08-06 21:13:32', 'ACTIVE'),
('0000000009', 'BS204', 'ICT-COSC-001', 'Second Semester', 'First Year', '2024-08-06 21:15:16', 'ACTIVE'),
('0000000010', 'BS205', 'ICT-COSC-001', 'Second Semester', 'First Year', '2024-08-07 07:20:44', 'ACTIVE'),
('0000000011', 'BS301', 'ICT-COSC-001', 'First Semester', 'Second Year', '2024-08-06 20:50:27', 'ACTIVE'),
('0000000012', 'BS302', 'ICT-COSC-001', 'First Semester', 'Second Year', '2024-08-06 21:13:32', 'ACTIVE'),
('0000000013', 'BS303', 'ICT-COSC-001', 'First Semester', 'Second Year', '2024-08-06 21:15:16', 'ACTIVE'),
('0000000014', 'BS304', 'ICT-COSC-001', 'First Semester', 'Second Year', '2024-08-07 07:20:44', 'ACTIVE'),
('0000000015', 'BS401', 'ICT-COSC-001', 'Second Semester', 'Second Year', '2024-08-06 20:50:27', 'ACTIVE'),
('0000000016', 'BS402', 'ICT-COSC-001', 'Second Semester', 'Second Year', '2024-08-06 21:13:32', 'ACTIVE'),
('0000000017', 'BS403', 'ICT-COSC-001', 'Second Semester', 'Second Year', '2024-08-06 21:15:16', 'ACTIVE'),
('0000000018', 'BS404', 'ICT-COSC-001', 'Second Semester', 'Second Year', '2024-08-07 07:20:44', 'ACTIVE'),
('0000000019', 'BS501', 'ICT-COSC-001', 'First Semester', 'Third Year', '2024-08-06 21:13:32', 'ACTIVE'),
('0000000020', 'BS502', 'ICT-COSC-001', 'First Semester', 'Third Year', '2024-08-06 21:15:16', 'ACTIVE'),
('0000000021', 'BS503', 'ICT-COSC-001', 'First Semester', 'Third Year', '2024-08-07 07:20:44', 'ACTIVE'),
('0000000022', 'BS601', 'ICT-COSC-001', 'Second Semester', 'Third Year', '2024-08-06 20:50:27', 'ACTIVE'),
('0000000023', 'BS602', 'ICT-COSC-001', 'Second Semester', 'Third Year', '2024-08-06 21:13:32', 'ACTIVE'),
('0000000024', 'BS603', 'ICT-COSC-001', 'Second Semester', 'Third Year', '2024-08-06 21:15:16', 'ACTIVE'),
('0000000025', 'BS604', 'ICT-COSC-001', 'Second Semester', 'Third Year', '2024-08-07 07:20:44', 'ACTIVE'),
('0000000026', 'BS701', 'ICT-COSC-001', 'First Semester', 'Fourth Year', '2024-08-06 21:13:32', 'ACTIVE'),
('0000000027', 'BS702', 'ICT-COSC-001', 'First Semester', 'Fourth Year', '2024-08-06 21:15:16', 'ACTIVE'),
('0000000028', 'BS703', 'ICT-COSC-001', 'First Semester', 'Fourth Year', '2024-08-07 07:20:45', 'ACTIVE'),
('0000000029', 'BS801', 'ICT-COSC-001', 'Second Semester', 'Fourth Year', '2024-08-06 21:13:32', 'ACTIVE'),
('0000000030', 'BS802', 'ICT-COSC-001', 'Second Semester', 'Fourth Year', '2024-08-06 21:15:16', 'ACTIVE'),
('0000000031', 'COE101', 'COE', 'First Semester', 'First Year', '2024-06-29 08:58:11', 'ACTIVE'),
('0000000032', 'COE102', 'COE', 'First Semester', 'First Year', '2024-08-07 07:21:43', 'ACTIVE'),
('0000000033', 'COE201', 'COE', 'Second Semester', 'First Year', '2024-06-29 08:58:11', 'ACTIVE'),
('0000000034', 'COE202', 'COE', 'Second Semester', 'First Year', '2024-08-07 07:21:43', 'ACTIVE'),
('0000000035', 'COE301', 'COE', 'First Semester', 'Second Year', '2024-06-29 08:58:11', 'ACTIVE'),
('0000000036', 'COE302', 'COE', 'First Semester', 'Second Year', '2024-08-07 07:21:43', 'ACTIVE'),
('0000000037', 'COE401', 'COE', 'Second Semester', 'Second Year', '2024-06-29 08:58:11', 'ACTIVE'),
('0000000038', 'COE402', 'COE', 'Second Semester', 'Second Year', '2024-08-07 07:21:43', 'ACTIVE'),
('0000000039', 'COE501', 'COE', 'First Semester', 'Third Year', '2024-06-29 08:58:11', 'ACTIVE'),
('0000000040', 'COE502', 'COE', 'First Semester', 'Third Year', '2024-08-07 07:21:43', 'ACTIVE'),
('0000000041', 'COE601', 'COE', 'Second Semester', 'Third Year', '2024-06-29 08:58:11', 'ACTIVE'),
('0000000042', 'COE602', 'COE', 'Second Semester', 'Third Year', '2024-08-07 07:21:43', 'ACTIVE'),
('0000000043', 'COE701', 'COE', 'First Semester', 'Fourth Year', '2024-06-29 08:58:11', 'ACTIVE'),
('0000000044', 'COE702', 'COE', 'First Semester', 'Fourth Year', '2024-08-07 07:21:43', 'ACTIVE'),
('0000000045', 'COE801', 'COE', 'Second Semester', 'Fourth Year', '2024-06-29 08:58:11', 'ACTIVE'),
('0000000046', 'COE802', 'COE', 'Second Semester', 'Fourth Year', '2024-08-07 07:21:43', 'ARCHIVE'),
('0000000047', 'CS101', 'COSC', 'First Semester', 'First Year', '2024-06-25 02:35:27', 'ACTIVE'),
('0000000048', 'CS102', 'COSC', 'First Semester', 'First Year', '2024-06-26 01:16:36', 'ACTIVE'),
('0000000049', 'CS103', 'COSC', 'First Semester', 'First Year', '2024-06-26 01:16:44', 'ACTIVE'),
('0000000050', 'CS104', 'COSC', 'First Semester', 'First Year', '2024-06-30 09:42:12', 'ARCHIVE'),
('0000000051', 'CS105', 'COSC', 'First Semester', 'First Year', '2024-06-30 09:42:18', 'ARCHIVE'),
('0000000052', 'CS201', 'COSC', 'Second Semester', 'First Year', '2024-06-25 02:35:27', 'ACTIVE'),
('0000000053', 'CS202', 'COSC', 'Second Semester', 'First Year', '2024-06-26 01:16:44', 'ACTIVE'),
('0000000054', 'CS301', 'COSC', 'First Semester', 'Second Year', '2024-06-25 02:35:27', 'ACTIVE'),
('0000000055', 'CS302', 'COSC', 'First Semester', 'Second Year', '2024-06-26 01:16:44', 'ACTIVE'),
('0000000056', 'CS401', 'COSC', 'Second Semester', 'Second Year', '2024-06-25 02:35:27', 'ACTIVE'),
('0000000057', 'CS402', 'COSC', 'Second Semester', 'Second Year', '2024-06-26 01:16:44', 'ACTIVE'),
('0000000058', 'CS501', 'COSC', 'First Semester', 'Third Year', '2024-06-25 02:35:27', 'ACTIVE'),
('0000000059', 'CS502', 'COSC', 'First Semester', 'Third Year', '2024-06-26 01:16:44', 'ACTIVE'),
('0000000060', 'CS601', 'COSC', 'Second Semester', 'Third Year', '2024-06-25 02:35:27', 'ACTIVE'),
('0000000061', 'CS602', 'COSC', 'Second Semester', 'Third Year', '2024-06-26 01:16:44', 'ACTIVE'),
('0000000062', 'CS701', 'COSC', 'First Semester', 'Fourth Year', '2024-06-25 02:35:27', 'ACTIVE'),
('0000000063', 'CS702', 'COSC', 'First Semester', 'Fourth Year', '2024-06-26 01:16:44', 'ACTIVE'),
('0000000064', 'CS801', 'COSC', 'Second Semester', 'Fourth Year', '2024-06-25 02:35:27', 'ACTIVE'),
('0000000065', 'CS803', 'COSC', 'Second Semester', 'Fourth Year', '2024-06-26 01:16:44', 'ACTIVE'),
('0000000066', 'IT101', 'INTE', 'First Semester', 'First Year', '2024-06-25 22:38:52', 'ACTIVE'),
('0000000067', 'IT102', 'INTE', 'First Semester', 'First Year', '2024-08-06 20:51:05', 'ACTIVE'),
('0000000068', 'IT201', 'INTE', 'Second Semester', 'First Year', '2024-06-25 22:38:52', 'ACTIVE'),
('0000000069', 'IT202', 'INTE', 'Second Semester', 'First Year', '2024-08-06 20:51:05', 'ACTIVE'),
('0000000070', 'IT301', 'INTE', 'First Semester', 'Second Year', '2024-06-25 22:38:52', 'ACTIVE'),
('0000000071', 'IT302', 'INTE', 'First Semester', 'Second Year', '2024-08-06 20:51:05', 'ACTIVE'),
('0000000072', 'IT401', 'INTE', 'Second Semester', 'Second Year', '2024-06-25 22:38:52', 'ACTIVE'),
('0000000073', 'IT501', 'INTE', 'First Semester', 'Third Year', '2024-06-25 22:38:52', 'ACTIVE'),
('0000000074', 'IT601', 'INTE', 'Second Semester', 'Third Year', '2024-06-25 22:38:52', 'ACTIVE'),
('0000000075', 'IT701', 'INTE', 'First Semester', 'Fourth Year', '2024-06-25 22:38:52', 'ACTIVE'),
('0000000076', 'IT801', 'INTE', 'Second Semester', 'Fourth Year', '2024-06-25 22:38:52', 'ACTIVE'),
('0000000077', 'SEE-ES FYFS', 'COSC', 'First Semester', 'First Year', '2024-08-05 10:19:03', 'ACTIVE');

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
('0000000001', 'First Semester', '2024-06-21 08:42:46', 'ACTIVE'),
('0000000002', 'Second Semester', '2024-06-21 08:42:52', 'ACTIVE');

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
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `SETID` varchar(25) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `DayStart` int(4) NOT NULL,
  `DayEnd` int(4) NOT NULL,
  `SET_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `SET_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`SETID`, `Title`, `DayStart`, `DayEnd`, `SET_Created`, `SET_Status`) VALUES
('0000000001', 'Default', 480, 1260, '2024-06-29 12:18:43', 'ACTIVE');

--
-- Triggers `settings`
--
DELIMITER $$
CREATE TRIGGER `SETID` BEFORE INSERT ON `settings` FOR EACH ROW BEGIN
	SET New.SETID = LPAD((SELECT COUNT(*) FROM settings) + 1, 10, "0");
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
  `SMS` varchar(255) NOT NULL,
  `YL` varchar(255) NOT NULL,
  `Component` varchar(255) NOT NULL,
  `STP_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `STP_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `setup`
--

INSERT INTO `setup` (`STPID`, `CRS_Code`, `CRR_Code`, `PRG_Code`, `SMS`, `YL`, `Component`, `STP_Created`, `STP_Status`) VALUES
('0000000001', 'COSC004', 'CRR2020', 'COSC', 'First Semester', 'First Year', 'Major Lecture', '2024-07-15 22:05:26', 'ACTIVE'),
('0000000002', 'COSC004', 'CRR2020', 'COSC', 'First Semester', 'First Year', 'Computer Laboratory', '2024-07-15 22:05:26', 'ACTIVE'),
('0000000003', 'COSC003', 'CRR2020', 'COSC', 'First Semester', 'Fourth Year', 'Major Lecture', '2024-07-15 22:20:40', 'ACTIVE'),
('0000000004', 'ENGI001', 'CRR2020', 'COSC', 'Second Semester', 'First Year', 'Major Lecture', '2024-07-16 20:41:21', 'ACTIVE'),
('0000000005', 'e', 'CRR2020', 'COSC', '', '', 'Major Lecture', '2024-08-07 07:24:33', 'ACTIVE');

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
('0000000001', '02000000002', 'COSC003', 'AY-2425-1', '2024-06-21 02:04:50', 'ACTIVE'),
('0000000002', '02000000001', 'COSC004', 'AY-2425-1', '2024-07-01 02:38:01', 'ACTIVE'),
('0000000003', '02000000003', 'ENGI001', 'AY-2425-1', '2024-07-16 20:42:28', 'ACTIVE'),
('0000000004', 'dsadas', 'COSC004', 'AY-2425-1', '2024-08-07 03:46:23', 'ACTIVE'),
('0000000005', 'dsadas', 'COSC003', 'AY-2425-1', '2024-08-07 03:46:23', 'ACTIVE'),
('0000000006', '02000000004', 'COSC004', 'AY-2425-1', '2024-08-07 03:46:41', 'ACTIVE'),
('0000000007', '02000000004', 'COSC003', 'AY-2425-1', '2024-08-07 03:46:41', 'ACTIVE'),
('0000000008', '02000257902', 'COSC002', 'AY-2425-1', '2024-08-07 03:47:40', 'ACTIVE'),
('0000000009', '02000257902', 'COSC004', 'AY-2425-1', '2024-08-07 03:47:40', 'ACTIVE'),
('0000000010', '02000257902', 'COSC003', 'AY-2425-1', '2024-08-07 03:47:40', 'ACTIVE'),
('0000000011', '02000257907', 'COSC001', 'AY-2425-1', '2024-08-09 07:32:02', 'ACTIVE');

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
-- Table structure for table `weeklyevent`
--

CREATE TABLE `weeklyevent` (
  `WKEID` varchar(25) NOT NULL,
  `WeeklyEvent` varchar(255) NOT NULL,
  `Day` enum('Monday','Tuesday','Wednesday','Thursday','Friday') NOT NULL,
  `StartTime` int(4) NOT NULL,
  `EndTime` int(4) NOT NULL,
  `WKE_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `WKE_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weeklyevent`
--

INSERT INTO `weeklyevent` (`WKEID`, `WeeklyEvent`, `Day`, `StartTime`, `EndTime`, `WKE_Created`, `WKE_Status`) VALUES
('0000000001', 'Kamustahan', 'Wednesday', 780, 870, '2024-06-29 12:08:59', 'ACTIVE'),
('0000000002', 'Flag Ceremony', 'Monday', 420, 480, '2024-06-29 12:29:26', 'ACTIVE');

--
-- Triggers `weeklyevent`
--
DELIMITER $$
CREATE TRIGGER `WKEID` BEFORE INSERT ON `weeklyevent` FOR EACH ROW BEGIN
	SET New.WKEID = LPAD((SELECT COUNT(*) FROM weeklyevent) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `whatatest`
--

CREATE TABLE `whatatest` (
  `image` varchar(255) NOT NULL,
  `sad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `yearlevel`
--

CREATE TABLE `yearlevel` (
  `YRLID` varchar(25) NOT NULL,
  `YearLevel` varchar(255) NOT NULL,
  `AcademicLevel` varchar(255) NOT NULL,
  `YRL_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `YRL_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `yearlevel`
--

INSERT INTO `yearlevel` (`YRLID`, `YearLevel`, `AcademicLevel`, `YRL_Created`, `YRL_Status`) VALUES
('0000000001', 'First Year', 'Tertiary', '2024-06-21 09:03:30', 'ACTIVE'),
('0000000002', 'Fourth Year', 'Tertiary', '2024-06-21 09:03:41', 'ACTIVE'),
('0000000003', 'Grade 11', 'Senior High School', '2024-06-21 09:03:55', 'ACTIVE'),
('0000000004', 'Grade 12', 'Senior High School', '2024-06-21 09:03:55', 'ACTIVE'),
('0000000005', 'Second Year', 'Tertiary', '2024-06-21 09:03:30', 'ACTIVE'),
('0000000006', 'Third Year', 'Tertiary', '2024-06-21 09:03:41', 'ACTIVE');

--
-- Triggers `yearlevel`
--
DELIMITER $$
CREATE TRIGGER `YRLID` BEFORE INSERT ON `yearlevel` FOR EACH ROW BEGIN
	SET New.YRLID = LPAD((SELECT COUNT(*) FROM yearlevel) + 1, 10, "0");
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `_users`
--

CREATE TABLE `_users` (
  `UUID` varchar(25) NOT NULL,
  `SCHLID` varchar(25) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `UserType` enum('Developer','Manager','Admin','User') NOT NULL,
  `UUID_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `UUID_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `_users`
--

INSERT INTO `_users` (`UUID`, `SCHLID`, `FirstName`, `LastName`, `Email`, `Password`, `UserType`, `UUID_Created`, `UUID_Status`) VALUES
('0000000001', '02000257000', 'Mark', 'Lape', 'lapemark11@gmail.com', '$2a$10$WaakTQb9XAAt9wijJ/iIVOKS//jXG9BebjkvndTuf0Dofkv/rU/Pm', 'Developer', '2024-08-17 19:43:47', 'ACTIVE'),
('0000000002', '02000257001', 'Joshua', 'Ramirez', 'joshramirez22@gmail.com', 'joshadd', 'Manager', '2024-08-17 20:21:21', 'ACTIVE'),
('0000000003', '2000257913', 'Cristylen', 'Esporsado', 'esporsado77@gmail.com', '$2a$10$WuaXDlTesnjUKRPWWzQe1uqRvkI/BoGmdeWus4IZZnpfQ7pqf6iim', 'Admin', '2024-09-03 03:32:55', 'ACTIVE');

--
-- Triggers `_users`
--
DELIMITER $$
CREATE TRIGGER `UUID` BEFORE INSERT ON `_users` FOR EACH ROW BEGIN
	SET New.UUID = LPAD((SELECT COUNT(*) FROM _users) + 1, 10, "0");
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
-- Indexes for table `coach_images`
--
ALTER TABLE `coach_images`
  ADD PRIMARY KEY (`CMGID`),
  ADD KEY `SCHLID` (`SCHLID`);

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
  ADD UNIQUE KEY `PLC_Code` (`PLC_Code`,`Room`),
  ADD UNIQUE KEY `Room_2` (`Room`),
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
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`SCDID`);

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
  ADD UNIQUE KEY `CRS_Code_2` (`CRS_Code`,`CRR_Code`,`PRG_Code`,`Component`),
  ADD KEY `CRRID` (`CRR_Code`),
  ADD KEY `Component` (`Component`),
  ADD KEY `CRS_Code` (`CRS_Code`),
  ADD KEY `PRG_Code` (`PRG_Code`),
  ADD KEY `YearLevel` (`YL`),
  ADD KEY `Semester` (`SMS`);

--
-- Indexes for table `specialization`
--
ALTER TABLE `specialization`
  ADD PRIMARY KEY (`SPLID`),
  ADD UNIQUE KEY `SCHLID` (`SCHLID`,`CRS_Code`,`ACY_Code`),
  ADD KEY `CCHID` (`SCHLID`),
  ADD KEY `CRSID` (`CRS_Code`),
  ADD KEY `ACY_Code` (`ACY_Code`);

--
-- Indexes for table `weeklyevent`
--
ALTER TABLE `weeklyevent`
  ADD PRIMARY KEY (`WKEID`),
  ADD UNIQUE KEY `WeeklyEvent` (`WeeklyEvent`);

--
-- Indexes for table `whatatest`
--
ALTER TABLE `whatatest`
  ADD PRIMARY KEY (`sad`);

--
-- Indexes for table `yearlevel`
--
ALTER TABLE `yearlevel`
  ADD PRIMARY KEY (`YearLevel`),
  ADD UNIQUE KEY `YRLID` (`YRLID`),
  ADD KEY `AcademicLevel` (`AcademicLevel`);

--
-- Indexes for table `_users`
--
ALTER TABLE `_users`
  ADD PRIMARY KEY (`UUID`),
  ADD UNIQUE KEY `SCHLID` (`SCHLID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Password` (`Password`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coach_images`
--
ALTER TABLE `coach_images`
  MODIFY `CMGID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `whatatest`
--
ALTER TABLE `whatatest`
  MODIFY `sad` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `academicyear`
--
ALTER TABLE `academicyear`
  ADD CONSTRAINT `academicyear_ibfk_1` FOREIGN KEY (`CRR_Code`) REFERENCES `curriculum` (`CRR_Code`) ON DELETE NO ACTION ON UPDATE CASCADE;

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
-- Constraints for table `placement`
--
ALTER TABLE `placement`
  ADD CONSTRAINT `placement_ibfk_1` FOREIGN KEY (`Room`) REFERENCES `room` (`Room`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `placement_ibfk_2` FOREIGN KEY (`Building`) REFERENCES `rom_building` (`Building`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `placement_ibfk_3` FOREIGN KEY (`Floor`) REFERENCES `rom_floor` (`Floor`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
