const express = require('express');
const router = express.Router();
const InfirmierController = require('../controllers/infirmierController');




router.post('/api/infirmiers/filtreByVilleSpe', InfirmierController.getInfirmiersByFilterVilleSpec);

/**
 * @openapi
 * /api/infirmiers:
 *   get:
 *     summary: Get all infirmiers
 *     description: Retrieve all infirmiers
 *     tags:
 *       - Infirmiers
 *     responses:
 *       '200':
 *         description: successfully infirmiers
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/UserOutput'  
 *       '404':
 *         description: Infirmiers not found
 */
router.get('/api/infirmiers', InfirmierController.getAllInfirmiers);
router.get('/api/infirmiers/:id', InfirmierController.getInfirmierById);
router.post('/api/infirmiers', InfirmierController.createInfirmier);









module.exports = router


