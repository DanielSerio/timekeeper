import { CATEGORY_RECORD_SCHEMA } from "./record-schema.docs";

export const SORT_FIELD = {
  type: 'enum',
  enum: ['asc', 'desc'],
  example: 'desc',
  optional: true,
  nullable: true
};

export const CATEGORY_LIST_SCHEMA = {
  type: 'object',
  properties: {
    paging: {
      type: "object",
      properties: {
        limit: {
          type: 'number',
          example: 25
        },
        offset: {
          type: 'number',
          nullable: true,
          example: 0
        }
      }
    },
    sorting: {
      type: 'object',
      properties: {
        id: SORT_FIELD,
        name: { ...SORT_FIELD, example: 'asc' },
        createdAt: SORT_FIELD,
        lastUpdatedAt: { ...SORT_FIELD, example: 'asc' },
      }
    },
    records: {
      type: 'array',
      items: CATEGORY_RECORD_SCHEMA
    }
  }
};

