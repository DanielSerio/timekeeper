import { useCallback, useState } from "react";
import type { FormValues } from "./use-controls";

function createInitialFormState<Type extends FormValues>(controls: Type) {
  let obj = {} as Record<keyof Type, null | string>;
  for (const key in controls) {
    obj[key] = null;
  }

  return obj;
}

export function useValidation<Type extends FormValues>(
  controls: Type,
  validators: Record<
    keyof Type,
    undefined | ((value: string | number | boolean) => string | null)
  >
): {
  validateField: (name: keyof Type, value: string | number | boolean) => void;
  validation: Record<keyof Type, null | string>;
} {
  const [validation, setValidation] = useState(
    createInitialFormState(controls)
  );

  const validateField = useCallback(
    (name: keyof Type, value: string | number | boolean) => {
      if (validators[name] !== undefined) {
        setValidation((current) => ({
          ...current,
          [name]: validators[name]!(value),
        }));
      }
    },
    [setValidation]
  );

  return {
    validateField,
    validation,
  };
}

