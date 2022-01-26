import Login from "../utils/login";
import { Request, Response, NextFunction } from 'express';
import { IBodyLogin } from "../@interfaces/login";


class JwtMiddleware {
  static async tokenValidate(req: Request<{}, {}, IBodyLogin>, res: Response, next: NextFunction) {
    const authObject = req.headers["authorization"];

    if (!authObject) return res.status(200).json({ status: 401, message: "Token not found" });

    const token = authObject.split(" ");

    if (token.length !== 2) return res.status(409).json({ status: 401, message: "Bad token" });

    if (token[0].toUpperCase() !== "BEARER") {
      res.status(409).json({ status: 401, message: "Bad token" });
      return;
    }
    const login = new Login();

    const isTokenOk = await login.validToken(token[1]);

    if (isTokenOk) return next();
    return res.status(409).json({ status: 401, message: "Invalid token" });
  }
}


export default JwtMiddleware;