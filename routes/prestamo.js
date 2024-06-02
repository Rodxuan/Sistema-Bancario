const {Router} = require('express')
const {check} = require('express-validator')
const {getPrestamo, newPrestamo, actualizarPrestamo, eliminarPrestamo}= require('../controllers/prestamo')
const {validarCampos}= require('../middlewares/validar-campos')

const router = Router()

router.get('/', getPrestamo);

router.post('/',
[
    check('balance','El balance es obligatorio').not().isEmpty(),
    check('interes','El interes es obligatorio').not().isEmpty(),
    validarCampos
]
, newPrestamo);

router.put('/:id',
[
    check('balance','El balance es obligatorio').not().isEmpty(),
    check('interes','El interes es obligatorio').not().isEmpty(),
    validarCampos
]
, actualizarPrestamo);

router.delete('/:id', eliminarPrestamo);

module.exports = router