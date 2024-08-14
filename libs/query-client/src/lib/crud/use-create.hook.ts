import { AxiosError } from 'axios';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import { useHttpClient } from '@my-app/http';

import { DataProvider } from '../data-provider';

export interface UseCreateParams<TVariables> {
  values: TVariables;
}

export type UseCreateReturnType<TVariables, TError, TData> = UseMutationResult<
  TData,
  TError,
  UseCreateParams<TVariables>
>;

export interface UsePublicCreateProps<TData, TError = AxiosError> {
  onCreateSuccess?: (data: TData) => void;
  onCreateError?: (error: TError) => void;
}

export interface UseCreateProps<TVariables, TData, TError = AxiosError>
  extends UsePublicCreateProps<TData, TError> {
  resource: string;
  invalidateKeys?: string[];
  mutationOptions?: UseMutationOptions<
    TData,
    TError,
    UseCreateParams<TVariables>
  >;
}

export const useCreate = <TVariables, TData, TError = AxiosError>({
  resource,
  mutationOptions,
  invalidateKeys,
  onCreateSuccess,
  onCreateError,
}: UseCreateProps<TVariables, TData, TError>): UseCreateReturnType<
  TVariables,
  TError,
  TData
> => {
  const httpClient = useHttpClient();
  const dataProvider = DataProvider(httpClient);
  const queryClient = useQueryClient();

  const mutation = useMutation<TData, TError, UseCreateParams<TVariables>>({
    mutationFn: async ({ values }: UseCreateParams<TVariables>) => {
      const response = await dataProvider.create<TData, TVariables>({
        resource,
        params: values,
      });

      return response;
    },
    onSuccess: async (data) => {
      if (invalidateKeys?.length) {
        await queryClient.invalidateQueries({ queryKey: [...invalidateKeys] });
      }

      if (onCreateSuccess) {
        onCreateSuccess(data);
      }
    },
    onError(error) {
      if (onCreateError) {
        onCreateError(error);
      }
    },
    mutationKey: [resource],
    ...mutationOptions,
  });

  return mutation;
};
