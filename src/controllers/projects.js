'use strict'

const Project = require('../models/project');
const Task = require('../models/task');

module.exports = {
    addProject: async (req, res, next) => {
        try {
            const { title, description } = req.body;

            await Project.create({
                title,
                description,
                createdAt: new Date(),
                updatedAt: new Date()
            })
                .then(project => res.status(200).send(project));
        } catch (error) {
            res.status(400).send({ message: 'Internal server error. ' + error });
        }
    },

    getAllProjects: async (req, res, next) => {
        try {
            await Project.findAll({ raw: true })
                .then(project => project.length > 0 ? res.status(200).send(project) : res.status(200).send([{ data: 'No data' }]));
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    changeTitle: async (req, res, next) => {
        try {
            const { projectId, title } = req.body;
            await Project.findByPk(projectId)
                .then(project => {
                    project.update({
                        title,
                        updatedAt: new Date()
                    })
                        .then(project => res.status(200).send(project));
                });
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    changeDescription: async (req, res, next) => {
        try {
            const { projectId, description } = req.body;
            await Project.findByPk(projectId)
                .then(project => {
                    project.update({
                        description,
                        updatedAt: new Date()
                    })
                        .then(project => res.status(200).send(project));
                });
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    getProject: async (req, res, next) => {
        try {
            await Project.findByPk(req.params.projectId)
                .then(project => {
                    if (!project) {
                        res.status(400).send([{ data: 'Project not exists.' }]);
                    } else {
                        res.status(200);
                    }
                });
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    deleteProject: async (req, res, next) => {
        try {
            await Project.findByPk(req.params.projectId)
                .then(project => {
                    if (!project) {
                        res.status(400).send([{ data: 'Project not exists.' }]);
                    } else {
                        project.destroy();
                        res.status(200).send([{ data: 'Project deleted.' }]);
                    }
                });
        } catch (error) {
            res.status(400).send({ error: error });
        }
    }
};