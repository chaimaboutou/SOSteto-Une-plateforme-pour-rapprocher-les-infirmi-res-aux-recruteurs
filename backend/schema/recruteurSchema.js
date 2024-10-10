const recruteurSchema = {
    type: 'object',
    properties : {
        idUser : {
            type: 'string',
            description: 'The unique identifier for the user.'
        },
        imageId: {
            type: 'string',
            description: 'Image identifier of recruteur'
        },
        ville: {
            type: 'string',
            description: 'Ville of recruteur'
        },
        quartier: {
            type: 'string',
            description: 'Quartier of recruteur'
        },
        telephone: {
            type: 'string',
            description: 'telephone of recruteur'
        },
        
    },
    required: ['idUser'], // Specify the required properties
    required: false, // Make the imageId property not required
}
module.exports = {recruteurSchema}