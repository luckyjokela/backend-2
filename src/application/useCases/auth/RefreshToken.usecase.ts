import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { RefreshToken } from '../../../core/entities/variableObjects/RefreshToken';

@Injectable()
export class RefreshTokenUseCase {
  generateToken(): string {
    try {
      const buffer = crypto.getRandomValues(new Uint8Array(64));
      return Buffer.from(buffer).toString('hex');
    } catch (error) {
      console.error('Error generating token:', error);
      throw new Error('Failed to generate token');
    }
  }

  hashToken(token: string): string {
    try {
      return createHash('sha256').update(token).digest('hex');
    } catch (error) {
      console.error('Error hashing token:', error);
      throw new Error('Failed to hash token');
    }
  }

  validateToken(
    token: string,
    refreshToken: RefreshToken,
    ip: string,
    userAgent: string,
  ): boolean {
    try {
      const hashedToken = this.hashToken(token);
      return refreshToken.hasValidToken(hashedToken, ip, userAgent);
    } catch (error) {
      console.error('Error validating token:', error);
      throw new Error('Failed to validate token');
    }
  }
}
