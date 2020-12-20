/* RUTA HOSPITALES
'/api/hospital'
 */

const {Router } = require('express');
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales')

const router = Router();

router.get('/',getHospitales);
// para las validaciones se utiliza una libreria que se instala como express-validator y tambien es un middleware
router.post('/',[
    validarJWT,
    check('nombre','El nombre del Hospital es obligatorio').not().isEmpty(),
    validarCampos

],
crearHospital);

router.put('/:id',

[
 
],
actualizarHospital);

router.delete('/:id',

borrarHospital
);




module.exports = router;