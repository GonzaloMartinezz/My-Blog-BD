const {response , request } = require('express');
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
const usuariosPost = (req = request, res = response) => {
    const datos = req.body;
    const {nombre, correo , password, rol} = datos; 

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    res.json (
        {
            datos ,
            mensaje:"Envio el mensaje",
        }
    )
};

//Controlador PUT
const usuariosPut = (req = request, res = response) => {
    res.json (
        {
            mensaje:"Modifico el mensaje",
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