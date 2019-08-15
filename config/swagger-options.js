module.exports = {
    swaggerDefinition: {
        info: {
            title: 'Project_Name API',
            description: 'The goal of the Project_Name is to become the No 1 source of personal recommendations and to build the most efficient and intelligent recommendation system in the world.',            
            version: '1.0.0',
        },
        host: 'localhost:8080',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};