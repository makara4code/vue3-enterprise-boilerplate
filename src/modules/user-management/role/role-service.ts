import { useMutation, useQuery } from '@tanstack/vue-query';
import { computed, type ComputedRef } from 'vue';

import { AppRoute } from '@/constants';
import router from '@/router';

import { getPermissionIdsFromValuesToPermissionIds, getResourcePermissionIds } from '../resource/resource-utils';
import { createRoleApi, fetchRoleAutocompleteApi, fetchRoleByIdApi, fetchRolesApi, updateRoleApi } from './role-api';
import type { RoleForm } from './role-type';

export function fetchRolesQueryKey() {
  return ['fetchRoles'];
}

export function useFetchRoles() {
  return useQuery({
    queryKey: fetchRolesQueryKey(),
    queryFn: ({ signal }) => fetchRolesApi(signal)
  });
}

export function fetchRoleAutocompleteQueryKey(branchCode: ComputedRef<string>) {
  return ['fetchRolesAutocomplete', branchCode];
}

export function useFetchRoleAutocomplete(branchCode: ComputedRef<string>) {
  const enabled = computed(() => !!branchCode);

  const { data: roles, isLoading } = useQuery({
    queryKey: fetchRoleAutocompleteQueryKey(branchCode),
    queryFn: ({ signal }) => fetchRoleAutocompleteApi(signal, branchCode.value),
    enabled,
  });

  return { roles, isLoading };
}

export function fetchRoleByIdQueryKey(id: string) {
  if (!id) return ['fetchRoleById'];
  return ['fetchRoleById', id];
}

export function useFetchRoleById(id: string) {
  return useQuery({
    queryKey: fetchRoleByIdQueryKey(id),
    queryFn: ({ signal }) => fetchRoleByIdApi(id, signal)
  });
}

export function getFetchRolePermissionIdsByIdQueryKey(id: string) {
  if (!id) return ['fetchRolePermissionIdsById'];
  return ['fetchRolePermissionIdsById', id];
}

export function useFetchRolePermissionIdsById(id: string) {
  return useQuery({
    queryKey: getFetchRolePermissionIdsByIdQueryKey(id),
    queryFn: ({ signal }) => fetchRoleByIdApi(id, signal),
    select(data): RoleForm {
      return {
        nameEn: data?.nameEn ?? '',
        nameKh: data?.nameKh ?? '',
        type: data?.type ?? '',
        description: data?.description,
        permission: getResourcePermissionIds(data?.permissions)
      };
    }
  });
}

export function useCreateRole() {
  return useMutation({
    mutationFn: (formValues: RoleForm) => {
      return createRoleApi({
        nameEn: formValues.nameEn,
        nameKh: formValues.nameKh,
        type: formValues.type,
        description: formValues.description,
        permissionIds: getPermissionIdsFromValuesToPermissionIds(formValues.permission)
      });
    },
    onSuccess: () => {
      router.push({ name: AppRoute.ROLE });
    }
  });
}

export function useUpdateRole(id: string) {
  return useMutation({
    mutationFn: (formValues: RoleForm) => {
      return updateRoleApi({
        nameEn: formValues.nameEn,
        nameKh: formValues.nameKh,
        type: formValues.type,
        description: formValues.description,
        permissionIds: getPermissionIdsFromValuesToPermissionIds(formValues.permission)
      }, id);
    },
    onSuccess: () => {
      router.push({ name: AppRoute.ROLE });
    }
  });
}
