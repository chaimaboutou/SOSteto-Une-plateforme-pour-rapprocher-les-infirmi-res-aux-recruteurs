const villeSchema = {
    type: 'object',
    properties: {
        nom_ville: {
            type: 'string',
            description: 'The name of the city.'
        },
        code_postal: {
            type: 'integer',
            description: 'The postal code of the city.'
        }
    },
    required: ['nom_ville']
};

module.exports = { villeSchema };