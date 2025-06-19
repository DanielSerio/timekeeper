export const TIMESHEET_RECORD_SCHEMA = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1
    },
    name: {
      type: 'string',
      example: 'Timesheet #1'
    },
    date: {
      type: 'string',
      format: 'date',
      example: 'Timesheet #1'
    },
    createdAt: {
      type: 'string',
      format: 'date',
      example: new Date('2016-12-12')
    },
    lastUpdatedAt: {
      type: 'string',
      format: 'date',
      nullable: true,
      examples: [null, new Date()]
    }
  }
};

export const TIMESHEET_LINE_RECORD_SCHEMA = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1
    },
    timesheetId: {
      type: 'number',
      example: 1
    },
    categoryId: {
      type: 'number',
      example: 1
    },
    name: {
      type: 'string',
      example: 'Timesheet #1'
    },
    startTime: {
      type: 'string',
      length: 5
    },
    endTime: {
      type: 'string',
      length: 5
    },
    note: {
      type: 'string',
      nullable: true
    },
    createdAt: {
      type: 'string',
      format: 'date',
      example: new Date('2016-12-12')
    },
    lastUpdatedAt: {
      type: 'string',
      format: 'date',
      nullable: true,
      examples: [null, new Date()]
    }
  }
};

export const EXTENDED_TIMESHEET_RECORD_SCHEMA = {
  ...TIMESHEET_RECORD_SCHEMA,
  properties: {
    ...TIMESHEET_RECORD_SCHEMA.properties,
    lines: {
      type: "array",
      items: TIMESHEET_LINE_RECORD_SCHEMA
    }
  }
};

export const CREATE_BODY_SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      nullable: true
    },
    date: {
      type: 'string',
      format: 'date',
      nullable: true
    },
    lines: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          categoryId: {
            type: 'number'
          },
          startTime: {
            type: 'string',
            maxLength: 5,
            example: '11:15'
          },
          endTime: {
            type: 'string',
            maxLength: 5,
            example: '13:45'
          },
          note: {
            type: 'string',
            nullable: true
          }
        }

      }
    }
  }
};

export const UPDATE_BODY_SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      nullable: true
    },
    date: {
      type: 'string',
      format: 'date',
      nullable: true
    },
    lines: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: "number",
            nullable: true
          },
          categoryId: {
            type: 'number'
          },
          startTime: {
            type: 'string',
            maxLength: 5,
            example: '11:15'
          },
          endTime: {
            type: 'string',
            maxLength: 5,
            example: '13:45'
          },
          note: {
            type: 'string',
            nullable: true
          }
        }

      }
    },
    deleteLines: {
      type: 'array',
      items: {
        type: 'number'
      }
    }
  }
};