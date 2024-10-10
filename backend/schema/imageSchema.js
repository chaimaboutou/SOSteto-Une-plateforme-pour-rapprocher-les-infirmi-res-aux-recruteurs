const { Schema } = require("mongoose");

const imageSchema = {
  type: 'object',
  properties: {
    desc: {
      type: 'string',
      description: 'Description of the image.'
    },
    data: {
      type: 'string',
      description: 'Base64 encoded image data.'
    }
  },
  required: ['desc', 'data']
};

module.exports = { imageSchema };
