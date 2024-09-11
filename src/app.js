/*global module, require */
const express = require('express');
const cors = require('cors');

const JSend = require('./jsend');
const contactsRouter = require('./routes/contacts.router');
const {
    resourceNotFound,
    handleError,
} = require('./controllers/errors.controller')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json(JSend.success());
});

contactsRouter.setup(app);
// Handle 404 response
app.use(resourceNotFound);

//Default error-handling middleware last, after other app.use() and router calls
app.use(handleError);

module.exports = app;