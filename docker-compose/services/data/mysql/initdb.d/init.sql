CREATE DATABASE
    IF NOT EXISTS `eticket` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `eticket`;

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

ALTER TABLE `nft_ticket` ADD INDEX `IDX_NFT_TICKET_OWNER` (`owner`);