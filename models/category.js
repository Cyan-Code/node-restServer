const {Schema, model} = require('mongoose');

const CategorySchema = Schema({
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
      type: Schema.Types.ObjectId, //Docs (167) Docs Relations in Mongo db
      ref: 'Usuario',
      require: true
  }
});

CategorySchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
}

module.exports = model('Category', CategorySchema);
