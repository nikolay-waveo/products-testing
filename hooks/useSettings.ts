import { useSWR } from "helpers/api-client";

export function useSettings(shop: string) {
  const { data, error } = useSWR(`/api/settings?shop=${shop}`);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
