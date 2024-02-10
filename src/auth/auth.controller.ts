import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiBody({ type: LoginUserDto })
  async login(@Body() loginUserDto: LoginUserDto) {
    const userLogin = await this.authService.login(loginUserDto);
    return { status: 200, message: 'Login successful', ...userLogin };
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    return {
      status: 201,
      user: user,
      message: 'User registered successfully',
    };
  }

  @Get('verify-email/:token')
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiParam({ name: 'token', description: 'Verification token' })
  async verifyEmail(@Param('token') token: string) {
    try {
      await this.authService.verifyEmail(token);
      return { status: 200, message: 'Email verified successfully' };
    } catch (error) {
      throw new NotFoundException('Invalid or expired verification token');
    }
  }

  @Post('reset-password')
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent successfully',
  })
  @ApiBody({ type: CreateUserDto })
  async requestPasswordReset(@Body() body: { email: string }) {
    await this.authService.requestPasswordReset(body.email);
    return {
      status: 200,
      message: 'Password reset email sent successfully',
    };
  }

  @Post('reset-password/:token')
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiParam({ name: 'token', description: 'Reset password token' })
  @ApiBody({ type: CreateUserDto })
  async resetPassword(
    @Param('token') token: string,
    @Body() body: { newPassword: string },
  ) {
    try {
      await this.authService.resetPassword(token, body.newPassword);
      return { status: 200, message: 'Password reset successfully' };
    } catch (error) {
      throw new NotFoundException('Invalid or expired reset password token');
    }
  }
}
