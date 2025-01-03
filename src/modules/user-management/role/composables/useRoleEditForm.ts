import { useFormAsync } from '@/composables';
import { toTypedSchema } from '@vee-validate/zod';
import { type Ref } from 'vue';
import { roleValidationSchema } from '../role-schema';
import { useUpdateRole } from '../role-service';
import type { RoleForm } from '../role-type';

export function useRoleEditForm(id: string, data: Ref<RoleForm | undefined>) {
  const { handleSubmit } = useFormAsync<RoleForm>({
    initialValues: data,
    validationSchema: toTypedSchema(roleValidationSchema)
  });

  const { isPending, mutate } = useUpdateRole(id as string);

  const onSubmit = handleSubmit((formValues) => {
    mutate(formValues);
  });

  return {
    isSubmitting: isPending,
    onSubmit
  };
}