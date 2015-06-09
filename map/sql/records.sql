-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2+deb7u1
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Genereertijd: 09 jun 2015 om 14:49
-- Serverversie: 5.5.41
-- PHP-Versie: 5.4.39-0+deb7u2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databank: `kijkinjewijk`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `records`
--

CREATE TABLE IF NOT EXISTS `records` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Longitude` double NOT NULL,
  `Latitude` double NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Text` longtext NOT NULL,
  `Afbeelding` varchar(255) NOT NULL,
  `VideoName` varchar(100) NOT NULL,
  `Type` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Gegevens worden uitgevoerd voor tabel `records`
--

INSERT INTO `records` (`ID`, `Longitude`, `Latitude`, `Title`, `Text`, `Afbeelding`, `VideoName`, `Type`) VALUES
(1, 4.48758, 51.92071, 'Race The Tube', 'Racing the Tube Metro in Rotterdam #racethetube\r\n\r\nA 500m run from station Beurs to station Leuvehaven.\r\nTime To Beat - 1:49\r\n\r\nWatch 18 year-old Sanyu Fernandes race the tube!', '1432199877.jpg', 'https://www.youtube.com/embed/3ajv90Ia5aM', 'NieuwsVideo'),
(2, 4.48881, 51.91977, 'Erasmus MC test middel tegen asbestkanker', 'Het Rotterdamse Erasmus MC is begonnen met het testen van een experimenteel middel tegen asbestkanker. Het middel wordt in het ziekenhuis geproduceerd. Negen mensen doen mee aan de proef, aldus Rijnmond.', '58162_ErasmusMC', '', 'Nieuws'),
(3, 4.312134, 51.580483, 'Welberg de gekste', '', '', 'WelbergCentrum', 'Nieuws');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
