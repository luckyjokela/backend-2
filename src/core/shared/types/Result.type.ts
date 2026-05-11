// src/core/shared/types/Result.type.ts

type Success<T> = {
  success: true;
  data: T;
};

type SuccessVoid = {
  success: true;
  data?: undefined;
};

type Failure = {
  success: false;
  error: string;
  code?: number;
};
export type Result<T> = T extends void
  ? SuccessVoid | Failure
  : Success<T> | Failure;
