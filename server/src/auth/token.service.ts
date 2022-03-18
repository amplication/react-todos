import { ITokenService } from "./ITokenService";
//@ts-ignore
// eslint-disable-next-line import/no-unresolved
import { TokenServiceBase } from "./base/token.service.base";
//@ts-ignore
export class TokenService extends TokenServiceBase implements ITokenService {
  /**
   * @param bearer
   * @returns the username from a jwt token
   */
  decodeToken(bearer: string): string {
    return this.jwtService.verify(bearer).username;
  }
}
