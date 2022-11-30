import { Request, Response } from "express";
import User from "../models/user.model";
import EcryptPassword from "../utils/util.functions/hashpassword";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Cookie, Jwt } from "../utils/constants";
import { StatusCode } from "../utils/errors/errors";
import { NotFound } from "../utils/errors";

export default class {
  static async signUp(req: Request, res: Response) {
    const { firstname, lastname, email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        throw Error("user already exists");
      }
      const hashPassword = await EcryptPassword.hashPassword(password);
      const userInboundPayload = {
        firstname,
        lastname,
        email,
        password: hashPassword,
      };
      const createdUser = await User.create(userInboundPayload);
      if (createdUser) {
        res
          .status(StatusCode.CREATED)
          .json({ message: "user created successfully" });
      } else {
        throw Error("An error has occured");
      }
    } catch (error) {
      res.status(StatusCode.CONFLICT).json({ message: error.message });
    }

    // try {
    //   await User.create(userInboundPayload);
    //   res
    //     .status(StatusCode.CREATED)
    //     .json({ message: "user created successfully" });
    // } catch (error) {
    //   res
    //     .status(StatusCode.INTERNAL_SERVER_ERROR)
    //     .json({ message: error.message });
    // }
  }

  static async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const registeredUser = await User.findOne({ where: { email: email } });
      if (!registeredUser) {
        throw new NotFound("invalid username and password");
      }
      const validUser = await compare(password, registeredUser.password);

      if (validUser) {
        const { firstname, lastname, email } = registeredUser;
        const accessToken = await sign(
          { username: email, firstname, lastname },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: Jwt.EXPIRES_IN,
          },
          (error, accessToken) => {
            if (error) {
              throw error;
            }
            res.status(200).json({ accessToken: accessToken });
          }
        );
        // change the secure property of the cookie to true in production
        // res.cookie("accessToken", accessToken, {
        // maxAge: Cookie.MAX_AGE,
        //   secure: false,
        //   httpOnly: true,
        // });
      }
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  static async findUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();
      res.status(StatusCode.OK).json(users);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      const updatedUser = user.save();
      res.status(StatusCode.OK).json(updatedUser);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      user.destroy();
      res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
