import {Request, Response} from "express";
import {User} from "../../Models/User.js";

const index = async (req: Request, res: Response) => {
    try {
        const users = await User.all()
        res.json(users);
    } catch (e) {
        res.status(500).send(e);
    }
}

const store = async (req: Request, res: Response) => {
    try {
        const [user] = await User.create(req.cleanBody)
        res.status(201).json(user)
    } catch (e) {
        res.status(500).send(e);
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const [user] = await User.findOrFail(parseInt(req.params.id))
        if (!user) {
            res.status(404).send({message: 'User not found'});
            return;
        }
        res.json(user)
    } catch (e) {
        res.status(500).send(e);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const [user] = await User.update(parseInt(req.params.id), req.cleanBody)
        res.status(201).json(user)
    } catch (e) {
        res.status(500).send(e);
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const [user] = await User.destroy(parseInt(req.params.id))
        res.status(201).json(user)
    } catch (e) {
        res.status(500).send(e);
    }
}

export const users = {
    index,
    store,
    update,
    destroy,
    show
}
