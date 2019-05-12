'use strict'

const router = require('express-promise-router')();

const { validateBody, schemas } = require('../helpers/routeHelpers');
const ProjectController = require('../controllers/projects');


router.route('/add')
    .post(validateBody(schemas.projectSchema), ProjectController.addProject);

router.route('/get/all')
    .get(ProjectController.getAllProjects);

router.route('/change/title')
    .post(ProjectController.changeTitle);

router.route('/change/description')
    .post(ProjectController.changeDescription);

router.route('/get/:projectId')
    .get(ProjectController.getProject);

router.route('/delete/:projectId')
    .get(ProjectController.deleteProject);

module.exports = router;