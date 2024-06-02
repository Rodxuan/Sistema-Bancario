const {Router} = require('express')
const {check} = require('express-validator')
const {getUsuario, newUsuario, actualizarUsuario, eliminarUsuario,EliminarCooperativaUser}= require('../controllers/usuario')
const {validarCampos}= require('../middlewares/validar-campos')



const router = Router()

router.get('/', getUsuario);

router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('cedula','La cedula es obligatoria').not().isEmpty(),
    check('cuentaAhorro','La cuenta Ahorro es obligatoria').not().isEmpty(),
    validarCampos
]
, newUsuario);

router.put('/:id',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('cedula','La cedula es obligatoria').not().isEmpty(),
    check('cuentaAhorro','La cuenta Ahorro es obligatoria').not().isEmpty(),
    validarCampos
]
, actualizarUsuario);

router.put('/eliminarCooperativa/:id',
EliminarCooperativaUser
)

router.delete('/:id', eliminarUsuario);

module.exports = router
