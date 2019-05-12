'use strict'

const router = require('express-promise-router')();

const { validateBody, schemas } = require('../helpers/routeHelpers');
const TaskController = require('../controllers/tasks');


router.route('/add')
    .post(validateBody(schemas.taskSchema), TaskController.addTask);

router.route('/get/all')
    .get(TaskController.getAllTasks);

router.route('/change/title')
    .post(TaskController.changeTitle);

router.route('/change/description')
    .post(TaskController.changeDescription);

router.route('/get/:taskId')
    .get(TaskController.getTask);

router.route('/delete/:taskId')
    .get(TaskController.deleteTask);

module.exports = router;