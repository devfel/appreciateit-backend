import { Request, Response, NextFunction } from "express";

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  // Receive Token
  const token = request.headers.authorization;

  // Validate if token is not empty
  if (!token) {
    return response.status(401).end();
  }

  // Check if token is a valid one

  // Get user informations

  return next();
}
