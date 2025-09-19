import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Public } from 'src/core/decorators';
import { JwtAuthGuard } from 'src/core/guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginUser(@Req() req, @Res() res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
      secure: process.env.NODE_ENV === 'production',
    });
    return res.status(HttpStatus.OK).send({
      message: 'Login Successfully',
      code: HttpStatus.OK,
      data: token,
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.sendStatus(200).send({
      message: 'Logout Successfully',
      code: HttpStatus.OK,
    });
  }

  @Post('register')
  @Public()
  async registerUser(@Body() body: RegisterUserDto) {
    return await this.authService.registerUser(body);
  }
}
