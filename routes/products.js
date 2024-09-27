const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    partialUpdateProducto,
    deleteProducto
} = require('../controllers/productoController');
const auth = require('../middleware/auth');

// Validaciones para crear un producto
const createProductoValidation = [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('descripcion').notEmpty().withMessage('La descripción es requerida'),
    body('precio').isNumeric().withMessage('El precio es requerido y debe ser un número'),
    body('tipo').notEmpty().withMessage('El tipo es requerido'),
    body('cantidad').isNumeric().withMessage('La cantidad es requerida y debe ser un número')
];

// Validaciones para actualizar un producto
const updateProductoValidation = [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('descripcion').optional().notEmpty().withMessage('La descripción no puede estar vacía'),
    body('precio').optional().isNumeric().withMessage('El precio debe ser un número'),
    body('tipo').optional().notEmpty().withMessage('El tipo no puede estar vacío'),
    body('cantidad').optional().isNumeric().withMessage('La cantidad debe ser un número')
];

// Rutas para productos
router.get('/', auth, getProductos);
router.get('/:id', auth, getProductoById);
router.post('/', auth, createProductoValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    createProducto(req, res).catch(next);
});
router.put('/:id', auth, updateProductoValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    updateProducto(req, res).catch(next);
});
router.patch('/:id', auth, partialUpdateProducto); // Asegúrate de implementar este método correctamente
router.delete('/:id', auth, deleteProducto);

module.exports = router;
