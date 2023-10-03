-- name: ConfirmedReservations :many

WITH
    `confirmed_reservations` AS (
        SELECT
            r.`reservation_id`,
            r.`user_id`,
            r.`performance_schedule_id`,
            r.`seat_id`,
            ps.`start_date_time`
        FROM `reservation` r
            INNER JOIN `performance_schedule` ps ON r.`performance_schedule_id` = ps.`performance_schedule_id`
        WHERE
            r.`status` = 'SOLDOUT'
            AND DATE(ps.`start_date_time`) <= NOW() + INTERVAL 1 DAY
    )
SELECT
    r.`reservation_id`,
    r.`performance_schedule_id`,
    r.`start_date_time` as `start_time`,
    r.`user_id`,
    u.`wallet_address`,
    r.`seat_id`
FROM
    `confirmed_reservations` r
    INNER JOIN `user` u ON r.`user_id` = u.`id`
LIMIT ?;

-- name: BulkMarkAsMinted :exec

UPDATE `reservation`
SET `status` = 'MINTED'
WHERE
    `reservation_id` IN (sqlc.slice('reservations'));

-- name: MarkAsMinted :exec

UPDATE `reservation`
SET `status` = 'MINTED'
WHERE `reservation_id` = ?;