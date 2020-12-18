const jwt = require('jsonwebtoken');

// Hacer instalaccion npm i jsonwebtoken para usar JWT

const generarJWT = (uid) =>{

    return new Promise(( resolve, reject)=>{

        const payload={
            uid,
            // aqui se pueden añadir mas datos que pasar por el payload pero tiene que ser informacion no sensible
        };
    
        jwt.sign(payload,process.env.JWT_SECRETKEY,{
            expiresIn: '12h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT')
    
            }else{
                resolve(token)
            }
        });
    

    });

   


}

module.exports = {
    generarJWT,
}