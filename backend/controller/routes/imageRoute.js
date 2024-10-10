const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');


/**
 * @openapi
 * '/api/image/users/{userId}':
 *  get:
 *     summary: 
 *     description: Retrieve image of recruteur
 *     tags:
 *       - Image of User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The id of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: the user's image
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               items:
 *                 $ref: '#/components/schemas/Image'
 *       '404':
 *         description: Image not found for the user
 */
router.get('/api/image/users/:userId', imageController.getImageByIdUser);

module.exports = router;
