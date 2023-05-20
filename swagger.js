const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Entertainment API',
        description: 'API for Entertainment'
    },
    host: 'entertainment-entries.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);