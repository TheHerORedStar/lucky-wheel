import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDB1655544063906 implements MigrationInterface {
  name = 'initDB1655544063906';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "phoneNumber" character varying, "avatar" character varying, "isActive" boolean NOT NULL DEFAULT true, "isDarkTheme" boolean NOT NULL DEFAULT false, "deleteFlag" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reward" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "scale" double precision, "maxItem" double precision, "deleteFlag" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0a6493a4a571a7bd6fe36ee3e46" UNIQUE ("name"), CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "history_reward" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "rewardId" uuid, CONSTRAINT "PK_8bc7948dc51465a6d4003818358" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "history_reward" ADD CONSTRAINT "FK_7afb7e72209dc3a8c87b627ee4e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "history_reward" ADD CONSTRAINT "FK_2e82f104a7d593b918e1ee5ee18" FOREIGN KEY ("rewardId") REFERENCES "reward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "history_reward" DROP CONSTRAINT "FK_2e82f104a7d593b918e1ee5ee18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "history_reward" DROP CONSTRAINT "FK_7afb7e72209dc3a8c87b627ee4e"`,
    );
    await queryRunner.query(`DROP TABLE "history_reward"`);
    await queryRunner.query(`DROP TABLE "reward"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
