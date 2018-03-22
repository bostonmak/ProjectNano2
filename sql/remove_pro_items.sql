DELIMITER $$

DROP FUNCTION IF EXISTS `maplesolaxia`.`remove_pro_items` $$
CREATE FUNCTION `maplesolaxia`.`remove_pro_items` () RETURNS INT
BEGIN
DECLARE done INT DEFAULT FALSE;
DECLARE item_id INT;
DECLARE num_removed INT DEFAULT 0;
DECLARE cur CURSOR FOR SELECT inventoryitemid FROM inventoryequipment e WHERE e.watk > 200 LIMIT 1;

OPEN cur;
  read_loop: LOOP
    FETCH cur INTO item_id;
  if item_id = null then
    LEAVE read_loop;
  end if;
  delete from inventoryitems where inventoryitemid = item_id;
  set num_removed = num_removed + 1;
  end loop;
CLOSE cur;
return num_removed;
END $$
DELIMITER ;