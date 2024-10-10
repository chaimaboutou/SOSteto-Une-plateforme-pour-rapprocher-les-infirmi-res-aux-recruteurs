require('dotenv').config();
const express = require('express');
const cors = require('cors');
// connect to database
const connectToDatabase = require('./Database');
// model imports 
const models = require('./model/schema');
const morgan = require('morgan')

const functions = require("firebase-functions");

// route imports
const userRoutes = require('./controller/routes/userRoute');
const villeRoutes = require('./controller/routes/villeRoute');
const quartierRoutes = require('./controller/routes/quartierRoute');
const imageRoutes = require('./controller/routes/imageRoute')
const roleRoutes = require('./controller/routes/roleRoute')
const infirmierRoutes = require('./controller/routes/infirmierRoute')
const SpecialiteRoute = require('./controller/routes/specialiteRoute')
const soinRoutes = require('./controller/routes/soinRoute');
const DemandeRoute = require('./controller/routes/demandesRoute')
const swaggerDocs = require('./swagger/swagger');
const bodyParser = require('body-parser');
const app = express();


connectToDatabase();

for (const modelName in models) {
    if (models.hasOwnProperty(modelName)) {
        const Model = models[modelName];
        Model.syncIndexes();
    }
}
app.use(bodyParser.json());

app.use(cors({

}));

app.use('/', userRoutes);
app.use('/', villeRoutes);
app.use('/', quartierRoutes);
app.use('/', imageRoutes);
app.use('/', roleRoutes);
app.use('/', infirmierRoutes)
app.use('/', SpecialiteRoute)
app.use('/', DemandeRoute)
app.use('/', soinRoutes);
// app.use('/api/recruteurs', recruteurRoutes)


app.use(morgan('combined'))

const port = 3000

app.listen(port, () => {
    console.log(`App running on port ${port}`)
    swaggerDocs(app, port)
})

exports.api = functions.https.onRequest(app)