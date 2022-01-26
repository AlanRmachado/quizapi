import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { ILoginResult } from "../@interfaces/login"

class Login {
  private user_id = 0;
  private privateKey = "Auhsauhsa"

  constructor(userId: number = 0) {
    this.user_id = userId;
  }

  private signToken = () => {
    return jwt.sign({ user_id: this.user_id }, this.privateKey, { expiresIn: '365d', issuer: "Alan Machado" });
  }

  private verifyToken = async (token: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.privateKey, (error, decoded) => {
        if (error) return resolve(false);
        return resolve(true);
      })
    })
  }

  private async bcryptValid(password1: string, password2: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password1, password2, (err, result) => {
        if (err) return resolve(false)
        resolve(result);
      })
    });
  }


  public async execLogin(passwordSended: string, password: string): Promise<ILoginResult> {
    const isPassOk = await this.bcryptValid(passwordSended, password);

    if (!isPassOk) return { token: "", status: 401 };

    const token = this.signToken();

    return { token, status: 0 };
  }


  public async validToken(token: string) {
    const response = await this.verifyToken(token);

    return response
  }

}

export default Login;