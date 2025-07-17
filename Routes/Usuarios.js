const {Router}= require('express');

const router = Router();


//RUTA GET
router.get('/', (req, res) => {
    res.json (
        {
            mensaje:"recibo el mensaje",
        }
    )
});

//RUTA POST
router.post('/', (req, res) => {
    res.json (
        {
            mensaje:"Envio el mensaje",
        }
    )
});

//RUTA PUT
router.put('/', (req, res) => {
    res.json (
        {
            mensaje:"Modifico el mensaje",
        }
    )
});

//RUTA DELETE
router.delete('/', (req, res) => {
    res.json (
        {
            mensaje:"Elimino el mensaje",
        }
    )
});

module.exports = router;