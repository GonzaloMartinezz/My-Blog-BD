const {Router}= require('express');
const router = Router();
const {usuariosGet, usuariosPost, usuariosPut , usuariosDelete} = require('../Controllers/usuariosCtrl.js');

//RUTA GET
router.get('/', usuariosGet);

//RUTA POST -- registrer
router.post('/', usuariosPost)
//RUTA PUT--update
router.put('/:id', usuariosPut) 
//RUTA DELETE
router.delete('/', usuariosDelete)

module.exports = router;    