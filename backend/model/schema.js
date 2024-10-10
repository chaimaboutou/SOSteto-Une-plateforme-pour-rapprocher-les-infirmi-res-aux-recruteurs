const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User
const userSchema = new Schema({
    nom: {
        type: String,
    },
    prenom: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        trim: true,
    },
    mdp: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    estConnecte: {
        type: String,
        default: false,
    },
    ville: {
        type: Schema.Types.ObjectId,
        ref: 'VilleQuartier',
        required: false,
    },
    quartier: {
        type: Schema.Types.ObjectId,
        ref: 'VilleQuartier',
        required: false,
    },
    telephone: {
        type: String,
        required: false,
    },
    status: { type: Boolean, default: true, required: false, }
});

// Image
const imageSchema = new Schema({
    desc: String,
    data: Buffer
});

const imageUserSchema = new Schema({
    id_User: { type: Schema.Types.ObjectId, ref: 'User' },
    id_image: { type: Schema.Types.ObjectId, ref: 'Image' }
});



const disponibiliteSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    startingHour: {
        type: String,
        required: true
    },
    endingHour: {
        type: String,
        required: true
    },
    infirmiereId: {
        type: Schema.Types.ObjectId,
        ref: 'Infirmiere', // Reference to the Infirmiere model
        required: true
    }
});

// Recruteur
const roleSchema = new Schema({
    role: {
        type: String,
        unique: true,
        index: true,
    }
});

//langue
const langueSchema = new Schema({
    langue: String
})

// Profil Infirmier
const profilInfirmierSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    imageId: { type: Schema.Types.ObjectId, ref: 'Image' },
    a_propos: String,
    id_disponibilite: { type: Schema.Types.ObjectId, ref: 'Disponibilite' },
    id_cv: { type: Schema.Types.ObjectId, ref: 'Document' }
});

const langueInfirmierSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    languesparlees: { type: Schema.Types.ObjectId, ref: 'Langue' }
});

const specialiteInfirmierSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    specialite: { type: Schema.Types.ObjectId, ref: 'Specialite' }
});



// Session
const sessionSchema = new Schema({
    idSession: { type: Number, required: true, unique: true },
    date_expiration: Date
});

// Demande
const demandeSchema = new Schema({
    id_recruteur: { type: Schema.Types.ObjectId, ref: 'User' },
    titre: String,
    objet: String,
    ville: { type: Schema.Types.ObjectId, ref: 'Ville' },
    quartier: { type: Schema.Types.ObjectId, ref: 'Quartier' },
    date: String,
    heure_debut: String,
    heure_fin: String
});



// Rating
const ratingSchema = new Schema({
    id_recruteur: { type: Schema.Types.ObjectId, ref: 'Recruteur' },
    id_infirmiere: { type: Schema.Types.ObjectId, ref: 'Infirmier' },
    score: Number
});

// Commentaires
const commentairesSchema = new Schema({
    id_recruteur: { type: Schema.Types.ObjectId, ref: 'Recruteur' },
    id_infirmiere: { type: Schema.Types.ObjectId, ref: 'Infirmier' },
    objet: String
});

// Document
const documentSchema = new Schema({
    id_infirmier: { type: Schema.Types.ObjectId, ref: 'Infirmier' },
    intitule: String,
    date_remise: Date,
    lieu: String,
    etablissement: String
});

// Tables de références

// ville
const villeSchema = new Schema({
    nom_ville: { type: String, required: true, unique: true },
    code_postal: Number
}, { timestamps: true });

// specialite
const specialiteSchema = new Schema({
    nom_specialite: { type: String, required: true, unique: true }
});

// Quartier
const quartierSchema = new Schema({
    nom_quartier: String,
    nom_ville: { type: Schema.Types.ObjectId, ref: 'Ville' }
}, { timestamps: true });
//ville-quartier

// Soins
const soinsSchema = new Schema({
    nom_soin: { type: String, required: true, unique: true }
});

// Table d'association
// demande-soins
const demandeSoinsSchema = new Schema({
    id_demande: { type: Schema.Types.ObjectId, ref: 'Demande' },
    id_soin: { type: Schema.Types.ObjectId, ref: 'Soins' }
});

// infirmier-soins
const infirmierSoinsSchema = new Schema({
    id_infirmiere: { type: Schema.Types.ObjectId, ref: 'Infirmier' },
    nom_soin: { type: Schema.Types.ObjectId, ref: 'Soin' }
});

// favoris_demandes
const favorisDemandesSchema = new Schema({
    id_infirmier: { type: Schema.Types.ObjectId, ref: 'Infirmier' },
    id_demande: { type: Schema.Types.ObjectId, ref: 'Demande' }
});

// favoris_infirmiers
const favorisInfirmiersSchema = new Schema({
    id_recruteur: { type: Schema.Types.ObjectId, ref: 'Recruteur' },
    id_infirmier: { type: Schema.Types.ObjectId, ref: 'Infirmier' }
});

// Exporting schemas
module.exports = {
    User: mongoose.model('User', userSchema),
    Image: mongoose.model('Image', imageSchema),
    ProfilInfirmier: mongoose.model('ProfilInfirmier', profilInfirmierSchema),
    Session: mongoose.model('Session', sessionSchema),
    Demande: mongoose.model('Demande', demandeSchema),
    Disponibilite: mongoose.model('Disponibilite', disponibiliteSchema),
    Rating: mongoose.model('Rating', ratingSchema),
    Commentaires: mongoose.model('Commentaires', commentairesSchema),
    Document: mongoose.model('Document', documentSchema),
    Ville: mongoose.model('Ville', villeSchema),
    Specialite: mongoose.model('Specialite', specialiteSchema),
    Quartier: mongoose.model('Quartier', quartierSchema),
    Soins: mongoose.model('Soins', soinsSchema),
    DemandeSoins: mongoose.model('DemandeSoins', demandeSoinsSchema),
    InfirmierSoins: mongoose.model('InfirmierSoins', infirmierSoinsSchema),
    FavorisDemandes: mongoose.model('FavorisDemandes', favorisDemandesSchema),
    FavorisInfirmiers: mongoose.model('FavorisInfirmiers', favorisInfirmiersSchema),
    Langue: mongoose.model('Langue', langueSchema),
    ImageUser: mongoose.model('ImageUser', imageUserSchema),
    LangueInfirmier: mongoose.model('LangueInfirmier', langueInfirmierSchema),
    SpecialiteInfirmier: mongoose.model('SpecialiteInfirmier', specialiteInfirmierSchema),
    //DemandeRecruteur: mongoose.model('DemandeRecruteur', demandeRecruteurSchema)
    //Role: mongoose.model('Role', roleSchema),
    //FullRecruteurDetails: mongoose.model('FullRecruteurDetails', fullRecruteurDetailsSchema)
};
