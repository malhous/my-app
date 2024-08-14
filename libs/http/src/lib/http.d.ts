export type Status =
  | 'success'
  | 'serverError'
  | 'logicalError'
  | 'unauthorized'
  | 'forbiddenError';

export interface IResponse<T> {
  readonly status: Status;
  readonly data: T;
}

export type IQueryResponse<T> = IResponse<T[]>;
