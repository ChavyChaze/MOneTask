'use strict'

const Sequelize = require('sequelize');
const db = require('../../config/database');

const Project = db.define('Project', {
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

module.exports = Project;