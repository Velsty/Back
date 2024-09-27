const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUserById, deleteUserById } = require('../controllers/userController');
const auth = require('../middleware/auth');

// Validaciones para la creación de usuarios
const createUserValidation = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('El correo debe ser válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Validaciones para la actualización de usuarios
const updateUserValidation = [
    body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('email').optional().isEmail().withMessage('El correo debe ser válido'),
    body('password').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Rutas con autenticación y validación
router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);
router.post('/', createUserValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    createUser(req, res).catch(next);
});
router.put('/:id', auth, updateUserValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    updateUserById(req, res).catch(next);
});
router.delete('/:id', auth, deleteUserById);

module.exports = router;
