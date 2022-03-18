import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
// @ts-ignore
// eslint-disable-next-line
import { UserService } from "../user/user.service";
import { Credentials } from "./Credentials";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";
import { UserInfo } from "./UserInfo";
import { User } from "../user/base/User";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserInfo | null> {
    const user = await this.userService.findOne({
      where: { username },
    });
    if (user && (await this.passwordService.compare(password, user.password))) {
      const { roles } = user;
      return { username, roles };
    }
    return null;
  }
  async login(credentials: Credentials): Promise<UserInfo> {
    const { username, password } = credentials;
    const user = await this.validateUser(
      credentials.username,
      credentials.password
    );
    if (!user) {
      throw new UnauthorizedException("The passed credentials are incorrect");
    }
    //@ts-ignore
    const accessToken = await this.tokenService.createToken(username, password);
    return {
      accessToken,
      ...user,
    };
  }
  async signup(credentials: Credentials): Promise<UserInfo> {
    const { username, password } = credentials;
    const user = await this.userService.create({
      data: {
        username,
        password,
        roles: ["todoUser"],
      },
    });
    if (!user) {
      throw new UnauthorizedException("Could not create user");
    }
    //@ts-ignore
    const accessToken = await this.tokenService.createToken(username, password);
    return {
      accessToken,
      username: user.username,
      roles: user.roles,
    };
  }
  async me(authorization: string = ""): Promise<User> {
    const bearer = authorization.replace(/^Bearer\s/, "");
    const username = this.tokenService.decodeToken(bearer);
    const result = await this.userService.findOne({
      where: { username },
      select: {
        createdAt: true,
        firstName: true,
        id: true,
        lastName: true,
        roles: true,
        updatedAt: true,
        username: true,
      },
    });
    if (!result) {
      throw new NotFoundException(`No resource was found for ${username}`);
    }

    return result;
  }
}
