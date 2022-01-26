import { Request, Response } from "express"
import IUser from "../@interfaces/user"
import UserModel from "../models/users"
import { IBodyLogin } from "../@interfaces/login";
import Login from "../utils/login"
import bcrypt from "bcrypt"

export default class User {

  public async cadUser(req: Request<{}, {}, IUser>, res: Response): Promise<Response> {
    try {
      if (!req.body) return res.status(409).json({ status: 409, message: "body not found" });

      const hasUser = await UserModel.findAll({
        where: {
          name: req.body.name
        }
      });


      if (hasUser.length > 0) return res.status(200).json({ status: 1, message: "User storage already" });

      const response = await UserModel.create(req.body);

      return res.status(200).json({ status: 0, message: "success" })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: 500, message: error })
    }

  }



  public async Login(req: Request<{}, {}, IBodyLogin>, res: Response): Promise<Response> {
    if (!req.body) return res.status(409).json({ status: 409, message: "body not found" });
    const { email, password } = req.body;
    const hasUser = await UserModel.findOne({
      where: {
        email: email
      }
    });

    if (!hasUser) return res.status(401).json({ status: 401, message: "User not found" });

    const classLogin = new Login(hasUser.user_id);

    const response = await classLogin.execLogin(password, hasUser.password);


    return res.status(200).json({ ...response });
  }

}