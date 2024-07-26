import { NextFunction, Request, Response } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
};

export { logger };
