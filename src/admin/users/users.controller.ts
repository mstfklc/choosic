import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin-users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<Partial<User>[]> {
    return this.usersService.getUsersSpecificData();
  }
}
