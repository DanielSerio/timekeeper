import {
  useState,
  type InputHTMLAttributes,
  type PropsWithChildren,
} from "react";
import { type ControlName, useControls, type FormValues } from "./use-controls";
import { useValidation } from "./use-validation";

export interface UseFormField<
  ComponentName extends ControlName,
  ValueType extends string | string[] | number | number[] | boolean
> {
  initialValue: ValueType;
  label: string;
  name: string;
  componentName: ControlName;
  componentProps: InputHTMLAttributes<
    ComponentName extends "input" | "checkbox" | "radio"
      ? HTMLInputElement
      : ComponentName extends "textarea"
      ? HTMLTextAreaElement
      : HTMLSelectElement
  >;
  validator?: (val: ValueType) => null | string;
}

export interface UseFormParams extends FormValues {
  [k: string]: UseFormField<
    "input" | "checkbox" | "radio",
    string | string[] | number | number[] | boolean
  >;
}

const createInitialState = (params: UseFormParams) => {
  let obj: { [k: string]: any } = {};

  for (const key in params) {
    obj[key] = params[key].initialValue;
  }

  return obj;
};

function createValidators<Type>(params: UseFormParams) {
  let obj: {
    [k: string]: ((v: string | number | boolean) => string | null) | undefined;
  } = {};

  for (const key in params) {
    if (params[key].validator) {
      (obj as any)[key] = params[key].validator;
    }
  }

  return obj as Record<
    keyof Type,
    ((value: string | number | boolean) => string | null) | undefined
  >;
}

export function useForm<Type extends UseFormParams>(params: Type) {
  const { validateField } = useValidation(params, createValidators(params));
  const { controls, values, json } = useControls(params, validateField);

  async function onSubmit() {
    console.log('SUBMIT FROM HOOK');
  }

  return {
    json,
    values,
    onSubmit,
    controls,
  };
}

