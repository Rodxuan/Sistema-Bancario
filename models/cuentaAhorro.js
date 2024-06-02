const {Schema, model} = require('mongoose')

const cuentaAhorroSchema = Schema({
    balance:{
        type:Number,
        required:true
    }
})

cuentaAhorroSchema.method('toJSON', function(){
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('cuentaAhorro', cuentaAhorroSchema)