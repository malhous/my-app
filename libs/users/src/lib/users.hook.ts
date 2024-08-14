import {
  useAll,
  useCreate,
  useDeleteOne,
  useOne,
  UsePublicCreateProps,
} from '@my-app/query-client';

import { CreateUserRequest, UserResponse } from './users';

export const useGetUsers = () => {
  const data = useAll<UserResponse>({
    resource: 'persons',
  });

  return data;
};

export const useGetUser = (id: string) => {
  const data = useOne<UserResponse>({
    resource: 'persons',
    id,
  });

  return data;
};

export const useCreateUser = (props?: UsePublicCreateProps<UserResponse>) => {
  const { mutate, ...data } = useCreate<CreateUserRequest, UserResponse>({
    resource: 'person',
    invalidateKeys: ['persons'],
    ...props,
  });

  const handleCreateUser = (request: CreateUserRequest) => {
    mutate({ values: request });
  };

  return { ...data, handleCreateUser };
};
export const useDeleteUser = () => {
  const { mutate, ...data } = useDeleteOne<void>({
    resource: 'person',
    invalidateKeys: ['persons'],
  });

  const handleDeleteUser = (id: string) => {
    mutate(id);
  };

  return { ...data, handleDeleteUser };
};
