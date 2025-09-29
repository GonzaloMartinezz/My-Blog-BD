const { response, request } = require('express');

const Categorias = require('../models/categorias');

const  crearCategorias = async (req = request, res = response) => {

    const { nombre } = req.body.nombre.toUpperCase();

    //validar DB
    const categoriaDB = await Categorias.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    };

//Crear una nueva instancia
    const categoria = new Categorias(data);

    //Guardar en BD
    await categoria.save();

    if (categoria) {
        return res.status(201).json({
            msg: 'Categoria creada con exito',
            categoria
        });
    }
}

module.exports = {
    crearCategorias
}