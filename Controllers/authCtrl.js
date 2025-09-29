const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        // 1. Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: "Correo o contraseña incorrectos!"
            });
        }

        // 2. Verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario inactivo!"
            });
        }

        // 3. Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        
        if (!validPassword) {
            return res.status(400).json({
                msg: "Correo o contraseña incorrectos!"
            });
        }

        // 4. Generar el JWT (token de autenticación)
        const token = await generarJWT(usuario.id);

        res.json({
            msg: "Login OK!",
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Problemas internos del servidor. Hable con el administrador."
        });
    }
}

module.exports = {
    login
}