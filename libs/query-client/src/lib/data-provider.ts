import { IQueryResponse, IResponse } from '@my-app/http';
import { AxiosInstance, AxiosResponse } from 'axios';

export interface GetOneParams {
  resource: string;
  id: string;
}

export interface DeleteOneParams {
  resource: string;
  id: string;
}

export interface CreateParams<T> {
  resource: string;
  params: T;
}

export interface UpdateParams<T> {
  resource: string;
  params: T;
  id: string;
  method?: 'patch' | 'put';
}
export interface DataProvider {
  getAll: <TData>(path: string) => Promise<TData[]>;

  getOne: <TData>(params: GetOneParams) => Promise<TData>;

  deleteOne: <TData>(params: DeleteOneParams) => Promise<TData>;

  create: <TData, T>(params: CreateParams<T>) => Promise<TData>;

  update: <TData, T>(params: UpdateParams<T>) => Promise<TData>;
}

export const DataProvider = (client: AxiosInstance): DataProvider => ({
  getAll: async <T>(path: string) => {
    const { data }: AxiosResponse<IQueryResponse<T>> = await client['get'](
      path
    );

    return data.data;
  },

  create: async <T, K>({ resource, params }: CreateParams<K>) => {
    const { data }: AxiosResponse<T> = await client['post'](resource, params);

    return data;
  },

  update: async <T, K>({ resource, id, params, method }: UpdateParams<K>) => {
    const url = `${resource}/${id}`;

    const requestMethod = method ?? 'patch';

    const { data }: AxiosResponse<T> = await client[requestMethod](url, params);

    return data;
  },

  getOne: async <T>({ resource, id }: GetOneParams) => {
    const url = `${resource}/${id}`;

    const { data }: AxiosResponse<IResponse<T>> = await client['get'](url);

    return data.data;
  },

  deleteOne: async <T>({ resource, id }: DeleteOneParams) => {
    const url = `${resource}/${id}`;

    const { data }: AxiosResponse<T> = await client['delete'](url);

    return data;
  },
});
