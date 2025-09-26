const {Router}= require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const {usuariosGet, usuariosPost, usuariosPut , usuariosDelete} = require('../Controllers/usuariosCtrl.js');
const { esMailValido , esRolValido , esIdValido} = require('../helpers/db_validators');

const router = Router();


//RUTA GET
router.get('/',usuariosGet);

//RUTA POST -- registrer

router.post(
    '/',
    [ 
    check('nombre', 'El nombre es obligatorio').notEmpty(), 
    check(
        'password',
        'La constraseña debe tener como minimo 6 caracteres'
    ).isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(esMailValido),
    check('rol').custom(esRolValido),
    validarCampos,
    ],
    usuariosPost
)

//RUTA PUT--update\
router.put('/:id',
    [
    check('id' , 'No es un ID valido').isMongoId(),
    check('id').custom(esIdValido),
    validarCampos,
    ],
     usuariosPut,
    ) ;

//RUTA DELETE
router.delete('/:id', usuariosDelete)


module.exports = router;    