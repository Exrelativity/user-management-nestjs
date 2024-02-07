import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    return this.authService.login(user);
  }

  @Get('verify-email/:token')
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiParam({ name: 'token', description: 'Verification token' })
  async verifyEmail(@Param('token') token: string) {
    try {
      await this.authService.verifyEmail(token);
      return { message: 'Email verified successfully' };
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
    return { message: 'Password reset email sent successfully' };
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
      return { message: 'Password reset successfully' };
    } catch (error) {
      throw new NotFoundException('Invalid or expired reset password token');
    }
  }
}
