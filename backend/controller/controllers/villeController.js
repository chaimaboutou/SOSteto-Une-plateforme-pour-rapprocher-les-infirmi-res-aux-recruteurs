const { ObjectId } = require('mongodb');
const { Ville, Quartier } = require('../../model/schema');


exports.createVille = async (req, res) => {
    try {
        const { nom_ville, code_postal } = req.body;
        const newVille = await Ville.create({ nom_ville, code_postal });
        res.status(201).json(newVille);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVille = async (req, res) => {
    try {
        const villes = await Ville.find();
        res.status(200).send(villes);
    } catch (error) {
        res.status(500).json(error);
    }
};
exports.getVilleByName = async (req, res) => {
    try {
        const ville = await Ville.findOne({ nom_ville: req.params.nom_ville });
        console.log(ville)
        res.status(200).send(ville);
    } catch (error) {
        res.status(500).json(error);
    }
};


exports.updateVille = async (req, res) => {
    try {
        const { nom_ville, code_postal } = req.body;
        const updatedVille = await Ville.findByIdAndUpdate(req.params.id, { nom_ville, code_postal }, { new: true });
        if (!updatedVille) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.status(200).json(updatedVille);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteVille = async (req, res) => {
    try {
        const deletedVille = await Ville.findByIdAndDelete(req.params.id);
        if (!deletedVille) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getQuartiersByVilleName = async (req, res) => {
    try {
        const ville = await Ville.findOne({nom_ville : req.params.nom_ville})

        const quartiers = await Quartier.find({ nom_ville: ville });
        res.status(200).json(quartiers);
    } catch (error) {
        console.error("Error fetching Quartiers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};