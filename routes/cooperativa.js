const {Router} = require('express')
const {check} = require('express-validator')
const {getCooperativa, newCooperativa, actualizarCooperativa, eliminarCooperativa}= require('../controllers/cooperativa')
const {validarCampos}= require('../middlewares/validar-campos')

const router = Router()

router.get('/', getCooperativa);

router.post('/',
[
    check('balance','El balance es obligatorio').not().isEmpty(),
    check('fecha','La fecha es obligatoria').not().isEmpty(),
    validarCampos
]
, newCooperativa);

router.put('/:id',
[
    check('balance','El balance es obligatorio').not().isEmpty(),
    check('fecha','La fecha es obligatoria').not().isEmpty(),
    validarCampos
]
, actualizarCooperativa);

router.delete('/:id', eliminarCooperativa);

module.exports = router