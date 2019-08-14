'use strict'

const Project = require('../models/project');
const Task = require('../models/task');

module.exports = {
    addProject: async (req, res, next) => {
        try {
            const { title, description } = req.value.body;
            let newProject = {};

            newProject = new Project({
                title,
                description,
                createdAt: new Date()
            });

            await newProject.save();

            res.status(200).send(newProject);
        } catch (error) {
            res.status(400).send({ message: 'Internal server error.' });
        }
    },

    getAllProjects: async (req, res, next) => {
        try {
            await Project.findAll({}, async (err, project) => {
                if (err) {
                    return res.status(400).send({ error: err.message });
                }
                let projectsMap = {};
                project.forEach(project => {
                    projectsMap[project._id] = project;
                });
                res.status(200).send(projectsMap);
            });
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    changeTitle: async (req, res, next) => {
        try {
            const { projectId, title } = req.body;
            await Project.findOneAndUpdate(
                { _id: projectId },
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
            const { projectId, description } = req.body;
            await Project.findOneAndUpdate(
                { _id: projectId },
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

    getProject: async (req, res, next) => {
        try {
            let projectsMap = {};
            await Project.find(
                {
                    _id: req.params.projectId
                },
                async (err, project) => {
                    if (err) {
                        return res.status(400).send({ error: err.message });
                    }

                    project.forEach(project => {
                        projectsMap[project._id] = project
                    });
                }
            );
            res.status(200).send(projectsMap);
        } catch (error) {
            res.status(400).send({ error: error });
        }
    },

    deleteProject: async (req, res, next) => {
        try {
            await Project.findOneAndDelete(
                {
                    _id: req.params.projectId
                });

            await Task.deleteMany(
                {
                    projectId: req.params.projectId
                }
            );
            res.status(200).send();
        } catch (error) {
            res.status(400).send({ error: error });
        }
    }
};