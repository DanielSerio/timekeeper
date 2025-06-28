type CallbackType<Value, Return> = (
  value: Value,
  index: number,
  vals: Value[]
) => Return;

/**
 * Takes an array of values and a callback function, and returns a new function that applies the
 * callback to a specific index in the array.
 * @param {ValueType[]} values - An array of values of type `ValueType`.
 * @param callback - The `callback` parameter in the `_getOptimizedCallback` function is a function
 * that takes three arguments: `value`, `index`, and `values`. It is a generic type `CallbackType` that
 * takes a `ValueType` and `CallbackReturnType` as type parameters.
 * @returns The `_getOptimizedCallback` function returns a callback function that takes an index as a
 * parameter. This callback function retrieves the value at the specified index from the `values` array
 * and then calls the original `callback` function with the value, index, and the entire `values` array
 * as arguments.
 */
export function _getOptimizedCallback<ValueType, CallbackReturnType>(
  values: ValueType[],
  callback: CallbackType<ValueType, CallbackReturnType>
) {
  return (index: number) => {
    const value = values[index];

    return callback(value, index, values);
  };
}
