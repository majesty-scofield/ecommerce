import {Request, Response} from "express";
import {Product} from "../../Models/Product.js";

/**
 * Get all products
 * @param req
 * @param res
 */
const index = async (req: Request, res: Response) => {
    try {
        const products = await Product.all()
        res.json(products);
    } catch (e) {
        res.status(500).send(e);
    }
}

/**
 * Create a new product
 * @param req
 * @param res
 */
const store = async (req: Request, res: Response) => {
    try {
        const [product] = await Product.create(req.cleanBody)
        res.status(201).json(product)
    } catch (e) {
        res.status(500).send(e);
    }
}

/**
 * Get a product
 * @param req
 * @param res
 */
const show = async (req: Request, res: Response) => {
    try {
        const [product] = await Product.findOrFail(parseInt(req.params.id))
        if (!product) {
            res.status(404).send({message: 'Product not found'});
            return;
        }
        res.json(product)
    } catch (e) {
        res.status(500).send(e);
    }
}

/**
 * Update a product
 * @param req
 * @param res
 */
const update = async (req: Request, res: Response) => {
    try {
        const [product] = await Product.update(parseInt(req.params.id), req.cleanBody)
        if (!product) {
            res.status(404).send({message: 'Product not found'});
            return;
        }
        res.json(product)
    } catch (e) {
        res.status(500).send(e);
    }
}

/**
 * Delete a product
 * @param req
 * @param res
 */
const destroy = async (req: Request, res: Response) => {
    try {
        const [product] = await Product.destroy(parseInt(req.params.id))
        if (product) {
            res.status(204).send()
        } else {
            res.status(404).send({message: 'Product not found'});
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

export const products = {
    index,
    store,
    show,
    update,
    destroy
}