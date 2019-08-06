'use strict'

const Sequelize = require('sequelize');
const db = require('../../config/database');

const Project = db.define('gig', {
    title: {
        type: Sequelize.STRING,
        required: true,
        max: 20
    },
    description: {
        type: Sequelize.STRING,
        max: 200
    },
    createdAt: {
        type: Sequelize.DATE,
        required: true
    },
    updatedAt: {
        type: Sequelize.DATE,
        require: true
    }
});

module.exports = Project;