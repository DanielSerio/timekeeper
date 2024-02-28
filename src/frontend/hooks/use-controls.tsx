import {
  useState,
  type PropsWithRef,
  useMemo,
  type Attributes,
  type RefAttributes,
  type InputHTMLAttributes,
} from "react";

export type ControlName =
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio";

export interface SelectOption {
  label: string;
  value: any;
}

export type CtrlProps<Name extends ControlName> = (Name extends "select"
  ? { options: SelectOption[] }
  : Name extends "radio"
  ? { options: string[] }
  : {}) &
  InputHTMLAttributes<
    Name extends "input" | "checkbox" | "radio"
      ? HTMLInputElement
      : Name extends "textarea"
      ? HTMLTextAreaElement
      : HTMLSelectElement
  >;

export interface ControlProps<Name extends ControlName> {
  componentName: Name;
  componentProps: CtrlProps<Name>;
}

export interface FormValues {
  [k: string]: ControlProps<ControlName>;
}

export function useControls(
  initialValue: FormValues,
  validateField?: (
    name: string | number,
    value: string | number | boolean
  ) => void
) {
  const [values, setValues] = useState<FormValues>(initialValue);

  const controls = useMemo(
    () => (
      <>
        {Object.keys(values).map((key) => {
          const value = values[key];

          if (value.componentName === "input") {
            return (
              <input
                key={key}
                type={value.componentProps.type}
                defaultValue={values[key].componentProps.value}
                onChange={(e) => {
                  setValues({
                    ...values,
                    [key]: {
                      ...values[key],
                      componentProps: {
                        ...values[key].componentProps,
                        value: (e.target as HTMLInputElement).value,
                      },
                    },
                  });
                }}
                onBlur={(e) => {
                  if (validateField)
                    validateField(key, (e.target as HTMLInputElement).value);
                }}
              />
            );
          } else if (value.componentName === "checkbox") {
            return (
              <input
                key={key}
                type={"checkbox"}
                defaultChecked={values[key].componentProps.checked}
                onInput={(e) =>
                  setValues({
                    ...values,
                    [key]: {
                      ...values[key],
                      componentProps: {
                        ...values[key].componentProps,
                        checked: (e.target as HTMLInputElement).checked,
                      },
                    },
                  })
                }
              />
            );
          } else if (value.componentName === "radio") {
            return (
              <>
                {(value.componentProps as CtrlProps<"radio">).options.map(
                  (opt) => (
                    <input
                      key={key}
                      type={"radio"}
                      value={opt}
                      defaultChecked={values[key].componentProps.checked}
                    />
                  )
                )}
              </>
            );
          }
        })}
      </>
    ),
    [initialValue]
  );

  const json = useMemo(() => {
    const getJSON = () => {
      let vals: { [k: string]: any } = {};
      for (const key in values) {
        vals[key] =
          values[key].componentProps.value ??
          values[key].componentProps.checked;
      }

      return vals;
    };

    return getJSON();
  }, [values]);

  return {
    values,
    setValues,
    controls,
    json,
  };
}

