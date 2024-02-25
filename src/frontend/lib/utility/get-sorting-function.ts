export interface GetSortingFunctionParams {
  sortType: "number" | "string" | "date";
  propertyPath: string;
  direction: "ASC" | "DESC";
}

/**
 * Generates a sorting function based on specified parameters
 * @param {Object} params - Parameters for sorting function.
 * @param {("number"|"string"|"date")} params.sortType - Type of the property to sort by ("number", "string", or "date").
 * @param {string} params.propertyPath - Path to the property to be sorted.
 * @param {("ASC"|"DESC")} params.direction - Direction of sorting ("ASC" for ascending, "DESC" for descending).
 * @returns {Function} Sorting function
 */
export function getSortingFunction<Type extends { [k: string]: any }>(
  params: GetSortingFunctionParams
) {
  const getValueUsingPropMap = (item: Type, propMap: string[]): any => {
    let current = item;
    let cursor: number = 0;

    while (cursor < propMap.length) {
      current = current[propMap[cursor]];
      cursor += 1;
    }

    return current;
  };

  return (itemA: Type, itemB: Type): number => {
    const propMap = params.propertyPath.split(/\./g);
    const valueA = getValueUsingPropMap(itemA, propMap);
    const valueB = getValueUsingPropMap(itemB, propMap);

    if (params.sortType === "string") {
      if (params.direction === "ASC") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    } else {
      if (params.direction === "ASC") {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    }
  };
}

