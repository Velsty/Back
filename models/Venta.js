const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
    cliente_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    fecha: { type: Date, required: true },
    total: { type: Number, required: true },
    estado: { type: String, required: true },
    productos_servicios: [{
        producto_servicio_id: { type: mongoose.Schema.Types.ObjectId, required: true },
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true },
        nombre: { type: String, required: true }
    }],
});

module.exports = mongoose.model('Venta', ventaSchema);
