import { Entity, Enum, Property, Unique } from '@mikro-orm/core'
import getInitials from '@helpers/get-initials'
import { Gender } from '../types/enums'
import BaseEntity from './BaseEntity'

@Entity()
class User extends BaseEntity {
  @Property()
  name!: string

  @Unique()
  @Property()
  email!: string

  @Property()
  birthdate?: string

  @Property({ length: 128, hidden: true })
  password?: string

  @Property({ columnType: 'text', hidden: true })
  photo?: string

  @Enum(() => Gender)
  gender?: Gender

  @Property({ persist: false })
  get initials(): string | undefined {
    return getInitials(this.name)
  }
}

export default User
