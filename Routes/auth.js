const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const { login } = require('../Controllers/authCtrl');


const router = Router(); 

router.post ("/login", [
    check('correo', 'El campo no es valido').isEmail(),
     check('correo', 'El campo es obligatorio').notEmpty(),
    check('password', 'El campo es obligatoria').notEmpty(),
    validarCampos
] , 
login
);

module.exports = router;