CREATE TABLE IF NOT EXISTS `inventorymerchant` (
  `inventorymerchantid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inventoryitemid` int(10) unsigned NOT NULL DEFAULT '0',
  `characterid` int(11) DEFAULT NULL,
  `bundles` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`inventorymerchantid`),
  KEY `INVENTORYITEMID` (`inventoryitemid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;