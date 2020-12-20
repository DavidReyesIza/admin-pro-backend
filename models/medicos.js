const {Schema,model} = require('mongoose');

const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    
    },

    img: {
        type: String,
    },
    usuario:{
        type:  Schema.Types.ObjectId,   //Esto indica una relacion con otro schema
        ref:  'Usuario',  //Crea una relacion con el otro Schema llamado usuario
        required: true
    },
    hospital:{
        type:  Schema.Types.ObjectId,   //Esto indica una relacion con otro schema
        ref:  'Hospital',  //Crea una relacion con el otro Schema llamado hospital
        required: true
    }
   
});


// esto sirve para cambiar como se muestra el id pero solo para fines visuales no modifica como se ve en la base de datos

MedicoSchema.method('toJSON',function(){
    const {__v, ...object} = this.toObject();
    
    return object;
});

module.exports = model('Medico', MedicoSchema);