// import {
//   Controller,
//   Post,
//   Body,
//   HttpCode,
//   HttpStatus,
//   HttpException,
//   Request,
//   Response,
// } from '@nestjs/common';
// import { LoginUserDto } from '../../application/dtos/auth/Login.dto';
// import { AuthService } from '../../auth/services/auth.service';
// import { CreateUserUseCase } from '../../application/useCases/User/CreateUser.usecase';
// import { RegisterUserDto } from '../../application/dtos/auth/Register.dto';
// import { ConfirmEmailDto } from '../../application/dtos/auth/ConfirmEmail.dto';
// import { IReq } from '../IReq/IRequest';
// import { IRes } from '../IRes/IResponse';
// import { Throttle } from '@nestjs/throttler';

// @Controller('auth')
// export class AuthController {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly createUserUseCase: CreateUserUseCase,
//   ) {}

//   @Post('register')
//   async register(@Body() dto: RegisterUserDto) {
//     const result = await this.createUserUseCase.execute(
//       // dto.id,
//       '',
//       dto.email,
//       dto.password,
//       dto.username,
//       dto.name,
//       dto.surname,
//       dto.middleName || '',
//     );

//     if (!result.success) {
//       throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
//     }

//     return {
//       success: true,
//       data: {
//         id: result.data.getIdValue(),
//         email: result.data.getEmail(),
//         username: result.data.getUsername(),
//       },
//     };
//   }

//   @Post('login')
//   @Throttle({ default: { limit: 4, ttl: 60 } })
//   @HttpCode(HttpStatus.OK)
//   async login(
//     @Body() dto: LoginUserDto,
//     @Request() req: IReq,
//     @Response({ passthrough: true }) res: IRes,
//   ) {
//     const user = await this.authService.validateUser(dto.login, dto.password);
//     if (!user) {
//       throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
//     }

//     const ip = req.ip ?? 'unknown';
//     const userAgent = req.get('User-Agent') ?? 'unknown';

//     const tokens = await this.authService.login(
//       {
//         id: user.id,
//         email: user.email,
//         username: user.username,
//         role: user.role,
//       },
//       ip,
//       userAgent,
//     );

//     res.cookie('access_token', tokens.access_token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: 'lax',
//       maxAge: 15 * 60 * 1000,
//     });

//     res.cookie('refresh_token', tokens.refresh_token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: 'lax',
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return { success: true, message: 'Logged in' };
//   }

//   @Post('confirm-email')
//   @HttpCode(HttpStatus.OK)
//   async confirmEmail(@Body() dto: ConfirmEmailDto) {
//     return this.authService.confirmEmail(dto.token);
//   }

//   @Post('refresh')
//   @HttpCode(HttpStatus.OK)
//   async refresh(
//     @Request() req: IReq,
//     @Response({ passthrough: true }) res: IRes,
//   ) {
//     const refreshToken = req.cookies?.refresh_token;
//     if (!refreshToken) {
//       throw new HttpException('No refresh token', HttpStatus.UNAUTHORIZED);
//     }

//     const ip = req.ip || '127.0.0.1';
//     const userAgent = req.get('User-Agent') || 'test-agent';

//     const { access_token } = await this.authService.refreshToken(
//       refreshToken,
//       ip,
//       userAgent,
//     );

//     res.cookie('access_token', access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: 15 * 60 * 1000,
//     });

//     return { success: true };
//   }

//   @Post('logout')
//   @HttpCode(HttpStatus.OK)
//   logout(@Response({ passthrough: true }) res: IRes) {
//     res.clearCookie('access_token');
//     res.clearCookie('refresh_token');
//     return { success: true, message: 'Logged out' };
//   }
// }

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Request,
  Response,
} from '@nestjs/common';
import { LoginUserDto } from '../../application/dtos/auth/Login.dto';
import { AuthService } from '../../auth/services/auth.service';
import { CreateUserUseCase } from '../../application/useCases/User/CreateUser.usecase';
import { RegisterUserDto } from '../../application/dtos/auth/Register.dto';
import { ConfirmEmailDto } from '../../application/dtos/auth/ConfirmEmail.dto';
import { IReq } from '../IReq/IRequest';
import { IRes } from '../IRes/IResponse';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    console.log('🔥 REGISTER REQUEST:', dto); // ← ЛОГИРУЕМ ВХОДНЫЕ ДАННЫЕ

    const result = await this.createUserUseCase.execute(
      '',
      dto.email,
      dto.password,
      dto.username,
      dto.name,
      dto.surname,
      dto.middleName || '',
    );

    if (!result.success) {
      console.error('❌ REGISTER FAILED:', result.error); // ← ЛОГИРУЕМ ОШИБКУ

      // ← ВОЗВРАЩАЕМ ПОДРОБНУЮ ОШИБКУ!
      throw new HttpException(
        {
          success: false,
          error: result.error,
          details: 'Registration failed',
          receivedData: {
            email: dto.email,
            username: dto.username,
            name: dto.name,
            surname: dto.surname,
            middleName: dto.middleName,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log('✅ REGISTER SUCCESS:', result.data.getIdValue());

    return {
      success: true,
      data: {
        id: result.data.getIdValue(),
        email: result.data.getEmail(),
        username: result.data.getUsername(),
      },
    };
  }

  @Post('login')
  @Throttle({ default: { limit: 4, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginUserDto,
    @Request() req: IReq,
    @Response({ passthrough: true }) res: IRes,
  ) {
    console.log('🔥 LOGIN REQUEST:', { login: dto.login });

    const user = await this.authService.validateUser(dto.login, dto.password);
    if (!user) {
      console.error('❌ LOGIN FAILED: Invalid credentials');
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const ip = req.ip ?? 'unknown';
    const userAgent = req.get('User-Agent') ?? 'unknown';

    const tokens = await this.authService.login(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      ip,
      userAgent,
    );

    // ← ДЛЯ DEV: secure: false чтобы cookies работали на localhost!
    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: false, // ← ИЗМЕНИЛ С 'production' НА false!
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: false, // ← ИЗМЕНИЛ!
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log('✅ LOGIN SUCCESS:', user.id);
    return { success: true, message: 'Logged in' };
  }

  @Post('confirm-email')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Body() dto: ConfirmEmailDto) {
    return this.authService.confirmEmail(dto.token);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Request() req: IReq,
    @Response({ passthrough: true }) res: IRes,
  ) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new HttpException('No refresh token', HttpStatus.UNAUTHORIZED);
    }

    const ip = req.ip || '127.0.0.1';
    const userAgent = req.get('User-Agent') || 'test-agent';

    const { access_token } = await this.authService.refreshToken(
      refreshToken,
      ip,
      userAgent,
    );

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false, // ← ИЗМЕНИЛ!
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    return { success: true };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Response({ passthrough: true }) res: IRes) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { success: true, message: 'Logged out' };
  }
}
