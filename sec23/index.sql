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