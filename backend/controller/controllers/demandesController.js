require('dotenv').config();
const jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;

const { User, Ville, Quartier, Demande, DemandeSoins, Soins } = require('../../model/schema');

exports.countDemandes = async (req, res) => {
    try {
        // Count all demandes with the specified user ID
        const nombreDemandes = await Demande.countDocuments()
        console.log('nombre de deamdnes', nombreDemandes)
        res.status(200).json(nombreDemandes);
    } catch (error) {
        console.error('Erreur nombre demandes:', error);
        throw error;
    }
}


exports.createADemande = async (req, res) => {
    try {
        const villeinf = await Ville.findOne({ nom_ville: req.body.ville });
        const quartierinf = await Quartier.findOne({ nom_quartier: req.body.quartier });

        if (!villeinf || !quartierinf) {
            return res.status(400).json({ error: 'Invalid ville or quartier' });
        }

        const newdemande = {
            id_recruteur: req.body.id_recruteur,
            titre: req.body.titre,
            objet: req.body.objet,
            date: req.body.date,
            ville: villeinf._id,
            quartier: quartierinf._id,
            heure_debut: req.body.heure_debut,
            heure_fin: req.body.heure_fin,
        };

        const demandeObject = await Demande.create(newdemande);
        res.status(201).json(demandeObject);
    } catch (error) {
        console.error('Error creating demande:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



exports.getDemandeById = async (req, res) => {
    try {
        const demande = await Demande.findById(req.params.demandeId)
        const { nom_ville } = await Ville.findOne(demande.ville)
        const { nom_quartier } = await Quartier.findOne(demande.quartier)
        const demandeRes = {
            _id: demande._id,
            id_recruteur: demande.id_recruteur,
            titre: demande.titre,
            objet: demande.objet,
            date: demande.date,
            heure_debut: demande.heure_debut,
            heure_fin: demande.heure_fin,
            ville: nom_ville,
            quartier: nom_quartier,
        }

        if (!demande) {
            return res.status(404).json({ error: 'No demande found' })
        }
        res.status(200).json(demandeRes);
    } catch (error) {
        res.status(500).json(error);
    }
}


exports.getSoinsForDemande = async (req, res) => {
    try {
        const id_demande = req.params.id;
        const demandeSoins = await DemandeSoins.find({ id_demande: id_demande });
        console.log(demandeSoins)
        const id_soins = demandeSoins.map(demandeSoin => demandeSoin.id_soin);
        console.log(id_soins)
        const soins = await Soins.find({ _id: { $in: id_soins } });



        res.status(200).json(soins);
    } catch (error) {
        console.error('Error fetching soins for demande:', error);
        res.status(500).json({ error: 'Failed to fetch soins for demande' });
    }
};

exports.createDemandeSoins = async (req, res) => {
    try {

        const demandeId = req.params.id;
        const { soins } = req.body;

        // Save each demandeSoins individually
        const savedDemandeSoins = [];
        for (const soinId of soins) {
            const demandeSoins = new DemandeSoins({
                id_demande: demandeId,
                id_soin: soinId,
            });
            const savedSoin = await demandeSoins.save();
            savedDemandeSoins.push(savedSoin);
        }

        // Send success response
        res.status(201).json({
            message: 'DemandeSoins created successfully',
            demandeSoins: savedDemandeSoins,
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
