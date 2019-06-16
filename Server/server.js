const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cores = require('cors');
const knex = require('knex');
const util = require('util');
const fs = require('fs');

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

app.get("/arduino", (req, res) =>{
    const {mintemp, gemtemp, maxtemp, minlicht, maxlicht, gemlicht, minsensor, maxsensor, gemsensor, moduleID, tijd} = req.query;
    const mintemparray = parseFloat(mintemp);
    const maxtemparray = parseFloat(maxtemp);
    const gemtemparray = parseFloat(gemtemp);
    const minlichtarray = parseFloat(minlicht);
    const maxlichtarray = parseFloat(maxlicht);
    const gemlichtarray = parseFloat(gemlicht);
    const minsensorarray = parseFloat(minsensor);
    const maxsensorarray = parseFloat(maxsensor);
    const gemsensorarray = parseFloat(gemsensor);
    let found = false;
    fs.readFile('./data/modules.json', 'utf8', (err, jsonString) =>{
        if(err){
            res.status(400).json("Error");
        }
        try{
            const modules = JSON.parse(jsonString);
            modules.modules.forEach(module =>{
                if(module.moduleId === moduleID){
                    found = true;
                    module.mintemp.push(mintemparray);
                    module.gemtemp.push(gemtemparray);
                    module.maxtemp.push(maxtemparray);
                    module.minlicht.push(minlichtarray);
                    module.gemlicht.push(gemlichtarray);
                    module.maxlicht.push(maxlichtarray);
                    module.minsensor.push(minsensorarray);
                    module.gemsensor.push(gemsensorarray);
                    module.maxsensor.push(maxsensorarray);
                    module.tijd.push(tijd);
                }
            });
            if(found){
                fs.writeFile('./data/modules.json', JSON.stringify(modules), (err) =>{
                    if(err){
                        res.status(400).send(err)
                    }
                    res.send("ok");
                })
            }else{
                modules.modules.push({
                    moduleId: moduleID,
                    tijd: [tijd],
                    mintemp: [mintemparray],
                    gemtemp: [gemtemparray],
                    maxtemp: [maxtemparray],
                    minlicht: [minlichtarray],
                    gemlicht: [gemlichtarray],
                    maxlicht: [maxlichtarray],
                    minsensor: [minsensorarray],
                    gemsensor: [gemsensorarray],
                    maxsensor: [maxsensorarray],
                });
                fs.writeFile('./data/modules.json', JSON.stringify(modules), (err) =>{
                    if(err){
                        res.status(400).send(err)
                    }
                    res.send("ok");
                })
            }
        }catch(err){
            res.status(400).json("Error translating JsonString");
        }
    })
});


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
    fs.readFile('./data/modules.json', 'utf8', (err, jsonString) =>{
        if(err){
            console.log("File read failed: ", err);
            res.status(400).json("Error");
        }
        try{
            const modules = JSON.parse(jsonString);
            const {id} = req.params;
            let found = false;
            modules.modules.forEach(module =>{
                if(module.moduleId === id){
                    found = true;
                    return setTimeout((function() {res.send(module)}), 1000);
                }
            });
            if(!found){
                return res.status(400).json("no such article")
            }
        }catch(err){
            res.status(400).json("Error translating JsonString");
        }
    })
});

app.get('/modules', (req, res) =>{
    fs.readFile('./data/modules.json', 'utf8', (err, jsonString) =>{
        if(err){
            console.log("File read failed: ", err);
            res.status(400).json("Error");
        }
        try{
            const modules = JSON.parse(jsonString);
            res.send(modules.modules);
        }catch(err){
            console.log(err);
            res.status(400).json("Error");
        }
    })

});

app.get("/adres", (req, res) =>{
    res.status(200).json(adres);
});

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
});