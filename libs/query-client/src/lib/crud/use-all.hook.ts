import { useHttpClient } from '@my-app/http';
import {
  QueryObserverResult,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { DataProvider } from '../data-provider';

export interface UseAllProps<TData, TError = AxiosError> {
  resource: string;
  staleTime?: number;
  queryOptions?: UseQueryOptions<TData[], TError>;
}

export const useAll = <TData, TError = AxiosError>({
  resource,
  staleTime,
  queryOptions,
}: UseAllProps<TData, TError>): QueryObserverResult<TData[], TError> => {
  const httpClient = useHttpClient();
  const dataProvider = DataProvider(httpClient);

  const queryResponse = useQuery<TData[], TError>({
    queryKey: [resource],
    queryFn: () => {
      return dataProvider.getAll<TData>(resource);
    },
    enabled:
      typeof queryOptions?.enabled !== 'undefined'
        ? queryOptions?.enabled
        : !!resource,
    staleTime,
    ...queryOptions,
  });

  return queryResponse;
};
