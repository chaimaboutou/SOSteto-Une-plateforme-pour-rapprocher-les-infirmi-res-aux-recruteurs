const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = {
  type: 'object',
  properties: {
    nom: {
      type: 'string',
      description: 'The last name of the user.'
    },
    prenom: {
      type: 'string',
      description: 'The first name of the user.'
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'The email address of the user.'
    },
    mdp: {
      type: 'string',
      description: 'The password of the user.'
    },
    role: {
      type: 'string',
      description: 'The role of the user.'
    },

    estConnecte: {
      type: 'boolean',
      description: 'Indicates whether the user is currently connected.'
    },
    ville: {
      type: Schema.Types.ObjectId,
      ref: 'Ville'
    },
    quartier: {
      type: Schema.Types.ObjectId,
      ref: 'Quartier'
    },
    telephone: {
      type: 'string',
      description: 'telephone of user'
    }
  }
};

const userOutputSchema = {
  type: 'object',
  properties: {
    nom: {
      type: 'string',
      description: 'The last name of the user.'
    },
    prenom: {
      type: 'string',
      description: 'The first name of the user.'
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'The email address of the user.'
    },
    mdp: {
      type: 'string',
      description: 'The password of the user.'
    },
    role: {
      type: 'string',
      description: 'The role of the user.'
    },

    estConnecte: {
      type: 'boolean',
      description: 'Indicates whether the user is currently connected.'
    },
    ville: {
      type: 'string',
      description: 'ville of user'
    },
    quartier: {
      type: 'string',
      description: 'quartier of user'
    },
    telephone: {
      type: 'string',
      description: 'telephone of user'
    },
    status: {
      type: 'boolean',
      description: 'logic status of user',
      default: true,
    }
  }
};

const userloginSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {

    email: {
      type: 'string',
      format: 'email',
      description: 'The email address of the user.'
    },
    mdp: {
      type: 'string',
      description: 'The password of the user.'
    },

  }
}
const usertokenShema = {
  type: 'object',
  required: ['token'],
  properties: {

    token: {
      type: 'string',
      description: 'The token of user'
    },


  }
}

module.exports = { userSchema, userloginSchema, userOutputSchema, usertokenShema }