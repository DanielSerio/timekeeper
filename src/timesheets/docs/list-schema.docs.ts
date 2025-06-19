import { SORT_FIELD } from "../../categories/docs/list-schema.docs";
import { TIMESHEET_RECORD_SCHEMA } from "./record-schema.docs";

export const TIMESHEET_LIST_SCHEMA = {
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
      items: TIMESHEET_RECORD_SCHEMA
    }
  }
};