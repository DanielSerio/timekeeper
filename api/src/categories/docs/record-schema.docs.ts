export const CATEGORY_RECORD_SCHEMA = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1
    },
    name: {
      type: 'string',
      example: 'Category #1'
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

