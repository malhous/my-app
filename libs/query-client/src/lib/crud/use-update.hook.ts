import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { DataProvider } from '../data-provider';
import { useHttpClient } from '@my-app/http';

interface UseUpdateParams<K> {
  values: K;
  method?: 'patch' | 'put';
}

export type UseUpdateReturnType<
  TVariables,
  TData,
  TError = AxiosError
> = UseMutationResult<TData, TError, UseUpdateParams<TVariables>>;

export interface UsePublicUpdateProps<TData, TError = AxiosError> {
  onUpdateSuccess?: (data: TData) => void;
  onUpdateError?: (error: TError) => void;
}

export interface UseUpdateProps<TVariables, TData, TError = AxiosError>
  extends UsePublicUpdateProps<TData, TError> {
  resource: string;
  id: string;
  mutationOptions?: UseMutationOptions<
    TData,
    TError,
    UseUpdateParams<TVariables>
  >;
  invalidateKeys?: string[];
}

export function useUpdate<TData, TVariables, TError = AxiosError>({
  resource,
  id,
  invalidateKeys,
  onUpdateSuccess,
  onUpdateError,
}: UseUpdateProps<TVariables, TData, TError>): UseUpdateReturnType<
  TVariables,
  TData,
  TError
> {
  const httpClient = useHttpClient();

  const dataProvider = DataProvider(httpClient);

  const queryClient = useQueryClient();
  const mutation = useMutation<TData, TError, UseUpdateParams<TVariables>>({
    mutationFn: async ({ values, method }: UseUpdateParams<TVariables>) => {
      const response = await dataProvider.update<TData, TVariables>({
        resource,
        params: values,
        id,
        method,
      });

      return response;
    },
    onSuccess: async (data) => {
      if (invalidateKeys?.length) {
        const queryKeys = [...invalidateKeys];

        await queryClient.invalidateQueries({ queryKey: queryKeys });
      }

      if (onUpdateSuccess) {
        onUpdateSuccess(data);
      }
    },
    onError(error) {
      if (onUpdateError) {
        onUpdateError(error);
      }
    },
    mutationKey: [resource, id],
  });

  return mutation;
}
