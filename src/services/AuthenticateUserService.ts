import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}
class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    //check if email exists
    const usersRepositories = getCustomRepository(UsersRepositories);
    const user = await usersRepositories.findOne({ email });
    if (!user) {
      throw new Error("Email/Password combination not valid!");
    }

    //check if password is ok (compare typed pass with hashed password)
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email/Password combination not valid!");
    }

    //generate token
    const token = sign(
      {
        email: user.email,
      },
      "e9b1fe4f0017aa1d72b9454c815291bf",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
