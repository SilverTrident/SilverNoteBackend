const ControllerTask = require('../controller/ControllerTask');
const MiddlewareTaskValidation = require('../middlewares/MiddlewareTaskValidation');
const express = require('express');
const { Router } = require('express');
const routes = express.Router();

routes.post('/',MiddlewareTaskValidation,ControllerTask.created);
routes.put('/:id',MiddlewareTaskValidation,ControllerTask.update);
routes.put('/:id/:done',ControllerTask.done);
routes.get('/:id', ControllerTask.listOne);
routes.delete('/:id', ControllerTask.delete);

routes.get('/filter/all/:macaddress',ControllerTask.listAll);
routes.get('/filter/late/:macaddress', ControllerTask.listLate);
routes.get('/filter/today/:macaddress', ControllerTask.listToDay);
routes.get('/filter/week/:macaddress', ControllerTask.listWeek);
routes.get('/filter/month/:macaddress', ControllerTask.listMonth);
routes.get('/filter/year/:macaddress', ControllerTask.listYear);



module.exports = routes;