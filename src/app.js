const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'), { encoding: 'utf8'});
const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), { encoding: 'utf8'});
const accounts = JSON.parse(accountData);
const users = JSON.parse(userData);
console.log(users);
app.get('/', (req, res) => res.render('index', {title: 'Account Summary', accounts}));
app.get('/profile', (req, res) => res.render('profile', {user: users[0]}));
app.get('/savings', (req, res) => res.render('account', {account: accounts.savings}));
app.get('/checking', (req, res) => res.render('account', {account: accounts.checking}));
app.get('/credit', (req, res) => res.render('account', {account: accounts.credit}));

app.listen(3000, () => console.log('PS Project Running on port 3000!'));