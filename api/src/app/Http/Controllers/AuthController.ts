import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import {User} from "../../Models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
    try {
        const data = req.cleanBody
        data.password = await bcrypt.hash(data.password, 10);

        const userExist = await User.findByEmail(data.email);

        if (userExist?.email === data.email) {
            res.status(400).send(`User already exists`);
            return;
        }

        const [user] = await User.create(data);
        delete user?.password;

        res.status(201).json({user})
    } catch (e) {
        res.status(500).send(e);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        if (!req.cleanBody) {
            res.status(400).send({ message: 'Bad Request: Missing body content' });
            return;
        }

        const { email, password } = req.cleanBody;

        // Check if both email and password are provided
        if (!email || !password) {
            res.status(400).send({ message: 'Bad Request: Missing email or password' });
            return;
        }

        const [user] = await User.findByEmail(email);
        if (!user) {
            res.status(401).send({ message: 'Invalid credentials' });
            return;
        }

        // Check if user.password is defined before comparing
        if (!user.password) {
            res.status(500).send({ message: 'Server error: No password found for user' });
            return;
        }

        const matchedPass = await bcrypt.compare(password, user.password);
        if (!matchedPass) {
            res.status(401).send({ message: 'Invalid credentials' });
            return;
        }

        delete user?.password;

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '30d' }
        );

        res.status(200).json({ token, user });
    } catch (e) {
        console.error('Login error:', e);
        res.status(500).send({ message: 'Internal server error' });
    }


}

export const authUser = async (req: Request, res: Response) => {
    try {
        res.send('User');
    } catch (e) {
        res.status(500).send(e);
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        // req.session.destroy((err) => {
        //     if (err) {
        //         console.error('Error destroying session:', err);
        //     }
        //     res.sendStatus(200);
        // });
    } catch (e) {
        res.status(500).send(e);
    }
}