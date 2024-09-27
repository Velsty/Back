const mongoose = require('mongoose');

const productoServicioSchema = new mongoose.Schema({
  producto_servicio_id: { type: String, required: true }, // Agregar validación si es necesario
  nombre: { type: String, required: true },
  precio: { type: Number, required: true, min: 0 }, // Asegurarse de que el precio sea positivo
  cantidad: { type: Number, required: true, min: 1 } // Asegurarse de que la cantidad sea positiva
});

const ventaSchema = new mongoose.Schema({
  cliente_id: { type: String, required: true }, // Podrías cambiar a ObjectId si tienes un modelo Cliente
  fecha: { type: Date, required: true, default: Date.now }, // Establece fecha por defecto
  total: { type: Number, required: true, min: 0 }, // Asegúrate de que el total sea positivo
  estado: {
    type: String,
    enum: ['cancelada', 'completada'],
    default: 'completada'
  },
  productos_servicios: [productoServicioSchema]
}, { timestamps: true }); // Agrega timestamps

module.exports = mongoose.model('Venta', ventaSchema);
