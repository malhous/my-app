import { IQueryResponse } from '@my-app/http';

export type UserResponse = {
  readonly _key: string;
  readonly _id: string;
  readonly _rev: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly age: number;
  readonly dob: string;
  readonly email: string;
  readonly isAdmin: boolean;
  readonly password: string;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly isActive: boolean;
};

export type UsersResponse = IQueryResponse<UserResponse>;

export interface CreateUserRequest {
  readonly firstName: string;
  readonly lastName: string;
  readonly age: number;
  readonly isAdmin: boolean;
  readonly email: string;
  readonly password: string;
  readonly dob: string;
}
