/*
    Ruta: 'api/usuarios'

*/
const {Router } = require('express');
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const { getUsuarios ,crearUsuario} = require('../controllers/usuarios');
const {actualizarUsuario,borrarUsuario} = require('../controllers/usuarios');
const { validarJWT, validarADMIN_ROLE,validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT,getUsuarios);
// para las validaciones se utiliza una libreria que se instala como express-validator y tambien es un middleware
router.post('/',[

check('nombre','El nombre es obligatorio').not().isEmpty(),
check('password','El password es obligatorio').not().isEmpty(),
check('email','El email es obligatorio').isEmail(),
validarCampos,

],
crearUsuario);

router.put('/:id',
validarJWT,
validarADMIN_ROLE_o_MismoUsuario,
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos, //Este es un middleware
],
actualizarUsuario);

router.delete('/:id',
validarJWT,
borrarUsuario
);




module.exports = router;