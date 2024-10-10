const { Soins } = require('../../model/schema');

exports.getSoins = async (req, res) => {
    try {
        const soins = await Soins.find();
        res.status(200).send(soins);
    } catch (error) {
        res.status(500).json(error);
    }
};

