import {Request, Response} from "express";

const index = (req: Request, res: Response) => {
    res.send('Get All Orders');
}

const store = (req: Request, res: Response) => {
    res.send('Create Order');
}

const show = (req: Request, res: Response) => {
    res.send('Get Order');
}

const update = (req: Request, res: Response) => {
    res.send('Update Order');
}

const destroy = (req: Request, res: Response) => {
    res.send('Delete Order');
}

export const orders = {
    index,
    store,
    show,
    update,
    destroy
}