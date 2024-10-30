import { sign } from 'jsonwebtoken';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { CreateUserRequest, LoginRequest, LoginResponse, toLoginResponse, toUserResponse, UserResponse } from '../model/user';
import { UserValidation } from '../validation/user';
import { Validation } from '../validation/validation';
import { hash } from 'bcryptjs';

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, request);

    const totalUserWithSameEmail = await prismaClient.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUserWithSameEmail != 0) {
      throw new ResponseError(400, 'Email already exists');
    }

    registerRequest.password = await hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({ data: registerRequest });

    return toUserResponse(user);
  }

  static async login(request: LoginRequest): Promise<LoginResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    const user = await prismaClient.user.findUniqueOrThrow({
      where: { email: loginRequest.email },
    });

    if (!user) {
      throw new ResponseError(400, 'Email or password wrong');
    }

    const token = sign({ id: user.id, name: user.name, email: user.email }, 'shhhhh');

    return toLoginResponse(user, token);
  }
}
