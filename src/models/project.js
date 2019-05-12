'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: 20
    },
    description: {
        type: String,
        max: 200
    },
    createdAt: {
        type:Date,
        required: true
    },
    updatedAt: {
        type: Date,
        require: true
    }
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;