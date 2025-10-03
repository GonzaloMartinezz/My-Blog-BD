const { Router } = require('express');

const { check } = require('express-validator');
const { esAdminRol } = require('../middlewares/validar_roles');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');
const { crearCategorias } = require('../Controllers/CategoriasCtrl');

const router = Router();


router.post('/', [
    validarJWT ,
    esAdminRol ,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
] ,
crearCategorias

 );

module.exports = router;
