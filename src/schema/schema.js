'use strict'

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
} = require('graphql');

const {
    GraphQLDate
} = require('graphql-iso-date');

const ProjectType = new GraphQLObjectType({
    name: 'Project',

    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        createdAt: {
            type: GraphQLDate,
            resolve: () => new Date()
        },
        updatedAt: {
            type: GraphQLDate,
            resolve: () => new Date()
        }
    })
});

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        projectId: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.findById(parent.id);
            }
        },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        createdAt: {
            type: GraphQLDate,
            resolve: () => new Date()
        },
        updatedAt: {
            type: GraphQLDate,
            resolve: () => new Date()
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        },
        task: {
            type: TaskType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Task.findById(args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find({});
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let project = new Project({
                    title: args.title,
                    description: args.description
                });
                return project.save();
            }
        },
        addTask: {
            type: TaskType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                projectId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let task = new Task({
                    title: args.title,
                    description: args.genre,
                    projectId: args.projectId
                });
                return task.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});