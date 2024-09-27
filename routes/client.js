const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { getClientes, getClienteById, createCliente, updateCliente, deleteCliente } = require('../controllers/clienteController');
const auth = require('../middleware/auth');

// Middleware para validar la creación de un cliente
const createClienteValidation = [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('apellido').notEmpty().withMessage('El apellido es requerido'),
    body('email').isEmail().withMessage('Debes proporcionar un email válido'),
    body('telefono').optional().isString().withMessage('El teléfono debe ser un texto'),
    body('direccion').optional().isString().withMessage('La dirección debe ser un texto')
];

// Middleware para validar la actualización de un cliente
const updateClienteValidation = [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellido').optional().notEmpty().withMessage('El apellido no puede estar vacío'),
    body('email').optional().isEmail().withMessage('Debes proporcionar un email válido'),
    body('telefono').optional().isString().withMessage('El teléfono debe ser un texto'),
    body('direccion').optional().isString().withMessage('La dirección debe ser un texto')
];

// Rutas para clientes
router.get('/', auth, getClientes);
router.get('/:id', auth, getClienteById);
router.post('/', auth, createClienteValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    createCliente(req, res).catch(next); // Manejo de errores
});
router.put('/:id', auth, updateClienteValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    updateCliente(req, res).catch(next); // Manejo de errores
});
router.delete('/:id', auth, deleteCliente);

module.exports = router;
