-- phpMyAdmin SQL Dump
-- version 3.5.5
-- http://www.phpmyadmin.net
--
-- Host: sql5.freemysqlhosting.net
-- Generation Time: Nov 10, 2014 at 02:01 AM
-- Server version: 5.5.38-0ubuntu0.14.04.1
-- PHP Version: 5.3.28

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sql554902`
--

-- --------------------------------------------------------

--
-- Table structure for table `Turkey_Large_Type`
--

CREATE TABLE IF NOT EXISTS `Turkey_Large_Type` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Component` varchar(128) DEFAULT NULL,
  `Unit` varchar(128) DEFAULT NULL,
  `0to4Weeks` double DEFAULT NULL,
  `4to8Weeks` double DEFAULT NULL,
  `8to12Weeks` double DEFAULT NULL,
  `12to16Weeks` double DEFAULT NULL,
  `16to20Weeks` double DEFAULT NULL,
  `20to24Weeks` double DEFAULT NULL,
  `Holding` double DEFAULT NULL,
  `Breeding` double DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=83 ;

--
-- Dumping data for table `Turkey_Large_Type`
--

INSERT INTO `Turkey_Large_Type` (`ID`, `Component`, `Unit`, `0to4Weeks`, `4to8Weeks`, `8to12Weeks`, `12to16Weeks`, `16to20Weeks`, `20to24Weeks`, `Holding`, `Breeding`) VALUES
(1, 'Protein', 'percent of diet', 28, 26, 22, 19, 16.5, 14, 12, 14),
(2, 'Arginine', 'percent of diet', 1.6, 1.5, 1.25, 1.1, 0.95, 0.8, 0.6, 0.6),
(3, 'Glycine/Serine', 'percent of diet', 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5),
(4, 'Histidine', 'percent of diet', 0.58, 0.54, 0.46, 0.39, 0.35, 0.29, 0.25, 0.3),
(5, 'Isoleucine', 'percent of diet', 1.1, 1, 0.85, 0.75, 0.65, 0.55, 0.45, 0.5),
(6, 'Leucine', 'percent of diet', 1.9, 1.75, 1.5, 1.3, 1.1, 0.95, 0.5, 0.5),
(7, 'Lysine', 'percent of diet', 1.6, 1.5, 1.3, 1, 0.8, 0.65, 0.5, 0.6),
(8, 'Cystine', 'percent of diet', 1.05, 0.9, 0.75, 0.65, 0.55, 0.45, 0.4, 0.4),
(9, 'Methionine', 'percent of diet', 0.53, 0.45, 0.38, 0.33, 0.28, 0.23, 0.2, 0.2),
(10, 'Tyrosine', 'percent of diet', 1.8, 1.65, 1.4, 1.2, 1.05, 0.9, 0.8, 1),
(11, 'Phenylalanine', 'percent of diet', 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.55),
(12, 'Threonine', 'percent of diet', 1, 0.93, 0.79, 0.68, 0.59, 0.5, 0.4, 0.45),
(13, 'Tryptophan', 'percent of diet', 0.26, 0.24, 0.2, 0.18, 0.15, 0.13, 0.1, 0.13),
(14, 'Valine', 'percent of diet', 1.2, 1.1, 0.94, 0.8, 0.7, 0.6, 0.5, 0.58),
(15, 'Linoleic Acid', 'percent of diet', 1, 1, 0.8, 0.8, 0.8, 0.8, 0.8, 1),
(16, 'Calcium', 'percent of diet', 1.2, 1, 0.85, 0.75, 0.65, 0.55, 0.5, 2.25),
(17, 'Phosphorus', 'percent of diet', 0.6, 0.5, 0.42, 0.38, 0.32, 0.28, 0.25, 0.35),
(18, 'Potassium', 'percent of diet', 0.7, 0.6, 0.5, 0.5, 0.4, 0.4, 0.4, 0.6),
(19, 'Sodium', 'percent of diet', 0.17, 0.15, 0.12, 0.12, 0.12, 0.12, 0.12, 0.15),
(20, 'Chlorine', 'percent of diet', 0.15, 0.14, 0.14, 0.12, 0.12, 0.12, 0.12, 0.12),
(21, 'Magnesium', 'percent of diet', 600, 600, 600, 600, 600, 600, 600, 600),
(22, 'Manganese', 'percent of diet', 60, 60, 60, 60, 60, 60, 60, 60),
(23, 'Zinc', 'percent of diet', 75, 65, 50, 40, 40, 40, 40, 65),
(24, 'Iron', 'percent of diet', 80, 60, 60, 60, 50, 50, 50, 60),
(25, 'Copper', 'percent of diet', 8, 8, 6, 6, 6, 6, 6, 8),
(26, 'Iodine', 'percent of diet', 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4),
(27, 'Selenium', 'percent of diet', 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2),
(28, 'Vitamin A', 'IU', 4, 4, 4, 4, 4, 4, 4, 4),
(29, 'Vitamin D', 'ICU', 900, 900, 900, 900, 900, 900, 900, 900),
(30, 'Vitamin E', 'IU', 12, 12, 10, 10, 10, 10, 10, 25),
(31, 'Vitamin K', 'percent of diet', 1, 1, 0.8, 0.8, 0.8, 0.8, 0.8, 1),
(32, 'Riboflavin', 'percent of diet', 3.6, 3.6, 3, 3, 2.5, 2.5, 2.5, 4),
(33, 'Pantothenic Acid', 'percent of diet', 11, 11, 9, 9, 9, 9, 9, 16),
(34, 'Niacin', 'percent of diet', 70, 70, 50, 50, 40, 40, 40, 30),
(35, 'Vitamin B12', 'percent of diet', 0.003, 0.003, 0.003, 0.003, 0.003, 0.003, 0.003, 0.003),
(36, 'Choline', 'percent of diet', 1, 1, 1, 1, 950, 800, 800, 1),
(37, 'Biotin', 'percent of diet', 0.2, 0.2, 0.15, 0.125, 0.1, 0.1, 0.1, 0.15),
(38, 'Folacin', 'percent of diet', 1, 1, 0.8, 0.8, 0.7, 0.7, 0.7, 1),
(39, 'Thiamin', 'percent of diet', 2, 2, 2, 2, 2, 2, 2, 2),
(40, 'Pyridoxine', 'percent of diet', 4.5, 4.5, 3.5, 3.5, 3, 3, 3, 4),
(41, 'Raw Ingredients', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(42, 'Component', 'Unit', 0, 4, 8, 12, 16, 20, 0, 0),
(43, 'Protein', 'percent of diet', 28, 26, 22, 19, 16.5, 14, 12, 14),
(44, 'Arginine', 'percent of diet', 1.6, 1.5, 1.25, 1.1, 0.95, 0.8, 0.6, 0.6),
(45, 'Glycine/Serine', 'percent of diet', 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5),
(46, 'Histidine', 'percent of diet', 0.58, 0.54, 0.46, 0.39, 0.35, 0.29, 0.25, 0.3),
(47, 'Isoleucine', 'percent of diet', 1.1, 1, 0.85, 0.75, 0.65, 0.55, 0.45, 0.5),
(48, 'Leucine', 'percent of diet', 1.9, 1.75, 1.5, 1.3, 1.1, 0.95, 0.5, 0.5),
(49, 'Lysine', 'percent of diet', 1.6, 1.5, 1.3, 1, 0.8, 0.65, 0.5, 0.6),
(50, 'Cystine', 'percent of diet', 1.05, 0.9, 0.75, 0.65, 0.55, 0.45, 0.4, 0.4),
(51, 'Methionine', 'percent of diet', 0.53, 0.45, 0.38, 0.33, 0.28, 0.23, 0.2, 0.2),
(52, 'Tyrosine', 'percent of diet', 1.8, 1.65, 1.4, 1.2, 1.05, 0.9, 0.8, 1),
(53, 'Phenylalanine', 'percent of diet', 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.55),
(54, 'Threonine', 'percent of diet', 1, 0.93, 0.79, 0.68, 0.59, 0.5, 0.4, 0.45),
(55, 'Tryptophan', 'percent of diet', 0.26, 0.24, 0.2, 0.18, 0.15, 0.13, 0.1, 0.13),
(56, 'Valine', 'percent of diet', 1.2, 1.1, 0.94, 0.8, 0.7, 0.6, 0.5, 0.58),
(57, 'Linoleic Acid', 'percent of diet', 1, 1, 0.8, 0.8, 0.8, 0.8, 0.8, 1),
(58, 'Calcium', 'percent of diet', 1.2, 1, 0.85, 0.75, 0.65, 0.55, 0.5, 2.25),
(59, 'Phosphorus', 'percent of diet', 0.6, 0.5, 0.42, 0.38, 0.32, 0.28, 0.25, 0.35),
(60, 'Potassium', 'percent of diet', 0.7, 0.6, 0.5, 0.5, 0.4, 0.4, 0.4, 0.6),
(61, 'Sodium', 'percent of diet', 0.17, 0.15, 0.12, 0.12, 0.12, 0.12, 0.12, 0.15),
(62, 'Chlorine', 'percent of diet', 0.15, 0.14, 0.14, 0.12, 0.12, 0.12, 0.12, 0.12),
(63, 'Magnesium', 'percent of diet', 600, 600, 600, 600, 600, 600, 600, 600),
(64, 'Manganese', 'percent of diet', 60, 60, 60, 60, 60, 60, 60, 60),
(65, 'Zinc', 'percent of diet', 75, 65, 50, 40, 40, 40, 40, 65),
(66, 'Iron', 'percent of diet', 80, 60, 60, 60, 50, 50, 50, 60),
(67, 'Copper', 'percent of diet', 8, 8, 6, 6, 6, 6, 6, 8),
(68, 'Iodine', 'percent of diet', 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4),
(69, 'Selenium', 'percent of diet', 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2),
(70, 'Vitamin A', 'IU', 4, 4, 4, 4, 4, 4, 4, 4),
(71, 'Vitamin D', 'ICU', 900, 900, 900, 900, 900, 900, 900, 900),
(72, 'Vitamin E', 'IU', 12, 12, 10, 10, 10, 10, 10, 25),
(73, 'Vitamin K', 'percent of diet', 1, 1, 0.8, 0.8, 0.8, 0.8, 0.8, 1),
(74, 'Riboflavin', 'percent of diet', 3.6, 3.6, 3, 3, 2.5, 2.5, 2.5, 4),
(75, 'Pantothenic Acid', 'percent of diet', 11, 11, 9, 9, 9, 9, 9, 16),
(76, 'Niacin', 'percent of diet', 70, 70, 50, 50, 40, 40, 40, 30),
(77, 'Vitamin B12', 'percent of diet', 0.003, 0.003, 0.003, 0.003, 0.003, 0.003, 0.003, 0.003),
(78, 'Choline', 'percent of diet', 1, 1, 1, 1, 950, 800, 800, 1),
(79, 'Biotin', 'percent of diet', 0.2, 0.2, 0.15, 0.125, 0.1, 0.1, 0.1, 0.15),
(80, 'Folacin', 'percent of diet', 1, 1, 0.8, 0.8, 0.7, 0.7, 0.7, 1),
(81, 'Thiamin', 'percent of diet', 2, 2, 2, 2, 2, 2, 2, 2),
(82, 'Pyridoxine', 'percent of diet', 4.5, 4.5, 3.5, 3.5, 3, 3, 3, 4);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
