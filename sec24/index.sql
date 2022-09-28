CREATE SCHEMA `blog` ;

CREATE TABLE `blog`.`authors` (
  `author_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`author_id`));

CREATE TABLE `blog`.`posts` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `summary` VARCHAR(255) NOT NULL,
  `body` VARCHAR(45) NOT NULL,
  `date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `author_id` INT NOT NULL,
  PRIMARY KEY (`post_id`));

INSERT INTO `blog`.`posts` (`title`, `summary`, `body`, `author_id`) VALUES ('test blog 1', 'test blog summary', 'main project body', 1);

INSERT INTO `blog`.`authors` (`name`, `email`) VALUES ('Uzair Vawda', 'uzair.vawda@gmail.com');
INSERT INTO `blog`.`authors` (`name`, `email`) VALUES ('John Doe', 'john.doe@gmail.com');