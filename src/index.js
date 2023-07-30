const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/log');

const app = express();

//mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true});
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
.then( () => console.log("MongoDB connected.."))
.catch(err => console.log(err));

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN ,
}));

//Body Parser
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({
        message: 'Hello World',
    })
})

app.use('/api/logs',logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})