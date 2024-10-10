const { Specialite } = require('../../model/schema');

exports.getSpecialite = async (req, res) => {
    try {
        const specialites = await Specialite.find();
        res.status(200).send(specialites);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createSpecialite = async (req, res) => {
    try {
        const { nom_specialite } = req.body;
        const newSpecialite = await Specialite.create({ nom_specialite });
        res.status(201).json(newSpecialite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSpecialite = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_specialite } = req.body;
        const updatedSpecialite = await Specialite.findByIdAndUpdate(id, { nom_specialite }, { new: true });
        res.status(200).json(updatedSpecialite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteSpecialite = async (req, res) => {
    try {
        const { id } = req.params;
        await Specialite.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
