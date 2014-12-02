-- phpMyAdmin SQL Dump
-- version 3.5.5
-- http://www.phpmyadmin.net
--
-- Host: sql5.freemysqlhosting.net
-- Generation Time: Nov 22, 2014 at 05:17 PM
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
-- Table structure for table `Mixture`
--

CREATE TABLE IF NOT EXISTS `Mixture` (
  `key` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `Mixture`
--

INSERT INTO `Mixture` (`key`, `name`, `value`) VALUES
(1, 'mixtureA', '"mixtureA": {\r\n        "name": "Mixture A",\r\n        "batchId": "feed_a",\r\n        "description": "Lorem Ipsum",\r\n        "public": true,\r\n        "animalData": {\r\n            "animalId": "pig_nursery",\r\n            "targetDietId": "phase2",\r\n            "gmoFree": true\r\n        },\r\n        "ingData": [{\r\n            "ingId": "wheyABC",\r\n            "cost": 1.5,\r\n            "value": 0.8\r\n        }, {\r\n            "ingId": "cornABC",\r\n            "cost": 1.25,\r\n            "value": 0.15\r\n        }, {\r\n            "ingId": "cornWaspieValley",\r\n            "cost": 1.5,\r\n            "value": 0.05\r\n        }],\r\n        "optData": {\r\n            "constraints": [{\r\n                "ingredientId": "wheyABC",\r\n                "type": "lessThan",\r\n                "value": 1\r\n            }, {\r\n                "ingredientId": "cornWaspieValley",\r\n                "type": "greaterThan",\r\n                "value": 3.5\r\n            }]\r\n        }\r\n    }');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
