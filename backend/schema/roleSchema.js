const roleSchema = {
    type: 'object',
    properties : {
        role: {
            type: 'string',
            description: 'The unique role for the user.'
        }
    }
}

module.exports = {roleSchema}