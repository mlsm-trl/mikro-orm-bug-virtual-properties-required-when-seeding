/* eslint-disable no-restricted-syntax */
import {
  JsonController,
  UseBefore,
  Get,
  Post,
  Body,
  Param,
  Put,
  NotFoundError,
  HttpError,
} from 'routing-controllers'
import { Service } from 'typedi'
import ORMContextMiddleware from '@middlewares/orm-context'
import User from '@entities/User'
import UserService from './user.service'

@JsonController('/user')
@UseBefore(ORMContextMiddleware)
@Service()
class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    const users = await this.userService.getAll()

    if (!users) throw new NotFoundError('No user found')

    return users
  }

  @Post()
  async create(@Body() body: User): Promise<User> {
    const hasUsers = await this.userService.getAllByEmail(body.email)

    if (hasUsers.length > 0) throw new HttpError(409, 'Email in use')

    return this.userService.create(body)
  }

  @Put('/:userId')
  async update(@Param('userId') id: number, @Body() body: User): Promise<boolean> {
    const success = await this.userService.update(id, body)

    if (!success) throw new NotFoundError('No user found')

    return success
  }

  @Get('/:userId')
  async get(@Param('userId') id: number): Promise<User> {
    const user = await this.userService.get({ id })

    if (!user) throw new NotFoundError('No user found')

    return user
  }
}

export default UserController
