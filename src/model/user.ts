import { User } from '@prisma/client';

export interface UserResponse {
  name: string;
  email: string;
}

export type CreateUserRequest = {
  email: string;
  name: string;
  password: string;
};

export const toUserResponse = (user: User): UserResponse => {
  return {
    name: user.name,
    email: user.email,
  };
};
export const toLoginResponse = (user: User, token: string): LoginResponse => {
  return {
    name: user.name,
    email: user.email,
    token,
  };
};

export interface LoginResponse extends UserResponse {
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
