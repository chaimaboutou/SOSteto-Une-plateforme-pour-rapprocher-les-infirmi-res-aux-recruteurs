const { ObjectId } = require("mongodb");
// const { Infirmier, Specialite, User, Ville, Quartier, SpecialiteInfirmier, LangueInfirmier, InfirmierSoins } = require("../../model/schema")
const { Infirmier, Specialite, User, Ville, Quartier, SpecialiteInfirmier, LangueInfirmier, InfirmierSoins, Langue, Soins} = require("../../model/schema")



exports.createInfirmier = async (req, res) => {
    try {
        const newInfirmier = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            mdp: req.body.mdp,
            role: 'infirmier',
            estConnecte: req.body.estConnecte,
            ville: req.body.nom_ville,
            quartier: req.body.nom_quartier,
            telephone: req.body.telephone,
            status: req.body.status,
        }
        const user = await User.create(newInfirmier);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllInfirmiers = async (req, res) => {
    try {
        const users = await User.find({ role: 'infirmier' })
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json(error);
    }
};



exports.getInfirmierById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const specialiteIds = await SpecialiteInfirmier.find({ userId: user._id });
        const languesIds = await LangueInfirmier.find({ userId: user._id });
        const soinsIds = await InfirmierSoins.find({ id_infirmiere: user._id });

        const specialitePromises = specialiteIds.map(async (specialite) => {
            const specialiteDetails = await Specialite.findById(specialite.specialite);
            return specialiteDetails ? specialiteDetails.nom_specialite : null;
        });

        const languesPromises = languesIds.map(async (langue) => {
            const langueDetails = await Langue.findById(langue.languesparlees);
            return langueDetails ? langueDetails.langue : null;
        });

        const soinsPromises = soinsIds.map(async (soin) => {
            const soinDetails = await Soins.findById(soin.nom_soin);
            return soinDetails ? soinDetails.nom_soin : null;
        });

        const specialiteNames = await Promise.all(specialitePromises);
        const languesNames = await Promise.all(languesPromises);
        const soinsNames = await Promise.all(soinsPromises);

        const infirmierRep = {
            langue_parlee: languesNames.filter(Boolean),
            specialite: specialiteNames.filter(Boolean),
            soins: soinsNames.filter(Boolean),
        };

        res.json(infirmierRep);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error from server' });
    }
};


// exports.getInfirmierById = async (req, res) => {

//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const specialite = await SpecialiteInfirmier.find({ userId: user._id });
//         const languesparlees = await LangueInfirmier.find({ userId: user._id });
//         const nom_soin = await InfirmierSoins.find({ id_infirmiere: user._id });
//         const infirmierRep = {
//             langue_parlee: languesparlees.length > 0 ? languesparlees.map((langue) => langue.languesparlees) : [],
//             specialite: specialite.length > 0 ? specialite.map((specialite) => specialite.specialite) : [],
//             soins: nom_soin.length > 0 ? nom_soin.map((soin) => soin.nom_soin
//             ) : [],
//         };
//         res.json(infirmierRep);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error from server' });
//     }
// };

// exports.getInfirmierById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         console.log(user);

//         const specialite = await SpecialiteInfirmier.find({ userId: user._id });
//         const specialitesWithName = await Promise.all(specialite.map(async (specialite) => {
//             return await Specialite.findById(specialite);
//         }))
//         console.log(specialitesWithName)
//         const languesparlees = await LangueInfirmier.find({ userId: user._id });
//         const languesWithName = await Promise.all(languesparlees.map(async (langue) => {
//             return await Langue.findById(langue)
//         }))
//         console.log(languesWithName)
//         const nom_soin = await InfirmierSoins.find({ id_infirmiere: user._id });
//         const soinWithName = await Promise.all(nom_soin.map(async (s) => {
//             return await Soins.findById(s);
//         }))
//         console.log(soinWithName)
//         const infirmierRep = {
//             specialite: specialitesWithName.length > 0 ? specialitesWithName.map((specialite) => specialite.nom_specialite) : [],
//             langue_parlee: languesWithName.length > 0 ? languesWithName.map((langue) => langue.langue) : [],
//             soins: soinWithName.length > 0 ? soinWithName.map((soin) => soin.nom_soin) : [],
//         };

//         res.json(infirmierRep);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error from server' });
//     }
// };


exports.getInfirmiersByFilterVilleSpec = async (req, res) => {
    try {
        const { ville, specialite } = req.body;
        req.body
        let filter = { role: 'infirmier' };

        if (ville) {
            const userVille = await Ville.findOne({ nom_ville: ville });
            filter.ville = userVille._id;
        }

        if (specialite) {
            const specialiteId = await Specialite.findOne({ nom_specialite: specialite });
            if (specialiteId._id) {

                const specialiteFound = await SpecialiteInfirmier.find({ specialite: specialiteId._id });
                const infirmierIds = specialiteFound.map(infirmier => infirmier.userId);
                filter._id = { $in: infirmierIds };

            } else {
                res.status(404).json([]);
                return;
            }
        }

        const infirmiers = await User.find(filter);
        res.status(200).json(infirmiers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error from server' });
    }
};




