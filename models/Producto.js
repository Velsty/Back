const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true, min: 0 }, // Asegura que el precio no sea negativo
    tipo: { type: String, required: true },
    cantidad: { type: Number, required: true, default: 0, min: 0 } // Asegura que la cantidad no sea negativa
}, { timestamps: true }); // Agrega timestamps

module.exports = mongoose.model('Producto', productoSchema);
