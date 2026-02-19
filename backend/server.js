require('dotenv').config();

const express = require('express')
const helmet = require('helmet')
const routes = require('./routes.js')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:'Muitas requisições'
});


const app = express();
const port = process.env.PORT || 3000;


//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(helmet());
app.use(bodyParser.json({limit: '100kb', extended: true}));

app.use('/api', limiter, routes)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//Iniciação do servidor
app.listen(port, () =>{
    console.log('Servidor rodando na porta', port);
})