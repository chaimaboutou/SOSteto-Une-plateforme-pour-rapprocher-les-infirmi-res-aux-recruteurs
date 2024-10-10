const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


router.get('/api/users/count', UserController.countUsers)



/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'  
 *       '404':
 *         description: Users not found
 */
router.get('/api/users', UserController.getAllUsers);

/**
 * @openapi
 * /api/users/{userId}:
 *   get:
 *     summary: Get a user of id userId
 *     description: Retrieve a user of id userId.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: user of id userId
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/UserOutput'  
 *       '404':
 *         description: User not found
 */
router.get('/api/users/:userId', UserController.getUserById);


/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get a user by role
 *     description: Retrieve a user by role
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: role
 *         required: true
 *         description: The role of the user to enter
 *         schema:
 *           type: string
 *           enum: [recruteur, infirmier]
 *     responses:
 *       '200':
 *         description: user of role either recruteur or infirmier
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'  
 *       '404':
 *         description: Users not found
 */
router.get('/api/users', UserController.getUserByRole);
router.get('/api/users/:userId/demandes', UserController.getAllDemandesFromUser);

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'  
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'  
 *       '404':
 *         description: User creation failed
 */
router.post('/api/users', UserController.createUser);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user with the provided details.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserOutput'  
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '404':
 *         description: User not found
 */
router.put('/api/users/:id', UserController.updateUser);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Update a user
 *     description: Update a user with the provided details.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 */
router.delete('/api/users/:id', UserController.deleteUser);

/** POST Methods */
/**
 * @openapi
 * '/api/users/register':
 *  post:
 *     tags:
 *     - Users
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput' 
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */


router.post('/api/users/register', UserController.register);

/**
 * @openapi
 * '/api/users/login':
 *  post:
 *     tags:
 *     - Users
 *     summary: Login as a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin' 
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

router.post('/api/users/login', UserController.login);

/**
 * @openapi
 * '/api/users/userdata':
 *  post:
 *     tags:
 *     - Users
 *     summary: get data from a valid token
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserData' 
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

router.post('/api/users/userdata', UserController.userdatafromtoken);





module.exports = router

