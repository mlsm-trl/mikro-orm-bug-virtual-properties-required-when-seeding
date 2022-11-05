import { Entity, PrimaryKey, Property, OptionalProps } from '@mikro-orm/core'

@Entity({ abstract: true })
abstract class BaseEntity<O = undefined> {
  [OptionalProps]?: O | 'createdAt' | 'updatedAt' | 'id'

  @PrimaryKey()
  id!: number

  @Property({ defaultRaw: 'now()' })
  createdAt?: Date

  @Property({
    onUpdate: () => new Date(),
    defaultRaw: 'now()',
  })
  updatedAt?: Date
}

export default BaseEntity
