
const express = require('express');
const contactsController = require('../controllers/contacts.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/contacts', router);

    /**
     * @swagger
     * /api/v1/contacts:
     *  get:
     *    summary: Get contacts by filter
     *    description: Get contacts by filter
     *    parameters:
     *      - in: query
     *        name: favorite
     *        schema:
     *          type: boolean  
     *        description: Filter by favorite status
     *      - in: query
     *        name: favorite
     *        schema:
     *          type: string 
     *        description: Get contacts contact name
     *    tags:
     *      - contacts
     *    responses:
     *      200:
     *        description: A list of contacts
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                status:
     *                  type: string
     *                  description: The response status
     *                  enum: [success]
     *                data:
     *                  type: object
     *                  properties:
     *                    contacts:
     *                      type: array
     *                      items:
     *                        $ref: '#/components/schemas/Contact'
    */

    router.get('/', contactsController.getContactsByFilter);
    router.post('/', contactsController.createContact);

    /**
     * @swagger
     * /api/v1/contacts:
     *   delete:
     *     summary: Delete all contacts
     *     description: Delete all contacts
     *     tags:
     *       - contacts
     *     responses:
     *       200:
     *         description:: All contacts deleted
     *         $ref: '#/components/responses/200NoData'
     */
    router.delete('/', contactsController.deleteAllContacts);
    router.all('/', methodNotAllowed);

    /**
     * @swagger
     * /api/v1/contacts/{id}:
     *  get:
     *    summary: Get contacts by ID
     *    description: Get contacts by ID
     *    parameters:
     *      - $ref: '#/components/parameters/contactIdParam'
     *    tags:
     *      - contacts
     *    responses:
     *      200:
     *        description: A contact
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                status:
     *                  type: string
     *                  description: The response status
     *                  enum: [success]
     *                data:
     *                  type: object
     *                  properties:
     *                    contacts:
     *                      $ref: '#/components/schemas/Contact'
    */
    router.get('/:id', contactsController.getContact);

    /**
     * @swagger
     * /api/v1/contacts/{id}:
     *  put:
     *    summary: Update contacts by ID
     *    description: Get contacts by ID
     *    parameters:
     *      - $ref: '#/components/parameters/contactIdParam'
     *    requestBody:
     *      required: true
     *      content:
     *        multipart/form-data:
     *          schema:
     *            $ref: '#/components/schemas/Contact'
     *    tags:
     *      - contacts
     *    responses:
     *      200:
     *        description: A update contact
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                status:
     *                  type: string
     *                  description: The response status
     *                  enum: [success]
     *                data:
     *                  type: object
     *                  properties:
     *                    contacts:
     *                      $ref: '#/components/schemas/Contact'
    */
    router.put('/:id', contactsController.updateContact);

    /**
     * @swagger
     * /api/v1/contacts/{id}:
     *   delete:
     *     summary: Delete contact by ID
     *     description: Delete contact by ID
     *     parameters:
     *       - $ref: '#/components/parameters/ContactIdParam'
     *     tags:
     *       - contacts
     *     responses:
     *       200:
     *         description:: Contact deleted 
     *         $ref: '#/components/responses/200NoData'
     */
    router.delete('/:id', contactsController.deleteContact);
    router.all('/:id', methodNotAllowed);
}