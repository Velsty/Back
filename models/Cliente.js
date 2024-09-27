const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    _id: String,
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /.+\@.+\..+/ // Valida el formato de correo
    },
    telefono: { 
        type: String, 
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); // Valida que el teléfono tenga 10 dígitos
            },
            message: props => `${props.value} no es un número de teléfono válido!`
        }
    },
    direccion: { type: String },
}, { timestamps: true }); // Agrega timestamps

module.exports = mongoose.model('Cliente', clienteSchema);
