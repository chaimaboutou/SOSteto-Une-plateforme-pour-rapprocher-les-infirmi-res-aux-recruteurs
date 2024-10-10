const express = require('express');
const SpecialiteRouter = express.Router();
const SpecialiteController = require('../controllers/specialiteController');

/**
 * @openapi
 * /api/specialites:
 *   get:
 *     summary: Get all specialties
 *     description: Retrieve a list of all specialties.
 *     tags:
 *       - Specialties
 *     responses:
 *       '200':
 *         description: A list of specialties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Specialite'  
 *       '404':
 *         description: There are no specialties
 */
SpecialiteRouter.get('/api/specialites', SpecialiteController.getSpecialite);

/**
 * @openapi
 * /api/specialites:
 *   post:
 *     summary: Create a new specialty
 *     description: Create a new specialty with the provided details.
 *     tags:
 *       - Specialties
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Specialite'  
 *     responses:
 *       '201':
 *         description: Specialty created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Specialite'  
 *       '404':
 *         description: Specialty creation failed
 */
SpecialiteRouter.post('/api/specialites', SpecialiteController.createSpecialite);

/**
 * @openapi
 * /api/specialites/{id}:
 *   put:
 *     summary: Update a specialty
 *     description: Update a specialty with the provided details.
 *     tags:
 *       - Specialties
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the specialty to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Specialite'  
 *     responses:
 *       '200':
 *         description: Specialty updated successfully
 *       '404':
 *         description: Specialty not found
 */
SpecialiteRouter.put('/api/specialites/:id', SpecialiteController.updateSpecialite);

/**
 * @openapi
 * /api/specialites/{id}:
 *   delete:
 *     summary: Delete a specialty
 *     description: Delete a specialty with the provided ID.
 *     tags:
 *       - Specialties
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the specialty to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Specialty deleted successfully
 *       '404':
 *         description: Specialty not found
 */
SpecialiteRouter.delete('/api/specialites/:id', SpecialiteController.deleteSpecialite);

module.exports = SpecialiteRouter;
