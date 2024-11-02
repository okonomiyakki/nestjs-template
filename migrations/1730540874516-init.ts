import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1730540874516 implements MigrationInterface {
    name = 'Init1730540874516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`token\` (\`id\` varchar(36) NOT NULL COMMENT 'Token UUID (PK, NN)', \`user_id\` varchar(36) NOT NULL COMMENT 'User UUID (FK, NN, UQ)', \`refresh_token\` varchar(60) NOT NULL COMMENT 'Refresh Token (NN)', \`created_at\` timestamp(6) NOT NULL COMMENT 'Token Creation Date (NN)' DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_e50ca89d635960fda2ffeb1763\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL COMMENT 'User UUID (PK, NN)', \`nickname\` varchar(10) NOT NULL COMMENT 'User Nickname (NN, UQ)', \`email\` varchar(50) NOT NULL COMMENT 'User Email (NN, UQ)', \`password\` varchar(60) NOT NULL COMMENT 'User Password (NN)', \`created_at\` timestamp(6) NOT NULL COMMENT 'User Creation Date (NN)' DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`UQ_IDX_user_email\` (\`email\`), UNIQUE INDEX \`UQ_IDX_user_nickname\` (\`nickname\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`token\` ADD CONSTRAINT \`FK_refresh_token_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token\` DROP FOREIGN KEY \`FK_refresh_token_user_id\``);
        await queryRunner.query(`DROP INDEX \`UQ_IDX_user_nickname\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`UQ_IDX_user_email\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_e50ca89d635960fda2ffeb1763\` ON \`token\``);
        await queryRunner.query(`DROP TABLE \`token\``);
    }

}