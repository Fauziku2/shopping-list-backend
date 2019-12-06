let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let logger = require('morgan');
let cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

let app = express();

let route = require('./routes/routes.js');

mongoose.connect('mongodb://localhost:27017/shoppinglist', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
});

mongoose.connection.on('error', (err) => {
    console.log(err)
});

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Shopping-list API',
            description: 'Shopping-list API Information',
            contact: {
                name: 'Amazing Developer'
            },
            servers: [{
                url: 'http://localhost:3000',
                description: 'Development server'
            }]
        },
    },
    apis: ['.routes/routes.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(logger('dev'));

app.use('/api', route);

app.get('/', (req, res) => {
    res.send('Roger am here dude')
});

app.listen(PORT, () => {
    console.log('Server is listening at Port:' + PORT)
});
