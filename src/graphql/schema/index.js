const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Project {
    id: ID!
    title: String!
    description: String
    createdAt: String!
    updatedAt: String!
}

type Task {
    id: ID!
    projectId: ID!
    title: String!
    description: String
    createdAt: String!
    updatedAt: String!
}

input TaskInput {
    projectId: String!
    title: String!
    description: String!
}

input ProjectInput {
    title: String!
    description: String
}

type RootQuery {
    tasks: [Task!]!
}

type RootMutation {
    createTask(taskInput: TaskInput): Task
    createProject(projectInput: ProjectInput): Project
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);