import * as passportJwt from 'passport-jwt';
const { ExtractJwt, Strategy } = passportJwt;
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

interface RequestWithCookies extends Request {
  cookies: {
    [key: string]: string;
    access_token: string;
  };
}

const cookieExtractor = (request: Request): string | null => {
  const req = request as RequestWithCookies;
  return req.cookies?.access_token ?? null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Получаем секрет и проверяем что он есть
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is required!');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret, // ← Теперь точно string, не undefined!
    });
  }

  validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role || 'user',
    };
  }
}
