const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { getCompras, getCompraById, createCompra, updateCompra, deleteCompra } = require('../controllers/compraController');
const auth = require('../middleware/auth');

// Middleware para validar la creación de una compra
const createCompraValidation = [
    body('proveedor_id').notEmpty().withMessage('El ID del proveedor es requerido'),
    body('fecha').isDate().withMessage('La fecha es requerida y debe ser una fecha válida'),
    body('total').isNumeric().withMessage('El total es requerido y debe ser un número'),
    body('productos_servicios').isArray().withMessage('Los productos/servicios son requeridos y deben ser un arreglo')
];

// Middleware para validar la actualización de una compra
const updateCompraValidation = [
    body('proveedor_id').optional().notEmpty().withMessage('El ID del proveedor no puede estar vacío'),
    body('fecha').optional().isDate().withMessage('La fecha debe ser una fecha válida'),
    body('total').optional().isNumeric().withMessage('El total debe ser un número'),
    body('productos_servicios').optional().isArray().withMessage('Los productos/servicios deben ser un arreglo')
];

// Rutas para compras
router.get('/', auth, getCompras);
router.get('/:id', auth, getCompraById);
router.post('/', auth, createCompraValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    createCompra(req, res).catch(next); // Manejo de errores
});
router.put('/:id', auth, updateCompraValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    updateCompra(req, res).catch(next); // Manejo de errores
});
router.delete('/:id', auth, deleteCompra);

module.exports = router;
