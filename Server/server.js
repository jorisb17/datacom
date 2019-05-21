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

const data = ({
    modules: [
        {
            id: '1',
            name: 'Module 1',
            data: [
                {name: '0:00', temp: 20, licht: 10, sensor: 30},
                {name: '0:20', temp: 22, licht: 8, sensor: 10},
                {name: '0:25', temp: 25, licht: 12, sensor: 25},
                {name: '0:40', temp: 18, licht: 9, sensor: 15},
                {name: '0:54', temp: 30, licht: 15, sensor: 18},
                {name: '1:40', temp: 31, licht: 16, sensor: 33},
                {name: '1:50', temp: 34, licht: 20, sensor: 20},
            ]
        },
        {
            id: '2',
            name: "Module 2",
            data: [
                {name: '0:00', temp: 30, licht: 9, sensor: 30},
                {name: '0:20', temp: 22, licht: 20, sensor: 44},
                {name: '0:25', temp: 15, licht: 40, sensor: 22},
                {name: '0:40', temp: 12, licht: 2, sensor: 12},
                {name: '0:54', temp: 33, licht: 15, sensor: 12},
                {name: '1:40', temp: 32, licht: 22, sensor: 32},
                {name: '1:50', temp: 18, licht: 21, sensor: 22},
            ]
        },
        {
            id: '3',
            name: "Module 3",
            data: [
                {name: '0:00', temp: 30, licht: 9, sensor: 30},
                {name: '0:20', temp: 22, licht: 20, sensor: 44},
                {name: '0:25', temp: 15, licht: 40, sensor: 22},
                {name: '0:40', temp: 12, licht: 2, sensor: 12},
                {name: '0:54', temp: 33, licht: 15, sensor: 12},
                {name: '1:40', temp: 32, licht: 22, sensor: 32},
                {name: '1:50', temp: 18, licht: 21, sensor: 22},
            ]
        },
        {
            id: '4',
            name: "Module 4",
            data: [
                {name: '0:00', temp: 30, licht: 9, sensor: 30},
                {name: '0:20', temp: 22, licht: 20, sensor: 44},
                {name: '0:25', temp: 15, licht: 40, sensor: 22},
                {name: '0:40', temp: 12, licht: 2, sensor: 12},
                {name: '0:54', temp: 33, licht: 15, sensor: 12},
                {name: '1:40', temp: 32, licht: 22, sensor: 32},
                {name: '1:50', temp: 18, licht: 21, sensor: 22},
            ]
        }
    ]
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

app.get('/module/:id', (req,res) =>{
    const {id} = req.params;
    let found = false;
    data.modules.forEach(module =>{
        if(module.id === id){
            found = true;
            return setTimeout((function() {res.send(module)}), 1000);
        }
    });
    if(!found){
        return res.status(400).json("no such article")
    }
});

app.get('/modules', (req, res) =>{
    return setTimeout((function() {res.send(data.modules)}), 1000)
})

app.get("/arduino", (req, res) =>{
    console.log(req.query.temp);
    res.status(200).json("ok");
});

app.get("/adres", (req, res) =>{
    res.status(200).json(adres);
});

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
});