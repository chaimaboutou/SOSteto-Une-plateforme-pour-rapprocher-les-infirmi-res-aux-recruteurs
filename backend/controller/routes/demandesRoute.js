const express = require('express');
const router = express.Router();
const DemandeController = require('../controllers/demandesController');

router.get('/api/demandes/:demandeId', DemandeController.getDemandeById);
router.get('/api/demandes/count', DemandeController.countDemandes)
router.get('/api/demandes/:id/soins', DemandeController.getSoinsForDemande);
router.post('/api/demandes', DemandeController.createADemande);
router.post('/api/demandesoins/:id', DemandeController.createDemandeSoins);





module.exports = router