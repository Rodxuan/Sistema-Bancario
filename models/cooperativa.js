const {Schema, model} = require('mongoose')

const cooperativaSchema = Schema({
    balance:{
        type:Number,
        required:true
    },
    fecha:{
      type:String,
      required:true
  }
})

cooperativaSchema.method('toJSON', function(){
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model('Cooperativa', cooperativaSchema)