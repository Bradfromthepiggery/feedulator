-- phpMyAdmin SQL Dump
-- version 3.5.5
-- http://www.phpmyadmin.net
--
-- Host: sql5.freemysqlhosting.net
-- Generation Time: Nov 30, 2014 at 09:44 PM
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
-- Table structure for table `API_List`
--

CREATE TABLE IF NOT EXISTS `API_List` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `API_List`
--

INSERT INTO `API_List` (`id`, `name`, `value`) VALUES
(1, 'feedulator', '{\r\n  "animal_all_url": "http://thepiggery.net:8011/feedulator/animal/all",\r\n  "animal_one_url": "http://thepiggery.net:8011/feedulator/animal/{aninmal''s name}",\r\n  "component_all_url": "http://thepiggery.net:8011/feedulator/component/all",\r\n  "component_one_url": "http://thepiggery.net:8011/feedulator/component/{component''s name}",\r\n  "mixture_all_url": "http://thepiggery.net:8011/feedulator/mixture/all",\r\n  "mixture_one_url": "http://thepiggery.net:8011/feedulator/mixture/{mixture''s name}"\r\n}');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
