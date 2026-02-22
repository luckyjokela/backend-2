import { Response } from 'express';

export interface IRes extends Response {
  user: {
    userId: string;
    email: string;
    username: string;
    role: string;
  };
  cookies: {
    access_token: string;
    refresh_token: string;
    [key: string]: string;
  };
}
