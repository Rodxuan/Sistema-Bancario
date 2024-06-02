const {Schema, model} = require('mongoose')

const prestamoSchema = Schema({
    balance:{
        type:Number,
        required:true
    },
    interes:{
      type:Number,
      required:true
  },
    Montointeres:{
      type:Number,
  }
})

prestamoSchema.method('toJSON', function(){
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Prestamo', prestamoSchema)