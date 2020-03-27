const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi} = require('celebrate')

const connection = require('./database/connection')

const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/ProfileController')
const sessionController = require('./controllers/SessionController')

routes.post('/sessions', sessionController.create)

routes.post("/ongs", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })



}), ongController.create);


routes.get("/ongs", ongController.list);

routes.post("/incidents", incidentController.create);

routes.get("/incidents", celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), incidentController.list);


routes.delete("/incidents/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), incidentController.delete);

routes.get("/profile", celebrate({
    [Segments.HEADERS]: Joi.object({
        authrozation: Joi.string().required()
    }).unknown()
}), profileController.list)

module.exports  = routes;