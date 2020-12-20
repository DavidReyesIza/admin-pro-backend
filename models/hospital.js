const {Schema,model} = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    
    },

    img: {
        type: String,
    },
    usuario:{
        required: true,
        type:  Schema.Types.ObjectId,   //Esto indica una relacion con otro schema
        ref:  'Usuario'  //Crea una relacion con el otro Schema llamado usuario
    }
   
},{collection: 'hospitales'});


// esto sirve para cambiar como se muestra el id pero solo para fines visuales no modifica como se ve en la base de datos

HospitalSchema.method('toJSON',function(){
    const {__v, ...object} = this.toObject();
    
    return object;
});

module.exports = model('Hospital', HospitalSchema);