import type { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import UserFactory from '@factories/UserFactory'

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await new UserFactory(em).create(20)
  }
}
