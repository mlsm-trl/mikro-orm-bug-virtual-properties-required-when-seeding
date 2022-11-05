import { Factory, Faker } from '@mikro-orm/seeder'
import { Gender } from 'types/enums'
import User from '@entities/User'

class UserFactory extends Factory<User> {
  model = User

  definition(faker: Faker) {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      birthdate: faker.date.past().toISOString(),
      password: '12345678',
      phone: faker.phone.number(),
      gender: faker.name.sex() === 'Female' ? Gender.WOMAN : Gender.MAN,
      banned: false,
      disabled: false,
      photo: faker.image.avatar(),
    }
  }
}

export default UserFactory
