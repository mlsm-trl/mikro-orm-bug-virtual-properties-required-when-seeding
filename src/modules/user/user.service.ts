import { FilterQuery, wrap } from '@mikro-orm/core'
import { EntityRepository } from '@mikro-orm/postgresql'
import { Service, Inject } from 'typedi'
import User from '@entities/User'

@Service()
class UserService {
  constructor(
    @Inject('UserRepository') private userRepository: EntityRepository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  async get(query: FilterQuery<User>) {
    return this.userRepository.findOne(query)
  }

  async getById(id: number) {
    return this.userRepository.findOne({ id })
  }

  async getAllByEmail(email: string) {
    return this.userRepository.find({
      email,
    })
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({
      email,
    })
  }

  async create(data: User) {
    const user = this.userRepository.create(data)

    await this.userRepository.persistAndFlush(user)

    return user
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.userRepository.findOneOrFail({ id })

    if (!user) return false

    wrap(user).assign(data)

    await this.userRepository.flush()

    return true
  }
}

export default UserService
