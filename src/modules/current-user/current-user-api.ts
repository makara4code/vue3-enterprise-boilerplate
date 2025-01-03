import { Http } from '@/services/Http';
import type { CurrentUser } from './current-user-type';

export async function fetchCurrentUserApi() {
  const res = await Http.get<SuccessResponse<CurrentUser>>('/api/v1/users/me');
  return res?.data;
};
