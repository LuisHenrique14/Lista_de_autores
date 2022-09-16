var express = require('express'); 
var router = express.Router();

var Autor = require('../models/autor');

router.get('/', function (req, res, next) {
    res.render('index');
});

// AUTOR
// GET request -> http://localhost:3000/autor/criar
router.get('/autor/criar', function(req, res, next){
    res.render('autor_criar_pagina');
});

//POST request para criar um Autor
router.post('/autor/criar', function(req, res, next){

    //Cria um objeto Autor
    const autor = new Autor({
        primeiro_nome: req.body.primeiro_nome,
        familia_nome: req.body.familia_nome,
        data_de_nascimento: req.body.data_de_nascimento
    });

    autor.save((err) => {
        if (err) {
            return next(err);
        }
        //Sucesso - redireciona para listagem de Autor
        res.redirect('/autores');
    });
});

//Get request ppara a listagem de todos os Autores -> http://localhost:3000/autores
router.get('/autores', function(req, res, next){

    Autor.find()
    .exec(function (err, lista_autores){
        if (err) {
            return next(err);
        }
        //Sucesso, então vamos renderizar
        res.render('autor_lista_pagina', {titulo: 'Lista de Autor', lista: lista_autores, listaExiste: true }); 
    });
});

//GET request para um Autor -> http://localhost:3000/autor/LuisHenrique
router.get('/autor/:id', function(req, res, next){

    Autor.findOne({primeiro_nome: req.params.id}, function(err, autor){
        if (err) {
            return next (err);
        }
        // Sucesso, então vamos renderizar
        res.render('autor_lista_pagina', {titulo: 'Autor', lista: autor, listaExiste: false});
    });
});

module.exports = router;