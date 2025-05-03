
import jwt from "jsonwebtoken";
import { Jwt } from "../../domain/Jwt";
import { env } from "../env/Env";

export class JwtManager implements Jwt {
  private readonly secretKey = env.SECRET_JWT;

  sign(payload: string | object | Buffer, options?: jwt.SignOptions): string {
    return jwt.sign(payload, this.secretKey, options);
  }

  verify(token: string, options?: jwt.VerifyOptions): string | object {
    return jwt.verify(token, this.secretKey, options);
  }
}