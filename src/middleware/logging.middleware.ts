import morgan from "morgan";
import express from "express";

const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms"
);

export const loggingMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger(req, res, next);
};