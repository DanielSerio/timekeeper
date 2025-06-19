import { TIMESHEET_LIST_SCHEMA } from "./list-schema.docs";
import { EXTENDED_TIMESHEET_RECORD_SCHEMA } from "./record-schema.docs";
import { TIMESHEET_EXAMPLES } from "./timesheet-examples";

export const CREATED_RESPONSE = {
  description: 'Creates a new timesheet',
  schema: EXTENDED_TIMESHEET_RECORD_SCHEMA,
  examples: TIMESHEET_EXAMPLES
};

export const UPDATED_RESPONSE = {
  description: 'Updates a timesheet',
  schema: EXTENDED_TIMESHEET_RECORD_SCHEMA,
  examples: TIMESHEET_EXAMPLES
};

export const GET_ONE_RESPONSE = {
  description: 'Gets a timesheet',
  schema: EXTENDED_TIMESHEET_RECORD_SCHEMA,
  examples: TIMESHEET_EXAMPLES
};

export const DELETE_ONE_RESPONSE = {
  description: 'Deletes a timesheet',
  schema: {
    type: 'object',
    properties: {
      status: {
        type: 'number'
      }
    }
  },
  examples: TIMESHEET_EXAMPLES
};

export const GET_MANY_RESPONSE = {
  description: 'Gets a list of timesheets',
  schema: TIMESHEET_LIST_SCHEMA,
  examples: TIMESHEET_EXAMPLES
};