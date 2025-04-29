import { SignOptions, VerifyOptions } from "jsonwebtoken";

export interface Jwt {
  sign(payload: string | object | Buffer, options?: SignOptions): string;
  verify(token: string, options?: VerifyOptions): string | object;
}