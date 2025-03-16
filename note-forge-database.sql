-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema note_forge
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema note_forge
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `note_forge` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `note_forge` ;

-- -----------------------------------------------------
-- Table `note_forge`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `note_forge`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `country` VARCHAR(50) NULL DEFAULT NULL,
  `role` VARCHAR(50) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `note_forge`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `note_forge`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `user_id` INT NULL DEFAULT NULL,
  `image_url` VARCHAR(500) NULL DEFAULT NULL,
  `is_pinned` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `note_forge`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `note_forge`.`exercises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `note_forge`.`exercises` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `difficulty` VARCHAR(50) NULL DEFAULT NULL,
  `reference` VARCHAR(255) NULL DEFAULT NULL,
  `answer` TEXT NULL DEFAULT NULL,
  `duration` VARCHAR(150) NULL DEFAULT NULL,
  `tags` VARCHAR(255) NULL DEFAULT NULL,
  `details` TEXT NULL DEFAULT NULL,
  `user_id` INT NULL DEFAULT NULL,
  `image_url` VARCHAR(500) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `exercises_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `note_forge`.`users` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `note_forge`.`exercises_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `note_forge`.`exercises_categories` (
  `exercise_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`exercise_id`, `category_id`),
  INDEX `category_id` (`category_id` ASC) VISIBLE,
  CONSTRAINT `exercises_categories_ibfk_1`
    FOREIGN KEY (`exercise_id`)
    REFERENCES `note_forge`.`exercises` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `exercises_categories_ibfk_2`
    FOREIGN KEY (`category_id`)
    REFERENCES `note_forge`.`categories` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `note_forge`.`guides`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `note_forge`.`guides` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NULL DEFAULT NULL,
  `user_id` INT NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `guides_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `note_forge`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `note_forge`.`guide_exercises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `note_forge`.`guide_exercises` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `guide_id` INT NULL DEFAULT NULL,
  `exercise_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `guide_id` (`guide_id` ASC) VISIBLE,
  INDEX `exercise_id` (`exercise_id` ASC) VISIBLE,
  CONSTRAINT `guide_exercises_ibfk_1`
    FOREIGN KEY (`guide_id`)
    REFERENCES `note_forge`.`guides` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `guide_exercises_ibfk_2`
    FOREIGN KEY (`exercise_id`)
    REFERENCES `note_forge`.`exercises` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
