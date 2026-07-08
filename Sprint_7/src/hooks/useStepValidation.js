import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function useStepValidation(schema, defaultValues) {
  const formMethods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    formState: { errors, isSubmitted, submitCount },
  } = formMethods;

  useEffect(() => {
    if (submitCount > 0 && Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const fieldElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (fieldElement && typeof fieldElement.focus === 'function') {
        fieldElement.focus();
      }
    }
  }, [errors, submitCount]);

  return formMethods;
}
