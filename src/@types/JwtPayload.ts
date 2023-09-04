export interface JwtPayload extends Request {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}
