const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cores = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'test',
        database : 'datacom'
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cores());

const saltRounds = 10;

let adres = '01101101';


app.get('/', (req, res) =>{
    res.json(db.users);
});

app.post("/signin", (req, res) =>{
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data =>{
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid){
                db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user =>{
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            }else{
                res.status(400).json("wrong credentials")
            }
        })
        .catch(err => res.status(400).json("wrong credentials"))
});

app.post("/register", (req, res) =>{
    const { email, name, password} = req.body;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            db.transaction(trx =>{
                trx.insert({
                    hash: hash,
                    email: email,
                })
                    .into('login')
                    .returning('email')
                    .then(loginEmail =>{
                        return trx('users').returning('*')
                            .insert({
                                email: loginEmail[0],
                                name: name,
                                joined: new Date()
                            })
                            .then(user => {
                                res.json(user[0])
                            })
                    }).then(trx.commit)
                    .catch(trx.rollback)
            }).catch(err => res.status(400).json("unable to register"));
        });
    });
});

app.get('/profile/:id', (req, res) =>{
    const {id} = req.params;
    db.select('*').from('users').where({id}).then(user => {
        if(user.length){
            res.json(user[0])
        }else{
            res.status(400).json("user not found")
        }

    }).catch(err => res.status(400).json("user not found"));
});

app.get("/arduino", (req, res) =>{
    console.log(req.query.temp);
    res.status(200).json("ok");
});

app.get("/adres", (req, res) =>{
    res.status(200).json(adres);
});

app.listen(3000, "192.168.4.2", ()=>{
    console.log('app is running on port 3000');
});