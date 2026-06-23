import "express";

declare global {
  namespace Express {
    interface UserTokenPayload {
      id: string;
      email: string;
      role: "admin" | "member";
      name: string;
    }

    interface Request {
      user?: UserTokenPayload;
      validated?: {
        body?: Record<string, unknown>;
        params?: Record<string, string>;
        query?: Record<string, string | string[]>;
      };
    }
  }
}

export {};
