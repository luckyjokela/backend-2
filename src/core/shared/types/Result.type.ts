type Success<T> = {
  success: true;
<<<<<<< HEAD
  data: T;
=======
  data?: T; // ← Добавь ? (опционально)
>>>>>>> 33b11ba (update)
};

type Failure = {
  success: false;
  error: string;
  code?: number;
};

export type Result<T> = Success<T> | Failure;
