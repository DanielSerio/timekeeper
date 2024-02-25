export interface ApiErrorParams {
  name?: string;
  message: string;
  cause?: string;
  status?: number;
  stack?: string;
}

export interface ApiErrorConcrete {
  name: string;
  message: string;
  cause?: string;
  status: number;
  stack?: string;
}

export class ApiError extends Error {
  public status: number = 500;
  public cause?: string;

  constructor({ name, message, cause, stack, status }: ApiErrorParams) {
    super(message);
    if (name) {
      this.name = name;
    }
    if (cause) {
      this.cause = cause;
    }
    if (stack) {
      this.stack = stack;
    }
    if (status) {
      this.status = status;
    }
  }

  public asJSON(): ApiErrorConcrete {
    return {
      status: this.status,
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
    };
  }
}

