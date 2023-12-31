const {Schema, model} = require('mongoose')

const PostSchema = Schema({

    titulo:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true,
    },
    autor:{
        type:String,
        required:true
    },
})

PostSchema.method('toJSON', function(){
  const {__v, _id, ...object} = this.toObject()
    object.uid = _id
  return object
})

module.exports = model('Post', PostSchema)