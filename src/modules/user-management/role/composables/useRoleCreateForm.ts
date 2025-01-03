import { toTypedSchema } from '@vee-validate/zod';

import { useFormAsync } from '@/composables';
import { roleValidationSchema } from '../role-schema';
import { useCreateRole } from '../role-service';
import type { RoleForm } from '../role-type';

export function useRoleCreateForm() {
  const { handleSubmit } = useFormAsync<RoleForm>({
    validationSchema: toTypedSchema(roleValidationSchema)
  });

  const { isPending, mutate } = useCreateRole();

  const onSubmit = handleSubmit((formValues) => {
    mutate(formValues);
  });

  return {
    isSubmitting: isPending,
    onSubmit
  };
}