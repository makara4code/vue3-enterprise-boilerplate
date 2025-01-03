import { Http } from '@/services/Http';
import type { Resource } from './resource-type';

const API_ENDPOINT = '/api/v1/resources/permissions';

export async function fetchResourceWithPermissionApi(signal: AbortSignal) {
  const response = await Http.get<SuccessResponse<Resource[]>>(API_ENDPOINT, undefined, { signal });
  return response?.data;
}