const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const e = require('express');

//Controlador GET
const usuariosGet = async (req = request, res = response) => {

    //pedido de lista completa 
    /*   const usuarios = await Usuario.find(); */
    const { desde = 0, limite = 0 } = req.query;

    const estadoTrue = { estado: true };

  /*   const usuarios = await Usuario.find().skip(Number(desde)).limit(Number(limite));
    const total = await Usuario.countDocuments(); */


    //optimizacion de respuesta
        const [total, usuarios] = await Promise.all([
          Usuario.countDocuments(estadoTrue),
          Usuario.find(estadoTrue).skip(desde).limit(limite),
  
       ]) 
    res.json(
        {
            mensaje: "Lista de usuarios",
            total,
            usuarios,
        }
    )
};

//Controlador POST
const usuariosPost = async (req = request, res = response) => {

    //frontend
    const datos = req.body;
    const { nombre, correo, password, rol } = datos;

    //backend
    const usuario = new Usuario({ nombre, correo, password, rol });

    //emcriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    /*  const hash = bcrypt.hashSync(password, salt);
     usuario.password = hash; */
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar en BD
    await usuario.save();

    res.json(
        {
            usuario,
            mensaje: "Usuario registrado!",
        }
    )
};

//Controlador PUT
const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params;

    const { password, ...updUsuario } = req.body;
    if (password) {
        //emcriptar contraseña 

        const salt = bcrypt.genSaltSync(10);
        updUsuario.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, updUsuario, { new: true, });
    res.json(
        {
            mensaje: "Modifico el mensaje",
            usuario
        }
    )
};

//Controlador DELETE
const usuariosDelete = (req = request, res = response) => {
    res.json(
        {
            mensaje: "Elimino el mensaje",
        }
    )
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}