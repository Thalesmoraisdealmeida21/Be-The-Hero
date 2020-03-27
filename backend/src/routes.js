const express = require('express');
const routes = express.Router();

const connection = require('./database/connection')

const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/ProfileController')
const sessionController = require('./controllers/SessionController')

routes.post('/sessions', sessionController.create)

routes.post("/ongs", ongController.create);
routes.get("/ongs", ongController.list);

routes.post("/incidents", incidentController.create);
routes.get("/incidents", incidentController.list);
routes.delete("/incidents/:id", incidentController.delete);

routes.get("/profile", profileController.list);
module.exports  = routes;