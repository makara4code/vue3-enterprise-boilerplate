import { useQuery } from '@tanstack/vue-query';
import { fetchMasterDataByDataTypeApi } from './master-data-api';
import type { MasterDataQuery } from './master-data-type';

export function getFetchMasterDataByDataTypeQueryKey(query?: MasterDataQuery) {
  if (!query?.type) return ['fetchMasterDataByDataType'];
  return ['fetchMasterDataByDataType', query?.type];
}

export function useFetchMasterDataByDataTypeQuery(query: MasterDataQuery) {
  return useQuery({
    queryKey: getFetchMasterDataByDataTypeQueryKey(query),
    queryFn: ({ signal }) => fetchMasterDataByDataTypeApi(signal, query)
  });
}