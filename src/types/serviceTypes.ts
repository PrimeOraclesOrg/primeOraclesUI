export type ServiceError = {
  code: string;
  message: string;
};

export type ServiceResult<T> = {
  data: T | null;
  error: ServiceError | null;
};
