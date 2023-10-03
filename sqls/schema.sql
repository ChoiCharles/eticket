CREATE TABLE `user` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` varchar(255) NOT NULL,
    `nickname` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `role` varchar(255) NOT NULL,
    `username` varchar(255) NOT NULL,
    `wallet_address` varbinary(20) DEFAULT NULL
) ENGINE = InnoDB;

CREATE TABLE `performance_schedule` (
    `performance_schedule_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `start_date_time` datetime(6) NOT NULL,
    `performance_id` int NOT NULL
) ENGINE = InnoDB;

-- Active: 1696088250733@@127.0.0.1@33066@eticket
CREATE TABLE `reservation` (
    `reservation_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `cancellation_time` datetime(6) NOT NULL,
    `payment_amount` int NOT NULL,
    `reservation_time` datetime(6) NOT NULL,
    `status` enum('CANCEL', 'SOLDOUT', 'MINTED') NOT NULL,
    `performance_schedule_id` int NOT NULL,
    `seat_id` int NOT NULL,
    `user_id` int NOT NULL
) ENGINE = InnoDB;

CREATE TABLE `block_sync_log` (
    `block_sync_id` int not NULL AUTO_INCREMENT PRIMARY KEY,
    `lower_block` bigint NOT NULL,
    `upper_block` bigint NOT NULL,
    `sync_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

CREATE TABLE `nft_ticket` (
    `token_id` binary(32) NOT NULL PRIMARY KEY,
    `owner` binary(20) NOT NULL
) ENGINE = InnoDB;