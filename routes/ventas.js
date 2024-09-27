const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { getVentas, getVentaById, createVenta, updateVenta } = require('../controllers/ventaController');
const auth = require('../middleware/auth');

// Validaciones para la creación de ventas
const createVentaValidation = [
    body('cliente_id').notEmpty().withMessage('El ID del cliente es requerido'),
    body('fecha').isDate().withMessage('La fecha debe ser una fecha válida'),
    body('total').isNumeric().withMessage('El total debe ser un número'),
    body('productos_servicios').isArray().withMessage('Los productos/servicios deben ser un arreglo').notEmpty().withMessage('Los productos/servicios no pueden estar vacíos'),
];

// Validaciones para la actualización de ventas
const updateVentaValidation = [
    body('estado').optional().isIn(['cancelada', 'completada']).withMessage('El estado debe ser "cancelada" o "completada"'),
    body('productos_servicios').optional().isArray().withMessage('Los productos/servicios deben ser un arreglo'),
];

// Rutas con autenticación y validación
router.get('/', auth, getVentas);
router.get('/:id', auth, getVentaById);
router.post('/', auth, createVentaValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    createVenta(req, res).catch(next);
});
router.put('/:id', auth, updateVentaValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    updateVenta(req, res).catch(next);
});

module.exports = router;
