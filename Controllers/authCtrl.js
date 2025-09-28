const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJW } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;


    try {
        //validar en correo
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: "Correo o contraseña incorrectos!"
            });
        }

        //validar estado
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario inactivo!"
            });
        }

        //validar password
        //encriptacion
        const validPassword = bcrypt.compareSync(password, usuario.password);
        validacion
        if (!validPassword) {
            return res.status(400).json({
                msg: "Correo o contraseña incorrectos!"
            })

        }

        //generar JWT
        const token = await generarJW(usuario.id);

        //respuesta del backend
        res.json({
            msg: "LogIn OK",
            usuario,
            token

 });

    }catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Problemas internos del servidor"
        });
    }

}
module.exports = {
    login
}