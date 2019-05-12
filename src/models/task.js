'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    projectId: {
        type: String,
        required: true
    },
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

const Task = mongoose.model('task', taskSchema);

module.exports = Task;