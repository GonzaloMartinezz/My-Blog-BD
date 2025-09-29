const { Router } = require('express');
const { crearCategorias } = require('../Controllers/CategoriasCtrl');
const { check } = require('express-validator');
const { esAdminRol } = require('../middlewares/validar_roles');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');

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
