import { CATEGORY_EXAMPLES } from "./category-examples";
import { CATEGORY_LIST_SCHEMA } from "./list-schema.docs";
import { CATEGORY_RECORD_SCHEMA } from "./record-schema.docs";

export const CREATED_RESPONSE = {
  description: 'Creates a new category',
  schema: CATEGORY_RECORD_SCHEMA,
  examples: CATEGORY_EXAMPLES
};

export const GET_ONE_RESPONSE = {
  description: 'Gets a category',
  schema: CATEGORY_RECORD_SCHEMA,
  examples: CATEGORY_EXAMPLES
};

export const DELETE_ONE_RESPONSE = {
  description: 'Deletes a category',
  schema: CATEGORY_RECORD_SCHEMA,
  examples: CATEGORY_EXAMPLES
};

export const GET_MANY_RESPONSE = {
  description: 'Gets a list of categories',
  schema: CATEGORY_LIST_SCHEMA,
  examples: CATEGORY_EXAMPLES
};