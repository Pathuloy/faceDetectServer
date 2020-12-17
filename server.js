const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const signin = require('./controllers/signin');


const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'T4steg00d',
    database: 'smart-brain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {res.send('success')});



app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db)});
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, bcrypt, db)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res, db)});

app.listen(3000, () => {
  console.log('app is running on port 3000')
});