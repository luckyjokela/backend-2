export interface IAuthUser {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'owner' | 'moderator';
}
