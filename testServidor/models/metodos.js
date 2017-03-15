var app     = require('../servidor/server');
var models  = require('./modelos');

app.app.get('/clientes', function(req, res){
    models.Cliente.findAll().then(function(clientes){
        res.send(clientes);
        res.status(res.statusCode).end();
    }).error(function(error){
        res.status(res.statusCode).end();
    });
});

app.app.post('/clientes', function(req, res){
    var nombres     = req.body.nombres;
    var apellidos   = req.body.apellidos;
    var cedula      = req.body.cedula;
    models.Cliente.create({
        nombres     : nombres,
        apellidos   : apellidos,
        cedula      : cedula
    }).then(function(){
        res.status(res.statusCode).end(); 
    }).error(function(error){
        res.status(res.statusCode).end();
    });
});

app.app.get('/clientes/:clienteId([0-9]+)', function(req, res){
    var clienteId = req.params.clienteId;
    models.Cliente.find({
        where : { id : clienteId }
    }).then(function(clientes){
        res.send(clientes);
        res.status(res.statusCode).end();
    }).error(function(error){
        res.status(res.statusCode).end();
    });
});

app.app.put('/clientes/:clienteId([0-9]+)', function(req, res){
    var clienteId = req.params.clienteId;
    var nombres     = req.body.nombres;
    var apellidos   = req.body.apellidos;
    var cedula      = req.body.cedula;

    models.Cliente.findById(clienteId).then(function(cliente){
        cliente.id          = clienteId;
        cliente.nombres     = nombres;
        cliente.apellidos   = apellidos;
        cliente.cedula      = cedula;
        cliente.save().then(function(){
            res.status(res.statusCode).end();
        }).error(function(error){
            res.status(res.statusCode).end();
        });

    });
});

app.app.delete('/clientes/:clienteId([0-9]+)', function(req, res){
    var clienteId = req.params.clienteId;
    models.Cliente.destroy({
        where : { id : clienteId }
    }).then(function(){
        res.status(res.statusCode).end();
    }).error(function(error){
        res.status(res.statusCode).end();
    });
});

module.exports.app = app;
module.exports.models = models;