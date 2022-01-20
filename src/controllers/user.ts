import { Request, Response } from "express"
import IUser from "../interfaces/user"
import UserModel from "../models/users"

export default class User {



  public async cadUser(req: Request<{}, {}, IUser>, res: Response): Promise<Response> {
    try {
      if (!req.body) return res.status(409).json({ status: 409, message: "body not found" });

      const hasUser = await UserModel.findAll({
        where: {
          name: req.body.name
        }
      });


      if (hasUser.length > 0) return res.status(200).json({ status: 1, message: "User storage already", user: hasUser });

      const response = await UserModel.create(req.body);

      return res.status(200).json({ status: 0, message: "success", user: response })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: 500, message: error })
    }

  }

}