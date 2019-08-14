'use strict'

const Task = require('../models/task');
const Project = require('../models/project');

module.exports = {
    addTask: async (req, res, next) => {
        try {
            const { projectId, title, description } = req.body;

            Project.findByPk(projectId)
                .then(async project => {
                    if (!project) {
                        return res.status(400).send([{ data: 'Project not exists.' }]);
                    }

                    await Task.create({
                        projectId,
                        title,
                        description,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })
                        .then(project => res.status(200).send(project));
                })


        } catch (error) {
            res.status(400).send({ message: 'Internal server error.' });
        }
    },

    getAllTasks: async (req, res, next) => {
        try {
            await Task.findAll({ raw: true })
                .then(task => task.length > 0 ? res.status(200).send(task) : res.status(200).send([{ data: 'No data' }]));
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    changeTitle: async (req, res, next) => {
        try {
            const { taskId, title } = req.body;
            await Task.findByPk(taskId)
                .then(task => {
                    task.update({
                        title,
                        updatedAt: new Date()
                    })
                        .then(task => res.status(200).send(task));
                });
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    changeDescription: async (req, res, next) => {
        try {
            const { taskId, description } = req.body;
            await Task.findByPk(taskId)
                .then(task => {
                    task.update({
                        description,
                        updatedAt: new Date()
                    })
                        .then(task => res.status(200).send(task));
                });
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    getTask: async (req, res, next) => {
        try {
            await Project.findByPk(req.params.taskId)
                .then(task => {
                    if (!task) {
                        res.status(400).send([{ data: 'Task not exists.' }]);
                    } else {
                        res.status(200).send(task);
                    }
                });
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    deleteTask: async (req, res, next) => {
        try {
            await Project.findByPk(req.params.taskId)
                .then(task => {
                    if (!task) {
                        res.status(400).send([{ data: 'Task not exists.' }]);
                    } else {
                        task.destroy();
                        res.status(200).send([{ data: 'Task deleted.' }]);
                    }
                });
        } catch (error) {
            res.status(400).send({ error: error });
        }
    }
};