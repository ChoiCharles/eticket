CREATE DATABASE
    IF NOT EXISTS `eticket` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `eticket`;

CREATE TABLE
    IF NOT EXISTS `venue` (
        `venue_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `address` VARCHAR(255) NOT NULL,
        `latitude` DECIMAL(38, 2) NOT NULL,
        `longitude` DECIMAL(38, 2) NOT NULL,
        `name` VARCHAR(255) NOT NULL
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `concert_hall` (
        `concert_hall_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `hall_whole_view_image` VARCHAR(255) NULL DEFAULT NULL,
        `name` VARCHAR(255) NOT NULL,
        `seat_count` INT NOT NULL,
        `venue_id` INT DEFAULT NULL
    ) ENGINE = InnoDB;

ALTER TABLE `concert_hall`
ADD
    CONSTRAINT FK__concert_hall__venue FOREIGN KEY (`venue_id`) REFERENCES `venue` (`venue_id`);

CREATE TABLE
    IF NOT EXISTS `user` (
        `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `username` VARCHAR(255) NOT NULL UNIQUE,
        `nickname` VARCHAR(255) NOT NULL,
        `password` VARCHAR(255) NOT NULL,
        `email` VARCHAR(255) NOT NULL,
        `role` VARCHAR(16) NOT NULL,
        `wallet_address` VARBINARY(40) UNIQUE DEFAULT NULL
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `performance` (
        `performance_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `cast` VARCHAR(255) DEFAULT NULL,
        `description` VARCHAR(255) DEFAULT NULL,
        `detail_image_path` VARCHAR(255) NOT NULL,
        `genre` VARCHAR(32) NOT NULL,
        `poster_image_path` VARCHAR(255) NULL DEFAULT NULL,
        `running_time` INT NOT NULL,
        `ticketing_open_date_time` DATETIME(6) NOT NULL,
        `title` VARCHAR(255) NOT NULL,
        `concert_hall_id` INT NOT NULL,
        `user_id` INT NOT NULL
    ) ENGINE = InnoDB;

ALTER TABLE `performance`
ADD
    CONSTRAINT `FK__performance__concert_hall` FOREIGN KEY (`concert_hall_id`) REFERENCES `concert_hall` (`concert_hall_id`);

ALTER TABLE `performance`
ADD
    CONSTRAINT `FK__performance__user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

CREATE TABLE
    IF NOT EXISTS `performance_schedule` (
        `performance_schedule_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `start_date_time` DATETIME NOT NULL,
        `performance_id` INT NOT NULL
    ) ENGINE = InnoDB;

ALTER TABLE
    `performance_schedule`
ADD
    CONSTRAINT `FK__performance_schedule__performance` FOREIGN KEY (`performance_id`) REFERENCES `performance` (`performance_id`);

CREATE TABLE
    IF NOT EXISTS `section` (
        `section_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `section_seat_count` INT NOT NULL,
        `concert_hall_id` INT NOT NULL
    ) ENGINE = InnoDB;

ALTER TABLE `section`
ADD
    CONSTRAINT `FK__section__concert_hall` FOREIGN KEY (`concert_hall_id`) REFERENCES `concert_hall` (`concert_hall_id`);

CREATE TABLE
    IF NOT EXISTS `seat` (
        `seat_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `number` VARCHAR(255) NOT NULL,
        `seat_row` VARCHAR(255) DEFAULT NULL,
        `section_id` INT NOT NULL
    ) ENGINE = InnoDB;

ALTER TABLE `seat`
ADD
    CONSTRAINT `FK__seat__section` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`);

CREATE TABLE
    IF NOT EXISTS `reservation` (
        `reservation_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `user_id` INT NOT NULL,
        `performance_schedule_id` INT NOT NULL,
        `seat_id` INT NOT NULL,
        `payment_amount` INT NOT NULL,
        `status` ENUM('CANCEL', 'MINTED', 'SOLDOUT') NOT NULL DEFAULT 'SOLDOUT',
        `reservation_time` DATETIME NOT NULL,
        `cancellation_time` DATETIME DEFAULT NULL
    ) ENGINE = InnoDB;

ALTER TABLE `reservation`
ADD
    CONSTRAINT `FK__reservation__user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `reservation`
ADD
    CONSTRAINT `FK__reservation__performance_schedule` FOREIGN KEY (`performance_schedule_id`) REFERENCES `performance_schedule` (`performance_schedule_id`);

ALTER TABLE `reservation`
ADD
    CONSTRAINT `FK__reservation__seat` FOREIGN KEY (`seat_id`) REFERENCES `seat` (`seat_id`);

CREATE TABLE
    IF NOT EXISTS `seat_class` (
        `seat_class_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `performance_id` INT NOT NULL,
        `class_name` VARCHAR(255) NOT NULL,
        `price` INT NOT NULL
    ) ENGINE = InnoDB;

ALTER TABLE `seat_class`
ADD
    CONSTRAINT `FK__seat_class__performance` FOREIGN KEY (`performance_id`) REFERENCES `performance` (`performance_id`);

CREATE TABLE
    IF NOT EXISTS `section_and_seat_class_relation` (
        `section_and_seat_class_relation_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `seat_class_id` INT NOT NULL,
        `section_id` INT NOT NULL
    ) ENGINE = InnoDB;

ALTER TABLE
    `section_and_seat_class_relation`
ADD
    CONSTRAINT `FK__section_and_seat_class_relation__section` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`);

ALTER TABLE
    `section_and_seat_class_relation`
ADD
    CONSTRAINT `FK__section_and_seat_class_relation__seat_class` FOREIGN KEY (`seat_class_id`) REFERENCES `seat_class` (`seat_class_id`);

CREATE TABLE
    IF NOT EXISTS `block_sync_log` (
        `block_sync_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `lower_block` BIGINT NOT NULL,
        `upper_block` BIGINT NOT NULL,
        `sync_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    IF NOT EXISTS `nft_ticket` (
        `token_id` binary(32) NOT NULL PRIMARY KEY,
        `owner` binary(20) NOT NULL
    );

ALTER TABLE `nft_ticket` ADD INDEX `IDX_nft_ticket_owner` (`owner`);

INSERT INTO
    `user` (
        `id`,
        `username`,
        `password`,
        `nickname`,
        `email`,
        `role`
    )
VALUES (
        1,
        "SSAFYC203",
        "SSAFYC203",
        "SSAFYC203",
        "ssafy@ssafy.com",
        "GUEST"
    );

INSERT INTO
    `concert_hall` (
        `concert_hall_id`,
        `name`,
        `seat_count`
    )
VALUES (1, "올림픽 공원", 80);

INSERT INTO
    `section` (
        `section_id`,
        `name`,
        `concert_hall_id`,
        `section_seat_count`
    )
VALUES (1, "A", 1, 20), (2, "B", 1, 20), (3, "C", 1, 20), (4, "D", 1, 20);

INSERT INTO
    `performance` (
        `performance_id`,
        `title`,
        `cast`,
        `description`,
        `genre`,
        `poster_image_path`,
        `running_time`,
        `ticketing_open_date_time`,
        `concert_hall_id`,
        `user_id`,
        `detail_image_path`
    )
VALUES (
        1,
        "2023 라포엠 단독콘서트",
        "라포엠",
        "라포엠 콘서트",
        "CONCERT",
        "https://tickets.interpark.com/contents/_next/image?url=https%3A%2F%2Fticketimage.interpark.com%2FPlay%2Fimage%2Flarge%2F23%2F23013495_p.gif&w=750&q=75",
        120,
        '2023-10-1 00:00:00',
        1,
        1,
        "https://ticketimage.interpark.com/Play/image/etc/23/23013495-02.jpg"
    ), (
        2,
        "2023 이승환 콘서트",
        "이승환",
        "이승환 콘서트",
        "CONCERT",
        "https://tickets.interpark.com/contents/_next/image?url=https%3A%2F%2Fticketimage.interpark.com%2FPlay%2Fimage%2Flarge%2F23%2F23013154_p.gif&w=750&q=75",
        120,
        '2023-10-1 00:00:00',
        1,
        1,
        "https://ticketimage.interpark.com/Play/image/etc/23/23013590-01.jpg"
    ), (
        3,
        "그랜드 민트 페스티벌 2023",
        "민트",
        "페스티벌",
        "CONCERT",
        "https://tickets.interpark.com/contents/_next/image?url=https%3A%2F%2Fticketimage.interpark.com%2FPlay%2Fimage%2Flarge%2F23%2F23011055_p.gif&w=750&q=75",
        120,
        '2023-10-1 00:00:00',
        1,
        1,
        "https://ticketimage.interpark.com/Play/image/etc/23/23011055-06.jpg"
    ), (
        4,
        "2023서귀포글로컬페스타-제주",
        "제주",
        "페스티벌",
        "CONCERT",
        "https://tickets.interpark.com/contents/_next/image?url=https%3A%2F%2Fticketimage.interpark.com%2FPlay%2Fimage%2Flarge%2F23%2F23013039_p.gif&w=750&q=75",
        120,
        '2023-10-1 00:00:00',
        1,
        1,
        "https://ticketimage.interpark.com/Play/image/etc/23/23013039-09.jpg"
    ), (
        5,
        "2023 폴킴 단독 콘서트",
        "폴킴",
        "폴킴 콘서트",
        "CONCERT",
        "https://tickets.interpark.com/contents/_next/image?url=https%3A%2F%2Fticketimage.interpark.com%2FPlay%2Fimage%2Flarge%2F23%2F23011967_p.gif&w=750&q=75",
        120,
        '2023-10-1 00:00:00',
        1,
        1,
        "https://ticketimage.interpark.com/Play/image/etc/23/23011967-05.jpg"
    ), (
        6,
        "LOVE IN SEOUL 2023",
        "권진아&샘김",
        "권진아 샘김 콘서트",
        "CONCERT",
        "https://tickets.interpark.com/contents/_next/image?url=https%3A%2F%2Fticketimage.interpark.com%2FPlay%2Fimage%2Flarge%2FP0%2FP0003604_p.gif&w=750&q=75",
        120,
        '2023-10-1 00:00:00',
        1,
        1,
        "https://ticketimage.interpark.com/Play/image/etc/23/P0003604-02.jpg"
    ), (
        7,
        "임영웅 콘서트 IM HERO TOUR 2023 - 서울",
        "임영웅",
        "임영웅 콘서트",
        "CONCERT",
        "https://tickets.interpark.com/contents/_next/image?url=https%3A%2F%2Fticketimage.interpark.com%2FPlay%2Fimage%2Flarge%2F23%2F23012698_p.gif&w=1200&q=75",
        120,
        '2023-10-1 00:00:00',
        1,
        1,
        "https://ticketimage.interpark.com/Play/image/etc/23/23012698-06.jpg"
    );

INSERT INTO
    `performance_schedule` (
        `start_date_time`,
        `performance_id`
    )
VALUES ('2023-10-10 18:00:00', 1), ('2023-10-12 18:00:00', 1), ('2023-10-10 18:00:00', 2), ('2023-10-12 18:00:00', 2), ('2023-10-10 18:00:00', 3), ('2023-10-12 18:00:00', 3), ('2023-10-10 18:00:00', 4), ('2023-10-12 18:00:00', 4), ('2023-10-10 18:00:00', 5), ('2023-10-12 18:00:00', 5), ('2023-10-10 18:00:00', 6), ('2023-10-12 18:00:00', 6), ('2023-10-10 18:00:00', 7), ('2023-10-12 18:00:00', 7);

INSERT INTO
    `seat_class` (
        `seat_class_id`,
        `class_name`,
        `price`,
        `performance_id`
    )
VALUES (1, 'S', 150000, 1), (2, 'A', 80000, 1);

INSERT INTO
    `section_and_seat_class_relation` (`section_id`, `seat_class_id`)
VALUES (1, 1), (2, 1), (3, 2), (4, 2);

INSERT INTO
    `seat` (
        `seat_id`,
        `section_id`,
        `number`
    )
VALUES (1, 1, 1), (2, 1, 2), (3, 1, 3), (4, 1, 4), (5, 1, 5), (6, 1, 6), (7, 1, 7), (8, 1, 8), (9, 1, 9), (10, 1, 10), (11, 1, 11), (12, 1, 12), (13, 1, 13), (14, 1, 14), (15, 1, 15), (16, 1, 16), (17, 1, 17), (18, 1, 18), (19, 1, 19), (20, 1, 20), (21, 2, 21), (22, 2, 22), (23, 2, 23), (24, 2, 24), (25, 2, 25), (26, 2, 26), (27, 2, 27), (28, 2, 28), (29, 2, 29), (30, 2, 30), (31, 2, 31), (32, 2, 32), (33, 2, 33), (34, 2, 34), (35, 2, 35), (36, 2, 36), (37, 2, 37), (38, 2, 38), (39, 2, 39), (40, 2, 40), (41, 3, 41), (42, 3, 42), (43, 3, 43), (44, 3, 44), (45, 3, 45), (46, 3, 46), (47, 3, 47), (48, 3, 48), (49, 3, 49), (50, 3, 50), (51, 3, 51), (52, 3, 52), (53, 3, 53), (54, 3, 54), (55, 3, 55), (56, 3, 56), (57, 3, 57), (58, 3, 58), (59, 3, 59), (60, 3, 60), (61, 4, 61), (62, 4, 62), (63, 4, 63), (64, 4, 64), (65, 4, 65), (66, 4, 66), (67, 4, 67), (68, 4, 68), (69, 4, 69), (70, 4, 70), (71, 4, 71), (72, 4, 72), (73, 4, 73), (74, 4, 74), (75, 4, 75), (76, 4, 76), (77, 4, 77), (78, 4, 78), (79, 4, 79), (80, 4, 80);