const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quartierSchema = {
    type: 'object',
    properties: {
      nom_quartier: {
        type: 'string',
        description: 'The name of the district.'
      },
      nom_ville: {
        type: Schema.Types.ObjectId,
        ref: 'Ville'
      }
    },
    required: ['nom_quartier', 'nom_ville']
  };
  
  module.exports = { quartierSchema };
  