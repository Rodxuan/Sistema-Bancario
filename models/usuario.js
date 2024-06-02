const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:true
    },
    cedula:{
      type:String,
      required:true
  },
    cuentaAhorro:{
      type:String,
      required:true
  },
    prestamo:{
      type:String,
    },
    cooperativa:{
      type:String,
    }
})

UsuarioSchema.method('toJSON', function(){
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Usuario', UsuarioSchema)