import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1700812584812 implements MigrationInterface {
    name = 'NewMigration1700812584812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`doctor\` (\`id\` bigint NOT NULL AUTO_INCREMENT COMMENT '流水號', \`doctorNo\` varchar(20) NOT NULL COMMENT '醫師工號', \`name\` varchar(20) NOT NULL COMMENT '姓名', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservationOverview\` (\`id\` bigint NOT NULL AUTO_INCREMENT COMMENT '流水號', \`date\` varchar(20) NOT NULL COMMENT '日期, YYYY-MM-DD', \`timeSlot\` enum ('morning', 'afternoon', 'evening') NOT NULL COMMENT '時段', \`division\` enum ('00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '22', '40', '60', '81', '82', '83', '84', '2A', '2B') NOT NULL COMMENT '科別' DEFAULT '00', \`doctorId\` bigint NOT NULL COMMENT '醫師id', \`canReverse\` tinyint NOT NULL COMMENT '是否開放預約' DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`patient\` (\`id\` bigint NOT NULL AUTO_INCREMENT COMMENT '流水號', \`name\` varchar(20) NOT NULL COMMENT '姓名', \`birthday\` varchar(20) NULL COMMENT '生日, YYYY-MM-DD', \`gender\` enum ('M', 'F', 'X') NOT NULL COMMENT '性別' DEFAULT 'X', \`email\` varchar(100) NULL COMMENT '電子郵件', \`phone\` varchar(20) NULL COMMENT '電話', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservationDetail\` (\`id\` varchar(20) NOT NULL COMMENT 'id', \`reverseTime\` datetime NULL COMMENT '預約時間', \`reservationOverviewId\` bigint NOT NULL COMMENT '預約總表id', \`no\` bigint NOT NULL COMMENT '看診號', \`type\` enum ('onSite', 'reverse', 'all', 'not') NOT NULL COMMENT '給號類別', \`patientId\` bigint NULL COMMENT '病人id', \`note\` varchar(200) NULL COMMENT '備註', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clinic\` (\`id\` bigint NOT NULL AUTO_INCREMENT COMMENT '流水號', \`reservationDetailId\` varchar(100) NOT NULL COMMENT '預約細項id', \`date\` varchar(20) NOT NULL COMMENT '門診日期, YYYY-MM-DD', \`beginTime\` datetime NULL COMMENT '開始看診時間', \`finishTime\` datetime NULL COMMENT '完診時間', \`hasIcCard\` tinyint NOT NULL COMMENT '是否有健保卡' DEFAULT 0, \`cardExceptionCode\` enum ('A000', 'A010', 'A020', 'A030', 'B000', 'C000', 'D000', 'D010', 'E000', 'F000', 'Z000') NOT NULL COMMENT '卡片異常代碼', \`medicalType\` enum ('01', '02', '03', '04', '05', '06', '07', '08', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'CA', 'DA', 'DB', 'DC', 'ZA', 'ZB', 'YC', 'YD', 'YA', 'YE', 'XA', 'YB', 'YF', 'YG', 'YH') NOT NULL COMMENT '就醫類別' DEFAULT '01', \`medicalNumber\` varchar(20) NULL COMMENT '就醫序號', \`caseType\` enum ('01', '02', '03', '04', '06', '08', '09', 'A3', 'B6', 'B7', 'D1', 'D2') NOT NULL COMMENT '案件別' DEFAULT '09', \`doctorId\` bigint NOT NULL COMMENT '醫師id', \`patientId\` bigint NULL COMMENT '病人id', \`soap\` varchar(300) NOT NULL COMMENT 'soap', \`status\` enum ('REGISTER', 'CLINIC', 'COMPLETE', 'PAID', 'UNREGISTER') NOT NULL COMMENT '門診狀態' DEFAULT 'REGISTER', \`payableAmount\` bigint NOT NULL COMMENT '應繳金額' DEFAULT '0', \`paidAmount\` bigint NOT NULL COMMENT '已繳金額' DEFAULT '0', UNIQUE INDEX \`REL_5acbe4779e33a47784323beffb\` (\`reservationDetailId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reservationOverview\` ADD CONSTRAINT \`FK_910c0f566ce35d0602e727bbe71\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctor\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`reservationDetail\` ADD CONSTRAINT \`FK_c4a9b0e542c6dfa1d6b9789849a\` FOREIGN KEY (\`reservationOverviewId\`) REFERENCES \`reservationOverview\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`reservationDetail\` ADD CONSTRAINT \`FK_dd8780149f71020a06a6cb7bb18\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`clinic\` ADD CONSTRAINT \`FK_5acbe4779e33a47784323beffb6\` FOREIGN KEY (\`reservationDetailId\`) REFERENCES \`reservationDetail\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`clinic\` ADD CONSTRAINT \`FK_b8a842c849593285c953560c5a7\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctor\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE \`clinic\` ADD CONSTRAINT \`FK_3fa811fc9b71e79b8df85d3a03f\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clinic\` DROP FOREIGN KEY \`FK_3fa811fc9b71e79b8df85d3a03f\``);
        await queryRunner.query(`ALTER TABLE \`clinic\` DROP FOREIGN KEY \`FK_b8a842c849593285c953560c5a7\``);
        await queryRunner.query(`ALTER TABLE \`clinic\` DROP FOREIGN KEY \`FK_5acbe4779e33a47784323beffb6\``);
        await queryRunner.query(`ALTER TABLE \`reservationDetail\` DROP FOREIGN KEY \`FK_dd8780149f71020a06a6cb7bb18\``);
        await queryRunner.query(`ALTER TABLE \`reservationDetail\` DROP FOREIGN KEY \`FK_c4a9b0e542c6dfa1d6b9789849a\``);
        await queryRunner.query(`ALTER TABLE \`reservationOverview\` DROP FOREIGN KEY \`FK_910c0f566ce35d0602e727bbe71\``);
        await queryRunner.query(`DROP INDEX \`REL_5acbe4779e33a47784323beffb\` ON \`clinic\``);
        await queryRunner.query(`DROP TABLE \`clinic\``);
        await queryRunner.query(`DROP TABLE \`reservationDetail\``);
        await queryRunner.query(`DROP TABLE \`patient\``);
        await queryRunner.query(`DROP TABLE \`reservationOverview\``);
        await queryRunner.query(`DROP TABLE \`doctor\``);
    }

}
