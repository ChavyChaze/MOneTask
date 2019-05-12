'use strict'

const Task = require('../models/task');

module.exports = {
    addTask: async (req, res, next) => {
        try {
            const { projectId, title, description } = req.value.body;
            let newTask = {};

            newTask = new Task({
                projectId,
                title,
                description,
                createdAt: new Date()
            });

            await newTask.save();

            res.status(200).send(newTask);
        } catch (error) {
            res.status(400).send({ message: 'Internal server error.' });
        }
    },

    getAllTasks: async (req, res, next) => {
        try {
            await Task.find({}, async (err, task) => {
                if (err) {
                    return res.status(400).send({ error: err.message });
                }
                let tasksMap = {};
                task.forEach(task => {
                    tasksMap[task._id] = task;
                });
                res.status(200).send(tasksMap);
            });
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    changeTitle: async (req, res, next) => {
        try {
            const { taskId, title } = req.body;
            await Task.findOneAndUpdate(
                { _id: taskId },
                {
                    $set: {
                        title,
                        updatedAt: new Date()
                    }
                },
                {
                    returnOriginal: false
                },
                (err, result) => {
                    if (err) res.status(400).send();
                }
            );
            res.status(200).send();
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    changeDescription: async (req, res, next) => {
        try {
            const { taskId, description } = req.body;
            await Task.findOneAndUpdate(
                { _id: taskId },
                {
                    $set: {
                        description,
                        updatedAt: new Date()
                    }
                },
                {
                    returnOriginal: false
                },
                (err, result) => {
                    if (err) res.status(400).send();
                }
            );
            res.status(200).send();
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    getTask: async (req, res, next) => {
        try {
            let tasksMap = {};
            await Task.find(
                {
                    _id: req.params.taskId
                },
                async (err, task) => {
                    if (err) {
                        return res.status(400).send({ error: err.message });
                    }

                    task.forEach(task => {
                        tasksMap[task._id] = task
                    });
                }
            );
            res.status(200).send(tasksMap);
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    deleteTask: async (req, res, next) => {
        try {
            await Task.findOneAndDelete(
                {
                    _id: req.params.taskId
                });

            res.status(200).send();
        } catch (error) {
            res.status(400).send({ error: error });
        }
    }
};