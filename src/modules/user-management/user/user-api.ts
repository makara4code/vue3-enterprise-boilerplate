import { Http } from '@/services/Http';
import type { CreateUserForm, EditUserForm, User } from './user-type';

const API_ENDPOINT = '/api/v1/users';

export async function fetchUsersApi(signal: AbortSignal) {
  return await Http.get<SuccessResponse<User[]>>(API_ENDPOINT, undefined, { signal });
}

export async function fetchUserByIdApi(id: string, signal: AbortSignal) {
  return await Http.get<SuccessResponse<User>>(`${API_ENDPOINT}/${id}`, undefined, { signal });
}

export async function createUserApi(values: CreateUserForm) {
  return await Http.post<SuccessResponse<User>>(`${API_ENDPOINT}`, values);
}

export async function updateUserApi(values: EditUserForm, id: string) {
  return await Http.put<SuccessResponse<User>>(`${API_ENDPOINT}/${id}`, values);
}
