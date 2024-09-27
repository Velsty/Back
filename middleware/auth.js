// Back/middleware/auth.js

// Este middleware de autenticación está actualmente desactivado. 
// No se requiere autenticación en la aplicación en este momento.

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // La autenticación está desactivada, este middleware no se utiliza.
    next(); // Continúa sin hacer nada
};
