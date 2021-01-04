/* RUTA MEDICOS
'/api/medico'
 */

const {Router } = require('express');
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
} = require('../controllers/medicos')

const router = Router();

router.get('/',validarJWT,getMedicos);
// para las validaciones se utiliza una libreria que se instala como express-validator y tambien es un middleware
router.post('/',[
    validarJWT,
    check('nombre','El nombre del medico es requerido').not().isEmpty(),
    check('hospital','Id del hospital debe de ser valido').isMongoId(),
    validarCampos,

],
crearMedico);

router.put('/:id',

[
    validarJWT,
    check('nombre','El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital','El hospital es obligatorio').not().isEmpty(),

    validarCampos
 
],
actualizarMedico);

router.delete('/:id',
validarJWT,
borrarMedico
);

router.get('/:id',
validarJWT,
getMedicoById
);




module.exports = router;