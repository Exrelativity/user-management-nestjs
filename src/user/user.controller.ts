import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../model/user';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: User,
    isArray: true,
  })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'User details', type: User })
  async findOneById(@Param('id') id: string): Promise<User | undefined> {
    return this.userService.findOneById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: User,
  })
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatedUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updatedUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
