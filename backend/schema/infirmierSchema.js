const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infirmierSchema = {
  type: 'object',
  properties: {
      idUser: {
          type: Schema.Types.ObjectId,
          ref: 'User',
      },
      langue_parlee: {
          type: 'array',
          items: {
              type: 'string',
          },
      },
      specialite: {
          type: 'array',
          items: {
              type: 'string',
          },
      },
  }
};

const infirmierOutputSchema = {
    type: 'object',
    properties: {
      idUser: {
        type: 'string',
        description: 'User that is referenced by infirmier',
      },
      langue_parlee: {
        type: 'array',
        items: {
            type: 'string',
        },
      },
      specialite: {
          type: 'array',
          items: {
              type: 'string',
          },
      },
    }
  };
  
  module.exports = { infirmierSchema, infirmierOutputSchema }