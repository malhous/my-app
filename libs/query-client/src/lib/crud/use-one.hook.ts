import { AxiosError } from 'axios';
import {
  QueryObserverResult,
  queryOptions,
  useQuery,
} from '@tanstack/react-query';
import { DataProvider } from '../data-provider';
import { useHttpClient } from '@my-app/http';

export interface UseOneProps {
  resource: string;
  id: string;
  staleTime?: number;
}

export const useOne = <TData, TError = AxiosError>({
  resource,
  id,
  staleTime,
}: UseOneProps): QueryObserverResult<TData, TError> => {
  const httpClient = useHttpClient();
  const dataProvider = DataProvider(httpClient);

  const queryResponse = useQuery<unknown, TError, TData>({
    queryKey: [resource, id],
    queryFn: async () => {
      const response = await dataProvider.getOne<TData>({
        resource,
        id,
      });

      return response;
    },
    ...queryOptions,
    staleTime,
  });

  return queryResponse;
};
