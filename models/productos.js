const {Schema, model} = require('mongoose');

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  estado: {
      type: Boolean,
      default: true,
      required: true
  },
  usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      require: true
  },
  precio: {
      type: Number,
      default: 0
  },
  categoria: {
     type: Schema.Types.ObjectId,
     ref: 'Category',
     require: true
  },
  descripcion: {type: String},
  disponible: {type: Boolean, default: true}
});

ProductSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
}

module.exports = model('Product', ProductSchema);
