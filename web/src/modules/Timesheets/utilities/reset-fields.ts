import type { RefObject } from "react";

function selectFields(row: HTMLDivElement, query: '.mantine-Select-input' | '.mantine-Input-input' | 'textarea') {
  const allFields = row.querySelectorAll(query);

  return allFields;
}

export function resetFields(ref?: RefObject<HTMLDivElement | null>) {
  if (ref?.current) {
    const inputs = selectFields(ref.current, '.mantine-Input-input');
    const textareas = selectFields(ref.current, 'textarea');
    const selects = selectFields(ref.current, '.mantine-Select-input');

    const all = [...inputs, ...textareas, ...selects];

    all.forEach((inpt) => (inpt as HTMLInputElement).value = '');

    const firstField = selects.item(0) as HTMLInputElement;

    firstField.focus();
  }
}