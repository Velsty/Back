const mongoose = require('mongoose');

const productoServicioSchema = new mongoose.Schema({
  producto_servicio_id: { type: String, required: true },
  nombre: { type: String, required: true },
  precio: { type: Number, required: true, min: 0 } // Precio debe ser positivo
});

const compraSchema = new mongoose.Schema({
  compra_id: { type: String, required: true, unique: true },
  fecha: { type: Date, required: true },
  total: { type: Number, required: true, min: 0 }, // Total debe ser positivo
  productos_servicios: [productoServicioSchema]
});

const proveedorSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Valida formato de correo
  telefono: { type: String },
  direccion: { type: String },
  compras: [compraSchema]
}, { timestamps: true }); // Agrega timestamps para seguimiento de creación y actualización

module.exports = mongoose.model('Proveedor', proveedorSchema);
