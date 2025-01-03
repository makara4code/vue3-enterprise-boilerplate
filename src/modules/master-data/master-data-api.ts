import { Http } from '@/services/Http';
import type { MasterData, MasterDataQuery } from './master-data-type';

const API_ENDPOINT = '/api/v1/master-data';

export async function fetchMasterDataByDataTypeApi(signal: AbortSignal, query: MasterDataQuery) {
  return await Http.get<SuccessResponse<MasterData[]>>(API_ENDPOINT, query, {
    signal
  });
}
