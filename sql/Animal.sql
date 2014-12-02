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
-- Table structure for table `Animal`
--

CREATE TABLE IF NOT EXISTS `Animal` (
  `key` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `Animal`
--

INSERT INTO `Animal` (`key`, `name`, `value`) VALUES
(1, 'pig_nursery', '"pig_nursery": {\r\n        "type": "Nursery Pig",\r\n        "targetDiets": {\r\n            "enumType": "weight",\r\n            "data": [{\r\n                "id": "phase1",\r\n                "name": "Phase 1",\r\n                "minLabel": 9,\r\n                "maxLabel": 11,\r\n                "nutrients": {\r\n                    "lysine": {\r\n                        "value": 1.7,\r\n                        "unit": "%"\r\n                    },\r\n                    "calcium": {\r\n                        "value": 0.90,\r\n                        "unit": "%"\r\n                    },\r\n                    "threonine": {\r\n                        "value": 0.97,\r\n                        "unit": "%"\r\n                    },\r\n                    "methionine": {\r\n                        "value": 0.44,\r\n                        "unit": "%"\r\n                    },\r\n                    "tryptophan": {\r\n                        "value": 0.27,\r\n                        "unit": "%"\r\n                    }\r\n                }\r\n            }, {\r\n                "id": "phase2",\r\n                "name": "Phase 2",\r\n                "minLabel": 11,\r\n                "maxLabel": 15,\r\n                "nutrients": {\r\n                    "lysine": {\r\n                        "value": 1.65,\r\n                        "unit": "%"\r\n                    },\r\n                    "calcium": {\r\n                        "value": 0.85,\r\n                        "unit": "%"\r\n                    },\r\n                    "threonine": {\r\n                        "value": 0.94,\r\n                        "unit": "%"\r\n                    },\r\n                    "methionine": {\r\n                        "value": 0.42,\r\n                        "unit": "%"\r\n                    },\r\n                    "tryptophan": {\r\n                        "value": 0.26,\r\n                        "unit": "%"\r\n                    }\r\n                }\r\n            }, {\r\n                "id": "phase3",\r\n                "name": "Phase 3",\r\n                "minLabel": 15,\r\n                "maxLabel": 25,\r\n                "nutrients": {\r\n                    "lysine": {\r\n                        "value": 1.44,\r\n                        "unit": "%"\r\n                    },\r\n                    "calcium": {\r\n                        "value": 0.85,\r\n                        "unit": "%"\r\n                    },\r\n                    "threonine": {\r\n                        "value": 0.81,\r\n                        "unit": "%"\r\n                    },\r\n                    "methionine": {\r\n                        "value": 0.37,\r\n                        "unit": "%"\r\n                    },\r\n                    "tryptophan": {\r\n                        "value": 0.22,\r\n                        "unit": "%"\r\n                    }\r\n                }\r\n            }, {\r\n                "id": "phase4",\r\n                "name": "Phase 4",\r\n                "minLabel": 25,\r\n                "maxLabel": 45,\r\n                "nutrients": {\r\n                    "lysine": {\r\n                        "value": 1.38,\r\n                        "unit": "%"\r\n                    },\r\n                    "calcium": {\r\n                        "value": 0.75,\r\n                        "unit": "%"\r\n                    },\r\n                    "threonine": {\r\n                        "value": 0.78,\r\n                        "unit": "%"\r\n                    },\r\n                    "methionine": {\r\n                        "value": 0.35,\r\n                        "unit": "%"\r\n                    },\r\n                    "tryptophan": {\r\n                        "value": 0.21,\r\n                        "unit": "%"\r\n                    }\r\n                }\r\n            }]\r\n        }\r\n    }');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
