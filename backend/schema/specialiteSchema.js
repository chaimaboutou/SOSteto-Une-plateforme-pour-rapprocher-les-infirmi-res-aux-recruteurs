const specialiteSchema = {
    type: 'object',
    properties: {
        nom_specialite: {
            type: 'string',
            description: 'The name of the city.'
        },

    },
    required: ['nom_specialite']
};

module.exports = { specialiteSchema };