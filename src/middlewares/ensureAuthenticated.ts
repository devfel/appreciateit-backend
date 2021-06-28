import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  // Receive Token
  const bearerToken = request.headers.authorization;
  const [, token] = bearerToken.split(" ");

  // Validate if token is not empty
  if (!token) {
    return response.status(401).end();
  }

  // Check if token is a valid one
  try {
    const { sub } = verify(token, "e9b1fe4f0017aa1d72b9454c815291bf") as IPayLoad;

    // Get user informations
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }

  return next();
}
