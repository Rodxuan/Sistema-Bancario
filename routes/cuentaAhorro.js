const {Router} = require('express')
const {check} = require('express-validator')
const {getCuentaAhorro, newCuentaAhorro, actualizarCuentaAhorro, eliminarCuentaAhorro}= require('../controllers/cuentaAhorro')
const {validarCampos}= require('../middlewares/validar-campos')

const router = Router()

router.get('/', getCuentaAhorro);

router.post('/',
[
    check('balance','El balance es obligatorio').not().isEmpty(),
    validarCampos
]
, newCuentaAhorro);

router.put('/:id',
[
    check('balance','El balance es obligatorio').not().isEmpty(),
    validarCampos
]
, actualizarCuentaAhorro);

router.delete('/:id', eliminarCuentaAhorro);

module.exports = router