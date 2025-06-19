import type { NestedArray } from "#core/types";
import { filter } from "../array";

type ClassNameParam = string | false | null | undefined;

/**
 * Utility function for formating class name strings.
 * @param classes Deep className array - (string | false | null | undefined)[]
 * @returns the className string - string | undefined
 */
export function classNames(...classes: NestedArray<ClassNameParam>): string | undefined {
  const flatClasses = classes.flat(4) as ClassNameParam[];
  const filteredClassNames = filter(flatClasses, (clss: ClassNameParam) => !!clss && clss.trim().length > 0);

  if (filteredClassNames.length === 0) {
    return undefined;
  }

  return filteredClassNames.join(' ');
}