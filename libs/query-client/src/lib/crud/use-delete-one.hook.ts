import { useHttpClient } from '@my-app/http';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { DataProvider } from '../data-provider';

export type UseDeleteOneReturnType<
  TData,
  TError = AxiosError
> = UseMutationResult<TData, TError, string>;

export interface UsePublicDeleteProps<TData, TError = AxiosError> {
  onDeleteSuccess?: (data: TData) => void;
  onDeleteError?: (error: TError) => void;
}

export interface UseDeleteOneProps<TData, TError = AxiosError>
  extends UsePublicDeleteProps<TData, TError> {
  resource: string;
  invalidateKeys?: string[];
}

export function useDeleteOne<TData, TError = AxiosError>({
  resource,
  invalidateKeys,
  onDeleteSuccess,
  onDeleteError,
}: UseDeleteOneProps<TData, TError>): UseDeleteOneReturnType<TData, TError> {
  const httpClient = useHttpClient();

  const dataProvider = DataProvider(httpClient);

  const queryClient = useQueryClient();
  const mutation = useMutation<TData, TError, string>({
    mutationFn: async (id) => {
      const response = await dataProvider.deleteOne<TData>({
        resource,
        id,
      });

      return response;
    },
    onSuccess: async (data) => {
      if (invalidateKeys?.length) {
        const queryKeys = [...invalidateKeys];

        await queryClient.invalidateQueries({ queryKey: queryKeys });
      }

      if (onDeleteSuccess) {
        onDeleteSuccess(data);
      }
    },
    onError(error) {
      if (onDeleteError) {
        onDeleteError(error);
      }
    },
    mutationKey: [resource],
  });

  return mutation;
}
