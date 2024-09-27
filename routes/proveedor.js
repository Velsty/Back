const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const {
    getProveedores,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor
} = require('../controllers/proveedorController');
const auth = require('../middleware/auth');

// Validaciones para crear un proveedor
const createProveedorValidation = [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('apellido').notEmpty().withMessage('El apellido es requerido'),
    body('correo').isEmail().withMessage('El correo debe ser válido'),
    body('telefono').optional().isString().withMessage('El teléfono debe ser un string'),
    body('direccion').optional().isString().withMessage('La dirección debe ser un string')
];

// Validaciones para actualizar un proveedor
const updateProveedorValidation = [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellido').optional().notEmpty().withMessage('El apellido no puede estar vacío'),
    body('correo').optional().isEmail().withMessage('El correo debe ser válido'),
    body('telefono').optional().isString().withMessage('El teléfono debe ser un string'),
    body('direccion').optional().isString().withMessage('La dirección debe ser un string')
];

// Rutas para proveedores
router.get('/', auth, getProveedores);
router.get('/:id', auth, getProveedorById);
router.post('/', auth, createProveedorValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    createProveedor(req, res).catch(next);
});
router.put('/:id', auth, updateProveedorValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    updateProveedor(req, res).catch(next);
});
router.delete('/:id', auth, deleteProveedor);

module.exports = router;
