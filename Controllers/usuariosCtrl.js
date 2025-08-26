const {response , request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

//Controlador GET
const usuariosGet = (req = request, res = response) => {
    const {limit , Key} = req.query;
    res.json (
        {
            mensaje:"recibo el mensaje",
            limit,
           /*  Key , */
        }
    )
};

//Controlador POST
const usuariosPost = async (req = request, res = response) => {

    //frontend
    const datos = req.body;
    const {nombre, correo , password, rol} = datos; 

    //backend
    const usuario = new Usuario({nombre, correo , password, rol});

//emcriptar contraseña
    const salt = bcrypt.genSaltSync(10);
   /*  const hash = bcrypt.hashSync(password, salt);
    usuario.password = hash; */
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar en BD
    await usuario.save();

    res.json (
        {
            usuario ,
            mensaje:"Usuario registrado!",
        }
    )
};

//Controlador PUT
const usuariosPut = async (req = request, res = response) => {
    const id = req.params.id;

    const {password, ...updUsuario} = req.body;
    if (password) {
        //emcriptar contraseña 

        const salt = bcrypt.genSaltSync(10);
        updUsuario.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, updUsuario , {new: true});
    res.json (
        {
            mensaje:"Modifico el mensaje",
            usuario
        }
    )
};

//Controlador DELETE
const usuariosDelete = (req = request, res = response) => {
    res.json (
        {
            mensaje:"Elimino el mensaje",
        }
    )
};

module.exports = {
    usuariosGet ,
    usuariosPost , 
    usuariosPut ,
    usuariosDelete
}