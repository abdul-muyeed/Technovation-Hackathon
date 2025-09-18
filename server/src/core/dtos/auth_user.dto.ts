import { Role } from '../enum';

export type LoginType = 'admin' | 'user';

export interface LoginCredentials {
  username: string;
  password: string;
  role: Role;
}

export interface AuthUser {
  id: string;
  name: string;
  role: Role;
}

export interface JwtPayload {
  id: string;
  role: string;
  name: string;
}

export interface RefreshTokenPayload {
  user_id: string;
  role: string;
  session_id: string;
}
