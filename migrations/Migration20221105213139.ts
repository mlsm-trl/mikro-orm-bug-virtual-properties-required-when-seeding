import { Migration } from '@mikro-orm/migrations';

export class Migration20221105213139 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) null default now(), "updated_at" timestamptz(0) null default now(), "name" varchar(255) not null, "email" varchar(255) not null, "birthdate" varchar(255) null, "password" varchar(128) null, "photo" text null, "gender" text check ("gender" in (\'MAN\', \'WOMAN\')) null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
