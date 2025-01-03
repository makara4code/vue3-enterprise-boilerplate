import { Http } from '@/services/Http';
import type { CurrentUser } from './current-user-type';

export async function fetchCurrentUserApi() {
  return await Http.get<SuccessResponse<CurrentUser>>('/api/v1/users/me');
}
