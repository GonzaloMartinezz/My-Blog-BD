const { response, request } = require('express');
const Categoria = require('../models/categorias');
const usuario = require('../models/usuario');



const crearCategorias = async (req = request, res = response) => {
    //recibo datos del frontend
    const nombre  = req.body.nombre.toUpperCase();

    //validar si la categoria ya existe
    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe!`
        });
    }

    //data
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    //crear nueva instancia
    const categoria = new Categoria({ nombre });

    //enviar a la db
    await categoria.save();

    if (!categoria) {
       res.status(201).json(categoria);
       msg: `La categoria ${categoriaDB.nombre} ya existe!`
    }  
    
}

module.exports = { crearCategorias };