CREATE SCHEMA `Res_Finder` ;

CREATE TABLE `Res_Finder`.`restaurants` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


INSERT INTO restaurants (name, type) VALUES ('Uzair', 'Indian');
INSERT INTO restaurants (name, type) VALUES ('Apple Bees', 'American');
INSERT INTO restaurants (name, type) VALUES ('McDonals', 'Burgers');
INSERT INTO restaurants (name, type) VALUES ('Winstop', 'Wings');

SELECT * FROM Res_Finder.restaurants WHERE type = 'Indian';
SELECT id FROM restaurants WHERE type = 'Indian';
SELECT name, id FROM restaurants WHERE type = 'Indian';

update restaurants SET name = 'Jollybee' WHERE id = 1;
update restaurants SET name = 'KFC' WHERE id = 2;

DELETE FROM restaurants WHERE id = 1;

CREATE TABLE `Res_Finder`.`addresses` (
  `idaddresses` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(255) NOT NULL,
  `street_number` VARCHAR(45) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `postal_code` INT NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idaddresses`));

CREATE TABLE `Res_Finder`.`types` (
  `types_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`types_id`));

DROP TABLE `Res_Finder`.`restaurants`;

CREATE TABLE `Res_Finder`.`restaurants` (
  `restaurants_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `address_id` INT NOT NULL,
  `type_id` INT NOT NULL,
  PRIMARY KEY (`restaurants_id`));

ALTER TABLE `Res_Finder`.`addresses` CHANGE COLUMN `idaddresses` `address_id` INT NOT NULL AUTO_INCREMENT ;

INSERT INTO `Res_Finder`.`types` (`name`) VALUES ('Italian');
INSERT INTO `Res_Finder`.`types` (`name`) VALUES ('German');
INSERT INTO `Res_Finder`.`types` (`name`) VALUES ('Indian');
INSERT INTO `Res_Finder`.`types` (`name`) VALUES ('American');
INSERT INTO `Res_Finder`.`types` (`name`) VALUES ('Mexican');

INSERT INTO `Res_Finder`.`addresses` (`street`, `street_number`, `city`, `postal_code`, `country`) VALUES ('Test Street', '72nd ', 'New York', 11372, 'USA');
INSERT INTO `Res_Finder`.`addresses` (`street`, `street_number`, `city`, `postal_code`, `country`) VALUES ('Second Street','27nd ','Boston ',14526,'USA');

INSERT INTO `Res_Finder`.`restaurants` (`name`, `address_id`, `type_id`) VALUES ( 'Curry House', 2, 3 );
INSERT INTO `Res_Finder`.`restaurants` (`name`, `address_id`, `type_id`) VALUES ( 'Taco House', 2, 5 );
INSERT INTO `Res_Finder`.`restaurants` (`name`, `address_id`, `type_id`) VALUES ( 'German Bratwurst', 1, 2 );
INSERT INTO `Res_Finder`.`restaurants` (`name`, `address_id`, `type_id`) VALUES ( 'Pasta House', 2, 1 );

INSERT INTO `Res_Finder`.`reviews` (`reviewer_name`, `rating`, `text`, `restaurant_id`) VALUES ('Uzair Vawda', 4, 'GOOD', 3);
INSERT INTO `Res_Finder`.`reviews` (`reviewer_name`, `rating`, `text`, `restaurant_id`) VALUES ('Uzair Vawda', 2, 'EHHH', 2);
INSERT INTO `Res_Finder`.`reviews` (`reviewer_name`, `rating`, `text`, `restaurant_id`) VALUES ('Uzair Vawda', 1, 'GOOD', 4);
INSERT INTO `Res_Finder`.`reviews` (`reviewer_name`, `rating`, `text`, `restaurant_id`) VALUES ('Uzair Vawda', 5, 'EHHH', 5);

SELECT * FROM `Res_Finder`.`reviews`;

SELECT * FROM restaurants INNER JOIN addresses ON (restaurants.address_id = addresses.address_id) 
SELECT * FROM restaurants INNER JOIN reviews ON (restaurants.restaurants_id = reviews.restaurant_id) WHERE reviews.rating > 2;
