const express = require('express');
const router = express.Router();

const assert = require("assert");

const MongoClient = require("mongodb").MongoClient;
//const url = "mongodb://localhost:27017"
const url = "mongodb://Basic1:Pass1@ds251598.mlab.com:51598/academic-agenda";

function verifyUser(login_user, login_password, callback) {
    const dbName = "academic-agenda";

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected succesfully to DB");

        const db = client.db(dbName);

        const collection = db.collection("users");
        collection.find({
            $and: [
                {login: login_user},
                {password: login_password}
            ]
        }).toArray(function (err, docs) {
            assert.equal(null, err);

            //console.log(docs);
            if(docs.length == 1){
                callback(docs);
            }else{
                callback("NOT_FOUND");
            }
        });
        client.close();
    });
}

function cargarComunicadosGenerales(callback){
    const dbName = "academic-agenda";

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected succesfully to DB");

        const db = client.db(dbName);

        const collection = db.collection("comunicados");
        collection.find({
            $and: [
                {destinatario: "General"}
            ]
        }).toArray(function (err, docs) {
            assert.equal(null, err);

            //console.log(docs);
            if(docs.length >= 1){
                callback(docs);
            }else{
                callback("NOT_FOUND");
            }
        });

        client.close();
    });
}

function cargarComunicadosMaterias(codigoMateria, callback){
    const dbName = "academic-agenda";

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected succesfully to DB");

        const db = client.db(dbName);

        const collection = db.collection("comunicados");
        collection.find({
            $and: [
                {destinatario: codigoMateria}
            ]
        }).toArray(function (err, docs) {
            assert.equal(null, err);

            //console.log(docs);
            if(docs.length >= 1){
                callback(docs);
            }else{
                callback("NOT_FOUND");
            }
        });

        client.close();
    });
}

function cargarMateriasProfesor(loginProfe, callback){
    console.log("BACKEND | CargarMateriasProfesor | Buscando materias de " + loginProfe);
    const dbName = "academic-agenda";

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected succesfully to DB");

        const db = client.db(dbName);

        const collection = db.collection("materias");
        collection.find({
            $and: [
                {Profesor: loginProfe}
            ]
        }).toArray(function (err, docs) {
            assert.equal(null, err);

            //console.log(docs);
            if(docs.length >= 1){
                callback(docs);
            }else{
                callback("NOT_FOUND");
            }
        });

        client.close();
    });
}

function cargarMateriasEstudiante(loginEstudiante, callback){
    console.log("BACKEND | cargarMateriasEstudiante | Buscando materias de " + loginEstudiante);
    const dbName = "academic-agenda";

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected succesfully to DB");

        const db = client.db(dbName);

        const collection = db.collection("materias");
        collection.find({
            $and: [
                {Estudiante: loginEstudiante}
            ]
        }).toArray(function (err, docs) {
            assert.equal(null, err);

            //console.log(docs);
            if(docs.length >= 1){
                callback(docs);
            }else{
                callback("NOT_FOUND");
            }
        });

        client.close();
    });
}

function cargarMateria(codigoMat, callback){
    const dbName = "academic-agenda";

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected succesfully to DB");

        const db = client.db(dbName);

        const collection = db.collection("materias");
        collection.find({
            $and: [
                {codigo: codigoMat}
            ]
        }).toArray(function (err, docs) {
            assert.equal(null, err);

            //console.log(docs);
            if(docs.length >= 1){
                callback(docs);
            }else{
                callback("NOT_FOUND");
            }
        });

        client.close();
    });
}

function cargarTareasMateria(codigoTarea, callback){
    console.log("BACKEND | CargarTareasMateria | Buscando tareas de la materia " + codigoTarea);
    const dbName = "academic-agenda";

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected succesfully to DB");

        const db = client.db(dbName);

        const collection = db.collection("tareas");
        collection.find({
            $and: [
                {Materia: codigoTarea}
            ]
        }).toArray(function (err, docs) {
            assert.equal(null, err);

            //console.log(docs);
            if(docs.length >= 1){
                callback(docs);
            }else{
                callback("NOT_FOUND");
            }
        });

        client.close();
    });
}

function cargarTarea(codigoTarea, callback){
    console.log("BACKEND | CargarTarea | Buscando tarea de codigo: " + codigoTarea);
    const dbName = "academic-agenda";

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected succesfully to DB");

        const db = client.db(dbName);

        const collection = db.collection("tareas");
        collection.find({
            $and: [
                {Codigo: codigoTarea}
            ]
        }).toArray(function (err, docs) {
            assert.equal(null, err);

            //console.log(docs);
            if(docs.length >= 1){
                callback(docs);
            }else{
                callback("NOT_FOUND");
            }
        });

        client.close();
    });
}

/* GET home page. */
router.get('/verifyLogin', function (req, res, next) {

    console.log("Req: " + req);
    console.log("BACKEND | login.js | GET verifyLogin params: " + req.query.login + "-" + req.query.password);

    //res.render('index', { title: 'Express' });

    var callback = ((r) => {
        console.log("BACKEND | GET | VerifyLogin Result: " + r);

        if(r == "NOT_FOUND"){
            //res.sendStatus(1001);
            res.send("NOT_FOUND");
        }else{
            //res.sendStatus(200);
            res.send(r);
        }
    });
    
    verifyUser(req.query.login, req.query.password, callback);
});

/* GET home page. */
router.post('/verifyLogin', function (req, res, next) {

    console.log("BACKEND | login.js | POST verifyLogin params: " + req.body.login);

    //res.render('index', { title: 'Express' });

    var callback = ((r) => {
        console.log("BACKEND | POST | VerifyLogin Result: " + r);

        if(r == "NOT_FOUND"){
            //res.sendStatus(1001);
            res.status(401);
            res.send("NOT_FOUND");
        }else{
            //res.sendStatus(200);
            res.status(200);
            res.send(r);
        }
    });
    
    verifyUser(req.body.login, req.body.password, callback);
});

router.post('/comunicados', function (req, res, next) {

    //console.log("BACKEND | COMUNICADOS | ");
    var tipo = req.body.tipo;

    var callback = ((r) => {
        console.log("BACKEND | POST | Comunicados" + tipo + " Result: " + r);
        res.status(200);
        res.send(r);
    });

    if(tipo == "general"){
        console.log("BACKEND | COMUNICADOS | GENERALES");
        cargarComunicadosGenerales(callback);
    }else if(tipo == "materia"){
        var codigo = req.body.codigoMateria;
        console.log("BACKEND | COMUNICADOS | MATERIA : " + codigo);
        cargarComunicadosMaterias(codigo, callback);
    }
});

router.post('/materia', function (req, res, next) {

    //console.log("BACKEND | login.js | POST verifyLogin params: " + req.query.user);

    var callback = ((r) => {
        console.log("BACKEND | POST | Materia Result: " + r);
        res.status(200);
        res.send(r);
    });

    cargarMateria(req.body.codigo, callback);
});

router.post('/materias', function (req, res, next) {
    var logProfe = req.body.loginProfe;

    console.log("BACKEND | login.js | POST Materias params: " + logProfe);

    var callback = ((r) => {
        console.log("BACKEND | POST | Materias Result: " + r);
        res.status(200);
        res.send(r);
    });

    console.log("ESTOY A PUNTO DE EJECUTAR CARGARMATERIAS()");
    cargarMateriasProfesor(logProfe, callback);
});

router.post('/tareas', function (req, res, next) {

    var tipo = req.body.tipo;

    var callback = ((r) => {
        console.log("BACKEND | POST | Tareas " + tipo + " Result: " + r);
        res.status(200);
        res.send(r);
    });

    if(tipo == "normal"){
        console.log("BACKEND | TAREAS | PERSONAL");
        cargarTarea(codigo, callback);
    }else if(tipo == "materia"){
        var codigo = req.body.codigoMateria;
        console.log("BACKEND | TAREAS | MATERIA : " + codigo);
        cargarTareasMateria(codigo, callback);
    }
});

module.exports = router;