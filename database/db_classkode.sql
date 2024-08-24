-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2024 at 07:30 PM
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
('0000000009', 'asdas', 'CRR2020', 'dasda', '2434', '6453', '2024-08-09 15:27:23', 'ARCHIVE'),
('0000000004', 'asdsda', 'CRR2020', 'dasdasdas', '1234', '1234', '2024-06-29 10:02:55', 'ARCHIVE'),
('0000000001', 'AY-2425', 'CRR2020', 'Academic Year 2024-2025', '2024', '2025', '2024-06-20 15:15:09', 'ACTIVE'),
('0000000002', 'AY2526', 'CRR2020', 'Academic Year 2025-2026', '2025', '2026', '2024-06-21 10:26:10', 'ARCHIVE'),
('0000000006', 'das', 'CRR2020', 'dasd', 'dsada', 'dsada', '2024-07-03 19:26:50', 'ARCHIVE'),
('0000000003', 'dasddas', 'CRR2020', 'asdasda', '1233', '2323', '2024-06-28 17:57:27', 'ARCHIVE'),
('0000000008', 'dsadadas', 'CRR2020', 'dasdasd', '2133', '4323', '2024-08-08 07:22:36', 'ARCHIVE'),
('0000000005', 'r34223re', 'CRR2020', 'rweqrwer', 'rwe', 'rewr', '2024-07-03 06:56:14', 'ARCHIVE'),
('0000000007', 'wqeqe', 'CRR2020', 'ewqeq', '2313', '3432', '2024-08-07 20:17:27', 'ARCHIVE');

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
('0000000002', '02000000002', 'AY-2425', 'Fulltime', '2024-06-27 06:03:26', 'ACTIVE'),
('0000000003', '02000000003', 'AY-2425', 'Parttime', '2024-07-01 10:36:38', 'ACTIVE'),
('0000000004', 'dsadas', 'AY-2425', 'Fulltime', '2024-08-07 11:46:23', 'ACTIVE'),
('0000000005', '02000000004', 'AY-2425', 'Parttime', '2024-08-07 11:46:41', 'ACTIVE'),
('0000000006', '02000257902', 'AY-2425', 'Parttime', '2024-08-07 11:47:40', 'ACTIVE'),
('0000000007', '02000257907', 'AY-2425', 'Parttime', '2024-08-09 15:32:02', 'ACTIVE');

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
('0000000001', '02000000001', 'DPT_ICT', 'Joshua Rhey', 'N', 'Oliveros', 'Male', 'oliveros.000001@munoz.sti.edu.ph', '09123456789', 'https://www.facebook.com', '', '2024-06-20 16:41:22', 'ACTIVE'),
('0000000002', '02000000002', 'DPT_ICT', 'Cristelyn', 'Q', 'Esporsado', 'Female', 'esporsado.000002@munoz.sti.edu.ph', '09123123123', 'https://www.facebook.com/RinkashimeTakanoku', '', '2024-06-21 19:08:36', 'ACTIVE'),
('0000000003', '02000000003', 'DPT_ENG', 'Mark', 'L', 'Lopez', 'Male', 'dasd', '09323232323', 'eq', '', '2024-06-21 19:41:01', 'ACTIVE'),
('0000000007', '02000000004', 'DPT_ICT', 'Yranimez', 'R', 'Repil', 'Male', 'yra@mez.com', '09249438539', 'https://www.facebook.comewqeqwqweq', 'image_1722838474947.png', '2024-08-05 06:14:37', 'ACTIVE'),
('0000000005', '02000257902', 'DPT_ICT', 'Joshua Rhey', 'N', 'Lape', 'Male', 'admin231@munoz.sti.edu.ph', '09562342123', 'test313123123', '', '2024-08-01 08:21:47', 'ACTIVE'),
('0000000009', '02000257905', 'BUS-MNG-001', 'Mark Limuel \'Maku\'', 'L', 'Lape', 'Male', 'lape@email.com', '03483569842', 'https://www.youtube.com/watch?v=dLXSJdTK9QI&t=1148s', 'image_1722841508046.jfif', '2024-08-05 07:05:10', 'ACTIVE'),
('0000000004', '02000257907', 'DPT_ICT', 'Mark', 'L', 'Lape', 'Male', 'lape.257907@munoz.sti.edu.ph', '09682348413', 'Facebook', '', '2024-07-15 08:15:18', 'ACTIVE'),
('0000000010', 'dsad', 'DPT_ICT', 'ada', 'das', 'dasdas', 'Male', 'dsa', 'dasdasd', 'dsada', 'image_1722844810063.jpg', '2024-08-05 08:00:11', 'ARCHIVE'),
('0000000012', 'dsadac', 'DPT_TRM', 'sadca', 'dcsac', 'ascdascdas', 'Male', 'acsdsa', 'dcsacdasc', 'dsacdascdasc', 'image_1723221338466.png', '2024-08-09 16:35:42', 'ACTIVE'),
('0000000006', 'dsadas', 'DPT_ICT', 'dasdas', 'dasds', 'adsada', 'Male', 'dsad', 'asdsada', 'dasd', 'image_1722838358421.png', '2024-08-05 06:12:45', 'ARCHIVE'),
('0000000011', 'fwver', 'DPT_ICT', 'wervwe', 'rvwer', 'vwervwerv', 'Male', 'rwverw', 'vrvwervwer', 'vrwevrwevwrev', 'image_1722878747141.png', '2024-08-05 17:25:50', 'ARCHIVE'),
('0000000008', 'wqceqwe', 'DPT_TRM', 'cqwce', 'qwec', 'wqecwqec', 'Male', 'cqwe', 'cwqecqwec', 'wqcewqc', 'image_1722839257962.jpg', '2024-08-05 06:27:40', 'ARCHIVE');

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
('0000000001', 'COSC001', 'COSC', 'Methods of Research', '2024-06-21 09:57:53', 'ACTIVE'),
('0000000002', 'ENGI001', 'COE', 'Computer Architecture', '2024-06-22 18:46:18', 'ACTIVE'),
('0000000003', 'COSC002', 'COSC', 'Thesis 1', '2024-06-22 18:51:09', 'ACTIVE'),
('0000000004', 'COSC003', 'COSC', 'Thesis 2', '2024-06-22 18:51:35', 'ACTIVE'),
('0000000005', 'COSC004', 'COSC', 'Computer Programming 5', '2024-06-26 18:20:16', 'ACTIVE'),
('0000000006', 'e', 'COE', 'e', '2024-08-04 17:56:02', 'ARCHIVE');

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
('0000000004', 'PE ( Tertiary )', 2, '2024-06-21 08:49:13', 'ACTIVE'),
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
('0000000005', '321cedwq', 'wqecwqe21c312c', '2024-08-07 19:57:55', 'ARCHIVE'),
('0000000001', 'CRR2020', 'Curriculum 2020', '2024-06-20 15:14:39', 'ACTIVE'),
('0000000003', 'CRR@#$@', 'eqweqeq', '2024-06-27 18:27:12', 'ARCHIVE'),
('0000000002', 'dsada', 'dsadasda', '2024-06-27 17:24:04', 'ARCHIVE'),
('0000000004', 'ewrfweff', 'efwfwfw', '2024-06-29 10:11:07', 'ARCHIVE');

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
('0000000010', 'asd', 'sad', 'asdasd', 'asd', '2024-08-04 06:47:36', 'ARCHIVE'),
('0000000009', 'BUS-MNG-001', 'Business & Management', 'BAM', 'Focuses on business thinking and problem solving skills that makes successful entrepreneurs.', '2024-08-04 06:45:24', 'ACTIVE'),
('0000000005', 'das', 'dasds', 'das', 'dasdas', '2024-06-22 08:20:09', 'ARCHIVE'),
('0000000007', 'dasd', 'ddqweq', 'ew', '', '2024-08-04 04:43:20', 'ARCHIVE'),
('0000000006', 'DPT_ENG', 'Engineering', 'ENG', 'test', '2024-06-22 18:00:14', 'ACTIVE'),
('0000000003', 'DPT_GEPSYCH', 'General Education and Psychology', 'GEPsych', '', '2024-06-21 20:14:19', 'ACTIVE'),
('0000000004', 'DPT_HM', 'Hospitality and Management', 'HM', '', '2024-06-21 20:16:07', 'ACTIVE'),
('0000000001', 'DPT_ICT', 'Information Communication Technology', 'ICT', '', '2024-06-20 16:17:56', 'ACTIVE'),
('0000000002', 'DPT_TRM', 'Tourism and Management', 'TM', '', '2024-06-20 17:17:51', 'ACTIVE'),
('0000000008', 'fsdf', 'sdfsd', 'fdsf', 'sdfs', '2024-08-04 04:48:37', 'ARCHIVE');

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
('0000000003', 'a-1-3', NULL, 'Annex-A', 'First Floor', '2024-08-07 16:40:06', 'ACTIVE'),
('0000000004', 'a-1-4', NULL, 'Annex-A', 'First Floor', '2024-08-07 16:40:06', 'ACTIVE'),
('0000000005', 'a-2-1', NULL, 'Annex-A', 'Second Floor', '2024-08-07 16:42:07', 'ACTIVE'),
('0000000006', 'a-3-1', NULL, 'Annex-A', 'Third Floor', '2024-08-07 16:47:19', 'ACTIVE'),
('0000000007', 'a-3-2', NULL, 'Annex-A', 'Third Floor', '2024-08-07 16:47:19', 'ACTIVE'),
('0000000008', 'a-3-3', NULL, 'Annex-A', 'Third Floor', '2024-08-07 16:47:44', 'ACTIVE'),
('0000000009', 'a-3-4', NULL, 'Annex-A', 'Third Floor', '2024-08-07 16:47:44', 'ACTIVE'),
('0000000010', 'b-1-1', NULL, 'Annex-B', 'First Floor', '2024-08-07 16:49:39', 'ACTIVE'),
('0000000019', 'b-1-10', NULL, 'Annex-B', 'First Floor', '2024-08-07 16:53:21', 'ACTIVE'),
('0000000011', 'b-1-2', NULL, 'Annex-B', 'First Floor', '2024-08-07 16:52:01', 'ACTIVE'),
('0000000012', 'b-1-3', NULL, 'Annex-B', 'First Floor', '2024-08-07 16:52:01', 'ACTIVE'),
('0000000013', 'b-1-4', NULL, 'Annex-B', 'First Floor', '2024-08-07 16:52:24', 'ACTIVE'),
('0000000014', 'b-1-5', NULL, 'Annex-B', 'First Floor', '2024-08-07 16:52:24', 'ACTIVE'),
('0000000015', 'b-1-6', NULL, 'Annex-B', 'First Floor', '2024-08-07 16:52:55', 'ACTIVE'),
('0000000016', 'b-1-7', NULL, 'Annex-B', 'First Floor', '2024-08-07 16:52:55', 'ACTIVE'),
('0000000017', 'b-1-8', NULL, 'Annex-B', 'First Floor', '2024-08-07 16:53:10', 'ACTIVE'),
('0000000018', 'b-1-9', NULL, 'Annex-B', 'First Floor', '2024-08-07 16:53:10', 'ACTIVE'),
('0000000020', 'b-2-1', NULL, 'Annex-B', 'Second Floor', '2024-08-07 16:57:04', 'ACTIVE'),
('0000000021', 'b-2-2', NULL, 'Annex-B', 'Second Floor', '2024-08-07 16:57:04', 'ACTIVE'),
('0000000022', 'b-2-3', NULL, 'Annex-B', 'Second Floor', '2024-08-07 16:57:19', 'ACTIVE'),
('0000000023', 'b-2-4', NULL, 'Annex-B', 'Second Floor', '2024-08-07 16:57:19', 'ACTIVE'),
('0000000024', 'b-2-5', NULL, 'Annex-B', 'Second Floor', '2024-08-07 16:57:34', 'ACTIVE'),
('0000000025', 'b-2-6', NULL, 'Annex-B', 'Second Floor', '2024-08-07 16:57:34', 'ACTIVE'),
('0000000026', 'b-2-7', NULL, 'Annex-B', 'Second Floor', '2024-08-07 16:57:43', 'ACTIVE'),
('0000000027', 'b-3-1', NULL, 'Annex-B', 'Third Floor', '2024-08-07 16:59:31', 'ACTIVE'),
('0000000028', 'b-3-2', NULL, 'Annex-B', 'Third Floor', '2024-08-07 16:59:31', 'ACTIVE'),
('0000000029', 'b-3-3', NULL, 'Annex-B', 'Third Floor', '2024-08-07 16:59:39', 'ACTIVE'),
('0000000030', 'mn-2-1', 'ComLab4', 'Main', 'Second Floor', '2024-08-07 17:41:10', 'ACTIVE'),
('0000000031', 'mn-2-2', NULL, 'Main', 'Second Floor', '2024-08-07 17:41:10', 'ACTIVE'),
('0000000032', 'mn-2-3', NULL, 'Main', 'Second Floor', '2024-08-07 17:41:24', 'ACTIVE'),
('0000000033', 'mn-2-4', NULL, 'Main', 'Second Floor', '2024-08-07 17:41:24', 'ACTIVE'),
('0000000034', 'mn-3-1', NULL, 'Main', 'Third Floor', '2024-08-07 17:58:08', 'ACTIVE'),
('0000000035', 'mn-3-2', '301M', 'Main', 'Third Floor', '2024-08-07 17:58:08', 'ACTIVE'),
('0000000036', 'mn-3-3', NULL, 'Main', 'Third Floor', '2024-08-07 17:58:20', 'ACTIVE'),
('0000000037', 'mn-3-4', NULL, 'Main', 'Third Floor', '2024-08-07 17:58:20', 'ACTIVE');

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
('0000000002', 'COE', 'DPT_ENG', 'Bachelor of Science in Computer Engineering', 'COE', 'Tertiary', '', '2024-06-22 17:55:04', 'ACTIVE'),
('0000000001', 'COSC', 'DPT_ICT', 'Bachelor of Science in Computer Science', 'CS', 'Tertiary', 'Add new Description', '2024-06-21 09:56:28', 'ACTIVE'),
('0000000005', 'dsad', 'DPT_ICT', 'asd', 'adasd', 'Senior High School', 'test', '2024-08-04 16:52:41', 'ARCHIVE'),
('0000000004', 'ICT-COSC-001', 'DPT_ICT', 'Bachelor of Science in Not Computer Science', 'BS', 'Tertiary', 'Program that offers computer science lessons that will focus on building and developing of software applications.', '2024-08-04 16:23:35', 'ACTIVE'),
('0000000003', 'INTE', 'DPT_ICT', 'Bachelor of Science in Information Technology', 'IT', 'Tertiary', 'This is not Test description, Please indicate what you want and is this thing working?', '2024-06-23 18:25:49', 'ACTIVE');

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
('0000000001', 'COE101', 'AY-2425', 35, '2024-06-23 20:00:31', 'ACTIVE'),
('0000000002', 'CS102', 'AY-2425', 25, '2024-06-25 09:26:18', 'ACTIVE'),
('0000000003', 'CS101', 'AY2526', 0, '2024-06-27 19:12:16', 'ACTIVE'),
('0000000004', 'CS201', 'AY-2425', 25, '2024-06-27 19:12:37', 'ACTIVE'),
('0000000005', 'CS103', 'AY-2425', 24, '2024-07-02 18:45:45', 'ACTIVE'),
('0000000006', 'IT301', 'AY-2425', 25, '2024-07-02 18:46:03', 'ACTIVE'),
('0000000007', 'IT401', 'AY-2425', 45, '2024-07-02 18:46:03', 'ACTIVE'),
('0000000008', 'CS701', 'AY-2425', 42, '2024-07-02 19:07:32', 'ACTIVE'),
('0000000009', 'CS101', 'r34223re', 24, '2024-07-03 06:56:25', 'ACTIVE'),
('0000000010', 'CS102', 'r34223re', 25, '2024-07-03 06:56:25', 'ACTIVE'),
('0000000011', 'CS103', 'r34223re', 23, '2024-07-03 06:56:25', 'ACTIVE'),
('0000000012', 'CS702', 'AY-2425', 25, '2024-08-07 20:16:45', 'ACTIVE'),
('0000000013', 'BS801', 'AY-2425', 10, '2024-08-09 16:22:16', 'ACTIVE'),
('0000000014', 'BS802', 'AY-2425', 25, '2024-08-09 16:22:16', 'ACTIVE');

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
('0000000001', 'Lecture', '2024-06-21 17:08:13', 'ACTIVE');

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
('0000000005', '101M', 45, 'Lecture', 'Main', 'First Floor', '2024-06-25 05:30:24', 'ACTIVE'),
('0000000006', '102M', 45, 'Lecture', 'Main', 'First Floor', '2024-06-25 05:30:46', 'ACTIVE'),
('0000000007', '103M', 25, 'Lecture', 'Main', 'First Floor', '2024-06-26 09:17:58', 'ACTIVE'),
('0000000012', '203M', 32, 'Computer Laboratory', 'Main', 'Second Floor', '2024-08-07 19:33:02', 'ARCHIVE'),
('0000000001', '301M', 45, 'Lecture', 'Main', 'Third Floor', '2024-06-21 17:09:46', 'ACTIVE'),
('0000000002', '302M', 45, 'Lecture', 'Main', 'Third Floor', '2024-06-23 19:08:23', 'ACTIVE'),
('0000000003', '303M', 45, 'Lecture', 'Main', 'Third Floor', '2024-06-23 19:08:38', 'ACTIVE'),
('0000000004', '304M', 45, 'Lecture', 'Main', 'Third Floor', '2024-06-23 19:08:58', 'ACTIVE'),
('0000000009', 'ComLab3', 45, 'Computer Laboratory', 'Main', 'Second Floor', '2024-07-10 15:58:56', 'ACTIVE'),
('0000000008', 'ComLab4', 45, 'Computer Laboratory', 'Main', 'Second Floor', '2024-06-26 09:18:15', 'ACTIVE'),
('0000000010', 'Court', 100, 'Lecture', 'Annex-B', 'First Floor', '2024-07-12 08:32:14', 'ACTIVE'),
('0000000011', 'ThWahat?', 24, 'Lecture', 'Main', 'First Floor', '2024-08-05 17:51:36', 'ARCHIVE');

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
('0000000001', 'CS201', 'ENGI001', '301M', 'Major Lecture', 2, 'Monday', 720, 840, '02000000003', 'AY-2425', '2024-08-22 18:51:33', 'ACTIVE'),
('0000000002', 'CS102', 'COSC004', '301M', 'Major Lecture', 2, 'Monday', 480, 600, '02000000001', 'AY-2425', '2024-08-22 18:51:33', 'ACTIVE'),
('0000000003', 'CS701', 'COSC003', '301M', 'Major Lecture', 2, 'Monday', 840, 960, '02000000002', 'AY-2425', '2024-08-22 18:51:33', 'ACTIVE'),
('0000000004', 'CS103', 'COSC004', '301M', 'Major Lecture', 2, 'Monday', 600, 720, '02000000001', 'AY-2425', '2024-08-22 18:51:33', 'ACTIVE'),
('0000000005', 'CS102', 'COSC004', 'ComLab4', 'Computer Laboratory', 3, 'Tuesday', 480, 660, '02000000001', 'AY-2425', '2024-08-22 18:51:33', 'ACTIVE'),
('0000000006', 'CS702', 'COSC003', '301M', 'Major Lecture', 2, 'Monday', 960, 1080, '02000000002', 'AY-2425', '2024-08-22 18:51:33', 'ACTIVE'),
('0000000007', 'CS103', 'COSC004', 'ComLab4', 'Computer Laboratory', 3, 'Tuesday', 660, 840, '02000000001', 'AY-2425', '2024-08-22 18:51:33', 'ACTIVE');

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
('0000000037', 'BS101', 'ICT-COSC-001', 'First Semester', 'First Year', '2024-08-07 04:50:27', 'ACTIVE'),
('0000000045', 'BS102', 'ICT-COSC-001', 'First Semester', 'First Year', '2024-08-07 05:11:30', 'ACTIVE'),
('0000000047', 'BS103', 'ICT-COSC-001', 'First Semester', 'First Year', '2024-08-07 05:13:32', 'ACTIVE'),
('0000000055', 'BS104', 'ICT-COSC-001', 'First Semester', 'First Year', '2024-08-07 05:15:16', 'ACTIVE'),
('0000000063', 'BS105', 'ICT-COSC-001', 'First Semester', 'First Year', '2024-08-07 15:20:44', 'ACTIVE'),
('0000000038', 'BS201', 'ICT-COSC-001', 'Second Semester', 'First Year', '2024-08-07 04:50:27', 'ACTIVE'),
('0000000046', 'BS202', 'ICT-COSC-001', 'Second Semester', 'First Year', '2024-08-07 05:11:30', 'ACTIVE'),
('0000000048', 'BS203', 'ICT-COSC-001', 'Second Semester', 'First Year', '2024-08-07 05:13:32', 'ACTIVE'),
('0000000056', 'BS204', 'ICT-COSC-001', 'Second Semester', 'First Year', '2024-08-07 05:15:16', 'ACTIVE'),
('0000000064', 'BS205', 'ICT-COSC-001', 'Second Semester', 'First Year', '2024-08-07 15:20:44', 'ACTIVE'),
('0000000039', 'BS301', 'ICT-COSC-001', 'First Semester', 'Second Year', '2024-08-07 04:50:27', 'ACTIVE'),
('0000000049', 'BS302', 'ICT-COSC-001', 'First Semester', 'Second Year', '2024-08-07 05:13:32', 'ACTIVE'),
('0000000057', 'BS303', 'ICT-COSC-001', 'First Semester', 'Second Year', '2024-08-07 05:15:16', 'ACTIVE'),
('0000000065', 'BS304', 'ICT-COSC-001', 'First Semester', 'Second Year', '2024-08-07 15:20:44', 'ACTIVE'),
('0000000040', 'BS401', 'ICT-COSC-001', 'Second Semester', 'Second Year', '2024-08-07 04:50:27', 'ACTIVE'),
('0000000050', 'BS402', 'ICT-COSC-001', 'Second Semester', 'Second Year', '2024-08-07 05:13:32', 'ACTIVE'),
('0000000058', 'BS403', 'ICT-COSC-001', 'Second Semester', 'Second Year', '2024-08-07 05:15:16', 'ACTIVE'),
('0000000066', 'BS404', 'ICT-COSC-001', 'Second Semester', 'Second Year', '2024-08-07 15:20:44', 'ACTIVE'),
('0000000051', 'BS501', 'ICT-COSC-001', 'First Semester', 'Third Year', '2024-08-07 05:13:32', 'ACTIVE'),
('0000000059', 'BS502', 'ICT-COSC-001', 'First Semester', 'Third Year', '2024-08-07 05:15:16', 'ACTIVE'),
('0000000067', 'BS503', 'ICT-COSC-001', 'First Semester', 'Third Year', '2024-08-07 15:20:44', 'ACTIVE'),
('0000000041', 'BS601', 'ICT-COSC-001', 'Second Semester', 'Third Year', '2024-08-07 04:50:27', 'ACTIVE'),
('0000000052', 'BS602', 'ICT-COSC-001', 'Second Semester', 'Third Year', '2024-08-07 05:13:32', 'ACTIVE'),
('0000000060', 'BS603', 'ICT-COSC-001', 'Second Semester', 'Third Year', '2024-08-07 05:15:16', 'ACTIVE'),
('0000000068', 'BS604', 'ICT-COSC-001', 'Second Semester', 'Third Year', '2024-08-07 15:20:44', 'ACTIVE'),
('0000000053', 'BS701', 'ICT-COSC-001', 'First Semester', 'Fourth Year', '2024-08-07 05:13:32', 'ACTIVE'),
('0000000061', 'BS702', 'ICT-COSC-001', 'First Semester', 'Fourth Year', '2024-08-07 05:15:16', 'ACTIVE'),
('0000000069', 'BS703', 'ICT-COSC-001', 'First Semester', 'Fourth Year', '2024-08-07 15:20:45', 'ACTIVE'),
('0000000054', 'BS801', 'ICT-COSC-001', 'Second Semester', 'Fourth Year', '2024-08-07 05:13:32', 'ACTIVE'),
('0000000062', 'BS802', 'ICT-COSC-001', 'Second Semester', 'Fourth Year', '2024-08-07 05:15:16', 'ACTIVE'),
('0000000026', 'COE101', 'COE', 'First Semester', 'First Year', '2024-06-29 16:58:11', 'ACTIVE'),
('0000000070', 'COE102', 'COE', 'First Semester', 'First Year', '2024-08-07 15:21:43', 'ACTIVE'),
('0000000027', 'COE201', 'COE', 'Second Semester', 'First Year', '2024-06-29 16:58:11', 'ACTIVE'),
('0000000071', 'COE202', 'COE', 'Second Semester', 'First Year', '2024-08-07 15:21:43', 'ACTIVE'),
('0000000028', 'COE301', 'COE', 'First Semester', 'Second Year', '2024-06-29 16:58:11', 'ACTIVE'),
('0000000072', 'COE302', 'COE', 'First Semester', 'Second Year', '2024-08-07 15:21:43', 'ACTIVE'),
('0000000029', 'COE401', 'COE', 'Second Semester', 'Second Year', '2024-06-29 16:58:11', 'ACTIVE'),
('0000000073', 'COE402', 'COE', 'Second Semester', 'Second Year', '2024-08-07 15:21:43', 'ACTIVE'),
('0000000030', 'COE501', 'COE', 'First Semester', 'Third Year', '2024-06-29 16:58:11', 'ACTIVE'),
('0000000074', 'COE502', 'COE', 'First Semester', 'Third Year', '2024-08-07 15:21:43', 'ACTIVE'),
('0000000031', 'COE601', 'COE', 'Second Semester', 'Third Year', '2024-06-29 16:58:11', 'ACTIVE'),
('0000000075', 'COE602', 'COE', 'Second Semester', 'Third Year', '2024-08-07 15:21:43', 'ACTIVE'),
('0000000032', 'COE701', 'COE', 'First Semester', 'Fourth Year', '2024-06-29 16:58:11', 'ACTIVE'),
('0000000076', 'COE702', 'COE', 'First Semester', 'Fourth Year', '2024-08-07 15:21:43', 'ACTIVE'),
('0000000033', 'COE801', 'COE', 'Second Semester', 'Fourth Year', '2024-06-29 16:58:11', 'ACTIVE'),
('0000000077', 'COE802', 'COE', 'Second Semester', 'Fourth Year', '2024-08-07 15:21:43', 'ARCHIVE'),
('0000000001', 'CS101', 'COSC', 'First Semester', 'First Year', '2024-06-25 10:35:27', 'ACTIVE'),
('0000000017', 'CS102', 'COSC', 'First Semester', 'First Year', '2024-06-26 09:16:36', 'ACTIVE'),
('0000000018', 'CS103', 'COSC', 'First Semester', 'First Year', '2024-06-26 09:16:44', 'ACTIVE'),
('0000000034', 'CS104', 'COSC', 'First Semester', 'First Year', '2024-06-30 17:42:12', 'ARCHIVE'),
('0000000035', 'CS105', 'COSC', 'First Semester', 'First Year', '2024-06-30 17:42:18', 'ARCHIVE'),
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
('0000000042', 'IT102', 'INTE', 'First Semester', 'First Year', '2024-08-07 04:51:05', 'ACTIVE'),
('0000000010', 'IT201', 'INTE', 'Second Semester', 'First Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000043', 'IT202', 'INTE', 'Second Semester', 'First Year', '2024-08-07 04:51:05', 'ACTIVE'),
('0000000011', 'IT301', 'INTE', 'First Semester', 'Second Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000044', 'IT302', 'INTE', 'First Semester', 'Second Year', '2024-08-07 04:51:05', 'ACTIVE'),
('0000000012', 'IT401', 'INTE', 'Second Semester', 'Second Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000013', 'IT501', 'INTE', 'First Semester', 'Third Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000014', 'IT601', 'INTE', 'Second Semester', 'Third Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000015', 'IT701', 'INTE', 'First Semester', 'Fourth Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000016', 'IT801', 'INTE', 'Second Semester', 'Fourth Year', '2024-06-26 06:38:52', 'ACTIVE'),
('0000000036', 'SEE-ES FYFS', 'COSC', 'First Semester', 'First Year', '2024-08-05 18:19:03', 'ACTIVE');

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
('0000000001', 'Default', 480, 1260, '2024-06-29 20:18:43', 'ACTIVE');

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
('0000000001', 'COSC004', 'CRR2020', 'COSC', 'First Semester', 'First Year', 'Major Lecture', '2024-07-16 06:05:26', 'ACTIVE'),
('0000000002', 'COSC004', 'CRR2020', 'COSC', 'First Semester', 'First Year', 'Computer Laboratory', '2024-07-16 06:05:26', 'ACTIVE'),
('0000000003', 'COSC003', 'CRR2020', 'COSC', 'First Semester', 'Fourth Year', 'Major Lecture', '2024-07-16 06:20:40', 'ACTIVE'),
('0000000004', 'ENGI001', 'CRR2020', 'COSC', 'Second Semester', 'First Year', 'Major Lecture', '2024-07-17 04:41:21', 'ACTIVE'),
('0000000005', 'e', 'CRR2020', 'COSC', '', '', 'Major Lecture', '2024-08-07 15:24:33', 'ACTIVE');

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
('0000000001', '02000000002', 'COSC003', 'AY-2425', '2024-06-21 10:04:50', 'ACTIVE'),
('0000000002', '02000000001', 'COSC004', 'AY-2425', '2024-07-01 10:38:01', 'ACTIVE'),
('0000000003', '02000000003', 'ENGI001', 'AY-2425', '2024-07-17 04:42:28', 'ACTIVE'),
('0000000004', 'dsadas', 'COSC004', 'AY-2425', '2024-08-07 11:46:23', 'ACTIVE'),
('0000000005', 'dsadas', 'COSC003', 'AY-2425', '2024-08-07 11:46:23', 'ACTIVE'),
('0000000006', '02000000004', 'COSC004', 'AY-2425', '2024-08-07 11:46:41', 'ACTIVE'),
('0000000007', '02000000004', 'COSC003', 'AY-2425', '2024-08-07 11:46:41', 'ACTIVE'),
('0000000008', '02000257902', 'COSC002', 'AY-2425', '2024-08-07 11:47:40', 'ACTIVE'),
('0000000009', '02000257902', 'COSC004', 'AY-2425', '2024-08-07 11:47:40', 'ACTIVE'),
('0000000010', '02000257902', 'COSC003', 'AY-2425', '2024-08-07 11:47:40', 'ACTIVE'),
('0000000011', '02000257907', 'COSC001', 'AY-2425', '2024-08-09 15:32:02', 'ACTIVE');

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
('0000000001', 'Kamustahan', 'Wednesday', 780, 870, '2024-06-29 20:08:59', 'ACTIVE'),
('0000000002', 'Flag Ceremony', 'Monday', 420, 480, '2024-06-29 20:29:26', 'ACTIVE');

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

--
-- Dumping data for table `whatatest`
--

INSERT INTO `whatatest` (`image`, `sad`) VALUES
('image_1722495190252.png', 1),
('image_1722495595783.png', 2);

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
('0000000003', 'First Year', 'Tertiary', '2024-06-21 17:03:30', 'ACTIVE'),
('0000000006', 'Fourth Year', 'Tertiary', '2024-06-21 17:03:41', 'ACTIVE'),
('00000000001', 'Grade 11', 'Senior High School', '2024-06-21 17:03:55', 'ACTIVE'),
('00000000002', 'Grade 12', 'Senior High School', '2024-06-21 17:03:55', 'ACTIVE'),
('0000000004', 'Second Year', 'Tertiary', '2024-06-21 17:03:30', 'ACTIVE'),
('0000000005', 'Third Year', 'Tertiary', '2024-06-21 17:03:41', 'ACTIVE');

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
  `Password` varchar(36) NOT NULL,
  `UserType` enum('Developer','Manager','Admin','User') NOT NULL,
  `UUID_Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `UUID_Status` enum('ACTIVE','ARCHIVE','PENDING') NOT NULL DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `_users`
--

INSERT INTO `_users` (`UUID`, `SCHLID`, `FirstName`, `LastName`, `Email`, `Password`, `UserType`, `UUID_Created`, `UUID_Status`) VALUES
('0000000001', '02000257000', 'Mark', 'Lape', 'lapemark11@gmail.com', 'admin', 'Developer', '2024-08-18 03:43:47', 'ACTIVE'),
('0000000002', '02000257001', 'Joshua', 'Ramirez', 'joshramirez22@gmail.com', 'joshadd', 'Manager', '2024-08-18 04:21:21', 'ACTIVE');

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
  MODIFY `sad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
