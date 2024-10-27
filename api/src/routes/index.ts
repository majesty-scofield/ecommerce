import express from "express";
import {products} from "../app/Http/Controllers/ProductController.js";
import {orders} from "../app/Http/Controllers/OrderController.js";
import {ValidationMiddleware} from "../app/Http/Middleware/ValidationMiddleware.js";
import {createProductSchema, updateProductSchema} from "../app/Schema/ProductSchema.js";
import {authUser, login, logout, register} from "../app/Http/Controllers/AuthController.js";
import {users} from "../app/Http/Controllers/UserController.js";
import {createUserSchema, loginSchema} from "../app/Schema/UserSchema.js";
import {verifyToken} from "../app/Http/Middleware/AuthMiddleware.js";

const router = express.Router();
// Auth routes
router.post('/login', ValidationMiddleware(loginSchema), login);
router.post('/register', ValidationMiddleware(createUserSchema), register);
router.post('/logout', logout);
router.get('/user', authUser);

// User routes
router.get('/users', users.index);
router.post('/users', users.store);
router.get('/users/:id', users.show);
router.put('/users/:id', users.update);
router.delete('/users/:id', users.destroy);

// Product routes
router.get('/products', products.index);
router.post('/products', verifyToken, ValidationMiddleware(createProductSchema), products.store);
router.get('/products/:id', products.show);
router.put('/products/:id', verifyToken, ValidationMiddleware(updateProductSchema), products.update);
router.delete('/products/:id', verifyToken, products.destroy);

// Order routes
router.get('/orders', orders.index);
router.post('/orders', orders.store);
router.get('/orders/:id', orders.show);
router.put('/orders/:id', orders.update);
router.delete('/orders/:id', orders.destroy);

export default router;