const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Middleware para validar el registro
const registerValidation = [
    body('email').isEmail().withMessage('Debes proporcionar un email válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Middleware para validar el login
const loginValidation = [
    body('email').isEmail().withMessage('Debes proporcionar un email válido'),
    body('password').notEmpty().withMessage('La contraseña es requerida')
];

// Ruta para registrar un nuevo usuario
router.post('/register', registerValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    register(req, res).catch(next); // Manejo de errores
});

// Ruta para iniciar sesión
router.post('/login', loginValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    login(req, res).catch(next); // Manejo de errores
});

module.exports = router;
