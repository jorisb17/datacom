const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cores = require('cors');
const knex = require('knex');
const util = require('util');

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

const modules = ({
    modules: [
        {
            id: '1',
            name: 'Module 1',
            temp: [20,22,25,18,30,31,34],
            licht: [10,8,12,9,15,16,20],
            sensor: [30,10,25,15,18,33,20],
            tijd: ['0:00', '0:20', '0:25', "0:40", '0:54', "1:40", "1:50"],
            data: [
                {name: '0:00', temp: 20, licht: 10, sensor: 30},
                {name: '0:20', temp: 22, licht: 8, sensor: 10},
                {name: '0:25', temp: 25, licht: 12, sensor: 25},
                {name: '0:40', temp: 18, licht: 9, sensor: 15},
                {name: '0:54', temp: 30, licht: 15, sensor: 18},
                {name: '1:40', temp: 31, licht: 16, sensor: 33},
                {name: '1:50', temp: 34, licht: 20, sensor: 20}
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
                {name: '1:50', temp: 18, licht: 21, sensor: 22}
            ]
        }
    ]
});

app.get("/arduino", (req, res) =>{
    const max = modules.modules[0].temp.length;
    console.log(max);
    let data = [];
    for(let i = 0; i < max; i++){
        const obj ={
            name: modules.modules[0].tijd[i],
            temp: modules.modules[0].temp[i],
            licht: modules.modules[0].licht[i],
            sensor: modules.modules[0].sensor[i],
        };
        data.push(obj);
    }
    const {mintemp, gemtemp, maxtemp, minlicht, maxlicht, gemlicht, minsensor, maxsensor, gemsensor, moduleID, tijd} = req.query;
    // createModule(mintemp, gemtemp, maxtemp, minlicht, maxlicht, gemlicht, minsensor, maxsensor, gemsensor, moduleID, res, tijd);
    // console.log(mintemp)
    const mintemparray = [parseFloat(mintemp)];
    const maxtemparray = [parseFloat(maxtemp)];
    const gemtemparray = [parseFloat(gemtemp)];
    const minlichtarray = [parseFloat(minlicht)];
    const maxlichtarray = [parseFloat(maxlicht)];
    const gemlichtarray = [parseFloat(gemlicht)];
    const minsensorarray = [parseFloat(minsensor)];
    const maxsensorarray = [parseFloat(maxsensor)];
    const gemsensorarray = [parseFloat(gemlicht)];
    const tijdarray = [tijd];

    knex('modules').insert({
        mintemp: [0.0, 0.0],
        gemtemp: [0.0, 0.0],
        maxtemp:  [0.0, 0.0],
        minlicht: [0.0, 0.0],
        gemlicht: [0.0, 0.0],
        maxlicht: [0.0, 0.0],
        minsensor: [0.0, 0.0],
        maxsensor: [0.0, 0.0],
        gemsensor:[0.0, 0.0],
        tijd: ['0.0', '0.0'],
        moduleID: moduleID
    }).then(() => res.json("ok"))
        .catch(err => res.status(400).json(err));
});

const createModule = (mintemp, gemtemp, maxtemp, minlicht, maxlicht, gemlicht, minsensor, maxsensor, gemsensor, moduleID, res, tijd) => {


    // const update = knex('modules')
    //     .update({
    //         mintemp: db.raw('array_append(mintemp, ?)', parseFloat(mintemp)),
    //         gemtemp: db.raw('array_append(gemtemp, ?)', parseFloat(gemtemp)),
    //         maxtemp: db.raw('array_append(maxtemp, ?)', parseFloat(maxtemp)),
    //         minlicht: db.raw('array_append(minlicht, ?)', parseFloat(minlicht)),
    //         gemlicht: db.raw('array_append(gemlicht, ?)', parseFloat(gemlicht)),
    //         maxlicht: db.raw('array_append(maxlicht, ?)', parseFloat(maxlicht)),
    //         minsensor: db.raw('array_append(minsensor, ?)', parseFloat(minsensor)),
    //         maxsensor: db.raw('array_append(maxsensor, ?)', parseFloat(maxsensor)),
    //         gemsensor: db.raw('array_append(gemsensor, ?)', parseFloat(gemsensor)),
    //         tijd: db.raw('array_append(tijd, ?)', tijd)})
    //     .whereRaw(`modules.moduleID = '${moduleID}'`);
    //
    // const query = util.format(
    //     '%s ON CONFLICT (moduleID) DO UPDATE SET %s',
    //     insert.toString(),
    //     update.toString().replace(/^update\s.*\sset\s/i, '')
    // );
    // db.raw(query).then(msg => res.status(200).json('ok'))
    //     .catch(err => res.status(400).json(err))
};

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
    modules.modules.forEach(module =>{
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
    return setTimeout((function() {res.send(modules.modules)}), 1000)
});

app.get("/adres", (req, res) =>{
    res.status(200).json(adres);
});

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
});