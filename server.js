const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const sqldatabase = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      sslmode: require,
      ssl: {
        rejectUnauthorized: false,
      }, 
    },
  });

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, sqldatabase, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, sqldatabase, bcrypt) } )
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, sqldatabase) })
app.put('/image', (req, res) => { image.handleImage(req, res, sqldatabase) })
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => { console.log(`app is running on port ${process.env.PORT}`) })

