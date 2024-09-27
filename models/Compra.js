const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
    _id: String,
    proveedor_id: { type: String, required: true },
    fecha: { type: Date, required: true },
    total: { type: Number, required: true, min: 0 }, // Asegura que el total no sea negativo
    estado: {
        type: String,
        enum: ['pendiente', 'cancelado', 'completado'],
        default: 'pendiente'
    },
    productos_servicios: [
        {
            producto_servicio_id: { type: String, required: true },
            nombre: { type: String, required: true },
            precio: { type: Number, required: true, min: 0 }, // Precio no puede ser negativo
            cantidad: { type: Number, required: true, min: 1 } // Cantidad debe ser al menos 1
        }
    ]
}, { timestamps: true }); // Agrega timestamps

module.exports = mongoose.model('Compra', compraSchema);
