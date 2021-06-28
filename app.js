const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const app = express();
app.use(helmet())
app.use(bodyParser.json());

// Json Body Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

// Bring in the routes
app.use(require('./routes'));

// Swagger Open Api Options Definition 
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Employee Records API",
        description: "This is the swagger documentation for the Employee Records API",
        contact: {
          name: "Express"
        },
        servers: [ 
            {
                url:"http://localhost:4000", 
                description: "Development server"
            } 
        ]
      }
    },
    
    apis: ['./routes/*.js']
  };
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
module.exports = app;