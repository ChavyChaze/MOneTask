'use strict'

const Sequelize = require('sequelize');
const db = require('../../config/database');

const Task = db.define('task', {
    projectId: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = Task;