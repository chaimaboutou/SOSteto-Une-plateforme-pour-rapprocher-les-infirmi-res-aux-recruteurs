const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController');

/**
 * @openapi
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     description: Retrieve a list of all roles.
 *     tags:
 *       - Roles
 *     responses:
 *       '200':
 *         description: A list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'  
 *       '404':
 *         description: Roles not found
 */
router.get('/api/roles', RoleController.getAllRoles);


/**
 * @openapi
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     description: Create a new role with the provided role.
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'  
 *     responses:
 *       '201':
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'  
 *       '404':
 *         description: Role creation failed
 */
router.post('/api/roles', RoleController.createRole);

module.exports = router