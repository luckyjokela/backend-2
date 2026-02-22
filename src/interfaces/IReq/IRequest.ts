import { Request } from 'express';

export interface IReq extends Request {
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
