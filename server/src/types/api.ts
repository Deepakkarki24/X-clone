import type { Response } from "express";

export interface ApiSuccessBody<T = unknown> {
  success: true;
  message: string;
  data?: T;
}

export interface ApiErrorBody {
  success: false;
  message: string;
}

export const getErrorMessage = (err: unknown): string =>
  err instanceof Error ? err.message : "Unknown error";

export const sendServerError = (res: Response, err: unknown) =>
  res.status(500).json({
    success: false,
    message: getErrorMessage(err),
  } satisfies ApiErrorBody);
